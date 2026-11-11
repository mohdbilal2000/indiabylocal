"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { MAX_GROUP, TIER_LABELS, type Tour, tierIndex } from "@/lib/data";

const INDIA_OFFSET_MIN = 330;

function tomorrowInIndia(): string {
  const now = new Date(Date.now() + INDIA_OFFSET_MIN * 60_000 + 24 * 3600_000);
  return now.toISOString().slice(0, 10);
}

/** The instant a tour starts, from its India-local date and time. */
function startInstant(date: string, time: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  return new Date(Date.UTC(y, m - 1, d, hh, mm) - INDIA_OFFSET_MIN * 60_000);
}

function weekdayOf(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

export function BookingBox({ tour }: { tour: Tour }) {
  const dateId = useId();
  const errId = useId();
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [people, setPeople] = useState(2);
  const [optionId, setOptionId] = useState(tour.options[0].id);
  const [zone, setZone] = useState<string | null>(null);
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    setMinDate(tomorrowInIndia());
    setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const option = tour.options.find((o) => o.id === optionId) ?? tour.options[0];
  const tier = tierIndex(people);
  const perPerson = option.tiers[tier];
  const total = perPerson * people;

  const closed = date ? tour.closedWeekdays?.find((c) => c.day === weekdayOf(date)) : undefined;
  const tooEarly = Boolean(date && minDate && date < minDate);
  const error = closed ? `${closed.reason} Please pick another day.` : tooEarly ? "Please pick a date from tomorrow onwards." : "";

  const times = useMemo(() => {
    if (!date || error) return null;
    const at = startInstant(date, tour.startTime);
    const india = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(at);
    const inIndia = !zone || zone === "Asia/Kolkata" || zone === "Asia/Calcutta";
    const local = inIndia
      ? null
      : {
          when: new Intl.DateTimeFormat("en-GB", {
            timeZone: zone,
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
          }).format(at),
          place: zone.split("/").pop()?.replace(/_/g, " ") ?? "your time",
        };
    const cancelBy = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(new Date(at.getTime() - 24 * 3600_000));
    return { india, local, cancelBy };
  }, [date, error, zone, tour.startTime]);

  return (
    <section id="book" aria-labelledby="book-h" className="scroll-mt-4 rounded-2xl border border-line bg-card p-5">
      <h2 id="book-h" className="font-sans text-h4 font-semibold tracking-normal">
        Price and availability
      </h2>

      <fieldset className="mt-4">
        <legend className="text-small font-semibold">Option</legend>
        <div className="mt-2 grid gap-2">
          {tour.options.map((o) => (
            <label
              key={o.id}
              className="flex min-h-12 cursor-pointer items-start gap-3 rounded-lg border border-line p-3 has-[:checked]:border-brand has-[:checked]:bg-surface-alt"
            >
              <input
                type="radio"
                name="option"
                value={o.id}
                checked={o.id === optionId}
                onChange={() => setOptionId(o.id)}
                className="mt-1 size-5 accent-[var(--color-brand)]"
              />
              <span>
                <span className="block text-small font-semibold">{o.name}</span>
                <span className="block text-caption text-muted">{o.detail}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <label htmlFor={dateId} className="text-small font-semibold">
            Date
          </label>
          <input
            id={dateId}
            type="date"
            value={date}
            min={minDate || undefined}
            onChange={(e) => {
              setDate(e.target.value);
              setAsked(false);
            }}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? errId : undefined}
            className="mt-1 block h-12 w-full rounded-lg border border-line bg-card px-3 text-base"
          />
        </div>
        <div>
          <p className="text-small font-semibold" id={`${dateId}-p`}>
            Travellers
          </p>
          <div className="mt-1 flex h-12 items-center justify-between rounded-lg border border-line" role="group" aria-labelledby={`${dateId}-p`}>
            <button
              type="button"
              onClick={() => setPeople((n) => Math.max(1, n - 1))}
              disabled={people <= 1}
              aria-label="One traveller fewer"
              className="size-12 rounded-l-lg text-h4 disabled:opacity-40"
            >
              −
            </button>
            <output className="nums font-semibold" aria-live="polite">
              {people}
            </output>
            <button
              type="button"
              onClick={() => setPeople((n) => Math.min(MAX_GROUP, n + 1))}
              disabled={people >= MAX_GROUP}
              aria-label="One traveller more"
              className="size-12 rounded-r-lg text-h4 disabled:opacity-40"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p id={errId} role="alert" className="mt-2 text-small text-error">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      )}

      {times && (
        <p className="mt-3 rounded-lg bg-surface-alt p-3 text-small">
          Starts <strong className="nums">{tour.startTime} India time</strong>, {times.india}.
          {times.local && (
            <>
              {" "}
              That&rsquo;s <span className="nums">{times.local.when}</span> in {times.local.place}.
            </>
          )}{" "}
          Free cancellation until <span className="nums">{tour.startTime}</span> India time on {times.cancelBy}.
        </p>
      )}

      <table className="nums mt-4 w-full text-caption text-muted">
        <caption className="sr-only">Price per person by group size</caption>
        <tbody>
          {TIER_LABELS.map((label, i) => (
            <tr key={label} className={i === tier ? "font-semibold text-ink" : undefined}>
              <th scope="row" className="py-0.5 text-left font-[inherit]">
                {label}
              </th>
              <td className="py-0.5 text-right">${option.tiers[i]} each</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 border-t border-hair pt-4" aria-live="polite">
        <p className="nums flex items-baseline justify-between">
          <span className="text-small text-muted">
            Total for {people} {people === 1 ? "person" : "people"}
          </span>
          <span className="text-h3 font-semibold">${total}</span>
        </p>
        <p className="nums text-right text-caption text-muted">
          = ${perPerson} per person · No booking fees
        </p>
        {tour.ticketsUsd && !option.ticketsIncluded && (
          <p className="mt-2 text-small text-warning">
            <span aria-hidden="true">! </span>Monument tickets are not in this price: about ${tour.ticketsUsd} per
            person, paid at the gate.
          </p>
        )}
      </div>

      <button type="button" className="btn mt-4 w-full" onClick={() => setAsked(true)} disabled={Boolean(error)}>
        Check availability
      </button>
      <p role="status" className="mt-2 min-h-5 text-small text-muted">
        {asked &&
          (date
            ? "Booking is not open yet. This preview shows how the price is worked out; nothing has been reserved or charged."
            : "Pick a date first.")}
      </p>
    </section>
  );
}

/** Phone-only bar that appears once the price box has scrolled out of view. */
export function StickyBar({ from }: { from: number }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = document.getElementById("book");
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setShow(!e.isIntersecting && e.boundingClientRect.top < 0), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-10 border-t border-line bg-card px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] lg:hidden">
      <div className="flex items-center justify-between gap-4">
        <p className="nums text-small">
          From <strong className="text-price">${from}</strong> per person
        </p>
        <a href="#book" className="btn whitespace-nowrap">
          Check availability
        </a>
      </div>
    </div>
  );
}
