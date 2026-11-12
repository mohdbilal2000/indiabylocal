import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingBox, StickyBar } from "@/components/BookingBox";
import { Crumbs } from "@/components/Chrome";
import { DayArc } from "@/components/DayArc";
import { JsonLd, breadcrumbLd } from "@/components/JsonLd";
import { Photo, hasPhoto } from "@/components/Photo";
import { TourCard } from "@/components/TourCard";
import { durationLabel, fromPrice, tourBySlug, tours, toursIn } from "@/lib/data";
import { destinationBySlug } from "@/lib/destinations";
import { SITE_LIVE, SITE_NAME, SITE_URL } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = tourBySlug((await params).slug);
  if (!tour) return {};
  const description = `${durationLabel(tour.durationHours)}, private, from $${fromPrice(tour)} per person. ${tour.highlights[0]}. Free cancellation to 24 hours before.`;
  return {
    title: tour.title,
    description: description.slice(0, 158),
    alternates: { canonical: `/tours/${tour.slug}` },
  };
}

export default async function TourPage({ params }: Props) {
  const tour = tourBySlug((await params).slug);
  if (!tour) notFound();
  const city = destinationBySlug(tour.city);
  if (!city) notFound();
  const from = fromPrice(tour);
  const photos = tour.photos.filter(hasPhoto).slice(0, 3);
  const similar = toursIn(tour.city)
    .filter((t) => t.slug !== tour.slug)
    .slice(0, 3);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: city.name, href: `/india/${city.slug}` },
    { name: tour.title },
  ];

  const facts = [
    ["Duration", durationLabel(tour.durationHours)],
    ["Group", "Private: only your party"],
    ["Starts", `${tour.startTime} India time`],
    ["Pickup", tour.pickup],
    ["Language", tour.languages.join(", ")],
    ["Cancellation", "Free until 24 hours before"],
  ];

  return (
    <div className="shell pt-6 pb-20 lg:pb-0">
      <JsonLd data={breadcrumbLd(crumbs)} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: tour.title,
          description: tour.summary,
          url: `${SITE_URL}/tours/${tour.slug}`,
          brand: { "@type": "Brand", name: SITE_NAME },
          offers: {
            "@type": "Offer",
            price: from,
            priceCurrency: "USD",
            url: `${SITE_URL}/tours/${tour.slug}`,
            ...(SITE_LIVE ? { availability: "https://schema.org/InStock" } : {}),
          },
        }}
      />
      <Crumbs items={crumbs} />

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:grid-rows-[auto_1fr] lg:gap-x-12">
        <div className="min-w-0 lg:col-start-1">
          <ul
            aria-label="Photos"
            className={`flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-2xl md:grid md:grid-rows-2 md:overflow-hidden ${photos.length > 1 ? "md:grid-cols-[2fr_1fr]" : ""}`}
          >
            {photos.map((name, i) => (
              <li
                key={name}
                className={`relative aspect-[4/3] ${photos.length > 1 ? "w-[88%]" : "w-full"} shrink-0 snap-center overflow-hidden rounded-xl md:w-auto md:rounded-none ${
                  i === 0 ? "md:row-span-2 md:aspect-auto md:min-h-[26rem]" : "md:aspect-auto"
                } ${photos.length === 2 && i === 1 ? "md:row-span-2" : ""}`}
              >
                <Photo name={name} sizes={i === 0 ? "(min-width: 1024px) 560px, 88vw" : "(min-width: 1024px) 280px, 88vw"} priority={i === 0} />
              </li>
            ))}
          </ul>
          <p className="mt-2 text-caption text-muted">
            Photographs of the places on the route.{" "}
            <a href="/credits" className="underline">
              Credits
            </a>
          </p>
          <h1 className="mt-5 text-h2">{tour.title}</h1>
          <p className="mt-2 text-small text-muted">
            <span className="mr-2 rounded-full bg-surface-alt px-2.5 py-1 text-caption font-semibold text-ink">Sample listing</span>
            Licensed guide · {city.name}
          </p>
          <p className="prose-col mt-4">{tour.summary}</p>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-hair py-5 text-small sm:grid-cols-3">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt className="text-caption text-muted">{k}</dt>
                <dd className="nums font-semibold">{v}</dd>
              </div>
            ))}
          </dl>

        </div>

        <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="lg:sticky lg:top-6">
            <BookingBox tour={tour} />
          </div>
        </aside>

        <div className="min-w-0 lg:col-start-1">
          <section aria-labelledby="hl-h" className="mt-4">
            <h2 id="hl-h" className="text-h3">
              Highlights
            </h2>
            <ul className="prose-col mt-3 space-y-2">
              {tour.highlights.map((h) => (
                <li key={h} className="flex gap-3">
                  <span aria-hidden="true" className="text-brand">
                    ●
                  </span>
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="pay-h" className="mt-12">
            <h2 id="pay-h" className="text-h3">
              What you&rsquo;ll pay
            </h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-sans text-small font-semibold tracking-normal">In the price</h3>
                <ul className="mt-2 space-y-1.5 text-small">
                  {tour.included.map((i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden="true" className="text-success">
                        ✓
                      </span>
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-sans text-small font-semibold tracking-normal">Paid on the day</h3>
                <table className="mt-2 w-full text-small">
                  <tbody>
                    {tour.ticketsUsd && (
                      <tr className="border-b border-hair">
                        <th scope="row" className="py-1.5 pr-3 text-left font-normal">
                          Monument tickets
                          <span className="block text-caption text-muted">{tour.ticketsNote}</span>
                        </th>
                        <td className="nums py-1.5 text-right align-top">
                          $0 with the tickets option, otherwise about ${tour.ticketsUsd} each
                        </td>
                      </tr>
                    )}
                    {tour.paidOnDay.map((p) => (
                      <tr key={p.item} className="border-b border-hair last:border-0">
                        <th scope="row" className="py-1.5 pr-3 text-left font-normal">
                          {p.item}
                        </th>
                        <td className="nums py-1.5 text-right">{p.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section aria-labelledby="it-h" className="mt-12">
            <h2 id="it-h" className="text-h3">
              Itinerary
            </h2>
            <p className="mt-1 text-small text-muted">All times are India time.</p>
            <div className="prose-col mt-4">
              <DayArc stops={tour.itinerary} />
            </div>
            <ol className="prose-col mt-5 border-l-2 border-brand">
              {tour.itinerary.map((s) => (
                <li key={s.time} className="relative pb-6 pl-6 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute top-1.5 -left-[7px] size-3 rounded-full border-2 border-brand bg-surface"
                  />
                  <p className="nums text-small font-semibold text-brand">{s.time}</p>
                  <h3 className="font-sans text-body font-semibold tracking-normal">{s.title}</h3>
                  <p className="text-small text-muted">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="meet-h" className="mt-12">
            <h2 id="meet-h" className="text-h3">
              Where you meet
            </h2>
            <p className="prose-col mt-3">{tour.meeting}</p>
            {tour.closedWeekdays?.map((c) => (
              <p key={c.day} className="prose-col mt-2 text-small text-warning">
                <span aria-hidden="true">! </span>
                {c.reason} This tour cannot be booked for that day.
              </p>
            ))}
          </section>

          <section aria-labelledby="guide-h" className="mt-12">
            <h2 id="guide-h" className="text-h3">
              Your guide
            </h2>
            <p className="prose-col mt-3 text-muted">
              When you book you get your guide&rsquo;s name, photograph, licence number and issuing authority, and can
              message them at once. Their phone number is shared 48 hours before the tour.
            </p>
          </section>

          <section aria-labelledby="cancel-h" className="mt-12">
            <h2 id="cancel-h" className="text-h3">
              Cancellation
            </h2>
            <p className="prose-col mt-3 text-muted">
              Free until 24 hours before the start time. Pick a date and the exact deadline appears in India time. If
              your guide has not arrived 15 minutes after the start, we arrange a replacement or refund you in full
              that day.
            </p>
          </section>
        </div>

      </div>

      {similar.length > 0 && (
        <section aria-labelledby="sim-h" className="mt-20">
          <h2 id="sim-h" className="text-h2">
            More in {city.name}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((t) => (
              <TourCard key={t.slug} tour={t} />
            ))}
          </div>
        </section>
      )}

      <StickyBar from={from} />
    </div>
  );
}
