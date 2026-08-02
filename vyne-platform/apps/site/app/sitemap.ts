import type { MetadataRoute } from "next";

/** Local-only. No domain is configured under EA-WEB-001. */
const BASE = "http://localhost:3002";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${BASE}/`, changeFrequency: "monthly", priority: 1 }];
}
