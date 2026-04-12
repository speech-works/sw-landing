"use client";
import React, { useEffect, useState } from "react";

// -------------------------------------------------------
// FACES — ported exactly from sw-faces/ in the mobile repo
// -------------------------------------------------------

/**
 * GuidedBreathingFace — sw-faces/GuidedBreathingFace.tsx
 * Dark night-sky background, glowing moon, forest horizon, skin face with animated eyes
 */
const GuidedBreathingFace = () => (
  <div className="w-full h-full rounded-full overflow-hidden">
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="gbNightSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0F172A" />
          <stop offset="0.5" stopColor="#1E293B" />
          <stop offset="1" stopColor="#334155" />
        </linearGradient>
        <radialGradient id="gbMoonGlow" cx="24" cy="22" r="18" fx="24" fy="22" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#FEF3C7" stopOpacity="0.4" />
          <stop offset="0.6" stopColor="#FEF3C7" stopOpacity="0.1" />
          <stop offset="1" stopColor="#FEF3C7" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Night sky bg */}
      <path d="M0 0 H48 V48 H0 Z" fill="url(#gbNightSky)" />
      {/* Stars */}
      <circle cx="10" cy="10" r="0.5" fill="#FFF" opacity="0.8" />
      <circle cx="38" cy="8" r="0.4" fill="#FFF" opacity="0.6" />
      <circle cx="4" cy="20" r="0.3" fill="#FFF" opacity="0.5" />
      <circle cx="44" cy="22" r="0.3" fill="#FFF" opacity="0.7" />
      <circle cx="16" cy="5" r="0.3" fill="#FFF" opacity="0.4" />
      <circle cx="30" cy="4" r="0.2" fill="#FFF" opacity="0.5" />
      {/* Moon glow + body */}
      <circle cx="24" cy="22" r="14" fill="url(#gbMoonGlow)" />
      <circle cx="24" cy="22" r="6" fill="#FEF3C7" opacity="0.9" />
      {/* Forest silhouette */}
      <path fill="#020617" opacity="0.6" d="M0 48 V32 L4 36 L8 28 L12 34 L16 30 L22 40 L26 30 L30 36 L36 28 L40 34 L44 26 L48 32 V48 H0 Z" />
      <path fill="#0F172A" opacity="0.8" d="M0 48 V40 Q12 42, 24 41 Q36 40, 48 38 V48 H0 Z" />
      {/* Shadow */}
      <path fill="#000" opacity="0.15" transform="translate(4,4)" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
      {/* Skin face */}
      <path fill="#FFCCBC" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
      {/* Closed curved eyes */}
      <g className="animate-gb-eyes">
        <path stroke="#000" strokeWidth="2.5" strokeLinecap="round" d="M14 24 Q18 23, 22 24" fill="none" />
        <path stroke="#000" strokeWidth="2.5" strokeLinecap="round" d="M26 24 Q30 23, 34 24" fill="none" />
      </g>
      {/* Breath streams — animated fade in/out */}
      <g className="animate-gb-breath">
        <path d="M24 38 C24 40, 24 43, 22 45" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M21 38 C20 40, 18 43, 16 44" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M27 38 C28 40, 30 43, 32 44" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  </div>
);

/**
 * MeditationFace — sw-faces/MeditationFace.tsx
 * Blue circle bg, peach face, flat line eyes/mouth. Pulsing halo rings animated
 */
