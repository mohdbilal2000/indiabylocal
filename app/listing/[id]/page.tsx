import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumbs } from "@/components/Chrome";
import { Photo } from "@/components/Photo";
import { durationLabel } from "@/lib/data";
import { type PublicListing, db, inr, lines } from "@/lib/db";
import { destinationBySlug } from "@/lib/destinations";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function load(id: string): Promise<PublicListing | null> {
  if (!UUID.test(id)) return null;
  const rows = await db()`
    select l.*, o.business_name, o.licence_no
    from listings l join operators o on o.id = l.operator_id
    where l.id = ${id} and l.status = 'published' and o.status = 'verified'`;
  return (rows[0] as PublicListing | undefined) ?? null;
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const l = await load((await params).id);
  if (!l) return {};
  return { title: l.title, description: l.summary.slice(0, 158), alternates: { canonical: `/listing/${l.id}` } };
}

export default async function ListingPage({ params }: Props) {
  const l = await load((await params).id);
  if (!l) notFound();
  const place = destinationBySlug(l.destination);
  const crumbs = [
    { name: "Home", href: "/" },
    ...(place ? [{ name: place.name, href: `/india/${place.slug}` }] : []),
    { name: l.title },
  ];
  const facts = [
    ["Duration", durationLabel(Number(l.duration_hours))],
    ["Starts", `${l.start_time} India time`],
    ["Group", `Up to ${l.max_group}`],
    ["Operator", l.business_name],
    ["Licence", l.licence_no ?? "On file"],
  ];
  return (
    <div className="shell pt-6">
      <Crumbs items={crumbs} />
      <div className="relative mt-4 aspect-[16/9] max-h-[28rem] w-full overflow-hidden rounded-2xl">
        <Photo name={l.destination} sizes="(min-width: 1280px) 1216px, 100vw" priority />
      </div>
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
        <div>
          <h1 className="text-h2">{l.title}</h1>
          <p className="prose-col mt-4">{l.summary}</p>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-hair py-5 text-small sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-caption text-muted">{k}</dt>
                <dd className="nums font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          {lines(l.highlights).length > 0 && (
            <section className="mt-10">
              <h2 className="text-h3">Highlights</h2>
              <ul className="prose-col mt-3 space-y-2">
                {lines(l.highlights).map((h) => (
                  <li key={h} className="flex gap-3">
                    <span aria-hidden="true" className="text-brand">●</span>
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {lines(l.included).length > 0 && (
            <section className="mt-10">
              <h2 className="text-h3">In the price</h2>
              <ul className="prose-col mt-3 space-y-1.5 text-small">
                {lines(l.included).map((h) => (
                  <li key={h} className="flex gap-2">
                    <span aria-hidden="true" className="text-success">✓</span>
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}
          <section className="mt-10">
            <h2 className="text-h3">Where you meet</h2>
            <p className="prose-col mt-3">{l.meeting_point}</p>
          </section>
        </div>
        <aside>
          <div className="rounded-2xl border border-line bg-card p-5 lg:sticky lg:top-24">
            <p className="nums text-h3 font-semibold">
              {inr(l.price_inr)} <span className="text-small font-normal text-muted">per person</span>
            </p>
            <p className="mt-1 text-caption text-muted">The operator's price in rupees. No booking fees.</p>
            <p className="mt-4 rounded-lg bg-surface-alt p-3 text-small">
              Online booking is not open yet. This listing has been checked and is shown so you can see what is
              available in {place?.name ?? "this destination"}.
            </p>
            {place && (
              <Link href={`/india/${place.slug}`} className="btn-ghost mt-4 w-full">
                More in {place.name}
              </Link>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
