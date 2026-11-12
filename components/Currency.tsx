"use client";

import { createContext, useCallback, useContext, useEffect, useId, useMemo, useState } from "react";
import { CURRENCIES, CURRENCY_NAMES, type Currency, type Price, type Rates, convert, formatMoney, guessCurrency } from "@/lib/currency";

const KEY = "ibl-currency";

type Ctx = { currency: Currency; rates: Rates; choose: (c: Currency) => void };
const CurrencyContext = createContext<Ctx | null>(null);

export function useCurrency(): Ctx {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used inside CurrencyProvider");
  return ctx;
}

/**
 * Pages are rendered once in US dollars so they can be cached for everyone.
 * After load, the visitor's saved choice (or a guess from their browser
 * language) replaces the figures in place.
 */
export function CurrencyProvider({ rates, children }: { rates: Rates; children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = window.localStorage.getItem(KEY);
    } catch {
      // Storage can be blocked; the guess below still applies.
    }
    if (saved && (CURRENCIES as readonly string[]).includes(saved)) setCurrency(saved as Currency);
    else setCurrency(guessCurrency(navigator.languages?.length ? navigator.languages : [navigator.language]));
  }, []);

  const choose = useCallback((c: Currency) => {
    setCurrency(c);
    try {
      window.localStorage.setItem(KEY, c);
    } catch {
      // The choice still holds for this visit.
    }
  }, []);

  const value = useMemo(() => ({ currency, rates, choose }), [currency, rates, choose]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

/**
 * An amount in the visitor's currency. With `times`, the per-person figure is
 * rounded first and then multiplied, so "£29 × 3" always shows £87.
 */
export function Money({ amount, currency: from, times = 1, className }: Price & { times?: number; className?: string }) {
  const { currency, rates } = useCurrency();
  const converted = from !== currency;
  return (
    <span className={className} title={converted ? `${formatMoney(amount * times, from)} at today's rate` : undefined}>
      {formatMoney(Math.round(convert({ amount, currency: from }, currency, rates)) * times, currency)}
    </span>
  );
}

/** The same amount in rupees, for visitors who are not already seeing rupees. */
export function RupeeEquivalent({ amount, currency: from }: Price) {
  const { currency, rates } = useCurrency();
  if (currency === "INR") return null;
  return <>about {formatMoney(convert({ amount, currency: from }, "INR", rates), "INR")}</>;
}

/** One line saying where a converted figure comes from. Renders nothing when no conversion is happening. */
export function RateNote({ base, className = "" }: { base: Currency; className?: string }) {
  const { currency, rates } = useCurrency();
  if (currency === base) return null;
  const when = rates.date
    ? `European Central Bank rate of ${new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${rates.date}T00:00:00Z`))}`
    : "an approximate rate";
  return (
    <p className={`text-caption text-muted ${className}`}>
      Shown in {CURRENCY_NAMES[currency]}s at the {when}. This tour is priced in {CURRENCY_NAMES[base]}s, so the amount
      on your card can differ slightly.
    </p>
  );
}

export function CurrencySwitcher({ className = "" }: { className?: string }) {
  const { currency, choose } = useCurrency();
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        Show prices in
      </label>
      <select
        id={id}
        value={currency}
        onChange={(e) => choose(e.target.value as Currency)}
        className="nums h-11 cursor-pointer rounded-lg border border-line bg-card pr-1 pl-2 text-small font-semibold"
      >
        {CURRENCIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
