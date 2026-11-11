import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumbs } from "@/components/Chrome";
import { DestinationCard } from "@/components/DestinationCard";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { stateBySlug, states } from "@/lib/destinations";

export const dynamicParams = false;
export function generateStaticParams() {
  return states.map((s) => ({ state: s.slug }));
}

type Props = { params: Promise<{ state: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = stateBySlug((await params).state);
  if (!s) return {};
  return {
    title: `Tours in ${s.name}: ${s.destinations.map((d) => d.name).slice(0, 3).join(", ")}`,
    description: `Day tours with local operators and licensed guides in ${s.name}: ${s.destinations.map((d) => d.name).join(", ")}.`.slice(0, 158),
    alternates: { canonical: `/states/${s.slug}` },
  };
}

export default async function StatePage({ params }: Props) {
  const s = stateBySlug((await params).state);
  if (!s) notFound();
  const crumbs = [{ name: "Home", href: "/" }, { name: "Destinations", href: "/destinations" }, { name: s.name }];
  return (
    <div className="shell pt-6">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Crumbs items={crumbs} />
      <h1 className="mt-4 text-display">{s.name}</h1>
      <p className="mt-3 text-muted">
        {s.destinations.length === 1 ? "1 destination" : `${s.destinations.length} destinations`}
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {s.destinations.map((p) => (
          <DestinationCard key={p.slug} place={p} note={p.known.slice(0, 2).join(" · ")} />
        ))}
      </div>
    </div>
  );
}
