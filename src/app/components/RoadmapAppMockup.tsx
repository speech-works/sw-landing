"use client";

import type { CSSProperties, ReactNode } from "react";

const SignalIcon = ({ color = "#1E293B" }) => (
    <svg viewBox="0 0 17 12" fill={color} className="h-[10px] w-[14px]">
        <rect x="0" y="7" width="2.5" height="4" rx="0.5" />
        <rect x="4" y="5" width="2.5" height="6" rx="0.5" />
        <rect x="8" y="2" width="2.5" height="9" rx="0.5" />
        <rect x="12" y="0" width="2.5" height="11" rx="0.5" opacity="0.3" />
    </svg>
);

const FlameIcon = ({ color = "white", className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M13.5 2.8c.44 2.22-.45 3.59-1.72 4.84-1.15 1.13-1.78 2.1-1.78 3.54 0 1.88 1.44 3.32 3.27 3.32 1.81 0 3.23-1.4 3.23-3.35 0-1.8-.95-3.12-2.59-4.69-.84 1.62-1.94 2.28-3.34 2.77.11-1.25.81-2.54 1.75-3.53 1.16-1.21 1.95-2.45 1.18-5.9Z"
            fill={color}
        />
        <path
            d="M9.22 10.98C6.73 12.26 5 14.75 5 17.55 5 21.11 7.76 24 11.5 24S18 21.11 18 17.55c0-2.05-.95-3.96-2.5-5.2.14 3.34-1.57 5.24-4.03 5.24-2.2 0-3.76-1.71-3.76-3.75 0-1.02.41-1.99 1.51-2.86Z"
            fill={color}
            opacity="0.9"
        />
    </svg>
);

const BoltIcon = ({ color = "white", className = "" }) => (
    <svg viewBox="0 0 120 160" fill="none" className={className}>
        <path
            d="M68 4 22 86h33l-7 70 50-91H67l1-61Z"
            fill={color}
        />
    </svg>
);

const MicIcon = ({ color = "#F97316", className = "" }) => (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
        <rect x="13" y="4" width="14" height="21" rx="7" fill={color} />
        <path
            d="M9 18.5c0 6.2 4.8 11.1 11 11.1s11-4.9 11-11.1"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
        />
        <path
            d="M20 29.5V36"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
        />
        <path
            d="M13.5 36H26.5"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
        />
    </svg>
);

const PlayIcon = ({
    color = "#EA580C",
    className = "",
}: {
    color?: string;
    className?: string;
}) => (
    <svg viewBox="0 0 20 20" fill="none" className={className}>
        <path d="M5 3.8 16 10 5 16.2V3.8Z" fill={color} />
    </svg>
);

const CloseIcon = ({ color = "#111827", className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M6 6 18 18M18 6 6 18"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
        />
    </svg>
);

function CenterPackRecommendationScreen() {
    return (
        <>
            <div className="absolute inset-0 overflow-hidden bg-[#F8F2E8]">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbf7f1_0%,#f5ead9_100%)]" />

                <div className="absolute left-1/2 top-0 h-[680px] w-[320px] origin-top -translate-x-1/2 scale-[0.7125] md:scale-[0.775]">
                    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,#FF8080_0%,#FF9040_100%)] shadow-[0_8px_24px_rgba(0,0,0,0.14)]">
                        <div className="absolute -right-[60px] -top-[60px] h-[200px] w-[200px] rounded-full bg-white/10" />
                        <div className="absolute -bottom-[50px] -left-[50px] h-[160px] w-[160px] rounded-full bg-white/10" />
                        <div className="absolute right-[-8px] top-[-8px] opacity-25">
                            <BoltIcon className="h-[146px] w-[110px] -rotate-[14deg]" />
                        </div>

                        <div className="relative z-10 px-6 pb-0 pt-[54px]">
                            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-[10px] py-[6px]">
                                <FlameIcon className="h-[14px] w-[14px]" />
                                <span className="text-[12px] font-bold text-white">
                                    In Progress
                                </span>
                            </div>

                            <h3 className="mb-1.5 max-w-[248px] text-[24px] font-semibold leading-[32px] tracking-[-0.4px] text-white">
                                The Art of Disclosure
                            </h3>
                            <p className="max-w-[252px] text-[14px] leading-[20px] text-white/90">
                                Reclaim control by casually introducing your
                                stutter, reducing anxiety and listener
                                confusion.
                            </p>

                            <div className="mb-8 mt-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-[12px] font-semibold text-white/90">
                                        Module 1 of 6
                                    </span>
                                    <span className="text-[12px] font-semibold text-white/90">
                                        17%
                                    </span>
                                </div>
                                <div className="h-[6px] overflow-hidden rounded-full bg-white/30">
                                    <div
                                        className="h-full rounded-full bg-white"
                                        style={{ width: "17%" }}
                                    />
                                </div>
                            </div>

                            <div className="mx-[-6px] mb-3 overflow-hidden rounded-[26px] bg-[#FFF7ED] text-center shadow-[0_-2px_12px_rgba(0,0,0,0.05)]">
                                <div className="flex flex-col items-center px-8 pb-10 pt-8">
                                    <div className="mb-5 text-[#F97316]">
                                        <MicIcon className="h-[54px] w-[54px]" />
                                    </div>
                                    <h4 className="mb-3 text-[24px] font-extrabold leading-[30px] tracking-[-0.24px] text-[#431407]">
                                        The Elephant in the Room
                                    </h4>
                                    <p className="text-[15px] leading-[22px] text-[#6B7280]">
                                        Let&apos;s defuse the bomb.
                                    </p>
                                </div>
                                <div className="clinical-pack-trigger flex items-center justify-center gap-2 bg-[#FFEDD5] py-5">
                                    <PlayIcon className="h-5 w-5" />
                                    <span className="text-[16px] font-extrabold tracking-[0.5px] text-[#EA580C]">
                                        Resume
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="absolute inset-0 bg-black/34" />

                    <div className="clinical-pack-sheet absolute inset-x-0 bottom-0 z-20 overflow-hidden rounded-t-[32px] bg-[linear-gradient(180deg,#FFFCF9_0%,#FFF7ED_100%)] shadow-[0_-10px_24px_rgba(0,0,0,0.22)]">
                        <div className="absolute right-[-38px] top-[-22px] opacity-25">
                            <BoltIcon
                                color="#FFDABF"
                                className="h-[180px] w-[135px] -rotate-[15deg]"
                            />
                        </div>

                        <div className="absolute left-1/2 top-3 h-[5px] w-[44px] -translate-x-1/2 rounded-full bg-black/12" />

                        <button
                            type="button"
                            className="absolute right-4 top-4 z-10 flex h-[34px] w-[34px] items-center justify-center rounded-full border border-black/[0.05] bg-white shadow-[0_2px_5px_rgba(0,0,0,0.1)]"
                        >
                            <CloseIcon className="h-5 w-5" />
                        </button>

                        <div className="relative z-[1] px-8 pb-8 pt-16 text-center">
                            <h3 className="mb-2 text-[28px] font-extrabold tracking-[-0.5px] text-[#111827]">
                                Ready to Resume?
                            </h3>
                            <p className="mb-8 text-[17px] leading-[26px] text-[#374151]/90">
                                Resuming: The Elephant in the Room
                            </p>

                            <div className="space-y-4">
                                <div className="rounded-[30px] shadow-[0_4px_8px_rgba(255,144,64,0.2)]">
                                    <div className="flex items-center justify-center rounded-[30px] bg-[linear-gradient(90deg,#FF9040_0%,#FF9040_100%)] px-6 py-[18px]">
                                        <PlayIcon
                                            color="#FFFFFF"
                                            className="mr-2 h-6 w-6"
                                        />
                                        <span className="text-[16px] font-bold tracking-[0.5px] text-white">
                                            Resume
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center rounded-[30px] border border-black/10 bg-white px-6 py-[18px] shadow-[0_2px_4px_rgba(0,0,0,0.05)]">
                                    <span className="text-[16px] font-bold tracking-[0.5px] text-[#374151]">
                                        Not Now
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[8px] left-1/2 z-20 h-[5px] w-[88px] -translate-x-1/2 rounded-full bg-black/90" />
            </div>

            <style>{`
                .clinical-pack-trigger {
                    transform-origin: center center;
                    animation: clinical-pack-trigger-loop 7.2s infinite;
                    will-change: transform;
                }

                .clinical-pack-sheet {
                    transform: translateY(calc(100% + 20px));
                    opacity: 0;
                    animation: clinical-pack-sheet-loop 7.2s infinite;
                    will-change: transform, opacity;
                }

                @keyframes clinical-pack-trigger-loop {
                    0%, 20%, 100% {
                        transform: scale(1);
                    }
                    21.5% {
                        transform: scale(0.96);
                    }
                    23.5% {
                        transform: scale(1.02);
                    }
                    25% {
                        transform: scale(1);
                    }
                }

                @keyframes clinical-pack-sheet-loop {
                    0%, 24%, 100% {
                        transform: translateY(calc(100% + 20px));
                        opacity: 0;
                    }
                    34% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    68% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                    80% {
                        transform: translateY(calc(100% + 20px));
                        opacity: 1;
                    }
                    81%, 99% {
                        transform: translateY(calc(100% + 20px));
                        opacity: 0;
                    }
                }
            `}</style>
        </>
    );
}

function BlankPhoneMockup({
    className = "",
    externalMousePos,
    style,
    screenContent,
}: {
    className?: string;
    externalMousePos: { x: number; y: number };
    style: CSSProperties;
    screenContent?: ReactNode;
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
                {screenContent ? (
                    <>{screenContent}</>
                ) : (
                    <>
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#fcfaf6_100%)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_116%,rgba(251,146,60,0.22)_0%,rgba(251,191,36,0.12)_18%,rgba(255,255,255,0)_48%)]" />
                        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.82)_0%,rgba(255,255,255,0.28)_36%,rgba(255,255,255,0)_62%)]" />
                        <div className="absolute inset-x-[10%] top-[18%] h-[1px] bg-black/[0.03]" />
                        <div className="absolute inset-x-[16%] top-[22%] h-[1px] bg-black/[0.025]" />
                        <div className="absolute inset-x-[12%] top-[26%] h-[1px] bg-black/[0.02]" />
                    </>
                )}

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
                className="relative -translate-x-[118px] h-[520px] w-[650px] md:-translate-x-[148px] md:h-[560px] md:w-[712px]"
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
                    screenContent={<CenterPackRecommendationScreen />}
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
