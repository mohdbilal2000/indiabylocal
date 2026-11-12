import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Chrome";
import { CompareTable } from "@/components/CompareTable";
import { TrustIcon } from "@/components/TrustBadges";
import { SCAM_ANSWER } from "@/lib/answers";
import type { TrustKey } from "@/lib/data";
import { TRUST } from "@/lib/trust";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/JsonLd";
import { homeFaq } from "@/lib/faq";
import { steps } from "@/lib/how";
import { SITE_LIVE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "How it works: booking, price and our Promise",
  description: `How ${SITE_NAME} works: choose a place, pick a tour with a named local guide, pay one price. What our Promise covers and how cancellation works.`,
  alternates: { canonical: "/how-it-works" },
};

const promise = [
  { t: "Your guide shows up", d: "If your guide is not there within 20 minutes of the start, we send another or refund the full tour price." },
  { t: "No shopping stops", d: "Your guide will not take you to a shop or workshop unless you ask. If it happens, tell us and we refund the tour." },
  { t: "The price is the price", d: "The total you see is all you pay us. If monument tickets or tips are extra, the amount is shown before you choose." },
  { t: "Licence checked", d: "We check each guide's government licence and identity before they can list a tour. The licence number is on their profile." },
  { t: "Free cancellation", d: "Cancel free until 24 hours before the start. The deadline is shown in India time beside your date." },
];

const faq = [...homeFaq, SCAM_ANSWER];

const compare = [
  ["Who your guide is", "Whoever approaches you at the gate. A licence is hard to check on the spot.", "Named before the day, with licence number and issuing authority."],
  ["The price", "Agreed on the spot. Extras can appear later.", "One total for your group, shown before you send a request."],
  ["Monument tickets", "You queue at the counter or buy online yourself.", "Included if you choose that option. If not, the amount is shown."],
  ["Shop stops", "Common, because many guides earn commission from showrooms.", "Not on the route. If it happens, the tour is refunded."],
  ["Start time", "Local time only.", "India time, and the same moment in your own time zone."],
  ["Cancelling", "Depends on the person you paid.", "Free until 24 hours before the start."],
  ["What it costs", "Often less, if you bargain well and know the going rate.", "A fixed price that includes our commission. Rarely the cheapest offer on the street."],
  ["Suits", "Repeat visitors with flexible days who enjoy arranging things.", "First visits, short trips, early starts and anyone who wants it settled in advance."],
];

export default function HowItWorks() {
  const crumbs = [{ name: "Home", href: "/" }, { name: "How it works" }];
  return (
    <div className="shell pt-6">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd data={faqLd(faq)} />
      <Crumbs items={crumbs} />
      <h1 className="mt-6 max-w-3xl text-display">How it works</h1>
      <p className="prose-col mt-4 text-muted">
        {SITE_NAME} lists day tours run by local operators and licensed guides across India. You book the tour, and
        the guide who runs it is the person you meet.
      </p>
      {!SITE_LIVE && (
        <p className="prose-col mt-4 rounded-xl border border-line bg-surface-alt p-4 text-small">
          This site is a preview. Traveller booking is not open yet, so the steps below describe how it will work.
        </p>
      )}

      <ol className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.t} className="reveal rounded-2xl border border-hair bg-card p-6">
            <span aria-hidden="true" className="nums flex size-10 items-center justify-center rounded-full bg-brand font-semibold text-white">
              {i + 1}
            </span>
            <h2 className="mt-4 font-sans text-h4 font-semibold tracking-normal">{s.t}</h2>
            <p className="mt-2 text-muted">{s.d}</p>
          </li>
        ))}
      </ol>

      <section id="promise" aria-labelledby="promise-h" className="scroll-mt-24 pt-16">
        <h2 id="promise-h" className="text-h2">
          Our Promise
        </h2>
        <p className="prose-col mt-2 text-muted">Five commitments, in plain words. They are in addition to your legal rights.</p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {promise.map((p) => (
            <li key={p.t} className="reveal flex gap-4 rounded-2xl border border-verified bg-card p-5">
              <svg viewBox="0 0 56 56" aria-hidden="true" className="size-10 shrink-0">
                <circle cx="28" cy="28" r="25" fill="none" stroke="var(--color-verified)" strokeWidth="2" />
                <path d="M18 29l7 7 14-15" className="promise-tick" />
              </svg>
              <div>
                <h3 className="font-sans text-body font-semibold tracking-normal">{p.t}</h3>
                <p className="mt-1 text-small text-muted">{p.d}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section id="badges" aria-labelledby="badges-h" className="scroll-mt-24 pt-16">
        <h2 id="badges-h" className="text-h2">
          What the green badges mean
        </h2>
        <p className="prose-col mt-2 text-muted">
          Green is used on this site only for something we have checked ourselves. There are four badges. A tour shows
          a badge only after the check behind it has been done.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {(Object.keys(TRUST) as TrustKey[]).map((k) => (
            <li key={k} className="reveal rounded-2xl border border-hair bg-card p-5">
              <p className="flex items-center gap-3 font-semibold">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-verified-soft text-verified">
                  <TrustIcon kind={k} />
                </span>
                {TRUST[k].label}
              </p>
              <p className="mt-3 text-small">{TRUST[k].means}</p>
              <p className="mt-2 text-small text-muted">
                <strong className="text-ink">How we check:</strong> {TRUST[k].check}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="cmp-h" className="pt-16">
        <h2 id="cmp-h" className="sr-only">
          Compared with arranging a guide yourself
        </h2>
        <CompareTable
          caption="Arranging a guide yourself, or booking one here"
          columns={["", "Arranging it yourself on arrival", `With a guide from ${SITE_NAME}`]}
          rows={compare}
          note="A fair comparison, including where arranging it yourself is the better choice."
        />
      </section>

      <section aria-labelledby="q-h" className="pt-16">
        <h2 id="q-h" className="text-h2">
          Common questions
        </h2>
        <div className="prose-col mt-4 divide-y divide-hair border-y border-hair">
          {faq.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="text-h4 text-brand transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pb-5 text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-12">
        <Link href="/destinations" className="btn">
          Choose a place
        </Link>
      </p>
    </div>
  );
}
