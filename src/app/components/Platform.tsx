"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ProgressAppMockup from "./ProgressAppMockup";
import RadarUI from "./RadarUI";

/* ─────────────────────────────────────────────
   GLOBAL KEYFRAME STYLES
   (injected once; scoped so they don't bleed)
───────────────────────────────────────────── */
const KEYFRAMES = `
@keyframes platform-fadeSlideUp {
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)   scale(1);    }
}
@keyframes platform-fadeSlideDown {
  from { opacity: 0; transform: translateY(-20px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
}
@keyframes platform-fadeSlideLeft {
  from { opacity: 0; transform: translateX(36px) rotate(2deg); }
  to   { opacity: 1; transform: translateX(0)    rotate(0deg); }
}
@keyframes platform-springUp {
  0%   { opacity: 0; transform: translateY(40px) scale(0.88); }
  60%  { opacity: 1; transform: translateY(-6px)  scale(1.02); }
  80%  { transform: translateY(3px)  scale(0.99); }
  100% { transform: translateY(0)    scale(1);    }
}
@keyframes platform-popIn {
  0%   { opacity: 0; transform: scale(0.6) rotate(-6deg); }
  70%  { opacity: 1; transform: scale(1.06) rotate(1deg); }
  100% { transform: scale(1) rotate(0deg); }
}
@keyframes platform-tagDrop {
  0%   { opacity: 0; transform: translateY(-18px) scale(0.85); }
  65%  { opacity: 1; transform: translateY(3px)   scale(1.04); }
  100% { transform: translateY(0)    scale(1);    }
}
@keyframes platform-sliceReveal {
  0%   { opacity: 0; transform: scale(0.2) rotate(-30deg); }
  70%  { opacity: 1; transform: scale(1.06) rotate(2deg); }
  100% { opacity: 1; transform: scale(1) rotate(0deg); }
}
@keyframes platform-labelPop {
  0%   { opacity: 0; transform: translate(-50%,-50%) scale(0); }
  65%  { opacity: 1; transform: translate(-50%,-50%) scale(1.12); }
  100% { opacity: 1; transform: translate(-50%,-50%) scale(1); }
}
@keyframes platform-ringPulse {
  0%,100% { transform: scale(1);    opacity: 0.6; }
  50%      { transform: scale(1.08); opacity: 1;   }
}
@keyframes platform-dashRotate {
  to { stroke-dashoffset: 0; }
}
@keyframes platform-barFill {
  from { width: 0%; }
  to   { width: 85%; }
}
@keyframes platform-thinkDot {
  0%,80%,100% { transform: translateY(0);    opacity: 0.4; }
  40%          { transform: translateY(-5px); opacity: 1;   }
}
@keyframes platform-chatReveal {
  from { opacity: 0; transform: translateY(10px) scale(0.96); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
}
@keyframes platform-bgIconDrift {
  0%   { transform: rotate(-6deg) scale(1.0) translateY(0px);   }
  50%  { transform: rotate(-4deg) scale(1.12) translateY(-12px); }
  100% { transform: rotate(-6deg) scale(1.0) translateY(0px);   }
}
@keyframes platform-cardGlow {
  0%,100% { box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
  50%      { box-shadow: 0 28px 56px rgba(0,0,0,0.14); }
}
@keyframes platform-navItemIn {
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes platform-headingReveal {
  from { opacity: 0; letter-spacing: 0.35em; transform: translateY(12px); }
  to   { opacity: 1; letter-spacing: -0.04em; transform: translateY(0); }
}
@keyframes platform-staminaSlide {
  0%   { opacity: 0; transform: translateX(40px) scale(0.9) rotate(2deg); }
  65%  { opacity: 1; transform: translateX(-4px)  scale(1.02) rotate(-0.5deg); }
  100% { opacity: 1; transform: translateX(0)     scale(1) rotate(0deg); }
}
@keyframes platform-circleStroke {
  from { stroke-dashoffset: 264; }
  to   { stroke-dashoffset: 153; }
}
`;

function useInjectKeyframes() {
  useEffect(() => {
    const id = "platform-keyframes";
    if (!document.getElementById(id)) {
      const style = document.createElement("style");
      style.id = id;
      style.textContent = KEYFRAMES;
      document.head.appendChild(style);
    }
  }, []);
}

