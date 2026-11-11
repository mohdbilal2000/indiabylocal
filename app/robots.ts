import type { MetadataRoute } from "next";
import { SITE_LIVE, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_LIVE) {
    // Sample listings must not be crawled or indexed.
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  // Search, user-triggered and AI crawlers are all welcome once the data is real.
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
