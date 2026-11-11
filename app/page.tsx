import Link from "next/link";
import { Art } from "@/components/Art";
import { JsonLd, faqLd } from "@/components/JsonLd";
import { TourCard } from "@/components/TourCard";
import { cities, cityFrom, tours, toursIn } from "@/lib/data";
import { homeFaq } from "@/lib/faq";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = { alternates: { canonical: "/" } };

const promises = [
  {
    title: "Licence on the profile",
    text: "Each guide's licence number and issuing authority are shown, and checked by us.",
  },
  {
    title: "Price shown is price paid",
    text: "Per person, all-in, with monument tickets as a line you can see. No booking fees.",
  },
  {
    title: "No shopping stops",
    text: "Taken to a showroom you did not ask for? We refund the tour.",
  },
  {
    title: "Free cancellation",
    text: "Until 24 hours before the start, with the deadline shown in India time.",
  },
];

const steps = [
  { n: "1", title: "Pick a city and a tour", text: "A short list per city, not five hundred near-identical ones." },
  {
    n: "2",
    title: "Choose a date and group size",
    text: "The total updates as you go. You see the start in India time and in your own.",
  },
  {
    n: "3",
    title: "Meet your guide",
    text: "You get the guide's name, photo and licence number when you book, and can message them straight away.",
  },
];

export default function Home() {
  const featured = [tours[0], tours[1], tours[3], tours[5], tours[2], tours[4]];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
          description: SITE_DESCRIPTION,
        }}
      />
      <JsonLd data={faqLd(homeFaq)} />

      <section className="shell grid items-center gap-8 pt-8 pb-12 md:pt-14 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <h1 className="text-display">Licensed local guides in India. Fixed prices. Free cancellation.</h1>
          <p className="prose-col mt-4 text-muted">
            Private day tours in Agra, Delhi and Jaipur. You see the guide&rsquo;s licence number before you book and the
            full price before you pay.
          </p>
          <ul className="mt-6 grid grid-cols-3 gap-2 sm:gap-3">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/india/${c.slug}`}
                  className="flex min-h-20 flex-col justify-center rounded-2xl border border-line bg-card px-3 py-3 no-underline sm:px-4 hover:border-brand hover:bg-surface-alt"
                >
                  <span className="font-display text-h4 font-semibold text-brand">{c.name}</span>
                  <span className="nums text-caption text-muted">
                    {toursIn(c.slug).length === 1 ? "1 tour" : `${toursIn(c.slug).length} tours`} from ${cityFrom(c.slug)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Art kind="taj" rise className="aspect-[4/3] w-full rounded-2xl border border-hair lg:aspect-[5/4]" />
      </section>

      <section aria-labelledby="promise-h" className="border-y border-hair bg-surface-alt">
        <div className="shell py-10">
          <h2 id="promise-h" className="sr-only">
            What we commit to
          </h2>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {promises.map((p) => (
              <li key={p.title}>
                <p className="font-semibold">
                  <span aria-hidden="true" className="text-success">
                    ✓{" "}
                  </span>
                  {p.title}
                </p>
                <p className="mt-1 text-small text-muted">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="tours-h" className="shell pt-16">
        <h2 id="tours-h" className="text-h2">
          Tours to start with
        </h2>
        <p className="prose-col mt-2 text-muted">
          Six private tours across three cities. One listing per real tour, with the options inside it.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      </section>

      <section aria-labelledby="guide-h" className="shell grid gap-10 pt-20 lg:grid-cols-2 lg:items-center">
        <div>
          <h2 id="guide-h" className="text-h2">
            Everyone says &ldquo;licensed guide&rdquo;. We show the licence.
          </h2>
          <p className="prose-col mt-4 text-muted">
            In India only a government-licensed guide may guide inside protected monuments. An unlicensed one can be
            stopped at the gate, and your morning with them. So every guide profile here carries the details you can
            check yourself.
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-card p-5">
          <p className="text-caption uppercase tracking-wider text-muted">What a guide profile shows</p>
          <dl className="mt-3 divide-y divide-hair text-small">
            {[
              ["Name and photograph", "The person who will meet you, not an agency logo"],
              ["Licence number", "As printed on the guide's card"],
              ["Issued by", "Ministry of Tourism or the state tourism department"],
              ["Identity", "Government ID checked by us"],
              ["Languages", "Only the ones the guide can lead a full tour in"],
              ["Reviews", "From travellers who booked here, and nobody else"],
            ].map(([k, v]) => (
              <div key={k} className="grid grid-cols-[9rem_1fr] gap-3 py-2.5">
                <dt className="font-semibold">{k}</dt>
                <dd className="text-muted">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="how-h" className="shell pt-20">
        <h2 id="how-h" className="text-h2">
          How it works
        </h2>
        <ol className="mt-8 grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <li key={s.n} className="border-t-2 border-brand pt-4">
              <p className="font-display text-h3 text-brand" aria-hidden="true">
                {s.n}
              </p>
              <h3 className="mt-1 font-sans text-h4 font-semibold tracking-normal">{s.title}</h3>
              <p className="mt-1 text-small text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="faq-h" className="shell pt-20">
        <h2 id="faq-h" className="text-h2">
          Questions travellers ask first
        </h2>
        <div className="prose-col mt-6 divide-y divide-hair border-y border-hair">
          {homeFaq.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="text-h4 text-brand transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-4 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
