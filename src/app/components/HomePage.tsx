import Navbar from "./Navbar";
import Footer from "./Footer";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import FeatureDeck from "./FeatureDeck";
import StoreButtons from "./StoreButtons";
import ProgramCard from "./ProgramCard";
import DownloadSection from "./DownloadSection";
import SectionEdge from "./SectionEdge";
import SceneDepth from "./SceneDepth";
import Faq from "./Faq";
import HowProgramsWork from "./HowProgramsWork";
import { programs } from "@/content/programs";

const outcomePrograms: Record<string, { label: string; description: string }> = {
  interview_ready: {
    label: "Job interviews",
    description: "Explain your experience with clear examples. Build your answers, then test them with an AI interviewer. Includes 10 calls.",
  },
  hard_conversations: {
    label: "Phone calls",
    description: "Ask for help, explain a problem, or say no. Try different responses with an AI caller. Includes 8 calls.",
  },
  art_of_disclosure: {
    label: "Talking about your stutter",
    description: "Decide whether to tell someone and how much to share. See examples of what you could say.",
  },
};

export default function HomePage({ outcome = false, preview = false }: { outcome?: boolean; preview?: boolean }) {
  return (
    <div className="site-shell home-page">
      <Navbar />
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-title" data-depth-scene>
          <div className="hero-copy" data-reveal>
            <h1 id="hero-title">
              {outcome ? <>Practice for the conversations<br /> that matter to you</> : <>Say what you<br /> want to say</>}<span>.</span>
            </h1>
            <p className="hero-description">
              {outcome
                ? "Prepare for a job interview, a phone call, or talking about your stutter. Get programs and speaking practice in the Speechworks app."
                : "For adults who stammer or stutter. Practice a job interview or a phone call with an AI caller that waits for you."}
            </p>
            <StoreButtons />
            <p className="hero-purchase-note">Free to download, with free daily practice. Pay once for each program.</p>
            <Link href="/programs/" className="hero-explore">
              See programs <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <FeatureDeck outcome={outcome} paused={preview} />
        </section>
        <SectionEdge kind="hero" />
        <section
          className="programs-section section-wrap"
          id="programs"
          aria-labelledby="programs-title"
        >
          <div className="section-heading" data-reveal>
            <div>
              <h2 id="programs-title">{outcome ? "Choose a program." : "What do you want to practice?"}</h2>
            </div>
            <div className="section-heading-aside">
              {!outcome && <p>
                Choose a program for the conversation you want to have.
              </p>}
              <Link href="/programs/" className="text-link">
                See all programs{" "}
                <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="featured-programs">
            {programs.slice(0, 3).map((program) => (
              <ProgramCard key={program.key} program={outcome ? { ...program, ...outcomePrograms[program.key] } : program} />
            ))}
          </div>
          <div className="programs-footnote" data-reveal>
            <span>Pay once for a program. Keep your notes and completed days.</span>
          </div>
        </section>
        <HowProgramsWork outcome={outcome} />
        <Faq />
        <DownloadSection outcome={outcome} />
      </main>
      <Footer />
      <SceneDepth />
    </div>
  );
}
