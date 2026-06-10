import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { withBasePath } from "@/app/lib/withBasePath";

// NOTE: Update this whenever the policy text changes.
const LAST_UPDATED = "June 11, 2026";
const CONTACT_EMAIL = "contact@speechworks.in";

export const metadata: Metadata = {
  title: "Privacy Policy | Speechworks",
  description:
    "How Speechworks collects, uses, protects, and shares your information, including speech practice and health-related data.",
  alternates: { canonical: "https://speechworks.app/privacy" },
  openGraph: {
    title: "Privacy Policy | Speechworks",
    description:
      "How Speechworks collects, uses, protects, and shares your information.",
    url: "https://speechworks.app/privacy",
    type: "website",
  },
  robots: { index: true, follow: true },
};

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-[22px] md:text-[28px] font-semibold text-[#401B00] tracking-tight">
        {title}
      </h2>
      <div className="mt-3 space-y-4 text-[16px] md:text-[17px] leading-relaxed text-gray-600">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-dvh bg-[#FFF5F0]">
      {/* Header */}
      <header className="border-b border-black/5 bg-white/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Image
              src={withBasePath("/assets/logo.png")}
              alt="Speechworks logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-md"
            />
            <span className="text-lg font-bold text-[#401B00]">Speechworks</span>
          </Link>
          <Link
            href="/"
            className="text-sm font-medium text-[#D9692E] hover:text-[#F28044]"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <h1 className="text-[34px] md:text-[44px] font-bold leading-tight tracking-tight text-[#401B00]">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: {LAST_UPDATED}</p>

        <div className="mt-8 space-y-4 text-[16px] md:text-[17px] leading-relaxed text-gray-600">
          <p>
            This Privacy Policy explains how Speechworks (&ldquo;Speechworks,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects,
            uses, shares, and protects your information when you use the
            Speechworks mobile application and our website at{" "}
            <a
              href="https://speechworks.app"
              className="text-[#D9692E] underline-offset-2 hover:underline"
            >
              speechworks.app
            </a>{" "}
            (together, the &ldquo;Services&rdquo;). Speechworks helps people who
            stutter practice, track progress, and connect with speech-language
            professionals.
          </p>
          <p>
            By using the Services, you agree to the collection and use of
            information in accordance with this policy.
          </p>
        </div>

        <Section title="1. Information We Collect">
          <p>We collect the following categories of information:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-gray-700">Account information</strong> —
              such as your name, email address, and password (or sign-in
              identifiers if you use a third-party sign-in provider).
            </li>
            <li>
              <strong className="text-gray-700">
                Speech &amp; health-related data
              </strong>{" "}
              — voice and audio recordings you create during practice, speech
              exercise results, progress metrics, mood or well-being check-ins,
              and goals you set. This information may be considered sensitive or
              health-related data.
            </li>
            <li>
              <strong className="text-gray-700">
                Therapy &amp; communication data
              </strong>{" "}
              — messages, notes, and information you share with clinicians or
              that clinicians share with you when you connect through the
              Services.
            </li>
            <li>
              <strong className="text-gray-700">Usage &amp; device data</strong>{" "}
              — app interactions, feature usage, device type, operating system,
              app version, and diagnostic or crash data.
            </li>
            <li>
              <strong className="text-gray-700">Support communications</strong> —
              information you provide when you contact us.
            </li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use your information to:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Provide, maintain, and improve the Services;</li>
            <li>
              Deliver speech practice exercises and generate progress insights;
            </li>
            <li>
              Connect you with clinicians and enable communication you initiate;
            </li>
            <li>Personalize your experience and recommendations;</li>
            <li>
              Diagnose technical issues, prevent abuse, and keep the Services
              secure;
            </li>
            <li>Respond to your requests and provide customer support; and</li>
            <li>Comply with legal obligations.</li>
          </ul>
          <p>
            We do <strong>not</strong> sell your personal information, and we do
            not use your voice recordings or health-related data for advertising.
          </p>
        </Section>

        <Section title="3. Voice &amp; Audio Recordings">
          <p>
            Speech practice may involve recording your voice. These recordings
            are used to provide feedback, measure progress, and improve your
            experience. You control which exercises you record, and you can
            delete recordings associated with your account. Where we process this
            data, we do so to deliver the core functionality you request.
          </p>
        </Section>

        <Section title="4. How We Share Information">
          <p>We share information only in the following circumstances:</p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-gray-700">With clinicians</strong> you
              choose to connect with, to the extent needed to support your
              therapy.
            </li>
            <li>
              <strong className="text-gray-700">With service providers</strong>{" "}
              who process data on our behalf (for example, hosting, analytics, and
              infrastructure) under contractual confidentiality and security
              obligations.
            </li>
            <li>
              <strong className="text-gray-700">For legal reasons</strong> — when
              required by law, regulation, legal process, or to protect the
              rights, safety, and security of users or the public.
            </li>
            <li>
              <strong className="text-gray-700">Business transfers</strong> — in
              connection with a merger, acquisition, or sale of assets, subject to
              this policy.
            </li>
          </ul>
        </Section>

        <Section title="5. Data Retention">
          <p>
            We retain your information for as long as your account is active or as
            needed to provide the Services. We will delete or anonymize your
            personal information when it is no longer required, unless we are
            legally required to retain it.
          </p>
        </Section>

        <Section title="6. Data Security">
          <p>
            We use administrative, technical, and physical safeguards designed to
            protect your information, including encryption in transit. No method
            of transmission or storage is completely secure, so we cannot
            guarantee absolute security.
          </p>
        </Section>

        <Section title="7. Your Rights &amp; Choices">
          <p>
            Depending on where you live, you may have the right to access,
            correct, export, or delete your personal information, and to object to
            or restrict certain processing. To exercise these rights, contact us
            at the address below.
          </p>
        </Section>

        <Section title="8. Account &amp; Data Deletion">
          <p>
            You can request deletion of your account and associated personal data
            at any time. From within the app you may delete recordings and
            content, or you can email us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#D9692E] underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            to request full account and data deletion. We will process verified
            requests within a reasonable timeframe, subject to legal retention
            requirements.
          </p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>
            The Services are not directed to children under the age of 13 (or the
            minimum age required in your jurisdiction). If you are a parent or
            guardian and believe your child has provided us with personal
            information, please contact us so we can take appropriate action.
          </p>
        </Section>

        <Section title="10. International Data Transfers">
          <p>
            Your information may be processed and stored in countries other than
            your own. Where we transfer personal data internationally, we take
            steps to ensure it remains protected in accordance with this policy
            and applicable law.
          </p>
        </Section>

        <Section title="11. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will revise the &ldquo;Last updated&rdquo; date above and, where
            appropriate, provide additional notice. Your continued use of the
            Services after changes take effect constitutes acceptance of the
            updated policy.
          </p>
        </Section>

        <Section title="12. Contact Us">
          <p>
            If you have questions or requests regarding this Privacy Policy or
            your data, contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#D9692E] underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <footer className="mt-16 border-t border-black/5 pt-8 text-sm text-gray-500">
          <p>© {LAST_UPDATED.split(", ")[1]} Speechworks. All rights reserved.</p>
          <Link
            href="/"
            className="mt-2 inline-block font-medium text-[#D9692E] hover:text-[#F28044]"
          >
            ← Back to home
          </Link>
        </footer>
      </article>
    </main>
  );
}
