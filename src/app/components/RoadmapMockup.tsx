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
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* 
          PIXEL-PERFECT DEVICE FRAME 
          Everything is clipped at this level. Nothing can leak out.
      */}
      <div className="relative w-[280px] h-[580px] md:w-[320px] md:h-[640px] shadow-2xl transition-transform duration-700 hover:scale-[1.02] group/phone rounded-[3.5rem] overflow-hidden ring-1 ring-black/5">
        
        {/* Exterior Chassis Ring */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-[#2a2a2a] to-[#1a1a1a]" />
        
        {/* 
            SCREEN BEZEL - Nested 4px
            This is the black border around the screen. 
        */}
        <div className="absolute inset-[4px] bg-black rounded-[3.25rem] overflow-hidden isolate">
          
          {/* Dynamic Island notification pill */}
          <div className="absolute top-3 inset-x-0 flex justify-center z-[60] pointer-events-none">
            <div className="w-[70px] h-[22px] bg-[#050505] rounded-[20px] flex items-center justify-end pr-3">
              <div className="w-1 h-1 rounded-full bg-[#1a1c2e]" />
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
              <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/5 backdrop-blur-[6px] rounded-[inherit] overflow-hidden">
                <div className="bg-white/80 backdrop-blur-xl border border-white/60 p-6 rounded-3xl shadow-2xl flex flex-col items-center text-center animate-platform-springUp">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${theme.from} ${theme.to} flex items-center justify-center text-white mb-4 shadow-lg`}>
                    <span className="font-black text-xl">{phase}</span>
                  </div>
                  <h3 className="text-[#3F332D] text-lg font-black tracking-tight mb-1 uppercase">Coming Soon</h3>
                  <p className="text-[#3F332D]/60 text-xs font-bold uppercase tracking-widest leading-tight">
                    Phase {phase === 2 ? "Two" : "Three"} <br />
                    In Development
                  </p>
                  <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/5">
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: theme.accent }} />
                    <span className="text-[8px] font-black text-[#3F332D] uppercase tracking-wider">Active Sprints</span>
                  </div>
                </div>
              </div>
            )}

            {/* iOS Home Indicator */}
            <div className="absolute bottom-2 inset-x-0 flex justify-center z-[80]">
              <div className={`w-20 h-1.5 rounded-full ${comingSoon ? "bg-white/30" : "bg-black/10"}`} />
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
