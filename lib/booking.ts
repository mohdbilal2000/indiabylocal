import { MAX_GROUP, type Tiers, type Tour, tierIndex } from "@/lib/data";
import type { PublicListing } from "@/lib/db";

/** Everything the booking panel needs, whether the tour is a sample or an operator's listing. */
export type Bookable = {
  /** "t:<sample slug>" or "l:<listing id>". */
  ref: string;
  title: string;
  city: string;
  cityName: string;
  /** India time, HH:MM. */
  startTime: string;
  maxGroup: number;
  currency: "USD" | "INR";
  sample: boolean;
  closedWeekdays: { day: number; reason: string }[];
  /** Per-person monument tickets when an option does not include them, in `currency`. */
  ticketsExtra: number | null;
  options: { id: string; name: string; detail: string; ticketsIncluded: boolean; tiers: Tiers }[];
};

export function bookableFromTour(tour: Tour, cityName: string): Bookable {
  return {
    ref: `t:${tour.slug}`,
    title: tour.title,
    city: tour.city,
    cityName,
    startTime: tour.startTime,
    maxGroup: MAX_GROUP,
    currency: "USD",
    sample: true,
    closedWeekdays: tour.closedWeekdays ?? [],
    ticketsExtra: tour.ticketsUsd ?? null,
    options: tour.options,
  };
}

export function bookableFromListing(l: PublicListing, cityName: string): Bookable {
  const p = l.price_inr;
  return {
    ref: `l:${l.id}`,
    title: l.title,
    city: l.destination,
    cityName,
    startTime: l.start_time,
    maxGroup: l.max_group,
    currency: "INR",
    sample: false,
    closedWeekdays: [],
    ticketsExtra: null,
    options: [{ id: "standard", name: "Standard", detail: "", ticketsIncluded: true, tiers: [p, p, p, p] }],
  };
}

export function quote(item: Bookable, optionId: string, people: number) {
  const option = item.options.find((o) => o.id === optionId) ?? item.options[0];
  const perPerson = option.tiers[tierIndex(people)];
  return { option, perPerson, total: perPerson * people };
}

export function fromAmount(item: Bookable): number {
  return Math.min(...item.options.flatMap((o) => o.tiers));
}

const INDIA_OFFSET_MIN = 330;
const DAY = 24 * 3600_000;
/** How far ahead a date can be picked. */
export const MAX_DAYS_AHEAD = 365;

const iso = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/** Today's date in India, as YYYY-MM-DD, shifted by a number of days. */
export function indiaDate(now: number, plusDays = 0): string {
  return iso(now + INDIA_OFFSET_MIN * 60_000 + plusDays * DAY);
}

export function weekdayOf(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

/** The instant a tour starts, from its India-local date and time. */
export function startInstant(date: string, time: string): Date {
  return new Date(Date.parse(`${date}T${time}:00Z`) - INDIA_OFFSET_MIN * 60_000);
}

/** Free cancellation ends 24 hours before the start. A booking made inside that window has none. */
export function cancellation(date: string, time: string, now: number): { free: boolean; deadline: Date } {
  const deadline = new Date(startInstant(date, time).getTime() - DAY);
  return { free: deadline.getTime() > now, deadline };
}

/** Empty when the date can be booked; otherwise the reason, in words for the traveller. */
export function dateProblem(item: Bookable, date: string, now: number): string {
  // The round trip rejects dates such as 2026-02-30, which JavaScript would quietly accept.
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || iso(Date.parse(`${date}T00:00:00Z`)) !== date) return "Please pick a date.";
  if (date < indiaDate(now, 1)) return "Please pick a date from tomorrow onwards.";
  if (date > indiaDate(now, MAX_DAYS_AHEAD)) return "Please pick a date within the next twelve months.";
  const closed = item.closedWeekdays.find((c) => c.day === weekdayOf(date));
  if (closed) return `${closed.reason} Please pick another day.`;
  return "";
}
