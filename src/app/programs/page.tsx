import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProgramCatalog from "../components/ProgramCatalog";
import DownloadSection from "../components/DownloadSection";
import SectionEdge from "../components/SectionEdge";
import { socialMetadata } from "@/lib/site-metadata";
export const metadata = {
  title: "Programs for Adults Who Stammer or Stutter",
  description:
    "Choose a program for interviews, phone calls, or talking about your stammer or stutter. See the daily plan and what is included.",
  ...socialMetadata("Programs for Adults Who Stammer or Stutter | Speechworks", "Choose a program for interviews, phone calls, or talking about your stammer or stutter. See the daily plan before you choose.", "/programs/", "programs"),
  alternates: { canonical: "/programs/" },
};
export default function Programs() {
  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <div className="page-hero">
          <header className="page-intro section-wrap" data-reveal>
            <h1>Choose a program.</h1>
            <p>
              Practice for an interview or a phone call. Learn about your stutter. See what each program includes.
            </p>
          </header>
        </div>
        <SectionEdge kind="hero" />
        <ProgramCatalog />
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
