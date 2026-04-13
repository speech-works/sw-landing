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
    // Exact diverse bubbles inspired by the screenshot
    const bubbles = [
        { id: 1, type: "profile", label: "Elena", sub: "4.5 ⭐", color: "bg-white", angle: -30, radius: 100, z: 180, yOffset: -190 },
        { id: 2, type: "tag", label: "Heart Rate", color: "bg-orange-500", angle: -140, radius: 110, z: 140, yOffset: -210 },
        { id: 3, type: "tag", label: "Stress", color: "bg-pink-500", angle: 130, radius: 120, z: 150, yOffset: -50 },
        { id: 4, type: "icon-circle", icon: "👁️", color: "bg-yellow-400", angle: -80, radius: 140, z: 130, yOffset: -230 },
        { id: 5, type: "stamp", color: "bg-emerald-400", angle: 170, radius: 80, z: 110, yOffset: -120 },
        { id: 6, type: "price", label: "+12XP", color: "bg-[#FBE9E7]", angle: 45, radius: 95, z: 190, yOffset: -140 }, // Soft red tag
        { id: 7, type: "circle-badge", label: "TEAM", color: "bg-yellow-200", angle: -170, radius: 130, z: 160, yOffset: -160 },
        { id: 8, type: "tag-dark", label: "Focus", color: "bg-black", angle: -110, radius: 125, z: 140, yOffset: -180 },
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
                        className={`transition-all duration-[800ms] border border-white/20 overflow-hidden flex items-center shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                            ${b.type === 'profile'      ? 'w-24 h-12 rounded-2xl bg-white p-2 gap-2' : ''}
                            ${b.type === 'tag'          ? 'px-4 py-1.5 rounded-full text-white font-bold' : ''}
                            ${b.type === 'tag-dark'     ? 'px-4 py-1.5 rounded-lg text-white font-bold' : ''}
                            ${b.type === 'icon-circle'  ? 'w-11 h-11 rounded-full flex items-center justify-center text-xl' : ''}
                            ${b.type === 'stamp'        ? 'w-14 h-18 rounded-sm p-1.5 border-dashed border-2 border-white/40' : ''}
                            ${b.type === 'price'        ? 'px-3 py-1 rounded-full text-orange-600 font-black border-red-100 bg-[#FBE9E7]' : ''}
                            ${b.type === 'circle-badge' ? 'w-12 h-12 rounded-full border-2 border-black/10 flex flex-col items-center justify-center' : ''}
                        `}
                        style={{ 
                            backgroundColor: (b.type === 'tag' || b.type === 'tag-dark' || b.type === 'icon-circle' || b.type === 'stamp' || b.type === 'circle-badge') ? b.color : undefined,
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                            transitionTimingFunction: snappyEase,
                            transform: `
                                rotateZ(${isHovered ? b.angle : b.angle - 120}deg)
                                translateX(${isHovered ? b.radius : 0}px)
                                translateY(${isHovered ? b.yOffset : 0}px)
                                translateZ(${isHovered ? b.z : -350}px)
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
                                    <span className="text-[7px] font-bold text-slate-400 mt-0.5">{b.sub}</span>
                                </div>
                            </>
                        )}
                        {b.type === 'circle-badge' && (
                            <span className="text-[6px] font-black leading-none text-center">TEAM<br/>WORK</span>
                        )}
                        {b.type === 'tag' && <span className="text-[9px] uppercase tracking-wider">{b.label}</span>}
                        {b.type === 'tag-dark' && <span className="text-[9px] uppercase tracking-wider">{b.label}</span>}
                        {b.type === 'price' && <span className="text-[9px] font-black uppercase text-brand">{b.label}</span>}
                        {b.type === 'icon-circle' && <span>{b.icon}</span>}
                        {b.type === 'stamp' && (
                            <div className="w-full h-full border border-white/20 rounded-xs flex flex-col gap-1 items-start justify-center">
                                <div className="w-4 h-[1px] bg-white/40" />
                                <div className="w-6 h-[1px] bg-white/40" />
                                <div className="w-3 h-[1px] bg-white/40" />
                            </div>
                        )}
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
                {/* ── PHONE BASE ── */}
                <div 
                    className="absolute inset-0 rounded-[3.5rem] bg-slate-900 shadow-[20px_40px_80px_rgba(0,0,0,0.35)] border-[6px] border-slate-800" 
                    style={{ transform: "translateZ(-10px)" }}
                >
                    {/* Left side: Action Button (Short), Volume Up, Volume Down */}
                    <div className="absolute left-[-2px] top-[90px] w-[3px] h-4 bg-slate-800 rounded-l-sm border-y border-l border-white/20 shadow-[0_0_2px_rgba(255,255,255,0.1)]" />
                    <div className="absolute left-[-2px] top-[125px] w-[3px] h-11 bg-slate-800 rounded-l-sm border-y border-l border-white/20 shadow-[0_0_2px_rgba(255,255,255,0.1)]" />
                    <div className="absolute left-[-2px] top-[175px] w-[3px] h-11 bg-slate-800 rounded-l-sm border-y border-l border-white/20 shadow-[0_0_2px_rgba(255,255,255,0.1)]" />
                    
                    {/* Right side: Power Button (Long) */}
                    <div className="absolute right-[-2px] top-[160px] w-[3px] h-14 bg-slate-800 rounded-r-sm border-y border-r border-white/20 shadow-[0_0_2px_rgba(255,255,255,0.1)]" />
                </div>

                {/* ── SCREEN ── */}
                <div 
                    className="absolute inset-[6px] rounded-[3rem] bg-[#F9F7F2] overflow-hidden flex flex-col shadow-inner" 
                    style={{ transform: `translateZ(15px)`, transformStyle: "preserve-3d" }}
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
