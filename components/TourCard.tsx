import Link from "next/link";
import { CardGallery } from "@/components/CardGallery";
import { Money } from "@/components/Currency";
import { DayArc } from "@/components/DayArc";
import { Photo, hasPhoto } from "@/components/Photo";
import { SaveButton } from "@/components/SaveButton";
import { TrustIcon } from "@/components/TrustBadges";
import { type Tour, cheapestOption, durationLabel, fromPrice } from "@/lib/data";
import type { PublicListing } from "@/lib/db";
import { destinationBySlug } from "@/lib/destinations";
import { TRUST } from "@/lib/trust";

const SIZES = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw";
const CARD = "group lift relative flex flex-col overflow-hidden rounded-2xl border border-hair bg-card";
const PILL = "inline-flex items-center gap-1 rounded-full bg-card/95 px-2.5 py-1 text-caption font-semibold shadow-sm";

/**
 * A tour in a grid. The whole card is one link (the title), the photographs
 * swipe, and the heart saves it. `priority` is for a card that is on screen
 * when the page first paints.
 */
export function TourCard({ tour, priority = false }: { tour: Tour; priority?: boolean }) {
  const href = `/tours/${tour.slug}`;
  const from = fromPrice(tour);
  const cheapest = cheapestOption(tour);
  const photos = tour.photos.filter(hasPhoto);
  const lead = tour.trust[0];

  return (
    <article className={CARD}>
      <div className="relative">
        <CardGallery count={photos.length} label={`Photographs: ${tour.title}`}>
          {photos.map((name, i) => (
            <li key={name} className="zoom relative aspect-[4/3] w-full shrink-0 snap-center">
              <Link href={href} tabIndex={-1} aria-hidden="true" className="absolute inset-0">
                <Photo name={name} alt="" sizes={SIZES} priority={priority && i === 0} />
              </Link>
            </li>
          ))}
        </CardGallery>
        <p className="pointer-events-none absolute top-3 left-3 z-20 flex flex-wrap gap-1.5">
          <span className={PILL}>Sample</span>
          {lead && (
            <span className={`${PILL} text-verified`}>
              <TrustIcon kind={lead} className="size-4" />
              {TRUST[lead].short}
            </span>
          )}
        </p>
        <SaveButton id={`t:${tour.slug}`} title={tour.title} className="absolute top-2 right-2 z-20" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-caption text-muted">
          {durationLabel(tour.durationHours)} · Private · In {tour.languages.join(", ")}
        </p>
        <h3 className="font-sans text-h4 font-semibold tracking-normal">
          <Link href={href} className="no-underline after:absolute after:inset-0">
            {tour.title}
          </Link>
        </h3>
        <p className="text-small text-muted">{tour.pickup}</p>
        <DayArc stops={tour.itinerary} compact />
        <p className="text-small text-verified">
          <span aria-hidden="true">✓ </span>Free cancellation · Covered by the Promise
        </p>
        <div className="mt-auto pt-2">
          <p className="nums text-price font-semibold">
            <span className="text-small font-normal text-muted">From </span>
            <Money amount={from} currency="USD" />
            <span className="text-small font-normal text-muted"> per person</span>
          </p>
          <p className="text-caption text-muted">
            {tour.ticketsUsd ? (
              cheapest.ticketsIncluded ? (
                "Monument tickets included"
              ) : (
                <>
                  Monument tickets not included (about <Money amount={tour.ticketsUsd} currency="USD" />)
                </>
              )
            ) : (
              "Everything on the route included"
            )}
          </p>
        </div>
      </div>
    </article>
  );
}

/** A listing published by an operator through the dashboard. */
export function ListingCard({ listing }: { listing: PublicListing }) {
  const place = destinationBySlug(listing.destination);
  const href = `/listing/${listing.id}`;
  return (
    <article className={CARD}>
      <div className="zoom relative aspect-[4/3]">
        <Photo name={listing.destination} alt="" sizes={SIZES} />
        {listing.licence_no && (
          <p className="pointer-events-none absolute top-3 left-3 z-20">
            <span className={`${PILL} text-verified`}>
              <TrustIcon kind="licence" className="size-4" />
              {TRUST.licence.short}
            </span>
          </p>
        )}
        <SaveButton id={`l:${listing.id}`} title={listing.title} className="absolute top-2 right-2 z-20" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-caption text-muted">
          {durationLabel(Number(listing.duration_hours))} · Up to {listing.max_group} · {place?.name}
        </p>
        <h3 className="font-sans text-h4 font-semibold tracking-normal">
          <Link href={href} className="no-underline after:absolute after:inset-0">
            {listing.title}
          </Link>
        </h3>
        <p className="text-small text-muted">By {listing.business_name}</p>
        <p className="nums mt-auto pt-2 text-price font-semibold">
          <span className="text-small font-normal text-muted">From </span>
          <Money amount={listing.price_inr} currency="INR" />
          <span className="text-small font-normal text-muted"> per person</span>
        </p>
      </div>
    </article>
  );
}
