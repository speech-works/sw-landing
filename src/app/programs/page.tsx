import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgramCatalog from "../components/ProgramCatalog";
import DownloadSection from "../components/DownloadSection";
export const metadata = {
  title: "Programs",
  description:
    "Explore 10 guided Speechworks programs for adults who stutter. Find a program for interviews, everyday calls, connection, and understanding your voice.",
  alternates: { canonical: "/programs/" },
};
export default function Programs() {
  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <header className="page-intro section-wrap" data-reveal>
          <h1>What have you got coming up?</h1>
          <p>
            Browse programs for interviews, phone calls and talking about stuttering. You&apos;ll also find topics like reflecting on a difficult speaking experience.
          </p>
        </header>
        <ProgramCatalog />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
