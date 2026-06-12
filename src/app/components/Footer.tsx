"use client";

import { Footer as ChromeFooter } from "@speech-works/web-chrome";
import { useChromeConfig } from "./useChromeConfig";

// Thin wrapper around the shared @speech-works/web-chrome Footer. Kept at this path
// + as a default export so existing call sites need no changes.
export default function Footer() {
  return <ChromeFooter config={useChromeConfig()} />;
}
