"use client";

import { useEffect, useId, useMemo, useRef, useState, useTransition } from "react";
import { requestBooking } from "@/app/booking/actions";
import { Money, RateNote, RupeeEquivalent } from "@/components/Currency";
import { PromiseSeal } from "@/components/Promise";
import { type Bookable, MAX_DAYS_AHEAD, dateProblem, indiaDate, quote, startInstant, weekdayOf } from "@/lib/booking";
import { TIER_LABELS, tierIndex } from "@/lib/data";
import { seasonNote } from "@/lib/season";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKDAY_NAMES = ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"];
const pad = (n: number) => String(n).padStart(2, "0");
const longDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T00:00:00Z`),
  );

/** A month grid in which days that cannot be booked are visibly struck out, so nobody picks one by mistake. */
function Calendar({ item, value, onPick, today }: { item: Bookable; value: string; onPick: (d: string) => void; today: number }) {
  const first = indiaDate(today, 1);
  const last = indiaDate(today, MAX_DAYS_AHEAD);
  const [cursor, setCursor] = useState(() => (value || first).slice(0, 7));
  const [year, month] = cursor.split("-").map(Number);
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const lead = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  const title = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(year, month - 1, 1)));
  const shift = (by: number) => {
    const d = new Date(Date.UTC(year, month - 1 + by, 1));
    setCursor(`${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}`);
  };
  const nav = "flex size-11 items-center justify-center rounded-full border border-line bg-card disabled:opacity-30";

  return (
    <div>
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => shift(-1)} disabled={cursor <= first.slice(0, 7)} aria-label="Earlier month" className={nav}>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12.5 4.5L7 10l5.5 5.5" />
          </svg>
        </button>
        <p className="font-semibold" aria-live="polite">
          {title}
        </p>
        <button type="button" onClick={() => shift(1)} disabled={cursor >= last.slice(0, 7)} aria-label="Later month" className={nav}>
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7.5 4.5L13 10l-5.5 5.5" />
          </svg>
        </button>
      </div>
      <div className="nums mt-2 grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((w) => (
          <span key={w} aria-hidden="true" className="py-1 text-caption text-muted">
            {w}
          </span>
        ))}
        {Array.from({ length: lead }, (_, i) => (
          <span key={`lead-${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const date = `${cursor}-${pad(i + 1)}`;
          const problem = dateProblem(item, date, today);
          const closed = item.closedWeekdays.some((c) => c.day === weekdayOf(date));
          const picked = date === value;
          return (
            <button
              key={date}
              type="button"
              disabled={Boolean(problem)}
              aria-pressed={picked}
              aria-label={`${longDate(date)}${closed ? ", closed" : ""}`}
              onClick={() => onPick(date)}
              className={`mx-auto flex aspect-square w-full max-w-11 items-center justify-center rounded-full text-small ${
                picked
                  ? "bg-night font-semibold text-white"
                  : problem
                    ? `text-line ${closed ? "line-through" : ""}`
                    : "font-medium hover:bg-surface-alt"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
      {item.closedWeekdays.map((c) => (
        <p key={c.day} className="mt-2 text-caption text-muted">
          <span className="line-through">{WEEKDAY_NAMES[c.day]}</span> cannot be booked. {c.reason}
        </p>
      ))}
    </div>
  );
}

function Stepper({ value, max, onChange, labelId }: { value: number; max: number; onChange: (n: number) => void; labelId: string }) {
  const b = "flex size-12 items-center justify-center rounded-full border border-line bg-card text-h4 disabled:opacity-30";
  return (
    <div role="group" aria-labelledby={labelId} className="flex items-center gap-3">
      <button type="button" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="One traveller fewer" className={b}>
        −
      </button>
      <output aria-live="polite" className="nums w-8 text-center text-h4 font-semibold">
        {value}
      </output>
      <button type="button" onClick={() => onChange(value + 1)} disabled={value >= max} aria-label="One traveller more" className={b}>
        +
      </button>
    </div>
  );
}

/**
 * Two steps. First the day: option, date, travellers and the full price.
 * Then the traveller's details, sent as a request. Nothing is charged here;
 * a person replies by email to confirm.
 */
export function BookingPanel({ item, whatsapp }: { item: Bookable; whatsapp: string | null }) {
  const uid = useId();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [optionId, setOptionId] = useState(item.options[0].id);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(Math.min(2, item.maxGroup));
  const [today, setToday] = useState<number | null>(null);
  const [zone, setZone] = useState<string | null>(null);
  const [needDate, setNeedDate] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", note: "", website: "" });
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [pending, start] = useTransition();
  const top = useRef<HTMLDivElement>(null);

  // The clock and time zone are only known in the browser.
  useEffect(() => {
    setToday(Date.now());
    setZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  const { option, perPerson, total } = quote(item, optionId, people);
  const price = { currency: item.currency };
  const tier = tierIndex(people);
  const flat = option.tiers.every((t) => t === option.tiers[0]);

  const when = useMemo(() => {
    if (!date) return null;
    const at = startInstant(date, item.startTime);
    const inIndia = !zone || zone === "Asia/Kolkata" || zone === "Asia/Calcutta";
    return {
      local: inIndia
        ? null
        : `${new Intl.DateTimeFormat("en-GB", { timeZone: zone, weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(at)} in ${zone.split("/").pop()?.replace(/_/g, " ")}`,
      cancelBy: new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "long", day: "numeric", month: "long" }).format(
        new Date(at.getTime() - 24 * 3600_000),
      ),
      season: seasonNote(item.city, Number(date.slice(5, 7))),
    };
  }, [date, zone, item.startTime, item.city]);

  const go = (to: 1 | 2 | 3) => {
    setStep(to);
    setError("");
    requestAnimationFrame(() => top.current?.focus());
  };

  const next = () => {
    if (!date) {
      setNeedDate(true);
      return;
    }
    go(2);
  };

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    start(async () => {
      const result = await requestBooking({ ref: item.ref, optionId, date, people, ...form });
      if (result.ok) {
        setCode(result.code);
        go(3);
      } else setError(result.error);
    });
  };

  const summary = date ? `${longDate(date)}, ${people} ${people === 1 ? "traveller" : "travellers"}` : "";
  const waText = encodeURIComponent(`Hello. I have a question about "${item.title}"${date ? ` on ${longDate(date)} for ${people}` : ""}.`);
  const field = "field mt-1";

  if (step === 3) {
    return (
      <div ref={top} tabIndex={-1} className="outline-none">
        <svg viewBox="0 0 56 56" aria-hidden="true" className="size-14">
          <circle cx="28" cy="28" r="25" pathLength={1} className="promise-ring" />
          <path d="M18 29l7 7 14-15" className="promise-tick" />
        </svg>
        <h2 className="mt-3 font-sans text-h4 font-semibold tracking-normal">Request sent</h2>
        <p className="mt-2 text-small">
          Your reference is <strong className="nums">{code}</strong>. We have not charged you and nothing is owed.
        </p>
        <p className="mt-2 text-small text-muted">
          {item.sample
            ? `This tour is a sample while we sign up our first guides in ${item.cityName}. We will email ${form.email} as soon as a checked guide offers it.`
            : `We will email ${form.email} to confirm ${summary}, usually within a day. You pay only after you have a named guide.`}
        </p>
        <button type="button" className="btn-ghost mt-5 w-full" onClick={() => go(1)}>
          Back to the tour
        </button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <form onSubmit={send} noValidate>
        <div ref={top} tabIndex={-1} className="outline-none">
          <p className="text-caption font-semibold uppercase tracking-wider text-muted">Step 2 of 2</p>
          <h2 className="font-sans text-h4 font-semibold tracking-normal">Your details</h2>
        </div>
        <div className="mt-3 flex items-start justify-between gap-3 rounded-xl bg-surface-alt p-3 text-small">
          <p>
            <strong>{summary}</strong>
            <br />
            {item.options.length > 1 && `${option.name} · `}
            <Money amount={perPerson} times={people} {...price} /> in total
          </p>
          <button type="button" onClick={() => go(1)} className="min-h-11 shrink-0 px-1 font-semibold text-brand underline">
            Change
          </button>
        </div>
        {item.sample && (
          <p className="mt-3 rounded-xl border border-line p-3 text-small">
            This tour is a sample and cannot be booked yet. Send your details and we will email you when a checked guide
            offers it in {item.cityName}.
          </p>
        )}
        <label htmlFor={`${uid}-n`} className="mt-4 block text-small font-semibold">
          Your name
        </label>
        <input id={`${uid}-n`} className={field} autoComplete="name" required maxLength={80} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <label htmlFor={`${uid}-e`} className="mt-3 block text-small font-semibold">
          Email
        </label>
        <input id={`${uid}-e`} className={field} type="email" inputMode="email" autoComplete="email" required maxLength={160} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <label htmlFor={`${uid}-p`} className="mt-3 block text-small font-semibold">
          WhatsApp or phone <span className="font-normal text-muted">(optional, with country code)</span>
        </label>
        <input id={`${uid}-p`} className={field} type="tel" inputMode="tel" autoComplete="tel" maxLength={20} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <label htmlFor={`${uid}-m`} className="mt-3 block text-small font-semibold">
          Anything we should know? <span className="font-normal text-muted">(optional)</span>
        </label>
        <textarea id={`${uid}-m`} className={field} rows={2} maxLength={600} value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} />
        <div aria-hidden="true" className="absolute -left-[9999px]">
          <label>
            Website
            <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
          </label>
        </div>
        <p role="alert" className="mt-3 min-h-5 text-small font-semibold text-error">
          {error}
        </p>
        <button type="submit" className="btn w-full" disabled={pending}>
          {pending ? "Sending…" : "Send request. Pay nothing now"}
        </button>
        <p className="mt-3 text-caption text-muted">
          We use these details only to reply about this request. We do not send marketing or pass them to anyone else.
        </p>
      </form>
    );
  }

  return (
    <div>
      <div ref={top} tabIndex={-1} className="outline-none">
        <p className="text-caption font-semibold uppercase tracking-wider text-muted">Step 1 of 2</p>
        <h2 className="font-sans text-h4 font-semibold tracking-normal">Choose your day</h2>
      </div>

      {item.options.length > 1 && (
        <fieldset className="mt-4">
          <legend className="text-small font-semibold">What is included</legend>
          <div className="mt-2 grid gap-2">
            {item.options.map((o) => (
              <label key={o.id} className="flex min-h-12 cursor-pointer items-start gap-3 rounded-xl border border-line p-3 has-[:checked]:border-night has-[:checked]:bg-surface-alt">
                <input type="radio" name={`${uid}-opt`} value={o.id} checked={o.id === optionId} onChange={() => setOptionId(o.id)} className="mt-1 size-5 accent-[var(--color-night)]" />
                <span>
                  <span className="block text-small font-semibold">{o.name}</span>
                  <span className="block text-caption text-muted">{o.detail}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-5">
        <p className="text-small font-semibold">Date</p>
        <div className="mt-2">
          {today === null ? (
            <div className="h-80 rounded-xl bg-surface-alt" aria-hidden="true" />
          ) : (
            <Calendar
              item={item}
              value={date}
              today={today}
              onPick={(d) => {
                setDate(d);
                setNeedDate(false);
              }}
            />
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <p id={`${uid}-t`} className="text-small font-semibold">
          Travellers
          <span className="block text-caption font-normal text-muted">Private tour, up to {item.maxGroup}</span>
        </p>
        <Stepper value={people} max={item.maxGroup} onChange={setPeople} labelId={`${uid}-t`} />
      </div>

      {when && (
        <div className="mt-4 rounded-xl bg-surface-alt p-3 text-small">
          <p>
            <strong>{longDate(date)}</strong>, starting <strong className="nums">{item.startTime} India time</strong>
            {when.local && (
              <>
                {" "}
                (<span className="nums">{when.local}</span>)
              </>
            )}
            .
          </p>
          <p className="mt-1 text-verified">
            <span aria-hidden="true">✓ </span>Free cancellation until <span className="nums">{item.startTime}</span> India time on {when.cancelBy}.
          </p>
          {when.season && (
            <p className="mt-1 text-warning">
              <span aria-hidden="true">☀ </span>
              {when.season}
            </p>
          )}
        </div>
      )}

      <table className="nums mt-5 w-full text-small">
        <caption className="pb-1 text-left font-semibold">Price</caption>
        <tbody>
          <tr>
            <th scope="row" className="py-1 text-left font-normal">
              <Money amount={perPerson} {...price} /> × {people} {people === 1 ? "traveller" : "travellers"}
              {!flat && <span className="block text-caption text-muted">Group rate for {TIER_LABELS[tier]}</span>}
            </th>
            <td className="py-1 text-right align-top">
              <Money amount={perPerson} times={people} {...price} />
            </td>
          </tr>
          {item.ticketsExtra !== null && (
            <tr>
              <th scope="row" className="py-1 text-left font-normal">
                Monument tickets
              </th>
              <td className={`py-1 text-right ${option.ticketsIncluded ? "text-verified" : "text-warning"}`}>
                {option.ticketsIncluded ? (
                  "Included"
                ) : (
                  <>
                    Not included: about <Money amount={item.ticketsExtra} {...price} /> each at the gate
                  </>
                )}
              </td>
            </tr>
          )}
          <tr>
            <th scope="row" className="py-1 text-left font-normal">
              Booking fee
            </th>
            <td className="py-1 text-right text-verified">None</td>
          </tr>
          <tr className="border-t border-hair">
            <th scope="row" className="pt-2 text-left text-body font-semibold">
              Total
            </th>
            <td className="pt-2 text-right text-h3 font-semibold" aria-live="polite">
              <Money amount={perPerson} times={people} {...price} />
            </td>
          </tr>
        </tbody>
      </table>
      <p className="nums text-right text-caption text-muted">
        <RupeeEquivalent amount={total} {...price} />
      </p>
      <RateNote base={item.currency} className="mt-1" />

      <PromiseSeal />

      <p role="alert" className="mt-3 min-h-5 text-small font-semibold text-error">
        {needDate && "Please pick a date in the calendar above."}
      </p>
      <button type="button" className="btn w-full" onClick={next}>
        Continue
      </button>
      <p className="mt-2 text-center text-caption text-muted">No payment on the next step.</p>
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}?text=${waText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost mt-3 w-full gap-2"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-5 text-verified-fill" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 20l1.4-4.2A8 8 0 1 1 8.4 19z" />
          </svg>
          Ask a question on WhatsApp
        </a>
      )}
    </div>
  );
}
