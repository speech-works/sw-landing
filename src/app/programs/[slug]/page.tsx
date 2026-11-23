import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { programs } from "@/content/programs";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { cast, heroLabel } from "../../components/ProgramIllustration";
import HeroStory from "../../components/HeroStory";
import DownloadSection from "../../components/DownloadSection";
import ProgramKit from "../../components/ProgramKit";
import ProgramSteps from "../../components/ProgramSteps";
import ProgramChat from "../../components/ProgramChat";
import SectionEdge from "../../components/SectionEdge";
import { socialMetadata } from "@/lib/site-metadata";
import { launchDiscount } from "@/content/pricing";
import { programPage } from "@/content/program-page";
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
  const page = programPage(program);
  // Interview Ready: the banker without glasses, so "You" never looks like the Speechworks mascot (same suit and hair)
  const you = program.key === "interview_ready" ? "banker-b" : cast[program.key] ?? "banker";
  return (
    <div className="site-shell">
      <Navbar />
      <main id="main-content">
        <div className="page-hero">
          <div className="section-wrap">
            <section className="detail-hero" data-reveal>
              <div>
                <p className="section-kicker">
                  {program.days} days · Pay once
                </p>
                <h1>{program.label}<span className="pg-dot">.</span></h1>
                <p className="program-app-name">In the app: {program.title}</p>
                <p className="detail-description">{program.detail}</p>
                <div className="pg-ctas">
                  <Link href="/programs/" className="pg-secondary pressable">All programs</Link>
                  <a href="#download" className="button button-ink pressable">
                    Get the app <ArrowUpRight size={17} />
                  </a>
                </div>
                <p className="pg-offer">
                  {discount !== null && <><b>{discount}% off</b> at launch. </>}
                  Pay once, no subscription.
                </p>
              </div>
              <HeroStory program={program.key} you={you} label={heroLabel(program.key)} />
            </section>
          </div>
        </div>
        <SectionEdge kind="hero" />
        <ProgramKit data={page} days={program.days} you={you} />
        <ProgramSteps data={page} dayTitles={program.outline.map((day) => day.title)} />
        <ProgramChat data={page} you={you} />
        <DownloadSection programTitle={program.title} placement={`program-${slug}`} />
      </main>
      <Footer />
    </div>
  );
}
