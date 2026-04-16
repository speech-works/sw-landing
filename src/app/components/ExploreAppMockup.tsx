"use client";
import React, { useEffect, useState } from "react";

// -------------------------------------------------------
// FACES — exact SVG geometry ported from the mobile repo
// Animations are CSS keyframe equivalents of Reanimated logic
// -------------------------------------------------------

/** ReaderFace — mood-check/ReaderFace.tsx */
const ReaderFace = () => (
  <div className="w-full h-full rounded-full overflow-hidden">
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path fill="#66BB6A" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24" />
      <path fill="#FFCCBC" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
      {/* White goggle lenses */}
      <circle cx="16.8" cy="24" r="7.2" fill="#FFF" />
      <circle cx="31.2" cy="24" r="7.2" fill="#FFF" />
      {/* Red-brown pupils — animated side-to-side */}
      <circle cx="16.8" cy="26" r="2.5" fill="#BF360C" className="animate-reader-pupils" />
      <circle cx="31.2" cy="26" r="2.5" fill="#BF360C" className="animate-reader-pupils" />
      {/* Green goggle frames */}
      <g stroke="#1B5E20" strokeWidth="4" fill="none" strokeLinecap="round">
        <circle cx="16.8" cy="24" r="8" />
        <circle cx="31.2" cy="24" r="8" />
        <path d="M24.8 24h-1.6M8.8 24H4M39.2 24H44" />
      </g>
      {/* White mask */}
      <path fill="#FFF" d="M14 36h20l-2 12H16z" />
      {/* Green stripes — animated slide */}
      <path stroke="#1B5E20" strokeWidth="1.5" strokeLinecap="round" d="M18 40h12" className="animate-reader-text" />
      <path stroke="#1B5E20" strokeWidth="1.5" strokeLinecap="round" d="M18 44h10" className="animate-reader-text" />
      {/* Peach cheek dot */}
      <circle cx="32" cy="42" r="3" fill="#FFAB91" />
    </svg>
  </div>
);

/** MovieFace — sw-faces/MovieFace.tsx */
const MovieFace = () => (
  <div className="w-full h-full rounded-full overflow-hidden">
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <clipPath id="mfClip"><circle cx="24" cy="24" r="24" /></clipPath>
        <clipPath id="mfLens">
          <rect x="12" y="20" width="10" height="6" rx="1" />
          <rect x="26" y="20" width="10" height="6" rx="1" />
        </clipPath>
      </defs>
      <circle cx="24" cy="24" r="24" fill="#5200B7" />
      <g clipPath="url(#mfClip)">
        <path fill="#000" opacity="0.1" transform="translate(4,4)" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
        <path fill="#FFDABF" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
        <g transform="translate(0,-2)">
          <path fill="#FFF" d="M8 20 H 40 V 28 H 8 Z" />
          <rect x="12" y="22" width="10" height="6" rx="1" fill="#FF4040" opacity="0.9" />
          <rect x="26" y="22" width="10" height="6" rx="1" fill="#4047FF" opacity="0.9" />
          {/* Glare sheen animated */}
          <g clipPath="url(#mfLens)">
            <path d="M14 21 L17 21 L15 29 L12 29 Z" fill="#FFF" opacity="0.6" className="animate-glare-slide" />
            <path d="M28 21 L31 21 L29 29 L26 29 Z" fill="#FFF" opacity="0.6" className="animate-glare-slide" />
          </g>
          <path stroke="#FFF" strokeWidth="2" strokeLinecap="round" d="M8 24 L4 22" />
          <path stroke="#FFF" strokeWidth="2" strokeLinecap="round" d="M40 24 L44 22" />
        </g>
        <circle cx="24" cy="36" r="2.5" stroke="#111215" strokeWidth="1.8" fill="none" />
      </g>
    </svg>
  </div>
);

/** BreathingFace — sw-faces/BreathingFace.tsx */
const BreathingFace = () => (
  <div className="w-full h-full rounded-full overflow-hidden">
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path fill="#BFC2FF" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24" />
      <path d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" fill="#000" opacity="0.15" transform="translate(1,1)" />
      <path fill="#FFDABF" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
      {/* Closed happy eyes — animated up/down with breathing */}
      <g className="animate-breathing-eyes">
        <path stroke="#000340" strokeWidth="2.5" strokeLinecap="round" d="M14 24 Q18 26, 22 24" fill="none" />
        <path stroke="#000340" strokeWidth="2.5" strokeLinecap="round" d="M26 24 Q30 26, 34 24" fill="none" />
      </g>
      {/* Small mouth */}
      <path stroke="#000340" strokeWidth="2.5" strokeLinecap="round" d="M22 34 Q24 35, 26 34" fill="none" />
      {/* Breath particles — animated scale + fade */}
      <path stroke="#4047FF" strokeWidth="2" strokeLinecap="round" fill="none" d="M30 34 C34 32, 36 36, 34 38" className="animate-breath-puff" />
      <path stroke="#4047FF" strokeWidth="2" strokeLinecap="round" fill="none" d="M32 36 C36 34, 40 38, 38 42" className="animate-breath-puff animate-breath-puff-delay" />
    </svg>
  </div>
);

