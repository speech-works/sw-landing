"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { WebChromeConfig } from "@speech-works/web-chrome";

// Builds the web-chrome config for the marketing site: in-page anchors (prefixed
// with "/" when not on the home route), local assets, and the blog living on its
// own subdomain (separate Next.js ISR app, so it never rebuilds this static site).
export function useChromeConfig(): WebChromeConfig {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const prefix = isHome ? "" : "/";

  // On the home page the Roadmap component listens for this and opens phase 2.
  const openRoadmapCommunity = () => {
    window.dispatchEvent(
      new CustomEvent("speechworks:open-roadmap-phase", { detail: { phase: 2 } }),
    );
  };

  return {
    assetBaseUrl: "",
    LinkComponent: Link as unknown as WebChromeConfig["LinkComponent"],
    links: {
      home: "/",
      roadmap: `${prefix}#roadmap`,
      platform: `${prefix}#platform`,
      team: `${prefix}#team`,
      blog: "https://blog.speechworks.app",
      clinicians: "/clinicians",
      download: `${prefix}#download`,
      privacy: "/privacy",
      community: {
        href: `${prefix}#roadmap`,
        onClick: isHome ? openRoadmapCommunity : undefined,
      },
    },
  };
}
