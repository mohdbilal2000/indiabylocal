export const CURRENCIES = ["USD", "EUR", "GBP", "AUD", "INR"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const CURRENCY_NAMES: Record<Currency, string> = {
  USD: "US dollar",
  EUR: "Euro",
  GBP: "British pound",
  AUD: "Australian dollar",
  INR: "Indian rupee",
};

/** Units of each currency per one US dollar. */
export type Rates = {
  per: Record<Currency, number>;
  /** The day the rates were published, or null when the fallback table is in use. */
  date: string | null;
};

/**
 * Used only when the live source cannot be reached. Rounded and deliberately
 * marked as approximate wherever it is shown.
 */
export const FALLBACK_RATES: Rates = {
  per: { USD: 1, EUR: 0.87, GBP: 0.75, AUD: 1.52, INR: 88 },
  date: null,
};

export type Price = { amount: number; currency: Currency };

export function convert(price: Price, to: Currency, rates: Rates): number {
  if (price.currency === to) return price.amount;
  return (price.amount / rates.per[price.currency]) * rates.per[to];
}

const formatters = new Map<Currency, Intl.NumberFormat>();

/** Whole units, one fixed locale, so the server and the browser print the same string. */
export function formatMoney(amount: number, currency: Currency): string {
  let f = formatters.get(currency);
  if (!f) {
    f = new Intl.NumberFormat("en", { style: "currency", currency, maximumFractionDigits: 0 });
    formatters.set(currency, f);
  }
  return f.format(Math.round(amount));
}

/** A first guess from the browser's language, used until the visitor chooses. */
export function guessCurrency(languages: readonly string[]): Currency {
  for (const tag of languages) {
    const [lang, region] = tag.toLowerCase().split("-");
    if (region === "gb") return "GBP";
    if (region === "au") return "AUD";
    if (region === "in") return "INR";
    if (region === "us" || region === "ca") return "USD";
    if (["de", "fr", "es", "it", "nl", "pt", "fi", "el"].includes(lang) && region !== "br" && region !== "ch") return "EUR";
    if (["ie", "at", "be"].includes(region ?? "")) return "EUR";
  }
  return "USD";
}