/** WarriorFace — mood-check/WarriorFace.tsx */
const WarriorFace = () => (
  <div className="w-full h-full rounded-full overflow-hidden">
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <path fill="#FF7043" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24" />
      <path fill="#FFCCBC" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
      {/* Red bandana */}
      <path fill="#D32F2F" d="M5 14h39v6H5z" />
      {/* Bandana knot ties — animated */}
      <path stroke="#D32F2F" strokeWidth="3" d="M42 16l4-4" className="animate-warrior-knot-upper" />
      <path stroke="#D32F2F" strokeWidth="3" d="M42 18l4 4" className="animate-warrior-knot-lower" />
      {/* White eye whites */}
      <circle cx="16.8" cy="24" r="7.2" fill="#FFF" />
      <circle cx="31.2" cy="24" r="7.2" fill="#FFF" />
      {/* Dark pupils */}
      <circle cx="16.8" cy="24.32" r="4.32" fill="#3E2723" />
      <circle cx="31.2" cy="24.32" r="4.32" fill="#3E2723" />
      {/* Angry eyebrows — animated */}
      <g className="animate-warrior-brows">
        <path stroke="#3E2723" strokeWidth="3" strokeLinecap="round" d="M12 13l8 3M36 13l-8 3" />
      </g>
      {/* Straight determined mouth */}
      <path stroke="#3E2723" strokeWidth="3" strokeLinecap="round" d="M20 34h8" />
    </svg>
  </div>
);

// -------------------------------------------------------
// NAV ICONS
// -------------------------------------------------------
const NavHome = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-300">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const NavGrid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px] text-white">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const NavUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-300">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const NavSettings = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-300">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const Flame = () => (
  <svg viewBox="0 0 24 24" fill="white" stroke="none" className="w-3.5 h-3.5">
    <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
  </svg>
);

// -------------------------------------------------------
// JUMP IN CARD — shared component for identical layout
// -------------------------------------------------------
interface JumpInCardProps {
  subtitle: string;
  title: string;
  badge: string;
  from: string;
  to: string;
  shadow: string;
  face: React.ReactNode;
}

const JumpInCard = ({ subtitle, title, badge, from, to, shadow, face }: JumpInCardProps) => (
  <div
    className="rounded-[20px] overflow-hidden relative"
    style={{
      width: "calc(50% - 6px)",
      aspectRatio: "0.88",
      background: `linear-gradient(135deg, ${from}, ${to})`,
      boxShadow: `0 5px 14px -2px ${shadow}`,
    }}
  >
    {/* Text content */}
    <div className="absolute inset-0 p-3 flex flex-col">
      {/* Row: subtitle + badge */}
      <div className="flex items-start justify-between mb-1">
        <span style={{ fontSize: "8px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", lineHeight: 1.2 }}>
          {subtitle}
        </span>
        <span style={{ fontSize: "8px", fontWeight: 700, background: "rgba(255,255,255,0.5)", borderRadius: "5px", padding: "2px 5px", color: "rgba(0,0,0,0.5)", whiteSpace: "nowrap", lineHeight: 1.3 }}>
          {badge}
        </span>
      </div>
      {/* Title */}
      <span style={{ fontSize: "18px", fontWeight: 700, color: "rgba(0,0,0,0.72)", letterSpacing: "-0.3px", lineHeight: 1.1 }}>
        {title}
      </span>
    </div>

    {/* Face — bottom-right, clipped by overflow-hidden */}
    <div className="absolute" style={{ bottom: 0, right: 0, width: 60, height: 60 }}>
      {face}
    </div>
  </div>
);

