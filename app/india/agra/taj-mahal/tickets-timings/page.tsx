import type { Metadata } from "next";
import Link from "next/link";
import { Crumbs } from "@/components/Chrome";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { TourCard } from "@/components/TourCard";
import { toursIn } from "@/lib/data";

const PATH = "/india/agra/taj-mahal/tickets-timings";

export const metadata: Metadata = {
  title: "Taj Mahal tickets and timings for foreign visitors",
  description:
    "What a foreign visitor pays at the Taj Mahal, when it opens, the day it is closed, and which gate to use. Each figure carries the date it was last checked.",
  alternates: { canonical: PATH },
};

/**
 * DRAFT FIGURES. These are the long-published official rates, written from
 * desk knowledge. Before SITE_LIVE=1 each row must be checked at the ticket
 * window or on the official ASI site and given a real "verified" date.
 */
const rows = [
  { item: "Entry, foreign visitor", value: "₹1,100" },
  { item: "Main mausoleum, added to any ticket", value: "₹200" },
  { item: "Entry, visitor from a SAARC or BIMSTEC country", value: "₹540" },
  { item: "Entry, Indian visitor", value: "₹50" },
  { item: "Children under 15", value: "Free" },
];

const answers = [
  {
    q: "Is the Taj Mahal open every day?",
    a: "No. The Taj Mahal is closed to visitors every Friday. On the other six days it opens around half an hour before sunrise and closes around half an hour before sunset, so the exact times move through the year. Tours on this site cannot be booked for a Friday.",
  },
  {
    q: "How much is the Taj Mahal ticket for foreigners?",
    a: "A foreign visitor pays ₹1,100 to enter and a further ₹200 to go inside the main mausoleum, so ₹1,300 for the full visit. Most people want the mausoleum. Children under 15 enter free. A tour sold here with tickets included covers both parts.",
  },
  {
    q: "Which gate should I use?",
    a: "There are two working gates for visitors, East and West. The East Gate is closer to most hotels and is usually the quieter one at sunrise; the West Gate is the main entrance from the city and takes most day-trip groups. The South Gate is exit-only.",
  },
  {
    q: "What can I not bring in?",
    a: "Security is strict. Leave tripods, large bags, food, tobacco, drones and anything that could mark the marble at your hotel. A small bag, a phone, a camera and a water bottle are fine. Shoe covers are handed out with the foreign-visitor ticket for the mausoleum platform.",
  },
];

export default function TicketsTimings() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Agra", href: "/india/agra" },
    { name: "Taj Mahal tickets and timings" },
  ];
  return (
    <div className="shell pt-6">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <Crumbs items={crumbs} />
      <article>
        <h1 className="mt-4 text-display">Taj Mahal tickets and timings</h1>
        <p className="prose-col mt-4 rounded-lg border border-line bg-surface-alt p-4 text-small">
          <strong>Draft, not yet verified on site.</strong> These are the published official rates. Each figure will
          carry the date we last checked it at the ticket window before this page is opened to search engines.
        </p>

        <h2 className="mt-10 text-h3">Ticket prices</h2>
        <table className="nums prose-col mt-4 w-full text-small">
          <thead>
            <tr className="border-b border-line text-left">
              <th scope="col" className="py-2 pr-4">
                Ticket
              </th>
              <th scope="col" className="py-2 text-right">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.item} className="border-b border-hair">
                <th scope="row" className="py-2 pr-4 text-left font-normal">
                  {r.item}
                </th>
                <td className="py-2 text-right font-semibold">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {answers.map((x) => (
          <section key={x.q} className="prose-col mt-10">
            <h2 className="text-h3">{x.q}</h2>
            <p className="mt-3">{x.a}</p>
          </section>
        ))}
      </article>

      <section aria-labelledby="t-h" className="mt-16">
        <h2 id="t-h" className="text-h2">
          See it with a licensed guide
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {toursIn("agra")
            .slice(0, 2)
            .map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
        </div>
        <p className="mt-6">
          <Link href="/india/agra" className="link">
            All tours in Agra
          </Link>
        </p>
      </section>
    </div>
  );
}
