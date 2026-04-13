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
    // Highly diverse, playful bubbles inspired by Pixar/Modern UI
    const bubbles = [
        { id: 1, type: "profile", label: "Elena", sub: "4.5 ⭐", color: "bg-white", angle: -20, radius: 140, z: 200, yOffset: -280 },
        { id: 2, type: "speech", label: "Marseille", color: "bg-[#F28B44]", angle: -60, radius: 100, z: 120, yOffset: -220 },
        { id: 3, type: "speech-dark", label: "Paris", color: "bg-black", angle: 60, radius: 110, z: 150, yOffset: -240 },
        { id: 4, type: "eye", icon: "👁️", color: "bg-[#D9FD51]", angle: -100, radius: 120, z: 140, yOffset: -260 },
        { id: 5, type: "currency", label: "+18€", color: "bg-black", angle: 110, radius: 90, z: 180, yOffset: -180 },
        { id: 6, type: "currency-soft", label: "+5€", color: "bg-[#FFEBE5]", subColor: "text-orange-600", angle: 30, radius: 80, z: 160, yOffset: -200 },
        { id: 7, type: "stamp", label: "TEAM", color: "bg-[#F7F7F7]", angle: -140, radius: 130, z: 100, yOffset: -190 },
        { id: 8, type: "pill", label: "Exposure", color: "bg-white/90", icon: "📊", angle: -170, radius: 150, z: 190, yOffset: -230 },
        { id: 9, type: "plus", icon: "＋", color: "bg-black", angle: 140, radius: 115, z: 130, yOffset: -250 },
        { id: 10, type: "eye-dark", icon: "👁️", color: "bg-black", angle: 10, radius: 120, z: 110, yOffset: -150 },
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
                        className={`transition-all duration-[900ms] shadow-[0_15px_45px_rgba(0,0,0,0.12)] flex items-center justify-center
                            ${b.type === 'profile'     ? 'w-28 h-12 rounded-2xl bg-white p-2 gap-2 border border-black/5' : ''}
                            ${b.type.startsWith('speech') ? 'px-4 py-2 rounded-[1.2rem] text-white font-bold text-[10px]' : ''}
                            ${b.type === 'eye'         ? 'w-12 h-12 rounded-full border-2 border-black/10' : ''}
                            ${b.type === 'eye-dark'    ? 'w-9 h-9 rounded-full' : ''}
                            ${b.type.startsWith('currency') ? 'px-3 py-1.5 rounded-xl font-black text-[10px]' : ''}
                            ${b.type === 'stamp'        ? 'w-16 h-16 rounded-full border-[1.5px] border-black/10 flex flex-col items-center justify-center' : ''}
                            ${b.type === 'pill'         ? 'px-4 py-2 rounded-full border border-black/5 gap-2' : ''}
                            ${b.type === 'plus'         ? 'w-11 h-11 rounded-full text-white text-xl font-bold' : ''}
                        `}
                        style={{ 
                            backgroundColor: (b.type !== 'profile' && b.type !== 'pill') ? b.color : undefined,
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                            transitionTimingFunction: snappyEase,
                            transform: `
                                rotateZ(${isHovered ? b.angle : b.angle - 60}deg)
                                translateY(${isHovered ? b.yOffset : 0}px)
                                translateX(${isHovered ? (b.angle > 0 ? 40 : -40) : 0}px)
                                translateZ(${isHovered ? b.z : -100}px)
                                rotateZ(${isHovered ? -b.angle : -(b.angle - 60)}deg)
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
                        {b.type === 'stamp' && (
                            <>
                                <span className="text-[6px] font-black leading-none text-center opacity-40 uppercase tracking-tighter">Team</span>
                                <span className="text-[8px] font-black leading-none text-center uppercase tracking-tighter">Pimpel</span>
                            </>
                        )}
                        {b.type === 'pill' && (
                            <>
                                <span className="text-xs">{b.icon}</span>
                                <span className="text-[10px] font-bold text-slate-700">{b.label}</span>
                            </>
                        )}
                        {b.type.startsWith('speech') && <span className="uppercase tracking-tight">{b.label}</span>}
                        {b.type === 'currency' && <span className="text-white">{b.label}</span>}
                        {b.type === 'currency-soft' && <span className={b.subColor}>{b.label}</span>}
                        {(b.type === 'eye' || b.type === 'eye-dark' || b.type === 'plus') && <span>{b.icon}</span>}
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
}

function StaminaScreenUI() {
    return (
        <div className="flex flex-col h-full bg-[#F9F7F2] font-sans p-6 pt-20 relative overflow-hidden">
            {/* Header / Meta */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden shadow-sm border border-white">
                    <div className="w-full h-full bg-gradient-to-b from-indigo-500 to-indigo-700" />
                </div>
                <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Biological Center</span>
            </div>

            {/* Central Typography - matches screenshot style */}
            <div className="flex-1 flex flex-col items-center justify-center text-center mt-[-40px]">
                <h2 className="text-[32px] md:text-[38px] font-black text-slate-900 leading-[0.95] tracking-tighter">
                    Sustainable
                    <br />
                    Speech
                    <br />
                    Stamina.
                </h2>
                
                {/* Floating Avatars on screen */}
                <div className="absolute top-[45%] left-10 w-8 h-8 rounded-full bg-brand p-0.5 shadow-lg border border-white">
                     <div className="w-full h-full rounded-full bg-indigo-500 overflow-hidden" />
                </div>
                <div className="absolute top-[60%] right-8 w-10 h-10 rounded-full bg-rose-400 p-0.5 shadow-lg border border-white">
                     <div className="w-full h-full rounded-full bg-orange-400 overflow-hidden" />
                </div>
            </div>

            {/* Bottom Input Area - matches screenshot style */}
            <div className="mt-auto mb-2 flex items-center justify-between gap-3">
                 <div className="flex-1 h-10 rounded-full bg-[#1e1b4b] flex items-center px-4">
                     <span className="text-[10px] font-bold text-white/40">Secure Session Monitoring</span>
                 </div>
                 <div className="flex gap-2">
                     <div className="w-5 h-5 flex items-center justify-center text-slate-900 opacity-50">❤️</div>
                     <div className="w-5 h-5 flex items-center justify-center text-slate-900 opacity-50">🔒</div>
                 </div>
            </div>
            
            {/* Nav underline */}
            <div className="w-12 h-1 bg-slate-900 rounded-full mx-auto mt-2" />
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
