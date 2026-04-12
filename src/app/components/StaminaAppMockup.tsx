"use client";
import React, { useState, useEffect } from "react";

const SignalIcon = ({ color = "#10b981" }) => (
    <svg viewBox="0 0 17 12" fill={color} className="w-[14px] h-[10px]">
        <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
        <rect x="4" y="5" width="2.5" height="6" rx="0.5" />
        <rect x="8" y="2" width="2.5" height="9" rx="0.5" />
        <rect x="12" y="0" width="2.5" height="11" rx="0.5" opacity="0.3" />
    </svg>
);

function FeatureBubbles({ isHovered, tiltTransform }: { isHovered: boolean, tiltTransform: string }) {
    const bubbles = [
        { id: 1, label: "Heart Rate", icon: "❤️", color: "bg-rose-400", angle: -140, radius: 85, z: 120, yOffset: -180 },
        { id: 2, label: "Focus Layer", icon: "🧠", color: "bg-emerald-400", angle: -40, radius: 90, z: 160, yOffset: -150 },
        { id: 3, label: "Vocal Arc", icon: "🌊", color: "bg-sky-400", angle: 140, radius: 95, z: 130, yOffset: -60 },
        { id: 4, label: "Recovery", icon: "🔋", color: "bg-emerald-500", angle: 40, radius: 80, z: 180, yOffset: -110 }
    ];

    const snappyEase = "cubic-bezier(0.19, 1, 0.22, 1)";

    return (
        <React.Fragment>
            {bubbles.map((b) => (
                <div 
                    key={b.id}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ 
                        transformStyle: "preserve-3d",
                        transform: tiltTransform,
                        willChange: "transform",
                        zIndex: 1000
                    }}
                >
                    <div 
                        className="px-5 py-2.5 rounded-full flex items-center gap-3 backdrop-blur-xl border border-white/40 shadow-[0_30px_100px_rgba(0,0,0,0.2)] transition-all duration-[750ms] overflow-hidden"
                        style={{ 
                            backgroundColor: "rgba(255,255,255,0.92)",
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                            transitionTimingFunction: snappyEase,
                            transform: `
                                rotateZ(${isHovered ? b.angle : b.angle - 120}deg)
                                translateX(${isHovered ? b.radius : 0}px)
                                translateY(${isHovered ? b.yOffset : 0}px)
                                translateZ(${isHovered ? b.z : -250}px)
                                rotateZ(${isHovered ? -b.angle : -(b.angle - 120)}deg)
                                scale(${isHovered ? 1 : 0.4})
                            `,
                            opacity: isHovered ? 1 : 0,
                            willChange: "transform, opacity",
                        }}
                    >
                        <div className={`w-7 h-7 rounded-full ${b.color} flex items-center justify-center text-xs shadow-inner shrink-0`}>
                            {b.icon}
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900 whitespace-nowrap">
                            {b.label}
                        </span>
                        <div className="absolute -right-1 -bottom-1 text-3xl opacity-[0.05]">
                            {b.icon}
                        </div>
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
}

function StaminaInternalUI({ animKey }: { animKey: number }) {
    return (
        <div className="flex flex-col gap-6 p-6 pt-16 h-full antialiased bg-[#F0FDF4]/50">
            {/* Main Battery Card */}
            <div 
                className="w-full bg-white rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(16,185,129,0.08)] border border-emerald-50 flex flex-col items-center gap-4"
                style={{ animation: "platform-chatReveal 0.6s cubic-bezier(0.19, 1, 0.22, 1) both" }}
            >
                <div className="relative w-32 h-32 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-emerald-50" />
                        <circle
                            cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="8"
                            fill="transparent" strokeDasharray="264" strokeDashoffset="264"
                            className="text-emerald-500"
                            strokeLinecap="round"
                            style={{ 
                                animation: "platform-circleStroke 2s cubic-bezier(0.23,1,0.32,1) 0.5s both" 
                            }}
                        />
                    </svg>
                    <div className="flex flex-col items-center leading-none">
                        <span className="text-3xl font-black text-emerald-900">42<span className="text-lg">%</span></span>
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Stamina</span>
                    </div>
                </div>
                
                <div className="w-full flex flex-col gap-1 text-center">
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Guardrail Status</div>
                    <div className="text-emerald-900 font-bold text-lg">Active & Protecting</div>
                </div>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 gap-3" style={{ animation: "platform-chatReveal 0.6s cubic-bezier(0.19, 1, 0.22, 1) 0.2s both" }}>
                <div className="bg-white rounded-3xl p-4 border border-emerald-50 shadow-sm flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">HRV Buffer</span>
                    <span className="text-emerald-600 font-black text-xl">High</span>
                </div>
                <div className="bg-white rounded-3xl p-4 border border-emerald-50 shadow-sm flex flex-col gap-1">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Recovery</span>
                    <span className="text-emerald-600 font-black text-xl">2.4h</span>
                </div>
            </div>
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
    const rotateX = (18 - (externalMousePos.y * 11)); 
    const rotateY = (28 - (externalMousePos.x * 13));
    const rotateZ = (-6 - (externalMousePos.x * 4));

    const tiltTransform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${isSectionHovered ? 1.05 : 0.95})`;

    return (
        <div 
            className="w-full h-full flex items-center justify-center p-4 md:p-8 select-none relative group" 
            style={{ perspective: "3000px", transformStyle: "preserve-3d" }}
        >
            <div 
                className="relative w-[240px] md:w-[260px] h-[500px] md:h-[540px] transition-transform duration-700 ease-out"
                style={{ transformStyle: "preserve-3d", transform: tiltTransform }}
            >
                {/* ── PHONE BASE ── */}
                <div 
                    className="absolute inset-0 rounded-[3.5rem] bg-slate-900 shadow-[40px_80px_100px_rgba(0,0,0,0.3)] border-[6px] border-slate-800" 
                    style={{ transform: "translateZ(-10px)" }}
                >
                    <div className="absolute left-[-2px] top-[90px] w-[3px] h-4 bg-slate-800 rounded-l-sm border-y border-l border-white/10" />
                    <div className="absolute left-[-2px] top-[125px] w-[3px] h-10 bg-slate-800 rounded-l-sm border-y border-l border-white/10" />
                    <div className="absolute left-[-2px] top-[175px] w-[3px] h-10 bg-slate-800 rounded-l-sm border-y border-l border-white/10" />
                    <div className="absolute right-[-2px] top-[160px] w-[3px] h-14 bg-slate-800 rounded-r-sm border-y border-r border-white/10" />
                </div>

                {/* ── SCREEN ── */}
                <div 
                    className="absolute inset-[6px] rounded-[3rem] bg-[#F0FDF4] overflow-hidden flex flex-col" 
                    style={{ transform: `translateZ(15px)`, transformStyle: "preserve-3d" }}
                >
                    <div className="absolute top-0 inset-x-0 h-14 z-[160] flex flex-col">
                        <div className="h-[32px] pt-1.5 px-8 flex items-center justify-between">
                            <span className="text-[10px] font-bold text-emerald-900 tracking-tight">09:41</span>
                            <div className="flex items-center gap-1.5">
                                <SignalIcon />
                                <div className="w-[18px] h-[9px] border-[1px] border-emerald-900 rounded-[2px] p-[1.2px] flex">
                                    <div className="w-[85%] h-full bg-emerald-900 rounded-px" />
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[84px] h-[25px] bg-black rounded-[14px]" />
                    </div>

                    <StaminaInternalUI animKey={animKey} />

                    <div 
                        className="absolute inset-0 z-[50] pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-700"
                        style={{
                            background: `linear-gradient(${75 + externalMousePos.x * 20}deg, transparent, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.8) 55%, transparent)`,
                            transform: `translateX(${externalMousePos.x * 100}%)`,
                        }}
                    />
                </div>
            </div>

            <FeatureBubbles isHovered={isSectionHovered} tiltTransform={tiltTransform} />
        </div>
    );
}
