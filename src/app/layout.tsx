import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./motion.css";
import "./home.css";
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
  title: { default: "Stammering & Stuttering Practice App | Speechworks", template: "%s | Speechworks" },
  description:
    "Practice job interviews and phone calls with an AI caller that waits for you. For adults who stammer or stutter. Free daily practice.",
  ...socialMetadata(
    "Stammering & Stuttering Practice App | Speechworks",
    "Practice job interviews and phone calls with an AI caller that waits for you. For adults who stammer or stutter. Free daily practice.",
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
