"use client";
import React from "react";
import LiveAppMockup from "./LiveAppMockup";

interface RoadmapMockupProps {
  phase: number;
  status: "live" | "building" | "future";
  comingSoon?: boolean;
  isBlank?: boolean;
}

export default function RoadmapMockup({ phase, status, comingSoon = false, isBlank }: RoadmapMockupProps) {
  const themes = {
    1: { from: "from-[#F97316]", to: "to-[#EA580C]", accent: "#F97316" },
    2: { from: "from-purple-500", to: "to-purple-800", accent: "#8B5CF6" },
    3: { from: "from-emerald-500", to: "to-emerald-800", accent: "#10B981" },
  };
  const theme = themes[phase as keyof typeof themes] || themes[1];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* 
          PIXEL-PERFECT DEVICE FRAME 
          Everything is clipped at this level. Nothing can leak out.
      */}
      <div className="relative w-[325px] h-[660px] shadow-2xl transition-transform duration-700 hover:scale-[1.02] group/phone rounded-[3.5rem] ring-1 ring-white/10 origin-center">
        
        {/* External Titanium Chassis Ring (Synced with Hero) */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1a1a] via-[#3a3a3a] to-[#2a2a2a] rounded-[3.5rem] shadow-[inset_0_0_2px_rgba(255,255,255,0.2)]" />
        
        {/* 
            INNER BEZEL (Black Glass Edge)
            Synced with Hero section's 4px inset
        */}
        <div className="absolute inset-[4px] bg-black rounded-[3.25rem] shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] overflow-hidden isolate">
          
          {/* Dynamic Island (Synced with Hero) */}
          <div className="absolute top-4 inset-x-0 flex justify-center z-[60] pointer-events-none">
            <div className="w-[85px] h-[26px] bg-[#050505] rounded-[20px] shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-end pr-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1c2e] shadow-[0_0_2px_#3b3b4d]" />
            </div>
          </div>

          {/* 
              SCREEN SURFACE 
              Final layer of clipping for content.
          */}
          <div className="absolute inset-0 bg-white rounded-[inherit] overflow-hidden isolate">
            {isBlank ? (
              <div className="absolute inset-0 bg-[#f9fafb] flex items-center justify-center p-12 text-center">
                {/* Subtle Brand Watermark for Blank Screens */}
                <div className="opacity-[0.05] grayscale brightness-50">
                  <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  </svg>
                </div>
              </div>
            ) : phase === 1 ? (
              <LiveAppMockup />
            ) : (
              /* Placeholder for Phase 2/3 */
              <div className="absolute inset-0 flex flex-col pt-16 px-4 bg-[#f9fafb]">
                <div className="w-20 h-3 bg-slate-200 rounded-full mb-2" />
                <div className="w-32 h-6 bg-slate-300 rounded-lg mb-6" />
                <div className={`w-full h-32 rounded-2xl bg-gradient-to-br ${theme.from} ${theme.to} opacity-40 mb-4`} />
                <div className="w-full h-40 rounded-2xl bg-white border border-slate-100 shadow-sm p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-24 h-3 bg-slate-100 rounded-full" />
                    <div className="w-8 h-8 rounded-full bg-slate-50" />
                  </div>
                  <div className="space-y-4">
                    <div className="w-full h-2.5 bg-slate-50 rounded-full" />
                    <div className="w-[90%] h-2.5 bg-slate-50 rounded-full" />
                  </div>
                </div>
                {/* Simulated Bottom Nav */}
                <div className="absolute bottom-6 left-4 right-4 h-12 bg-white rounded-full shadow-sm border border-slate-50" />
              </div>
            )}

            {/* Frosty Coming Soon Overlay */}
            {comingSoon && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-start pt-20 bg-[#050505] rounded-[inherit] overflow-hidden group/lock p-8">
                {/* Subtle Thematic Glow - Positoned higher */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[80px] opacity-20" 
                     style={{ backgroundColor: theme.accent }} />
                
                {/* Minimalist Lock */}
                <div className="relative mb-10 animate-platform-float">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 11V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 11" stroke="white" strokeWidth="1.5" strokeLinecap="round" className="opacity-30" />
                    <rect x="5" y="10" width="14" height="11" rx="4" stroke="white" strokeWidth="1.5" />
                    <path d="M12 14V17" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>

                <div className="relative text-center space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-white text-3xl font-black tracking-tighter transition-all duration-700">
                      COMING<br />SOON
                    </h3>
                    <div className="w-10 h-1 bg-white/20 mx-auto rounded-full" />
                  </div>
                  
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                    Phase {phase === 2 ? "02" : "03"}
                  </p>
                </div>

                {/* Status indicator moved up */}
                <div className="mt-12 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: theme.accent }}></span>
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: theme.accent }}></span>
                  </span>
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em]">System Ready</span>
                </div>
              </div>
            )}

            {/* iOS Home Indicator */}
            <div className="absolute bottom-2 md:bottom-3 inset-x-0 flex justify-center z-[80]">
              <div className={`w-24 md:w-32 h-1.5 rounded-full ${comingSoon ? "bg-white/30" : "bg-black/10"}`} />
            </div>
            
            {/* Screen Reflection Sheen */}
            <div className="absolute inset-0 z-[70] pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.05] to-white/[0.1] opacity-0 group-hover/phone:opacity-100 transition-opacity duration-700" />
          </div>
        </div>

        {/* Physical Buttons - High-Fidelity Realistic Details */}
        {/* Left Side: Action Button + Volume */}
        <div className="absolute top-[85px] -left-[4px] w-[7px] h-9 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]" /> {/* Action Button */}
        <div className="absolute top-[140px] -left-[4px] w-[7px] h-14 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]" /> {/* Volume Up */}
        <div className="absolute top-[210px] -left-[4px] w-[7px] h-14 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]" /> {/* Volume Down */}
        
        {/* Right Side: Side/Power Button */}
        <div className="absolute top-[160px] -right-[4px] w-[7px] h-24 bg-gradient-to-l from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-r-[3px] border-y border-l border-white/10 shadow-[-1px_0_3px_rgba(0,0,0,0.5)]" />
      </div>
    </div>
);
}
