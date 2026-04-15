"use client";

import React, { useEffect, useRef, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_SUCCESS_MESSAGE =
  "You're in. We'll reach out when there's something worth opening.";
const GOOGLE_FORM_TARGET = "launch-updates-google-form";
const GOOGLE_FORM_ACTION_URL =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_ACTION_URL || "";
const GOOGLE_FORM_EMAIL_ENTRY_ID =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_EMAIL_ENTRY_ID || "";
const GOOGLE_FORM_SOURCE_ENTRY_ID =
  process.env.NEXT_PUBLIC_GOOGLE_FORM_SOURCE_ENTRY_ID || "";
const PANEL_SIGNALS = ["launch drops", "product notes", "early access"];

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function LaunchUpdates() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [signalIndex, setSignalIndex] = useState(0);
  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const hiddenEmailInputRef = useRef<HTMLInputElement>(null);
  const hiddenSourceInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = window.setInterval(() => {
      setSignalIndex((current) => (current + 1) % PANEL_SIGNALS.length);
    }, 2400);

    return () => window.clearInterval(interval);
  }, []);

  const resetFormState = () => {
    setSubmitState("idle");
    setFeedback("");
    setEmail("");
    setCompany("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_REGEX.test(normalizedEmail)) {
      setSubmitState("error");
      setFeedback(
        "Enter a valid email so we know where to send the good stuff."
      );
      return;
    }

    setSubmitState("submitting");
    setFeedback("");

    if (!GOOGLE_FORM_ACTION_URL || !GOOGLE_FORM_EMAIL_ENTRY_ID) {
      setSubmitState("error");
      setFeedback(
        "Launch updates signup is not configured yet. Add the Google Form values before publishing."
      );
      return;
    }

    if (company.trim()) {
      setSubmitState("success");
      setFeedback(DEFAULT_SUCCESS_MESSAGE);
      setEmail("");
      setCompany("");
      return;
    }

    if (!hiddenFormRef.current || !hiddenEmailInputRef.current) {
      setSubmitState("error");
      setFeedback("We couldn't save your email just now. Please try again.");
      return;
    }

    hiddenEmailInputRef.current.value = normalizedEmail;

    if (hiddenSourceInputRef.current && GOOGLE_FORM_SOURCE_ENTRY_ID) {
      hiddenSourceInputRef.current.value = "landing_page";
    }

    hiddenFormRef.current.submit();

    setSubmitState("success");
    setFeedback(DEFAULT_SUCCESS_MESSAGE);
    setEmail("");
    setCompany("");
  };

  const isSubmitting = submitState === "submitting";
  const isSuccess = submitState === "success";

  return (
    <section
      id="updates"
      className="relative z-10 border-y border-orange-900/10 bg-brand-50 py-16 sm:py-20"
    >
      <iframe
        name={GOOGLE_FORM_TARGET}
        title="Launch updates submission target"
        className="hidden"
      />
      <form
        ref={hiddenFormRef}
        action={GOOGLE_FORM_ACTION_URL}
        method="POST"
        target={GOOGLE_FORM_TARGET}
        className="hidden"
      >
        <input
          ref={hiddenEmailInputRef}
          type="email"
          name={GOOGLE_FORM_EMAIL_ENTRY_ID}
          defaultValue=""
        />
        {GOOGLE_FORM_SOURCE_ENTRY_ID ? (
          <input
            ref={hiddenSourceInputRef}
            type="hidden"
            name={GOOGLE_FORM_SOURCE_ENTRY_ID}
            defaultValue=""
          />
        ) : null}
      </form>

      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .launch-updates-card::before {
              content: "";
              position: absolute;
              inset: 0;
              background:
                radial-gradient(circle at 0% 0%, rgba(242, 128, 68, 0.16), transparent 28%),
                radial-gradient(circle at 100% 100%, rgba(255, 255, 255, 0.05), transparent 22%);
              pointer-events: none;
            }

            .launch-updates-form::before {
              content: "";
              position: absolute;
              inset: 0;
              background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.025));
              border-radius: inherit;
              pointer-events: none;
            }

            .signal-word {
              display: inline-block;
              animation: signal-rise 320ms cubic-bezier(0.22, 1, 0.36, 1);
            }

            .signal-dot {
              animation: soft-pulse 1.8s ease-in-out infinite;
            }

            .launch-cta {
              position: relative;
              overflow: hidden;
              isolation: isolate;
            }

            .launch-cta::after {
              content: "";
              position: absolute;
              inset: 0;
              background: linear-gradient(115deg, transparent 24%, rgba(255,255,255,0.24) 48%, transparent 72%);
              transform: translateX(-130%);
              transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
              pointer-events: none;
            }

            .launch-cta:hover::after {
              transform: translateX(130%);
            }

            @keyframes signal-rise {
              from {
                opacity: 0;
                transform: translateY(8px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes soft-pulse {
              0%, 100% {
                transform: scale(1);
                opacity: 0.82;
              }
              50% {
                transform: scale(1.14);
                opacity: 1;
              }
            }
          `,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <div className="launch-updates-card relative overflow-hidden rounded-[2rem] border border-orange-900/10 bg-[linear-gradient(145deg,#43362f_0%,#342925_58%,#2a221f_100%)] text-white shadow-[0_34px_90px_-40px_rgba(63,51,45,0.72)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:36px_36px] opacity-[0.16]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />

          <div className="relative grid gap-10 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.9fr)] lg:items-center lg:gap-12 lg:px-10 lg:py-12">
            <div className="max-w-[36rem]">
              <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.22em] text-white/46">
                <span className="h-px w-10 bg-brand/70" />
                Quiet updates
              </div>

              <h2 className="mt-5 max-w-[11ch] text-[3rem] font-black leading-[0.9] tracking-tight text-white sm:text-[4.5rem]">
                Get launch updates
              </h2>

              <p className="mt-5 max-w-[32ch] text-[15px] leading-7 text-[#f3e4d9]/88 sm:text-[17px] sm:leading-8">
                Not ready to talk yet? Drop your email and we&apos;ll send the
                meaningful updates, launch drops, and early-access news.
              </p>

              <div className="relative mt-7 inline-flex max-w-full items-center gap-3 overflow-hidden whitespace-nowrap rounded-full border border-white/10 bg-white/[0.05] px-4 py-3 text-[9px] font-black uppercase tracking-[0.18em] text-brand-100/82 shadow-[0_0_46px_-30px_rgba(242,128,68,0.55)] sm:text-[10px]">
                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-[radial-gradient(circle_at_18%_50%,rgba(242,128,68,0.3),transparent_65%)]" />
                <span className="signal-dot relative h-3 w-3 shrink-0 rounded-full bg-brand" />
                <span className="relative shrink-0 text-brand-100/56">
                  Now watching for
                </span>
                <span
                  key={PANEL_SIGNALS[signalIndex]}
                  className="signal-word relative shrink-0 text-white"
                >
                  {PANEL_SIGNALS[signalIndex]}
                </span>
              </div>
            </div>

            <div className="launch-updates-form relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_24px_46px_-28px_rgba(0,0,0,0.38)] backdrop-blur-[3px] sm:p-6">
              <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand/70 to-transparent" />
              {isSuccess ? (
                <div className="relative space-y-5" aria-live="polite">
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/56">
                      Captured
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f4e8df]/78">
                      Quiet channel
                    </div>
                  </div>

                  <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-5">
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-100/70">
                      You&apos;re in
                    </div>
                    <p className="mt-3 max-w-[24ch] text-[15px] leading-7 text-[#f2e1d6]/88">
                      {feedback || DEFAULT_SUCCESS_MESSAGE}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] leading-6 text-white/54">
                    <span className="signal-dot h-2.5 w-2.5 rounded-full bg-brand" />
                    We&apos;ll only show up when there&apos;s something worth
                    opening.
                  </div>

                  <button
                    type="button"
                    onClick={resetFormState}
                    className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#f5e8df]/78 transition-colors duration-300 hover:bg-white/[0.09] hover:text-white"
                  >
                    Add another email
                  </button>
                </div>
              ) : (
                <form className="relative space-y-5" onSubmit={handleSubmit}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/56">
                        Stay in the loop
                      </div>
                      <p className="mt-3 max-w-[26ch] text-[14px] leading-6 text-[#f3e4d9]/78">
                        Thoughtful product notes. Nothing noisy.
                      </p>
                    </div>
                    <div className="hidden rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white/60 sm:block">
                      Email only
                    </div>
                  </div>

                  <div className="rounded-[1.4rem] border border-white/10 bg-[#574840]/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
                    <label className="block">
                      <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.16em] text-white/58">
                        Email
                      </span>
                      <input
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        disabled={isSubmitting}
                        className="w-full bg-transparent text-[1.03rem] text-white outline-none transition-colors duration-300 placeholder:text-brand-100/44 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </label>
                  </div>

                  <label className="hidden" aria-hidden="true">
                    <span>Company</span>
                    <input
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                    />
                  </label>

                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="launch-cta inline-flex min-h-[58px] w-full items-center justify-between rounded-full bg-brand px-6 py-3 text-[10.5px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_18px_32px_-18px_rgba(242,128,68,0.58)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      <span>
                        {isSubmitting ? "Joining..." : "Keep me posted"}
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/16 bg-white/12 text-[1rem]">
                        ↗
                      </span>
                    </button>

                    <div className="flex items-center justify-between gap-4 border-t border-white/8 pt-3 text-[11px] leading-5 text-white/54">
                      <span>No spam. No pressure.</span>
                      <span className="text-white/38">Worth opening.</span>
                    </div>
                  </div>

                  <div aria-live="polite">
                    {submitState === "error" && feedback ? (
                      <p className="text-[12px] font-semibold text-[#ffb08a]">
                        {feedback}
                      </p>
                    ) : null}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
