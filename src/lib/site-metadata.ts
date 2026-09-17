import type { Metadata } from "next";

export function socialMetadata(title: string, description: string, path: string, image = "home"): Metadata {
  const url = `https://speechworks.app/social/${image}.png`;
  return {
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      siteName: "Speechworks",
      locale: "en_IN",
      images: [{ url, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url, alt: title }],
    },
  };
}
