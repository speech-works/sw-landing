import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SectionEdge from "@/app/components/SectionEdge";
import { socialMetadata } from "@/lib/site-metadata";

const CONTACT_EMAIL = "contact@speechworks.app";

export const metadata: Metadata = {
  title: "Delete Your Account & Data",
  description:
    "How to delete your Speechworks account and all associated data, including voice recordings, progress, and assessments, from inside the app or by request.",
  alternates: { canonical: "/account/delete/" },
  ...socialMetadata("Delete Your Account & Data | Speechworks", "How to delete your Speechworks account and associated data from inside the app or by request.", "/account/delete/"),
  robots: { index: true, follow: true },
};

export default function DeleteAccountPage() {
  return (
    <div className="site-shell">
      <Navbar />
      <div className="page-hero">
        <header className="legal-intro section-wrap" data-reveal>
          <p className="section-kicker">Account &amp; Data Deletion</p>
          <h1>
            Delete your account &amp; data
          </h1>
        </header>
      </div>
      <SectionEdge kind="hero" />
      <main id="main-content">
        <article className="legal-page">
          <div className="mt-8 space-y-4 text-[16px] md:text-[17px] leading-relaxed text-[var(--ink-muted)]">
            <p>
              You can permanently delete your Speechworks account and all
              associated data at any time. There are two ways to do this.
            </p>
          </div>

          {/* Option 1: in app */}
          <section className="mt-10 legal-card">
            <h2 className="text-[20px] md:text-[24px] font-bold text-[var(--ink)]">
              1. From inside the app (fastest)
            </h2>
            <div className="mt-4 space-y-3 text-[15px] md:text-[16px] leading-relaxed text-[var(--ink-muted)]">
              <p>
                Open the Speechworks app and go to{" "}
                <strong className="text-[var(--ink)]">
                  Settings → Delete Account
                </strong>
                . Confirming there immediately and permanently removes your account
                and all associated data from our systems.
              </p>
            </div>
          </section>

          {/* Option 2: by request */}
          <section className="mt-6 legal-card">
            <h2 className="text-[20px] md:text-[24px] font-bold text-[var(--ink)]">
              2. By request (no app required)
            </h2>
            <div className="mt-4 space-y-3 text-[15px] md:text-[16px] leading-relaxed text-[var(--ink-muted)]">
              <p>
                If you can&rsquo;t access the app, email us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=Account%20deletion%20request`}
                  className="legal-link"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                from the email address on your account (or include it in the
                message) and ask us to delete your account. We verify the request
                and action it within 30 days.
              </p>
            </div>
          </section>

          {/* What is deleted */}
          <section className="mt-10">
            <h2 className="text-[22px] md:text-[28px] font-bold text-[var(--ink)] tracking-tight">
              What gets deleted
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[16px] md:text-[17px] leading-relaxed text-[var(--ink-muted)]">
              <li>Your profile and account (name, email, and profile details)</li>
              <li>Your voice recordings and the underlying audio files</li>
              <li>
                Practice activity, progress, assessments, mood check-ins, and
                reminders
              </li>
              <li>Buddy connections and anything shared through them</li>
            </ul>
            <p className="mt-4 text-[15px] md:text-[16px] leading-relaxed text-[var(--ink-muted)]">
              Some information may persist for a limited period in encrypted
              backups, or where retention is required by law, after which it is
              removed. We do not retain a usable copy of your account once deletion
              is complete.
            </p>
          </section>

          <div className="mt-16 flex flex-col items-center gap-5 border-t border-[#14131126] pt-12">
            <p className="text-sm font-medium text-[var(--ink-muted)]">
              See our{" "}
              <Link
                href="/privacy"
                className="legal-link"
              >
                Privacy Policy
              </Link>{" "}
              for full details.
            </p>
            <Link
              href="/"
              className="button button-ink pressable"
            >
              Back to home
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
