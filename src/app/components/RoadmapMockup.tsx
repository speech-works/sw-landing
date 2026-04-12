"use client";
import React from "react";
import LiveAppMockup from "./LiveAppMockup";

interface RoadmapMockupProps {
  phase: number;
  status: "live" | "building" | "future";
  comingSoon?: boolean;
}

export default function RoadmapMockup({ phase, status, comingSoon = false }: RoadmapMockupProps) {
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
      <div className="relative w-[280px] h-[560px] md:w-[340px] md:h-[680px] shadow-2xl transition-transform duration-700 hover:scale-[1.02] group/phone rounded-[40px] md:rounded-[48px] overflow-hidden ring-1 ring-black/5">
        
        {/* Exterior Chassis Ring */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#2a2a2a] to-[#1a1a1a]" />
        
        {/* 
            SCREEN BEZEL
            This is the black border around the screen. 
        */}
        <div className="absolute inset-[6px] md:inset-[8px] bg-black rounded-[34px] md:rounded-[40px] overflow-hidden isolate">
          
          {/* Dynamic Island notification pill */}
          <div className="absolute top-3 md:top-4 inset-x-0 flex justify-center z-[60] pointer-events-none">
            <div className="w-[80px] md:w-[96px] h-[24px] md:h-[28px] bg-[#050505] rounded-[24px] flex items-center justify-end pr-3">
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#1a1c2e]" />
            </div>
          </div>

          {/* 
              SCREEN SURFACE 
              Final layer of clipping for content.
          */}
          <div className="absolute inset-0 bg-white rounded-[inherit] overflow-hidden isolate">
            {phase === 1 ? (
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

        {/* Physical Side Buttons (Internal to the clip, but visual enough) */}
        <div className="absolute top-[80px] -left-1 w-2 h-8 bg-black z-20 rounded-r-md" />
        <div className="absolute top-[130px] -left-1 w-2 h-12 bg-black z-20 rounded-r-md" />
        <div className="absolute top-[190px] -left-1 w-2 h-12 bg-black z-20 rounded-r-md" />
        <div className="absolute top-[150px] -right-1 w-2 h-16 bg-black z-20 rounded-l-md" />
      </div>
    </div>
);
}
