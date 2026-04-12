"use client";
import React from "react";

// -------------------------------------------------------
// ICONS (Pixel-Perfect SVGs based on FontAwesome/Expo)
// -------------------------------------------------------

const ChevronLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-900">
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChartLineIcon = ({ size = 20, color = "rgba(255,255,255,0.9)" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" />
    </svg>
);

const ClockIcon = ({ size = 18, color = "rgba(255,255,255,0.9)" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
    </svg>
);

const FireIcon = ({ size = 18, color = "rgba(255,255,255,0.9)" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M12 2c0 1.8-1.5 3.3-3.3 3.3 0 1.8 1.5 3.3 3.3 3.3 1.8 0 3.3-1.5 3.3-3.3C15.3 3.5 13.8 2 12 2zM8.5 22c4.1 0 7.5-3.4 7.5-7.5 0-1.8-.6-3.4-1.7-4.7C13.2 11.2 12 13 12 15c0-2-1.2-3.8-2.3-5.2-1.1 1.3-1.7 2.9-1.7 4.7 0 4.1 3.4 7.5 7.5 7.5z" />
    </svg>
);

const PieChartIcon = ({ size = 16, color = "#FFFFFF" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
);

const HeartIcon = ({ size = 140, color = "rgba(255,255,255,0.08)" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const TrophyIcon = ({ size = 140, color = "rgba(255,255,255,0.08)" }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" /><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" /><path d="M4 22h16" /><path d="M10 22V18" /><path d="M14 22V18" /><path d="M18 4H6v7a6 6 0 0 0 12 0V4z" />
    </svg>
);

// -------------------------------------------------------
// SUB-COMPONENTS
// -------------------------------------------------------

const DetailedWeeklySummary = () => (
    <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-lg shadow-purple-500/30 p-5 min-h-[180px]">
        {/* Decor */}
        <div className="absolute -top-[60px] -right-[60px] w-[200px] height-[200px] rounded-full bg-white/10 blur-xl" />
        <div className="absolute -bottom-[50px] -left-[50px] w-[160px] height-[160px] rounded-full bg-white/10 blur-lg" />
        <div className="absolute right-[-40px] top-[-20px] opacity-[0.6] text-white/10">
            <svg width="140" height="140" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/></svg>
        </div>

        <div className="relative z-10 flex flex-col gap-6 h-full">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h3 className="text-[11px] font-bold text-white/90 tracking-[1.2px] uppercase mb-1">Pathfinder V</h3>
                    <p className="text-[14px] font-medium text-white/85 leading-relaxed pr-8">
                        You are mapping unknown territory, forging completely new neurological pathways. Keep marching forward.
                    </p>
                </div>
                <div className="shrink-0 flex items-center">
                    <ChartLineIcon />
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1 bg-white/15 rounded-[16px] p-3 flex items-center gap-2.5 border border-white/10">
                    <ClockIcon />
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-white leading-none tracking-tight">5m</span>
                            <div className="px-2 py-0.5 rounded-full bg-white/35 border border-white/20 text-[12px] font-extrabold text-[#047857]">↑ 12%</div>
                        </div>
                        <span className="text-[12px] font-semibold text-white/75 mt-0.5">Practice Time</span>
                    </div>
                </div>

                <div className="flex-1 bg-white/15 rounded-[16px] p-3 flex items-center gap-2.5 border border-white/10">
                    <FireIcon />
                    <div className="flex flex-col">
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-black text-white leading-none tracking-tight">0</span>
                        </div>
                        <span className="text-[12px] font-semibold text-white/75 mt-0.5">Days Active</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const DPSummary = () => (
    <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] shadow-lg shadow-blue-500/20 p-5 min-h-[280px]">
        {/* Decor */}
        <div className="absolute -top-[60px] -right-[60px] w-[200px] height-[200px] rounded-full bg-white/8 blur-xl" />
        <div className="absolute -bottom-[50px] -left-[50px] w-[160px] height-[160px] rounded-full bg-white/8 blur-lg" />

        <div className="relative z-10 flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-[11px] font-bold text-white/90 tracking-[1.2px] uppercase mb-0.5">Practice Distribution</h3>
                    <p className="text-[13px] text-white/70">Category breakdown this week</p>
                </div>
                <div className="w-8 h-8 rounded-[10px] bg-white/15 flex items-center justify-center border border-white/10">
                   <PieChartIcon />
                </div>
            </div>

            {/* Legend Capsules */}
            <div className="flex flex-wrap gap-2 justify-center">
                <div className="px-3 py-1 rounded-full bg-white/12 border border-white/10 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FB923C]" />
                    <span className="text-[11px] font-bold text-white">Cognitive</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/12 border border-white/10 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#60A5FA]" />
                    <span className="text-[11px] font-bold text-white">Fun</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/12 border border-white/10 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#34D399]" />
                    <span className="text-[11px] font-bold text-white">Exposure</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-white/12 border border-white/10 flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#FCD34D]" />
                    <span className="text-[11px] font-bold text-white">Reading</span>
                </div>
            </div>

            {/* Donut Chart Mockup */}
            <div className="relative flex items-center justify-center py-4">
                 <svg viewBox="0 0 100 100" className="w-48 h-48 -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                    {/* Orange: 34% (Cognitive) */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#fb923c" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.34)} strokeLinecap="round" />
                    {/* Blue: 28% (Fun) */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#60a5fa" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.28)} transform="rotate(122.4 50 50)" strokeLinecap="round" />
                    {/* Emerald: 19% (Exposure) */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#34d399" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.19)} transform="rotate(223.2 50 50)" strokeLinecap="round" />
                    {/* Yellow: 19% (Reading) */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#fcd34d" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.19)} transform="rotate(291.6 50 50)" strokeLinecap="round" />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="bg-white w-[110px] h-[110px] rounded-full shadow-lg flex flex-col items-center justify-center border-4 border-black/5">
                      <span className="text-[9px] font-black text-slate-400 tracking-widest uppercase mb-0.5">Total</span>
                      <span className="text-[22px] font-black text-[#1E293B] tracking-tight leading-none">11m</span>
                    </div>
                 </div>

                 {/* Percentage Badges */}
                 <div className="absolute top-[18%] right-[12%] bg-white px-2 py-0.5 rounded-[12px] shadow-lg text-[10px] font-black text-[#1E293B]">34%</div>
                 <div className="absolute bottom-[12%] right-[22%] bg-white px-2 py-0.5 rounded-[12px] shadow-lg text-[10px] font-black text-[#1E293B]">28%</div>
                 <div className="absolute bottom-[22%] left-[12%] bg-white px-2 py-0.5 rounded-[12px] shadow-lg text-[10px] font-black text-[#1E293B]">19%</div>
                 <div className="absolute top-[22%] left-[18%] bg-white px-2 py-0.5 rounded-[12px] shadow-lg text-[10px] font-black text-[#1E293B]">19%</div>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-2 gap-3">
                <div className="relative bg-white/10 rounded-[18px] p-4 border border-white/15 overflow-hidden flex flex-col gap-3">
                    <div className="absolute bottom-[-15px] right-[-10px] opacity-[0.8]">
                        <svg width="60" height="60" fill="rgba(255,255,255,0.08)" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                    <div>
                        <span className="text-[13px] font-semibold text-white/80 block">Cognitive</span>
                        <span className="text-[20px] font-black text-white leading-none">4m</span>
                    </div>
                    <div className="h-[5px] bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#FB923C] w-[66%]" />
                    </div>
                </div>

                <div className="relative bg-white/10 rounded-[18px] p-4 border border-white/15 overflow-hidden flex flex-col gap-3">
                    <div className="absolute bottom-[-15px] right-[-10px] opacity-[0.8]">
                        <svg width="60" height="60" fill="rgba(255,255,255,0.08)" viewBox="0 0 24 24"><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.5-12h1v1h-1v-1zm4 0h1v1h-1v-1zm-6.5 5h10v1h-10v-1z"/></svg>
                    </div>
                    <div>
                        <span className="text-[13px] font-semibold text-white/80 block">Fun</span>
                        <span className="text-[20px] font-black text-white leading-none">3m</span>
                    </div>
                    <div className="h-[5px] bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#60A5FA] w-[50%]" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const MoodSummary = () => (
    <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#14B8A6] to-[#06B6D4] shadow-lg shadow-teal-500/20 p-5 min-h-[240px]">
        {/* Decor */}
        <div className="absolute -top-[60px] -right-[60px] w-[200px] height-[200px] rounded-full bg-white/10 blur-xl" />
        <div className="absolute -bottom-[50px] -left-[50px] w-[160px] height-[160px] rounded-full bg-white/10 blur-lg" />
        <div className="absolute left-[-40px] top-[-20px] opacity-[0.6]">
            <HeartIcon />
        </div>

        <div className="relative z-10 flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-white/90 tracking-[1.2px] uppercase">Mood Summary</h3>
                <div className="flex items-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                </div>
            </div>

            <div className="flex flex-wrap gap-3">
                <div className="flex-1 min-w-[100px] bg-white/15 rounded-[16px] p-4 flex flex-col items-center gap-2 border border-white/20">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-3xl">😊</span>
                    </div>
                    <span className="text-[12px] font-semibold text-white/85">Happy</span>
                    <span className="text-[20px] font-black text-white leading-none tracking-tight">82.0%</span>
                </div>
                <div className="flex-1 min-w-[100px] bg-white/15 rounded-[16px] p-4 flex flex-col items-center gap-2 border border-white/20">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
                        <span className="text-3xl">😌</span>
                    </div>
                    <span className="text-[12px] font-semibold text-white/85">Calm</span>
                    <span className="text-[20px] font-black text-white leading-none tracking-tight">18.0%</span>
                </div>
            </div>

            <div className="bg-white/20 rounded-[16px] p-3.5 border border-white/30 flex items-center gap-2.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"><path d="M12 2v10"/><path d="M12 2l-3.5 3.5"/><path d="M12 2l3.5 3.5"/></svg>
                <p className="text-[13px] font-medium text-white/95 leading-normal">
                    You're glowing this week! Your positive vibes are fueling your progress.
                </p>
            </div>
        </div>
    </div>
);

const Achievements = () => (
    <div className="relative rounded-[24px] overflow-hidden bg-gradient-to-br from-[#10B981] to-[#059669] shadow-lg shadow-emerald-500/20 p-5 min-h-[280px]">
        {/* Decor */}
        <div className="absolute -top-[60px] -right-[60px] w-[200px] height-[200px] rounded-full bg-white/10 blur-xl" />
        <div className="absolute -bottom-[50px] -left-[50px] w-[160px] height-[160px] rounded-full bg-white/10 blur-lg" />
        <div className="absolute right-[-40px] bottom-[-30px] opacity-[0.6]">
            <TrophyIcon />
        </div>

        <div className="relative z-10 flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <h3 className="text-[11px] font-bold text-white/90 tracking-[1.2px] uppercase">Achievements</h3>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
            </div>

            <div className="bg-white/20 px-4 py-2.5 rounded-[16px] border border-white/30 self-start flex items-center gap-2">
                <span className="text-lg">⭐</span>
                <span className="text-[18px] font-black text-white">450 XP</span>
            </div>

            <div className="space-y-2">
                <div className="h-3 bg-white/20 rounded-full border border-white/30 overflow-hidden">
                    <div className="h-full bg-white w-[65%]" />
                </div>
                <p className="text-[12px] font-semibold text-white/85">Only 150 XP more for Level 6</p>
            </div>

            {/* Achievement Stage Card */}
            <div className="relative bg-white/15 rounded-[16px] p-4 border border-white/25 flex flex-col gap-3">
                <div className="absolute -top-2 -right-2 bg-[#F43F5E] px-2.5 py-1 rounded-[12px] shadow-lg z-20">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.5px]">You're here</span>
                </div>

                <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-white/25 flex items-center justify-center border-2 border-white/30">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[9px] font-extrabold text-white/70 uppercase tracking-[0.8px]">Current Stage • Level 5</span>
                        <span className="text-[13px] font-bold text-white">Neural Pioneer</span>
                    </div>
                </div>
                <p className="text-[11px] font-medium text-white/85 leading-relaxed">
                    You've successfully established basic pathways. Stability is improving daily.
                </p>
            </div>
        </div>
    </div>
);

// -------------------------------------------------------
// MAIN COMPONENT (Scroll Showcase)
// -------------------------------------------------------

export default function ProgressReportUI() {
    return (
        <div className="flex-1 w-full bg-[#FCF9F7] flex flex-col overflow-hidden">
            {/* Sticky Header Layer */}
            <div className="absolute top-[54px] left-0 right-0 px-6 py-4 flex items-center justify-between z-40 bg-[#FCF9F7]/85 backdrop-blur-md border-b border-black/5">
                <div className="w-8 h-8 rounded-full bg-white border border-black/5 shadow-md flex items-center justify-center">
                    <ChevronLeft />
                </div>
                <h1 className="text-base font-bold text-slate-800">Progress Report</h1>
                <div className="w-8" />
            </div>

            {/* Scrolling Content Area */}
            <div className="flex-1 overflow-y-auto px-5 scrollbar-hide">
                {/* Scroll Offset for Header */}
                <div className="h-[120px] shrink-0" />

                <div className="flex flex-col gap-6 pb-20 animate-mockup-scroll pointer-events-none">
                    <DetailedWeeklySummary />
                    <DPSummary />
                    <MoodSummary />
                    <Achievements />
                    
                    {/* Ghost clone for loop or just padding */}
                    <div className="h-40" />
                </div>
            </div>

            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

                @keyframes mockup-scroll {
                    0% { transform: translateY(0); }
                    20% { transform: translateY(0); }
                    80% { transform: translateY(-800px); }
                    100% { transform: translateY(-800px); }
                }

                .animate-mockup-scroll {
                    animation: mockup-scroll 12s cubic-bezier(0.45, 0, 0.55, 1) infinite;
                }
            `}</style>
        </div>
    );
}
