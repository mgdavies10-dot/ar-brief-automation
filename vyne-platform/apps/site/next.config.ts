import type { NextConfig } from "next";

/**
 * VYNE Strategies public site — EA-WEB-001.
 * Static export only. No server, no database, no auth, no analytics.
 */
const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@vyne/ui"],
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
