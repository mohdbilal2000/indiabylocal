import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Chrome";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { destinations, inRegion, regions } from "@/lib/destinations";
import { GUIDES_REVIEWED, guideFor } from "@/lib/guides";

export const metadata: Metadata = {
  title: "India city guides: when to go, how long to stay, how to get there",
  description: `Short planning guides to ${destinations.length} places in India: the best months, how many days you need, how to get there and what to know before you go.`,
  alternates: { canonical: "/guides" },
};

export default function Guides() {
  const crumbs = [{ name: "Home", href: "/" }, { name: "City guides" }];
  return (
    <div className="shell pt-6">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Crumbs items={crumbs} />
      <h1 className="mt-6 max-w-3xl text-display">City guides</h1>
      <p className="prose-col mt-4 text-muted">
        One short guide for each of the {destinations.length} places we cover. Each answers the same questions: when
        to go, how long to stay, how to get there, and what to know before you arrive. Reviewed {GUIDES_REVIEWED}.
      </p>

      <nav aria-label="Regions" className="mt-6 flex flex-wrap gap-2 text-small">
        {regions.map((r) => (
          <a key={r.slug} href={`#${r.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 font-medium hover:border-brand">
            {r.name}
          </a>
        ))}
      </nav>

      {regions.map((r) => (
        <section key={r.slug} id={r.slug} aria-labelledby={`${r.slug}-h`} className="scroll-mt-24 pt-14">
          <h2 id={`${r.slug}-h`} className="text-h2">
            {r.name}
          </h2>
          <p className="mt-1 text-muted">{r.line}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {inRegion(r.slug).map((p) => {
              const g = guideFor(p.slug);
              return (
                <li key={p.slug}>
                  <Link href={`/india/${p.slug}#plan`} className="lift flex h-full flex-col rounded-2xl border border-hair bg-card p-5 no-underline">
                    <span className="font-display text-h4 font-semibold">{p.name}</span>
                    <span className="text-small text-muted">{p.state}</span>
                    <span className="mt-3 text-small">
                      <strong>Best months:</strong> {p.best}
                    </span>
                    {g && (
                      <span className="mt-1 text-small">
                        <strong>Stay:</strong> {g.days}
                      </span>
                    )}
                    <span className="mt-auto pt-3 text-small font-semibold text-brand">Read the guide</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
