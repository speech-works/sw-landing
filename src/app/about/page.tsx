import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Avatar from "../components/Avatar";
import DownloadSection from "../components/DownloadSection";
import SectionEdge from "../components/SectionEdge";
import { socialMetadata } from "@/lib/site-metadata";
export const metadata = {
  title: "About",
  description:
    "Speechworks gives adults who stammer or stutter lessons and speaking practice for everyday conversations.",
  ...socialMetadata("About Speechworks", "Lessons and speaking practice for adults who stammer or stutter.", "/about/"),
  alternates: { canonical: "/about/" },
};
export default function About() {
  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <div className="page-hero">
          <section className="about-intro section-wrap" data-reveal>
            <p className="section-kicker">About Speechworks</p>
            <h1>A place to practice speaking.</h1>
            <div className="about-faces" aria-hidden="true">
              {["braids", "workcap", "silver", "hijab"].map((name) => (
                <Avatar key={name} name={name} size={115} />
              ))}
            </div>
            <p>
              Speechworks is an app for adults who stutter. It has lessons and activities to help you prepare for interviews, phone calls, and personal conversations.
            </p>
          </section>
        </div>
        <SectionEdge kind="hero" />
        <section className="about-principles section-wrap" aria-label="How the programs work">
          <article data-reveal>
            <h2>Choose what to practice.</h2>
            <p>Start with a conversation you want to have. You decide what to say and whether to talk about your stutter.</p>
          </article>
          <article data-reveal>
            <h2>See what is included.</h2>
            <p>See the lessons on each <Link href="/programs/" className="underline">program page</Link> before you choose. Interview and phone call programs include AI calls. Other programs use writing and speaking activities.</p>
          </article>
          <article data-reveal>
            <h2>Come back when you need to.</h2>
            <p>Your notes and completed lessons stay available. If you miss a day, continue when you return.</p>
          </article>
        </section>
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
