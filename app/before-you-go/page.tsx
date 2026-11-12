import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Chrome";
import { JsonLd } from "@/components/JsonLd";
import { CITY_ANSWERS, SCAM_ANSWER, TOPIC_ANSWERS } from "@/lib/answers";
import { breadcrumbNode, faqNode, graph, organizationNode } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { worries } from "@/lib/worries";

export const metadata: Metadata = {
  title: "Before you go: ten worries about Delhi, Agra and Jaipur, answered",
  description: "Touts, drive times, heat, food, safety, hidden costs, Delhi's winter air and dress. A plain answer to each, with what helps and links to official advice.",
  alternates: { canonical: "/before-you-go", languages: { en: "/before-you-go", "x-default": "/before-you-go" } },
};

const faq = [...Object.values(TOPIC_ANSWERS), SCAM_ANSWER, ...(CITY_ANSWERS.agra ?? [])];

const books = [
  { title: "City of Djinns", author: "William Dalrymple", note: "Delhi through the people who lived in it." },
  { title: "Nine Lives", author: "William Dalrymple", note: "Nine people, nine ways of being devout in modern India." },
  { title: "In Spite of the Gods", author: "Edward Luce", note: "The modern country, explained for outsiders." },
];

export default function BeforeYouGo() {
  const crumbs = [{ name: "Home", href: "/" }, { name: "Before you go" }];
  const url = `${SITE_URL}/before-you-go`;
  return (
    <div className="shell pt-6">
      <JsonLd data={graph(organizationNode(), breadcrumbNode(url, crumbs), faqNode(url, faq.map((f) => ({ q: f.q, a: f.a }))))} />
      <Crumbs items={crumbs} />
      <h1 className="mt-6 max-w-3xl text-display">Before you go: ten worries, answered</h1>
      <p className="prose-col mt-4 text-muted">
        Nearly everyone planning Delhi, Agra and Jaipur worries about the same ten things. Here is a straight answer to
        each: what actually tends to happen, what you can do about it with or without us, and what we do. We have not
        quoted statistics we cannot source.
      </p>

      <nav aria-label="The ten worries" className="mt-6">
        <ul className="flex flex-wrap gap-2 text-small">
          {worries.map((w) => (
            <li key={w.id}>
              <a href={`#${w.id}`} className="inline-flex min-h-11 items-center rounded-full border border-line bg-card px-4 font-medium hover:border-brand">
                {w.title.split(",")[0]}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <ol className="mt-10 grid gap-5 md:grid-cols-2">
        {worries.map((w, i) => (
          <li key={w.id} id={w.id} className="reveal scroll-mt-24 rounded-2xl border border-hair bg-card p-5 md:p-6">
            <h2 className="flex gap-3 font-sans text-h4 font-semibold tracking-normal">
              <span aria-hidden="true" className="nums flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-small text-on-solid">
                {i + 1}
              </span>
              {w.title}
            </h2>
            <p className="mt-3">{w.happens}</p>
            <h3 className="mt-4 font-sans text-small font-semibold tracking-normal">What helps</h3>
            <ul className="mt-1.5 space-y-1.5 text-small">
              {w.helps.map((h) => (
                <li key={h} className="flex gap-2">
                  <span aria-hidden="true" className="text-brand">
                    ●
                  </span>
                  {h}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-xl bg-verified-soft p-3 text-small">
              <strong className="text-verified">What we do:</strong> {w.we}
            </p>
            {(w.sources || w.plan) && (
              <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-small">
                {w.plan && (
                  <Link href="/plans" className="link font-semibold">
                    See the paced plans
                  </Link>
                )}
                {w.sources?.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="link">
                    {s.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </p>
            )}
          </li>
        ))}
      </ol>

      <section aria-labelledby="q-h" className="pt-16">
        <h2 id="q-h" className="text-h2">
          Quick answers
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

      <section aria-labelledby="read-h" className="pt-16">
        <h2 id="read-h" className="text-h3">
          Three books to read first
        </h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {books.map((b) => (
            <li key={b.title} className="rounded-2xl border border-hair bg-card p-5 text-small">
              <p className="font-display text-h4 font-semibold">{b.title}</p>
              <p className="text-muted">{b.author}</p>
              <p className="mt-2">{b.note}</p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-caption text-muted">Chosen by us. No publisher or seller pays for a place on this list.</p>
      </section>

      <p className="mt-12">
        <Link href="/plans" className="btn">
          See the paced plans
        </Link>
      </p>
    </div>
  );
}
