import Link from "next/link";
import { Art } from "@/components/Art";
import { type Tour, cheapestOption, durationLabel, fromPrice } from "@/lib/data";

export function TourCard({ tour }: { tour: Tour }) {
  const from = fromPrice(tour);
  const cheapest = cheapestOption(tour);
  const tickets = tour.ticketsUsd
    ? cheapest.ticketsIncluded
      ? "Monument tickets included"
      : `Monument tickets not included (about $${tour.ticketsUsd})`
    : "Everything on the route included";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-hair bg-card">
      <Art kind={tour.art} className="aspect-[4/3] w-full" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-caption text-muted">
          {durationLabel(tour.durationHours)} · Private · {tour.pickup}
        </p>
        <h3 className="font-sans text-h4 font-semibold tracking-normal">
          <Link href={`/tours/${tour.slug}`} className="no-underline after:absolute after:inset-0 group-hover:underline">
            {tour.title}
          </Link>
        </h3>
        <p className="text-small text-muted">New · Licensed guide</p>
        <p className="text-small text-success">
          <span aria-hidden="true">✓ </span>Free cancellation
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
