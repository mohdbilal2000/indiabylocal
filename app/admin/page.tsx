import type { Metadata } from "next";
import Link from "next/link";
import { publishListing, sendBackListing, setOperatorStatus, setRequestStatus } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/auth";
import { type Listing, type Operator, db, inr, lines } from "@/lib/db";
import { destinationBySlug } from "@/lib/destinations";

export const metadata: Metadata = { title: "Admin", robots: { index: false } };
export const dynamic = "force-dynamic";

type Row = Listing & {
  business_name: string;
  email: string;
  phone: string;
  licence_no: string | null;
  operator_status: Operator["status"];
};
type Op = Operator & { created_at: string; listings: number };
type Req = {
  id: string;
  code: string;
  tour_ref: string;
  title: string;
  option_name: string;
  tour_date: string;
  people: number;
  total: number;
  currency: string;
  name: string;
  email: string;
  phone: string | null;
  note: string | null;
  status: "new" | "answered" | "closed";
  created_at: string;
};

const when = (d: string) =>
  new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(new Date(d));

const BADGE: Record<Operator["status"], string> = {
  pending: "bg-action text-on-action",
  verified: "bg-success text-on-solid",
  suspended: "bg-error text-on-solid",
};

function StatusButton({ id, status, label, quiet = false }: { id: string; status: string; label: string; quiet?: boolean }) {
  return (
    <form action={setOperatorStatus}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="status" value={status} />
      <button type="submit" className={`${quiet ? "btn-ghost text-muted" : "btn"} min-h-11 px-4 text-small`}>
        {label}
      </button>
    </form>
  );
}

