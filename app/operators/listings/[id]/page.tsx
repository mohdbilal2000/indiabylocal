import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingForm } from "@/components/OperatorForms";
import { requireOperator } from "@/lib/auth";
import { db } from "@/lib/db";
import { destinations } from "@/lib/destinations";

export const metadata: Metadata = { title: "Edit tour", robots: { index: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditListing({ params }: { params: Promise<{ id: string }> }) {
  const op = await requireOperator();
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const rows = await db()`select * from listings where id = ${id} and operator_id = ${op.id}`;
  const l = rows[0];
  if (!l) notFound();
  const initial = Object.fromEntries(
    ["destination", "title", "summary", "start_time", "meeting_point", "highlights", "included"].map((k) => [k, String(l[k] ?? "")]),
  );
  initial.duration_hours = String(Number(l.duration_hours));
  initial.price_inr = String(l.price_inr);
  initial.max_group = String(l.max_group);
  const places = destinations.map(({ slug, name, state }) => ({ slug, name, state }));
  return (
    <div className="shell py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-h2">Edit tour</h1>
        <p className="mt-2 text-muted">Saving sends the tour back for review before it is shown to travellers.</p>
        <div className="mt-8 rounded-2xl border border-hair bg-card p-6 md:p-8">
          <ListingForm places={places} initial={initial} id={id} />
        </div>
      </div>
    </div>
  );
}
