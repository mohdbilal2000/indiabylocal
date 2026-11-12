import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { BookingBox, MobileBooking } from "@/components/BookingBox";
import { Crumbs } from "@/components/Chrome";
import { Money } from "@/components/Currency";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { SaveButton } from "@/components/SaveButton";
import { TrustPanel, TrustPills } from "@/components/TrustBadges";
import { bookableFromListing } from "@/lib/booking";
import { type TrustKey, durationLabel } from "@/lib/data";
import { type PublicListing, db, lines } from "@/lib/db";
import { destinationBySlug } from "@/lib/destinations";
import { ORG_ID, breadcrumbNode, graph, organizationNode } from "@/lib/schema";
import { SITE_LIVE, SITE_URL } from "@/lib/site";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const load = cache(loadUncached);
async function loadUncached(id: string): Promise<PublicListing | null> {
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
  const path = `/listing/${l.id}`;
  const description = l.summary.slice(0, 158);
  const image = { url: `/photos/${l.destination}.jpg` };
  return {
    title: l.title,
    description,
    alternates: { canonical: path, languages: { en: path, "x-default": path } },
    openGraph: { type: "website", url: path, title: l.title, description, images: [image] },
    twitter: { card: "summary_large_image", title: l.title, description, images: [image.url] },
  };
}

export default async function ListingPage({ params }: Props) {
  const l = await load((await params).id);
  if (!l) notFound();
  const place = destinationBySlug(l.destination);
  const url = `${SITE_URL}/listing/${l.id}`;
  const crumbs = [
    { name: "Home", href: "/" },
    ...(place ? [{ name: place.name, href: `/india/${place.slug}` }] : []),
    { name: l.title },
  ];
  const item = bookableFromListing(l, place?.name ?? l.destination);
  // An operator is verified before anything is published, and signs the Promise. The licence badge needs a number on file.
  const trust: TrustKey[] = l.licence_no ? ["licence", "promise"] : ["promise"];
  const facts = [
    ["Duration", durationLabel(Number(l.duration_hours))],
    ["Starts", `${l.start_time} India time`],
    ["Group", `Up to ${l.max_group}`],
    ["Cancellation", "Free until 24 hours before"],
  ];
  const providerId = `${SITE_URL}/hosts/${l.operator_id}#operator`;

  return (
    <div className="shell pt-6 pb-24 lg:pb-0">
      <JsonLd
        data={graph(organizationNode(), breadcrumbNode(url, crumbs), {
          "@type": ["TouristTrip", "Product"],
          "@id": `${url}#trip`,
          name: l.title,
          description: l.summary,
          url,
          image: `${SITE_URL}/photos/${l.destination}.jpg`,
          provider: {
            "@type": "Organization",
            "@id": providerId,
            name: l.business_name,
            url: `${SITE_URL}/hosts/${l.operator_id}`,
            ...(l.licence_no ? { hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "Tourist guide licence", identifier: l.licence_no } } : {}),
          },
          offers: {
            "@type": "Offer",
            url,
            price: l.price_inr,
            priceCurrency: "INR",
            seller: { "@id": ORG_ID },
            ...(SITE_LIVE ? { availability: "https://schema.org/InStock" } : {}),
          },
        })}
      />
      <Crumbs items={crumbs} />
      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-12">
        <div className="min-w-0">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl">
            <Photo name={l.destination} sizes="(min-width: 1024px) 800px, 100vw" priority />
            <SaveButton id={`l:${l.id}`} title={l.title} className="absolute top-3 right-3" />
          </div>
          <h1 className="mt-5 text-h2">{l.title}</h1>
          <div className="mt-3">
            <TrustPills keys={trust} />
          </div>
          <p className="prose-col mt-4">{l.summary}</p>
          <p className="nums mt-4 text-small text-muted lg:hidden">
            From <strong className="text-price text-ink"><Money amount={l.price_inr} currency="INR" /></strong> per person
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-hair py-5 text-small sm:grid-cols-4">
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
              <ul className="prose-col mt-3 space-y-2 text-small">
                {lines(l.included).map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-verified-soft text-caption font-bold text-verified">✓</span>
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
          <section className="mt-10">
            <h2 className="text-h3">Who runs this tour</h2>
            <Link href={`/hosts/${l.operator_id}`} className="lift prose-col mt-4 flex items-center gap-4 rounded-2xl border border-hair bg-card p-5 no-underline">
              <span aria-hidden="true" className="flex size-14 shrink-0 items-center justify-center rounded-full bg-verified-soft font-display text-h4 font-semibold text-verified">
                {l.business_name.slice(0, 1).toUpperCase()}
              </span>
              <span className="text-small">
                <span className="block text-body font-semibold">{l.business_name}</span>
                <span className="block text-muted">
                  Checked by us before listing{l.licence_no ? ` · Licence ${l.licence_no}` : ""}
                </span>
                <span className="mt-1 block font-semibold text-brand underline">See their profile and other tours</span>
              </span>
            </Link>
          </section>
          <TrustPanel keys={trust} />
        </div>
        <aside className="hidden lg:block">
          <div className="lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto lg:overscroll-contain lg:rounded-2xl">
            <BookingBox item={item} />
          </div>
        </aside>
      </div>
      <MobileBooking item={item} />
    </div>
  );
}