export default async function Admin() {
  const admin = await requireAdmin();
  const sql = db();
  const [queue, live, operators, log] = await Promise.all([
    sql`select l.*, o.business_name, o.email, o.phone, o.licence_no, o.status as operator_status
        from listings l join operators o on o.id = l.operator_id
        where l.status = 'submitted' order by l.updated_at` as unknown as Promise<Row[]>,
    sql`select l.*, o.business_name, o.email, o.phone, o.licence_no, o.status as operator_status
        from listings l join operators o on o.id = l.operator_id
        where l.status = 'published' order by l.updated_at desc limit 200` as unknown as Promise<Row[]>,
    sql`select o.id, o.email, o.business_name, o.contact_name, o.phone, o.base_city, o.licence_no, o.status,
               o.is_admin, o.created_at, (select count(*)::int from listings l where l.operator_id = o.id) as listings
        from operators o order by (o.status = 'pending') desc, o.created_at desc limit 300` as unknown as Promise<Op[]>,
    sql`select a.action, a.target, a.note, a.created_at, o.email
        from admin_actions a join operators o on o.id = a.admin_id
        order by a.created_at desc limit 20`,
  ]);
  const pendingOps = operators.filter((o) => o.status === "pending").length;
  // The table is created by the first traveller request, so it may not exist yet.
  const requests = (await sql`
    select id, code, tour_ref, title, option_name, tour_date::text, people, total, currency, name, email, phone, note, status, created_at
    from booking_requests order by (status = 'new') desc, created_at desc limit 100`.catch(() => [])) as Req[];
  const newRequests = requests.filter((r) => r.status === "new").length;

  return (
    <div className="shell py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-small text-muted">Signed in as {admin.email}</p>
          <h1 className="text-h2">Admin</h1>
        </div>
        <Link href="/operators/dashboard" className="btn-ghost">
          Your operator dashboard
        </Link>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
        {[
          ["Traveller requests to answer", newRequests],
          ["Tours to review", queue.length],
          ["Operators to verify", pendingOps],
          ["Tours live", live.length],
        ].map(([k, v]) => (
          <div key={k} className="rounded-2xl border border-hair bg-card p-4">
            <dd className="nums text-h2 font-semibold">{v}</dd>
            <dt className="text-caption text-muted">{k}</dt>
          </div>
        ))}
      </dl>

      <section aria-labelledby="q-h" className="pt-12">
        <h2 id="q-h" className="text-h3">
          Tours to review
        </h2>
        {queue.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-line p-8 text-center text-muted">
            Nothing is waiting for review.
          </p>
        ) : (
          <ul className="mt-4 grid gap-4">
            {queue.map((l) => (
              <li key={l.id} className="rounded-2xl border border-hair bg-card p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-sans text-h4 font-semibold tracking-normal">{l.title}</h3>
                    <p className="nums text-small text-muted">
                      {destinationBySlug(l.destination)?.name ?? l.destination} · {Number(l.duration_hours)} h · starts{" "}
                      {l.start_time} · up to {l.max_group} · {inr(l.price_inr)} per person · submitted {when(l.updated_at)}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-caption font-semibold ${BADGE[l.operator_status]}`}>
                    Operator {l.operator_status}
                  </span>
                </div>
                <p className="prose-col mt-3 text-small">{l.summary}</p>
                <dl className="mt-4 grid gap-4 text-small sm:grid-cols-3">
                  <div>
                    <dt className="text-caption text-muted">Meeting point</dt>
                    <dd>{l.meeting_point}</dd>
                  </div>
                  <div>
                    <dt className="text-caption text-muted">Highlights</dt>
                    <dd>{lines(l.highlights).join(" · ") || "None given"}</dd>
                  </div>
                  <div>
                    <dt className="text-caption text-muted">Included</dt>
                    <dd>{lines(l.included).join(" · ") || "None given"}</dd>
                  </div>
                </dl>
                <p className="mt-4 rounded-lg bg-surface-alt p-3 text-small">
                  <strong>{l.business_name}</strong> · {l.email} · {l.phone} · Licence:{" "}
                  {l.licence_no ?? <span className="text-error">not given</span>}
                </p>
                <div className="mt-4 flex flex-wrap items-end gap-3 border-t border-hair pt-4">
                  {l.operator_status === "verified" ? (
                    <form action={publishListing}>
                      <input type="hidden" name="id" value={l.id} />
                      <button type="submit" className="btn min-h-11 px-4 text-small">
                        Publish
                      </button>
                    </form>
                  ) : (
                    <>
                      <StatusButton id={l.operator_id} status="verified" label="Verify this operator" />
                      <p className="self-center text-caption text-muted">Verify the operator first, then publish.</p>
                    </>
                  )}
                  <form action={sendBackListing} className="ml-auto flex flex-1 flex-wrap items-end gap-2 sm:flex-nowrap">
                    <input type="hidden" name="id" value={l.id} />
                    <div className="min-w-48 flex-1">
                      <label htmlFor={`note-${l.id}`} className="text-caption text-muted">
                        Reason, shown to the operator
                      </label>
                      <input id={`note-${l.id}`} name="note" maxLength={500} className="field min-h-11" />
                    </div>
                    <button type="submit" className="btn-ghost min-h-11 px-4 text-small">
                      Send back
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="r-h" className="pt-14">
        <h2 id="r-h" className="text-h3">
          Traveller requests
        </h2>
        <p className="mt-1 text-small text-muted">
          Sent from the booking panel. Nothing has been charged. Reply by email, then mark the request answered.
        </p>
        {requests.length === 0 ? (
          <p className="mt-4 rounded-2xl border border-dashed border-line p-8 text-center text-muted">
            No traveller has sent a request yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-hair rounded-2xl border border-hair bg-card">
            {requests.map((r) => (
              <li key={r.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 p-4">
                <div className="min-w-0 flex-1 basis-72">
                  <p className="font-semibold">
                    {r.title}
                    {r.tour_ref.startsWith("t:") && <span className="ml-2 text-caption font-normal text-muted">(sample tour)</span>}
                  </p>
                  <p className="nums text-small text-muted">
                    {r.code} · {r.tour_date} · {r.people} {r.people === 1 ? "traveller" : "travellers"} · {r.option_name} ·{" "}
                    {r.currency === "INR" ? inr(r.total) : `$${r.total}`} · sent {when(r.created_at)}
                  </p>
                  <p className="text-small">
                    {r.name} ·{" "}
                    <a className="link" href={`mailto:${r.email}?subject=${encodeURIComponent(`Your request ${r.code}: ${r.title}`)}`}>
                      {r.email}
                    </a>
                    {r.phone && <> · {r.phone}</>}
                  </p>
                  {r.note && <p className="mt-1 text-small text-muted">“{r.note}”</p>}
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-caption font-semibold ${r.status === "new" ? "bg-action text-on-action" : "bg-surface-alt"}`}
                >
                  {r.status}
                </span>
                {r.status !== "closed" && (
                  <form action={setRequestStatus}>
                    <input type="hidden" name="id" value={r.id} />
                    <input type="hidden" name="status" value={r.status === "new" ? "answered" : "closed"} />
                    <button type="submit" className="btn-ghost min-h-11 px-4 text-small">
                      {r.status === "new" ? "Mark answered" : "Close"}
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="o-h" className="pt-14">
        <h2 id="o-h" className="text-h3">
          Operators
        </h2>
        {operators.length === 0 ? (
          <p className="mt-4 text-muted">No operator has signed up yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-hair rounded-2xl border border-hair bg-card">
            {operators.map((o) => (
              <li key={o.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 p-4">
                <div className="min-w-0 flex-1 basis-72">
                  <p className="font-semibold">
                    {o.business_name}
                    {o.is_admin && <span className="ml-2 text-caption font-normal text-muted">(admin)</span>}
                  </p>
                  <p className="nums text-small text-muted">
                    {o.contact_name} · {o.email} · {o.phone} · {o.base_city} · Licence: {o.licence_no ?? "not given"} ·{" "}
                    {o.listings} {o.listings === 1 ? "tour" : "tours"} · joined {when(o.created_at)}
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-caption font-semibold ${BADGE[o.status]}`}>{o.status}</span>
                {o.id !== admin.id && (
                  <div className="flex gap-2">
                    {o.status !== "verified" && <StatusButton id={o.id} status="verified" label="Verify" />}
                    {o.status === "verified" && <StatusButton id={o.id} status="pending" label="Unverify" quiet />}
                    {o.status !== "suspended" && <StatusButton id={o.id} status="suspended" label="Suspend" quiet />}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="l-h" className="pt-14">
        <h2 id="l-h" className="text-h3">
          Tours live
        </h2>
        {live.length === 0 ? (
          <p className="mt-4 text-muted">No tour is live yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-hair rounded-2xl border border-hair bg-card">
            {live.map((l) => (
              <li key={l.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 p-4">
                <div className="min-w-0 flex-1 basis-72">
                  <Link href={`/listing/${l.id}`} className="font-semibold hover:underline">
                    {l.title}
                  </Link>
                  <p className="nums text-small text-muted">
                    {destinationBySlug(l.destination)?.name ?? l.destination} · {l.business_name} · {inr(l.price_inr)}
                    {l.operator_status !== "verified" && (
                      <span className="text-error"> · hidden: operator {l.operator_status}</span>
                    )}
                  </p>
                </div>
                <form action={sendBackListing} className="flex gap-2">
                  <input type="hidden" name="id" value={l.id} />
                  <label className="sr-only" htmlFor={`un-${l.id}`}>
                    Reason
                  </label>
                  <input id={`un-${l.id}`} name="note" placeholder="Reason" maxLength={500} className="field min-h-11 w-44" />
                  <button type="submit" className="btn-ghost min-h-11 px-4 text-small text-muted">
                    Take down
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="a-h" className="pt-14">
        <h2 id="a-h" className="text-h3">
          Recent admin actions
        </h2>
        {log.length === 0 ? (
          <p className="mt-4 text-muted">Nothing yet.</p>
        ) : (
          <ul className="nums mt-4 space-y-1 text-small text-muted">
            {log.map((a, i) => (
              <li key={i}>
                {when(a.created_at as string)} · {a.email as string} · {a.action as string}
                {a.note ? ` · “${a.note as string}”` : ""}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
