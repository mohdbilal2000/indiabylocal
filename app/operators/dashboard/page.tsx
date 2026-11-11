import type { Metadata } from "next";
import Link from "next/link";
import { logOut, withdrawListing } from "@/app/operators/actions";
import { requireOperator } from "@/lib/auth";
import { type Listing, db, inr } from "@/lib/db";
import { destinationBySlug } from "@/lib/destinations";

export const metadata: Metadata = { title: "Your tours", robots: { index: false } };

const STATUS: Record<Listing["status"], { label: string; cls: string }> = {
  draft: { label: "Draft", cls: "bg-surface-alt text-ink" },
  submitted: { label: "In review", cls: "bg-action text-on-action" },
  published: { label: "Live", cls: "bg-success text-white" },
  withdrawn: { label: "Withdrawn", cls: "bg-surface-alt text-muted" },
};

export default async function Dashboard() {
  const op = await requireOperator();
  const listings = (await db()`
    select * from listings where operator_id = ${op.id} order by updated_at desc`) as Listing[];

  return (
    <div className="shell py-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-small text-muted">{op.business_name}</p>
          <h1 className="text-h2">Your tours</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          {op.is_admin && (
            <Link href="/admin" className="btn-ghost">
              Admin
            </Link>
          )}
          <Link href="/operators/listings/new" className="btn">
            Add a tour
          </Link>
          <form action={logOut}>
            <button type="submit" className="btn-ghost">
              Log out
            </button>
          </form>
        </div>
      </div>

      {op.status === "pending" && (
        <p className="mt-6 rounded-2xl border border-line bg-surface-alt p-4 text-small">
          <strong>Your account is not verified yet.</strong> You can add and submit tours now. They go live once we
          have checked your licence and identity{op.licence_no ? "" : "; you have not given a licence number yet"}.
        </p>
      )}

      {listings.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="text-h4 font-semibold">No tours yet</p>
          <p className="mt-1 text-muted">Add your first tour. It takes about five minutes.</p>
          <Link href="/operators/listings/new" className="btn mt-5">
            Add a tour
          </Link>
        </div>
      ) : (
        <ul className="mt-8 divide-y divide-hair rounded-2xl border border-hair bg-card">
          {listings.map((l) => (
            <li key={l.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 p-4 md:p-5">
              <div className="min-w-0 flex-1 basis-64">
                <p className="truncate font-semibold">{l.title}</p>
                <p className="nums text-small text-muted">
                  {destinationBySlug(l.destination)?.name ?? l.destination} · {inr(l.price_inr)} per person ·{" "}
                  {Number(l.duration_hours)} h
                </p>
                {l.review_note && l.status === "draft" && (
                  <p className="mt-1 text-small text-warning">
                    <span aria-hidden="true">! </span>Sent back by our reviewer: {l.review_note}
                  </p>
                )}
              </div>
              <span className={`rounded-full px-3 py-1 text-caption font-semibold ${STATUS[l.status].cls}`}>
                {STATUS[l.status].label}
              </span>
              <div className="flex gap-2">
                <Link href={`/operators/listings/${l.id}`} className="btn-ghost min-h-11 px-4 text-small">
                  Edit
                </Link>
                {l.status !== "withdrawn" && (
                  <form action={withdrawListing}>
                    <input type="hidden" name="id" value={l.id} />
                    <button type="submit" className="btn-ghost min-h-11 px-4 text-small text-muted">
                      Withdraw
                    </button>
                  </form>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
