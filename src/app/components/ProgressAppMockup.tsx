"use client";
import React, { useEffect, useState, useRef } from "react";
import MoodCarousel from "./MoodCarousel";
import ProgressReportUI from "./ProgressReportUI";

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

const AmbientParticles = () => (
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

// -------------------------------------------------------
// MAIN COMPONENT — IMMERSIVE 3D SHOWCASE
// -------------------------------------------------------

export default function ProgressAppMockup({ 
    radarChart, 
    externalTilt = { x: 0, y: 0 } 
}: { 
    radarChart?: React.ReactNode,
    externalTilt?: { x: number, y: number }
}) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        
        setMousePos({ x, y });
    };

    // COMBINE LOCAL TILT WITH GLOBAL STAGE TILT
    const rotateX = (18 - (mousePos.y * 8)) + (externalTilt.x * 2); 
    const rotateY = (-28 + (mousePos.x * 12)) + (externalTilt.y * 3);
    const rotateZ = (6 + (mousePos.x * 3));

    return (
        <div 
            ref={containerRef}
            className="w-full h-full flex items-center justify-center p-4 md:p-8 select-none relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setMousePos({ x: 0, y: 0 });
            }}
            onMouseMove={handleMouseMove}
            style={{ perspective: "2000px" }}
        >
            {/* ── AMBIENT ENERGY ORBS (MAGNETIC) ── */}
            <div 
                className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
                style={{ transform: `translateX(${mousePos.x * 20}px) translateY(${mousePos.y * 20}px) translateZ(-100px)` }}
            >
                <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] rounded-full bg-brand/5 blur-[100px] animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] rounded-full bg-purple-500/5 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* 3D Wrapper */}
            <div 
                className="relative w-[240px] md:w-[260px] h-[500px] md:h-[540px] transition-transform duration-[600ms] cubic-bezier(0.23, 1, 0.32, 1)"
                style={{ 
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${isHovered ? 1.05 : 0.95})`
                }}
            >
                <AmbientParticles />
                
                {/* ── PHONE BASE LAYER ── */}
                <div 
                    className="absolute inset-0 rounded-[3.5rem] bg-black shadow-[40px_80px_100px_rgba(0,0,0,0.5)] border-[6px] border-slate-800" 
                    style={{ transform: "translateZ(0)" }}
                >
                    {/* Magnetic Glint */}
                    <div 
                        className="absolute inset-0 rounded-[3.3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                        style={{
                            background: `radial-gradient(circle at ${50 + mousePos.x * 50}% ${50 + mousePos.y * 50}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                        }}
                    />
                </div>

                {/* ── MAIN SCREEN LAYER ── */}
                <div 
                    className="absolute inset-[6px] rounded-[3rem] bg-[#FCF9F7] overflow-hidden flex flex-col group/screen" 
                    style={{ 
                        transform: `translateZ(15px)`,
                        transformStyle: "preserve-3d"
                    }}
                >
                    {/* Laser Light Beam (Pointer Reactive) */}
                    <div 
                        className="absolute inset-0 z-[150] pointer-events-none mix-blend-overlay transition-opacity duration-300 opacity-0 group-hover/screen:opacity-40"
                        style={{
                            background: `linear-gradient(${105 + mousePos.x * 30}deg, transparent, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.4) 55%, transparent)`,
                            transform: `translateX(${mousePos.x * 100}%)`,
                        }}
                    />

                    {/* App Content */}
                    <ProgressReportUI />

                    {/* Status Bar & Dynamic Island (Pinned) */}
                    <div className="absolute top-0 inset-x-0 h-14 pointer-events-none z-[160]">
                        <div className="h-[32px] pt-1 px-8 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-900 tracking-tight">23:05</span>
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
                    className="absolute top-16 -left-12 right-12 h-32 transition-transform duration-[700ms] ease-out group/mood" 
                    style={{ 
                        transform: `translateZ(${isHovered ? 280 : 120}px) translateX(${mousePos.x * -25}px) translateY(${mousePos.y * -15}px)`,
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
                    className="absolute bottom-12 -right-24 md:-right-32 w-[220px] md:w-[240px] aspect-square transition-transform duration-[900ms] pointer-events-none ease-out"
                    style={{ 
                        transform: `translateZ(${isHovered ? 200 : 80}px) translateX(${mousePos.x * 40}px) translateY(${mousePos.y * 10}px) rotateY(-8deg)`,
                        zIndex: 180
                    }}
                >
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
