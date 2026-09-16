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
              Got a conversation<br />on your mind<span>?</span>
            </h1>
            <p className="hero-description">
              You might have an interview coming up, or a call you&apos;ve been putting off. Speechworks has guided programs for adults who stutter, with lessons and activities to help you prepare.
            </p>
            <StoreButtons />
            <p className="hero-purchase-note">Free to download. Programs purchased separately.</p>
            <Link href="/programs/" className="hero-explore">
              Explore the programs <ArrowUpRight size={15} aria-hidden="true" />
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
              <h2 id="programs-title">Start with the situation.</h2>
            </div>
            <div className="section-heading-aside">
              <p>
                You might want to practise an interview, prepare for a call, or work out how to tell someone you stutter. There&apos;s a program for each.
              </p>
              <Link href="/programs/" className="text-link">
                Explore all 10 programs{" "}
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
            <span>10 programs. Each is a one-time purchase in the app.</span>
          </div>
        </section>
        <section
          className="personality-section"
          data-depth-scene
          aria-labelledby="personality-title"
        >
          <div className="personality-inner section-wrap">
            <div className="personality-copy" data-reveal>
              <h2 id="personality-title">Who are you going with?</h2>
              <p>
                Have a look through the cast. The star glasses are an option.
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
