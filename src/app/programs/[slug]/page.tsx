import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { programs } from "@/content/programs";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProgramIllustration from "../../components/ProgramIllustration";
import DownloadSection from "../../components/DownloadSection";
export const dynamicParams = false;
export function generateStaticParams() {
  return programs.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);
  if (!program) return {};
  return {
    title: program.title,
    description: program.description,
    alternates: { canonical: `/programs/${slug}/` },
    openGraph: {
      title: `${program.title} | Speechworks`,
      description: program.description,
    },
  };
}
export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);
  if (!program) notFound();
  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <div className="section-wrap">
          <Link className="breadcrumb" href="/programs/">
            <ArrowLeft size={15} /> All programs
          </Link>
          <section className="detail-hero" data-reveal>
            <div>
              <p className="section-kicker">
                {program.days} days · One-time purchase
              </p>
              <h1>{program.title}</h1>
              <p className="detail-description">{program.detail}</p>
              <a href="#download" className="button button-ink pressable">
                Explore in the app <ArrowUpRight size={17} />
              </a>
            </div>
            <div className={`detail-art tone-${program.color}`}>
              <ProgramIllustration program={program.key} />
            </div>
          </section>
          <ul className="detail-includes" aria-label="What is included">
            {program.includes.map((item) => (
              <li key={item} data-reveal>
                <Check size={18} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <section className="outline-section" aria-labelledby="outline-title">
            <div data-reveal>
              <p className="section-kicker">A look at what is inside</p>
              <h2 id="outline-title">
                One day
                <br />
                <span className="serif-word">at a time.</span>
              </h2>
              <p>
                New days unlock over time. Come back to completed lessons
                whenever you need them. See current pricing in the app.
              </p>
            </div>
            <ol className="program-outline">
              {program.outline.map((day, index) => (
                <li key={index} data-reveal>
                  <span>Day {index + 1}</span>
                  {day.title}
                </li>
              ))}
            </ol>
          </section>
        </div>
        <DownloadSection />
      </main>
      <Footer />
    </div>
  );
}
