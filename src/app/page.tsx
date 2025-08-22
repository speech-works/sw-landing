import Cta from "./components/CTA";
import Faq from "./components/FAQ";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import Navbar from "./components/Navbar";
import Pricing from "./components/Pricing";
import TestimonialStack from "./components/Testimonials";
import { SW_NAME, SW_SLOGAN } from "./constants";

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
