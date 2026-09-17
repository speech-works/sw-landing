import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { programs } from "@/content/programs";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ProgramIllustration from "../../components/ProgramIllustration";
import DownloadSection from "../../components/DownloadSection";
import ProgramTakeaway from "../../components/ProgramTakeaway";
import { socialMetadata } from "@/lib/site-metadata";
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
    title: program.searchTitle,
    description: program.description,
    alternates: { canonical: `/programs/${slug}/` },
    ...socialMetadata(`${program.searchTitle} | Speechworks`, program.description, `/programs/${slug}/`, slug),
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
                Get this program in the app <ArrowUpRight size={17} />
              </a>
              <p className="detail-purchase-note">Buy this program once. No subscription required. See current pricing in the app.</p>
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
              <p className="section-kicker">Your daily plan</p>
              <h2 id="outline-title">
                See your
                <br />
                <span className="serif-word">daily plan.</span>
              </h2>
              <p>
                Each day gives you a lesson or activity to work through. New days become available over time. Return to completed lessons when you need them. Check the price in the app before you buy.
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
          <ProgramTakeaway programKey={program.key} />
        </div>
        <DownloadSection programTitle={program.title} />
      </main>
      <Footer />
    </div>
  );
}
