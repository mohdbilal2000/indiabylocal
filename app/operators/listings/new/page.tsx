import type { Metadata } from "next";
import { ListingForm } from "@/components/OperatorForms";
import { requireOperator } from "@/lib/auth";
import { destinations } from "@/lib/destinations";

export const metadata: Metadata = { title: "Add a tour", robots: { index: false } };

export default async function NewListing() {
  await requireOperator();
  const places = destinations.map(({ slug, name, state }) => ({ slug, name, state }));
  return (
    <div className="shell py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-h2">Add a tour</h1>
        <p className="mt-2 text-muted">Day tours only. Editing a live tour sends it back for review.</p>
        <div className="mt-8 rounded-2xl border border-hair bg-card p-6 md:p-8">
          <ListingForm places={places} initial={{ max_group: "8" }} />
        </div>
      </div>
    </div>
  );
}
