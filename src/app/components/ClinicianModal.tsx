"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useIsMobileViewport } from "./useIsMobileViewport";

interface ClinicianModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ClinicianFormState = {
  name: string;
  email: string;
  setting: string;
  software: string;
  carryoverMin: number;
  carryoverMax: number;
};

type SubmitStatus = "idle" | "submitting" | "success";

const WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyhiVzI0eFI4vazHn1sm6i5HJSNuoJT-XIpxmtCSfAXYCBM5Fzn-BsRkDoMSY7jorj5pQ/exec";

const PRACTICE_SETTINGS = [
  "Solo Private Practice",
  "Group Clinic",
  "School System",
  "Hospital / Medical Center",
  "Other",
];

const INITIAL_FORM: ClinicianFormState = {
  name: "",
  email: "",
  setting: "",
  software: "",
  carryoverMin: 20,
  carryoverMax: 60,
};

export default function ClinicianModal({
  isOpen,
  onClose,
}: ClinicianModalProps) {
  const isMobileViewport = useIsMobileViewport();
  const [isRendered, setIsRendered] = useState(false);
  const [form, setForm] = useState<ClinicianFormState>(INITIAL_FORM);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const firstInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const physics = useRef({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 0.985,
    vX: 0,
    vY: 0,
    vRotateX: 0,
    vRotateY: 0,
    vScale: 0,
  });
  const targets = useRef({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  /* ── open / close lifecycle ── */
  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setAttemptedSubmit(false);
      setSubmitError(false);
      setStatus("idle");
      setForm(INITIAL_FORM);
      document.body.style.overflow = "hidden";
      physics.current = {
        x: 0,
        y: 18,
        rotateX: -4,
        rotateY: 0,
        scale: 0.975,
        vX: 0,
        vY: 0,
        vRotateX: 0,
        vRotateY: 0,
        vScale: 0,
      };
      targets.current = { x: 0, y: 0, rotateX: 0, rotateY: 0, scale: 1 };
    } else {
      document.body.style.overflow = "";
      if (isMobileViewport) {
        setIsRendered(false);
        if (modalRef.current) modalRef.current.style.transform = "";
        return;
      }
      const timeout = window.setTimeout(() => setIsRendered(false), 240);
      return () => window.clearTimeout(timeout);
    }
  }, [isMobileViewport, isOpen]);

  /* ── spring physics animation ── */
  useEffect(() => {
    const modalNode = modalRef.current;
    if (!isOpen) return;
    if (isMobileViewport) {
      if (modalNode) modalNode.style.transform = "none";
      return;
    }

    const tension = 0.09;
    const friction = 0.78;

    const animate = () => {
      const p = physics.current;
      const t = targets.current;

      p.vX += (t.x - p.x) * tension;
      p.vX *= friction;
      p.x += p.vX;

      p.vY += (t.y - p.y) * tension;
      p.vY *= friction;
      p.y += p.vY;

      p.vRotateX += (t.rotateX - p.rotateX) * tension;
      p.vRotateX *= friction;
      p.rotateX += p.vRotateX;

      p.vRotateY += (t.rotateY - p.rotateY) * tension;
      p.vRotateY *= friction;
      p.rotateY += p.vRotateY;

      p.vScale += (t.scale - p.scale) * tension;
      p.vScale *= friction;
      p.scale += p.vScale;

      if (modalRef.current) {
        modalRef.current.style.transform = `perspective(1400px) translate3d(${p.x}px, ${p.y}px, 0) scale3d(${p.scale}, ${p.scale}, ${p.scale}) rotateX(${p.rotateX}deg) rotateY(${p.rotateY}deg)`;
      }

      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
      if (modalNode) modalNode.style.transform = "";
    };
  }, [isMobileViewport, isOpen]);

  /* ── mouse tilt tracking ── */
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current || isMobileViewport) return;
    const rect = modalRef.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    const normalizedX = (offsetX - rect.width / 2) / (rect.width / 2);
    const normalizedY = (offsetY - rect.height / 2) / (rect.height / 2);
    targets.current.x = normalizedX * -8;
    targets.current.y = normalizedY * -6;
    targets.current.rotateX = normalizedY * -4;
    targets.current.rotateY = normalizedX * 7;
    targets.current.scale = 1.01;
  };

  const handleMouseLeave = () => {
    if (isMobileViewport) return;
    targets.current.x = 0;
    targets.current.y = 0;
    targets.current.rotateX = 0;
    targets.current.rotateY = 0;
    targets.current.scale = 1;
  };

  /* ── focus first input on open ── */
  useEffect(() => {
    if (!isOpen || status === "success") return;
    const timeout = window.setTimeout(
      () => firstInputRef.current?.focus(),
      isMobileViewport ? 0 : 220
    );
    return () => window.clearTimeout(timeout);
  }, [isMobileViewport, isOpen, status]);

  /* ── escape to close ── */
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  /* ── validation ── */
  const isValid = useMemo(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    return (
      form.name.trim().length > 1 &&
      emailOk &&
      form.setting !== ""
    );
  }, [form.email, form.name, form.setting]);

  /* ── field updaters ── */
  const updateField =
    (field: keyof Omit<ClinicianFormState, "carryoverMin" | "carryoverMax">) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm((cur) => ({ ...cur, [field]: e.target.value }));
      };

  const updateCarryoverMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = Number(e.target.value);
    if (!Number.isFinite(input)) return;
    setForm((cur) => {
      const currentMax = Number.isFinite(cur.carryoverMax) ? cur.carryoverMax : 60;
      return { ...cur, carryoverMin: Math.min(input, currentMax - 5) };
    });
  };

  const updateCarryoverMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = Number(e.target.value);
    if (!Number.isFinite(input)) return;
    setForm((cur) => {
      const currentMin = Number.isFinite(cur.carryoverMin) ? cur.carryoverMin : 20;
      return { ...cur, carryoverMax: Math.max(input, currentMin + 5) };
    });
  };

  /* ── submission ── */
  const handleSubmit = async () => {
    setAttemptedSubmit(true);
    setSubmitError(false);
    if (!isValid) return;

    setStatus("submitting");

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          setting: form.setting,
          software: form.software.trim() || "N/A",
          carryover: `${Number.isFinite(form.carryoverMin) ? form.carryoverMin : 20}% – ${Number.isFinite(form.carryoverMax) ? form.carryoverMax : 60}%`,
        }),
      });
      // no-cors responses are opaque — any non-throw = success
      setStatus("success");
    } catch {
      setStatus("idle");
      setSubmitError(true);
    }
  };

  if (!isOpen && !isRendered) return null;

  const getFadeUpStyle = (delay = 0) =>
    isMobileViewport
      ? undefined
      : {
        animation: `invite-fade-up 520ms cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
      };

  /* ── dual-range fill metrics (with safe fallbacks) ── */
  const carryoverMin = Number.isFinite(form.carryoverMin) ? form.carryoverMin : 20;
  const carryoverMax = Number.isFinite(form.carryoverMax) ? form.carryoverMax : 60;
  const fillLeft = carryoverMin;
  const fillRight = 100 - carryoverMax;

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center overflow-hidden p-3 sm:p-6 ${
        isMobileViewport ? "" : "transition-opacity duration-300 "
      }${isOpen ? "opacity-100" : "opacity-0"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="clinician-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#120c09]/74 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Modal card */}
      <div
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full max-w-[560px] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#110d0b] shadow-[0_40px_120px_rgba(0,0,0,0.48)] ${
          isMobileViewport ? "" : "transition-opacity duration-500 "
        }sm:rounded-[2rem] ${isOpen ? "opacity-100" : "opacity-0"}`}
        style={{ willChange: isMobileViewport ? "auto" : "transform" }}
      >
        {/* Keyframes + slider styles */}
        <style>{`
          @keyframes invite-fade-up {
            from { opacity: 0; transform: translateY(12px); }
            to   { opacity: 1; transform: translateY(0); }
          }

          /* Two-thumb range: both inputs stacked, tracks hidden, pointer-events on thumbs only */
          .cab-range {
            -webkit-appearance: none;
            appearance: none;
            position: absolute;
            width: 100%;
            height: 100%;
            background: transparent;
            pointer-events: none;
            outline: none;
            top: 0;
            left: 0;
            margin: 0;
          }
          .cab-range::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            pointer-events: all;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 0 3px rgba(242,128,68,0.55), 0 4px 14px rgba(0,0,0,0.45);
            cursor: grab;
            transition: box-shadow 0.18s, transform 0.14s;
            position: relative;
            z-index: 2;
          }
          .cab-range::-webkit-slider-thumb:active {
            cursor: grabbing;
            transform: scale(1.18);
            box-shadow: 0 0 0 5px rgba(242,128,68,0.38), 0 6px 18px rgba(0,0,0,0.5);
          }
          .cab-range::-moz-range-thumb {
            pointer-events: all;
            width: 22px;
            height: 22px;
            border: none;
            border-radius: 50%;
            background: #fff;
            box-shadow: 0 0 0 3px rgba(242,128,68,0.55), 0 4px 14px rgba(0,0,0,0.45);
            cursor: grab;
          }
          .cab-select {
            -webkit-appearance: none;
            appearance: none;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.3)' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 14px center;
          }
          .cab-select option {
            background: #1a130f;
            color: white;
          }
        `}</style>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(255,133,64,0.18),transparent_24%),radial-gradient(circle_at_88%_16%,rgba(255,211,180,0.08),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_26%,transparent_100%)]" />

        {/* Close button */}
        <button
          onClick={onClose}
          className={`absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 ${
            isMobileViewport
              ? ""
              : "transition-all duration-300 hover:scale-110 hover:rotate-90 hover:border-[#ffb28a]/25 hover:bg-white/10 hover:text-white "
          }sm:right-4 sm:top-4 sm:h-10 sm:w-10`}
          aria-label="Close modal"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        {/* ─────────── SUCCESS STATE ─────────── */}
        {status === "success" ? (
          <div className="relative z-10 p-8 sm:p-12 md:p-16 flex flex-col items-center text-center min-h-[380px] justify-center">
            {/* Checkmark icon */}
            <div
              className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner"
              style={getFadeUpStyle(0)}
            >
              <svg
                className="w-7 h-7 text-[#ff955e]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2
              className="text-2xl sm:text-[1.8rem] font-black text-white leading-tight mb-5 tracking-tight"
              style={getFadeUpStyle(60)}
            >
              Application Received.
            </h2>

            <p
              className="text-[14px] sm:text-[15px] text-white/55 leading-relaxed max-w-[340px]"
              style={getFadeUpStyle(120)}
            >
              Thank you for stepping up to shape the bridge. We will review
              your application and reach out via email shortly.
            </p>

            <button
              onClick={onClose}
              className="mt-10 px-8 py-3 rounded-full border border-white/10 bg-white/5 text-[11px] font-black uppercase tracking-widest text-white/60 hover:bg-white/10 hover:text-white transition-all duration-300"
              style={getFadeUpStyle(180)}
            >
              Close
            </button>
          </div>
        ) : (
          /* ─────────── FORM STATE ─────────── */
          <div className="relative z-10 p-5 sm:p-8 md:p-10 max-h-[calc(100dvh-1.25rem)] overflow-y-auto sm:max-h-[min(860px,calc(100dvh-3rem))]">
            {/* Header */}
            <div className="mb-6">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ffb28a] sm:text-[11px]">
                Founding Clinical Advisor
              </div>
              <h2
                id="clinician-modal-title"
                className="mt-2 text-[1.8rem] font-black leading-[0.95] tracking-[-0.05em] text-white sm:text-[2.2rem]"
                style={getFadeUpStyle(60)}
              >
                Shape the bridge.
              </h2>
              <p
                className="mt-3 text-[14px] leading-relaxed text-white/60 sm:text-[15px]"
                style={getFadeUpStyle(120)}
              >
                Join a select group of clinicians building the first clinical
                technology platform designed specifically for the carryover
                phase.
              </p>
            </div>

            {/* Form fields */}
            <div className="grid gap-4 sm:gap-5" style={getFadeUpStyle(220)}>

              {/* Name + Email */}
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                    Full Name
                  </span>
                  <input
                    ref={firstInputRef}
                    type="text"
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Your full name"
                    disabled={status === "submitting"}
                    className="w-full rounded-2xl border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#ff9d67] focus:bg-[#1d1511] disabled:opacity-40"
                  />
                  {attemptedSubmit && form.name.trim().length < 2 && (
                    <p className="mt-1.5 text-[11px] font-semibold text-[#ffb28a]">
                      Please enter your name.
                    </p>
                  )}
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                    Work Email
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={updateField("email")}
                    placeholder="you@practice.com"
                    disabled={status === "submitting"}
                    className="w-full rounded-2xl border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#ff9d67] focus:bg-[#1d1511] disabled:opacity-40"
                  />
                  {attemptedSubmit &&
                    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) && (
                      <p className="mt-1.5 text-[11px] font-semibold text-[#ffb28a]">
                        Please enter a valid email.
                      </p>
                    )}
                </label>
              </div>

              {/* Practice Setting dropdown */}
              <label className="block">
                <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                  Primary Practice Setting
                </span>
                <select
                  value={form.setting}
                  onChange={updateField("setting")}
                  disabled={status === "submitting"}
                  className="cab-select w-full rounded-2xl border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 focus:border-[#ff9d67] focus:bg-[#1d1511] disabled:opacity-40"
                  style={{ color: form.setting === "" ? "rgba(255,255,255,0.2)" : "white" }}
                >
                  <option value="" disabled style={{ color: "rgba(255,255,255,0.3)" }}>
                    Select your setting…
                  </option>
                  {PRACTICE_SETTINGS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {attemptedSubmit && form.setting === "" && (
                  <p className="mt-1.5 text-[11px] font-semibold text-[#ffb28a]">
                    Please select your practice setting.
                  </p>
                )}
              </label>

              {/* Software input */}
              <label className="block">
                <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                  Current EMR / Practice Management Software{" "}
                  <span className="text-white/25 normal-case font-semibold tracking-normal">
                    (Optional)
                  </span>
                </span>
                <input
                  type="text"
                  value={form.software}
                  onChange={updateField("software")}
                  placeholder="e.g., SimplePractice, Jane App, Fusion, or 'None'"
                  disabled={status === "submitting"}
                  className="w-full rounded-2xl border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#ff9d67] focus:bg-[#1d1511] disabled:opacity-40"
                />
              </label>

              {/* Carryover range picker */}
              <div className="block">
                {/* Label row */}
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-white/50 leading-relaxed">
                    What % of parents consistently complete home exercises?
                  </span>
                  <span
                    className="shrink-0 rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-[13px] font-black text-[#ff955e] tabular-nums leading-tight"
                  >
                    {carryoverMin}%&nbsp;–&nbsp;{carryoverMax}%
                  </span>
                </div>

                {/* Track + thumbs */}
                <div
                  className={`relative h-[22px] flex items-center${status === "submitting" ? " opacity-40 pointer-events-none" : ""}`}
                >
                  {/* Background track */}
                  <div className="absolute inset-x-0 h-[6px] rounded-full bg-white/8" />

                  {/* Active fill between thumbs */}
                  <div
                    className="absolute h-[6px] rounded-full"
                    style={{
                      left: `${fillLeft}%`,
                      right: `${fillRight}%`,
                      background: "linear-gradient(to right, #ff955e, #f28044)",
                    }}
                  />

                  {/* Min thumb input */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={carryoverMin}
                    onChange={updateCarryoverMin}
                    className="cab-range"
                    aria-label="Minimum % of parents completing home exercises"
                    style={{ zIndex: carryoverMin > 90 ? 5 : 3 }}
                  />

                  {/* Max thumb input */}
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={carryoverMax}
                    onChange={updateCarryoverMax}
                    className="cab-range"
                    aria-label="Maximum % of parents completing home exercises"
                    style={{ zIndex: 4 }}
                  />
                </div>

                {/* Min / Max edge labels */}
                <div className="mt-2 flex justify-between text-[10px] font-semibold text-white/25 tracking-wide">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Error message */}
              {submitError && (
                <p className="text-[12px] font-semibold text-[#ffb28a] bg-[#ff955e]/10 border border-[#ff955e]/20 rounded-xl px-4 py-3">
                  Something went wrong. Please try submitting again.
                </p>
              )}

              {/* Submit button */}
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={status === "submitting"}
                  className={`inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#ff955e] to-[#f28044] px-6 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white disabled:opacity-60 disabled:cursor-not-allowed ${
                    isMobileViewport
                      ? ""
                      : "transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_14px_34px_rgba(242,128,68,0.28)] active:translate-y-0 "
                  }`}
                >
                  {status === "submitting" ? (
                    <>
                      {/* Spinner */}
                      <svg
                        className="w-4 h-4 animate-spin"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      >
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                      </svg>
                      Sending…
                    </>
                  ) : (
                    "Send Application"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
