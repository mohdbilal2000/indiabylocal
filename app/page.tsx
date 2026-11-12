import Link from "next/link";
import { DestinationCard } from "@/components/DestinationCard";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { Search } from "@/components/Search";
import { PlanCard } from "@/components/PlanCards";
import { Today } from "@/components/Today";
import { TourCard } from "@/components/TourCard";
import { tours } from "@/lib/data";
import { destinationBySlug, destinations, inRegion, popular, regions, states } from "@/lib/destinations";
import { homeFaq } from "@/lib/faq";
import { steps } from "@/lib/how";
import { plans } from "@/lib/plans";
import { worries } from "@/lib/worries";
import { faqNode, graph, organizationNode, websiteNode } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata = {
  alternates: { canonical: "/", languages: { en: "/", "x-default": "/" } },
  openGraph: { type: "website", url: "/", images: [{ url: "/photos/agra.jpg", width: 1280, height: 842, alt: "The Taj Mahal seen across its gardens" }] },
};

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
      <JsonLd data={graph(organizationNode(), websiteNode(), faqNode(SITE_URL, homeFaq))} />

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
                  className="inline-flex min-h-10 items-center rounded-full border border-white/50 bg-black/25 px-4 backdrop-blur hover:bg-white hover:text-night"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
          <Today />
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
                <span aria-hidden="true" className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-verified text-caption font-bold text-on-solid">
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

      <section aria-labelledby="how-h" className="shell pt-20">
        <h2 id="how-h" className="text-h2">
          How it works
        </h2>
        <ol className="mt-8 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.t} className="reveal rounded-2xl border border-hair bg-card p-6">
              <span aria-hidden="true" className="nums flex size-10 items-center justify-center rounded-full bg-brand font-semibold text-on-solid">
                {i + 1}
              </span>
              <h3 className="mt-4 font-sans text-h4 font-semibold tracking-normal">{s.t}</h3>
              <p className="mt-2 text-muted">{s.d}</p>
            </li>
          ))}
        </ol>
        <p className="mt-6">
          <Link href="/how-it-works" className="link font-semibold">
            Read our Promise in full
          </Link>
        </p>
      </section>

      <section aria-labelledby="plans-h" className="shell pt-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 id="plans-h" className="text-h2">
              Delhi, Agra and Jaipur, paced properly
            </h2>
            <p className="prose-col mt-2 text-muted">
              The classic route is often done too fast. Three plans, day by day, with the drive times written down.
            </p>
          </div>
          <Link href="/plans" className="btn-ghost">
            Compare the plans
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <PlanCard key={p.slug} plan={p} />
          ))}
        </div>
      </section>

      <section aria-labelledby="worry-h" className="shell pt-20">
        <h2 id="worry-h" className="text-h2">
          What travellers worry about, and straight answers
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {worries.map((w) => (
            <li key={w.id}>
              <Link href={`/before-you-go#${w.id}`} className="lift flex min-h-16 items-center rounded-2xl border border-hair bg-card p-4 text-small font-semibold no-underline">
                {w.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="reg-h" className="shell pt-20">
        <h2 id="reg-h" className="text-h2">
          Browse by region
        </h2>
        <p className="mt-2 text-muted">Tap a region to see its places.</p>
        <div className="mt-6 grid gap-3 md:grid-cols-2">
          {regions.map((r) => (
            <details key={r.slug} className="group rounded-2xl border border-hair bg-card">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block font-display text-h4 font-semibold">{r.name}</span>
                  <span className="block text-small text-muted">
                    {inRegion(r.slug).length} places · {r.line}
                  </span>
                </span>
                <span aria-hidden="true" className="text-h4 text-brand transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <ul className="grid grid-cols-2 gap-x-4 border-t border-hair px-5 py-3 text-small sm:grid-cols-3">
                {inRegion(r.slug).map((p) => (
                  <li key={p.slug}>
                    <Link href={`/india/${p.slug}`} className="flex min-h-11 items-center hover:text-brand hover:underline">
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section aria-labelledby="tours-h" className="mt-20 bg-surface-alt py-16">
        <div className="shell">
          <h2 id="tours-h" className="text-h2">
            See the day before you book it
          </h2>
          <p className="prose-col mt-2 text-muted">
            Every tour shows the day stop by stop and the full price for your group. These six are samples while we
            sign up our first operators.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tours.map((t, i) => (
              <div key={t.slug} className={i > 2 ? "hidden sm:block" : undefined}>
                <TourCard tour={t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="op-h" className="shell pt-20">
        <div className="relative isolate overflow-hidden rounded-3xl">
          <div className="absolute inset-0 -z-10">
            <Photo name="jodhpur" alt="" sizes="100vw" />
            <div className="absolute inset-0 bg-night/85" />
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
              <Link href="/for-operators" className="inline-flex min-h-12 items-center rounded-lg border border-white/60 px-5 font-semibold hover:bg-white hover:text-night">
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
