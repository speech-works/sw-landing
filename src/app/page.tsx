import Cta from "./components/CTA";
import Faq from "./components/FAQ";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import TestimonialStack from "./components/Testimonials";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Speechworks",
  description: "Your voice can change how the world listens.",
  metadataBase: new URL("https://speechworks.in"),
  openGraph: {
    title: "Speechworks",
    description: "Your voice can change how the world listens.",
    url: "https://speechworks.in",
    siteName: "Speechworks",
    images: [
      {
        url: "/assets/logo.png",
        height: 630,
        alt: "Speechworks Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Pricing />
      <Faq />
      <TestimonialStack />
      <Cta />
    </main>
  );
}
