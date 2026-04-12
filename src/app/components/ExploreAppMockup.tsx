"use client";
import React, { useEffect, useState } from "react";

// -------------------------------------------------------
// FACES: Exact ports of the mobile app's SVG assets
// -------------------------------------------------------

/**
 * ReaderFace — ported from mood-check/ReaderFace.tsx
 * Green circle bg, white goggle rings, red-brown pupils, white mask, green stripes
 */
const ReaderFace = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    {/* Green background circle */}
    <path fill="#66BB6A" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24" />
    {/* Skin face */}
    <path fill="#FFCCBC" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
    {/* White goggle lenses */}
    <circle cx="16.8" cy="24" r="7.2" fill="#FFF" />
    <circle cx="31.2" cy="24" r="7.2" fill="#FFF" />
    {/* Red-brown pupils */}
    <circle cx="16.8" cy="26" r="2.5" fill="#BF360C" />
    <circle cx="31.2" cy="26" r="2.5" fill="#BF360C" />
    {/* Green goggle frames */}
    <g stroke="#1B5E20" strokeWidth="4" fill="none" strokeLinecap="round">
      <circle cx="16.8" cy="24" r="8" />
      <circle cx="31.2" cy="24" r="8" />
      <path d="M24.8 24h-1.6M8.8 24H4M39.2 24H44" />
    </g>
    {/* White mask */}
    <path fill="#FFF" d="M14 36h20l-2 12H16z" />
    {/* Green stripes on mask */}
    <path stroke="#1B5E20" strokeWidth="1.5" strokeLinecap="round" d="M18 40h12" />
    <path stroke="#1B5E20" strokeWidth="1.5" strokeLinecap="round" d="M18 44h10" />
    {/* Peach cheek dot */}
    <circle cx="32" cy="42" r="3" fill="#FFAB91" />
  </svg>
);

/**
 * MovieFace — ported from sw-faces/MovieFace.tsx
 * Purple circle bg, skin face, white band 3D glasses (red+blue lenses), surprised mouth
 */
const MovieFace = () => (
  <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
    <defs>
      <clipPath id="movieFaceClip">
        <circle cx="24" cy="24" r="24" />
      </clipPath>
      <clipPath id="movieLensClip">
        <rect x="12" y="20" width="10" height="6" rx="1" />
        <rect x="26" y="20" width="10" height="6" rx="1" />
      </clipPath>
    </defs>
    {/* Purple background */}
    <circle cx="24" cy="24" r="24" fill="#5200B7" />
    <g clipPath="url(#movieFaceClip)">
      {/* Shadow under face */}
      <path fill="#000" opacity="0.1" transform="translate(4, 4)" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
      {/* Skin face */}
      <path fill="#FFDABF" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
      {/* 3D Glasses band (white) */}
      <g transform="translate(0, -2)">
        <path fill="#FFF" d="M8 20 H 40 V 28 H 8 Z" />
        {/* Red left lens */}
        <rect x="12" y="22" width="10" height="6" rx="1" fill="#FF4040" opacity="0.9" />
        {/* Blue right lens */}
        <rect x="26" y="22" width="10" height="6" rx="1" fill="#4047FF" opacity="0.9" />
        {/* Glare sheen — simple static half */}
        <path d="M14 21 L 16 21 L 14 27 L 12 27 Z" fill="#FFF" opacity="0.5" />
        <path d="M28 21 L 30 21 L 28 27 L 26 27 Z" fill="#FFF" opacity="0.5" />
        {/* Arms of glasses */}
        <path stroke="#FFF" strokeWidth="2" strokeLinecap="round" d="M8 24 L 4 22" />
        <path stroke="#FFF" strokeWidth="2" strokeLinecap="round" d="M40 24 L 44 22" />
      </g>
      {/* Surprised mouth circle */}
      <circle cx="24" cy="36" r="2.5" stroke="#111215" strokeWidth="1.8" fill="none" />
    </g>
  </svg>
);

