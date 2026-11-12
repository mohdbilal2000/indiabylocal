import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF first, WebP for browsers without it. Resized copies are kept for a month.
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    minimumCacheTTL: 60 * 60 * 24 * 31,
  },
  async redirects() {
    return [{ source: "/for-guides", destination: "/for-operators", permanent: true }];
  },
};

export default config;
