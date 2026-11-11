import type { NextConfig } from "next";

const config: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/for-guides", destination: "/for-operators", permanent: true }];
  },
};

export default config;
