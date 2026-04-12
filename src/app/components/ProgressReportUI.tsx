"use client";
import React from "react";

// -------------------------------------------------------
// ICONS (FontAwesome5 exact paths)
// -------------------------------------------------------

const ChevronLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px] text-[#1E293B]">
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChartLineIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
    </svg>
);

const ClockIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
);

const FireIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <path d="M12 2c0 1.8-1.5 3.3-3.3 3.3 0 1.8 1.5 3.3 3.3 3.3 1.8 0 3.3-1.5 3.3-3.3C15.3 3.5 13.8 2 12 2zM8.5 22c4.1 0 7.5-3.4 7.5-7.5 0-1.8-.6-3.4-1.7-4.7C13.2 11.2 12 13 12 15c0-2-1.2-3.8-2.3-5.2-1.1 1.3-1.7 2.9-1.7 4.7 0 4.1 3.4 7.5 7.5 7.5z" />
    </svg>
);

const PieChartIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
);

// -------------------------------------------------------
// SECTIONS (Scaled-down internal elements)
// -------------------------------------------------------

const DetailedWeeklySummary = () => (
    <div className="relative rounded-[20px] overflow-hidden bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-lg shadow-purple-500/30 p-[18px] group/card">
        {/* Iridescent Shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover/card:animate-card-shimmer bg-gradient-to-r from-transparent via-white/[0.1] to-transparent -translate-x-full" />
        
        <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] rounded-full bg-white/[0.08] transition-transform duration-1000 group-hover/card:translate-y-[-10px]" />
        <div className="absolute bottom-[-40px] left-[-40px] w-[140px] h-[140px] rounded-full bg-white/[0.08] transition-transform duration-1000 group-hover/card:translate-y-[10px]" />
        
        <div className="relative z-10 flex flex-col gap-[20px]">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h4 className="text-[10px] font-bold text-white/90 tracking-[1px] uppercase mb-[4px]">PATHFINDER V</h4>
                    <p className="text-[13px] font-medium text-white shadow-sm leading-snug">
                        You are mapping unknown territory, forging completely new neurological pathways with every day of practice. Keep marching forward; the path is clearing.
                    </p>
                </div>
                <div className="shrink-0 flex items-center pt-1 ml-2">
                    <ChartLineIcon />
                </div>
            </div>

            <div className="flex gap-[10px]">
                {/* Practice Time */}
                <div className="flex-1 bg-white/12 rounded-[14px] p-[10px] px-[14px] flex items-center gap-[8px] border border-white/5 transition-transform group-hover/card:scale-[1.02]">
                    <ClockIcon />
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-[4px]">
                            <span className="text-[20px] font-black text-white leading-tight">5m</span>
                            <div className="px-[6px] py-[2px] rounded-[10px] bg-white/30 border border-white/10 flex items-center justify-center">
                                <span className="text-[10px] font-black text-emerald-800 tracking-tighter">↑ 12%</span>
                            </div>
                        </div>
                        <span className="text-[11px] font-bold text-white/70">Practice Time</span>
                    </div>
                </div>

                {/* Days Active */}
                <div className="flex-1 bg-white/12 rounded-[14px] p-[10px] px-[14px] flex items-center gap-[8px] border border-white/5 transition-transform group-hover/card:scale-[1.02]">
                    <FireIcon />
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-[4px]">
                            <span className="text-[20px] font-black text-white leading-tight">0</span>
                        </div>
                        <span className="text-[11px] font-bold text-white/70">Days Active</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const DPSummary = () => (
    <div className="relative rounded-[20px] overflow-hidden bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] shadow-lg shadow-blue-500/20 p-[18px] group/card">
        {/* Iridescent Shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover/card:animate-card-shimmer bg-gradient-to-r from-transparent via-white/[0.1] to-transparent -translate-x-full" />

        <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] rounded-full bg-white/6 transition-transform duration-1000 group-hover/card:translate-y-[-5px]" />
        <div className="absolute bottom-[-40px] left-[-40px] w-[140px] h-[140px] rounded-full bg-white/6 transition-transform duration-1000 group-hover/card:translate-y-[5px]" />
        
        <div className="relative z-10 flex flex-col gap-[16px]">
            <div className="flex justify-between items-center">
                <div>
                    <h4 className="text-[10px] font-bold text-white/90 tracking-[1px] uppercase mb-0.5">PRACTICE DISTRIBUTION</h4>
                    <p className="text-[12px] text-white/70 font-medium">Category breakdown this week</p>
                </div>
                <div className="w-[30px] h-[30px] rounded-[9px] bg-white/15 flex items-center justify-center border border-white/5">
                    <PieChartIcon />
                </div>
            </div>

            <div className="flex flex-wrap gap-[6px] justify-center">
                {["Cognitive", "Fun", "Exposure", "Reading"].map((label, i) => {
                    const colors = ["#FB923C", "#60A5FA", "#34D399", "#FCD34D"];
                    return (
                        <div key={label} className="bg-white/10 border border-white/5 px-[10px] py-[4px] rounded-[18px] flex items-center gap-[5px] transition-all group-hover/card:bg-white/15">
                            <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: colors[i] }} />
                            <span className="text-[10px] font-bold text-white">{label}</span>
                        </div>
                    );
                })}
            </div>

            <div className="relative flex items-center justify-center py-2 h-[160px] transition-transform duration-700 group-hover/card:scale-[1.05]">
                <svg viewBox="0 0 100 100" className="w-[150px] h-[150px] -rotate-90 drop-shadow-xl">
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#fb923c" strokeWidth="14" strokeDasharray="263.8" strokeDashoffset={263.8 * (1 - 0.34)} strokeLinecap="round" />
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#60a5fa" strokeWidth="14" strokeDasharray="263.8" strokeDashoffset={263.8 * (1 - 0.28)} strokeLinecap="round" transform="rotate(122.4 50 50)" />
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#34d399" strokeWidth="14" strokeDasharray="263.8" strokeDashoffset={263.8 * (1 - 0.19)} strokeLinecap="round" transform="rotate(223.2 50 50)" />
                    <circle cx="50" cy="50" r="42" fill="transparent" stroke="#fcd34d" strokeWidth="14" strokeDasharray="263.8" strokeDashoffset={263.8 * (1 - 0.19)} strokeLinecap="round" transform="rotate(291.6 50 50)" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white w-[90px] h-[90px] rounded-full shadow-lg flex flex-col items-center justify-center border-[3px] border-black/[0.02] transform transition-transform group-hover/card:scale-110">
                        <span className="text-[8px] font-black text-slate-400 tracking-[1px] uppercase">TOTAL</span>
                        <span className="text-[20px] font-black text-[#1E293B]">11m</span>
                    </div>
                </div>

                <div className="absolute top-[20%] right-[15%] bg-white px-[7px] py-[3px] rounded-[10px] shadow-sm text-[9px] font-black text-[#1E293B] border border-black/5 transform transition-transform group-hover/card:translate-y-[-2px]">34%</div>
                <div className="absolute bottom-[22%] right-[22%] bg-white px-[7px] py-[3px] rounded-[10px] shadow-sm text-[9px] font-black text-[#1E293B] border border-black/5 transform transition-transform group-hover/card:translate-y-[-2px]">28%</div>
                <div className="absolute bottom-[22%] left-[12%] bg-white px-[7px] py-[3px] rounded-[10px] shadow-sm text-[9px] font-black text-[#1E293B] border border-black/5 transform transition-transform group-hover/card:translate-y-[-2px]">19%</div>
                <div className="absolute top-[25%] left-[18%] bg-white px-[7px] py-[3px] rounded-[10px] shadow-sm text-[9px] font-black text-[#1E293B] border border-black/5 transform transition-transform group-hover/card:translate-y-[-2px]">19%</div>
            </div>

            <div className="grid grid-cols-2 gap-[10px]">
                <div className="relative bg-white/10 rounded-[16px] p-[14px] border border-white/12 flex flex-col gap-[10px] overflow-hidden transition-all group-hover/card:bg-white/15">
                    <div className="absolute -bottom-2 -right-1 opacity-10 transition-transform group-hover/card:scale-125">
                        <svg width="40" height="40" fill="white" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                    </div>
                    <div className="flex flex-col gap-0.5 z-10">
                        <span className="text-[12px] font-bold text-white/80">Cognitive</span>
                        <span className="text-[18px] font-black text-white leading-none">4m</span>
                    </div>
                    <div className="h-[4px] bg-white/15 rounded-full overflow-hidden z-10 pr-4">
                        <div className="h-full bg-[#FB923C] w-[66%] shadow-[0_0_8px_rgba(251,146,60,0.4)]" />
                    </div>
                </div>
                <div className="relative bg-white/10 rounded-[16px] p-[14px] border border-white/12 flex flex-col gap-[10px] overflow-hidden transition-all group-hover/card:bg-white/15">
                    <div className="absolute -bottom-2 -right-1 opacity-10 transition-transform group-hover/card:scale-125">
                        <svg width="40" height="40" fill="white" viewBox="0 0 24 24"><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-12h1v1h-1v-1zm4 0h1v1h-1v-1zm-6.5 5h10v1h-10v-1z"/></svg>
                    </div>
                    <div className="flex flex-col gap-0.5 z-10">
                        <span className="text-[12px] font-bold text-white/80">Fun</span>
                        <span className="text-[18px] font-black text-white leading-none">3m</span>
                    </div>
                    <div className="h-[4px] bg-white/15 rounded-full overflow-hidden z-10 pr-4">
                        <div className="h-full bg-[#60A5FA] w-[45%] shadow-[0_0_8px_rgba(96,165,250,0.4)]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const Achievements = () => (
    <div className="relative rounded-[20px] overflow-hidden bg-gradient-to-br from-[#10B981] to-[#059669] shadow-lg shadow-emerald-500/20 p-[18px] group/card">
        {/* Iridescent Shimmer */}
        <div className="absolute inset-0 opacity-0 group-hover/card:animate-card-shimmer bg-gradient-to-r from-transparent via-white/[0.1] to-transparent -translate-x-full" />

        <div className="absolute top-[-50px] right-[-50px] w-[180px] h-[180px] rounded-full bg-white/10 transition-transform duration-1000 group-hover/card:translate-y-[-8px]" />
        <div className="absolute bottom-[-40px] left-[-40px] w-[140px] h-[140px] rounded-full bg-white/10 transition-transform duration-1000 group-hover/card:translate-y-[8px]" />
        
        <div className="relative z-10 flex flex-col gap-[16px]">
            <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-bold text-white/90 tracking-[1px] uppercase">ACHIEVEMENTS</h4>
                <div className="w-[30px] h-[30px] rounded-[9px] bg-white/15 flex items-center justify-center border border-white/5 shadow-inner">
                    <span className="text-white text-base">⭐</span>
                </div>
            </div>
            <div className="bg-white/20 border border-white/30 px-[14px] py-[8px] rounded-[14px] self-start shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-transform group-hover/card:scale-105">
                <span className="text-[16px] font-black text-white">450 XP</span>
            </div>
            <div className="flex flex-col gap-[6px]">
                <div className="h-[10px] bg-white/20 rounded-[5px] border border-white/20 overflow-hidden relative">
                    <div className="h-full bg-white w-[65%] shadow-[0_0_10px_white]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-card-shimmer w-[40px]" />
                </div>
                <span className="text-[11px] font-bold text-white/85">Only 150 XP more for Level 6</span>
            </div>
            <div className="relative bg-white/12 border border-white/20 rounded-[16px] p-[16px] flex flex-col gap-[10px] overflow-visible mt-2 transition-all group-hover/card:bg-white/15">
                <div className="absolute top-[-8px] right-[-4px] bg-[#F43F5E] px-[8px] py-[3px] rounded-[10px] shadow-lg z-20 transition-transform group-hover/card:scale-110">
                    <span className="text-[9px] font-black text-white uppercase tracking-[0.5px]">You're here</span>
                </div>
                <div className="flex items-center gap-[12px]">
                    <div className="w-[44px] h-[44px] rounded-full bg-white/20 border border-white/30 flex items-center justify-center shadow-inner group-hover/card:scale-105 transition-transform">
                        <span className="text-xl">🏅</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-extrabold text-white/70 uppercase tracking-[0.8px]">Current Stage • Level 5</span>
                        <span className="text-[12px] font-bold text-white">Neural Pioneer</span>
                    </div>
                </div>
                <p className="text-[10px] font-medium text-white/90 leading-relaxed italic">
                    "You've successfully established basic pathways. Stability is improving daily."
                </p>
            </div>
        </div>
    </div>
);

// -------------------------------------------------------
// MAIN COMPONENT
// -------------------------------------------------------

export default function ProgressReportUI() {
    return (
        <div className="flex-1 w-full bg-[#FCF9F7] flex flex-col overflow-hidden relative">

            {/* Translucent Header - Pinned to absolute top edge */}
            <div className="absolute top-0 left-0 right-0 h-[56px] z-[120] bg-[#FCF9F7]/85 backdrop-blur-xl border-b border-black/5 flex items-end pb-[4px] px-6">
                <div className="flex items-center gap-4 w-full">
                    <div className="w-[30px] h-[30px] rounded-full bg-white shadow-md border border-black/5 flex items-center justify-center shrink-0">
                        <ChevronLeft />
                    </div>
                    <span className="text-[15px] font-bold text-[#1E293B]">Progress Report</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-[6px] scrollbar-hide scale-[0.92] origin-top">
                {/* Scroll Margin (Sticks cards close to header) */}
                <div className="h-[58px] shrink-0" />

                <div className="flex flex-col gap-[16px] pb-40 animate-yoyo-scroll pt-2">
                    <DetailedWeeklySummary />
                    <DPSummary />
                    <Achievements />

                    {/* Buffer for smooth loop */}
                    <div className="h-20" />
                </div>
            </div>

            <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes yoyo-scroll {
          0%, 10% { transform: translateY(0); }
          45%, 55% { transform: translateY(-720px); }
          90%, 100% { transform: translateY(0); }
        }

        .animate-yoyo-scroll {
          animation: yoyo-scroll 32s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
      `}</style>
        </div>
    );
}
