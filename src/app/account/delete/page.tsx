import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const CONTACT_EMAIL = "contact@speechworks.in";

export const metadata: Metadata = {
  title: "Delete Your Account & Data | Speechworks",
  description:
    "How to delete your Speechworks account and all associated data, including voice recordings, progress, and assessments, from inside the app or by request.",
  alternates: { canonical: "https://speechworks.app/account/delete" },
  robots: { index: true, follow: true },
};

export default function DeleteAccountPage() {
  return (
    <main className="relative min-h-dvh overflow-clip bg-[#FFF5F0]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(70%_100%_at_50%_0%,rgba(242,128,68,0.12),transparent_70%)]"
      />

      <Navbar />

      <article className="relative mx-auto max-w-3xl px-6 pt-28 pb-12 md:pt-36 md:pb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#F28044]/20 bg-white/70 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#D9692E] shadow-sm backdrop-blur">
          Account &amp; Data Deletion
        </span>
        <h1 className="mt-5 text-[36px] md:text-[52px] font-black leading-[1.05] tracking-tight text-[#401B00]">
          Delete your account &amp; data
        </h1>

        <div className="mt-8 space-y-4 text-[16px] md:text-[17px] leading-relaxed text-gray-600">
          <p>
            You can permanently delete your Speechworks account and all
            associated data at any time. There are two ways to do this.
          </p>
        </div>

        {/* Option 1: in app */}
        <section className="mt-10 rounded-3xl border border-[#FFD9C2] bg-white/70 p-6 md:p-8 shadow-sm backdrop-blur-sm">
          <h2 className="text-[20px] md:text-[24px] font-bold text-[#401B00]">
            1. From inside the app (fastest)
          </h2>
          <div className="mt-4 space-y-3 text-[15px] md:text-[16px] leading-relaxed text-gray-600">
            <p>
              Open the Speechworks app and go to{" "}
              <strong className="text-gray-700">
                Settings → Delete Account
              </strong>
              . Confirming there immediately and permanently removes your account
              and all associated data from our systems.
            </p>
          </div>
        </section>

        {/* Option 2: by request */}
        <section className="mt-6 rounded-3xl border border-[#FFD9C2] bg-white/70 p-6 md:p-8 shadow-sm backdrop-blur-sm">
          <h2 className="text-[20px] md:text-[24px] font-bold text-[#401B00]">
            2. By request (no app required)
          </h2>
          <div className="mt-4 space-y-3 text-[15px] md:text-[16px] leading-relaxed text-gray-600">
            <p>
              If you can&rsquo;t access the app, email us at{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}?subject=Account%20deletion%20request`}
                className="font-semibold text-[#D9692E] underline-offset-2 hover:underline"
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
          <h2 className="text-[22px] md:text-[28px] font-bold text-[#401B00] tracking-tight">
            What gets deleted
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-[16px] md:text-[17px] leading-relaxed text-gray-600">
            <li>Your profile and account (name, email, and profile details)</li>
            <li>Your voice recordings and the underlying audio files</li>
            <li>
              Practice activity, progress, assessments, mood check-ins, and
              reminders
            </li>
            <li>Buddy connections and anything shared through them</li>
          </ul>
          <p className="mt-4 text-[15px] md:text-[16px] leading-relaxed text-gray-600">
            Some information may persist for a limited period in encrypted
            backups, or where retention is required by law, after which it is
            removed. We do not retain a usable copy of your account once deletion
            is complete.
          </p>
        </section>

        <div className="mt-16 flex flex-col items-center gap-5 border-t border-[#F28044]/15 pt-12">
          <p className="text-sm font-medium text-gray-400">
            See our{" "}
            <Link
              href="/privacy"
              className="text-[#D9692E] underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            for full details.
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-white/40 bg-gradient-to-br from-[#FF955E] to-[#D9692E] px-8 py-3.5 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_15px_35px_-8px_rgba(242,128,68,0.5)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5"
          >
            Back to home
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
