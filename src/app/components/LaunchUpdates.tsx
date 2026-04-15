"use client";

import React, { useRef, useState } from "react";

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

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function LaunchUpdates() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const hiddenEmailInputRef = useRef<HTMLInputElement>(null);
  const hiddenSourceInputRef = useRef<HTMLInputElement>(null);

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

      <div className="relative mx-auto max-w-6xl px-6 lg:px-12">
        <div className="relative overflow-hidden rounded-3xl border border-orange-900/10 bg-app-text text-white shadow-xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(242,128,68,0.24),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          <div className="relative grid gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-2 lg:items-center lg:gap-10 lg:px-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-brand-100">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
                </span>
                Low-pressure option
              </div>

              <h2 className="mt-4 max-w-[12ch] text-4xl font-black leading-[0.92] tracking-tighter text-white sm:text-5xl">
                Get launch updates
              </h2>

              <p className="mt-4 max-w-[42ch] text-[15px] leading-7 text-brand-100 sm:text-base">
                Leave your email and we&apos;ll send launch drops and
                early-access news.
              </p>

              <div className="mt-6 hidden flex-wrap gap-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-100 sm:flex">
                <span className="rounded-full border border-white/10 bg-white/8 px-3.5 py-2">
                  Launch drops
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3.5 py-2">
                  Product notes
                </span>
                <span className="rounded-full border border-white/10 bg-white/8 px-3.5 py-2">
                  Early-access news
                </span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/6 p-4 sm:p-5">
              {isSuccess ? (
                <div
                  className="rounded-2xl border border-brand/25 bg-brand/10 px-4 py-5"
                  aria-live="polite"
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-brand-100">
                    You&apos;re in
                  </div>
                  <p className="mt-2 text-[14px] leading-6 text-brand-100">
                    {feedback || DEFAULT_SUCCESS_MESSAGE}
                  </p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/65">
                      Stay in the loop
                    </div>
                    <p className="mt-2 max-w-[30ch] text-[13px] leading-6 text-brand-100">
                      Just the important updates.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block">
                      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-white/65">
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
                        className="w-full rounded-full border border-white/10 bg-white/10 px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-brand-100/60 focus:border-brand focus:bg-white/14 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </label>

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

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex min-h-[50px] w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-[10.5px] font-black uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      {isSubmitting ? "Joining..." : "Keep me posted"}
                    </button>
                  </div>

                  <div aria-live="polite">
                    {submitState === "error" && feedback ? (
                      <p className="text-[12px] font-semibold text-brand-100">
                        {feedback}
                      </p>
                    ) : null}
                  </div>

                  <p className="text-[11px] leading-5 text-white/55">
                    No spam. No pressure. Just the updates worth opening.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
