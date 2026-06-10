import type { MetadataRoute } from "next";

const BASE_URL = "https://speechworks.app";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/capture/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
