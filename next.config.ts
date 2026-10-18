import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The landing is fully static — every page is prerendered at build time.
  poweredByHeader: false,
};

export default nextConfig;
