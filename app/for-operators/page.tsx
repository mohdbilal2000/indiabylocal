import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/Photo";
import { destinations, states } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "List your tours: for tour operators and guides in India",
  description:
    "For tour operators and licensed guides anywhere in India. Create an account, list your day tours, set your rupee price. Commission fixed in writing.",
  alternates: { canonical: "/for-operators" },
};

const terms = [
  { title: "Commission fixed in writing", text: "The rate is in your agreement and does not move without your signature. Other platforms have raised theirs on operators mid-season." },
  { title: "You set a rupee amount, and you receive it", text: "You tell us what you need to earn per person in rupees. The traveller's price is worked out from that. Currency movement is our risk, not yours." },
  { title: "Paid after the tour", text: "Within 48 hours of the tour, once the traveller's card payment has settled with us." },
  { title: "Your name on your work", text: "Your listing carries your business name and licence number. Reviews attach to you, not to us." },
];

const steps = [
  { t: "Create your account", d: "Business name, contact person, phone and the city you work from. Two minutes." },
  { t: "Add your tours", d: "Destination, title, what happens, duration, start time, meeting point and your price. Save a draft and come back to it." },
  { t: "Submit for review", d: "We check your licence and identity, then read the listing against our rules: day tours only, no shopping stops, a price that includes everything." },
  { t: "Go live", d: "Approved tours appear on the destination page straight away." },
];

export default function ForOperators() {
  return (
    <>
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          <Photo name="jaipur" alt="" sizes="100vw" priority />
          <div className="absolute inset-0 bg-night/85" />
        </div>
        <div className="shell py-16 text-white md:py-24">
          <p className="text-small font-semibold uppercase tracking-[0.18em] text-action">For tour operators and guides</p>
          <h1 className="mt-3 max-w-3xl text-display">You run the tour. You should keep the customer.</h1>
          <p className="mt-4 max-w-2xl opacity-90">
            IndiaByLocal lists day tours run by local operators and licensed guides in {destinations.length}{" "}
            destinations across {states.length} states and territories, and sells them to travellers from the US, UK,
            Europe, Canada and Australia.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/operators/signup" className="btn">
              Create an operator account
            </Link>
            <Link href="/operators/login" className="inline-flex min-h-12 items-center rounded-lg border border-white/60 px-5 font-semibold hover:bg-white hover:text-ink">
              Log in
            </Link>
          </div>
        </div>
      </section>

      <div className="shell">
        <section aria-labelledby="terms-h" className="pt-16">
          <h2 id="terms-h" className="text-h2">
            The terms
          </h2>
          <ul className="mt-6 grid gap-5 md:grid-cols-2">
            {terms.map((t) => (
              <li key={t.title} className="rounded-2xl border border-hair bg-card p-6">
                <h3 className="font-sans text-h4 font-semibold tracking-normal">{t.title}</h3>
                <p className="mt-2 text-small text-muted">{t.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="steps-h" className="pt-16">
          <h2 id="steps-h" className="text-h2">
            From sign-up to live
          </h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t} className="border-t-2 border-brand pt-4">
                <p className="nums font-display text-h3 text-brand" aria-hidden="true">
                  {i + 1}
                </p>
                <h3 className="mt-1 font-sans text-h4 font-semibold tracking-normal">{s.t}</h3>
                <p className="mt-1 text-small text-muted">{s.d}</p>
              </li>
            ))}
          </ol>
          <Link href="/operators/signup" className="btn mt-10">
            Create an operator account
          </Link>
        </section>
      </div>
    </>
  );
}
