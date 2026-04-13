"use client";
import React, { useState, useEffect } from "react";

const SignalIcon = ({ color = "#f97316" }) => (
    <svg viewBox="0 0 17 12" fill={color} className="w-[14px] h-[10px]">
        <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
        <rect x="4" y="5" width="2.5" height="6" rx="0.5" />
        <rect x="8" y="2" width="2.5" height="9" rx="0.5" />
        <rect x="12" y="0" width="2.5" height="11" rx="0.5" opacity="0.3" />
    </svg>
);

function FeatureBubbles({ isHovered, tiltTransform }: { isHovered: boolean, tiltTransform: string }) {
    // Unique bubble shapes inspired by Image 1
    const bubbles = [
        { id: 1, type: "location", label: "London", color: "bg-orange-500", angle: -140, radius: 100, z: 120, yOffset: -220 },
        { id: 2, type: "profile", label: "Coach Sarah", color: "bg-brand", angle: -30, radius: 110, z: 180, yOffset: -180 },
        { id: 3, type: "skill", label: "Roleplay", color: "bg-indigo-500", angle: 130, radius: 120, z: 140, yOffset: -60 },
        { id: 4, type: "stat", label: "+14 XP", color: "bg-emerald-500", angle: 45, radius: 95, z: 190, yOffset: -120 },
        { id: 5, type: "eye", icon: "👁️", color: "bg-yellow-400", angle: -80, radius: 130, z: 150, yOffset: -200 },
        { id: 6, type: "dot", label: "Module 5", color: "bg-slate-800", angle: 170, radius: 140, z: 110, yOffset: -100 }
    ];

    const snappyEase = "cubic-bezier(0.19, 1, 0.22, 1)";

    return (
        <React.Fragment>
            {bubbles.map((b) => (
                <div 
                    key={b.id}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ transformStyle: "preserve-3d", transform: tiltTransform, willChange: "transform", zIndex: 1000 }}
                >
                    <div 
                        className={`shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-[800ms] border border-white/40 overflow-hidden flex items-center justify-center
                            ${b.type === 'location' ? 'px-4 py-1.5 rounded-full bg-slate-900 text-white' : ''}
                            ${b.type === 'profile'  ? 'w-24 h-12 rounded-2xl bg-white p-2 gap-2' : ''}
                            ${b.type === 'skill'    ? 'px-5 py-2 rounded-xl bg-indigo-600 text-white' : ''}
                            ${b.type === 'stat'     ? 'px-3 py-1 rounded-lg bg-emerald-50 text-emerald-600 font-bold border-emerald-100' : ''}
                            ${b.type === 'eye'      ? 'w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center' : ''}
                            ${b.type === 'dot'      ? 'px-4 py-1.5 rounded-full bg-slate-100 text-slate-800 border-slate-200' : ''}
                        `}
                        style={{ 
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                            transitionTimingFunction: snappyEase,
                            transform: `
                                rotateZ(${isHovered ? b.angle : b.angle - 120}deg)
                                translateX(${isHovered ? b.radius : 0}px)
                                translateY(${isHovered ? b.yOffset : 0}px)
                                translateZ(${isHovered ? b.z : -300}px)
                                rotateZ(${isHovered ? -b.angle : -(b.angle - 120)}deg)
                                scale(${isHovered ? 1 : 0.3})
                            `,
                            opacity: isHovered ? 1 : 0,
                            willChange: "transform, opacity",
                        }}
                    >
                        {b.type === 'profile' && (
                            <>
                                <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                                     <div className="w-full h-full bg-gradient-to-tr from-brand to-rose-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-black text-slate-900 leading-none">{b.label}</span>
                                    <span className="text-[7px] font-bold text-slate-400 mt-0.5">⭐ 4.9</span>
                                </div>
                            </>
                        )}
                        {b.type !== 'profile' && (
                            <span className={`text-[10px] font-black uppercase tracking-wider whitespace-nowrap`}>
                                {b.icon || b.label}
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
}

function RoadmapScreenUI({ timeStr }: { timeStr: string }) {
    return (
        <div className="absolute top-0 left-0 right-0 px-[1.4rem] pt-5 pb-3 flex justify-between items-center z-40">
            {/* System Time - Scaled down for premium feel */}
            <span className="text-[10px] font-bold text-slate-950 tracking-[-0.01em] leading-none mb-0.5">{timeStr}</span>
            
            <div className="flex items-center gap-1.5">
                {/* Scaled down Signal Strength SVG */}
                <svg className="w-[14px] h-[9px] text-slate-900" viewBox="0 0 17 10" fill="currentColor">
                    <rect x="0" y="7" width="2.5" height="3" rx="0.5" />
                    <rect x="4" y="5" width="2.5" height="5" rx="0.5" />
                    <rect x="8" y="2.5" width="2.5" height="7.5" rx="0.5" />
                    <rect x="12" y="0" width="2.5" height="10" rx="0.5" />
                </svg>

                {/* Scaled down Wi-Fi SVG */}
                <svg className="w-[13px] h-[10px] text-slate-900" viewBox="0 0 15 11" fill="none">
                    <path d="M7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11Z" fill="currentColor" />
                    <path d="M12.11 6.39C10.884 5.16398 9.23199 4.4754 7.5 4.4754C5.76801 4.4754 4.11602 5.16398 2.89 6.39" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    <path d="M14.61 3.89C12.7239 2.00392 10.166 0.945312 7.5 0.945312C4.83401 0.945312 2.27602 2.00392 0.39 3.89" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>

                {/* Scaled down Battery SVG */}
                <div className="flex items-center gap-0.4">
                    <div className="w-[18px] h-[9px] rounded-[2px] border-[1px] border-slate-900/80 relative p-[0.8px]">
                        <div className="h-full bg-slate-900 rounded-[0.4px] w-[80%]" />
                    </div>
                    <div className="w-[1px] h-[3px] bg-slate-400 rounded-r-full" />
                </div>
            </div>
        </div>
    );
}

function RoadmapInternalUI({ animKey }: { animKey: number }) {
    return (
        <div className="flex flex-col gap-5 p-6 pt-24 h-full antialiased bg-[#FFF9F5]">
            <div className="flex flex-col gap-1 mb-2">
                <span className="text-[10px] font-black text-brand uppercase tracking-[0.2em]">Clinical Roadmap</span>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">Practice Packs</h2>
            </div>

            <div className="flex flex-col gap-3">
                {[
                    { title: "Exposure Pack 01", progress: 65, color: "bg-brand" },
                    { title: "Social Fluency Pro", progress: 40, color: "bg-indigo-500" },
                    { title: "Vocal Power", progress: 85, color: "bg-emerald-500" }
                ].map((pack, i) => (
                    <div 
                        key={i} 
                        className="p-4 bg-white rounded-2xl border border-orange-100 shadow-sm flex flex-col gap-3"
                        style={{ animation: `platform-chatReveal 0.6s cubic-bezier(0.19, 1, 0.22, 1) ${i * 0.1}s both` }}
                    >
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-slate-800">{pack.title}</span>
                            <span className="text-[10px] font-bold text-slate-400">{pack.progress}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${pack.color} rounded-full`} style={{ width: `${pack.progress}%` }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function RoadmapAppMockup({ 
    animKey,
    isSectionHovered = false,
    externalMousePos = { x: 0, y: 0 } 
}: { 
    animKey: number,
    isSectionHovered?: boolean,
    externalMousePos?: { x: number, y: number }
}) {
    // 1. Clock state for system parity
    const [mounted, setMounted] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        setMounted(true);
        const timer = setInterval(() => setTime(new Date()), 10000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (d: Date) => {
        const hours = d.getHours().toString().padStart(2, "0");
        const minutes = d.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const isHovered = isSectionHovered || false;
    const mousePos = externalMousePos;

    // SMOOTH / NOT TILTED (Stabilized and widened)
    const tiltTransform = `rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${isHovered ? 1.05 : 0.95})`;

    return (
        <div 
            className="w-full h-full flex items-center justify-center p-4 md:p-8 select-none relative group" 
            style={{ perspective: "3000px", transformStyle: "preserve-3d" }}
        >
            <div 
                className="relative w-[260px] md:w-[280px] h-[460px] md:h-[500px] transition-transform duration-700 ease-out"
                style={{ transformStyle: "preserve-3d", transform: tiltTransform }}
            >
                {/* ── UNIFIED HI-FI CHASSIS (Space Black Titanium) ── */}
                {/* 1. Main Hardware Body */}
                <div 
                    className="absolute inset-0 rounded-[3.5rem] bg-[#0F1115] shadow-[40px_80px_100px_rgba(0,0,0,0.6)]" 
                    style={{ transform: "translateZ(-12px)" }}
                />

                {/* 2. Front Face / Metallic Bezel */}
                <div 
                    className="absolute inset-x-[1px] inset-y-[1px] rounded-[3.4rem] bg-[#0F1115] border-[0.5px] border-white/10 overflow-hidden" 
                    style={{ transform: "translateZ(0px)" }}
                >
                    {/* Hardware Bezel Specular Depth */}
                    <div className="absolute inset-0 rounded-[3.4rem] opacity-40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_1px_0_2px_rgba(255,255,255,0.2)]" />
                    
                    {/* Screen Layer (Flush Off-White) */}
                    <div 
                        className="absolute inset-[5px] rounded-[3rem] bg-[#FFF9F5] overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] flex flex-col"
                        style={{ transform: "translateZ(1px)" }}
                    >
                        {/* Status Bar (System Time + Icons) */}
                        <RoadmapScreenUI timeStr={mounted ? formatTime(time) : "09:41"} />

                        {/* Professional Dynamic Island */}
                        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[92px] h-[28px] bg-black rounded-full z-50">
                             <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-20" />
                        </div>

                        {/* Main UI Content */}
                        <RoadmapInternalUI animKey={animKey} />

                        {/* Interaction Glimmer */}
                        <div 
                            className="absolute inset-0 z-[60] pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                            style={{
                                background: `linear-gradient(${75 + mousePos.x * 20}deg, transparent, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.8) 55%, transparent)`,
                                transform: `translateX(${mousePos.x * 100}%)`,
                            }}
                        />
                    </div>
                </div>

                {/* Exploded Bubble Layer */}
                <FeatureBubbles isHovered={isHovered} tiltTransform={tiltTransform} />
            </div>
        </div>
    );
}
