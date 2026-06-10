import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// NOTE: Update this whenever the policy text changes.
const LAST_UPDATED = "June 11, 2026";
const CONTACT_EMAIL = "contact@speechworks.in";

export const metadata: Metadata = {
  title: "Privacy Policy | Speechworks",
  description:
    "How the Speechworks app collects, uses, shares, and protects your information, including voice recordings and speech/health-related data.",
  alternates: { canonical: "https://speechworks.app/privacy" },
  openGraph: {
    title: "Privacy Policy | Speechworks",
    description:
      "How the Speechworks app collects, uses, shares, and protects your information.",
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
  const match = title.match(/^(\d+)\.\s+(.*)$/);
  const num = match?.[1];
  const heading = match?.[2] ?? title;
  return (
    <section className="mt-12 scroll-mt-28">
      <div className="flex items-center gap-3">
        {num && (
          <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg bg-[#F28044]/12 px-2 font-mono text-[11px] font-semibold tracking-wider text-[#D9692E]">
            {num.padStart(2, "0")}
          </span>
        )}
        <h2 className="text-[22px] md:text-[28px] font-bold text-[#401B00] tracking-tight">
          {heading}
        </h2>
      </div>
      <div className="mt-4 space-y-4 text-[16px] md:text-[17px] leading-relaxed text-gray-600">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-dvh overflow-clip bg-[#FFF5F0]">
      {/* Ambient brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(70%_100%_at_50%_0%,rgba(242,128,68,0.12),transparent_70%)]"
      />

      <Navbar />

      <article className="relative mx-auto max-w-3xl px-6 pt-28 pb-12 md:pt-36 md:pb-16">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#F28044]/20 bg-white/70 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.22em] text-[#D9692E] shadow-sm backdrop-blur">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#F28044] opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#F28044]" />
          </span>
          Privacy
        </span>
        <h1 className="mt-5 text-[36px] md:text-[52px] font-black leading-[1.05] tracking-tight text-[#401B00]">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm font-medium text-gray-500">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-8 space-y-4 text-[16px] md:text-[17px] leading-relaxed text-gray-600">
          <p>
            This Privacy Policy explains how Speechworks (&ldquo;Speechworks,&rdquo;
            &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects,
            uses, shares, and protects your information when you use the
            Speechworks mobile application and related services (the
            &ldquo;Services&rdquo;). Speechworks is a practice and support app for
            people who stutter — it offers guided speech exercises, progress
            tracking, mood check-ins, AI-assisted speaking practice, and optional
            peer (&ldquo;buddy&rdquo;) connections.
          </p>
          <p>
            Because the Services involve speech practice, voice recordings, and
            related well-being information, some of the data we process may be
            considered sensitive or health-related. This policy describes that
            processing in detail. By using the Services, you agree to this policy.
          </p>
        </div>

        {/* Privacy at a glance */}
        <div className="mt-10 rounded-3xl border border-[#FFD9C2] bg-gradient-to-b from-white/85 to-white/55 p-6 md:p-8 shadow-[0_18px_50px_-24px_rgba(242,128,68,0.45)] backdrop-blur-sm">
          <h2 className="flex items-center gap-2.5 text-[20px] md:text-[24px] font-bold tracking-tight text-[#401B00]">
            <span className="h-5 w-1.5 rounded-full bg-gradient-to-b from-[#FF955E] to-[#D9692E]" />
            Your privacy at a glance
          </h2>
          <div className="mt-4 space-y-4 text-[15px] md:text-[16px] leading-relaxed text-gray-600">
            <p>
              <strong className="text-gray-700">
                Speechworks is a practice and self-help tool
              </strong>{" "}
              for people who stutter. It is grounded in clinical research and
              built with speech-language professionals — but it does not provide
              medical advice, diagnosis, or treatment, and it is not a substitute
              for care from a qualified professional. It is also not an emergency
              service; if you are in crisis, please contact your local emergency
              services.
            </p>
            <p>
              <strong className="text-gray-700">What Speechworks can&rsquo;t see.</strong>{" "}
              The app runs inside your phone&rsquo;s secure sandbox. We{" "}
              <strong className="text-gray-700">cannot</strong> access other apps
              or their data, your web browsing history, your messages or call
              logs, your contacts, your photos and files (beyond an image you
              deliberately choose to upload), or your location. We only receive
              what you create inside Speechworks — your practice recordings,
              exercise results, and the profile details you choose to share.
            </p>
            <p>
              <strong className="text-gray-700">What you control.</strong> You
              decide when to record, what (if anything) to share with a buddy, and
              you can delete your recordings and your entire account at any time.
              We never sell your personal data, and we never use your voice or
              health-related information for advertising.
            </p>
          </div>
        </div>

        <Section title="1. Information We Collect">
          <p>
            <strong className="text-gray-700">Account &amp; profile.</strong> When
            you create an account, we collect your name, email address, and
            profile photo provided through your chosen sign-in provider (see
            &ldquo;Accounts &amp; Sign-in&rdquo; below). You may optionally add a
            bio, phone number, date of birth, profile picture, and social links.
          </p>
          <p>
            <strong className="text-gray-700">
              Voice recordings &amp; speech data.
            </strong>{" "}
            When you complete practice exercises or record a voice note, the app
            captures audio. For AI-assisted speaking practice (such as simulated
            phone calls), your microphone audio is streamed in real time so the
            feature can respond to you. We also derive and store speech-related
            metrics such as fluency/ease scores, practice progress, the sounds you
            identify as challenging (&ldquo;feared sounds&rdquo;), and tool usage.
          </p>
          <p>
            <strong className="text-gray-700">
              Well-being &amp; assessment data.
            </strong>{" "}
            We collect mood check-ins (a mood selection plus optional voice or text
            notes), responses to onboarding and impact-assessment questionnaires,
            goals, reminders, and derived progress/awareness scores.
          </p>
          <p>
            <strong className="text-gray-700">
              Camera &amp; motion (on-device).
            </strong>{" "}
            Some &ldquo;mirror work&rdquo; and awareness exercises use your camera
            and device motion sensors to give you live feedback. This processing
            happens on your device — <strong>no video is recorded, stored, or
            transmitted</strong>; only the resulting practice metrics (for example,
            head-movement or awareness scores) are saved.
          </p>
          <p>
            <strong className="text-gray-700">
              Community &amp; peer (&ldquo;buddy&rdquo;) data.
            </strong>{" "}
            If you connect with a buddy, we process the connection, invite codes,
            and any activity or mood signals you choose to share. Sharing of
            progress between buddies is controlled by consent settings.
          </p>
          <p>
            <strong className="text-gray-700">Usage &amp; device data.</strong> We
            collect product-analytics events (how features are used), device
            information, time zone, app/level/streak progress, and push
            notification tokens.
          </p>
        </Section>

        <Section title="2. Accounts & Sign-in">
          <p>
            We use a third-party authentication provider to manage sign-in. You
            sign in with Google, Apple, or Facebook, and that provider shares your
            basic profile details (such as name, email, and avatar) with us.{" "}
            <strong>
              We do not create or store a password for your Speechworks account
            </strong>{" "}
            — credentials are handled by your sign-in provider.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc space-y-2 pl-6">
            <li>To provide speech practice, recordings, feedback, and AI-assisted exercises;</li>
            <li>To generate progress insights, scores, and personalized recommendations;</li>
            <li>To enable mood check-ins, reminders, and well-being tracking;</li>
            <li>To support optional buddy connections and the sharing you enable;</li>
            <li>To process subscriptions and payments;</li>
            <li>To send notifications you have enabled;</li>
            <li>To diagnose issues, improve the Services, and keep them secure; and</li>
            <li>To comply with legal obligations.</li>
          </ul>
          <p>
            We do <strong>not</strong> sell your personal information, and we do
            not use your voice recordings or health-related data for third-party
            advertising.
          </p>
        </Section>

        <Section title="4. Service Providers & Third Parties">
          <p>
            We share data with third-party service providers only as needed to
            operate the Services. Each processes data on our behalf under its own
            terms and security obligations. These include the following categories
            of providers:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>
              <strong className="text-gray-700">
                Authentication &amp; identity providers
              </strong>{" "}
              — to create and secure your account.
            </li>
            <li>
              <strong className="text-gray-700">
                Cloud hosting &amp; storage providers
              </strong>{" "}
              — to run the Services and store your data, including your voice
              recordings.
            </li>
            <li>
              <strong className="text-gray-700">Speech &amp; AI providers</strong>{" "}
              — to power AI-assisted speaking practice. Your voice audio and the
              text of your practice conversations are processed by these providers
              to provide real-time speech-to-text, text-to-speech, and
              conversational responses.
            </li>
            <li>
              <strong className="text-gray-700">
                Payment &amp; subscription processors
              </strong>{" "}
              — to handle subscriptions and payments. Your full payment card
              details are handled by these processors; we do not store them.
            </li>
            <li>
              <strong className="text-gray-700">Push notification providers</strong>{" "}
              — to deliver the notifications you enable (using a device push token).
            </li>
            <li>
              <strong className="text-gray-700">Content delivery providers</strong>{" "}
              — to deliver video and learning content.
            </li>
            <li>
              <strong className="text-gray-700">Analytics providers</strong> — to
              understand how features are used and improve the app.
            </li>
          </ul>
          <p>
            We may also disclose information when required by law or legal process,
            to protect the rights and safety of users or the public, or in
            connection with a business transfer (such as a merger or acquisition),
            subject to this policy.
          </p>
        </Section>

        <Section title="5. Voice Recordings & AI Features">
          <p>
            Voice recordings you create during practice are uploaded to and stored
            in our cloud storage so you can review your progress. For AI-assisted
            speaking practice, your live microphone audio is streamed to a
            third-party speech provider to convert speech to text and to generate
            spoken responses, and the conversation text is processed by a
            third-party AI (language-model) provider. You choose when to use these
            features and when to record.
          </p>
        </Section>

        <Section title="6. Data Retention">
          <p>
            We retain your information for as long as your account is active or as
            needed to provide the Services. When you delete your account, we remove
            your associated records from our active systems as described below.
            Some information may persist for a limited period in backups or where
            retention is required by law.
          </p>
        </Section>

        <Section title="7. Your Rights & Choices">
          <p>
            Depending on where you live, you may have rights to access, correct,
            export, or delete your personal information, and to object to or
            restrict certain processing. You can manage much of your profile and
            content directly in the app, and you can contact us to exercise any of
            these rights.
          </p>
        </Section>

        <Section title="8. Your Rights in the EEA & UK (GDPR)">
          <p>
            If you are in the European Economic Area or the United Kingdom, you
            have rights under the GDPR and UK GDPR, including the rights to access,
            correct, delete, restrict, or object to our processing of your personal
            data, and the right to data portability.
          </p>
          <p>
            Some of the information we handle — such as voice recordings and
            well-being data — is &ldquo;special category&rdquo; data. We process it
            to provide the features you choose to use and, where the law requires,
            on the basis of your consent, which you can withdraw at any time. For
            international transfers (for example, to providers based outside your
            region), we take steps designed to keep your data protected.
          </p>
          <p>
            Speechworks is <strong className="text-gray-700">designed to align
            with the principles of the GDPR</strong> — data minimization, purpose
            limitation, security, and transparency. To exercise any of your rights,
            contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#D9692E] underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            . You also have the right to lodge a complaint with your local data
            protection authority.
          </p>
        </Section>

        <Section title="9. Account & Data Deletion">
          <p>
            You can request deletion of your account at any time from within the
            app or by emailing us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#D9692E] underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            . When you delete your account, we delete your profile and associated
            practice, assessment, mood, recording, and buddy records from our
            databases. We will action verified requests within a reasonable
            timeframe, subject to limited retention required by law or held
            temporarily in backups.
          </p>
        </Section>

        <Section title="10. Data Security">
          <p>
            We use reasonable technical and organizational safeguards to protect
            your information. Data is transmitted over encrypted connections
            (HTTPS/TLS), and authentication tokens are kept in your device&rsquo;s
            secure storage. No method of transmission or storage is completely
            secure, so we cannot guarantee absolute security.
          </p>
        </Section>

        <Section title="11. International Data Transfers">
          <p>
            We and our service providers may process and store your information in
            countries other than your own, including the United States, the
            European Union, and India. Where we transfer personal data
            internationally, we take steps designed to keep it protected in
            accordance with this policy and applicable law.
          </p>
        </Section>

        <Section title="12. Children's Privacy">
          <p>
            The Services are intended for users aged 13 and older (or the minimum
            age required in your jurisdiction). We do not knowingly collect
            personal information from children under that age. If you believe a
            child has provided us with personal information, please contact us so
            we can take appropriate action.
          </p>
        </Section>

        <Section title="13. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. When we do, we
            will revise the &ldquo;Last updated&rdquo; date above and, where
            appropriate, provide additional notice. Your continued use of the
            Services after changes take effect constitutes acceptance of the
            updated policy.
          </p>
        </Section>

        <Section title="14. Contact Us">
          <p>
            If you have questions or requests regarding this Privacy Policy or your
            data, contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#D9692E] underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <div className="mt-16 flex flex-col items-center gap-5 border-t border-[#F28044]/15 pt-12">
          <p className="text-sm font-medium text-gray-400">
            Questions? Reach us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#D9692E] underline-offset-2 hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-white/40 bg-gradient-to-br from-[#FF955E] to-[#D9692E] px-8 py-3.5 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_15px_35px_-8px_rgba(242,128,68,0.5)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-8px_rgba(242,128,68,0.65)]"
          >
            Back to home
          </Link>
        </div>
      </article>

      <Footer />
    </main>
  );
}
