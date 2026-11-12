import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Chrome";
import { CompareTable } from "@/components/CompareTable";
import { JsonLd } from "@/components/JsonLd";
import { PlanCard } from "@/components/PlanCards";
import { plans } from "@/lib/plans";
import { breadcrumbNode, graph, organizationNode } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Delhi, Agra and Jaipur plans: 4, 5 or 7 days",
  description: "Three paced plans for the Golden Triangle, day by day, with drive times, the Taj Mahal's Friday closure and a rest built in. Choose by how much you want to see.",
  alternates: { canonical: "/plans", languages: { en: "/plans", "x-default": "/plans" } },
};

export default function Plans() {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Trip plans" }];
  const rows = plans.map((p) => [
    <Link key={p.slug} href={`/plans/${p.slug}`} className="link">
      {p.title}
    </Link>,
    p.nights,
    p.plan.filter((d) => d.drive).length === 1 ? "One long drive" : `${p.plan.filter((d) => d.drive).length} drive days`,
    p.suits,
  ]);
  return (
    <div className="shell pt-6">
      <JsonLd
        data={graph(organizationNode(), breadcrumbNode(`${SITE_URL}/plans`, crumbs), {
          "@type": "ItemList",
          name: "Delhi, Agra and Jaipur plans",
          itemListElement: plans.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: `${SITE_URL}/plans/${p.slug}` })),
        })}
      />
      <Crumbs items={crumbs} />
      <h1 className="mt-6 max-w-3xl text-display">Delhi, Agra and Jaipur, paced properly</h1>
      <p className="prose-col mt-4 text-muted">
        The most common complaint about this route is that it is too much, too fast: hours in a car and a few minutes
        at each place. These three plans do the same route at three different speeds. Pick by how many days you have
        and how you like to travel.
      </p>
      <p className="prose-col mt-3 rounded-xl border border-line bg-surface-alt p-4 text-small">
        These are planning guides, not packages. Each day is booked on its own as a day tour with {SITE_NAME}, and you
        arrange your own hotels and long-distance transport. Drive times are typical, not promised.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <PlanCard key={p.slug} plan={p} />
        ))}
      </div>

      <section aria-labelledby="cmp-h" className="pt-16">
        <h2 id="cmp-h" className="sr-only">
          The three plans compared
        </h2>
        <CompareTable caption="The three plans compared" columns={["Plan", "Nights", "Driving", "Suits"]} rows={rows} />
      </section>

      <p className="mt-10">
        <Link href="/before-you-go" className="link font-semibold">
          Read the ten things travellers worry about, answered
        </Link>
      </p>
    </div>
  );
}
