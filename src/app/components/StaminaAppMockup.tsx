"use client";
import React, { useState, useEffect } from "react";

const SignalIcon = ({ color = "#1E293B" }) => (
    <svg viewBox="0 0 17 12" fill={color} className="w-[14px] h-[10px]">
        <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
        <rect x="4" y="5" width="2.5" height="6" rx="0.5" />
        <rect x="8" y="2" width="2.5" height="9" rx="0.5" />
        <rect x="12" y="0" width="2.5" height="11" rx="0.5" opacity="0.3" />
    </svg>
);

function FeatureBubbles({ isHovered, tiltTransform }: { isHovered: boolean, tiltTransform: string }) {
    // Exact mapping from the Pixar-style reference image
    const bubbles = [
        { id: 1, type: "profile", label: "Elena", sub: "4.5 ⭐", color: "bg-white", angle: -10, radius: 60, z: 200, yOffset: -300 },
        { id: 2, type: "speech", label: "Marseille", color: "bg-[#D97D3C]", angle: -40, radius: 90, z: 120, yOffset: -240 },
        { id: 3, type: "speech", label: "Rennes", color: "bg-[#E94EAF]", angle: 30, radius: 85, z: 150, yOffset: -270 },
        { id: 4, type: "eye-yellow", icon: "👁️", color: "bg-[#D9FD51]", angle: -70, radius: 110, z: 140, yOffset: -310 },
        { id: 5, type: "circle-icon", icon: "€", color: "bg-black", iconColor: "text-orange-500", angle: 80, radius: 70, z: 180, yOffset: -250 },
        { id: 6, type: "circle-icon", icon: "+", color: "bg-black", iconColor: "text-white", angle: 120, radius: 105, z: 220, yOffset: -330 },
        { id: 7, type: "team", label: "TEAM", color: "bg-[#EEE963]", angle: 60, radius: 130, z: 110, yOffset: -340 },
        { id: 8, type: "stamp", color: "bg-[#4ADE80]", angle: 5, radius: 40, z: 130, yOffset: -260 },
        { id: 9, type: "tag-dark", label: "Paris", color: "bg-black", angle: -30, radius: 75, z: 160, yOffset: -220 },
        { id: 10, type: "tag-soft", label: "Exposition", color: "bg-[#E67E22]", angle: -130, radius: 120, z: 170, yOffset: -290, icon: "🖼️" },
        { id: 11, type: "tag-soft", label: "Nature", color: "bg-[#A7F3D0]", angle: 100, radius: 95, z: 140, yOffset: -280, icon: "🌿", isPill: true },
        { id: 12, type: "currency", label: "+18€", color: "bg-black", angle: 140, radius: 140, z: 190, yOffset: -270 },
        { id: 13, type: "currency", label: "+5€", color: "bg-[#FFEBE5]", labelColor: "text-[#E67E22]", angle: 45, radius: 150, z: 130, yOffset: -320 },
        { id: 14, type: "eye-mini", color: "bg-black", angle: -160, radius: 110, z: 90, yOffset: -240 },
    ];

    const snappyEase = "cubic-bezier(0.19, 1, 0.22, 1)";

    return (
        <React.Fragment>
            {bubbles.map((b) => (
                <div 
                    key={b.id}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ transformStyle: "preserve-3d", transform: tiltTransform, willChange: "transform", zIndex: -10 }}
                >
                    <div 
                        className={`transition-all duration-[900ms] shadow-[0_12px_40px_rgba(0,0,0,0.15)] flex items-center justify-center
                            ${b.type === 'profile'     ? 'w-28 h-12 rounded-2xl bg-white p-2 gap-2 border border-black/5' : ''}
                            ${b.type === 'speech'      ? 'px-4 py-2 rounded-[1.3rem] text-white font-black text-[10px] uppercase italic' : ''}
                            ${b.type === 'eye-yellow'  ? 'w-14 h-14 rounded-full border-2 border-black/20 flex items-center justify-center text-2xl scale-110' : ''}
                            ${b.type === 'eye-mini'    ? 'w-9 h-9 rounded-full flex items-center justify-center border-2 border-emerald-400' : ''}
                            ${b.type === 'team'        ? 'w-14 h-14 rounded-full flex flex-col items-center justify-center p-1 border border-black/10' : ''}
                            ${b.type === 'stamp'       ? 'w-14 h-18 rounded-sm bg-[#4ADE80] border-2 border-dashed border-white/60 rotate-6 shadow-lg' : ''}
                            ${b.type === 'circle-icon' ? 'w-10 h-10 rounded-full font-black text-xl' : ''}
                            ${b.type === 'tag-dark'    ? 'px-4 py-1.5 rounded-lg text-white font-bold text-[9px] uppercase' : ''}
                            ${b.type === 'tag-soft'    ? `px-3 py-1.5 rounded-full ${b.isPill ? 'bg-white/90 text-emerald-800' : 'text-white'} border border-black/5 gap-2 text-[9px] font-black uppercase tracking-tighter` : ''}
                            ${b.type === 'currency'    ? `px-3 py-1.5 rounded-xl font-black text-[10px] ${b.labelColor || 'text-orange-500'} shadow-sm` : ''}
                        `}
                        style={{ 
                            backgroundColor: (b.type !== 'profile' && b.type !== 'tag-soft' && b.type !== 'stamp') ? b.color : undefined,
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                            transitionTimingFunction: snappyEase,
                            transform: `
                                rotateZ(${isHovered ? b.angle : b.angle - 40}deg)
                                translateY(${isHovered ? b.yOffset : 0}px)
                                translateX(${isHovered ? (b.angle > 0 ? 30 : -30) : 0}px)
                                translateZ(${isHovered ? b.z : -100}px)
                                rotateZ(${isHovered ? -b.angle : -(b.angle - 40)}deg)
                                scale(${isHovered ? 1 : 0})
                            `,
                            opacity: isHovered ? 1 : 0,
                            willChange: "transform, opacity",
                        }}
                    >
                        {b.type === 'profile' && (
                            <>
                                <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                                     <div className="w-full h-full bg-gradient-to-tr from-orange-400 to-rose-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-slate-900 leading-none">{b.label}</span>
                                    <span className="text-[8px] font-bold text-slate-400 mt-0.5">{b.sub}</span>
                                </div>
                            </>
                        )}
                        {b.type === 'speech' && <span>{b.label}</span>}
                        {b.type === 'team' && (
                            <div className="flex flex-col items-center leading-none">
                                <span className="text-[5px] font-black text-black/40 uppercase mb-0.5">Team</span>
                                <div className="w-4 h-4 rounded-full bg-black/80 mb-0.5" />
                                <span className="text-[5px] font-black text-black/40 uppercase">Pimpel</span>
                            </div>
                        )}
                        {b.type === 'stamp' && <div className="w-full h-full opacity-30 flex flex-col justify-between p-1">
                             <div className="h-0.5 bg-white w-full" />
                             <div className="h-0.5 bg-white w-2/3" />
                             <div className="h-0.5 bg-white w-full" />
                        </div>}
                        {b.type === 'circle-icon' && <span className={b.iconColor}>{b.icon}</span>}
                        {b.type === 'tag-dark' && <span>{b.label}</span>}
                        {b.type === 'tag-soft' && (
                            <>
                                <span className="text-[10px] opacity-80">{b.icon}</span>
                                <span>{b.label}</span>
                            </>
                        )}
                        {b.type === 'currency' && <span>{b.label}</span>}
                        {b.type === 'eye-yellow' && <span>👁️</span>}
                        {b.type === 'eye-mini' && <div className="w-3 h-3 rounded-full bg-slate-900 border border-emerald-400" />}
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
}

function StaminaScreenUI() {
    return (
        <div className="flex flex-col h-full bg-[#F9F7F2] font-sans relative overflow-hidden">
            {/* Blank Screen - keeping only background */}
        </div>
    );
}

export default function StaminaAppMockup({ 
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

                {/* ── MAIN SCREEN LAYER (Flush with Frame) ── */}
                <div 
                    className="absolute inset-[6px] rounded-[3rem] bg-[#F9F7F2] overflow-hidden flex flex-col shadow-[inset_0_0_10px_rgba(0,0,0,0.4)]" 
                    style={{ transform: `translateZ(10px)`, transformStyle: "preserve-3d" }}
                >
                    <div className="absolute top-0 inset-x-0 h-14 z-[160] flex flex-col">
                        <div className="h-[32px] pt-1.5 px-8 flex items-center justify-between">
                            <span className="text-[10px] font-extrabold text-slate-800 tracking-tight">09:41</span>
                            <div className="flex items-center gap-1.5">
                                <SignalIcon color="#0f172a" />
                                <div className="w-[18px] h-[9px] border-[1px] border-slate-900 rounded-[2px] p-[1.2px] flex">
                                    <div className="w-[85%] h-full bg-slate-900 rounded-px" />
                                </div>
                            </div>
                        </div>
                        {/* Dynamic Island */}
                        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[84px] h-[25px] bg-black rounded-[14px]" />
                    </div>

                    <StaminaScreenUI />

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
