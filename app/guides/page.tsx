import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Chrome";
import { CompareTable } from "@/components/CompareTable";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { destinations, inRegion, regions } from "@/lib/destinations";
import { GUIDES_REVIEWED, guideFor } from "@/lib/guides";

export const metadata: Metadata = {
  title: "India city guides: when to go, how long to stay, how to get there",
  description: `Short planning guides to ${destinations.length} places in India: the best months, how many days you need, how to get there and what to know before you go.`,
  alternates: { canonical: "/guides" },
};

const place = (slug: string) => {
  const p = destinations.find((d) => d.slug === slug);
  return p ? (
    <Link key={slug} href={`/india/${slug}`} className="link">
      {p.name}
    </Link>
  ) : null;
};
const places = (...slugs: string[]) => <>{slugs.map((s, i) => [i > 0 ? ", " : "", place(s)])}</>;

const circuits = [
  ["Golden Triangle", places("delhi", "agra", "jaipur"), "5 to 7 days", "October to March", "The Taj Mahal is closed on Fridays. Morning fog in December and January.", "Inside the Taj Mahal, Agra Fort and Amber Fort, where only licensed guides may work."],
  ["Rajasthan forts", places("jaipur", "jodhpur", "jaisalmer", "udaipur"), "8 to 10 days", "October to March", "Long road distances between cities. Extreme heat from April to June.", "The hill forts, where the history is not on the signboards."],
  ["Ganges and the Buddhist trail", places("varanasi", "bodh-gaya"), "4 to 6 days", "October to March", "High river levels in the monsoon can stop boats at Varanasi.", "The lanes and ghats of Varanasi, which are easy to get lost in."],
  ["Temples of central India", places("khajuraho", "orchha", "gwalior", "sanchi"), "5 to 7 days", "October to March", "Few direct trains. A car between towns saves a day.", "The temple carvings at Khajuraho."],
  ["Temples and ruins of the south", places("hampi", "mysuru", "madurai", "mahabalipuram"), "8 to 10 days", "November to February", "Temple dress codes, and inner shrines that close at midday.", "Large living temples, where a guide explains what you may and may not enter."],
  ["Kerala", places("kochi", "munnar", "alleppey", "thekkady"), "6 to 8 days", "October to March", "Heavy monsoon rain from June to August.", "Fort Kochi on foot, and the backwaters by local boat."],
];

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

      <section aria-labelledby="circuits-h" className="pt-14">
        <h2 id="circuits-h" className="sr-only">
          Classic routes at a glance
        </h2>
        <CompareTable
          caption="Six classic routes at a glance"
          columns={["Route", "Places", "Time needed", "Best months", "Plan around", "Where a licensed guide matters most"]}
          rows={circuits}
          note={`Typical figures for a first visit, reviewed ${GUIDES_REVIEWED}. Closing days change, so confirm them before you travel.`}
        />
      </section>

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
