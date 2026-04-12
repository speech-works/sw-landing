"use client";
import React, { useEffect, useState } from "react";

// Inline SVG components
const Activity = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
);
const Flame = ({ className, strokeWidth }: { className?: string, strokeWidth?: number }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"/></svg>
);
const Play = ({ className, fill }: { className?: string, fill?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={fill || "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
);
const Smile = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
);
const Home = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
);
const LayoutGrid = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
);
const Users = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
const Settings = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);
const Mic2 = ({ className, strokeWidth }: { className?: string, strokeWidth?: number }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth || 2} strokeLinecap="round" strokeLinejoin="round"><path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12"/><circle cx="17" cy="7" r="5"/></svg>
);
const Zap = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
);
const PieChart = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
);
const RefreshCw = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
);

const AnimatedTherapistFace = () => (
  <svg width="120" height="120" viewBox="0 0 48 48" fill="none" className="therapist-face-svg transform translate-x-1 -translate-y-1">
    <defs>
      <mask id="faceMaskFull"><path fill="#fff" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24"/></mask>
    </defs>
    <g clipPath="url(#faceMaskFull)">
      <path fill="#F5F5F5" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736"/>
      <g fill="#F5F5F5">
        <circle cx="10" cy="14" r="4" /><circle cx="14" cy="11" r="4" />
        <circle cx="20" cy="9" r="4" /><circle cx="28" cy="9" r="4" />
        <circle cx="34" cy="11" r="4" /><circle cx="38" cy="14" r="4" />
        <circle cx="8" cy="20" r="3" /><circle cx="40" cy="20" r="3" />
      </g>
      <path d="M12 19q4-1 8 0M28 19q4-1 8 0" stroke="#F5F5F5" strokeWidth="3" strokeLinecap="round" />
      
      {/* Animated Face Group */}
      <g className="tf-face-group">
        <g stroke="#3E2723" strokeWidth="2.5" fill="none">
          <rect x="10" y="20" width="12" height="12" rx="3" />
          <rect x="26" y="20" width="12" height="12" rx="3" />
          <path d="M22 26h4" strokeWidth="2" />
        </g>
        <rect x="11" y="21" width="10" height="10" rx="2" fill="#FFF" opacity="0.3" />
        <rect x="27" y="21" width="10" height="10" rx="2" fill="#FFF" opacity="0.3" />
        {/* Animated Eyes */}
        <g className="tf-eyes" style={{transformOrigin: '24px 26px'}}>
          <circle cx="16" cy="26" r="1.5" fill="#3E2723" />
          <circle cx="32" cy="26" r="1.5" fill="#3E2723" />
        </g>
        <path d="M20 36q4 2 8 0" stroke="#3E2723" strokeWidth="1.5" strokeLinecap="round" />
      </g>

      <path d="M9 26q-2-2 0-4M39 26q2-2 0-4" stroke="#E0E0E0" strokeWidth="1" />
      
      {/* Clipboard and Animated Pen */}
      <g transform="translate(-9, -3)">
        <g className="tf-pen" style={{transformOrigin: '32px 51px'}}>
          <path d="M 30 37 L 30 47 L 34 47 L 34 37 A 2 2 0 0 0 30 37 Z" fill="#EF5350" stroke="#C62828" strokeWidth="0.5" />
          <path d="M30 47 L34 47 L32 51 Z" fill="#FFCCBC" stroke="#C62828" strokeWidth="0.5" />
          <path d="M31.5 50 L32.5 50 L32 51 Z" fill="#3E2723" />
        </g>
        <rect x="14" y="36" width="20" height="30" rx="1" fill="#8D6E63" stroke="#5D4037" strokeLinecap="round" />
        <rect x="16" y="38" width="16" height="30" fill="#FFF" />
        <path d="M18 41h12M18 44h8M18 47h10M18 50h12" stroke="#BDBDBD" strokeWidth="1" />
        <rect x="20" y="35" width="8" height="3" rx="0.5" fill="#B0BEC5" stroke="#78909C" />
      </g>
    </g>
  </svg>
);