const MeditationFace = () => (
  <div className="w-full h-full rounded-full overflow-hidden relative">
    {/* Pulsing rings behind face */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="absolute rounded-full border-2 border-white/50 bg-white/10 animate-med-ring animate-med-ring-d0" style={{ width: "100%", height: "100%" }} />
      <div className="absolute rounded-full border-2 border-white/50 bg-white/10 animate-med-ring animate-med-ring-d1" style={{ width: "100%", height: "100%" }} />
      <div className="absolute rounded-full border-2 border-white/50 bg-white/10 animate-med-ring animate-med-ring-d2" style={{ width: "100%", height: "100%" }} />
    </div>
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full relative z-10">
      {/* Blue circle background */}
      <path fill="#3F51B5" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24" />
      {/* Peach/sand skin face */}
      <path fill="#FFDAB9" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
      {/* Flat line eyes */}
      <line stroke="#607D8B" strokeWidth="2.5" strokeLinecap="round" x1="15" y1="24" x2="21" y2="24" />
      <line stroke="#607D8B" strokeWidth="2.5" strokeLinecap="round" x1="27" y1="24" x2="33" y2="24" />
      {/* Flat line mouth */}
      <line stroke="#607D8B" strokeWidth="2.5" strokeLinecap="round" x1="20" y1="34" x2="28" y2="34" />
    </svg>
  </div>
);

/**
 * RewiringFace — sw-faces/RewiringFace.tsx
 * Red circle bg, white face, dot eyes with blink, smile mouth, spinning spiral on forehead
 */
const RewiringFace = () => (
  <div className="w-full h-full rounded-full overflow-hidden">
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <mask id="rewM" x="0" y="0" width="48" height="48" maskUnits="userSpaceOnUse">
          <path fill="#fff" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24" />
        </mask>
      </defs>
      <g mask="url(#rewM)">
        {/* Red background */}
        <path fill="#C62828" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24" />
        {/* White face */}
        <path fill="#F5F5F5" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
        {/* Eyes with blink */}
        <g className="animate-rew-blink" style={{ transformOrigin: "17px 24px" }}>
          <circle cx="17" cy="24" r="3" fill="#212121" />
          <circle cx="18.2" cy="22.8" r="0.8" fill="#FFF" />
        </g>
        <g className="animate-rew-blink" style={{ transformOrigin: "31px 24px" }}>
          <circle cx="31" cy="24" r="3" fill="#212121" />
          <circle cx="32.2" cy="22.8" r="0.8" fill="#FFF" />
        </g>
        {/* Smile */}
        <path stroke="#424242" strokeWidth="3" strokeLinecap="round" d="M18 32q6 5 12 0" fill="none" />
        {/* Spinning spiral at forehead */}
        <path
          stroke="#D32F2F"
          strokeWidth="2.5"
          fill="none"
          d="M24 10a10 10 0 1 1 0 .1M24 15a5 5 0 1 1 0 .1"
          className="animate-rew-spiral"
          style={{ transformOrigin: "24px 10px" }}
        />
      </g>
    </svg>
  </div>
);

// -------------------------------------------------------
// ICONS
// -------------------------------------------------------
const BackChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const PlayIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 16 16" fill={color} className="w-3 h-3">
    <polygon points="5,3 13,8 5,13" />
  </svg>
);

const BrainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-1.7-4.31 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.5-4.65A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 1.7-4.31 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.5-4.65A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

const CheckDoubleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#C026D3" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="20 6 9 17 4 12" />
    <polyline points="24 6 13 17" opacity="0.4" />
  </svg>
);

const HourglassIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <path d="M5 22h14" /><path d="M5 2h14" />
    <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
    <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
  </svg>
);

// -------------------------------------------------------
// CARD DATA
// -------------------------------------------------------
const cards = [
  {
    title: "Guided Breathing",
    subtitle: "Breathing exercise",
    gradFrom: "#F9A8D4",
    gradTo: "#DB2777",
    badge: "FREE",
    face: <GuidedBreathingFace />,
  },
  {
    title: "Guided Meditation",
    subtitle: "Mindfulness",
    gradFrom: "#A78BFA",
    gradTo: "#7C3AED",
    badge: "FREE",
    face: <MeditationFace />,
  },
  {
    title: "Reframe Thoughts",
    subtitle: "Transform negative to positive",
    gradFrom: "#818CF8",
    gradTo: "#4F46E5",
    badge: null,
    face: <RewiringFace />,
  },
];

