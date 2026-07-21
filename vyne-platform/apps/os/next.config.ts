import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@vyne/ui", "@vyne/domain", "@vyne/audit", "@vyne/auth"],
};

export default nextConfig;
