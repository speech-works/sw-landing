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
    // 8 Choice items: High Fidelity, Vibrant Gradients, Premium Lighting
    const bubbles = [
        { id: 1, type: "profile", label: "Elena", sub: "4.5 ⭐", color: "bg-white/90", angle: -5, z: 200, yOffset: -310, xOffset: 0, gradient: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)", glass: true },
        { id: 2, type: "speech", label: "Mars", color: "bg-[#D97D3C]", angle: -8, z: 120, yOffset: -245, xOffset: -55, gradient: "linear-gradient(135deg, #F28044 0%, #FFB488 100%)", glow: "shadow-[0_0_20px_rgba(242,128,68,0.4)]" },
        { id: 3, type: "speech", label: "Rennes", color: "bg-[#E94EAF]", angle: 6, z: 150, yOffset: -248, xOffset: 58, gradient: "linear-gradient(135deg, #E94EAF 0%, #FF92D0 100%)", glow: "shadow-[0_0_20px_rgba(233,78,175,0.4)]" },
        { id: 4, type: "eye-yellow", icon: "👁️", color: "bg-[#D9FD51]", angle: -12, z: 140, yOffset: -345, xOffset: -35, gradient: "linear-gradient(135deg, #D9FD51 0%, #F1FFBC 100%)", glow: "shadow-[0_0_20px_rgba(217,253,81,0.3)]" },
        { id: 5, type: "circle-icon", icon: "€", color: "bg-black", iconColor: "text-orange-500", angle: 10, z: 170, yOffset: -340, xOffset: 35, gradient: "linear-gradient(135deg, #0F1115 0%, #2A2D35 100%)", border: "border-white/20" },
        { id: 6, type: "circle-icon", icon: "+", color: "bg-black", iconColor: "text-white", angle: 15, z: 220, yOffset: -385, xOffset: 12, gradient: "linear-gradient(135deg, #0F1115 0%, #2A2D35 100%)", border: "border-white/20" },
        { id: 7, type: "team", label: "TEAM", color: "bg-[#EEE963]", angle: -5, z: 110, yOffset: -390, xOffset: -32, gradient: "linear-gradient(135deg, #EEE963 0%, #FFFBC7 100%)", glow: "shadow-[0_0_15px_rgba(238,233,99,0.3)]" },
        { id: 8, type: "stamp", color: "bg-[#4ADE80]", angle: 8, z: 130, yOffset: -222, xOffset: 15, gradient: "linear-gradient(135deg, #10B981 0%, #34D399 100%)", glow: "shadow-[0_10px_25px_rgba(16,185,129,0.2)]" },
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
                        className={`transition-all duration-[900ms] ${b.glow || 'shadow-[0_12px_40px_rgba(0,0,0,0.15)]'} flex items-center justify-center
                            ${b.glass   ? 'backdrop-blur-md border border-white/60' : ''}
                            ${b.border  ? `border ${b.border}` : ''}
                            ${b.type === 'profile'     ? 'w-28 h-12 rounded-2xl p-2 gap-2 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]' : ''}
                            ${b.type === 'speech'      ? 'px-4 py-2 rounded-[1.3rem] text-white font-black text-[10px] uppercase italic shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]' : ''}
                            ${b.type === 'eye-yellow'  ? 'w-14 h-14 rounded-full border-2 border-black/10 flex items-center justify-center text-2xl scale-110 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]' : ''}
                            ${b.type === 'team'        ? 'w-14 h-14 rounded-full flex flex-col items-center justify-center p-1 border border-black/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]' : ''}
                            ${b.type === 'stamp'       ? 'w-14 h-18 rounded-sm border-2 border-dashed border-white/60 rotate-6 shadow-lg shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)]' : ''}
                            ${b.type === 'circle-icon' ? 'w-10 h-10 rounded-full font-black text-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)]' : ''}
                        `}
                        style={{ 
                            background: b.gradient,
                            transformStyle: "preserve-3d",
                            backfaceVisibility: "hidden",
                            transitionTimingFunction: snappyEase,
                            transform: `
                                rotateZ(${isHovered ? b.angle : b.angle - 20}deg)
                                translateY(${isHovered ? b.yOffset : -240}px)
                                translateX(${isHovered ? b.xOffset : 0}px)
                                translateZ(${isHovered ? b.z : -100}px)
                                rotateZ(${isHovered ? -b.angle : -(b.angle - 20)}deg)
                                scale(${isHovered ? 1 : 0})
                            `,
                            opacity: isHovered ? 1 : 0,
                            willChange: "transform, opacity",
                        }}
                    >
                        {b.type === 'profile' && (
                            <>
                                <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0 overflow-hidden shadow-sm">
                                     <div className="w-full h-full bg-gradient-to-tr from-orange-400 to-rose-400" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-indigo-950 leading-none">{b.label}</span>
                                    <span className="text-[8px] font-bold text-slate-500 mt-0.5">{b.sub}</span>
                                </div>
                            </>
                        )}
                        {b.type === 'speech' && <span>{b.label}</span>}
                        {b.type === 'team' && (
                            <div className="flex flex-col items-center leading-none">
                                <span className="text-[5px] font-black text-slate-900/40 uppercase mb-0.5 tracking-tighter">Team</span>
                                <div className="w-4 h-4 rounded-full bg-slate-900 mb-0.5 shadow-sm" />
                                <span className="text-[5px] font-black text-slate-900/40 uppercase tracking-tighter">Pimpel</span>
                            </div>
                        )}
                        {b.type === 'stamp' && <div className="w-full h-full opacity-40 flex flex-col justify-between p-1">
                             <div className="h-0.5 bg-white w-full" />
                             <div className="h-0.5 bg-white w-2/3" />
                             <div className="h-0.5 bg-white w-full" />
                        </div>}
                        {b.type === 'circle-icon' && <span className={b.iconColor}>{b.icon}</span>}
                        {b.type === 'eye-yellow' && <span>👁️</span>}
                    </div>
                </div>
            ))}
        </React.Fragment>
    );
}

