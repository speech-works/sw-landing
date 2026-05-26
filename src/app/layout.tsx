import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://speechworks.app"),
  title: "Speechworks | CHANGE THE CONVERSATION",
  description:
    "Your voice matters in the real world. We bring patients and therapists together, replacing clinical guesswork with daily support and clear insights.",
  openGraph: {
    title: "Speechworks | CHANGE THE CONVERSATION",
    description:
      "Your voice matters in the real world. We bring patients and therapists together, replacing clinical guesswork with daily support and clear insights.",
    url: "https://speechworks.app",
    siteName: "Speechworks",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Speechworks - Change the Conversation",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Speechworks | CHANGE THE CONVERSATION",
    description:
      "Your voice matters in the real world. We bring patients and therapists together, replacing clinical guesswork with daily support and clear insights.",
    images: ["/opengraph-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        <link rel="preconnect" href="https://fonts.googleapis.com/" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap"
          rel="stylesheet"
        />

        {/* Lucide Icons */}
        <Script
          src="https://unpkg.com/lucide@latest"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body
        className="relative bg-app-bg text-app-text overflow-x-hidden max-w-[100vw]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
