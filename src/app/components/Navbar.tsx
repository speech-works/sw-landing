"use client";

import { Navbar as ChromeNavbar } from "@speech-works/web-chrome";
import { useChromeConfig } from "./useChromeConfig";

// Thin wrapper around the shared @speech-works/web-chrome Navbar. Kept at this path
// + as a default export so existing call sites need no changes.
export default function Navbar() {
  return <ChromeNavbar config={useChromeConfig()} />;
}