/* ─────────────────────────────────────────────
   ANIMATION KEY — forces re-mount of animated
   children every time a tab is shown
───────────────────────────────────────────── */
function useAnimKey(activeIndex: number) {
  const [key, setKey] = useState(0);
  const prev = useRef(activeIndex);
  useEffect(() => {
    if (prev.current !== activeIndex) {
      prev.current = activeIndex;
      setKey((k) => k + 1);
    }
  }, [activeIndex]);
  return key;
}


/* ─────────────────────────────────────────────
   ADVERSARIAL CHAT UI
───────────────────────────────────────────── */
function AdversarialChatUI({ animKey }: { animKey: number }) {
  const [phase, setPhase] = useState<"waiter" | "thinking" | "suggestion">("waiter");

  useEffect(() => {
    setPhase("waiter");
    const t1 = setTimeout(() => setPhase("thinking"),    900);
    const t2 = setTimeout(() => setPhase("suggestion"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animKey]);

  const aiAvatar = (full?: boolean) => (
    <div
      className={`w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-violet-600 to-purple-700 border-2 border-white shadow-md flex items-center justify-center relative ${full ? "" : "opacity-50"}`}
      style={{ boxShadow: "0 4px 16px rgba(124,58,237,0.4)" }}
    >
      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      {full && <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />}
    </div>
  );

  return (
    <div
      key={animKey}
      className="absolute -right-6 md:-right-14 top-[50%] -translate-y-1/2 w-[270px] md:w-[310px] flex flex-col gap-4 py-1 antialiased cursor-default"
    >
      {/* Waiter bubble */}
      <div
        className="flex items-end gap-2.5 self-start max-w-[100%]"
        style={{ animation: "platform-chatReveal 0.5s cubic-bezier(0.23,1,0.32,1) 0.1s both" }}
      >
        <div
          className="w-8 h-8 shrink-0 rounded-full bg-gradient-to-br from-amber-100 to-orange-200 border-2 border-white shadow-md flex items-center justify-center text-base select-none"
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
        >
          🧑‍🍳
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[9px] font-semibold text-slate-400 ml-1 uppercase tracking-widest">Wait Staff</span>
          <div className="bg-white text-slate-700 text-xs md:text-[13px] font-medium leading-relaxed px-4 py-3 rounded-2xl rounded-bl-none shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100/80">
            Um, are you ready to order? We have a line forming.
          </div>
        </div>
      </div>

      {/* AI Slot */}
      {phase !== "waiter" && (
        <div
          className="flex items-end gap-2.5 self-start max-w-[100%]"
          style={{ animation: "platform-chatReveal 0.4s cubic-bezier(0.23,1,0.32,1) both" }}
        >
          {phase === "thinking" ? aiAvatar(false) : aiAvatar(true)}

          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <span className={`text-[9px] font-semibold ml-1 uppercase tracking-widest transition-colors duration-300 ${phase === "suggestion" ? "text-violet-400/90" : "text-violet-400/50"}`}>
              Speechworks.AI
            </span>

            {/* Thinking dots */}
            {phase === "thinking" && (
              <div className="bg-indigo-950/40 backdrop-blur-sm px-4 py-3 rounded-2xl rounded-bl-none border border-white/5 flex gap-1.5 items-center"
                style={{ animation: "platform-chatReveal 0.35s ease both" }}>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-violet-400 rounded-full"
                    style={{
                      animation: `platform-thinkDot 1.1s ease-in-out ${i * 0.18}s infinite`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* AI suggestion */}
            {phase === "suggestion" && (
              <div
                className="text-white text-xs md:text-[13px] font-medium leading-relaxed px-4 py-3 rounded-2xl rounded-bl-none relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg,#1e1b4b 0%,#312e81 60%,#4c1d95 100%)",
                  boxShadow: "0 8px 32px rgba(76,29,149,0.35), 0 0 0 1px rgba(139,92,246,0.2)",
                  animation: "platform-chatReveal 0.45s cubic-bezier(0.23,1,0.32,1) both",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                <p>
                  Friction Detected. Use{" "}
                  <span className="inline-flex items-center mx-0.5 px-2 py-0.5 rounded-md bg-white/15 border border-violet-300/30 text-violet-200 font-bold text-[11px] backdrop-blur-sm shadow-[0_0_10px_rgba(167,139,250,0.25)] tracking-wide">
                    Advertising
                  </span>{" "}
                  to set a boundary.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STAMINA UI
───────────────────────────────────────────── */
function StaminaUI({ animKey }: { animKey: number }) {
  return (
    <div
      key={animKey}
      className="absolute -right-2 md:-right-8 top-12 w-[220px] md:w-[260px] bg-white p-4 md:p-5 rounded-[2rem] border border-emerald-100 flex items-center gap-4 antialiased"
      style={{
        boxShadow: "0 20px 40px rgba(16,185,129,0.15)",
        animation: "platform-staminaSlide 0.75s cubic-bezier(0.23,1,0.32,1) 0.3s both",
      }}
    >
      <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0">
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform -rotate-90">
          <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6"
            fill="transparent" className="text-slate-100" />
          <circle
            cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="6"
            fill="transparent" strokeDasharray="264" strokeDashoffset="264"
            className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]"
            strokeLinecap="round"
            style={{ animation: "platform-circleStroke 1.8s cubic-bezier(0.23,1,0.32,1) 0.6s both" }}
          />
        </svg>
        <span className="text-emerald-700 font-bold font-mono text-base md:text-lg">
          42<span className="text-[10px]">%</span>
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Alert</span>
        <span className="text-sm md:text-base font-black text-slate-800 leading-tight">
          Guardrail
          <br />
          <span className="text-emerald-500">Active</span>
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROADMAP UI
───────────────────────────────────────────── */
function RoadmapUI({ animKey }: { animKey: number }) {
  return (
    <div
      key={animKey}
      className="absolute -left-6 md:-left-10 -bottom-8 w-[240px] md:w-[280px] bg-white rounded-3xl flex flex-col px-6 py-5 gap-4 border border-orange-100/30 origin-bottom overflow-hidden"
      style={{
        boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
        animation: "platform-springUp 0.75s cubic-bezier(0.23,1,0.32,1) 0.2s both",
      }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand/20 to-transparent rounded-full blur-[20px] -translate-y-1/2 translate-x-1/2" />
      <div className="flex items-center gap-4 relative z-10">
        <div
          className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FFF5F0] flex items-center justify-center text-brand shrink-0 shadow-inner"
          style={{ animation: "platform-popIn 0.55s cubic-bezier(0.23,1,0.32,1) 0.45s both" }}
        >
          <span className="font-black text-xl md:text-2xl">1</span>
        </div>
        <div className="flex flex-col justify-center w-full">
          <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Up Next</span>
          <div className="w-3/4 h-2.5 bg-slate-200 rounded-full mb-1.5" />
          <div className="w-1/2 h-1.5 bg-slate-100 rounded-full" />
        </div>
      </div>
      <div className="w-full h-2 bg-slate-100 rounded-full mt-2 relative overflow-hidden z-10">
        <div
          className="absolute top-0 left-0 h-full bg-brand rounded-full"
          style={{ animation: "platform-barFill 1.4s cubic-bezier(0.23,1,0.32,1) 0.65s both" }}
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURES DATA
───────────────────────────────────────────── */
const features = [
  {
    id: "progress",
    shortTitle: "Growth Profile",
    title: "Pro-Level Progress Tracking",
    desc: "A 5-axis Radar Chart tracking Mastery, Ease, Courage, Confidence, and Social Participation. Leveling up isn't just a number—it's an expansion of capability. See your growth not as a fluency score, but as a resilience map.",
    tagIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 md:w-3.5 h-3 md:h-3.5">
        <path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z" />
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      </svg>
    ),
    bgIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M16 7h6v6" /><path d="m22 7-8.5 8.5-5-5L2 17" />
      </svg>
    ),
    colorTheme: "brand",
    bgGradient: "from-[#FFF5F0] to-[#FFE6D9]",
    iconColor: "text-brand",
    tagBg: "bg-white",
    tagBorder: "border-orange-100",
    activeBar: "bg-brand",
    renderUI: (animKey: number) => (
      <div className="md:translate-x-12 lg:translate-x-16 transition-transform duration-700">
        <ProgressAppMockup radarChart={<RadarUI animKey={animKey} isFloating={true} />} />
      </div>
    ),
  },
  {
    id: "adversarial",
    shortTitle: "Adversarial AI",
    title: "The Pressure Test",
    desc: 'Most tools are too "polite." Our AI mimics the friction of real life. It will rush you, misinterpret your silence, and challenge your composure.',
    tagIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 md:w-3.5 h-3 md:h-3.5">
        <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
      </svg>
    ),
    bgIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="M12 20v2" /><path d="M12 2v2" /><path d="M17 20v2" /><path d="M17 2v2" />
        <path d="M2 12h2" /><path d="M2 17h2" /><path d="M2 7h2" />
        <path d="M20 12h2" /><path d="M20 17h2" /><path d="M20 7h2" />
        <path d="M7 20v2" /><path d="M7 2v2" />
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <rect x="8" y="8" width="8" height="8" rx="1" />
      </svg>
    ),
    colorTheme: "purple-500",
    bgGradient: "from-purple-50 to-purple-100",
    iconColor: "text-purple-500",
    tagBg: "bg-white",
    tagBorder: "border-purple-200",
    activeBar: "bg-purple-500",
    renderUI: (animKey: number) => <AdversarialChatUI animKey={animKey} />,
  },
  {
    id: "stamina",
    shortTitle: "Biological Stamina",
    title: "Sustainable Training",
    desc: "We treat speech mastery like an elite sport. Stamina Guardrails prevent burnout and ensure you only practice at your peak.",
    tagIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 md:w-3.5 h-3 md:h-3.5">
        <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
        <path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27" />
      </svg>
    ),
    bgIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="m11 7-3 5h4l-3 5" />
        <path d="M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935" />
        <path d="M22 14v-4" />
        <path d="M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936" />
      </svg>
    ),
    colorTheme: "emerald-500",
    bgGradient: "from-emerald-50 to-emerald-100",
    iconColor: "text-emerald-500",
    tagBg: "bg-white",
    tagBorder: "border-emerald-200",
    activeBar: "bg-emerald-500",
    renderUI: (animKey: number) => <StaminaUI animKey={animKey} />,
  },
  {
    id: "roadmap",
    shortTitle: "Clinical Packs",
    title: "Your 0-to-100 Roadmap",
    desc: 'Expert-designed curriculums that follow a strict Clinical Arc. No more guesswork. Our Recommendation Engine audits your unique speech profile and presents the exact "Pack" you need right now.',
    tagIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 md:w-3.5 h-3 md:h-3.5">
        <circle cx="6" cy="19" r="3" />
        <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
        <circle cx="18" cy="5" r="3" />
      </svg>
    ),
    bgIcon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
        <path d="m16 6 4 14" /><path d="M12 6v14" />
        <path d="M8 8v12" /><path d="M4 4v16" />
      </svg>
    ),
    colorTheme: "brand-dark",
    bgGradient: "from-brand to-[#D9692E]",
    iconColor: "text-white",
    tagBg: "bg-white/20",
    tagBorder: "border-white/30",
    activeBar: "bg-brand",
    isDark: true,
    renderUI: (animKey: number) => <RoadmapUI animKey={animKey} />,
  },
];

/* ─────────────────────────────────────────────
   MAIN PLATFORM SECTION
───────────────────────────────────────────── */
export default function Platform() {
  useInjectKeyframes();

  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress]       = useState(0);
  const [isHovered, setIsHovered]     = useState(false);
  const animKey = useAnimKey(activeIndex);

  const DURATION        = 6000;
  const UPDATE_INTERVAL = 50;

  useEffect(() => {
    if (isHovered) return;
    const tick = (UPDATE_INTERVAL / DURATION) * 100;
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 100 : prev + tick));
    }, UPDATE_INTERVAL);
    return () => clearInterval(timer);
  }, [activeIndex, isHovered]);

  useEffect(() => {
    if (progress >= 100) {
      setActiveIndex((c) => (c + 1) % features.length);
      setProgress(0);
    }
  }, [progress]);

  const handleFeatureClick = useCallback((index: number) => {
    setActiveIndex(index);
    setProgress(0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    e.currentTarget.style.setProperty("--mouse-x-raw", `${e.clientX - rect.left}`);
    e.currentTarget.style.setProperty("--mouse-y-raw", `${e.clientY - rect.top}`);
  };

  return (
    <section
      id="platform"
      className="py-20 md:py-32 bg-[#FFFAF5] relative z-10 border-t border-orange-900/5 group overflow-hidden"
      onMouseMove={handleMouseMove}
      style={{ "--mouse-x": "50%", "--mouse-y": "50%", "--mouse-x-raw": "500", "--mouse-y-raw": "500" } as React.CSSProperties}
    >
      {/* ── Awwwards X-Ray hover background ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-100 transition-opacity duration-1000 group-hover:opacity-10">
          <div className="absolute top-[20%] left-[10%] w-[40%] h-[60%] bg-gradient-to-tr from-brand/5 to-transparent blur-[120px]" />
        </div>

        <div
          className="absolute inset-0 transition-opacity duration-[1000ms] opacity-0 group-hover:opacity-100"
          style={{
            WebkitMaskImage: `radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
            maskImage:        `radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
          }}
        >
          <div className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-zinc-100 via-transparent to-zinc-50 blur-[50px] rounded-full transition-transform duration-75 ease-out"
            style={{ left: "var(--mouse-x)", top: "var(--mouse-y)" }} />

          {["#F28044","#a855f7","#10b981","#D9692E"].map((color, idx) => (
            <div key={`accent-${idx}`}
              className={`absolute w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 blur-[40px] rounded-full transition-all duration-1000 ease-in-out mix-blend-multiply ${activeIndex === idx ? "opacity-100" : "opacity-0"}`}
              style={{ left: "var(--mouse-x)", top: "var(--mouse-y)", backgroundColor: `${color}1A` }} />
          ))}

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(161,161,170,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(161,161,170,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.2)_1px,transparent_1px)] bg-[size:120px_120px]" />

          <div className="absolute w-[2px] h-[2px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
            style={{ left: "var(--mouse-x)", top: "var(--mouse-y)" }}>
            {["#F28044","#a855f7","#10b981","#D9692E"].map((color, idx) => {
              const isCurrent = activeIndex === idx;
              return (
                <div key={`assembly-${idx}`}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isCurrent ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
                  <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] border rounded-full animate-spin"
                    style={{ animationDuration: "30s", borderColor: `${color}40` }} />
                  <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] border rounded-full border-dashed animate-spin"
                    style={{ animationDuration: "40s", animationDirection: "reverse", borderColor: `${color}20` }} />
                  <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1px]"
                    style={{ background: `linear-gradient(to right, transparent, ${color}66, transparent)` }} />
                  <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[1000px]"
                    style={{ background: `linear-gradient(to bottom, transparent, ${color}66, transparent)` }} />
                  <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 15px 3px ${color}66` }} />
                </div>
              );
            })}
          </div>

          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none opacity-[0.03] text-black overflow-hidden font-mono">
            <div className="text-[8rem] md:text-[14rem] font-sans font-black tracking-[-0.05em] leading-none whitespace-nowrap transition-transform duration-75 ease-out"
              style={{ transform: "translateX(calc((var(--mouse-x-raw) - 500) * -0.05px))" }}>
              CLINICAL///ARC
            </div>
            <div className="text-[6rem] md:text-[10rem] font-sans font-black tracking-tighter leading-none whitespace-nowrap transition-transform duration-75 ease-out"
              style={{ transform: "translateX(calc((var(--mouse-x-raw) - 500) * 0.08px))" }}>
              001.ADVERSARIAL
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 top-0 h-32 md:h-48 bg-gradient-to-b from-white via-white/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">

        {/* Section heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 text-center md:text-left">
          <div className="max-w-2xl mx-auto md:mx-0">
            <h2
              className="text-brand font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-3 md:mb-4"
              style={{ animation: "platform-fadeSlideDown 0.6s ease 0.1s both" }}
            >
              Professional Speech Academy
            </h2>
            <h3
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-none text-app-text"
              style={{ animation: "platform-headingReveal 0.8s cubic-bezier(0.23,1,0.32,1) 0.2s both" }}
            >
              POWERED BY
              <br />
              ADVERSARIAL AI.
            </h3>
          </div>
          <p
            className="text-app-muted font-medium mt-4 md:mt-0 max-w-xs mx-auto md:mx-0 md:text-right text-sm md:text-base"
            style={{ animation: "platform-fadeSlideUp 0.6s ease 0.4s both" }}
          >
            A clinical-grade foundation designed to analyze, challenge, and elevate your speech patterns.
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          {/* ── Left Nav ── */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-2 lg:pr-8">
            {features.map((feature, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={feature.id}
                  onClick={() => handleFeatureClick(index)}
                  className={`relative flex flex-col text-left px-6 lg:px-8 py-5 md:py-6 rounded-2xl transition-all duration-300 w-full outline-none
                    ${isActive ? "bg-[#FFFAF5] shadow-sm" : "hover:bg-black/[0.02]"}`}
                  style={{ animation: `platform-navItemIn 0.55s ease ${0.3 + index * 0.08}s both` }}
                >
                  {/* Progress line */}
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 transition-all duration-500 rounded-full overflow-hidden ${isActive ? "h-[60%] bg-gray-200" : "h-0 bg-transparent"}`}>
                    {isActive && (
                      <div
                        className={`w-full absolute bottom-0 left-0 transition-all duration-75 ease-linear ${feature.activeBar}`}
                        style={{ height: `${progress}%` }}
                      />
                    )}
                  </div>

                  <h4 className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${isActive ? "text-app-text" : "text-app-muted/60 hover:text-app-text/80"}`}>
                    {feature.title}
                  </h4>

                  <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? "max-h-48 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"}`}>
                    <p className="text-app-muted text-sm md:text-base leading-relaxed">{feature.desc}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Right Visual Stage ── */}
          <div className="lg:col-span-7 relative h-[350px] sm:h-[450px] lg:h-auto">
            <div className="w-full h-full lg:aspect-square xl:aspect-[4/3] relative transition-transform duration-200 ease-out group/stage">

              {/* Card frame */}
              <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-card-hover border border-orange-100/50">
                {/* Glass glare */}
                <div
                  className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover/stage:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle 600px at calc(var(--mouse-x-raw) * 1px) calc(var(--mouse-y-raw) * 1px), rgba(255,255,255,0.4) 0%, transparent 60%)`,
                    mixBlendMode: "overlay",
                  }}
                />

                {/* Animated backgrounds */}
                {features.map((feature, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <div
                      key={`bg-${feature.id}`}
                      className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} transition-opacity duration-700 ease-in-out flex items-center justify-center`}
                      style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? "auto" : "none", zIndex: isActive ? 10 : 0 }}
                    >
                      {/* Drifting background icon */}
                      <div
                        className={`absolute w-[80%] h-[80%] opacity-[0.07] ${feature.iconColor}`}
                        style={{
                          animation: isActive ? "platform-bgIconDrift 8s ease-in-out infinite" : "none",
                        }}
                      >
                        {feature.bgIcon}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Overflowing content cards */}
              {features.map((feature, index) => {
                const isActive = index === activeIndex;
                const isDark   = feature.isDark;
                return (
                  <div
                    key={`content-${feature.id}`}
                    className={`absolute inset-0 flex flex-col justify-between p-8 md:p-12 transition-opacity duration-500 ease-in-out ${isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                    style={{ zIndex: 20 }}
                  >
                    {/* Tag chip */}
                    {isActive && (
                      <div
                        key={`tag-${feature.id}-${animKey}`}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] md:text-xs font-bold uppercase tracking-widest w-fit shadow-[0_10px_30px_rgba(0,0,0,0.1)]
                          ${feature.tagBg} ${feature.tagBorder} ${isDark ? "text-white" : feature.iconColor}`}
                        style={{ animation: "platform-tagDrop 0.55s cubic-bezier(0.23,1,0.32,1) 0.05s both" }}
                      >
                        {feature.tagIcon} {feature.shortTitle}
                      </div>
                    )}

                    {/* Dynamic mock UI */}
                    <div className="absolute inset-0 pointer-events-none">
                      {isActive && feature.renderUI(animKey)}
                    </div>

                    {/* Bottom CTA (roadmap only) */}
                    <div className="self-end mt-auto">
                      {isDark && isActive && (
                        <a
                          key={`cta-${animKey}`}
                          href="#roadmap"
                          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-brand flex items-center justify-center hover:bg-brand-50 transition-all transform hover:scale-110 shadow-2xl group/btn pointer-events-auto"
                          style={{ animation: "platform-popIn 0.55s cubic-bezier(0.23,1,0.32,1) 0.5s both" }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform">
                            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
