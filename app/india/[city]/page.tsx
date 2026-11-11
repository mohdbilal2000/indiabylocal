import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumbs } from "@/components/Chrome";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { TourCard } from "@/components/TourCard";
import { cities, cityBySlug, cityFrom, toursIn } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

type Props = { params: Promise<{ city: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cityBySlug((await params).city);
  if (!city) return {};
  const n = toursIn(city.slug).length;
  const count = n === 1 ? "1 private tour" : `${n} private tours`;
  return {
    title: `Private tours in ${city.name} with licensed guides`,
    description: `${count} in ${city.name} from $${cityFrom(city.slug)} per person. Named, licence-verified guides, all-in prices, free cancellation.`,
    alternates: { canonical: `/india/${city.slug}` },
  };
}

export default async function CityPage({ params }: Props) {
  const city = cityBySlug((await params).city);
  if (!city) notFound();
  const list = toursIn(city.slug);
  const pick = list[0];
  const crumbs = [{ name: "Home", href: "/" }, { name: "India" }, { name: city.name }];

  return (
    <div className="shell pt-6">
      <JsonLd data={breadcrumbLd([{ name: "Home", href: "/" }, { name: city.name, href: `/india/${city.slug}` }])} />
      <Crumbs items={crumbs} />
      <h1 className="mt-4 text-display">Private tours in {city.name}</h1>
      <p className="nums mt-3 text-muted">
        {list.length === 1 ? "1 tour" : `${list.length} tours`} · from ${cityFrom(city.slug)} per person · free cancellation
      </p>
      <p className="prose-col mt-4">{city.intro}</p>

      <section aria-labelledby="pick-h" className="mt-10 rounded-2xl border border-line bg-surface-alt p-5 md:p-8">
        <p className="text-caption uppercase tracking-wider text-muted">Our pick for a first visit</p>
        <h2 id="pick-h" className="mt-1 text-h3">
          <Link href={`/tours/${pick.slug}`} className="hover:underline">
            {pick.title}
          </Link>
        </h2>
        <p className="prose-col mt-2 text-muted">{pick.summary}</p>
      </section>

      <section aria-labelledby="all-h" className="mt-12">
        <h2 id="all-h" className="text-h2">
          All tours in {city.name}
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      </section>

      <section aria-labelledby="facts-h" className="mt-16">
        <h2 id="facts-h" className="text-h2">
          Worth knowing before you book
        </h2>
        <ul className="prose-col mt-4 divide-y divide-hair border-y border-hair">
          {city.facts.map((f) => (
            <li key={f.text} className="py-3">
              {f.text}{" "}
              {f.href && (
                <Link href={f.href} className="link text-small">
                  Details
                </Link>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
