"use client";
import React, { useEffect, useState } from "react";

// -------------------------------------------------------
// FACES — ported from sw-faces/ in the mobile repo
// -------------------------------------------------------

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
      <path d="M0 0 H48 V48 H0 Z" fill="url(#gbNightSky)" />
      <circle cx="10" cy="10" r="0.5" fill="#FFF" opacity="0.8" />
      <circle cx="38" cy="8" r="0.4" fill="#FFF" opacity="0.6" />
      <circle cx="4" cy="20" r="0.3" fill="#FFF" opacity="0.5" />
      <circle cx="24" cy="22" r="14" fill="url(#gbMoonGlow)" />
      <circle cx="24" cy="22" r="6" fill="#FEF3C7" opacity="0.9" />
      <path fill="#020617" opacity="0.6" d="M0 48 V32 L4 36 L8 28 L12 34 L16 30 L22 40 L26 30 L30 36 L36 28 L40 34 L44 26 L48 32 V48 H0 Z" />
      <path fill="#0F172A" opacity="0.8" d="M0 48 V40 Q12 42, 24 41 Q36 40, 48 38 V48 H0 Z" />
      <path fill="#000" opacity="0.15" transform="translate(4,4)" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
      <path fill="#FFCCBC" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
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

// -------------------------------------------------------
// ICONS
// -------------------------------------------------------

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[180px] h-[180px] text-blue-200">
    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm.01 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// -------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------

export default function BreathingAppMockup({ showSheet = true }: { showSheet?: boolean }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full flex flex-col font-sans select-none overflow-hidden relative" style={{ background: "linear-gradient(135deg, #000000 0%, #020617 50%, #0F172A 100%)" }}>
      
      {/* ── Status Bar ── */}
      <div className="absolute top-0 left-0 right-0 h-[54px] pt-1 px-8 flex items-center justify-between z-50">
        <span className="text-[11px] font-bold text-white/90 letter-spacing-tight">22:35</span>
        <div className="flex items-center gap-1.5 opacity-90">
          <svg viewBox="0 0 17 12" fill="white" className="w-[15px] h-[11px]">
            <rect x="0" y="8" width="3" height="4" rx="0.5" />
            <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" />
            <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3" />
          </svg>
          <div className="w-[19px] h-[10px] border-[1.5px] border-white rounded-[2.5px] p-[1.5px] flex">
            <div className="w-[82%] h-full bg-white rounded-px" />
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        {/* Timer */}
        <div className="text-[#E2E8F0] text-2xl font-bold opacity-90 transition-all duration-700 mt-[-60px]" style={{ fontVariant: "tabular-nums" }}>
          00:53
        </div>

        {/* Breathing Halo Centerpiece - Shifted up for visibility above sheet */}
        <div className="relative w-48 h-48 flex items-center justify-center mt-4 mb-20 scale-110 translate-y-[-40px]">
          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-white/5 opacity-20 animate-pulse" />
          
          {/* Animated Halo Wrapper */}
          <div className="w-32 h-32 relative">
             <GuidedBreathingFace />
          </div>
        </div>
      </div>

      {/* ── Bottom Controls ── */}
      <div className="px-6 pb-24">
        <div className="w-full py-4 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
          <span className="text-[#F8FAFC] font-semibold text-sm tracking-tight text-center">End Session</span>
        </div>
      </div>

      {/* ── BOTTOM SHEET (The core of this task) ── */}
      {showSheet && (
        <div className="absolute inset-0 z-[60] flex flex-col justify-end overflow-hidden">
          {/* Backdrop (Darkens the main screen slightly, no blur to keep face sharp) */}
          <div className="absolute inset-0 bg-black/50" />

          {/* The Sheet */}
          <div className="relative bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE] rounded-t-[2.5rem] p-8 pb-12 shadow-2xl animate-sheet-slide-up">
            {/* Handle */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-1 bg-blue-900/10 rounded-full" />

            {/* Close Button */}
            <div className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm border border-blue-900/5 cursor-pointer">
              <XIcon />
            </div>

            {/* Watermark Clock Decoration */}
            <div className="absolute -left-12 -top-12 rotate-[15deg] opacity-[0.08] pointer-events-none">
              <ClockIcon />
            </div>

            {/* Content */}
            <div className="relative text-center space-y-4">
              <h3 className="text-[#1E3A8A] text-2xl font-bold tracking-tight mt-2">Finish early?</h3>
              <p className="text-[#1E3A8A] opacity-70 text-[14px] leading-[1.6] px-2 font-medium">
                We recommend at least 5 minutes of practice for the best results. Are you sure you want to end your session early?
              </p>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col gap-3.5">
              {/* End Session Button (Blue Gradient) */}
              <div className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 py-4.5 flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-98 transition-transform cursor-pointer overflow-hidden border border-blue-400/20">
                 <span className="text-white font-bold text-[16px]">End Session</span>
              </div>

              {/* Continue Practice Button (White Translucent) */}
              <div className="w-full rounded-2xl bg-white/50 py-4.5 flex items-center justify-center border border-blue-900/10 active:scale-98 transition-transform cursor-pointer">
                 <span className="text-[#1E3A8A] font-semibold text-[16px]">Continue Practice</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes gb-eyes {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-1.5px); }
        }
        .animate-gb-eyes { animation: gb-eyes 3.5s ease-in-out infinite; }

        @keyframes gb-breath {
          0%, 20%  { opacity: 0; transform: translateY(-2px) scale(0.8); }
          50%, 70% { opacity: 1; transform: translateY(0px) scale(1); }
          100%     { opacity: 0; transform: translateY(2px) scale(1.1); }
        }
        .animate-gb-breath { 
          animation: gb-breath 4s ease-in-out infinite;
          transform-origin: center top;
        }

        @keyframes sheet-slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-sheet-slide-up {
          animation: sheet-slide-up 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        .py-4\\.5 { padding-top: 1.125rem; padding-bottom: 1.125rem; }
      `}</style>
    </div>
  );
}
