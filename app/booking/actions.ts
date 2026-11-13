"use server";

import { randomInt } from "node:crypto";
import { type Bookable, bookableFromListing, bookableFromTour, dateProblem, quote } from "@/lib/booking";
import { tourBySlug } from "@/lib/data";
import { type PublicListing, db } from "@/lib/db";
import { destinationBySlug } from "@/lib/destinations";
import { SITE_LIVE } from "@/lib/site";
import { clientIp, isThrottled, keyOf, recordAttempt } from "@/lib/throttle";

export type RequestInput = {
  ref: string;
  optionId: string;
  date: string;
  people: number;
  name: string;
  email: string;
  phone: string;
  note: string;
  /** Hidden field. A person never fills it in. */
  website: string;
};

export type RequestResult = { ok: true; code: string } | { ok: false; error: string };

/** Kept identical to the booking_requests block in db/schema.sql. */
const CREATE_TABLE = `
create table if not exists booking_requests (
  id          uuid primary key default gen_random_uuid(),
  code        text not null unique,
  tour_ref    text not null,
  title       text not null,
  destination text not null,
  option_name text not null,
  tour_date   date not null,
  people      integer not null check (people between 1 and 30),
  total       integer not null check (total > 0),
  currency    text not null check (currency in ('USD', 'INR')),
  name        text not null,
  email       text not null,
  phone       text,
  note        text,
  mailbox     text,
  status      text not null default 'new' check (status in ('new', 'answered', 'closed')),
  created_at  timestamptz not null default now()
)`;

/** One mailbox written many ways (a+tag@, gmail dots) counts once. */
function mailboxKey(email: string): string {
  const [local, domain] = email.split("@");
  const base = local.split("+")[0];
  return `${/^(gmail|googlemail)\.com$/.test(domain) ? base.replace(/\./g, "") : base}@${domain === "googlemail.com" ? "gmail.com" : domain}`;
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

function newCode(): string {
  let out = "IBL-";
  for (let i = 0; i < 6; i++) out += CODE_ALPHABET[randomInt(CODE_ALPHABET.length)];
  return out;
}

async function load(ref: string): Promise<Bookable | null> {
  if (ref.startsWith("t:")) {
    if (SITE_LIVE) return null;
    const tour = tourBySlug(ref.slice(2));
    const city = tour && destinationBySlug(tour.city);
    return tour && city ? bookableFromTour(tour, city.name) : null;
  }
  if (ref.startsWith("l:") && UUID.test(ref.slice(2))) {
    const rows = await db()`
      select l.*, o.business_name, o.licence_no
      from listings l join operators o on o.id = l.operator_id
      where l.id = ${ref.slice(2)} and l.status = 'published' and o.status = 'verified'`;
    const l = rows[0] as PublicListing | undefined;
    return l ? bookableFromListing(l, destinationBySlug(l.destination)?.name ?? l.destination) : null;
  }
  return null;
}

const text = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Records a request for a tour on a date. Nothing is charged and nothing is
 * reserved: a person replies by email. Every value is re-checked here, and
 * the price is worked out again on the server rather than trusted from the page.
 */
export async function requestBooking(input: RequestInput): Promise<RequestResult> {
  const fail = (error: string): RequestResult => ({ ok: false, error });
  if (typeof input !== "object" || input === null) return fail("Something went wrong. Please try again.");
  // A filled honeypot gets a normal-looking answer and is not stored.
  if (text(input.website, 200)) return { ok: true, code: newCode() };

  const name = text(input.name, 80);
  const email = text(input.email, 160).toLowerCase();
  const phone = text(input.phone, 20);
  const note = text(input.note, 600);
  const people = Number(input.people);

  if (name.length < 2) return fail("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail("Please enter a valid email address.");
  if (phone && !/^\+?[0-9 ()-]{7,20}$/.test(phone)) return fail("Please enter the phone number with its country code, for example +1 415 555 0100, or leave it empty.");

  let item: Bookable | null;
  try {
    item = await load(text(input.ref, 120));
  } catch {
    return fail("We could not reach our records just now. Please try again in a minute.");
  }
  if (!item) return fail("This tour is no longer available.");
  if (!Number.isInteger(people) || people < 1 || people > item.maxGroup) return fail(`Please choose between 1 and ${item.maxGroup} travellers.`);
  const date = text(input.date, 10);
  const problem = dateProblem(item, date, Date.now());
  if (problem) return fail(problem);
  const { option, total } = quote(item, text(input.optionId, 40), people);

  const ipKey = keyOf(`ip:${await clientIp()}`);
  if (await isThrottled("booking", ipKey, 10, 60)) return fail("We are not able to take another request from this connection right now. Please try again later.");

  const insert = async () => {
    // Opened here so that a missing or unreachable database becomes a plain message, not a crashed page.
    const sql = db();
    const code = newCode();
    const mailbox = mailboxKey(email);
    // One statement, so the limits cannot be beaten by sending requests at the same moment:
    // five a day per mailbox, and 200 an hour in total.
    const rows = await sql`
      insert into booking_requests (code, tour_ref, title, destination, option_name, tour_date, people, total, currency, name, email, phone, note, mailbox)
      select ${code}, ${item.ref}, ${item.title}, ${item.city}, ${option.name}, ${date}::date, ${people}::int, ${total}::int, ${item.currency},
             ${name}, ${email}, ${phone || null}, ${note || null}, ${mailbox}
      where (select count(*) from booking_requests where mailbox = ${mailbox} and created_at > now() - interval '1 day') < 5
        and (select count(*) from booking_requests where created_at > now() - interval '1 hour') < 200
      returning code`;
    return rows.length ? (rows[0].code as string) : null;
  };

  try {
    let code: string | null;
    try {
      code = await insert();
    } catch (e) {
      // First request on a database that has not been migrated yet: create the table and retry once.
      if ((e as { code?: string }).code !== "42P01") throw e;
      await db().query(CREATE_TABLE);
      code = await insert();
    }
    if (code) await recordAttempt("booking", ipKey);
    if (!code) return fail("We are not able to take another request right now. Please try again later, or email us.");
    return { ok: true, code };
  } catch {
    return fail("We could not save your request just now. Please try again in a minute.");
  }
}
