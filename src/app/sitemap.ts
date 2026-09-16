import type { MetadataRoute } from "next";

import { programs } from "@/content/programs";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/programs/", "/about/", "/privacy/", "/account/delete/", ...programs.map(p => `/programs/${p.slug}/`)].map((path) => ({
    url: `https://speechworks.app${path}`,
  }));
}
