import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Avatar from "../components/Avatar";
import DownloadSection from "../components/DownloadSection";
export const metadata = {
  title: "About",
  description:
    "Your words deserve to be heard. See how Speechworks helps adults who stutter prepare for interviews, phone calls, and personal conversations.",
  openGraph: {
    title: "About Speechworks | Your words deserve to be heard",
    description: "See how Speechworks helps adults who stutter prepare for interviews, phone calls, and personal conversations.",
  },
  alternates: { canonical: "/about/" },
};
export default function About() {
  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <section className="about-intro section-wrap" data-reveal>
          <p className="section-kicker">About Speechworks</p>
          <h1>Your words deserve to be heard.</h1>
          <div className="about-faces" aria-hidden="true">
            {["braids", "workcap", "silver", "hijab"].map((name) => (
              <Avatar key={name} name={name} size={115} />
            ))}
          </div>
          <p>
            You may want to introduce yourself, ask for something, or tell someone how you feel. Speechworks helps adults who stutter prepare for these moments. Each program gives you lessons and activities for a goal you choose.
          </p>
        </section>
        <section className="about-principles section-wrap" aria-label="How the programs work">
          <article data-reveal>
            <h2>Start with what matters to you.</h2>
            <p>Choose the conversation you want to prepare for. You decide what to say and what to share. The Art of Disclosure, for example, helps you decide whether to tell someone you stutter.</p>
          </article>
          <article data-reveal>
            <h2>Know what you are choosing.</h2>
            <p>Read the daily outline on each <Link href="/programs/" className="underline">program page</Link> before you choose. Interview Ready and The Hard Conversations include AI calls. Other programs use activities such as writing and speaking practice.</p>
          </article>
          <article data-reveal>
            <h2>Keep what helps you.</h2>
            <p>Save your notes and return to completed lessons. Use them to prepare for another conversation. If you miss a day, you can continue your program when you return.</p>
          </article>
        </section>
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
