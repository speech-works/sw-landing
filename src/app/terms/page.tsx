/*
 * Terms of Use. Live since 2026-09-27 (founder sign-off, no lawyer review).
 * Founder decisions: Indian law and courts; the app keeps Apple's standard
 * EULA and these terms add to it; 30-day shutdown notice; minimum age 13;
 * contracting party Speechworks Private Limited; grievance contact
 * mayank@speechworks.app (Indian IT Rules). No registered address on purpose.
 */
import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SectionEdge from "@/app/components/SectionEdge";
import { socialMetadata } from "@/lib/site-metadata";

// NOTE: Update this whenever the terms change.
const LAST_UPDATED = "September 27, 2026";
// Same address as the privacy policy.
const CONTACT_EMAIL = "contact@speechworks.app";
// Grievance contact required by India's IT Rules for apps with user-to-user features.
const GRIEVANCE_EMAIL = "mayank@speechworks.app";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms for using the Speechworks app: purchases, membership, refunds, and what Speechworks is and is not.",
  alternates: { canonical: "/terms/" },
  ...socialMetadata(
    "Terms of Use | Speechworks",
    "The terms for using the Speechworks app.",
    "/terms/",
  ),
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
          <span className="inline-flex h-7 min-w-[28px] items-center justify-center rounded-lg border-[1.5px] border-[var(--ink)] bg-[var(--cast-colour)] px-2 font-mono text-[11px] font-bold tracking-wider text-[var(--ink)]">
            {num.padStart(2, "0")}
          </span>
        )}
        <h2 className="text-[22px] md:text-[28px] font-bold text-[var(--ink)] tracking-tight">
          {heading}
        </h2>
      </div>
      <div className="mt-4 space-y-4 text-[16px] md:text-[17px] leading-relaxed text-[var(--ink-muted)]">
        {children}
      </div>
    </section>
  );
}

function Mail() {
  return (
    <a href={`mailto:${CONTACT_EMAIL}`} className="legal-link">
      {CONTACT_EMAIL}
    </a>
  );
}

