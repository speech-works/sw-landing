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

export default function ProgressAppMockup({ radarChart }: { radarChart?: React.ReactNode }) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Normalize values between -1 and 1
        const x = (e.clientX - centerX) / (rect.width / 2);
        const y = (e.clientY - centerY) / (rect.height / 2);
        
        setMousePos({ x, y });
    };

    // Calculate rotation based on mouse position + base isometric offset
    const rotateX = 18 - (mousePos.y * 12); // Tilt up/down
    const rotateY = -28 + (mousePos.x * 15); // Pivot left/right
    const rotateZ = 6 + (mousePos.x * 2);

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
            {/* Background Glow */}
            <div className={`absolute w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[120px] transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-40'}`} />

            {/* 3D Wrapper */}
            <div 
                className="relative w-[240px] md:w-[260px] h-[500px] md:h-[540px] transition-transform duration-[400ms] ease-out"
                style={{ 
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${isHovered ? 1 : 0.95})`
                }}
            >
                <AmbientParticles />
                
                {/* ── PHONE BASE LAYER (The Device Shield) ── */}
                <div className="absolute inset-0 rounded-[3.5rem] bg-black shadow-[40px_80px_100px_rgba(0,0,0,0.5)] border-[6px] border-slate-800" style={{ transform: "translateZ(0)" }}>
                    <div className="absolute inset-[-1px] rounded-[3.3rem] border border-white/10" />
                </div>

                {/* ── MAIN SCREEN LAYER ── */}
                <div className="absolute inset-[6px] rounded-[3rem] bg-[#FCF9F7] overflow-hidden flex flex-col group/screen" style={{ transform: "translateZ(10px)" }}>
                    
                    {/* Glass Glare Sweep */}
                    <div className="absolute inset-0 z-[150] pointer-events-none opacity-0 group-hover/screen:animate-screen-glare bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent -translate-x-full rotate-[25deg]" />

                    {/* Status Bar */}
                    <div className="h-[32px] pt-1 px-8 flex items-center justify-between z-50">
                        <span className="text-[10px] font-bold text-slate-900 tracking-tight">23:05</span>
                        <div className="flex items-center gap-1.5">
                            <SignalIcon />
                            <div className="w-[18px] h-[9px] border-[1px] border-slate-900 rounded-[2px] p-[1.2px] flex">
                                <div className="w-[85%] h-full bg-slate-900 rounded-px" />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Island (Active Pulse) */}
                    <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[84px] h-[25px] bg-black rounded-[14px] flex items-center justify-center overflow-hidden">
                         <div className="absolute inset-0 bg-blue-500/10 animate-pulse-island" />
                         {/* Tiny Waveform Icon */}
                         <div className="flex items-center gap-[2px] opacity-40">
                             {[1,0.6,1.2,0.8].map((h, i) => (
                                 <div key={i} className="w-[2px] bg-blue-400 rounded-full animate-island-wave" style={{ height: `${h * 4}px`, animationDelay: `${i * 0.1}s` }} />
                             ))}
                         </div>
                    </div>

                    {/* App Content Layer */}
                    <ProgressReportUI />
                </div>

                {/* ── FLOATING UI ELEMENTS ── */}
                
                {/* Card 1: Mood Carousel */}
                <div 
                    className="absolute top-16 -left-8 right-12 h-32 transition-transform duration-[600ms] pointer-events-none" 
                    style={{ 
                        transform: `translateZ(${isHovered ? 160 : 100}px) translateX(${mousePos.x * -10}px) translateY(${mousePos.y * -5}px)`,
                        zIndex: 110
                    }}
                >
                    <MoodCarousel />
                </div>

                {/* Card 2: Radar Chart */}
                <div 
                    className="absolute bottom-16 -right-16 md:-right-24 w-[180px] md:w-[200px] aspect-square transition-transform duration-[800ms] pointer-events-none"
                    style={{ 
                        transform: `translateZ(${isHovered ? 120 : 70}px) translateX(${mousePos.x * 20}px) rotateY(-5deg)`,
                        zIndex: 100
                    }}
                >
                    {radarChart ? (
                        <div className="w-full h-full transform scale-[0.85] md:scale-100">
                             {radarChart}
                        </div>
                    ) : (
                        <div className="w-full h-full bg-white/40 backdrop-blur-lg rounded-2xl border border-white/30 shadow-2xl p-4 flex items-center justify-center">
                             <div className="w-full h-full rounded-xl border-2 border-dashed border-white/50 flex items-center justify-center opacity-40">
                                <div className="text-[10px] font-bold text-slate-800/40 uppercase tracking-widest">Growth Profile</div>
                            </div>
                        </div>
                    )}
                </div>

            </div>

            <style>{`
                .rounded-px { border-radius: 1px; }

                @keyframes float-particle {
                    0%, 100% { transform: translate(0, 0) translateZ(50px); opacity: 0; }
                    25% { opacity: 0.6; }
                    50% { transform: translate(40px, -40px) translateZ(100px); opacity: 0.8; }
                    75% { opacity: 0.6; }
                }

                @keyframes screen-glare {
                    0% { transform: translateX(-150%) rotate(25deg); }
                    30% { transform: translateX(150%) rotate(25deg); }
                    100% { transform: translateX(150%) rotate(25deg); }
                }

                @keyframes pulse-island {
                    0%, 100% { opacity: 0; }
                    50% { opacity: 1; }
                }

                @keyframes island-wave {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(2); }
                }

                .animate-float-particle { animation: float-particle linear infinite; }
                .animate-screen-glare { animation: screen-glare 4s cubic-bezier(0.23, 1, 0.32, 1) infinite; }
                .animate-pulse-island { animation: pulse-island 3s ease-in-out infinite; }
                .animate-island-wave { animation: island-wave 1s ease-in-out infinite; }
            `}</style>
        </div>
    );
}
