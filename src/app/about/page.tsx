import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Avatar from "../components/Avatar";
import DownloadSection from "../components/DownloadSection";
export const metadata = {
  title: "About",
  description:
    "Guided programs for adults who stutter, with activities for interviews, everyday calls and talking about stuttering.",
  alternates: { canonical: "/about/" },
};
export default function About() {
  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <section className="about-intro section-wrap" data-reveal>
          <p className="section-kicker">About Speechworks</p>
          <h1>Practice for the situations you face.</h1>
          <div className="about-faces" aria-hidden="true">
            {["braids", "workcap", "silver", "hijab"].map((name) => (
              <Avatar key={name} name={name} size={115} />
            ))}
          </div>
          <p>
            An interview and a difficult phone call ask different things of you. Speechworks has a program for each, with activities built around that situation. You choose what you want to work on.
          </p>
        </section>
        <section className="about-principles section-wrap" aria-label="How the programs work">
          <article data-reveal>
            <h2>Choose what to work on.</h2>
            <p>You decide which situation to practise and what you want to share. For example, The Art of Disclosure helps you think through whether you want to tell someone you stutter.</p>
          </article>
          <article data-reveal>
            <h2>See what is included.</h2>
            <p>Each of our <Link href="/programs/" className="underline">program pages</Link> has a daily outline. Interview Ready and The Hard Conversations include AI call practice; other programs use activities such as writing and speaking practice.</p>
          </article>
          <article data-reveal>
            <h2>Keep your notes.</h2>
            <p>Save the notes you want to return to and revisit completed lessons. The app shows which program day is available when you come back.</p>
          </article>
        </section>
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
