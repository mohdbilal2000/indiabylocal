import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import { ListingCard, TourCard } from "@/components/TourCard";
import { tourBySlug } from "@/lib/data";
import { type PublicListing, db } from "@/lib/db";
import { SAVED_COOKIE, parseSaved } from "@/lib/saved";
import { SITE_LIVE } from "@/lib/site";

export const metadata: Metadata = { title: "Saved tours", robots: { index: false } };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function listingsFor(ids: string[]): Promise<PublicListing[]> {
  if (ids.length === 0) return [];
  try {
    const rows = await db()`
      select l.*, o.business_name, o.licence_no
      from listings l join operators o on o.id = l.operator_id
      where l.id = any(${ids}::uuid[]) and l.status = 'published' and o.status = 'verified'`;
    return rows as PublicListing[];
  } catch {
    return [];
  }
}

export default async function Saved() {
  const ids = parseSaved((await cookies()).get(SAVED_COOKIE)?.value);
  const samples = SITE_LIVE
    ? []
    : ids
        .filter((id) => id.startsWith("t:"))
        .map((id) => tourBySlug(id.slice(2)))
        .filter((t) => t !== undefined);
  const listings = await listingsFor(ids.filter((id) => id.startsWith("l:") && UUID.test(id.slice(2))).map((id) => id.slice(2)));
  const empty = samples.length + listings.length === 0;

  return (
    <div className="shell pt-10">
      <h1 className="text-h2">Saved tours</h1>
      <p className="prose-col mt-2 text-muted">
        Tours you marked with a heart, kept on this device. Tap the heart again to remove one.
      </p>
      {empty ? (
        <div className="mt-8 rounded-2xl border border-line bg-surface-alt p-6 md:p-8">
          <p className="text-h4 font-semibold">Nothing saved yet.</p>
          <p className="prose-col mt-2 text-muted">Tap the heart on any tour and it will be waiting for you here.</p>
          <Link href="/destinations" className="btn mt-5">
            Choose a place
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
          {samples.map((t) => (
            <TourCard key={t.slug} tour={t} />
          ))}
        </div>
      )}
    </div>
  );
}