// -------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------
export default function CognitiveAppMockup() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const t = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(t);
  }, []);

  const fmt = (d: Date) => d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: false });

  return (
    <div className="w-full h-full flex flex-col font-sans select-none overflow-hidden relative" style={{ background: "linear-gradient(180deg, #FAF5FF 0%, #FFF 40%, #FFF 100%)" }}>

      {/* ── Status Bar ── */}
      <div
        className="absolute left-0 right-0 z-50 flex items-center justify-between"
        style={{ top: 0, height: 44, padding: "0 18px", background: "rgba(250,245,255,0.95)" }}
      >
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#4A3831", letterSpacing: "-0.2px" }}>{fmt(time)}</span>
        <div className="flex items-center gap-1.5">
          <svg viewBox="0 0 17 12" fill="#4A3831" style={{ width: 15, height: 11 }}>
            <rect x="0" y="8" width="3" height="4" rx="0.5" />
            <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" />
            <rect x="9" y="3" width="3" height="9" rx="0.5" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3" />
          </svg>
          <svg viewBox="0 0 16 12" fill="none" stroke="#4A3831" strokeWidth="1.4" strokeLinecap="round" style={{ width: 15, height: 11 }}>
            <path d="M8 10.5 L8 10.51" strokeWidth="2" />
            <path d="M5 7.8 Q8 5.5 11 7.8" />
            <path d="M2.5 5.3 Q8 1.5 13.5 5.3" />
          </svg>
          <div className="flex items-center gap-[1px]">
            <div style={{ width: 19, height: 10, borderRadius: 2.5, border: "1.5px solid #4A3831", padding: "1.5px" }}>
              <div style={{ width: "82%", height: "100%", background: "#4A3831", borderRadius: 1 }} />
            </div>
            <div style={{ width: 1.5, height: 5, background: "#4A3831", borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* ── Fixed Frosted Glass Header ── */}
      <div
        className="absolute left-0 right-0 z-40 flex flex-row items-center justify-between"
        style={{
          top: 44,
          height: 52,
          padding: "0 16px",
          background: "rgba(250,245,255,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(0,0,0,0.04)",
        }}
      >
        {/* Back button */}
        <div style={{ width: 30, height: 30, borderRadius: 10, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(0,0,0,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: "#581C87" }}>
          <BackChevron />
        </div>
        <span style={{ fontSize: "15px", fontWeight: 700, color: "#581C87", letterSpacing: "-0.3px" }}>Cognitive Therapy</span>
        <div style={{ width: 30 }} />
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className={`absolute left-0 right-0 flex flex-col ${mounted ? "animate-cognitive-pan" : "opacity-0"}`}
          style={{ top: 44 + 52 + 12, padding: "0 14px", gap: 10 }}
        >
          {/* Subtitle */}
          <p style={{ fontSize: "12px", color: "#6B7280", textAlign: "center", lineHeight: 1.4 }}>
            Strengthen your mind and focus with daily exercises.
          </p>

          {/* Practice Cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {cards.map((card) => (
              <div key={card.title} className="relative rounded-[20px] overflow-visible" style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                {/* FREE badge */}
                {card.badge && (
                  <div
                    className="absolute z-10"
                    style={{
                      top: -6, right: -6,
                      background: "#10B981",
                      paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3,
                      borderRadius: 10,
                      boxShadow: "0 3px 5px rgba(0,0,0,0.25)",
                    }}
                  >
                    <span style={{ color: "#FFF", fontSize: "8px", fontWeight: 900, textTransform: "uppercase" }}>{card.badge}</span>
                  </div>
                )}

                {/* Gradient card */}
                <div
                  className="rounded-[20px] overflow-hidden relative"
                  style={{
                    background: `linear-gradient(135deg, ${card.gradFrom}, ${card.gradTo})`,
                    height: 110,
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {/* Decorative bubble top-right */}
                  <div style={{ position: "absolute", top: -16, right: -16, width: 68, height: 68, borderRadius: "50%", background: "rgba(255,255,255,0.18)" }} />
                  {/* Decorative bubble bottom-left */}
                  <div style={{ position: "absolute", bottom: 8, left: 8, width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />

                  {/* Text + face row */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
                    <div>
                      <div style={{ fontSize: "16px", fontWeight: 700, color: "#FFF", letterSpacing: "-0.3px", lineHeight: 1.2 }}>{card.title}</div>
                      <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.9)", fontWeight: 500, marginTop: 2 }}>{card.subtitle}</div>
                    </div>
                    {/* Face icon — absolute bottom-right, clipped partially */}
                    <div style={{ position: "absolute", bottom: -36, right: -14, width: 72, height: 72, transform: "rotate(-10deg) scale(1.1)", opacity: 0.92, zIndex: 0 }}>
                      {card.face}
                    </div>
                  </div>

                  {/* Start button */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      background: "#FFF",
                      paddingLeft: 12,
                      paddingRight: 14,
                      paddingTop: 5,
                      paddingBottom: 5,
                      borderRadius: 16,
                      alignSelf: "flex-start",
                      marginTop: "auto",
                      position: "relative",
                      zIndex: 2,
                    }}
                  >
                    <PlayIcon color={card.gradTo} />
                    <span style={{ fontSize: "11px", fontWeight: 700, color: card.gradTo }}>Start</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Stats Dashboard */}
          <div
            className="rounded-[20px] p-4"
            style={{
              background: "linear-gradient(135deg, #FAF5FF, #F3E8FF)",
              border: "1px solid #E9D5FF",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              marginTop: 4,
            }}
          >
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div>
                <div style={{ fontSize: "15px", fontWeight: 700, color: "#581C87", letterSpacing: "-0.3px" }}>Your Progress</div>
                <div style={{ fontSize: "10px", color: "#6B7280", marginTop: 1 }}>Stay focused and calm.</div>
              </div>
              {/* Focused badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 4, background: "#F3E8FF", border: "1px solid #D8B4FE", paddingLeft: 8, paddingRight: 8, paddingTop: 3, paddingBottom: 3, borderRadius: 10 }}>
                <BrainIcon />
                <span style={{ fontSize: "10px", fontWeight: 700, color: "#6D28D9" }}>Focused</span>
              </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              {/* Sessions done */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#FAE8FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckDoubleIcon />
                </div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#581C87", lineHeight: 1.1 }}>11</div>
                  <div style={{ fontSize: "9px", color: "#9CA3AF", fontWeight: 500, marginTop: 1 }}>sessions done</div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 28, background: "#E5E7EB", margin: "0 10px" }} />

              {/* Mindful minutes */}
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: "#DDD6FE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <HourglassIcon />
                </div>
                <div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#581C87", lineHeight: 1.1 }}>4m</div>
                  <div style={{ fontSize: "9px", color: "#9CA3AF", fontWeight: 500, marginTop: 1 }}>mindful minutes</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ height: 60, flexShrink: 0 }} />
        </div>
      </div>

      <style>{`
        /* Content scroll animation */
        @keyframes cognitive-pan {
          0%, 10%  { transform: translateY(0px); }
          28%, 75% { transform: translateY(-160px); }
          92%, 100% { transform: translateY(0px); }
        }
        .animate-cognitive-pan { animation: cognitive-pan 16s cubic-bezier(0.45,0,0.55,1) infinite; }

        /* GuidedBreathingFace: eyes bob up */
        @keyframes gb-eyes {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-1.5px); }
        }
        .animate-gb-eyes { animation: gb-eyes 3.5s ease-in-out infinite; }

        /* GuidedBreathingFace: breath streams fade out/in */
        @keyframes gb-breath {
          0%, 30%  { opacity: 0; }
          50%, 80% { opacity: 1; }
          100%     { opacity: 0; }
        }
        .animate-gb-breath { animation: gb-breath 3.5s ease-in-out infinite; }

        /* MeditationFace: pulsing halo rings */
        @keyframes med-ring {
          0%   { transform: scale(0.2) translateY(-32%); opacity: 0.6; }
          100% { transform: scale(3) translateY(-10%);  opacity: 0; }
        }
        .animate-med-ring    { animation: med-ring 3.5s ease-out infinite; }
        .animate-med-ring-d0 { animation-delay: 0s; }
        .animate-med-ring-d1 { animation-delay: 1s; }
        .animate-med-ring-d2 { animation-delay: 2s; }

        /* RewiringFace: eye blink */
        @keyframes rew-blink {
          0%, 88%, 100% { transform: scaleY(1); }
          92%           { transform: scaleY(0.08); }
        }
        .animate-rew-blink { animation: rew-blink 4s infinite; }

        /* RewiringFace: spiral rotation */
        @keyframes rew-spiral {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-rew-spiral { animation: rew-spiral 3s linear infinite; }
      `}</style>
    </div>
  );
}
