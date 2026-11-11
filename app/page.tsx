import Link from "next/link";
import { DestinationCard } from "@/components/DestinationCard";
import { JsonLd, faqLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { Search } from "@/components/Search";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/lib/data";
import { destinationBySlug, destinations, inRegion, popular, regions, states } from "@/lib/destinations";
import { homeFaq } from "@/lib/faq";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = { alternates: { canonical: "/" } };

const promises = [
  { title: "Licence on the profile", text: "Each guide's licence number and issuing authority are shown, and checked by us." },
  { title: "Price shown is price paid", text: "Per person, all-in, with monument tickets as a line you can see. No booking fees." },
  { title: "No shopping stops", text: "Taken to a showroom you did not ask for? We refund the tour." },
  { title: "Free cancellation", text: "Until 24 hours before the start, with the deadline shown in India time." },
];

export default function Home() {
  const top = popular.map((s) => destinationBySlug(s)).filter((x) => x !== undefined);
  const searchItems = destinations.map(({ slug, name, state, known }) => ({ slug, name, state, known }));

  return (
    <>
      <JsonLd
        data={{ "@context": "https://schema.org", "@type": "Organization", name: SITE_NAME, url: SITE_URL, description: SITE_DESCRIPTION }}
      />
      <JsonLd data={faqLd(homeFaq)} />

      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Photo name="agra" alt="The Taj Mahal seen across its gardens" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        </div>
        <div className="shell flex min-h-[min(78svh,720px)] flex-col justify-end pt-24 pb-10 text-white md:pb-16">
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-action">
            {destinations.length} destinations · {states.length} states and territories
          </p>
          <h1 className="mt-3 max-w-4xl text-display">See India with the people who live there.</h1>
          <p className="mt-4 max-w-2xl text-body opacity-95">
            Day tours run by local operators and licensed guides, from Ladakh to Kerala. One all-in price, free
            cancellation, no shopping stops.
          </p>
          <div className="mt-8 max-w-2xl">
            <Search items={searchItems} />
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 text-small">
            {top.slice(0, 6).map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/india/${p.slug}`}
                  className="inline-flex min-h-10 items-center rounded-full border border-white/50 bg-black/25 px-4 backdrop-blur hover:bg-white hover:text-ink"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="promise-h" className="border-b border-hair bg-card">
        <div className="shell py-8">
          <h2 id="promise-h" className="sr-only">
            What we commit to
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <li key={p.title} className="flex gap-3">
                <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-success text-caption font-bold text-white">
                  ✓
                </span>
                <span>
                  <span className="block font-semibold">{p.title}</span>
                  <span className="mt-0.5 block text-small text-muted">{p.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="pop-h" className="shell pt-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="pop-h" className="text-h2">
              Where most people start
            </h2>
            <p className="mt-2 text-muted">The places first-time visitors ask for, and a few they should.</p>
          </div>
          <Link href="/destinations" className="btn-ghost">
            All {destinations.length} destinations
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {top.map((p) => (
            <DestinationCard key={p.slug} place={p} tall />
          ))}
        </div>
      </section>

      <section aria-labelledby="reg-h" className="shell pt-20">
        <h2 id="reg-h" className="text-h2">
          Every corner of the country
        </h2>
        <div className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {regions.map((r) => (
            <div key={r.slug} className="border-t-2 border-brand pt-4">
              <h3 className="text-h4">
                <Link href={`/destinations#${r.slug}`} className="hover:underline">
                  {r.name}
                </Link>
              </h3>
              <p className="mt-1 text-caption text-muted">{r.line}</p>
              <ul className="mt-3 flex flex-wrap gap-x-3 text-small">
                {inRegion(r.slug).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/india/${p.slug}`} className="inline-flex min-h-8 items-center hover:text-brand hover:underline">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="tours-h" className="mt-20 bg-surface-alt py-16">
        <div className="shell">
          <h2 id="tours-h" className="text-h2">
            What a listing looks like
          </h2>
          <p className="prose-col mt-2 text-muted">
            Six sample tours that show the format: one listing per real tour, the options inside it, and the full
            price worked out before you pay.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="op-h" className="shell pt-20">
        <div className="relative isolate overflow-hidden rounded-3xl">
          <div className="absolute inset-0 -z-10">
            <Photo name="jodhpur" alt="" sizes="100vw" />
            <div className="absolute inset-0 bg-brand/85" />
          </div>
          <div className="grid gap-8 p-8 text-white md:p-14 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <p className="text-small font-semibold uppercase tracking-[0.18em] text-action">Tour operators and guides</p>
              <h2 id="op-h" className="mt-3 text-h2">
                You run the tour. You should keep the customer.
              </h2>
              <p className="mt-4 max-w-xl opacity-90">
                Create an account, list your day tours and set the rupee amount you want to receive. Commission is
                fixed in writing and your name stays on your work.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link href="/operators/signup" className="btn">
                Create an operator account
              </Link>
              <Link href="/for-operators" className="inline-flex min-h-12 items-center rounded-lg border border-white/60 px-5 font-semibold hover:bg-white hover:text-ink">
                How it works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-h" className="shell grid gap-8 pt-20 lg:grid-cols-[1fr_1.6fr]">
        <h2 id="faq-h" className="text-h2">
          Questions travellers ask first
        </h2>
        <div className="divide-y divide-hair border-y border-hair">
          {homeFaq.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="text-h4 text-brand transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="prose-col pb-5 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
