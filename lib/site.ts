export const SITE_NAME = "IndiaByLocal";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/**
 * False while the catalogue is sample data. Controls robots.txt, the
 * noindex tag and the preview banner. Set SITE_LIVE=1 only once every
 * listing, price and guide on the site is real.
 */
export const SITE_LIVE = process.env.SITE_LIVE === "1";

export const SITE_DESCRIPTION =
  "Private day tours in Agra, Delhi and Jaipur with a named, licence-verified local guide. One all-in price, free cancellation, no shopping stops.";
