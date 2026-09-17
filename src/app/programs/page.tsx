import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgramCatalog from "../components/ProgramCatalog";
import DownloadSection from "../components/DownloadSection";
export const metadata = {
  title: "Find your program",
  description:
    "Find your next step with guided programs for adults who stutter. Compare daily plans for interviews, phone calls, relationships, and understanding your speech, with new expert-curated tracks added regularly.",
  openGraph: {
    title: "Find your program | Speechworks",
    description: "Compare guided programs for adults who stutter. Find a daily plan for interviews, phone calls, relationships, or understanding your speech, with new expert-curated tracks in active development.",
  },
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
