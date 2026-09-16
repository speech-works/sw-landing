import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/privacy/", "/account/delete/"].map((path) => ({
    url: `https://speechworks.app${path}`,
  }));
}
