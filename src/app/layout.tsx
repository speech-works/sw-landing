import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./motion.css";
import SiteMotion from "./components/SiteMotion";
import { socialMetadata } from "@/lib/site-metadata";

const inter = localFont({
  src: [
    { path: "./fonts/Inter-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Inter-Bold.ttf", weight: "700", style: "normal" },
    { path: "./fonts/Inter-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://speechworks.app"),
  title: { default: "Speaking Practice for Adults Who Stutter | Speechworks", template: "%s | Speechworks" },
  description:
    "Prepare for the conversations you want to have. Speechworks offers expert-curated guided programs for adults who stutter, with lessons and speaking practice.",
  ...socialMetadata(
    "Speaking Practice for Adults Who Stutter | Speechworks",
    "Prepare for interviews, phone calls, and conversations you want to have. Guided programs and speaking practice for adults who stutter.",
    "/",
  ),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      {/* Extensions such as ClickUp add body attributes before hydration.
          Limit suppression to this element; descendant mismatches still warn. */}
      <body suppressHydrationWarning>{children}<SiteMotion /></body>
    </html>
  );
}
