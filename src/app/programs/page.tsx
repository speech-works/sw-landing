import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgramCatalog from "../components/ProgramCatalog";
import DownloadSection from "../components/DownloadSection";
import { socialMetadata } from "@/lib/site-metadata";
export const metadata = {
  title: "Guided Programs for Adults Who Stutter",
  description:
    "Find your next step with guided programs for adults who stutter. Compare daily plans for interviews, phone calls, relationships, and understanding your speech, with new expert-curated tracks added regularly.",
  ...socialMetadata("Guided Programs for Adults Who Stutter | Speechworks", "Compare daily plans for interviews, phone calls, relationships, and understanding your stuttering. Read the outlines before you choose.", "/programs/", "programs"),
  alternates: { canonical: "/programs/" },
};
export default function Programs() {
  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <header className="page-intro section-wrap" data-reveal>
          <h1>Choose your next step.</h1>
          <p>
            Prepare for an interview. Make a call. Learn more about your stuttering. Explore our guided programs below, with more expert-curated pathways continually arriving.
          </p>
        </header>
        <ProgramCatalog />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
