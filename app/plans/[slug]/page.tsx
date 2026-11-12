import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crumbs } from "@/components/Chrome";
import { JsonLd } from "@/components/JsonLd";
import { DayCard, PlanCard } from "@/components/PlanCards";
import { destinationBySlug } from "@/lib/destinations";
import { type Plan, planBySlug, plans } from "@/lib/plans";
import { breadcrumbNode, graph, organizationNode } from "@/lib/schema";
import { SITE_LIVE, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return plans.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const plan = planBySlug((await params).slug);
  if (!plan) return {};
  const path = `/plans/${plan.slug}`;
  const description = `${plan.line} Day by day, with drive times and what to avoid.`.slice(0, 158);
  return {
    title: plan.title,
    description,
    alternates: { canonical: path, languages: { en: path, "x-default": path } },
    openGraph: { type: "article", url: path, title: plan.title, description, images: [{ url: `/photos/${plan.plan[0].photo}.jpg` }] },
  };
}

export default async function PlanPage({ params }: Props) {
  const plan = planBySlug((await params).slug) as Plan | undefined;
  if (!plan) notFound();
  const url = `${SITE_URL}/plans/${plan.slug}`;
  const crumbs = [{ name: "Home", href: "/" }, { name: "Trip plans", href: "/plans" }, { name: plan.title }];
  const others = plans.filter((p) => p.slug !== plan.slug);

  return (
    <div className="shell pt-6">
      <JsonLd
        data={graph(organizationNode(), breadcrumbNode(url, crumbs), {
          "@type": "TouristTrip",
          "@id": `${url}#plan`,
          name: plan.title,
          description: plan.line,
          url,
          touristType: plan.suits,
          itinerary: {
            "@type": "ItemList",
            numberOfItems: plan.plan.length,
            itemListElement: plan.plan.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: { "@type": "City", name: destinationBySlug(d.city)?.name, description: `Day ${i + 1}: ${d.title}. ${d.summary}` },
            })),
          },
        })}
      />
      <Crumbs items={crumbs} />
      <h1 className="mt-6 max-w-3xl text-display">{plan.title}</h1>
      <p className="prose-col mt-4 text-body">{plan.line}</p>
      <dl className="mt-6 grid gap-4 rounded-2xl border border-hair bg-card p-5 text-small sm:grid-cols-3">
        <div>
          <dt className="text-caption text-muted">Nights</dt>
          <dd className="font-semibold">{plan.nights}</dd>
        </div>
        <div>
          <dt className="text-caption text-muted">Suits</dt>
          <dd className="font-semibold">{plan.suits}</dd>
        </div>
        <div>
          <dt className="text-caption text-muted">Built to avoid</dt>
          <dd>
            <ul className="space-y-1 font-semibold">
              {plan.avoids.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
      <p className="prose-col mt-4 text-small text-muted">
        A planning guide, not a package. Book each day as its own day tour and arrange your own hotels and long drives.
        {!SITE_LIVE && " The tours linked below are samples while we sign up our first guides."}
      </p>

      <ol className="mt-10 grid gap-6 md:grid-cols-2">
        {plan.plan.map((d, i) => (
          <DayCard key={d.title} day={d} n={i + 1} sample={!SITE_LIVE} />
        ))}
      </ol>

      <section aria-labelledby="more-h" className="pt-16">
        <h2 id="more-h" className="text-h3">
          Other plans
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {others.map((p) => (
            <PlanCard key={p.slug} plan={p} />
          ))}
        </div>
        <p className="mt-8">
          <Link href="/before-you-go" className="link font-semibold">
            Ten things travellers worry about, answered
          </Link>
        </p>
      </section>
    </div>
  );
}
