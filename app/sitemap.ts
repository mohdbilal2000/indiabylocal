import type { MetadataRoute } from "next";
import { tours } from "@/lib/data";
import { destinations, states } from "@/lib/destinations";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/destinations",
    "/guides",
    "/how-it-works",
    ...states.map((s) => `/states/${s.slug}`),
    ...destinations.map((d) => `/india/${d.slug}`),
    "/india/agra/taj-mahal/tickets-timings",
    ...tours.map((t) => `/tours/${t.slug}`),
    "/for-operators",
  ];
  return paths.map((p) => ({ url: `${SITE_URL}${p}` }));
}
