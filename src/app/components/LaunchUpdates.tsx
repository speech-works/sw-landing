"use client";

import React, { useEffect, useRef, useState } from "react";
import { withBasePath } from "@/app/lib/withBasePath";
import { useIsMobileViewport } from "./useIsMobileViewport";

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
const BUBBLE_AVATARS = [
  {
    name: "Mayank",
    src: "/assets/mayank_avatar_animated.gif",
    objectPosition: "78% center",
  },
  {
    name: "Sanae",
    src: "/assets/Sanae_avatar_animated.gif",
    objectPosition: "50% center",
  },
];

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function LaunchUpdates() {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isBubbleReady, setIsBubbleReady] = useState(false);
  const [avatarIndex, setAvatarIndex] = useState(0);
  const isMobileViewport = useIsMobileViewport();
  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const hiddenEmailInputRef = useRef<HTMLInputElement>(null);
  const hiddenSourceInputRef = useRef<HTMLInputElement>(null);
  const visibleEmailInputRef = useRef<HTMLInputElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setIsHydrated(true);

    const bubbleTimer = window.setTimeout(() => {
      setIsBubbleReady(true);
    }, 180);

    return () => {
      window.clearTimeout(bubbleTimer);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches || isHidden || isMobileViewport) return;

    const interval = window.setInterval(() => {
      setAvatarIndex((current) => (current + 1) % BUBBLE_AVATARS.length);
    }, 5600);

    return () => window.clearInterval(interval);
  }, [isHidden, isMobileViewport]);

  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => {
      visibleEmailInputRef.current?.focus();
    }, 180);

    const handlePointerDown = (event: PointerEvent) => {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setSubmitState((current) => (current === "error" ? "idle" : current));
        setFeedback("");
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSubmitState((current) => (current === "error" ? "idle" : current));
        setFeedback("");
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (submitState !== "success") return;

    const hideTimer = window.setTimeout(() => {
      setIsOpen(false);
      setIsHidden(true);
    }, 1500);

    return () => window.clearTimeout(hideTimer);
  }, [submitState]);

  const handleOpen = () => {
    setSubmitState((current) => (current === "error" ? "idle" : current));
    setFeedback("");
    setIsOpen(true);
  };

  const handleClose = () => {
    setSubmitState((current) => (current === "error" ? "idle" : current));
    setFeedback("");
    setIsOpen(false);
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

  if (!isHydrated || isHidden) {
    return <div id="updates" className="sr-only" aria-hidden="true" />;
  }

  const isSubmitting = submitState === "submitting";
  const isSuccess = submitState === "success";
  return (
    <>
      <div id="updates" className="sr-only" aria-hidden="true" />
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

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .launch-widget-bubble::before {
              content: "";
              position: absolute;
              inset: 0;
              background:
                radial-gradient(circle at 18% 28%, rgba(242, 128, 68, 0.24), transparent 34%),
                linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02));
              border-radius: inherit;
              pointer-events: none;
            }

            .launch-widget-bubble::after {
              content: "";
              position: absolute;
              left: 3.1rem;
              bottom: -0.38rem;
              width: 0.95rem;
              height: 0.95rem;
              background: #3b302a;
              border-right: 1px solid rgba(255,255,255,0.08);
              border-bottom: 1px solid rgba(255,255,255,0.08);
              border-radius: 0 0 0.32rem 0;
              transform: rotate(34deg);
              pointer-events: none;
            }

            .launch-widget-avatar-wrap {
              animation: launch-avatar-float 3.8s ease-in-out infinite;
              will-change: transform;
            }

            .launch-widget-avatar-layer {
              position: absolute;
              inset: 0;
              opacity: 0;
              transform: translateX(8%) scale(1.06);
              transform-origin: center;
              transition:
                opacity 560ms cubic-bezier(0.22, 1, 0.36, 1),
                transform 560ms cubic-bezier(0.22, 1, 0.36, 1),
                filter 560ms cubic-bezier(0.22, 1, 0.36, 1);
              filter: saturate(0.9) brightness(0.96);
              will-change: opacity, transform, filter;
            }

            .launch-widget-avatar-layer[data-active="true"] {
              opacity: 1;
              transform: translateX(0) scale(1);
              filter: saturate(1) brightness(1);
            }

            .launch-widget-panel::before {
              content: "";
              position: absolute;
              inset: 0;
              background:
                radial-gradient(circle at 0% 0%, rgba(242, 128, 68, 0.18), transparent 28%),
                linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.015));
              border-radius: inherit;
              pointer-events: none;
            }

            .launch-widget-cta {
              position: relative;
              overflow: hidden;
              isolation: isolate;
            }

            .launch-widget-cta::after {
              content: "";
              position: absolute;
              inset: 0;
              background: linear-gradient(115deg, transparent 24%, rgba(255,255,255,0.24) 48%, transparent 72%);
              transform: translateX(-130%);
              transition: transform 0.72s cubic-bezier(0.22, 1, 0.36, 1);
              pointer-events: none;
            }

            .launch-widget-cta:hover::after {
              transform: translateX(130%);
            }

            @keyframes launch-avatar-float {
              0%, 100% {
                transform: translateY(0px) rotate(0deg);
              }
              50% {
                transform: translateY(-2px) rotate(-2deg);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .launch-widget-avatar-wrap {
                animation: none;
              }

              .launch-widget-avatar-layer {
                transition: none;
              }
            }
          `,
        }}
      />

      <div className="pointer-events-none fixed inset-0 z-[90]">
        <button
          type="button"
          aria-hidden={!isOpen}
          onClick={handleClose}
          className={`mobile-fixed-glass absolute inset-0 ${
            isMobileViewport ? "" : "transition-opacity duration-300 "
          }${
            isOpen
              ? "pointer-events-auto bg-[#110c09]/26 backdrop-blur-[2px] sm:bg-transparent sm:backdrop-blur-0"
              : "pointer-events-none opacity-0"
          }`}
          tabIndex={isOpen ? 0 : -1}
        />

        <div ref={widgetRef} className="absolute inset-0">
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="launch-updates-dialog"
            onClick={handleOpen}
            className={`launch-widget-bubble mobile-fixed-glass pointer-events-auto absolute bottom-4 right-4 overflow-hidden border border-white/10 bg-[#3b302a]/92 text-left text-white shadow-[0_24px_60px_-30px_rgba(18,12,9,0.68)] backdrop-blur-xl ${
              isMobileViewport
                ? ""
                : "transition-[transform,opacity,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:shadow-[0_28px_72px_-30px_rgba(18,12,9,0.78)] "
            }${
              isMobileViewport
                ? "rounded-[1.5rem]"
                : "right-0 rounded-[1.8rem] rounded-r-[1.05rem]"
            } ${
              isMobileViewport
                ? isOpen
                  ? "pointer-events-none opacity-0"
                  : isBubbleReady
                    ? "opacity-100"
                    : "opacity-0"
                : isOpen
                  ? "pointer-events-none translate-y-4 opacity-0 sm:translate-x-10 sm:translate-y-0"
                  : isBubbleReady
                    ? "translate-y-0 opacity-100 sm:translate-x-0"
                    : "translate-y-6 opacity-0 sm:translate-x-8 sm:translate-y-0"
            }`}
          >
            <div className="relative flex items-center gap-3.5 px-4 py-3 sm:px-4 sm:py-3.5">
              <div
                className={`${isMobileViewport ? "" : "launch-widget-avatar-wrap"} relative h-10 w-10 shrink-0 rounded-[1.25rem] rounded-bl-[0.55rem] border border-white/12 bg-[linear-gradient(180deg,#f58e54_0%,#eb7a3f_100%)] p-[2px] shadow-[0_12px_24px_-12px_rgba(242,128,68,0.75)]`}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[1.12rem] rounded-bl-[0.45rem] bg-[#2f241f]">
                  {BUBBLE_AVATARS.map((avatar, index) => (
                    <div
                      key={avatar.src}
                      className="launch-widget-avatar-layer"
                      data-active={avatarIndex === index}
                      aria-hidden={avatarIndex !== index}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={withBasePath(avatar.src)}
                        alt=""
                        className="h-full w-full object-cover"
                        style={{ objectPosition: avatar.objectPosition }}
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[9px] font-black uppercase tracking-[0.18em] text-white/48">
                  Chat later
                </div>
                <div className="mt-1 text-[13px] font-semibold leading-none text-white sm:text-[14px]">
                  Get launch updates
                </div>
              </div>
              <div className="ml-auto hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:flex">
                <span className="h-2.5 w-2.5 rounded-full bg-brand" />
              </div>
            </div>
          </button>

          <div
            id="launch-updates-dialog"
            role="dialog"
            aria-modal={isMobileViewport}
            aria-label="Get launch updates"
            className={`launch-widget-panel mobile-fixed-glass pointer-events-auto absolute overflow-hidden border border-white/10 bg-[#221916]/92 text-white shadow-[0_40px_90px_-36px_rgba(18,12,9,0.84)] backdrop-blur-2xl ${
              isMobileViewport
                ? ""
                : "transition-[transform,opacity,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] "
            }${
              isMobileViewport
                ? "bottom-4 left-4 right-4 rounded-[1.75rem]"
                : "bottom-8 right-0 w-[392px] rounded-[1.9rem] rounded-r-none border-r-0"
            } ${
              isMobileViewport
                ? isOpen
                  ? "translate-y-0 opacity-100 blur-0"
                  : "pointer-events-none opacity-0"
                : isOpen
                  ? "translate-y-0 opacity-100 blur-0 sm:translate-x-0"
                  : "pointer-events-none translate-y-6 opacity-0 blur-[2px] sm:translate-x-12 sm:translate-y-0"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:26px_26px] opacity-[0.14]" />
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-brand/75 to-transparent" />

            <div className="relative p-5 sm:p-6">
              {isSuccess ? (
                <div className="space-y-4" aria-live="polite">
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/54">
                    You&apos;re in
                  </div>
                  <h3 className="text-[2rem] font-black leading-[0.92] tracking-tight text-white">
                    Thanks.
                  </h3>
                  <p className="max-w-[26ch] text-[15px] leading-7 text-[#f2e1d6]/84">
                    {feedback || DEFAULT_SUCCESS_MESSAGE}
                  </p>
                  <p className="text-[12px] leading-6 text-white/48">
                    This bubble will disappear now so we stay out of your way.
                  </p>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-[0.18em] text-white/52">
                        Stay in the loop
                      </div>
                      <h3 className="mt-3 max-w-[12ch] text-[2rem] font-black leading-[0.94] tracking-tight text-white">
                        Want updates without a call?
                      </h3>
                      <p className="mt-3 max-w-[28ch] text-[14px] leading-6 text-[#f2e1d6]/76">
                        Drop your email. We&apos;ll show up when there&apos;s
                        real movement, not random noise.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleClose}
                      className={`group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/58 shadow-lg ${
                        isMobileViewport
                          ? ""
                          : "transition-all duration-300 hover:scale-110 hover:border-[#ffb28a]/25 hover:bg-white/[0.08] hover:text-white"
                      }`}
                      aria-label="Close launch updates dialog"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`h-4 w-4 ${
                          isMobileViewport
                            ? ""
                            : "transition-all duration-300 group-hover:rotate-90 group-hover:scale-110"
                        }`}
                      >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </button>
                  </div>

                  <label className="block">
                    <span className="mb-3 block text-[10px] font-black uppercase tracking-[0.16em] text-white/56">
                      Email
                    </span>
                    <div className={`rounded-[1.35rem] border border-white/10 bg-[#5a4a42]/60 px-4 py-3.5 ${
                      isMobileViewport
                        ? ""
                        : "transition-all duration-300 focus-within:border-brand/55 focus-within:bg-[#625047]/72 focus-within:shadow-[0_16px_36px_-24px_rgba(242,128,68,0.55)]"
                    }`}>
                      <input
                        ref={visibleEmailInputRef}
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        disabled={isSubmitting}
                        className="w-full bg-transparent text-[1.02rem] text-white outline-none placeholder:text-brand-100/42 disabled:cursor-not-allowed disabled:opacity-60"
                      />
                    </div>
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
                    className={`launch-widget-cta inline-flex min-h-[58px] w-full items-center justify-between rounded-full bg-brand px-5 py-3 text-[10.5px] font-black uppercase tracking-[0.18em] text-white ${
                      isMobileViewport
                        ? "disabled:cursor-not-allowed disabled:opacity-80"
                        : "transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_18px_32px_-18px_rgba(242,128,68,0.58)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-80"
                    }`}
                  >
                    <span>{isSubmitting ? "Joining..." : "Keep me posted"}</span>
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/16 bg-white/12 text-[1rem]">
                      ↗
                    </span>
                  </button>

                  <div aria-live="polite" className="min-h-[18px]">
                    {submitState === "error" && feedback ? (
                      <p className="text-[12px] font-semibold text-[#ffb08a]">
                        {feedback}
                      </p>
                    ) : null}
                  </div>

                  <p className="border-t border-white/8 pt-3 text-[11px] leading-5 text-white/50">
                    No spam. We never share your data, and we only use your
                    email for Speechworks updates.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
