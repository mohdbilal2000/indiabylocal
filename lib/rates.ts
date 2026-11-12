import "server-only";
import { CURRENCIES, FALLBACK_RATES, type Rates } from "@/lib/currency";

const SOURCE = "https://api.frankfurter.dev/v1/latest?base=USD&symbols=EUR,GBP,AUD,INR";

/**
 * Daily reference rates published by the European Central Bank, through the
 * free Frankfurter API. Cached for twelve hours. Any failure or odd value
 * falls back to the built-in table, so a page never breaks over a rate.
 */
export async function getRates(): Promise<Rates> {
  try {
    const res = await fetch(SOURCE, { next: { revalidate: 43200 }, signal: AbortSignal.timeout(4000) });
    if (!res.ok) return FALLBACK_RATES;
    const body = (await res.json()) as { date?: unknown; rates?: Record<string, unknown> };
    const per = { ...FALLBACK_RATES.per };
    for (const c of CURRENCIES) {
      if (c === "USD") continue;
      const live = body.rates?.[c];
      const known = FALLBACK_RATES.per[c];
      // Reject anything that is not a number within a factor of two of the known level.
      if (typeof live !== "number" || !(live > known / 2 && live < known * 2)) return FALLBACK_RATES;
      per[c] = live;
    }
    return { per, date: typeof body.date === "string" ? body.date : null };
  } catch {
    return FALLBACK_RATES;
  }
}