function StaminaScreenUI({ timeStr }: { timeStr: string }) {
    return (
        <div className="absolute top-0 left-0 right-0 px-[1.4rem] pt-5 pb-3 flex justify-between items-center z-40">
            {/* System Time - Scaled down slightly */}
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

function StaminaScreenUI_Placeholder() {
    return (
        <div className="w-full h-full flex items-center justify-center p-8">
            <div className="w-full max-w-[180px] space-y-4 opacity-10">
                <div className="h-4 bg-slate-900 rounded-full w-2/3 mx-auto" />
                <div className="h-32 bg-slate-900 rounded-2xl w-full" />
                <div className="h-4 bg-slate-900 rounded-full w-1/2 mx-auto" />
            </div>
        </div>
    );
}

export default function StaminaAppMockup({ 
    animKey, 
    isSectionHovered, 
    externalMousePos 
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
    const mousePos = externalMousePos || { x: 0, y: 0 };
    
    // SMOOTH / NOT TILTED (Stabilized and centered as requested)
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
                    
                    {/* Screen Layer (Flush White) */}
                    <div 
                        className="absolute inset-[5px] rounded-[3rem] bg-white overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] flex flex-col"
                        style={{ transform: "translateZ(1px)" }}
                    >
                        {/* Status Bar (System Time + Icons) */}
                        <StaminaScreenUI timeStr={mounted ? formatTime(time) : "09:41"} />

                        {/* Professional Dynamic Island (iPhone 16 Pro Max Aspect) */}
                        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[92px] h-[28px] bg-black rounded-full z-50">
                             <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-20" />
                        </div>

                        {/* Screen Content (Blank / Placeholder) */}
                        <div className="flex-1 pt-24">
                             <StaminaScreenUI_Placeholder />
                        </div>

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
