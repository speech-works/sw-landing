import "./home.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FeatureDeck from "./components/FeatureDeck";
import StoreButtons from "./components/StoreButtons";
import ProgramCard from "./components/ProgramCard";
import AvatarPlayground from "./components/AvatarPlayground";
import DownloadSection from "./components/DownloadSection";
import DownloadRibbon from "./components/DownloadRibbon";
import SectionEdge from "./components/SectionEdge";
import SceneDepth from "./components/SceneDepth";
import Faq from "./components/Faq";
import { programs } from "@/content/programs";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <div className="site-shell home-page">
      <Navbar />
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title" data-depth-scene>
          <FeatureDeck />
          <div className="hero-copy" data-reveal>
            <p className="hero-audience">
              For adults who stutter
            </p>
            <h1 id="hero-title">
              Say what you<br />want to say<span>.</span>
            </h1>
            <p className="hero-description">
              Prepare for interviews, phone calls, and conversations you want to have. Speechworks gives adults who stutter a plan and a place to practice.
            </p>
            <StoreButtons />
            <p className="hero-purchase-note">Download the app for free. Buy programs separately.</p>
            <Link href="/programs/" className="hero-explore">
              Find your program <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <SectionEdge kind="hero" />
        <section
          className="programs-section section-wrap"
          id="programs"
          aria-labelledby="programs-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <h2 id="programs-title">What do you want to say?</h2>
            </div>
            <div className="section-heading-aside">
              <p>
                Introduce yourself in an interview. Make a difficult call. Tell someone you stutter. Choose a program for the conversation you want to have.
              </p>
              <Link href="/programs/" className="text-link">
                Explore programs & upcoming tracks{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="featured-programs">
            {programs.slice(0, 3).map((program) => (
              <ProgramCard key={program.key} program={program} />
            ))}
          </div>
          <div className="programs-footnote" data-reveal>
            <span>Buy a program once. Return to the lessons when you need them.</span>
            <span>New expert-curated tracks continually in development</span>
          </div>
        </section>
        <section
          className="personality-section"
          data-depth-scene
          aria-labelledby="personality-title"
        >
          <div className="personality-inner section-wrap">
            <div className="personality-copy" data-reveal>
              <h2 id="personality-title">Choose a face that feels like you.</h2>
              <p>
                Try the faces below. Find your favorite, from a sunhat to star glasses.
              </p>
              <Link href="/about/" className="text-link">
                About Speechworks <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <AvatarPlayground />
          </div>
        </section>
        <Faq />
        <DownloadRibbon />
        <DownloadSection />
      </main>
      <Footer />
      <SceneDepth />
    </div>
  );
}
