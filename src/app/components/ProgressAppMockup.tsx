"use client";
import React, { useEffect, useState, useRef } from "react";
import MoodCarousel from "./MoodCarousel";
import ProgressReportUI from "./ProgressReportUI";
import { useMockDeviceTime } from "./useMockDeviceTime";

// -------------------------------------------------------
// ICONS
// -------------------------------------------------------

const SignalIcon = ({ color = "#1E293B" }) => (
    <svg viewBox="0 0 17 12" fill={color} className="w-[14px] h-[10px]">
        <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
        <rect x="4" y="5" width="2.5" height="6" rx="0.5" />
        <rect x="8" y="2" width="2.5" height="9" rx="0.5" />
        <rect x="12" y="0" width="2.5" height="11" rx="0.5" opacity="0.3" />
    </svg>
);

// -------------------------------------------------------
// AMBIENT PARTICLES
// -------------------------------------------------------

const AmbientParticles = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="absolute inset-0 pointer-events-none overflow-visible">
            {[...Array(6)].map((_, i) => (
                <div 
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white/40 blur-[2px] animate-float-particle"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        transform: `translateZ(${Math.random() * 200 - 100}px)`,
                        animationDelay: `${i * 1.5}s`,
                        animationDuration: `${10 + i * 2}s`
                    }}
                />
            ))}
        </div>
    );
};

// -------------------------------------------------------
// MAIN COMPONENT — IMMERSIVE 3D SHOWCASE
// -------------------------------------------------------

