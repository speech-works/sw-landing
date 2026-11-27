"use client";

import { useEffect, useState } from "react";
import { playStoreLink } from "@/content/downloads";
import { pageSource } from "@/content/source-tag";

// The Google Play badge. Its link carries where the button sits, and the
// page's ?src= once the page has loaded.
export default function PlayBadge({
  placement,
  children,
}: {
  placement: string;
  children: React.ReactNode;
}) {
  const [href, setHref] = useState(() => playStoreLink(placement));
  useEffect(() => {
    setHref(playStoreLink(placement, pageSource()));
  }, [placement]);
  return (
    <a
      className="store-badge pressable"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Speechworks on Google Play"
    >
      {children}
    </a>
  );
}
