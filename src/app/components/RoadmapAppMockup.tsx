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

const CheckIcon = ({ color = "#FFFFFF", className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M5 12.5 9.2 16.7 19 7.5"
            stroke={color}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const BackChevronIcon = ({ color = "#401B00", className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M14.5 5 7.5 12l7 7"
            stroke={color}
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const SpeakerIcon = ({ color = "#FFFFFF", className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M4 14.5v-5h4l4.5-4v13L8 14.5H4Z"
            fill={color}
        />
        <path
            d="M15.5 9.2c1.2.8 2 2.2 2 3.8s-.8 3-2 3.8"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M17.8 6.8c2.1 1.5 3.4 4 3.4 6.2 0 2.3-1.3 4.8-3.4 6.2"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.75"
        />
    </svg>
);

const PauseControlIcon = ({ color = "#FFFFFF", className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <rect x="6.5" y="5" width="3.8" height="14" rx="1.2" fill={color} />
        <rect x="13.7" y="5" width="3.8" height="14" rx="1.2" fill={color} />
    </svg>
);

const SkipBackIcon = ({ color = "#FFFFFF", className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M5 6h2v12H5z" fill={color} />
        <path d="M18 6.8v10.4L9.5 12 18 6.8Z" fill={color} />
    </svg>
);

const SkipForwardIcon = ({ color = "#FFFFFF", className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M17 6h2v12h-2z" fill={color} />
        <path d="M6 6.8v10.4L14.5 12 6 6.8Z" fill={color} />
    </svg>
);

const ExpandCornersIcon = ({ color = "#FFFFFF", className = "" }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path
            d="M8 4H4v4M16 4h4v4M8 20H4v-4M16 20h4v-4"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

function LeftVideoPlayerScreen() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[#F8F2E8]">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#fbf7f1_0%,#f5ead9_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_16%,rgba(255,128,128,0.16)_0%,transparent_33%),radial-gradient(circle_at_14%_78%,rgba(255,144,64,0.18)_0%,transparent_30%)]" />

            <div className="absolute left-1/2 top-0 h-[680px] w-[320px] origin-top -translate-x-1/2 scale-[0.69] md:scale-[0.75]">
                <div className="px-0 pt-[54px] text-[#401B00]">
                    <div className="flex items-start px-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[14px] border border-black/[0.05] bg-white/78 shadow-[0_4px_14px_rgba(0,0,0,0.06)]">
                            <BackChevronIcon className="h-5 w-5" />
                        </div>

                        <div className="flex-1 px-3 pt-1 text-center">
                            <div className="mb-1 text-[11px] font-bold uppercase tracking-[1px] text-[#A1A4AA]">
                                Module 1
                            </div>
                            <div className="text-[17px] font-semibold tracking-[-0.2px] text-[#401B00]">
                                The Elephant in the Room
                            </div>
                        </div>

                        <div className="w-10" />
                    </div>

                    <div className="mt-6 h-[6px] w-full overflow-hidden bg-black/6">
                        <div className="h-full w-[52%] rounded-r-full bg-[#FF9040]" />
                    </div>

                    <div className="pt-8 text-center text-[14px] font-semibold text-[#A1A4AA]">
                        Step 1 of 2
                    </div>

                    <div className="px-6 pt-8">
                        <div className="relative h-[430px] overflow-hidden rounded-[28px] shadow-[0_18px_40px_rgba(71,24,6,0.18)]">
                            <div
                                className="absolute inset-0 bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('/assets/joseph_avatar.jpg')",
                                }}
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.04)_48%,rgba(0,0,0,0.46)_100%)]" />

                            <div className="absolute inset-x-0 bottom-0 px-5 pb-4 pt-10 text-white">
                                <div className="mb-3 flex items-center gap-2.5">
                                    <div className="relative h-[4px] flex-1 overflow-hidden rounded-full bg-white/30">
                                        <div className="absolute inset-y-0 left-0 w-[56%] rounded-full bg-[#FF9040]" />
                                        <div className="absolute left-[56%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#FFB580] bg-[#FF9040] shadow-[0_2px_10px_rgba(0,0,0,0.25)]" />
                                    </div>
                                    <span className="text-[12px] font-medium text-white/95">
                                        0:51 / 1:34
                                    </span>
                                </div>

                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-sm">
                                        <SpeakerIcon className="h-4.5 w-4.5" />
                                    </div>
                                    <div className="relative h-[4px] flex-1 overflow-hidden rounded-full bg-white/28">
                                        <div className="absolute inset-y-0 left-0 w-[84%] rounded-full bg-[#FF9040]" />
                                        <div className="absolute left-[84%] top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.25)]" />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between px-1">
                                    <div className="flex h-10 min-w-[48px] items-center justify-center rounded-full bg-white/18 px-3 text-[15px] font-extrabold text-white backdrop-blur-sm">
                                        1x
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <SkipBackIcon className="h-6.5 w-6.5" />

                                        <div className="flex h-[60px] w-[60px] items-center justify-center rounded-full border-4 border-white bg-white/10 shadow-[0_10px_24px_rgba(0,0,0,0.22)] backdrop-blur-sm">
                                            <PauseControlIcon className="h-7 w-7" />
                                        </div>

                                        <SkipForwardIcon className="h-6.5 w-6.5" />
                                    </div>

                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/12 backdrop-blur-sm">
                                        <ExpandCornersIcon className="h-5 w-5" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-6 pt-10">
                        <div className="rounded-[18px] shadow-[0_10px_22px_rgba(255,144,64,0.22)]">
                            <div className="flex items-center justify-center rounded-[18px] bg-[linear-gradient(90deg,#FF9040_0%,#FF4040_100%)] px-6 py-[17px]">
                                <PlayIcon color="#FFFFFF" className="mr-2.5 h-5 w-5" />
                                <span className="text-[16px] font-bold tracking-[0.4px] text-white">
                                    Next
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[8px] left-1/2 z-20 h-[5px] w-[88px] -translate-x-1/2 rounded-full bg-black/90" />
            </div>
        </div>
    );
}

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

                            <div className="mx-[-8px] mb-3 overflow-hidden rounded-[28px] border border-white/60 bg-[linear-gradient(180deg,#FFF9F2_0%,#FFF3E3_100%)] text-center shadow-[0_20px_42px_rgba(71,24,6,0.16),inset_0_1px_0_rgba(255,255,255,0.72)]">
                                <div className="relative">
                                    <div className="absolute -right-10 -top-10 h-[120px] w-[120px] rounded-full bg-[#F97316]/10 blur-2xl" />
                                    <div className="absolute -left-8 bottom-6 h-[90px] w-[90px] rounded-full bg-white/55 blur-xl" />

                                    <div className="relative flex flex-col items-center px-8 pb-11 pt-9">
                                        <div className="mb-5 flex h-[74px] w-[74px] items-center justify-center rounded-[24px] bg-[linear-gradient(180deg,#FFF2E2_0%,#FFE3BC_100%)] shadow-[0_14px_28px_rgba(249,115,22,0.18)] ring-1 ring-white/80">
                                            <div className="text-[#F97316]">
                                                <MicIcon className="h-[40px] w-[40px]" />
                                            </div>
                                        </div>

                                        <h4 className="mb-3 max-w-[230px] text-[24px] font-extrabold leading-[30px] tracking-[-0.28px] text-[#431407]">
                                            The Elephant in the Room
                                        </h4>
                                        <p className="max-w-[220px] text-[15px] leading-[22px] text-[#6B7280]">
                                            Let&apos;s defuse the bomb.
                                        </p>
                                    </div>
                                </div>

                                <div className="clinical-pack-trigger border-t border-[#F3DFC8] bg-[linear-gradient(180deg,#FFF1D9_0%,#FEE8C4_100%)] px-6 py-5">
                                    <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-white/55 px-5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]">
                                        <PlayIcon className="h-5 w-5" />
                                        <span className="text-[16px] font-extrabold tracking-[0.5px] text-[#EA580C]">
                                            Resume
                                        </span>
                                    </div>
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

function ReflectionLikertRow({
    selected,
    minLabel,
    maxLabel,
}: {
    selected: number;
    minLabel?: string;
    maxLabel?: string;
}) {
    return (
        <div className="space-y-2.5">
            <div className="flex items-center justify-between gap-1.5">
                {Array.from({ length: 5 }, (_, index) => {
                    const value = index + 1;
                    const isSelected = value === selected;

                    return (
                        <div
                            key={value}
                            className={`flex h-[32px] w-[32px] items-center justify-center rounded-[10px] border-[1.5px] text-[12px] font-bold transition-colors ${
                                isSelected
                                    ? "border-[#FFB066] bg-[linear-gradient(180deg,#FF9E50_0%,#F97316_100%)] text-white shadow-[0_10px_18px_rgba(249,115,22,0.26)]"
                                    : "border-[#F1D8C2] bg-[#FFF8F1] text-[#B06335]"
                            }`}
                        >
                            {value}
                        </div>
                    );
                })}
            </div>

            {(minLabel || maxLabel) && (
                <div className="flex items-center justify-between px-1 text-[10px] font-medium text-[#CDAA8E]">
                    <span>{minLabel || ""}</span>
                    <span>{maxLabel || ""}</span>
                </div>
            )}
        </div>
    );
}

function RightReflectionScreen() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(180deg,#A7644D_0%,#B56E52_42%,#C47A58_100%)]">
            <div className="absolute -right-10 -top-8 h-[150px] w-[150px] rounded-full bg-white/10 blur-md" />
            <div className="absolute -left-8 bottom-[90px] h-[110px] w-[110px] rounded-full bg-[#FFD5B0]/10 blur-md" />

            <div className="relative flex h-full flex-col px-[13px] pb-[54px] pt-[44px] text-[#0F172A]">
                <div className="flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-[11px] border border-white/20 bg-white/16 shadow-[0_4px_14px_rgba(60,22,8,0.18)] backdrop-blur-sm">
                        <BackChevronIcon color="#FFF8F1" className="h-4 w-4" />
                    </div>

                    <div className="flex-1 px-2 text-center">
                        <div className="text-[8px] font-bold uppercase tracking-[1.5px] text-[#FFE1C8]">
                            Reflection
                        </div>
                        <div className="mt-0.5 text-[13px] font-bold tracking-[-0.15px] text-white">
                            Module Reflection
                        </div>
                    </div>

                    <div className="w-8" />
                </div>

                <p className="px-1 pt-3 text-[11px] leading-[16px] text-[#FFF4EA]/82">
                    Incremental reflection after each module.
                </p>

                <div className="relative flex-1 pt-4">
                    <div className="space-y-3">
                    <div className="rounded-[18px] border border-white/55 bg-[linear-gradient(180deg,#FFF8F1_0%,#FFF1E2_100%)] p-3 shadow-[0_10px_24px_rgba(71,24,6,0.12)]">
                        <div className="mb-3 flex items-start justify-between gap-2">
                            <div className="flex-1 text-[10px] font-semibold leading-[14px] text-[#5A2914]">
                                Clarity of Concepts
                            </div>
                            <span className="rounded-[7px] bg-[#FFE6D2] px-2 py-[2px] text-[7px] font-bold uppercase tracking-[0.45px] text-[#C36A2E]">
                                Required
                            </span>
                        </div>
                        <ReflectionLikertRow selected={4} />
                    </div>

                    <div className="rounded-[18px] border border-white/55 bg-[linear-gradient(180deg,#FFF8F1_0%,#FFF1E2_100%)] p-3 shadow-[0_10px_24px_rgba(71,24,6,0.12)]">
                        <div className="mb-3 flex items-start justify-between gap-2">
                            <div className="flex-1 text-[10px] font-semibold leading-[14px] text-[#5A2914]">
                                Shift in Confidence
                            </div>
                            <span className="rounded-[7px] bg-[#FFE6D2] px-2 py-[2px] text-[7px] font-bold uppercase tracking-[0.45px] text-[#C36A2E]">
                                Required
                            </span>
                        </div>
                        <ReflectionLikertRow
                            selected={4}
                            minLabel="None"
                            maxLabel="Significant"
                        />
                    </div>

                    <div className="rounded-[18px] border border-white/55 bg-[linear-gradient(180deg,#FFF8F1_0%,#FFF1E2_100%)] p-3 shadow-[0_10px_24px_rgba(71,24,6,0.12)]">
                        <div className="mb-3 flex items-start justify-between gap-2">
                            <div className="flex-1 text-[10px] font-semibold leading-[14px] text-[#5A2914]">
                                Did this help you communicate better in real
                                life?
                            </div>
                            <span className="rounded-[7px] bg-[#FFE6D2] px-2 py-[2px] text-[7px] font-bold uppercase tracking-[0.45px] text-[#C36A2E]">
                                Required
                            </span>
                        </div>
                        <ReflectionLikertRow
                            selected={5}
                            minLabel="No"
                            maxLabel="Yes"
                        />
                    </div>
                    </div>

                    <div className="absolute inset-x-[4px] bottom-[12px] z-10">
                        <div className="overflow-hidden rounded-[14px] shadow-[0_16px_28px_rgba(249,115,22,0.22)]">
                            <div className="flex items-center justify-center gap-2 rounded-[14px] bg-[linear-gradient(90deg,#FF9C4A_0%,#F97316_100%)] px-4 py-[13px]">
                                <CheckIcon className="h-4.5 w-4.5" />
                                <span className="text-[13px] font-bold tracking-[0.15px] text-white">
                                    Complete
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-[8px] left-1/2 z-20 h-[5px] w-[88px] -translate-x-1/2 rounded-full bg-black/90" />
            </div>
        </div>
    );
}

function BlankPhoneMockup({
    className = "",
    style,
    screenContent,
    screenDepth = 10,
    useBareScreenSurface = false,
    flattenHardwareLayers = false,
}: {
    className?: string;
    style: CSSProperties;
    screenContent?: ReactNode;
    screenDepth?: number;
    useBareScreenSurface?: boolean;
    flattenHardwareLayers?: boolean;
}) {
    return (
        <div
            className={`absolute h-[500px] w-[240px] transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] md:h-[540px] md:w-[260px] ${className}`}
            style={{
                transformStyle: flattenHardwareLayers ? "flat" : "preserve-3d",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                ...style,
            }}
        >
            <div
                className="absolute inset-0 rounded-[3.5rem] bg-[#0F1115] shadow-[40px_80px_100px_rgba(0,0,0,0.6)]"
                style={{
                    transform: flattenHardwareLayers
                        ? "translateZ(0px)"
                        : "translateZ(-12px)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                }}
            />

            <div
                className="absolute inset-x-[1px] inset-y-[1px] rounded-[3.4rem] border-[0.5px] border-white/10 bg-[#0F1115]"
                style={{
                    transform: "translateZ(0px)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                }}
            >
                <div className="absolute inset-0 rounded-[3.4rem] opacity-40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_1px_0_2px_rgba(255,255,255,0.2)]" />

                <div className="absolute left-[-3px] top-[90px] h-6 w-[4px] rounded-l-[1px] border-y border-l border-white/10 bg-[#1A1D23] shadow-sm" style={{ transform: "translateZ(-2px)" }} />
                <div className="absolute left-[-3px] top-[130px] h-11 w-[4px] rounded-l-[1px] border-y border-l border-white/10 bg-[#1A1D23] shadow-sm" style={{ transform: "translateZ(-2px)" }} />
                <div className="absolute left-[-3px] top-[185px] h-11 w-[4px] rounded-l-[1px] border-y border-l border-white/10 bg-[#1A1D23] shadow-sm" style={{ transform: "translateZ(-2px)" }} />
                <div className="absolute right-[-3px] top-[160px] h-16 w-[4px] rounded-r-[1px] border-y border-r border-white/10 bg-[#1A1D23] shadow-sm" style={{ transform: "translateZ(-2px)" }} />
                <div className="absolute right-[-1.5px] bottom-[140px] h-14 w-[3px] rounded-r-md border border-white/5 bg-[#090A0C] opacity-80" style={{ transform: "translateZ(-2px)" }} />
            </div>

            <div
                className={`absolute inset-[6px] flex flex-col overflow-hidden rounded-[3rem] ${
                    useBareScreenSurface
                        ? "bg-transparent shadow-none"
                        : "bg-[#FCF9F7] shadow-[inset_0_0_10px_rgba(0,0,0,0.4)]"
                }`}
                style={{
                    transform: `translateZ(${screenDepth}px)`,
                    transformStyle: useBareScreenSurface
                        ? "flat"
                        : "preserve-3d",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    isolation: "isolate",
                }}
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
            className="relative flex h-full w-full select-none items-center justify-center p-4 md:p-8"
            style={{ perspective: "2000px" }}
        >
            <div
                key={animKey}
                className="relative -translate-x-[118px] h-[520px] w-[650px] md:-translate-x-[148px] md:h-[560px] md:w-[712px]"
                style={{ transformStyle: "preserve-3d" }}
            >
                <BlankPhoneMockup
                    className="left-[6px] top-[10px] z-10 md:left-[16px] md:top-[8px]"
                    style={{
                        transform: `rotateX(${rotateX}deg) rotateY(${mirroredRotateY}deg) rotateZ(${mirroredRotateZ}deg) scale(${activeScale})`,
                    }}
                    screenContent={<LeftVideoPlayerScreen />}
                />

                <BlankPhoneMockup
                    className="left-[218px] top-[18px] z-20 md:left-[242px] md:top-[20px]"
                    style={{
                        transform: `rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${activeScale})`,
                    }}
                    screenContent={<CenterPackRecommendationScreen />}
                />

                <BlankPhoneMockup
                    className="left-[412px] top-0 z-10 md:left-[448px] md:top-[2px]"
                    style={{
                        transform: `rotateZ(${rotateZ}deg) scale(${activeScale})`,
                    }}
                    screenDepth={0}
                    useBareScreenSurface={true}
                    flattenHardwareLayers={true}
                    screenContent={<RightReflectionScreen />}
                />
            </div>
        </div>
    );
}