export default function ProgressAppMockup({ 
    radarChart, 
    isSectionHovered = false,
    externalMousePos = { x: 0, y: 0 },
    softDeviceShadow = false,
}: { 
    radarChart?: React.ReactNode,
    isSectionHovered?: boolean,
    externalMousePos?: { x: number, y: number },
    softDeviceShadow?: boolean,
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const timeStr = useMockDeviceTime("23:05");

    // COMBINE LOCAL TILT WITH GLOBAL STAGE TILT
    // We use externalMousePos which is stable (-1 to 1)
    const rotateX = (18 - (externalMousePos.y * 10)); 
    const rotateY = (-28 + (externalMousePos.x * 12));
    const rotateZ = (6 + (externalMousePos.x * 3));

    return (
        <div 
            ref={containerRef}
            className="w-full h-full flex items-center justify-center p-4 md:p-8 select-none relative group"
            style={{ perspective: "2000px" }}
        >
            {/* ── AMBIENT ENERGY ORBS (MAGNETIC) ── */}
            <div 
                className="absolute inset-0 pointer-events-none transition-transform duration-1000 ease-out"
                style={{ transform: `translateX(${externalMousePos.x * 30}px) translateY(${externalMousePos.y * 30}px) translateZ(-100px)` }}
            >
                <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-brand/5 blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-purple-500/5 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* 3D Wrapper */}
            <div 
                className="relative w-[240px] md:w-[260px] h-[500px] md:h-[540px] transition-transform duration-1000 cubic-bezier(0.23, 1, 0.32, 1)"
                style={{ 
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${isSectionHovered ? 1.05 : 0.95})`
                }}
            >
                <AmbientParticles />
                
                {/* ── UNIFIED HI-FI CHASSIS (Space Black Titanium) ── */}
                {/* 1. Main Hardware Body (Unified Material) */}
                <div 
                    className={`absolute inset-0 rounded-[3.5rem] bg-[#0F1115] ${
                        softDeviceShadow
                            ? "shadow-[0_16px_28px_rgba(0,0,0,0.18)]"
                            : "shadow-[40px_80px_100px_rgba(0,0,0,0.6)]"
                    }`} 
                    style={{ 
                        transform: "translateZ(-12px)",
                    }}
                />

                {/* 2. Front Face / Metallic Bezel */}
                <div 
                    className="absolute inset-x-[1px] inset-y-[1px] rounded-[3.4rem] bg-[#0F1115] border-[0.5px] border-white/10" 
                    style={{ transform: "translateZ(0px)" }}
                >
                    {/* Corner Specular Highlights (Ultra-thin metallic glints) */}
                    <div className="absolute inset-0 rounded-[3.4rem] opacity-40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_1px_0_2px_rgba(255,255,255,0.2)]" />
                    
                    {/* Hardware Buttons - Unified Material */}
                    {/* Left Side: Action (top), Vol Up, Vol Down */}
                    <div className="absolute left-[-3px] top-[90px] w-[4px] h-6 bg-[#1A1D23] rounded-l-[1px] border-y border-l border-white/10 shadow-sm" style={{ transform: "translateZ(-2px)" }} />
                    <div className="absolute left-[-3px] top-[130px] w-[4px] h-11 bg-[#1A1D23] rounded-l-[1px] border-y border-l border-white/10 shadow-sm" style={{ transform: "translateZ(-2px)" }} />
                    <div className="absolute left-[-3px] top-[185px] w-[4px] h-11 bg-[#1A1D23] rounded-l-[1px] border-y border-l border-white/10 shadow-sm" style={{ transform: "translateZ(-2px)" }} />
                    
                    {/* Right Side: Side Button (Power) */}
                    <div className="absolute right-[-3px] top-[160px] w-[4px] h-16 bg-[#1A1D23] rounded-r-[1px] border-y border-r border-white/10 shadow-sm" style={{ transform: "translateZ(-2px)" }} />

                    {/* Camera Control - Minimalist Flush Recess */}
                    <div className="absolute right-[-1.5px] bottom-[140px] w-[3px] h-14 bg-[#090A0C] rounded-r-md border border-white/5 opacity-80" style={{ transform: "translateZ(-2px)" }} />

                    {/* Hardware Bezel Interactive Glimmer */}
                    <div 
                        className="absolute inset-0 rounded-[3.4rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                        style={{
                            background: `radial-gradient(circle at ${50 + externalMousePos.x * 50}% ${50 + externalMousePos.y * 50}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
                        }}
                    />
                </div>

                {/* ── MAIN SCREEN LAYER (Flush with Frame) ── */}
                <div 
                    className="absolute inset-[6px] rounded-[3rem] bg-[#FCF9F7] overflow-hidden flex flex-col group/screen shadow-[inset_0_0_10px_rgba(0,0,0,0.4)]" 
                    style={{ 
                        transform: `translateZ(10px)`,
                        transformStyle: "preserve-3d"
                    }}
                >
                    {/* Laser Light Beam (Pointer Reactive) */}
                    <div 
                        className="absolute inset-0 z-[150] pointer-events-none mix-blend-overlay transition-all duration-700 opacity-0 group-hover/screen:opacity-40"
                        style={{
                            background: `linear-gradient(${105 + externalMousePos.x * 30}deg, transparent, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.4) 55%, transparent)`,
                            transform: `translateX(${externalMousePos.x * 100}%)`,
                        }}
                    />

                    {/* App Content */}
                    <ProgressReportUI />

                    {/* Status Bar & Dynamic Island (Pinned) */}
                    <div className="absolute top-0 inset-x-0 h-14 pointer-events-none z-[160]">
                        <div className="h-[32px] pt-1 px-8 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-900 tracking-tight">{timeStr}</span>
                            <div className="flex items-center gap-1.5">
                                <SignalIcon />
                                <div className="w-[18px] h-[9px] border-[1px] border-slate-900 rounded-[2px] p-[1.2px] flex">
                                    <div className="w-[85%] h-full bg-slate-900 rounded-px" />
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[84px] h-[25px] bg-black rounded-[14px] flex items-center justify-center overflow-hidden">
                             <div className="absolute inset-0 bg-blue-500/10 animate-pulse-island" />
                             <div className="flex items-center gap-[2px] opacity-40">
                                 {[1,0.6,1.2,0.8].map((h, i) => (
                                     <div key={i} className="w-[2px] bg-blue-400 rounded-full animate-island-wave" style={{ height: `${h * 4}px`, animationDelay: `${i * 0.1}s` }} />
                                 ))}
                             </div>
                        </div>
                    </div>
                </div>

                {/* ── MULTI-PLANE FLOATING UI (EXAGGERATED DEPTH) ── */}
                
                {/* Layer 1: Mood Carousel (Top Forward) */}
                <div 
                    className="absolute top-16 -left-12 right-12 h-32 transition-transform duration-1000 ease-out group/mood" 
                    style={{ 
                        transform: `translateZ(${isSectionHovered ? 280 : 120}px) translateX(${externalMousePos.x * -25}px) translateY(${externalMousePos.y * -15}px)`,
                        zIndex: 200,
                        pointerEvents: "auto"
                    }}
                >
                    <div className="w-full h-full shadow-[0_25px_50px_rgba(0,0,0,0.15)] rounded-2xl transition-transform duration-500 group-hover/mood:scale-105">
                        <MoodCarousel />
                    </div>
                </div>

                {/* Layer 2: Radar Chart (Bottom Mid) */}
                <div 
                    className="absolute bottom-12 -right-24 md:-right-32 w-[220px] md:w-[240px] aspect-square transition-transform duration-1000 ease-out group/radar"
                    style={{ 
                        transform: `translateZ(${isSectionHovered ? 200 : 80}px) translateX(${externalMousePos.x * 40}px) translateY(${externalMousePos.y * 10}px) rotateY(-8deg)`,
                        zIndex: 180,
                        pointerEvents: "auto"
                    }}
                >
                    <div className="w-full h-full transition-transform duration-500 group-hover/radar:scale-105">
                        {radarChart ? (
                            <div className="w-full h-full transform scale-[0.85] md:scale-105 drop-shadow-[0_35px_60px_rgba(0,0,0,0.2)]">
                                {radarChart}
                            </div>
                        ) : (
                            <div className="w-full h-full bg-white/60 backdrop-blur-xl rounded-[2.5rem] border border-white/40 shadow-2xl p-6 flex flex-col items-center justify-center">
                                <div className="w-full h-full rounded-[2rem] border-2 border-dashed border-slate-300 flex items-center justify-center opacity-40">
                                    <div className="text-[12px] font-black text-slate-800 uppercase tracking-widest">Growth Profile</div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            <style>{`
                .rounded-px { border-radius: 1px; }

                @keyframes float-particle {
                    0%, 100% { transform: translate(0, 0) translateZ(80px); opacity: 0; }
                    25% { opacity: 0.6; }
                    50% { transform: translate(60px, -60px) translateZ(150px); opacity: 0.8; }
                    75% { opacity: 0.6; }
                }

                @keyframes pulse-island {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }

                @keyframes island-wave {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(2.2); }
                }

                .animate-float-particle { animation: float-particle linear infinite; }
                .animate-pulse-island { animation: pulse-island 3s ease-in-out infinite; }
                .animate-island-wave { animation: island-wave 1s ease-in-out infinite; }
            `}</style>
        </div>
    );
}
