import type { MetadataRoute } from "next";
import { cities, tours } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    ...cities.map((c) => `/india/${c.slug}`),
    "/india/agra/taj-mahal/tickets-timings",
    ...tours.map((t) => `/tours/${t.slug}`),
    "/for-guides",
  ];
  return paths.map((p) => ({ url: `${SITE_URL}${p}` }));
}
