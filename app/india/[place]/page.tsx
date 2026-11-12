import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumbs } from "@/components/Chrome";
import { DestinationCard } from "@/components/DestinationCard";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { PlanGuide, planRows } from "@/components/PlanGuide";
import { ListingCard, TourCard } from "@/components/TourCard";
import { toursIn } from "@/lib/data";
import { publishedIn } from "@/lib/db";
import { destinationBySlug, destinations, slugify } from "@/lib/destinations";
import { guideFor } from "@/lib/guides";
import { breadcrumbNode, destinationNode, faqNode, graph, organizationNode } from "@/lib/schema";
import { SITE_LIVE, SITE_URL } from "@/lib/site";

export const dynamicParams = false;
/** Operator listings come from the database; pages refresh every five minutes and on each publish. */
export const revalidate = 300;

export function generateStaticParams() {
  return destinations.map((p) => ({ place: p.slug }));
}

type Props = { params: Promise<{ place: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = destinationBySlug((await params).place);
  if (!p) return {};
  return {
    title: `${p.name} tours with local guides: ${p.known.slice(0, 2).join(", ")}`,
    description: `${p.blurb} Best time to visit: ${p.best}.`.slice(0, 158),
    alternates: { canonical: `/india/${p.slug}`, languages: { en: `/india/${p.slug}`, "x-default": `/india/${p.slug}` } },
    openGraph: { type: "website", url: `/india/${p.slug}`, images: [{ url: `/photos/${p.slug}.jpg` }] },
  };
}

export default async function PlacePage({ params }: Props) {
  const p = destinationBySlug((await params).place);
  if (!p) notFound();
  const listings = await publishedIn(p.slug);
  const samples = SITE_LIVE ? [] : toursIn(p.slug);
  const nearby = destinations.filter((x) => x.slug !== p.slug && (x.state === p.state || x.region === p.region))
    .sort((a, b) => Number(b.state === p.state) - Number(a.state === p.state))
    .slice(0, 4);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: p.state, href: `/states/${slugify(p.state)}` },
    { name: p.name },
  ];
  const empty = listings.length === 0 && samples.length === 0;
  const guide = guideFor(p.slug);

  return (
    <>
      <JsonLd
        data={graph(
          organizationNode(),
          breadcrumbNode(`${SITE_URL}/india/${p.slug}`, crumbs),
          destinationNode(p),
          guide && faqNode(`${SITE_URL}/india/${p.slug}`, planRows(p, guide)),
        )}
      />
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Photo name={p.slug} sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/75" />
        </div>
        <div className="shell flex min-h-[min(56svh,520px)] flex-col justify-end pt-20 pb-8 text-white md:pb-12">
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-action">{p.state}</p>
          <h1 className="mt-2 text-display">{p.name}</h1>
          <p className="mt-3 max-w-2xl opacity-95">{p.blurb}</p>
        </div>
      </section>

      <div className="shell pt-5">
        <Crumbs items={crumbs} />
        <dl className="mt-6 grid gap-6 rounded-2xl border border-hair bg-card p-5 sm:grid-cols-[2fr_1fr] md:p-6">
          <div>
            <dt className="text-caption uppercase tracking-wider text-muted">Known for</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {p.known.map((k) => (
                <span key={k} className="rounded-full bg-surface-alt px-3 py-1.5 text-small font-medium">
                  {k}
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-caption uppercase tracking-wider text-muted">Best time to visit</dt>
            <dd className="mt-2 font-semibold">{p.best}</dd>
          </div>
        </dl>

        <section aria-labelledby="tours-h" className="pt-14">
          <h2 id="tours-h" className="text-h2">
            Tours in {p.name}
          </h2>
          {empty ? (
            <div className="mt-6 rounded-2xl border border-line bg-surface-alt p-6 md:p-8">
              <p className="text-h4 font-semibold">No operator has listed a tour in {p.name} yet.</p>
              <p className="prose-col mt-2 text-muted">
                We publish a tour only after checking the operator behind it, so this page stays empty rather than
                padded. Do you run tours here?
              </p>
              <Link href="/operators/signup" className="btn mt-5">
                List your {p.name} tour
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {listings.map((l) => (
                <ListingCard key={l.id} listing={l} />
              ))}
              {samples.map((t, i) => (
                <TourCard key={t.slug} tour={t} priority={listings.length === 0 && i === 0} />
              ))}
            </div>
          )}
        </section>

        {guide && <PlanGuide place={p} guide={guide} />}

        {p.slug === "agra" && (
          <p className="mt-8">
            <Link href="/india/agra/taj-mahal/tickets-timings" className="link">
              Taj Mahal tickets and timings for foreign visitors
            </Link>
          </p>
        )}

        <section aria-labelledby="near-h" className="pt-20">
          <h2 id="near-h" className="text-h2">
            Also in this part of India
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {nearby.map((n) => (
              <DestinationCard key={n.slug} place={n} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
