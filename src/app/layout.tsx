import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./motion.css";
import SiteMotion from "./components/SiteMotion";

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
  title: { default: "Speechworks | Say what you want to say", template: "%s | Speechworks" },
  description:
    "Prepare for the conversations you want to have. Speechworks offers expert-curated guided programs for adults who stutter, with lessons and speaking practice.",
  openGraph: {
    title: "Speechworks | Say what you want to say",
    description: "Prepare for interviews, phone calls, and conversations you want to have. Guided programs and speaking practice for adults who stutter.",
    type: "website",
    locale: "en_IN",
    siteName: "Speechworks",
  },
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
