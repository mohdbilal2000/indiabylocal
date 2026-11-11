"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function idFrom(form: FormData): string | null {
  const id = String(form.get("id") ?? "");
  return UUID.test(id) ? id : null;
}

async function record(adminId: string, action: string, target: string, note?: string) {
  await db()`insert into admin_actions (admin_id, action, target, note)
             values (${adminId}, ${action}, ${target}, ${note ?? null})`;
}

/** Every action re-checks the admin flag itself; hiding the page is not the protection. */
export async function setOperatorStatus(form: FormData) {
  const admin = await requireAdmin();
  const id = idFrom(form);
  const status = String(form.get("status") ?? "");
  if (!id || !["pending", "verified", "suspended"].includes(status)) return;
  if (id === admin.id) return; // an admin cannot suspend or demote their own account by mistake
  const sql = db();
  const rows = await sql`update operators set status = ${status} where id = ${id} returning id`;
  if (!rows.length) return;
  if (status === "suspended") await sql`delete from sessions where operator_id = ${id}`;
  await record(admin.id, `operator:${status}`, id);
  const places = await sql`select distinct destination from listings where operator_id = ${id} and status = 'published'`;
  for (const p of places) revalidatePath(`/india/${p.destination}`);
  revalidatePath("/admin");
}

export async function publishListing(form: FormData) {
  const admin = await requireAdmin();
  const id = idFrom(form);
  if (!id) return;
  // Only a submitted listing from a verified operator can go live.
  const rows = await db()`
    update listings l set status = 'published', review_note = null, updated_at = now()
    from operators o
    where l.id = ${id} and l.status = 'submitted' and o.id = l.operator_id and o.status = 'verified'
    returning l.destination`;
  if (!rows.length) return;
  await record(admin.id, "listing:published", id);
  revalidatePath(`/india/${rows[0].destination}`);
  revalidatePath("/admin");
}

export async function sendBackListing(form: FormData) {
  const admin = await requireAdmin();
  const id = idFrom(form);
  const note = String(form.get("note") ?? "").trim().slice(0, 500);
  if (!id) return;
  const rows = await db()`
    update listings set status = 'draft', review_note = ${note || "Please review this listing against our rules and resubmit."},
      updated_at = now()
    where id = ${id} and status in ('submitted', 'published')
    returning destination`;
  if (!rows.length) return;
  await record(admin.id, "listing:sent-back", id, note);
  revalidatePath(`/india/${rows[0].destination}`);
  revalidatePath("/admin");
}