export default function TermsOfUsePage() {
  return (
    <div className="site-shell">
      <Navbar />
      <div className="page-hero">
        <header className="legal-intro section-wrap" data-reveal>
          <p className="section-kicker">Terms</p>
          <h1>Terms of Use</h1>
          <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
        </header>
      </div>
      <SectionEdge kind="hero" />
      <main id="main-content">
        <article className="legal-page">
          <div className="mt-8 space-y-4 text-[16px] md:text-[17px] leading-relaxed text-[var(--ink-muted)]">
            <p>
              These Terms of Use (the &ldquo;Terms&rdquo;) are an agreement
              between you and Speechworks Private Limited
              (&ldquo;Speechworks,&rdquo;
              &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). They
              cover the Speechworks mobile app and related services (the
              &ldquo;Services&rdquo;). They add to Apple&rsquo;s standard
              licence agreement (EULA) if you use the app from the App Store, or
              to Google Play&rsquo;s terms if you use it from Google Play. Those
              store terms also apply to your purchases. By creating an account
              or using the Services, you agree to these Terms. If you do not
              agree, please do not use the Services.
            </p>
            <p>
              Our{" "}
              <Link href="/privacy/" className="legal-link">
                Privacy Policy
              </Link>{" "}
              explains how we handle your information, including voice
              recordings and well-being data.
            </p>
          </div>

          {/* The part people most need to read, before anything else. */}
          <div className="mt-10 legal-card">
            <h2 className="flex items-center gap-2.5 text-[20px] md:text-[24px] font-bold tracking-tight text-[var(--ink)]">
              <span className="h-5 w-1.5 rounded-full bg-[var(--ink)]" />
              What Speechworks is, and what it is not
            </h2>
            <div className="mt-4 space-y-4 text-[15px] md:text-[16px] leading-relaxed text-[var(--ink-muted)]">
              <p>
                <strong className="text-[var(--ink)]">
                  Speechworks is a self-help practice app
                </strong>{" "}
                for adults who stutter. It is not therapy, and it does not
                diagnose, treat, or cure stuttering or any other condition. It
                does not replace a speech and language therapist, a doctor, or a
                mental health professional. If you have concerns about your
                speech or your health, please see a qualified professional.
              </p>
              <p>
                <strong className="text-[var(--ink)]">
                  Speechworks is not for emergencies.
                </strong>{" "}
                If you are in crisis or thinking about harming yourself, call
                your local emergency number now, or find a free helpline in your
                country at{" "}
                <a
                  href="https://findahelpline.com"
                  className="legal-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  findahelpline.com
                </a>
                . The app lists helplines for some countries, but it cannot call
                for help on your behalf.
              </p>
            </div>
          </div>

          <Section title="1. Who Can Use Speechworks">
            <p>
              You must be at least 13 years old, or the minimum age required
              where you live, to use the Services. If you are under 18, or under
              the age of majority where you live, you need a parent or guardian
              to agree to these Terms and to approve any purchase.
            </p>
          </Section>

          <Section title="2. Your Account">
            <p>
              You sign in with Google, Apple, or Facebook. You are responsible
              for keeping access to that sign-in secure and for what happens
              under your account. Tell us at <Mail /> if you think someone else
              has used it.
            </p>
            <p>
              You can delete your account at any time from within the app
              (Settings, then Delete Account). The{" "}
              <Link href="/account/delete" className="legal-link">
                account deletion page
              </Link>{" "}
              explains what is deleted.
            </p>
          </Section>

          <Section title="3. Programs You Buy">
            <p>
              Programs are one-time purchases. When you buy a program, you can
              use it for as long as Speechworks runs the Services. There is no
              further charge for a program you have bought, and it is not taken
              away if you stop a membership.
            </p>
            <p>
              Purchases are made through the Apple App Store or Google Play and
              are charged to your store account. The price you pay is the one
              the store shows at checkout. Your purchase is linked to your
              Speechworks account, and you can restore it on a new device by
              signing in to the same account.
            </p>
          </Section>

          <Section title="4. If a Program Is Retired or the Service Ends">
            <p>
              <strong className="text-[var(--ink)]">Retired programs.</strong>{" "}
              We may stop selling a program. If you bought it before then, you
              keep access to it for as long as the Services run. We may correct
              or update a program&rsquo;s content, but we will not take away a
              program you have bought.
            </p>
            <p>
              <strong className="text-[var(--ink)]">If the Services end.</strong>{" "}
              If we decide to shut down the Services, we will tell you in the
              app and by email at least 30 days before they close. After that
              date, programs, credits, and memberships can no longer be used.
              We will stop renewing memberships before the closing date, so you
              are not charged for a period the Services will not cover. Refunds
              follow the rules of the store you paid through (see section 6).
            </p>
          </Section>

          <Section title="5. Membership and AI Call Credits">
            <p>
              <strong className="text-[var(--ink)]">Membership</strong> is an
              auto-renewing subscription, billed monthly or yearly through the
              Apple App Store or Google Play. It renews automatically at the end
              of each period, at the price the store showed you, unless you
              cancel at least 24 hours before the period ends. You can cancel at
              any time in your App Store or Google Play subscription settings.
              Deleting the app or your Speechworks account does not cancel a
              subscription. When you cancel, membership stays active until the
              end of the period you have paid for.
            </p>
            <p>
              If a free month of membership comes with your first program
              purchase, it ends on its own at the end of that month. It does not
              renew and you are not charged for it.
            </p>
            <p>
              <strong className="text-[var(--ink)]">AI call credits</strong> are
              used up when you take an AI practice call. They have no cash value
              and cannot be transferred.
            </p>
            <p>We plan to add more benefits for members over time.</p>
          </Section>

          <Section title="6. Refunds">
            <p>
              Because every purchase goes through Apple or Google, refunds
              follow the rules of the store you paid through, and the store
              decides each request. You can ask Apple for a refund at{" "}
              <a
                href="https://reportaproblem.apple.com"
                className="legal-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                reportaproblem.apple.com
              </a>{" "}
              and Google through your Google Play order history. Nothing in
              these Terms limits any right to a refund you have under the
              consumer law where you live.
            </p>
          </Section>

          <Section title="7. AI Practice Calls">
            <p>
              Some practice uses AI. The voice you talk to in a practice call is
              generated by a computer. It is not a person. We use Speechworks
              guardrails to guide what it says, but AI output cannot be fully
              predicted, and it can say things that are wrong, odd, or
              unhelpful. Do not rely on it for advice about
              your health, money, legal matters, or safety. If something it says
              worries you, please tell us at <Mail />. We will look into it.
            </p>
          </Section>

          <Section title="8. Buddies and Shared Content">
            <p>
              If you connect with a buddy, be kind. Do not use Speechworks to
              harass, threaten, or mislead anyone, to share anything unlawful,
              or to share another person&rsquo;s private information. We may
              remove content and suspend or close accounts that break these
              rules. You can block a buddy and report content from within the
              app.
            </p>
          </Section>

          <Section title="9. Your Content">
            <p>
              Your recordings, notes, and other content stay yours. You give us
              permission to store and process them only as needed to run the
              Services for you, as described in the Privacy Policy. We do not
              sell your content, and we do not use your voice or health-related
              information for advertising.
            </p>
          </Section>

          <Section title="10. Our Content">
            <p>
              The programs, exercises, text, audio, video, and design of
              Speechworks belong to us or to the people who licensed them to us.
              You may use them for your own personal practice. You may not copy,
              resell, or publish them, or try to extract the app&rsquo;s code or
              content.
            </p>
          </Section>

          <Section title="11. Acceptable Use">
            <ul className="list-disc space-y-2 pl-6">
              <li>Do not try to break, overload, or get around the security of the Services;</li>
              <li>Do not use automated tools to access the Services;</li>
              <li>Do not use another person&rsquo;s account; and</li>
              <li>Do not use the Services in a way that breaks the law.</li>
            </ul>
          </Section>

          <Section title="12. Disclaimers">
            <p>
              We work to keep Speechworks useful and available, but we provide
              the Services &ldquo;as is&rdquo; and cannot promise they will
              always be available or free of errors. We do not promise any
              particular result from using them, including any change in how you
              speak.
            </p>
          </Section>

          <Section title="13. Limitation of Liability">
            <p>
              To the extent the law allows, Speechworks is not liable for
              indirect or consequential loss arising from your use of the
              Services, and our total liability to you is limited to the amount
              you paid us in the 12 months before the claim. Nothing in these
              Terms limits liability that cannot be limited by law, including
              for death or personal injury caused by negligence, or your rights
              as a consumer where you live.
            </p>
          </Section>

          <Section title="14. Ending These Terms">
            <p>
              You can stop using the Services and delete your account at any
              time. We may suspend or close an account that seriously or
              repeatedly breaks these Terms. If we close your account for any
              other reason, we will tell you why where we are allowed to.
            </p>
          </Section>

          <Section title="15. Changes to These Terms">
            <p>
              We may update these Terms. When we do, we will change the
              &ldquo;Last updated&rdquo; date above, and for significant changes
              we will tell you in the app before they take effect. If you keep
              using the Services after that, the updated Terms apply.
            </p>
          </Section>

          <Section title="16. Governing Law">
            <p>
              These Terms are governed by the laws of India, and the courts of
              India have jurisdiction over any dispute about them. If you live
              outside India, this does not take away any protection you have
              under the consumer law of the country where you live.
            </p>
          </Section>

          <Section title="17. Contact Us">
            <p>
              Questions about these Terms? Contact us at <Mail />.
            </p>
            <p>
              <strong className="text-[var(--ink)]">Grievance contact.</strong>{" "}
              If you have a complaint about the Services or about content
              shared in them, write to our grievance contact at{" "}
              <a href={`mailto:${GRIEVANCE_EMAIL}`} className="legal-link">
                {GRIEVANCE_EMAIL}
              </a>
              . We acknowledge complaints within 24 hours and aim to resolve
              them within 15 days.
            </p>
          </Section>

          <div className="mt-16 flex flex-col items-center gap-5 border-t border-[#14131126] pt-12">
            <p className="text-sm font-medium text-[var(--ink-muted)]">
              Questions? Reach us at <Mail />
            </p>
            <Link href="/" className="button button-ink pressable">
              Back to home
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
