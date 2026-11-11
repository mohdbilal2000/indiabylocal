import Link from "next/link";
import { Photo } from "@/components/Photo";
import type { Destination } from "@/lib/destinations";

export function DestinationCard({
  place,
  note,
  tall = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw",
}: {
  place: Destination;
  note?: string;
  tall?: boolean;
  sizes?: string;
}) {
  return (
    <Link
      href={`/india/${place.slug}`}
      className={`group zoom relative block overflow-hidden rounded-2xl bg-surface-alt ${tall ? "aspect-[3/4]" : "aspect-[4/3]"}`}
    >
      <Photo name={place.slug} alt="" sizes={sizes} />
      <span className="scrim absolute inset-0" aria-hidden="true" />
      <span className="absolute inset-x-0 bottom-0 p-4 text-white">
        <span className="block font-display text-h4 font-semibold leading-tight">{place.name}</span>
        <span className="block text-caption opacity-90">{note ?? place.state}</span>
      </span>
    </Link>
  );
}
