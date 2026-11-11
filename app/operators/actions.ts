"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { endSession, hashPassword, requireOperator, startSession, verifyPassword } from "@/lib/auth";
import { db } from "@/lib/db";
import { destinationBySlug } from "@/lib/destinations";

export type FormState = { error?: string; fields?: Record<string, string> };

function read(form: FormData, names: string[]) {
  const out: Record<string, string> = {};
  for (const n of names) out[n] = String(form.get(n) ?? "").trim();
  return out;
}

/** Field values to put back in the form after an error. Never the password. */
function keep(f: Record<string, string>) {
  const { password: _omit, ...rest } = f;
  return rest;
}

export async function signUp(_prev: FormState, form: FormData): Promise<FormState> {
  const f = read(form, ["business_name", "contact_name", "email", "phone", "base_city", "licence_no", "password"]);
  const fail = (error: string): FormState => ({ error, fields: keep(f) });
  f.email = f.email.toLowerCase();

  if (f.business_name.length < 2 || f.business_name.length > 80) return fail("Enter your business or trading name.");
  if (f.contact_name.length < 2 || f.contact_name.length > 80) return fail("Enter the name of the person we should contact.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) || f.email.length > 160) return fail("Enter a valid email address.");
  if (!/^\+?[0-9 ]{8,16}$/.test(f.phone)) return fail("Enter a phone number with its country code, for example +91 98765 43210.");
  if (f.base_city.length < 2 || f.base_city.length > 60) return fail("Enter the city you operate from.");
  if (f.licence_no.length > 60) return fail("That licence number is too long.");
  if (f.password.length < 10 || f.password.length > 200) return fail("Choose a password of at least 10 characters.");

  const sql = db();
  const existing = await sql`select 1 from operators where email = ${f.email}`;
  if (existing.length) return fail("An account with that email already exists. Log in instead.");

  const rows = await sql`
    insert into operators (email, password_hash, business_name, contact_name, phone, base_city, licence_no)
    values (${f.email}, ${await hashPassword(f.password)}, ${f.business_name}, ${f.contact_name},
            ${f.phone}, ${f.base_city}, ${f.licence_no || null})
    returning id`;
  await startSession(rows[0].id as string);
  redirect("/operators/dashboard");
}

export async function logIn(_prev: FormState, form: FormData): Promise<FormState> {
  const f = read(form, ["email", "password"]);
  f.email = f.email.toLowerCase();
  const rows = await db()`select id, password_hash, status from operators where email = ${f.email}`;
  const row = rows[0];
  // Same message whether the email or the password is wrong.
  const ok = row ? await verifyPassword(f.password, row.password_hash as string) : false;
  if (!row || !ok) return { error: "That email and password do not match an account.", fields: { email: f.email } };
  if (row.status === "suspended") return { error: "This account is suspended. Contact us to resolve it.", fields: { email: f.email } };
  await startSession(row.id as string);
  redirect("/operators/dashboard");
}

export async function logOut() {
  await endSession();
  redirect("/");
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const LISTING_FIELDS = [
  "destination", "title", "summary", "duration_hours", "start_time",
  "price_inr", "max_group", "meeting_point", "highlights", "included",
];

export async function saveListing(_prev: FormState, form: FormData): Promise<FormState> {
  const op = await requireOperator();
  const id = String(form.get("id") ?? "");
  const submit = form.get("intent") === "submit";
  const f = read(form, LISTING_FIELDS);
  const fail = (error: string): FormState => ({ error, fields: f });

  if (id && !UUID.test(id)) return fail("That listing was not found on your account.");
  const duration = Number(f.duration_hours);
  const price = Number(f.price_inr);
  const group = Number(f.max_group);

  if (!destinationBySlug(f.destination)) return fail("Choose a destination from the list.");
  if (f.title.length < 10 || f.title.length > 60) return fail("The title must be 10 to 60 characters.");
  if (f.summary.length < 60 || f.summary.length > 600) return fail("Describe the tour in 60 to 600 characters.");
  if (!(duration > 0 && duration <= 16)) return fail("Duration must be between half an hour and 16 hours. Day tours only.");
  if (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(f.start_time)) return fail("Enter the start time as HH:MM in India time.");
  if (!Number.isInteger(price) || price < 100 || price > 500_000) return fail("Enter the amount you want to receive per person, in whole rupees.");
  if (!Number.isInteger(group) || group < 1 || group > 30) return fail("Largest group must be between 1 and 30.");
  if (f.meeting_point.length < 5 || f.meeting_point.length > 200) return fail("Say where travellers meet you or are picked up.");
  if (f.highlights.length > 800 || f.included.length > 800) return fail("Keep highlights and inclusions under 800 characters each.");

  const status = submit ? "submitted" : "draft";
  const sql = db();
  if (id) {
    // Scoped to the logged-in operator, so one operator can never edit another's listing.
    const rows = await sql`
      update listings set destination = ${f.destination}, title = ${f.title}, summary = ${f.summary},
        duration_hours = ${duration}, start_time = ${f.start_time}, price_inr = ${price}, max_group = ${group},
        meeting_point = ${f.meeting_point}, highlights = ${f.highlights}, included = ${f.included},
        status = ${status}, updated_at = now()
      where id = ${id} and operator_id = ${op.id}
      returning id`;
    if (!rows.length) return fail("That listing was not found on your account.");
  } else {
    const count = await sql`select count(*)::int as n from listings where operator_id = ${op.id}`;
    if ((count[0].n as number) >= 50) return fail("You have reached 50 listings. Contact us to raise the limit.");
    await sql`
      insert into listings (operator_id, destination, title, summary, duration_hours, start_time, price_inr,
                            max_group, meeting_point, highlights, included, status)
      values (${op.id}, ${f.destination}, ${f.title}, ${f.summary}, ${duration}, ${f.start_time}, ${price},
              ${group}, ${f.meeting_point}, ${f.highlights}, ${f.included}, ${status})`;
  }
  revalidatePath(`/india/${f.destination}`);
  redirect("/operators/dashboard");
}

export async function withdrawListing(form: FormData) {
  const op = await requireOperator();
  const id = String(form.get("id") ?? "");
  if (!UUID.test(id)) redirect("/operators/dashboard");
  const rows = await db()`
    update listings set status = 'withdrawn', updated_at = now()
    where id = ${id} and operator_id = ${op.id} returning destination`;
  if (rows[0]) revalidatePath(`/india/${rows[0].destination}`);
  redirect("/operators/dashboard");
}
