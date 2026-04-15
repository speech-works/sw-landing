"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface InviteOnlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: "default" | "premium";
}

type InviteFormState = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  referralCode: string;
};

type InviteStep = "pitch" | "details";

const INITIAL_FORM: InviteFormState = {
  name: "",
  email: "",
  countryCode: "+1",
  phone: "",
  referralCode: "",
};

const COUNTRY_CODES = [
  { label: "IN", code: "+91" },
  { label: "US", code: "+1" },
  { label: "UK", code: "+44" },
  { label: "UAE", code: "+971" },
  { label: "SG", code: "+65" },
  { label: "AU", code: "+61" },
  { label: "CA", code: "+1" },
  { label: "DE", code: "+49" },
  { label: "FR", code: "+33" },
  { label: "NL", code: "+31" },
  { label: "ES", code: "+34" },
  { label: "IT", code: "+39" },
  { label: "BR", code: "+55" },
  { label: "MX", code: "+52" },
  { label: "ZA", code: "+27" },
  { label: "JP", code: "+81" },
];

export default function InviteOnlyModal({
  isOpen,
  onClose,
  variant = "default",
}: InviteOnlyModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const [step, setStep] = useState<InviteStep>("pitch");
  const [form, setForm] = useState<InviteFormState>(INITIAL_FORM);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);
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
      setStep("pitch");
      setAttemptedSubmit(false);
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
      targets.current = {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
      };
    } else {
      document.body.style.overflow = "";
      const timeout = window.setTimeout(() => setIsRendered(false), 240);
      return () => window.clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

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
    };
  }, [isOpen]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;

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
    targets.current.x = 0;
    targets.current.y = 0;
    targets.current.rotateX = 0;
    targets.current.rotateY = 0;
    targets.current.scale = 1;
  };

  useEffect(() => {
    if (!isOpen || step !== "details") return;
    const timeout = window.setTimeout(
      () => firstInputRef.current?.focus(),
      220
    );
    return () => window.clearTimeout(timeout);
  }, [isOpen, step]);

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
    return form.name.trim().length > 1 && emailOk;
  }, [form.email, form.name]);

  const updateField =
    (field: keyof InviteFormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((current) => ({ ...current, [field]: event.target.value }));
    };

  const openDraftedEmail = () => {
    setAttemptedSubmit(true);
    if (!isValid) return;

    const subject = `Speechworks invite request - ${form.name.trim()}`;
    const contactLine = form.phone.trim()
      ? `${form.countryCode} ${form.phone.trim()}`
      : "Not provided";
    const referralLine = form.referralCode.trim() || "Not provided";

    const body = [
      "Hi Mayank,",
      "",
      "I would like to register my interest for invite-only access to Speechworks.",
      "",
      `Name: ${form.name.trim()}`,
      `Email: ${form.email.trim()}`,
      `Contact Number: ${contactLine}`,
      `Referral Code: ${referralLine}`,
      "",
      "I would love to be considered for early access.",
      "",
      "Thanks,",
      form.name.trim(),
    ].join("\n");

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      "mayank@speechworks.in"
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const openedWindow = window.open(
      gmailComposeUrl,
      "_blank",
      "noopener,noreferrer"
    );

    if (!openedWindow) {
      window.location.href = `mailto:mayank@speechworks.in?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    }
  };

  if (!isOpen && !isRendered) return null;

  const isPremiumVariant = variant === "premium";
  const eyebrowCopy = isPremiumVariant
    ? "Priority premium invite"
    : "Invite-only release";
  const sublineCopy = isPremiumVariant
    ? "Free premium seats are being assigned right now."
    : "The first wave is live.";
  const badgeCopy = isPremiumVariant
    ? "You may not need to pay"
    : "Access is opening in waves";
  const titleCopy = isPremiumVariant
    ? "You may already qualify for premium."
    : "Don’t be the one hearing about it later.";
  const bodyCopy = isPremiumVariant
    ? "Before paid access matters, we’re selecting a limited group for free premium membership. If you want in, put your name forward now and show us you should be among the people helping shape what Speechworks becomes."
    : "The first wave is already open. We’re giving a limited number of people free premium access in exchange for sharp feedback that helps us make Speechworks better before the doors open wider.";
  const reasonTitle = isPremiumVariant ? "Why this is different" : "Why act now";
  const reasonBody = isPremiumVariant
    ? "This is a chance to skip the paywall, get premium access early, and be part of the group that helps define the standard from the inside."
    : "If you want the free premium pass, this is the moment to put your name in front of us before the list gets crowded.";
  const ctaLabel = isPremiumVariant
    ? "See if I qualify"
    : "Claim a premium spot";

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6 transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="invite-only-title"
    >
      <div
        className="absolute inset-0 bg-[#120c09]/74 backdrop-blur-xl"
        onClick={onClose}
      />

      <div
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative mt-12 w-full max-w-[540px] max-h-[calc(100dvh-2rem)] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[2rem] border border-white/10 bg-[#110d0b] shadow-[0_40px_120px_rgba(0,0,0,0.48)] transition-opacity duration-500 sm:mt-0 sm:max-h-[min(820px,calc(100dvh-3rem))] ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
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
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all duration-300 hover:scale-110 hover:rotate-90 hover:border-[#ffb28a]/25 hover:bg-white/10 hover:text-white"
          aria-label="Close invite modal"
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

        <div className="relative z-10 p-5 md:p-6">
          <div className="mb-4 flex items-start justify-between gap-4 pr-12">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.22em] text-[#ffb28a]">
                {eyebrowCopy}
              </div>
              <div className="mt-1 text-[13px] font-semibold text-white/60">
                {sublineCopy}
              </div>
            </div>
            <div className="pointer-events-none text-[2.8rem] font-black leading-none tracking-[-0.08em] text-white/[0.05]">
              WAVE 01
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[1.6rem] border border-white/8 bg-white/[0.03] px-5 py-5 md:px-6 md:py-6">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
            <div className="pointer-events-none absolute right-5 top-5 text-[4.8rem] font-black leading-none tracking-[-0.08em] text-white/[0.035]">
              {step === "pitch" ? "EARLY" : "REBEL"}
            </div>

            {step === "pitch" ? (
              <>
                <div
                  className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#ffb28a]/25 bg-[#ffb28a]/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-[#ffd6bf]"
                  style={{
                    animation:
                      "invite-fade-up 460ms cubic-bezier(0.22,1,0.36,1) both",
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff8b55] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff8b55]" />
                  </span>
                  {badgeCopy}
                </div>

                <h2
                  id="invite-only-title"
                  className="max-w-[10ch] text-[1.9rem] font-black leading-[0.92] tracking-[-0.055em] text-white md:text-[2.4rem]"
                  style={{
                    animation:
                      "invite-fade-up 520ms cubic-bezier(0.22,1,0.36,1) 60ms both",
                  }}
                >
                  {titleCopy}
                </h2>

                <p
                  className="mt-3 max-w-[38ch] text-[14px] leading-6 text-white/72 md:text-[15px]"
                  style={{
                    animation:
                      "invite-fade-up 520ms cubic-bezier(0.22,1,0.36,1) 120ms both",
                  }}
                >
                  {bodyCopy}
                </p>

                <div
                  className="mt-5 rounded-[1.15rem] border border-[#ffb28a]/12 bg-[#ffb28a]/6 px-4 py-3"
                  style={{
                    animation:
                      "invite-fade-up 520ms cubic-bezier(0.22,1,0.36,1) 220ms both",
                  }}
                >
                  <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ffb28a]">
                    {reasonTitle}
                  </div>
                  <div className="mt-1.5 text-[13px] leading-5 text-white/76">
                    {reasonBody}
                  </div>
                </div>

                <div
                  className="mt-5"
                  style={{
                    animation:
                      "invite-fade-up 520ms cubic-bezier(0.22,1,0.36,1) 320ms both",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setStep("details")}
                    className="inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#ff955e] to-[#f28044] px-6 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_14px_34px_rgba(242,128,68,0.28)] active:translate-y-0"
                  >
                    {ctaLabel}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.18em] text-[#ffb28a]">
                      One clean step
                    </div>
                    <h2 className="mt-1.5 text-[1.55rem] font-black tracking-[-0.045em] text-white">
                      Raise your hand.
                    </h2>
                    <p className="mt-1.5 max-w-[34ch] text-[13px] leading-5 text-white/62">
                      Give us the essentials and we&apos;ll prepare the email
                      draft around your details.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep("pitch")}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:text-white"
                  >
                    Back
                  </button>
                </div>

                <div className="grid gap-3">
                  <div className="grid gap-3 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/55">
                        Name
                      </span>
                      <input
                        ref={firstInputRef}
                        type="text"
                        value={form.name}
                        onChange={updateField("name")}
                        placeholder="Your full name"
                        className="w-full rounded-[1rem] border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/28 focus:border-[#ff9d67] focus:bg-[#1d1511]"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/55">
                        Email
                      </span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={updateField("email")}
                        placeholder="you@example.com"
                        className="w-full rounded-[1rem] border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/28 focus:border-[#ff9d67] focus:bg-[#1d1511]"
                      />
                    </label>
                  </div>

                  <div className="grid gap-3 md:grid-cols-[118px_minmax(0,1fr)]">
                    <label className="block">
                      <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/55">
                        Code
                      </span>
                      <input
                        list="invite-country-codes"
                        value={form.countryCode}
                        onChange={updateField("countryCode")}
                        placeholder="+1"
                        className="w-full rounded-[1rem] border border-white/10 bg-[#1a130f] px-3 py-3 text-[14px] font-semibold text-white outline-none transition-all duration-300 placeholder:text-white/28 focus:border-[#ff9d67] focus:bg-[#1d1511]"
                      />
                      <datalist id="invite-country-codes">
                        {COUNTRY_CODES.map((option, index) => (
                          <option
                            key={`${option.label}-${option.code}-${index}`}
                            value={option.code}
                          >
                            {option.label}
                          </option>
                        ))}
                      </datalist>
                    </label>

                    <label className="block">
                      <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/55">
                        Contact number{" "}
                        <span className="text-white/30">(optional)</span>
                      </span>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={updateField("phone")}
                        placeholder="Contact number"
                        className="w-full rounded-[1rem] border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/28 focus:border-[#ff9d67] focus:bg-[#1d1511]"
                      />
                    </label>
                  </div>

                  <label className="block">
                    <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.16em] text-white/55">
                      Referral code{" "}
                      <span className="text-white/30">(optional)</span>
                    </span>
                    <input
                      type="text"
                      value={form.referralCode}
                      onChange={updateField("referralCode")}
                      placeholder="This gives you bonus points, but we’ll still consider you"
                      className="w-full rounded-[1rem] border border-white/10 bg-[#1a130f] px-4 py-3 text-[14px] text-white outline-none transition-all duration-300 placeholder:text-white/28 focus:border-[#ff9d67] focus:bg-[#1d1511]"
                    />
                  </label>
                </div>

                {attemptedSubmit && !isValid ? (
                  <p className="mt-3 text-[12px] font-semibold text-[#ffb28a]">
                    Add your name and a valid email so we can prepare the invite
                    draft for you.
                  </p>
                ) : null}

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={openDraftedEmail}
                    className="inline-flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#ff955e] to-[#f28044] px-6 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-[0_14px_34px_rgba(242,128,68,0.28)] active:translate-y-0"
                  >
                    Be a rebel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
