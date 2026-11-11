import { neon } from "@neondatabase/serverless";

/** Tagged-template SQL client. Values are always sent as parameters. */
export function db() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  return neon(url);
}

export type Operator = {
  id: string;
  email: string;
  business_name: string;
  contact_name: string;
  phone: string;
  base_city: string;
  licence_no: string | null;
  status: "pending" | "verified" | "suspended";
};

export type Listing = {
  id: string;
  operator_id: string;
  destination: string;
  title: string;
  summary: string;
  duration_hours: string;
  start_time: string;
  price_inr: number;
  max_group: number;
  meeting_point: string;
  highlights: string;
  included: string;
  status: "draft" | "submitted" | "published" | "withdrawn";
  updated_at: string;
};

export type PublicListing = Listing & { business_name: string; licence_no: string | null };

/** Published listings for a destination. Never throws: a database outage shows an empty list. */
export async function publishedIn(destination: string): Promise<PublicListing[]> {
  try {
    const rows = await db()`
      select l.*, o.business_name, o.licence_no
      from listings l join operators o on o.id = l.operator_id
      where l.destination = ${destination} and l.status = 'published' and o.status = 'verified'
      order by l.updated_at desc limit 30`;
    return rows as PublicListing[];
  } catch {
    return [];
  }
}

export async function publishedCounts(): Promise<Record<string, number>> {
  try {
    const rows = await db()`
      select l.destination, count(*)::int as n
      from listings l join operators o on o.id = l.operator_id
      where l.status = 'published' and o.status = 'verified'
      group by l.destination`;
    return Object.fromEntries(rows.map((r) => [r.destination as string, r.n as number]));
  } catch {
    return {};
  }
}

export const lines = (text: string) =>
  text
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