export default function LiveAppMockup() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="w-full h-full bg-[#f9fafb] text-slate-800 flex flex-col font-sans overflow-hidden rounded-[inherit] relative select-none">
      {/* Top Status Bar Mock */}
      <div className="w-full pt-3 pb-2 px-5 flex justify-between items-center text-[10px] font-medium text-slate-900 bg-[#f9fafb] z-40 shrink-0 shadow-sm border-b border-transparent backdrop-blur-md absolute top-0 left-0 right-0">
        <span className="font-semibold tracking-tight">9:41</span>
        <div className="flex gap-1.5 items-center">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5z"/></svg>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>
          <div className="w-[18px] h-[9px] rounded-[3px] border border-slate-900 p-[1px] flex justify-start">
            <div className="w-[85%] h-full bg-slate-900 rounded-[1.5px]"></div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative pt-10 mask-fade-edges rounded-b-[inherit]">
        {/* Animated Scroll Wrapper */}
        <div className={`w-full flex flex-col gap-3 px-3 absolute inset-0 ${mounted ? 'animate-app-pan' : ''}`} style={{ top: 35 }}>
          
          {/* Header */}
          <div className="flex justify-between items-start pt-1 px-1">
            <div>
              <p className="text-[12px] font-semibold text-slate-500 leading-tight">Good Afternoon,</p>
              <h1 className="text-[20px] font-extrabold text-[#3E2723] leading-tight mt-0.5">Mayank</h1>
            </div>
          </div>

          {/* Top Carousel Section - Orange card exactly matches widths below */}
          <div className="w-full mr-[-12px] relative min-h-[160px] flex overflow-visible shrink-0 transition-transform duration-1000">
            <div className={`flex gap-3 w-full h-full ${mounted ? 'animate-carousel-peek' : ''}`}>
              {/* Card 1: Clinical Assessment (OASES Replica) - EXACTLY matches other cards (w-full in px-3) */}
              <div className="w-full flex-shrink-0 rounded-[20px] overflow-hidden bg-gradient-to-br from-[#F97316] to-[#EA580C] p-4 pb-4 text-white relative shadow-[0_4px_12px_rgba(234,88,12,0.15)] h-full flex flex-col justify-between">
                {/* Watermark: Animated Therapist Face */}
                <div className="absolute -bottom-6 -right-6 z-0 opacity-100">
                  <AnimatedTherapistFace />
                </div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 w-fit mb-2">
                    <Activity className="w-2.5 h-2.5 text-white" />
                    <span className="text-[8px] font-bold text-white uppercase tracking-wider">Clinical Assessment</span>
                  </div>
                  <h2 className="text-[17px] font-bold leading-tight max-w-[75%] mb-1">Unlock Your Profile</h2>
                  <p className="text-[10px] text-white/90 max-w-[65%] leading-snug">
                    74 questions remaining • Answer at your own pace.
                  </p>
                </div>
                  
                <div className="relative z-10 mt-3 pr-[80px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[9px] font-semibold text-white/90">Progress</span>
                    <span className="text-[9px] font-semibold text-white/90">26%</span>
                  </div>
                  <div className="w-full h-[4px] bg-black/15 rounded-full overflow-hidden mb-2.5">
                    <div className="h-full bg-white rounded-full transition-all duration-[2s] ease-out delay-[800ms]" style={{ width: mounted ? '26%' : '0%' }} />
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-white rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-slate-50 transition-colors cursor-pointer w-fit">
                    <Play fill="currentColor" className="w-2.5 h-2.5 text-[#EA580C]" />
                    <span className="text-[10px] font-bold text-[#EA580C]">Continue Assessment</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Mood Check Card (Visible in remaining space) */}
              <div className="w-full flex-shrink-0 rounded-[20px] overflow-hidden bg-gradient-to-br from-[#A78BFA] to-[#8B5CF6] p-4 pb-4 text-white relative shadow-[0_4px_12px_rgba(139,92,246,0.15)] h-full flex flex-col justify-between">
                {/* Visual Watermarks/Bubbles */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl opacity-50"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 w-fit mb-2">
                    <Smile className="w-2.5 h-2.5 text-white" />
                    <span className="text-[8px] font-bold text-white uppercase tracking-wider">Mood Check</span>
                  </div>
                  <h2 className="text-[17px] font-bold leading-tight max-w-[85%] mb-1">How are you feeling?</h2>
                  <p className="text-[10px] text-white/90 max-w-[85%] leading-snug">
                    Track your mood to unlock insights
                  </p>
                </div>

                <div className="relative z-10 mt-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full shadow-[0_2px_6px_rgba(0,0,0,0.1)] hover:bg-slate-50 transition-colors cursor-pointer w-fit">
                    <Play fill="currentColor" className="w-2.5 h-2.5 text-[#8B5CF6]" />
                    <span className="text-[10px] font-bold text-[#8B5CF6]">Check In</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Daily Progress Summary */}
          <div className="w-full rounded-[20px] overflow-hidden bg-gradient-to-br from-[#ff8a65] to-[#f4511e] p-4 pb-4 text-white relative shadow-[0_4px_12px_rgba(244,81,30,0.15)] flex flex-col gap-2.5 shrink-0">
            {/* Large faint background flame */}
            <Flame className="absolute max-w-none w-[160px] h-[160px] -right-8 -top-6 text-white opacity-[0.08]" strokeWidth={1.5} />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 w-fit mb-1.5">
                <PieChart className="w-2.5 h-2.5 text-white" />
                <span className="text-[8px] font-bold text-white uppercase tracking-wider">Overview</span>
              </div>
              <h2 className="text-[17px] font-medium leading-tight mb-0.5">Daily Progress</h2>
              <p className="text-[10px] text-white/90">Your energy and growth</p>
            </div>

            <div className="bg-[#FFF8F0] rounded-[16px] p-3 text-[#3E2723] z-10 shadow-inner">
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-[#F97316] fill-[#F97316]" />
                  <span className="text-[10px] font-bold tracking-widest text-[#5D4037]">ENERGY TANK</span>
                </div>
                <span className="text-[15px] font-extrabold text-[#EA580C]">100%</span>
              </div>
              <div className="w-full h-1.5 bg-orange-200/60 rounded-full overflow-hidden mb-1">
                <div className="h-full w-full bg-[#F97316] rounded-full" />
              </div>
              <p className="text-[9px] text-right text-[#94A3B8] font-bold mb-2">Fully Charged</p>

              <div className="flex gap-2">
                <div className="flex-[1] bg-[#F1F5F9] rounded-xl p-2.5 flex flex-col justify-between items-start">
                   <p className="text-[9px] font-extrabold text-slate-500 mb-1 leading-[1.2] uppercase tracking-tight w-min pr-3 text-left">FREE ACTIVITY</p>
                   <div className="mt-1">
                     <span className="text-[20px] font-black text-slate-800 leading-none">1</span>
                     <span className="text-[12px] font-bold text-slate-400 opacity-90 tracking-tighter"> / 5</span>
                   </div>
                </div>
                <div className="flex-[1] bg-[#F0F9FF] rounded-xl p-2.5 flex flex-col justify-between items-start">
                   <p className="text-[9px] font-extrabold text-slate-500 mb-1 leading-tight uppercase tracking-tight">LEVEL</p>
                   <div>
                     <p className="text-[20px] font-black text-[#0284C7] leading-none mb-1 mt-1">10</p>
                     <div className="flex items-center gap-1">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></div>
                       <p className="text-[8px] font-bold text-[#F97316] truncate">1 / 342 <span className="opacity-70">XP</span></p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. In Progress (Smart Recommendation Card Replica) */}
          <div className="w-full rounded-[20px] overflow-hidden bg-gradient-to-br from-[#ff7e5f] to-[#feb47b] p-4 pb-0 text-white relative shadow-[0_4px_12px_rgba(255,126,95,0.15)] flex flex-col shrink-0">
            
            <div className="relative z-10 mb-2">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 w-fit mb-1.5">
                <Flame className="w-2.5 h-2.5 text-white" />
                <span className="text-[8px] font-bold text-white uppercase tracking-wider">In Progress</span>
              </div>
              <h3 className="text-[16px] font-medium text-white max-w-[95%] leading-snug mb-1">Bouncing Back (The Post-Block Reset)</h3>
              <p className="text-[10px] text-white/90 leading-snug max-w-[95%] mb-2">Sever the emotional tie to a bad block so it doesn't ruin your day.</p>
              
              <div className="mb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-[9px] font-semibold text-white/90">Module 5 of 5</span>
                  <span className="text-[9px] font-semibold text-white/90">80%</span>
                </div>
                <div className="w-full h-[4px] bg-white/30 rounded-full overflow-hidden">
                  <div className="h-full bg-white rounded-full transition-all duration-[2s] ease-out delay-[1000ms]" style={{ width: mounted ? '80%' : '0%' }} />
                </div>
              </div>
            </div>

            {/* Cream Inner Action Card */}
            <div className="bg-[#FFF8F0] rounded-t-[16px] overflow-hidden text-center shadow-[0_-2px_12px_rgba(0,0,0,0.05)] mx-[-5px]">
              <div className="p-3 pt-5 flex flex-col items-center">
                <div className="mb-1.5 text-[#EA580C]">
                    <Mic2 className="w-6 h-6" strokeWidth={2} />
                </div>
                <h4 className="text-[14px] font-extrabold text-[#431407] mb-0.5">Moving On</h4>
                <p className="text-[10px] text-[#6B7280]">Close the chapter.</p>
              </div>
              <div className="bg-[#FFEDD5] py-2 flex justify-center items-center gap-1.5 border-t border-orange-100/50 cursor-pointer transition-colors">
                <Play fill="currentColor" className="w-2.5 h-2.5 text-[#EA580C]" />
                <span className="text-[11px] font-extrabold text-[#EA580C] tracking-wide">Start</span>
              </div>
            </div>
          </div>
          
          <div className="h-[40px] shrink-0" /> {/* Extra bottom padding to scroll fully past dock */}

        </div>
      </div>

      {/* Actual CustomTabBar Replica */}
      <div className="absolute bottom-[16px] left-3 right-3 flex justify-between items-center bg-white rounded-[24px] h-[52px] px-2 shadow-[0_8px_20px_rgba(100,116,139,0.15)] z-40 transition-all duration-1000 delay-[200ms] ease-out border border-slate-100"
        style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)' }}>
        <div className="flex-[1.2] flex justify-center h-full">
          {/* Active Home Tab */}
          <div className="flex items-center justify-center self-center h-[36px] rounded-full bg-[#F97316] px-3 flex-grow gap-1.5 transition-all w-fit shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]">
            <Home className="w-[16px] h-[16px] text-white" />
            <span className="text-[11px] font-bold text-white tracking-wide">Home</span>
          </div>
        </div>

        <div className="flex-[0.5] flex justify-center items-center h-full">
          <LayoutGrid className="w-4 h-4 text-[#94A3B8]" />
        </div>

        <div className="flex-[0.5] flex justify-center items-center h-full relative">
          <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center">
            <Users className="w-4 h-4 text-[#94A3B8]" />
          </div>
        </div>

        <div className="flex-[0.5] flex justify-center items-center h-full">
          <Settings className="w-4 h-4 text-[#94A3B8]" />
        </div>
      </div>
      
      {/* CSS Styles for Animated Scroll and SVG */}
      <style>{`
        .mask-fade-edges {
           mask-image: linear-gradient(to bottom, black 95%, transparent 100%);
           -webkit-mask-image: linear-gradient(to bottom, black 95%, transparent 100%);
        }
           
        /* Vertical scroll animation */
        .animate-app-pan {
           animation: pan-scroll 16s ease-in-out infinite;
        }

        @keyframes pan-scroll {
           0%, 30% { transform: translateY(0); }
           45%, 80% { transform: translateY(-160px); }
           95%, 100% { transform: translateY(0); }
        }

        /* Top Carousel Peek Animation - Adjusted to only peek into px-3 gutter */
        .animate-carousel-peek {
           animation: carousel-peek 10s ease-in-out infinite;
        }

        @keyframes carousel-peek {
           0%, 25% { transform: translateX(0); }
           40%, 75% { transform: translateX(-8px); } /* Very subtle peek into the gutter */
           90%, 100% { transform: translateX(0); }
        }
        
        .therapist-face-svg { animation: tf-float 6s ease-in-out infinite; }
        .tf-face-group { animation: tf-lookDown 4s ease-in-out infinite alternate; }
        .tf-eyes { animation: tf-blink 4s cubic-bezier(0.2, 0, 0.2, 1) infinite; }
        .tf-pen { animation: tf-write 2s ease-in-out infinite; }

        @keyframes tf-float {
           0%, 100% { transform: translateY(3px) translateX(0px); }
           50% { transform: translateY(-3px) translateX(0px); }
        }
        @keyframes tf-lookDown {
           0%, 40% { transform: translateY(0); }
           60%, 100% { transform: translateY(2px); }
        }
        @keyframes tf-blink {
           0%, 92%, 100% { transform: scaleY(1); }
           96% { transform: scaleY(0.1); }
        }
        @keyframes tf-write {
           0%, 100% { transform: translate(0, 0) rotate(35deg); }
           25% { transform: translate(2px, -2px) rotate(35deg); }
           50% { transform: translate(0px, 0px) rotate(35deg); }
           75% { transform: translate(2px, -1px) rotate(35deg); }
        }
      `}</style>
    </div>
  );
}