// -------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------
export default function ExploreAppMockup({
  animateContent = true,
  syncTime = true,
}: {
  animateContent?: boolean;
  syncTime?: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    if (!syncTime) return;
    const timer = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, [syncTime]);

  const fmt = (d: Date) => {
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const cards = [
    { subtitle: "Fluency",    title: "Reading",   badge: "8 Done",  from: "#FFD8B5", to: "#FFAB76", shadow: "rgba(255,171,118,0.35)", face: <ReaderFace /> },
    { subtitle: "Expression", title: "Fun",        badge: "7 Done",  from: "#CBF0F0", to: "#98E6E6", shadow: "rgba(152,230,230,0.35)", face: <MovieFace /> },
    { subtitle: "Focus",      title: "Cognitive",  badge: "5 Done",  from: "#EBCBF5", to: "#D8A7F0", shadow: "rgba(216,167,240,0.35)", face: <BreathingFace /> },
    { subtitle: "Courage",    title: "Exposure",   badge: "3 Done",  from: "#FFC8C8", to: "#FF9E9E", shadow: "rgba(255,158,158,0.35)", face: <WarriorFace /> },
  ];

  // Fixed header height constants
  const STATUS_H = 54;
  const HEADER_H = 64;
  const FIXED_TOP = STATUS_H + HEADER_H;

  return (
    <div
      className={`w-full h-full bg-[#FCF8F5] flex flex-col font-sans relative select-none overflow-hidden ${
        animateContent ? "" : "explore-static"
      }`}
    >

      {/* ── Fixed Status Bar ─────────────────────────────── */}
      <div
        className="absolute left-0 right-0 z-50 flex items-center justify-between"
        style={{ top: 0, height: STATUS_H, padding: "4px 24px 0", background: "#FCF8F5" }}
      >
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#4A3831", letterSpacing: "-0.2px" }}>
          {mounted ? fmt(time) : "09:41"}
        </span>
        {/* Status icons */}
        <div className="flex items-center gap-1.5">
          {/* Signal bars */}
          <svg viewBox="0 0 17 12" fill="#4A3831" style={{ width: 15, height: 11 }}>
            <rect x="0" y="8" width="3" height="4" rx="0.5" />
            <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" />
            <rect x="9" y="3" width="3" height="9" rx="0.5" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3" />
          </svg>
          {/* WiFi */}
          <svg viewBox="0 0 16 12" fill="none" stroke="#4A3831" strokeWidth="1.4" strokeLinecap="round" style={{ width: 15, height: 11 }}>
            <path d="M8 10.5 L8 10.51" strokeWidth="2" />
            <path d="M5 7.8 Q8 5.5 11 7.8" fill="none" />
            <path d="M2.5 5.3 Q8 1.5 13.5 5.3" fill="none" />
          </svg>
          {/* Battery */}
          <div className="flex items-center gap-[1px]">
            <div style={{ width: 19, height: 10, borderRadius: 2.5, border: "1.5px solid #4A3831", padding: "1.5px" }}>
              <div style={{ width: "82%", height: "100%", background: "#4A3831", borderRadius: 1 }} />
            </div>
            <div style={{ width: 1.5, height: 5, background: "#4A3831", borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* ── Fixed Frosted Glass Header (Explore title) ─── */}
      <div
        className="absolute left-0 right-0 z-40"
        style={{
          top: STATUS_H,
          height: HEADER_H,
          background: "rgba(252,248,245,0.85)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(0,0,0,0.04)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 16px 10px",
        }}
      >
        <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#4A3831", letterSpacing: "-0.4px", lineHeight: 1.1 }}>Explore</h1>
        <p style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 500, marginTop: 2 }}>Discover new ways to improve your speech.</p>
      </div>

      {/* ── Scrollable Content (pans under the fixed header) */}
      <div className="flex-1 overflow-hidden relative">
        <div
          className={`absolute left-0 right-0 flex flex-col ${
            mounted
              ? animateContent
                ? "animate-app-pan"
                : "opacity-100"
              : "opacity-0"
          }`}
          style={{ top: FIXED_TOP + 16, gap: 16, padding: "0 16px" }}
        >

          {/* Weekly Update Card */}
          <div
            className="w-full rounded-[20px] p-4 flex flex-col shrink-0 overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #FF7E69, #FF9E5E)", boxShadow: "0 10px 24px -4px rgba(255,126,105,0.3)" }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-x-6 -translate-y-12" />
            <p style={{ fontSize: "8px", fontWeight: 800, letterSpacing: "0.2em", color: "rgba(255,255,255,0.9)", textTransform: "uppercase", marginBottom: 12 }}>Weekly Update</p>
            <div className="flex justify-between items-end mb-4" style={{ height: 68 }}>
              {[
                { day: "M", h: 55 },
                { day: "T", h: 80 },
                { day: "W", h: 65 },
                { day: "T", h: 70 },
                { day: "F", h: 45 },
                { day: "S", h: 0  },
                { day: "S", h: 0  },
              ].map(({ day, h }, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="rounded-full bg-white/20 overflow-hidden ring-1 ring-white/10 relative" style={{ width: 11, height: 48 }}>
                    {h > 0 && <div className="absolute bottom-0 w-full bg-white" style={{ height: `${h}%`, boxShadow: i === 1 ? "0 0 6px white" : "none" }} />}
                  </div>
                  <span style={{ fontSize: "8px", fontWeight: 700, color: h > 0 ? "white" : "rgba(255,255,255,0.4)" }}>{day}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5">
              {[{ icon: <Flame />, val: "5", label: "Days Active" }, { val: "47m", label: "Total" }].map((w, i) => (
                <div key={i} className="flex-1 rounded-2xl p-2.5 flex flex-col gap-0.5" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <div className="flex items-center gap-1">{w.icon}<span style={{ fontSize: "15px", fontWeight: 800, color: "white" }}>{w.val}</span></div>
                  <span style={{ fontSize: "7.5px", fontWeight: 700, color: "rgba(255,255,255,0.65)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{w.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Jump In */}
          <div className="flex flex-col" style={{ gap: 10 }}>
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#4A3831", letterSpacing: "-0.2px" }}>Jump In</h2>
            <div className="flex flex-wrap" style={{ gap: 12 }}>
              {cards.map((c) => (
                <JumpInCard key={c.title} {...c} />
              ))}
            </div>
          </div>

          <div style={{ height: 120, flexShrink: 0 }} />
        </div>
      </div>

      {/* Bottom Dock */}
      <div className="absolute bottom-5 left-4 right-4 z-40">
        <div className="bg-white rounded-full flex items-center justify-between" style={{ height: 52, padding: "5px 6px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          <div className="flex-1 flex justify-center"><NavHome /></div>
          <div className="flex items-center gap-1.5 px-4 rounded-full" style={{ background: "#F98050", height: "100%", boxShadow: "0 4px 10px rgba(249,128,80,0.35)" }}>
            <NavGrid />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>Explore</span>
          </div>
          <div className="flex-1 flex justify-center"><NavUsers /></div>
          <div className="flex-1 flex justify-center"><NavSettings /></div>
        </div>
      </div>

      <style>{`
        /* ---- App Scroll ---- */
        @keyframes pan-scroll {
          0%, 12%  { transform: translateY(0px); }
          30%, 78% { transform: translateY(-200px); }
          94%, 100% { transform: translateY(0px); }
        }
        .animate-app-pan { animation: pan-scroll 18s cubic-bezier(0.45,0,0.55,1) infinite; }

        /* ---- ReaderFace: pupils slide left-right ---- */
        @keyframes reader-pupils {
          0%, 20%   { transform: translateX(0); }
          40%       { transform: translateX(-1.8px); }
          60%       { transform: translateX(1.5px); }
          80%, 100% { transform: translateX(0); }
        }
        .animate-reader-pupils { animation: reader-pupils 3s ease-in-out infinite; }

        /* ---- ReaderFace: mask text slides ---- */
        @keyframes reader-text {
          0%, 30%   { transform: translateX(0); }
          55%       { transform: translateX(3px); }
          80%, 100% { transform: translateX(0); }
        }
        .animate-reader-text { animation: reader-text 3s ease-in-out infinite; }

        /* ---- MovieFace: glare sheen ---- */
        @keyframes glare-slide {
          0%, 60%  { transform: translateX(-26px); opacity: 0; }
          72%, 78% { opacity: 0.65; }
          88%, 100% { transform: translateX(26px); opacity: 0; }
        }
        .animate-glare-slide { animation: glare-slide 3s ease-in-out infinite; }

        /* ---- BreathingFace: eyes bob with breathing ---- */
        @keyframes breathing-eyes {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-1px); }
        }
        .animate-breathing-eyes { animation: breathing-eyes 3.5s ease-in-out infinite; }

        /* ---- BreathingFace: breath puff scale + fade ---- */
        @keyframes breath-puff {
          0%, 100% { transform: scale(0.2) rotate(0deg); opacity: 0.8; }
          50%      { transform: scale(1) rotate(20deg); opacity: 0; }
        }
        .animate-breath-puff       { animation: breath-puff 3.5s ease-in-out infinite; transform-origin: 32px 36px; }
        .animate-breath-puff-delay { animation-delay: 0.6s; }

        /* ---- WarriorFace: eyebrow pump ---- */
        @keyframes warrior-brows {
          0%, 40%, 100% { transform: translateY(0); }
          20%           { transform: translateY(2px); }
        }
        .animate-warrior-brows { animation: warrior-brows 1.2s ease-in-out infinite; }

        /* ---- WarriorFace: bandana knot flap ---- */
        @keyframes warrior-knot-upper {
          0%, 100% { transform-origin: 42px 16px; transform: rotate(0deg); }
          50%      { transform-origin: 42px 16px; transform: rotate(45deg); }
        }
        @keyframes warrior-knot-lower {
          0%, 100% { transform-origin: 42px 18px; transform: rotate(0deg); }
          50%      { transform-origin: 42px 18px; transform: rotate(-30deg); }
        }
        .animate-warrior-knot-upper { animation: warrior-knot-upper 1.2s ease-in-out infinite; }
        .animate-warrior-knot-lower { animation: warrior-knot-lower 1.2s ease-in-out infinite; }

        .explore-static [class*="animate-"] {
          animation: none !important;
        }
      `}</style>
    </div>
  );
}
