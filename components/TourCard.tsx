import Link from "next/link";
import { DayArc } from "@/components/DayArc";
import { Photo } from "@/components/Photo";
import { type Tour, cheapestOption, durationLabel, fromPrice } from "@/lib/data";
import { type PublicListing, inr } from "@/lib/db";
import { destinationBySlug } from "@/lib/destinations";

const SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";

export function TourCard({ tour }: { tour: Tour }) {
  const from = fromPrice(tour);
  const cheapest = cheapestOption(tour);
  const tickets = tour.ticketsUsd
    ? cheapest.ticketsIncluded
      ? "Monument tickets included"
      : `Monument tickets not included (about $${tour.ticketsUsd})`
    : "Everything on the route included";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-hair bg-card transition-shadow duration-200 hover:shadow-lg hover:shadow-black/10">
      <div className="zoom relative aspect-[4/3]">
        <Photo name={tour.photos[0]} alt="" sizes={SIZES} />
        <span className="absolute top-3 left-3 rounded-full bg-card px-3 py-1 text-caption font-semibold">Sample</span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-caption text-muted">
          {durationLabel(tour.durationHours)} · Private · {tour.pickup}
        </p>
        <h3 className="font-sans text-h4 font-semibold tracking-normal">
          <Link href={`/tours/${tour.slug}`} className="no-underline after:absolute after:inset-0">
            {tour.title}
          </Link>
        </h3>
        <DayArc stops={tour.itinerary} compact />
        <p className="text-small text-verified">
          <span aria-hidden="true">✓ </span>Free cancellation · Covered by the Promise
        </p>
        <div className="mt-auto pt-2">
          <p className="nums text-price font-semibold">
            <span className="text-small font-normal text-muted">From </span>${from}
            <span className="text-small font-normal text-muted"> per person</span>
          </p>
          <p className="text-caption text-muted">{tickets}</p>
        </div>
      </div>
    </article>
  );
}

/** A listing published by an operator through the dashboard. */
export function ListingCard({ listing }: { listing: PublicListing }) {
  const place = destinationBySlug(listing.destination);
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-hair bg-card transition-shadow duration-200 hover:shadow-lg hover:shadow-black/10">
      <div className="zoom relative aspect-[4/3]">
        <Photo name={listing.destination} alt="" sizes={SIZES} />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-caption text-muted">
          {durationLabel(Number(listing.duration_hours))} · Up to {listing.max_group} · {place?.name}
        </p>
        <h3 className="font-sans text-h4 font-semibold tracking-normal">
          <Link href={`/listing/${listing.id}`} className="no-underline after:absolute after:inset-0">
            {listing.title}
          </Link>
        </h3>
        <p className="text-small text-muted">By {listing.business_name}</p>
        <p className="nums mt-auto pt-2 text-price font-semibold">
          <span className="text-small font-normal text-muted">From </span>
          {inr(listing.price_inr)}
          <span className="text-small font-normal text-muted"> per person</span>
        </p>
      </div>
    </article>
  );
}
