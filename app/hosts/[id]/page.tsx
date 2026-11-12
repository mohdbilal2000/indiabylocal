import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Crumbs } from "@/components/Chrome";
import { JsonLd } from "@/components/JsonLd";
import { ListingCard } from "@/components/TourCard";
import { TrustIcon } from "@/components/TrustBadges";
import { type PublicListing, db } from "@/lib/db";
import { ORG_ID, breadcrumbNode, graph, organizationNode } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type Host = { id: string; business_name: string; base_city: string; licence_no: string | null; created_at: string };

/** Only verified operators have a public page. Contact details are never selected. */
async function load(id: string): Promise<{ host: Host; listings: PublicListing[] } | null> {
  if (!UUID.test(id)) return null;
  const sql = db();
  const hosts = await sql`select id, business_name, base_city, licence_no, created_at from operators where id = ${id} and status = 'verified'`;
  const host = hosts[0] as Host | undefined;
  if (!host) return null;
  const listings = await sql`
    select l.*, o.business_name, o.licence_no
    from listings l join operators o on o.id = l.operator_id
    where l.operator_id = ${id} and l.status = 'published' order by l.updated_at desc limit 30`;
  return { host, listings: listings as PublicListing[] };
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await load((await params).id);
  if (!data) return {};
  const { host } = data;
  return {
    title: `${host.business_name}: tours from ${host.base_city}`,
    description: `${host.business_name} runs tours from ${host.base_city} and has been checked by ${SITE_NAME}. See what was verified and the tours on offer.`.slice(0, 158),
    alternates: { canonical: `/hosts/${host.id}` },
  };
}

export default async function HostPage({ params }: Props) {
  const data = await load((await params).id);
  if (!data) notFound();
  const { host, listings } = data;
  const url = `${SITE_URL}/hosts/${host.id}`;
  const crumbs = [{ name: "Home", href: "/" }, { name: host.business_name }];
  const since = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "Asia/Kolkata" }).format(new Date(host.created_at));
  const checks = [
    { kind: "licence" as const, done: Boolean(host.licence_no), text: host.licence_no ? `Guide licence on file: ${host.licence_no}` : "No guide licence number on file" },
    { kind: "monument" as const, done: true, text: "Identity and business details reviewed by our team" },
    { kind: "promise" as const, done: true, text: "Has agreed to the no-shopping-stop Promise" },
  ];

  return (
    <div className="shell pt-6">
      <JsonLd
        data={graph(organizationNode(), breadcrumbNode(url, crumbs), {
          "@type": "ProfilePage",
          "@id": url,
          url,
          mainEntity: {
            "@type": "Organization",
            "@id": `${url}#operator`,
            name: host.business_name,
            url,
            address: { "@type": "PostalAddress", addressLocality: host.base_city, addressCountry: "IN" },
            memberOf: { "@id": ORG_ID },
            ...(host.licence_no ? { hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "Tourist guide licence", identifier: host.licence_no } } : {}),
          },
        })}
      />
      <Crumbs items={crumbs} />
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <span aria-hidden="true" className="flex size-20 shrink-0 items-center justify-center rounded-full bg-verified-soft font-display text-h2 font-semibold text-verified">
          {host.business_name.slice(0, 1).toUpperCase()}
        </span>
        <div>
          <h1 className="text-h2">{host.business_name}</h1>
          <p className="mt-1 text-muted">
            Based in {host.base_city} · On {SITE_NAME} since {since}
          </p>
        </div>
      </div>

      <section aria-labelledby="chk-h" className="pt-10">
        <h2 id="chk-h" className="text-h3">
          What we have checked
        </h2>
        <ul className="prose-col mt-4 divide-y divide-hair rounded-2xl border border-hair bg-card">
          {checks.map((c) => (
            <li key={c.text} className={`flex items-center gap-3 p-4 ${c.done ? "" : "text-muted"}`}>
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${c.done ? "bg-verified-soft text-verified" : "bg-surface-alt"}`}>
                <TrustIcon kind={c.kind} />
              </span>
              {c.text}
            </li>
          ))}
        </ul>
        <p className="prose-col mt-3 text-small text-muted">
          Reviews from travellers will appear here once this operator has completed tours booked through {SITE_NAME}. We
          do not copy reviews from other sites.
        </p>
      </section>

      <section aria-labelledby="t-h" className="pt-14">
        <h2 id="t-h" className="text-h3">
          Tours by {host.business_name}
        </h2>
        {listings.length === 0 ? (
          <p className="mt-4 text-muted">No tour is live at the moment.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {listings.map((l) => (
              <ListingCard key={l.id} listing={l} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
