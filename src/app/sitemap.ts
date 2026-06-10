import type { MetadataRoute } from "next";

const BASE_URL = "https://speechworks.app";

export const dynamic = "force-static";

// Public, indexable routes. Internal tooling (e.g. /capture) is intentionally
// excluded. Trailing slashes match next.config.ts `trailingSlash: true`.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE_URL}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/clinicians/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
