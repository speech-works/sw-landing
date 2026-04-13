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

function RoadmapInternalUI({ animKey }: { animKey: number }) {
    return (
        <div className="flex flex-col gap-5 p-6 pt-16 h-full antialiased bg-[#FFF9F5]">
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
    // STRAIGHT / NOT TILTED
    const tiltTransform = `rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${isSectionHovered ? 1.05 : 0.95})`;

    return (
        <div 
            className="w-full h-full flex items-center justify-center p-4 md:p-8 select-none relative group" 
            style={{ perspective: "3000px", transformStyle: "preserve-3d" }}
        >
            <div 
                className="relative w-[230px] md:w-[240px] h-[440px] md:h-[480px] transition-transform duration-700 ease-out"
                style={{ transformStyle: "preserve-3d", transform: tiltTransform }}
            >
                {/* ── UNIFIED HI-FI CHASSIS (Space Black Titanium) ── */}
                {/* 1. Main Hardware Body (Unified Material) */}
                <div 
                    className="absolute inset-0 rounded-[3.5rem] bg-[#0F1115] shadow-[40px_80px_100px_rgba(0,0,0,0.6)]" 
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

                <div 
                    className="absolute inset-[6px] rounded-[3rem] bg-[#FFF9F5] overflow-hidden flex flex-col" 
                    style={{ transform: `translateZ(15px)`, transformStyle: "preserve-3d" }}
                >
                    <div className="absolute top-0 inset-x-0 h-14 z-[160] flex flex-col">
                        <div className="h-[32px] pt-1.5 px-8 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-brand tracking-tight">09:41</span>
                            <div className="flex items-center gap-1.5">
                                <SignalIcon />
                                <div className="w-[18px] h-[9px] border-[1px] border-brand rounded-[2px] p-[1.2px] flex">
                                    <div className="w-[85%] h-full bg-brand rounded-px" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[84px] h-[25px] bg-black rounded-[14px]" />
                    </div>

                    <RoadmapInternalUI animKey={animKey} />

                    <div 
                        className="absolute inset-0 z-[50] pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                        style={{
                            background: `linear-gradient(${75 + externalMousePos.x * 20}deg, transparent, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.8) 55%, transparent)`,
                            transform: `translateX(${externalMousePos.x * 100}%)`,
                        }}
                    />
                </div>

                {/* ── FEATURE BUBBLES (MOVED INSIDE FOR MASKING) ── */}
                <FeatureBubbles isHovered={isSectionHovered} tiltTransform={tiltTransform} />
            </div>
        </div>
    );
}
