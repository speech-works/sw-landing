import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StoryHero from "../../components/StoryHero";
import StartDayButton from "../../components/StartDayButton";
import DownloadSection from "../../components/DownloadSection";
import SectionEdge from "../../components/SectionEdge";
import { socialMetadata } from "@/lib/site-metadata";

const DAY = "/try-a-day/night-before-your-interview/day/";
const title = "The night before your interview: a free day";
const description = "Try a free day made in the style of Interview Ready, for adults who stutter or stammer. Write if-then lines for your interview and keep the card.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/try-a-day/night-before-your-interview/" },
  ...socialMetadata(`${title} | Speechworks`, description, "/try-a-day/night-before-your-interview/", "interview-ready"),
};

const steps = [
  ["Learn the idea", "A short lesson and three quick questions about if-then plans."],
  ["Pick your moments", "Choose up to three parts of the interview you want a plan for."],
  ["Write and keep your card", "Write each line in your own words. Keep the card or print it."],
];

const sampleLines = [
  "If they ask me to begin, then I say my name and the job I applied for.",
  "If I want more time to think, then I say, “Give me a moment to think about that.”",
  "If I do not hear the question, then I ask them to say it again.",
];

export default function TryADayPage() {
  return (
    <div className="site-shell free-day">
      <Navbar />
      <main id="main-content">
        <div className="page-hero">
          <div className="section-wrap">
            <section className="detail-hero" data-reveal>
              <div>
                <p className="section-kicker">Free day · One evening</p>
                <h1>The night before your interview<span className="pg-dot">.</span></h1>
                <p className="program-app-name">Made in the style of Interview Ready</p>
                <p className="detail-description">Write if-then lines for the moments of your interview. One card, one evening.</p>
                <div className="pg-ctas">
                  <Link href="/programs/interview-ready/" className="pg-secondary pressable">See Interview Ready</Link>
                  <StartDayButton href={DAY} />
                </div>
                <p className="pg-offer">Free. No sign-up needed.</p>
              </div>
              <StoryHero program="free_day" you="banker-b" realFill={{ a: "#F6A5C0", b: "#fff4e6", kind: "dots" }} />
            </section>
          </div>
        </div>
        <SectionEdge kind="hero" />
        <section className="day-parts section-wrap" aria-labelledby="outline-title">
          <div className="day-parts-copy" data-reveal>
            <h2 id="outline-title">You leave with a card for your interview.</h2>
            <p>One evening, one card. It holds up to three plans, one for each moment of the interview you want to be ready for.</p>
            <ol className="day-steps">
              {steps.map(([name, note], index) => (
                <li key={name}>
                  <span className="day-step-n" aria-hidden="true">{index + 1}</span>
                  <div><b>{name}</b><span>{note}</span></div>
                </li>
              ))}
            </ol>
            <StartDayButton href={DAY} />
          </div>
          <figure className="day-card" data-reveal>
            <p className="day-card-label">Your card · The interview</p>
            <ul>
              {sampleLines.map((line) => <li key={line}>{line}</li>)}
            </ul>
            <figcaption>Example lines. In the day you keep them, change them, or write your own.</figcaption>
          </figure>
        </section>
        <DownloadSection programTitle="Interview Ready" placement="try-a-day" />
      </main>
      <Footer />
    </div>
  );
}
