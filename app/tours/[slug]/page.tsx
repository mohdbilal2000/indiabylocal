import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BookingBox, MobileBooking } from "@/components/BookingBox";
import { Crumbs } from "@/components/Chrome";
import { Money } from "@/components/Currency";
import { DayArc } from "@/components/DayArc";
import { ItineraryTimeline } from "@/components/ItineraryTimeline";
import { JsonLd } from "@/components/JsonLd";
import { Photo, hasPhoto, photoCredits } from "@/components/Photo";
import { SaveButton } from "@/components/SaveButton";
import { TourCard } from "@/components/TourCard";
import { TrustPanel, TrustPills } from "@/components/TrustBadges";
import { bookableFromTour } from "@/lib/booking";
import { durationLabel, fromPrice, tourBySlug, tours, toursIn } from "@/lib/data";
import { destinationBySlug } from "@/lib/destinations";
import { tourFaq, tourGraph } from "@/lib/schema";
import { SITE_LIVE, SITE_NAME } from "@/lib/site";

/** Tour pages are built once and served from the edge. Anything not in the catalogue is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return tours.map((t) => ({ slug: t.slug }));
}

type Props = { params: Promise<{ slug: string }> };

const shareImages = (names: string[]) =>
  names.filter(hasPhoto).map((name) => ({
    url: `/photos/${name}.jpg`,
    width: photoCredits[name].w,
    height: photoCredits[name].h,
    alt: photoCredits[name].subject,
  }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tour = tourBySlug((await params).slug);
  if (!tour) return {};
  const city = destinationBySlug(tour.city);
  const path = `/tours/${tour.slug}`;
  const description = `${durationLabel(tour.durationHours)}, private, from $${fromPrice(tour)} per person. ${tour.highlights[0]}. Free cancellation to 24 hours before.`.slice(0, 158);
  const images = shareImages(tour.photos).slice(0, 1);
  return {
    title: tour.title,
    description,
    // One language today. x-default tells search engines this page serves every market until translations exist.
    alternates: { canonical: path, languages: { en: path, "x-default": path } },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: `${tour.title}${city ? ` · ${city.name}` : ""}`,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: tour.title, description, images: images.map((i) => i.url) },
    robots: SITE_LIVE
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
      : { index: false, follow: false },
  };
}

export default async function TourPage({ params }: Props) {
  const tour = tourBySlug((await params).slug);
  if (!tour) notFound();
  const city = destinationBySlug(tour.city);
  if (!city) notFound();
  const photos = tour.photos.filter(hasPhoto).slice(0, 3);
  const similar = toursIn(tour.city)
    .filter((t) => t.slug !== tour.slug)
    .slice(0, 3);
  const crumbs = [
    { name: "Home", href: "/" },
    { name: city.name, href: `/india/${city.slug}` },
    { name: tour.title },
  ];
  const item = bookableFromTour(tour, city.name);
  const faq = tourFaq(tour, city.name);

  const facts = [
    ["Duration", durationLabel(tour.durationHours)],
    ["Group", "Private: only your party"],
    ["Starts", `${tour.startTime} India time`],
    ["Pickup", tour.pickup],
    ["Language", tour.languages.join(", ")],
    ["Cancellation", "Free until 24 hours before"],
  ];

  return (
    <div className="shell pt-6 pb-24 lg:pb-0">
      <JsonLd data={tourGraph(tour, city, crumbs, shareImages(tour.photos))} />
      <Crumbs items={crumbs} />

      <div className="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1fr)_400px] lg:grid-rows-[auto_1fr] lg:gap-x-12">
        <div className="min-w-0 lg:col-start-1">
          <div className="relative">
            <ul
              aria-label="Photos"
              className={`flex snap-x snap-mandatory gap-2 overflow-x-auto rounded-2xl [scrollbar-width:none] md:grid md:grid-rows-2 md:overflow-hidden [&::-webkit-scrollbar]:hidden ${photos.length > 1 ? "md:grid-cols-[2fr_1fr]" : ""}`}
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
            <SaveButton id={`t:${tour.slug}`} title={tour.title} className="absolute top-3 right-3" />
          </div>
          <p className="mt-2 text-caption text-muted">
            Photographs of the places on the route.{" "}
            <a href="/credits" className="underline">
              Credits
            </a>
          </p>
          <p className="mt-5 text-small text-muted">
            <span className="mr-2 rounded-full bg-surface-alt px-2.5 py-1 text-caption font-semibold text-ink">Sample listing</span>
            {city.name}, {city.state}
          </p>
          <h1 className="mt-2 text-h2">{tour.title}</h1>
          <div className="mt-3">
            <TrustPills keys={tour.trust} />
          </div>
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

        <aside className="hidden lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:block">
          <div className="lg:sticky lg:top-20 lg:max-h-[calc(100dvh-6rem)] lg:overflow-y-auto lg:overscroll-contain lg:rounded-2xl">
            <BookingBox item={item} />
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
            <p className="prose-col mt-2 text-small text-muted">
              From <Money amount={fromPrice(tour)} currency="USD" /> per person. The exact total for your group is shown before you send a request.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-hair bg-card p-5">
                <h3 className="font-sans text-body font-semibold tracking-normal">In the price</h3>
                <ul className="mt-3 space-y-2 text-small">
                  {tour.included.map((i) => (
                    <li key={i} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-verified-soft text-caption font-bold text-verified">
                        ✓
                      </span>
                      <span>
                        <span className="sr-only">Included: </span>
                        {i}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-hair bg-card p-5">
                <h3 className="font-sans text-body font-semibold tracking-normal">Not in the price</h3>
                <ul className="mt-3 space-y-2 text-small">
                  {tour.ticketsUsd && (
                    <li className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-error/10 text-caption font-bold text-error">
                        ✕
                      </span>
                      <span>
                        <span className="sr-only">Not included: </span>
                        Monument tickets, unless you choose the tickets option: about <Money amount={tour.ticketsUsd} currency="USD" /> each.
                        <span className="block text-caption text-muted">{tour.ticketsNote}</span>
                      </span>
                    </li>
                  )}
                  {tour.paidOnDay.map((p) => (
                    <li key={p.item} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-error/10 text-caption font-bold text-error">
                        ✕
                      </span>
                      <span>
                        <span className="sr-only">Not included: </span>
                        {p.item}: <span className="nums">{p.amount.toLowerCase()}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section aria-labelledby="it-h" className="mt-12">
            <h2 id="it-h" className="text-h3">
              The day, stop by stop
            </h2>
            <div className="prose-col mt-4">
              <DayArc stops={tour.itinerary} />
            </div>
            <div className="mt-5">
              <ItineraryTimeline stops={tour.itinerary} />
            </div>
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

          <TrustPanel keys={tour.trust} sample />

          <section aria-labelledby="guide-h" className="mt-12">
            <h2 id="guide-h" className="text-h3">
              Your guide
            </h2>
            <div className="prose-col mt-4 flex gap-4 rounded-2xl border border-hair bg-card p-5">
              <span aria-hidden="true" className="flex size-14 shrink-0 items-center justify-center rounded-full bg-surface-alt text-muted">
                <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0" />
                </svg>
              </span>
              <div className="text-small">
                <p className="font-semibold">A named guide, before you pay</p>
                <p className="mt-1 text-muted">
                  When your request is confirmed you get your guide&rsquo;s name, photograph, licence number and the
                  authority that issued it, and can message them at once. Their phone number is shared 48 hours before
                  the tour.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="cancel-h" className="mt-12">
            <h2 id="cancel-h" className="text-h3">
              Cancellation
            </h2>
            <p className="prose-col mt-3 text-muted">
              Free until 24 hours before the start time. Pick a date and the exact deadline appears in India time. If
              your guide has not arrived 20 minutes after the start, we send another or refund you in full.
            </p>
          </section>

          <section aria-labelledby="faq-h" className="mt-12">
            <h2 id="faq-h" className="text-h3">
              Questions about this tour
            </h2>
            <div className="prose-col mt-3 divide-y divide-hair border-y border-hair">
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

      <MobileBooking item={item} />
    </div>
  );
}
