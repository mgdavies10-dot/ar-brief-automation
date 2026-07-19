import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@vyne/ui", "@vyne/domain", "@vyne/audit"],
};

export default nextConfig;