// -------------------------------------------------------
// NAV ICONS
// -------------------------------------------------------
const Home = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-300">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const LayoutGrid = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] text-white">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const Users = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-slate-300">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);
const SettingsIcon = () => (
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
// JUMP IN CARD — reusable, enforces identical layout
// -------------------------------------------------------
interface JumpInCardProps {
  subtitle: string;
  title: string;
  badge: string;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
  face: React.ReactNode;
}

const JumpInCard = ({ subtitle, title, badge, gradientFrom, gradientTo, shadowColor, face }: JumpInCardProps) => (
  <div
    className="w-[48%] rounded-[20px] overflow-hidden relative"
    style={{
      background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
      boxShadow: `0 6px 16px -2px ${shadowColor}`,
      aspectRatio: "0.9",
    }}
  >
    {/* Content area */}
    <div className="absolute inset-0 p-3.5 flex flex-col gap-1">
      {/* Row 1: label + badge */}
      <div className="flex items-start justify-between">
        <span
          style={{
            fontSize: "8px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(0,0,0,0.45)",
            lineHeight: 1.2,
          }}
        >
          {subtitle}
        </span>
        <span
          style={{
            fontSize: "8px",
            fontWeight: 700,
            background: "rgba(255,255,255,0.45)",
            borderRadius: "5px",
            padding: "2px 5px",
            color: "rgba(0,0,0,0.55)",
            whiteSpace: "nowrap",
            lineHeight: 1.3,
          }}
        >
          {badge}
        </span>
      </div>

      {/* Row 2: title */}
      <span
        style={{
          fontSize: "18px",
          fontWeight: 700,
          color: "rgba(0,0,0,0.75)",
          lineHeight: 1.15,
          letterSpacing: "-0.3px",
        }}
      >
        {title}
      </span>
    </div>

    {/* Face — bottom-right, partially cut by card overflow-hidden */}
    <div
      className="absolute"
      style={{ bottom: "-4px", right: "-4px", width: "60px", height: "60px" }}
    >
      {face}
    </div>
  </div>
);

// -------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------
export default function ExploreAppMockup() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setTime(new Date()), 10000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit", hour12: false });

  return (
    <div className="w-full h-full bg-[#FCF8F5] flex flex-col font-sans relative select-none overflow-hidden">
      {/* Status Bar */}
      <div className="w-full pt-6 pb-3 px-5 flex justify-between items-center shrink-0 absolute top-0 z-40">
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#4A3831" }}>{formatTime(time)}</span>
        <div style={{ width: 16, height: 8, borderRadius: 2, border: "1px solid #4A3831", padding: 1 }}>
          <div style={{ width: "80%", height: "100%", background: "#4A3831", borderRadius: 1 }} />
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-hidden relative" style={{ paddingTop: 56 }}>
        <div
          className={`absolute inset-0 flex flex-col gap-5 px-4 ${mounted ? "animate-app-pan" : "opacity-0"}`}
          style={{ top: 16 }}
        >

          {/* Header */}
          <div>
            <h1 style={{ fontSize: "22px", fontWeight: 700, color: "#4A3831", letterSpacing: "-0.4px", lineHeight: 1.1 }}>
              Explore
            </h1>
            <p style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 500, marginTop: 2 }}>
              Discover new ways to improve your speech.
            </p>
          </div>

          {/* Weekly Update Card */}
          <div
            className="w-full rounded-[20px] p-4 flex flex-col shrink-0 overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, #FF7E69, #FF9E5E)",
              boxShadow: "0 10px 24px -4px rgba(255,126,105,0.3)",
            }}
          >
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/5 -translate-x-6 -translate-y-12" />
            <p style={{ fontSize: "8px", fontWeight: 800, letterSpacing: "0.2em", color: "rgba(255,255,255,0.9)", textTransform: "uppercase", marginBottom: 14 }}>
              Weekly Update
            </p>
            <div className="flex justify-between items-end mb-4" style={{ height: 72 }}>
              {["M","T","W","T","F","S","S"].map((day, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <div className="rounded-full bg-white/20 overflow-hidden ring-1 ring-white/10 relative" style={{ width: 11, height: 52 }}>
                    {i === 1 && <div className="absolute bottom-0 w-full bg-white" style={{ height: "60%", boxShadow: "0 0 6px white" }} />}
                  </div>
                  <span style={{ fontSize: "8px", fontWeight: 700, color: i === 1 ? "white" : "rgba(255,255,255,0.55)" }}>{day}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2.5">
              <div className="flex-1 rounded-2xl p-2.5 flex flex-col gap-1" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div className="flex items-center gap-1"><Flame /><span style={{ fontSize: "15px", fontWeight: 800, color: "white" }}>1</span></div>
                <span style={{ fontSize: "8px", fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Days Active</span>
              </div>
              <div className="flex-1 rounded-2xl p-2.5 flex flex-col gap-1" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <span style={{ fontSize: "15px", fontWeight: 800, color: "white" }}>3m</span>
                <span style={{ fontSize: "8px", fontWeight: 700, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Total</span>
              </div>
            </div>
          </div>

          {/* Jump In */}
          <div className="flex flex-col gap-3">
            <h2 style={{ fontSize: "16px", fontWeight: 700, color: "#4A3831", letterSpacing: "-0.2px" }}>Jump In</h2>
            <div className="flex gap-3">
              <JumpInCard
                subtitle="Fluency"
                title="Reading"
                badge="8 Done"
                gradientFrom="#FFD8B5"
                gradientTo="#FFAB76"
                shadowColor="rgba(255,171,118,0.3)"
                face={<ReaderFace />}
              />
              <JumpInCard
                subtitle="Expression"
                title="Fun"
                badge="7 Done"
                gradientFrom="#CBF0F0"
                gradientTo="#98E6E6"
                shadowColor="rgba(152,230,230,0.3)"
                face={<MovieFace />}
              />
            </div>
          </div>

          <div style={{ height: 120, flexShrink: 0 }} />
        </div>
      </div>

      {/* Bottom Dock */}
      <div className="absolute bottom-5 left-4 right-4 z-40">
        <div className="bg-white rounded-full flex items-center justify-between" style={{ height: 52, padding: "5px 6px", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}>
          <div className="flex-1 flex justify-center"><Home /></div>
          <div className="flex items-center gap-1.5 px-4 rounded-full" style={{ background: "#F98050", height: "100%", boxShadow: "0 4px 10px rgba(249,128,80,0.35)" }}>
            <LayoutGrid />
            <span style={{ fontSize: "12px", fontWeight: 700, color: "white" }}>Explore</span>
          </div>
          <div className="flex-1 flex justify-center"><Users /></div>
          <div className="flex-1 flex justify-center"><SettingsIcon /></div>
        </div>
      </div>

      <style>{`
        @keyframes pan-scroll {
          0%, 12%  { transform: translateY(0px); }
          30%, 78% { transform: translateY(-185px); }
          94%, 100% { transform: translateY(0px); }
        }
        .animate-app-pan {
          animation: pan-scroll 18s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
      `}</style>
    </div>
  );
}
