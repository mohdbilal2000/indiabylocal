import type { Metadata } from "next";
import { Crumbs } from "@/components/Chrome";

export const metadata: Metadata = {
  title: "List your tour: for licensed guides in India",
  description:
    "For licensed guides in Agra, Delhi and Jaipur. Commission fixed in writing, your rupee amount guaranteed, and a listing you can publish from your phone.",
  alternates: { canonical: "/for-guides" },
};

const terms = [
  {
    title: "Commission fixed in writing",
    text: "The rate is in your agreement and does not move without your signature. Other platforms have raised theirs on operators mid-season.",
  },
  {
    title: "You set a rupee amount, and you receive it",
    text: "You tell us what you need to earn in rupees. The traveller's price is worked out from that. Currency movement is our risk, not yours.",
  },
  {
    title: "Paid after the tour",
    text: "Within 48 hours of the tour, once the traveller's card payment has settled with us.",
  },
  {
    title: "Your name on your work",
    text: "Your profile carries your name, photograph and licence number. Reviews attach to you, not to an agency.",
  },
];

const steps = [
  "Sign up with your phone number, in Hindi or English.",
  "Send your itinerary as a file, pasted text or a voice note, with your own photographs.",
  "We draft the English listing. You check every line, the price and the meeting point.",
  "We verify your licence, identity and bank account, then publish.",
];

export default function ForGuides() {
  return (
    <div className="shell pt-6">
      <Crumbs items={[{ name: "Home", href: "/" }, { name: "For guides" }]} />
      <h1 className="mt-4 text-display">You hold the licence. You should hold the customer.</h1>
      <p className="prose-col mt-4 text-muted">
        IndiaByLocal lists private day tours run by licensed guides in Agra, Delhi and Jaipur, and sells them to
        travellers from the US, UK, Europe, Canada and Australia.
      </p>

      <section aria-labelledby="terms-h" className="mt-12">
        <h2 id="terms-h" className="text-h2">
          The terms
        </h2>
        <ul className="mt-6 grid gap-6 md:grid-cols-2">
          {terms.map((t) => (
            <li key={t.title} className="rounded-2xl border border-hair bg-card p-5">
              <h3 className="font-sans text-h4 font-semibold tracking-normal">{t.title}</h3>
              <p className="mt-2 text-small text-muted">{t.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="steps-h" className="mt-16">
        <h2 id="steps-h" className="text-h2">
          Listing a tour
        </h2>
        <ol className="prose-col mt-6 space-y-4">
          {steps.map((s, i) => (
            <li key={s} className="flex gap-4">
              <span className="nums font-display text-h3 leading-none text-brand" aria-hidden="true">
                {i + 1}
              </span>
              <span>{s}</span>
            </li>
          ))}
        </ol>
        <p className="prose-col mt-8 rounded-2xl border border-line bg-surface-alt p-5 text-small">
          Sign-up is not open yet. It opens first to licensed guides in Agra.
        </p>
      </section>
    </div>
  );
}
