"use client";
import React, { useEffect, useState } from "react";
import MoodCarousel from "./MoodCarousel";

// -------------------------------------------------------
// ICONS
// -------------------------------------------------------

const ClockIcon = () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-600">
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm.01 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
    </svg>
);

// -------------------------------------------------------
// MAIN COMPONENT — 3D ISOMETRIC EXPLODED VIEW
// -------------------------------------------------------

export default function ProgressAppMockup({ radarChart }: { radarChart?: React.ReactNode }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="w-full h-full flex items-center justify-center p-4 md:p-8 select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ perspective: "1500px" }}
        >
            {/* 3D Wrapper */}
            <div 
                className="relative w-[240px] md:w-[260px] h-[500px] md:h-[540px] transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                style={{ 
                    transformStyle: "preserve-3d",
                    transform: isHovered 
                        ? "rotateX(22deg) rotateY(-32deg) rotateZ(8deg) scale(0.95)" 
                        : "rotateX(18deg) rotateY(-28deg) rotateZ(6deg) scale(0.9)"
                }}
            >
                
                {/* ── PHONE BASE LAYER (The Device Shield) ── */}
                <div className="absolute inset-0 rounded-[3.5rem] bg-black shadow-[30px_60px_60px_rgba(0,0,0,0.4)] border-[6px] border-slate-800" style={{ transform: "translateZ(0)" }}>
                    <div className="absolute inset-[-1px] rounded-[3.3rem] border border-white/10" />
                </div>

                {/* ── MAIN SCREEN LAYER ── */}
                <div className="absolute inset-[6px] rounded-[3rem] bg-[#FCF9F7] overflow-hidden flex flex-col" style={{ transform: "translateZ(10px)" }}>
                    
                    {/* Status Bar (Matching new padding/height specs) */}
                    <div className="h-[54px] pt-1 px-8 flex items-center justify-between z-50">
                        <span className="text-[11px] font-bold text-slate-900 letter-spacing-tight">23:05</span>
                        <div className="flex items-center gap-1.5">
                            <svg viewBox="0 0 17 12" fill="#0f172a" className="w-[15px] h-[11px]">
                                <rect x="0" y="8" width="3" height="4" rx="0.5" />
                                <rect x="4.5" y="5.5" width="3" height="6.5" rx="0.5" />
                                <rect x="13.5" y="0" width="3" height="12" rx="0.5" opacity="0.3" />
                            </svg>
                            <div className="w-[19px] h-[10px] border-[1.5px] border-slate-900 rounded-[2.5px] p-[1.5px] flex">
                                <div className="w-[82%] h-full bg-slate-900 rounded-px" />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Island */}
                    <div className="absolute top-[11px] left-1/2 -translate-x-1/2 w-[84px] h-[25px] bg-black rounded-[14px]" />

                    {/* Empty Content Placeholder */}
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4 opacity-10">
                        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
                            <ClockIcon />
                        </div>
                        <div className="space-y-2 text-center">
                            <div className="h-4 w-32 bg-slate-900 rounded-full" />
                            <div className="h-3 w-48 bg-slate-900 rounded-full mx-auto" />
                        </div>
                    </div>
                </div>

                {/* ── FLOATING UI ELEMENTS (The "Explosion") ── */}
                
                {/* Card 1: Main Header Floating Card (Compact Mood Carousel) */}
                <div 
                    className="absolute top-16 -left-8 right-12 h-32 transition-transform duration-700 pointer-events-none" 
                    style={{ 
                        transform: isHovered ? "translateZ(130px) scale(1.02)" : "translateZ(80px)",
                        zIndex: 110
                    }}
                >
                    <MoodCarousel />
                </div>

                {/* Card 2: Bottom Feature Card (Embedded Radar Chart) */}
                <div 
                    className="absolute bottom-16 -right-16 md:-right-24 w-[180px] md:w-[200px] aspect-square transition-transform duration-700 pointer-events-none"
                    style={{ 
                        transform: isHovered ? "translateZ(100px) translateX(15px) rotateY(-5deg)" : "translateZ(50px)",
                        zIndex: 100
                    }}
                >
                    {radarChart ? (
                        <div className="w-full h-full transform scale-[0.85] md:scale-100">
                             {radarChart}
                        </div>
                    ) : (
                        <div className="w-full h-full bg-white/40 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl p-4">
                            <div className="w-full h-full rounded-xl border-2 border-dashed border-white/50 flex items-center justify-center opacity-40">
                                <div className="text-[10px] font-bold text-slate-800/40 uppercase tracking-widest">Growth Metric</div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Card 3: Small floating notification/badge */}
                <div 
                    className="absolute top-1/2 -right-8 w-14 h-14 rounded-full bg-orange-400 shadow-lg shadow-orange-500/40 border border-white/50 flex items-center justify-center transition-transform duration-1000"
                    style={{ 
                        transform: isHovered ? "translateZ(200px) rotateY(-20deg)" : "translateZ(150px)"
                    }}
                >
                    <div className="w-6 h-6 rounded-full bg-white/30 animate-pulse" />
                </div>

                {/* Card 4: Ghost background layer for depth */}
                <div 
                    className="absolute inset-0 rounded-[3rem] bg-emerald-500/5 transition-opacity duration-700"
                    style={{ 
                        transform: "translateZ(-40px)",
                        opacity: isHovered ? 0.3 : 0.1
                    }}
                />

            </div>

            <style>{`
                .rounded-px { border-radius: 1px; }
            `}</style>
        </div>
    );
}
