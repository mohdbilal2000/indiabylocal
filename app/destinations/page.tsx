import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Chrome";
import { DestinationCard } from "@/components/DestinationCard";
import { destinations, inRegion, regions, states } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Destinations in India by region and state",
  description: `${destinations.length} destinations across ${states.length} Indian states and territories, from Ladakh and Kashmir to Kerala and the Andaman Islands.`,
  alternates: { canonical: "/destinations" },
};

export default function Destinations() {
  return (
    <div className="shell pt-6">
      <Crumbs items={[{ name: "Home", href: "/" }, { name: "Destinations" }]} />
      <h1 className="mt-4 text-display">Destinations in India</h1>
      <p className="prose-col mt-3 text-muted">
        {destinations.length} places across {states.length} states and territories.
      </p>

      <nav aria-label="Regions" className="sticky top-16 z-10 -mx-4 mt-6 overflow-x-auto border-b border-hair bg-surface/95 px-4 backdrop-blur">
        <ul className="flex gap-1 text-small">
          {regions.map((r) => (
            <li key={r.slug}>
              <a href={`#${r.slug}`} className="inline-flex min-h-12 items-center whitespace-nowrap rounded-lg px-3 font-medium hover:bg-surface-alt">
                {r.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {regions.map((r) => (
        <section key={r.slug} id={r.slug} aria-labelledby={`${r.slug}-h`} className="scroll-mt-32 pt-14">
          <h2 id={`${r.slug}-h`} className="text-h2">
            {r.name}
          </h2>
          <p className="mt-1 text-muted">{r.line}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {inRegion(r.slug).map((p) => (
              <DestinationCard key={p.slug} place={p} />
            ))}
          </div>
        </section>
      ))}

      <section aria-labelledby="st-h" className="pt-20">
        <h2 id="st-h" className="text-h2">
          By state
        </h2>
        <ul className="mt-6 columns-2 gap-8 text-small md:columns-3 lg:columns-4">
          {states.map((s) => (
            <li key={s.slug} className="break-inside-avoid">
              <Link href={`/states/${s.slug}`} className="inline-flex min-h-9 items-center hover:text-brand hover:underline">
                {s.name} <span className="nums ml-1.5 text-muted">({s.destinations.length})</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
