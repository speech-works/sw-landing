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
import SectionEdge from "../../components/SectionEdge";
import { socialMetadata } from "@/lib/site-metadata";
import { launchDiscount } from "@/content/pricing";
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
    description: program.searchDescription,
    alternates: { canonical: `/programs/${slug}/` },
    ...socialMetadata(`${program.searchTitle} | Speechworks`, program.searchDescription, `/programs/${slug}/`, slug),
  };
}
export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = programs.find((item) => item.slug === slug);
  if (!program) notFound();
  const discount = launchDiscount(program.key);
  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <div className="page-hero">
          <div className="section-wrap">
            <Link className="breadcrumb" href="/programs/">
              <ArrowLeft size={15} /> All programs
            </Link>
            <section className="detail-hero" data-reveal>
              <div>
                <p className="section-kicker">
                  {program.days} days · Pay once
                </p>
                <h1>{program.label}</h1>
                <p className="program-app-name">In the app: {program.title}</p>
                <p className="detail-description">{program.detail}</p>
                <a href="#download" className="button button-ink pressable">
                  Get the app <ArrowUpRight size={17} />
                </a>
                <p className="detail-purchase-note">
                  {discount !== null && <>Launch offer: <strong>{discount}% off</strong>. </>}
                  Pay once for this program. No subscription needed.
                </p>
              </div>
              <div className={`detail-art tone-${program.color}`}>
                <ProgramIllustration program={program.key} />
              </div>
            </section>
          </div>
        </div>
        <SectionEdge kind="hero" />
        <div className="section-wrap">
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
              <h2 id="outline-title">
                Your daily plan
              </h2>
              <p>
                New days open over time. The app shows when you can start the next day. You can return to completed days.
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
