"use client";

import type { CSSProperties } from "react";

const SignalIcon = ({ color = "#1E293B" }) => (
    <svg viewBox="0 0 17 12" fill={color} className="h-[10px] w-[14px]">
        <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
        <rect x="4" y="5" width="2.5" height="6" rx="0.5" />
        <rect x="8" y="2" width="2.5" height="9" rx="0.5" />
        <rect x="12" y="0" width="2.5" height="11" rx="0.5" opacity="0.3" />
    </svg>
);

function BlankPhoneMockup({
    className = "",
    externalMousePos,
    style,
}: {
    className?: string;
    externalMousePos: { x: number; y: number };
    style: CSSProperties;
}) {
    return (
        <div
            className={`absolute h-[500px] w-[240px] transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] md:h-[540px] md:w-[260px] ${className}`}
            style={{
                transformStyle: "preserve-3d",
                ...style,
            }}
        >
            <div
                className="absolute inset-0 rounded-[3.5rem] bg-[#0F1115] shadow-[40px_80px_100px_rgba(0,0,0,0.6)]"
                style={{ transform: "translateZ(-12px)" }}
            />

            <div
                className="absolute inset-x-[1px] inset-y-[1px] rounded-[3.4rem] border-[0.5px] border-white/10 bg-[#0F1115]"
                style={{ transform: "translateZ(0px)" }}
            >
                <div className="absolute inset-0 rounded-[3.4rem] opacity-40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_1px_0_2px_rgba(255,255,255,0.2)]" />

                <div className="absolute left-[-3px] top-[90px] h-6 w-[4px] rounded-l-[1px] border-y border-l border-white/10 bg-[#1A1D23] shadow-sm" style={{ transform: "translateZ(-2px)" }} />
                <div className="absolute left-[-3px] top-[130px] h-11 w-[4px] rounded-l-[1px] border-y border-l border-white/10 bg-[#1A1D23] shadow-sm" style={{ transform: "translateZ(-2px)" }} />
                <div className="absolute left-[-3px] top-[185px] h-11 w-[4px] rounded-l-[1px] border-y border-l border-white/10 bg-[#1A1D23] shadow-sm" style={{ transform: "translateZ(-2px)" }} />
                <div className="absolute right-[-3px] top-[160px] h-16 w-[4px] rounded-r-[1px] border-y border-r border-white/10 bg-[#1A1D23] shadow-sm" style={{ transform: "translateZ(-2px)" }} />
                <div className="absolute right-[-1.5px] bottom-[140px] h-14 w-[3px] rounded-r-md border border-white/5 bg-[#090A0C] opacity-80" style={{ transform: "translateZ(-2px)" }} />

                <div
                    className="absolute inset-0 rounded-[3.4rem] opacity-0 transition-opacity duration-1000 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle at ${50 + externalMousePos.x * 50}% ${50 + externalMousePos.y * 50}%, rgba(255,255,255,0.08) 0%, transparent 60%)`,
                    }}
                />
            </div>

            <div
                className="absolute inset-[6px] flex flex-col overflow-hidden rounded-[3rem] bg-[#FCF9F7] shadow-[inset_0_0_10px_rgba(0,0,0,0.4)]"
                style={{ transform: "translateZ(10px)", transformStyle: "preserve-3d" }}
            >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf6_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_116%,rgba(251,146,60,0.22)_0%,rgba(251,191,36,0.12)_18%,rgba(255,255,255,0)_48%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.28)_36%,rgba(255,255,255,0)_62%)]" />
                <div className="absolute inset-x-[10%] top-[18%] h-[1px] bg-black/[0.03]" />
                <div className="absolute inset-x-[16%] top-[22%] h-[1px] bg-black/[0.025]" />
                <div className="absolute inset-x-[12%] top-[26%] h-[1px] bg-black/[0.02]" />

                <div
                    className="absolute inset-0 z-[150] pointer-events-none mix-blend-overlay opacity-0 transition-all duration-700 group-hover:opacity-40"
                    style={{
                        background: `linear-gradient(${105 + externalMousePos.x * 30}deg, transparent, rgba(255,255,255,0.4) 45%, rgba(255,255,255,0.4) 55%, transparent)`,
                        transform: `translateX(${externalMousePos.x * 100}%)`,
                    }}
                />

                <div className="pointer-events-none absolute inset-x-0 top-0 z-[160] h-14">
                    <div className="flex h-[32px] items-center justify-between px-8 pt-1">
                        <span className="text-[10px] font-bold tracking-tight text-slate-900">23:05</span>
                        <div className="flex items-center gap-1.5">
                            <SignalIcon />
                            <div className="flex h-[9px] w-[18px] rounded-[2px] border-[1px] border-slate-900 p-[1.2px]">
                                <div className="h-full w-[85%] rounded-px bg-slate-900" />
                            </div>
                        </div>
                    </div>

                    <div className="absolute left-1/2 top-[10px] flex h-[25px] w-[84px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-[14px] bg-black">
                        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-15" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function RoadmapAppMockup({
    animKey,
    isSectionHovered = false,
    externalMousePos = { x: 0, y: 0 },
}: {
    animKey: number;
    isSectionHovered?: boolean;
    externalMousePos?: { x: number; y: number };
}) {
    const rotateX = 18 - externalMousePos.y * 10;
    const rotateY = -26 + externalMousePos.x * 12;
    const rotateZ = 6 + externalMousePos.x * 3;
    const baseScale = 0.7;
    const idleScale = 0.95 * baseScale;
    const hoverScale = 1.04 * baseScale;
    const activeScale = isSectionHovered ? hoverScale : idleScale;
    const mirroredRotateY = -rotateY;
    const mirroredRotateZ = -rotateZ;

    return (
        <div
            className="relative flex h-full w-full select-none items-center justify-center p-4 md:p-8 group"
            style={{ perspective: "2000px" }}
        >
            <div
                key={animKey}
                className="relative h-[520px] w-[650px] md:h-[560px] md:w-[712px]"
                style={{ transformStyle: "preserve-3d" }}
            >
                <BlankPhoneMockup
                    className="left-[6px] top-[10px] z-10 md:left-[16px] md:top-[8px]"
                    externalMousePos={externalMousePos}
                    style={{
                        transform: `rotateX(${rotateX}deg) rotateY(${mirroredRotateY}deg) rotateZ(${mirroredRotateZ}deg) scale(${activeScale})`,
                    }}
                />

                <BlankPhoneMockup
                    className="left-[218px] top-[18px] z-20 md:left-[242px] md:top-[20px]"
                    externalMousePos={externalMousePos}
                    style={{
                        transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${activeScale})`,
                    }}
                />

                <BlankPhoneMockup
                    className="left-[412px] top-0 z-10 md:left-[448px] md:top-[2px]"
                    externalMousePos={externalMousePos}
                    style={{
                        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${activeScale})`,
                    }}
                />
            </div>
        </div>
    );
}
