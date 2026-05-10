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
  practice: string;
  specialization: string;
  message: string;
};

const INITIAL_FORM: ClinicianFormState = {
  name: "",
  email: "",
  practice: "",
  specialization: "",
  message: "",
};

export default function ClinicianModal({
  isOpen,
  onClose,
}: ClinicianModalProps) {
  const isMobileViewport = useIsMobileViewport();
  const [isRendered, setIsRendered] = useState(false);
  const [form, setForm] = useState<ClinicianFormState>(INITIAL_FORM);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
  const [step, setStep] = useState<'form' | 'confirm'>('form');
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

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      setAttemptedSubmit(false);
      setForm(INITIAL_FORM);
      setStep('form');
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
      targets.current = {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      };
    } else {
      document.body.style.overflow = "";
      if (isMobileViewport) {
        setIsRendered(false);
        if (modalRef.current) {
          modalRef.current.style.transform = "";
        }
        return;
      }
      const timeout = window.setTimeout(() => setIsRendered(false), 240);
      return () => window.clearTimeout(timeout);
    }
  }, [isMobileViewport, isOpen]);

  useEffect(() => {
    const modalNode = modalRef.current;
    if (!isOpen) return;
    if (isMobileViewport) {
      if (modalNode) {
        modalNode.style.transform = "none";
      }
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
      if (modalNode) {
        modalNode.style.transform = "";
      }
    };
  }, [isMobileViewport, isOpen]);

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

  useEffect(() => {
    if (!isOpen || step !== 'form') return;
    const timeout = window.setTimeout(
      () => firstInputRef.current?.focus(),
      isMobileViewport ? 0 : 220
    );
    return () => window.clearTimeout(timeout);
  }, [isMobileViewport, isOpen, step]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const isValid = useMemo(() => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    return form.name.trim().length > 1 && emailOk && form.message.trim().length > 5;
  }, [form.email, form.name, form.message]);

  const updateField =
    (field: keyof ClinicianFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const handleSubmit = () => {
    setAttemptedSubmit(true);
    if (isValid) {
      setStep('confirm');
    }
  };

  const openDraftedEmail = () => {
    const subject = `Clinical Advisory Board Application - ${form.name.trim()}`;
    const practiceLine = form.practice.trim() || "Not provided";
    const specializationLine = form.specialization.trim() || "Not provided";

    const body = [
      "Hi Mayank,",
      "",
      "I am interested in joining the Speechworks Clinical Advisory Board.",
      "",
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Practice/Organization: ${practiceLine}`,
      `Specialization: ${specializationLine}`,
      "",
      "Message:",
      form.message.trim(),
      "",
      "I look forward to hearing from you.",
      "",
      "Best regards,",
      form.name.trim(),
    ].join("\n");

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      "mayank@speechworks.in"
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const mailtoUrl = `mailto:mayank@speechworks.in?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    const userAgent = navigator.userAgent;
    const shouldUseNativeMailClient =
      isMobileViewport ||
      /Android|iPhone|iPad|iPod/i.test(userAgent) ||
      window.matchMedia("(pointer: coarse)").matches;

    if (shouldUseNativeMailClient) {
      window.location.href = mailtoUrl;
    } else {
      const openedWindow = window.open(
        gmailComposeUrl,
        "_blank",
        "noopener,noreferrer"
      );

      if (!openedWindow) {
        window.location.href = mailtoUrl;
      }
    }
    onClose();
  };

  if (!isOpen && !isRendered) return null;

  const getFadeUpStyle = (delay = 0) =>
    isMobileViewport
      ? undefined
      : {
          animation: `invite-fade-up 520ms cubic-bezier(0.22,1,0.36,1) ${delay}ms both`,
        };

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center overflow-hidden p-3 sm:p-6 ${
        isMobileViewport ? "" : "transition-opacity duration-300 "
      }${isOpen ? "opacity-100" : "opacity-0"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="clinician-modal-title"
    >
      <div
        className="absolute inset-0 bg-[#120c09]/74 backdrop-blur-xl"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full max-w-[540px] overflow-hidden rounded-[1.7rem] border border-white/10 bg-[#110d0b] shadow-[0_40px_120px_rgba(0,0,0,0.48)] ${
          isMobileViewport ? "" : "transition-opacity duration-500 "
        }sm:rounded-[2rem] ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          willChange: isMobileViewport ? "auto" : "transform",
          minHeight: step === 'confirm' ? '320px' : 'auto'
        }}
      >
        <style>{`
          @keyframes invite-fade-up {
            from {
              opacity: 0;
              transform: translateY(12px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_14%,rgba(255,133,64,0.18),transparent_24%),radial-gradient(circle_at_88%_16%,rgba(255,211,180,0.08),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_26%,transparent_100%)]" />

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

        {step === 'form' ? (
          <div className="relative z-10 p-5 sm:p-8 md:p-10 max-h-[calc(100dvh-1.25rem)] overflow-y-auto sm:max-h-[min(820px,calc(100dvh-3rem))]">
            <div className="mb-6">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#ffb28a] sm:text-[11px]">
                Founding Clinical Advisory
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
                Join a select group of clinicians building the first evidence-backed category for clinical carryover.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-5" style={getFadeUpStyle(220)}>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                    Name
                  </span>
                  <input
                    ref={firstInputRef}
                    type="text"
                    value={form.name}
                    onChange={updateField("name")}
                    placeholder="Your full name"
                    className="w-full rounded-2xl border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#ff9d67] focus:bg-[#1d1511]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                    Email
                  </span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={updateField("email")}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#ff9d67] focus:bg-[#1d1511]"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                    Practice <span className="text-white/20">(Optional)</span>
                  </span>
                  <input
                    type="text"
                    value={form.practice}
                    onChange={updateField("practice")}
                    placeholder="Practice name"
                    className="w-full rounded-2xl border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#ff9d67] focus:bg-[#1d1511]"
                  />
                </label>

                <label className="block">
                  <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                    Specialization <span className="text-white/20">(Optional)</span>
                  </span>
                  <input
                    type="text"
                    value={form.specialization}
                    onChange={updateField("specialization")}
                    placeholder="e.g. Stuttering, Adults"
                    className="w-full rounded-2xl border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#ff9d67] focus:bg-[#1d1511]"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/50">
                  Why do you want to join the Advisory Board?
                </span>
                <textarea
                  value={form.message}
                  onChange={updateField("message")}
                  rows={4}
                  placeholder="Tell us about your experience and how you'd like to contribute..."
                  className="w-full resize-none rounded-2xl border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/20 focus:border-[#ff9d67] focus:bg-[#1d1511]"
                />
              </label>

              {attemptedSubmit && !isValid ? (
                <p className="text-[12px] font-semibold text-[#ffb28a]">
                  Please provide your name, a valid email, and a short message.
                </p>
              ) : null}

              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#ff955e] to-[#f28044] px-6 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white ${
                    isMobileViewport
                      ? ""
                      : "transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_14px_34px_rgba(242,128,68,0.28)] active:translate-y-0 "
                  }`}
                >
                  Send Application
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 p-8 sm:p-12 md:p-16 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-inner" style={getFadeUpStyle(0)}>
              <svg className="w-8 h-8 text-[#ff955e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13" /><path d="M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-4 tracking-tight" style={getFadeUpStyle(60)}>
              Drafting Your Email
            </h2>
            
            <p className="text-[15px] sm:text-16 text-white/60 leading-relaxed mb-10 max-w-sm" style={getFadeUpStyle(120)}>
              We are drafting the application for you. Please review the details in your email client and send it forward to apply.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[320px]" style={getFadeUpStyle(180)}>
              <button
                onClick={() => setStep('form')}
                className="flex-1 px-6 py-3.5 rounded-full border border-white/10 bg-white/5 text-[11px] font-black uppercase tracking-widest text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={openDraftedEmail}
                className="flex-1 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#ff955e] to-[#f28044] text-[11px] font-black uppercase tracking-widest text-white shadow-[0_10px_20px_rgba(242,128,68,0.2)] hover:-translate-y-0.5 transition-all duration-300"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

