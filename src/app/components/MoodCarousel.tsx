"use client";
import React, { useEffect, useState } from "react";

// -------------------------------------------------------
// MOOD FACES — Ported from mobile Reanimated SVGs to Web CSS
// -------------------------------------------------------

const AngryFace = () => (
  <div className="w-full h-full relative overflow-hidden rounded-full">
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="redG" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#8B0000" />
          <stop offset="100%" stopColor="#DC143C" />
        </linearGradient>
        <linearGradient id="orangeG" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FF4500" />
          <stop offset="100%" stopColor="#FF8C00" />
        </linearGradient>
        <linearGradient id="yellowG" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFFF00" />
        </linearGradient>
      </defs>
      
      {/* Background */}
      <path fill="#4A0000" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24" />
      
      {/* Flames - Animated scaleY */}
      <g className="animate-mood-flame origin-bottom">
        <path d="M-5 50L-2 30Q0 25 4 15Q10 35 18 45Q24 48 30 45Q38 35 44 15Q48 25 50 30L53 50Z" fill="url(#redG)" />
        <path d="M0 50L2 40Q5 30 8 20Q12 35 20 42Q24 45 28 42Q36 35 40 20Q43 30 46 40L48 50Z" fill="url(#orangeG)" />
        <path d="M12 50L16 45Q20 20 24 10Q28 20 32 45L36 50Z" fill="url(#yellowG)" />
      </g>

      <path fill="#F28B82" d="M7.628 10.176c0-2.805 33.119-2.805 33.119 0 2.76 0 2.76 39.26 0 39.26 0 2.805-33.119 2.805-33.119 0-2.76 0-2.76-39.26 0-39.26" />
      
      {/* Brows */}
      <path fill="#4A4A4A" d="M24.292 16.019l-11.591-3.106-0.994 3.71 11.591 3.105zM35.298 12.913L23.707 16.02l0.994 3.71 11.591-3.107z" />
      
      {/* Eyes */}
      <circle cx="16.8" cy="24" r="7.2" fill="#FFF8F8" />
      <circle cx="31.2" cy="24" r="7.2" fill="#FFF8F8" />
      <path fill="#6D6D6D" d="M16.8 28.32a4.32 4.32 0 1 0 0-8.64 4.32 4.32 0 0 0 0 8.64M31.2 28.32a4.32 4.32 0 1 0 0-8.64 4.32 4.32 0 0 0 0 8.64" />

      {/* Mouth/Teeth - Animated jaw bob */}
      <g transform="translate(0, 35)">
        <rect x="13" y="-3" width="22" height="12" rx="3" fill="#300000" />
        <g className="animate-mood-ang-upper">
          <path d="M15-2H33V2.5H15Z" fill="#FFF" />
          <line x1="19.5" y1="-2" x2="19.5" y2="2.5" stroke="#300000" strokeWidth="0.5" />
          <line x1="24" y1="-2" x2="24" y2="2.5" stroke="#300000" strokeWidth="0.5" />
          <line x1="28.5" y1="-2" x2="28.5" y2="2.5" stroke="#300000" strokeWidth="0.5" />
        </g>
        <g className="animate-mood-ang-lower">
          <path d="M15 3.5H33V8H15Z" fill="#FFF" />
          <line x1="19.5" y1="3.5" x2="19.5" y2="8" stroke="#300000" strokeWidth="0.5" />
          <line x1="24" y1="3.5" x2="24" y2="8" stroke="#300000" strokeWidth="0.5" />
          <line x1="28.5" y1="3.5" x2="28.5" y2="8" stroke="#300000" strokeWidth="0.5" />
        </g>
      </g>
    </svg>
  </div>
);

const CalmFace = () => (
    <div className="w-full h-full relative overflow-hidden rounded-full">
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="haloG" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FDB931" />
                    <stop offset="40%" stopColor="#FFFFAC" />
                    <stop offset="100%" stopColor="#D4AF37" />
                </linearGradient>
            </defs>
            <path fill="#B8DCC2" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24" />
            
            {/* Halo - Animated float */}
            <g className="animate-mood-halo">
                <ellipse cx="24" cy="7" rx="14" ry="4" fill="none" stroke="url(#haloG)" strokeWidth="2.5" />
            </g>

            {/* Wind lines - Animated dashoffset */}
            <g className="animate-mood-wind">
                <path d="M-24 10h96" stroke="#FFF" strokeWidth="3" strokeOpacity="0.4" strokeDasharray="12 36" strokeLinecap="round" />
                <path d="M-12 24h96" stroke="#FFF" strokeWidth="2" strokeOpacity="0.3" strokeDasharray="8 40" strokeLinecap="round" />
                <path d="M-36 38h96" stroke="#FFF" strokeWidth="3" strokeOpacity="0.4" strokeDasharray="16 32" strokeLinecap="round" />
            </g>

            <path fill="#E7E2CB" d="M8.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.2 2.766-33.2 0-2.766 0-2.766-38.736 0-38.736" />
            
            <circle cx="16.8" cy="24" r="7.2" fill="#FFF" />
            <circle cx="31.2" cy="24" r="7.2" fill="#FFF" />
            <path fill="#4A4A4A" d="M16.8 28.32a4.32 4.32 0 1 0 0-8.64 4.32 4.32 0 0 0 0 8.64M31.2 28.32a4.32 4.32 0 1 0 0-8.64 4.32 4.32 0 0 0 0 8.64" />
            {/* Smile */}
            <path stroke="#4A4A4A" strokeLinecap="round" strokeWidth="3.558" d="M16.8 36q7.2 4.8 14.4 0" fill="none" />
        </svg>
    </div>
);

const HappyFace = () => (
    <div className="w-full h-full relative overflow-hidden rounded-full">
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <path fill="#F9E7D9" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24" />
            
            {/* Face base - Animated bounce/wiggle */}
            <g className="animate-mood-happy-face origin-center">
                <path fill="#F7DFA9" d="M7.538 10.313c0-2.766 33.199-2.766 33.199 0 2.766 0 2.766 60 0 60 0 2.767-33.2 2.767-33.2 0-2.766 0-2.766-60 0-60" />
                
                {/* Eyes - Animated blink */}
                <g className="animate-mood-happy-blink">
                    <circle cx="16.8" cy="24" r="7.2" fill="#FFF" />
                    <circle cx="31.2" cy="24" r="7.2" fill="#FFF" />
                    <path fill="#2E2E2E" d="M16.8 28.32a4.32 4.32 0 1 0 0-8.64 4.32 4.32 0 0 0 0 8.64M31.2 28.32a4.32 4.32 0 1 0 0-8.64 4.32 4.32 0 0 0 0 8.64" />
                </g>

                <path fill="#5C4033" d="M15 36q9 1 18 0q0 8-9 8t-9-8z" />
                <path fill="#FFF" d="M15 36q9 1 18 0l-0.5 3q-8.5 1-17 0z" />
                <path stroke="#3E2723" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" d="M15 36q9 1 18 0q0 8-9 8t-9-8z" />
            </g>

            {/* Stars - Animated twinkle */}
            <g className="animate-mood-stars">
                <path fill="#FFD700" d="M12 40l1 2l2 0l-1.5 1.5l0.5 2l-2-1.5l-2 1.5l0.5-2l-1.5-1.5l2 0zM36 40l1 2l2 0l-1.5 1.5l0.5 2l-2-1.5l-2 1.5l0.5-2l-1.5-1.5l2 0z" />
                <path fill="#FFFACD" d="M24 42l0.5 1l1 0l-0.7 0.8l0.2 1l-1-0.8l-1 0.8l0.2-1l-0.7-0.8l1 0z" />
            </g>
        </svg>
    </div>
);

const SadFace = () => (
    <div className="w-full h-full relative overflow-hidden rounded-full">
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
            <defs>
                <linearGradient id="tearG" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#81D4FA" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#0288D1" stopOpacity="1" />
                </linearGradient>
                <mask id="LMask">
                    <circle cx="16.8" cy="24" r="7.2" fill="white" />
                </mask>
                <mask id="RMask">
                    <circle cx="31.2" cy="24" r="7.2" fill="white" />
                </mask>
            </defs>
            <path fill="#E6E8FF" d="M48 24C48 10.745 37.255 0 24 0S0 10.745 0 24s10.745 24 24 24 24-10.745 24-24" />
            
            {/* Rain - dashoffset */}
            <g className="animate-mood-rain">
                <path d="M6 -10v68 M18 -10v68 M30 -10v68 M42 -10v68" stroke="#000" strokeWidth="1.2" strokeLinecap="round" opacity="0.15" strokeDasharray="6 14" />
            </g>

            <path fill="#BEEDE8" d="M7.075 10.075c0-2.767 33.199-2.767 33.199 0 2.767 0 2.767 38.736 0 38.736 0 2.766-33.199 2.766-33.199 0-2.767 0-2.767-38.736 0-38.736" />
            
            <circle cx="16.8" cy="24" r="7.2" fill="#FAFBFC" />
            <circle cx="31.2" cy="24" r="7.2" fill="#FAFBFC" />

            {/* Tears - translateY */}
            <g mask="url(#LMask)">
                <g className="animate-mood-tear">
                    <circle cx="16.8" cy="28" r="8" fill="url(#tearG)" />
                    <circle cx="15" cy="25" r="1.2" fill="#FFF" opacity="0.4" />
                </g>
            </g>
            <g mask="url(#RMask)">
                <g className="animate-mood-tear">
                    <circle cx="31.2" cy="28" r="8" fill="url(#tearG)" />
                    <circle cx="29.4" cy="25" r="1.2" fill="#FFF" opacity="0.4" />
                </g>
            </g>

            <path fill="#5B5B5B" d="M16.8 28.32a4.32 4.32 0 1 0 0-8.64 4.32 4.32 0 0 0 0 8.64M31.2 28.32a4.32 4.32 0 1 0 0-8.64 4.32 4.32 0 0 0 0 8.64" />
            {/* Brows */}
            <path fill="#5B5B5B" d="M23.298 12.913L11.707 16.02l0.994 3.71 11.591-3.107zM36.292 16.019l-11.591-3.106-0.994 3.71 11.591 3.105z" />

            {/* Mouth - animated quiver */}
            <g className="animate-mood-quiver origin-center">
                <path d="M22 39q2-2 4 0" stroke="#5B5B5B" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </g>
        </svg>
    </div>
);

const moods = [
  { name: "Angry", face: <AngryFace />, color: "#F43F5E", bg: "#FFF1F2" },
  { name: "Calm", face: <CalmFace />, color: "#10B981", bg: "#ECFDF5" },
  { name: "Happy", face: <HappyFace />, color: "#F59E0B", bg: "#FFFBEB" },
  { name: "Sad", face: <SadFace />, color: "#3B82F6", bg: "#EFF6FF" },
];

export default function MoodCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % moods.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex items-center p-4 bg-white/40 backdrop-blur-md rounded-2xl relative overflow-hidden transition-colors duration-1000" style={{ background: moods[index].bg + "80" }}>
      
      {/* Horizontal Layout for smaller card */}
      <div className="flex-1 flex flex-col justify-center">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Daily Log</span>
        <div className="relative h-6 overflow-hidden">
            {moods.map((mood, idx) => (
                <div key={idx} className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
                     style={{ 
                         transform: `translateX(${(idx - index) * 100}%)`,
                         opacity: idx === index ? 1 : 0
                     }}>
                    <span className="text-lg font-black tracking-tight" style={{ color: mood.color }}>
                        {mood.name}
                    </span>
                </div>
            ))}
        </div>
        
        {/* Progress Pills */}
        <div className="flex gap-1 mt-3">
            {moods.map((_, idx) => (
                <div key={idx} className="h-1 rounded-full transition-all duration-700" style={{ 
                    width: idx === index ? '16px' : '4px',
                    backgroundColor: idx === index ? moods[idx].color : '#CBD5E1'
                }} />
            ))}
        </div>
      </div>

      {/* Swipeable Faces Area */}
      <div className="w-20 md:w-24 h-full relative overflow-hidden">
        {moods.map((mood, idx) => (
          <div
            key={mood.name}
            className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            style={{ 
                transform: `translateX(${(idx - index) * 100}%) scale(${idx === index ? 1 : 0.7})`,
                opacity: idx === index ? 1 : 0,
            }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 shadow-xl rounded-full">
                {mood.face}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        /* Angry: flames, jaw */
        @keyframes mood-flame {
            0%, 100% { transform: scaleY(1); }
            50%      { transform: scaleY(1.15); }
        }
        @keyframes mood-ang-upper {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(1.5px); }
        }
        @keyframes mood-ang-lower {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-1.5px); }
        }
        .animate-mood-flame     { animation: mood-flame 1.2s cubic-bezier(0.45,0,0.55,1) infinite; }
        .animate-mood-ang-upper { animation: mood-ang-upper 0.5s cubic-bezier(0.23,1,0.32,1) infinite; }
        .animate-mood-ang-lower { animation: mood-ang-lower 0.5s cubic-bezier(0.23,1,0.32,1) infinite; }

        /* Calm: halo, wind */
        @keyframes mood-halo {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-3px); }
        }
        @keyframes mood-wind {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -48; }
        }
        .animate-mood-halo { animation: mood-halo 3s cubic-bezier(0.45,0,0.55,1) infinite; }
        .animate-mood-wind { animation: mood-wind 2s linear infinite; }

        /* Happy: bounce, blink, stars */
        @keyframes mood-happy-face {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50%      { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes mood-happy-blink {
            0%, 90%, 100% { transform: scaleY(1); }
            95%           { transform: scaleY(0.1); }
        }
        @keyframes mood-stars {
            0%, 100% { opacity: 0.5; transform: scale(0.8); }
            50%      { opacity: 1;   transform: scale(1.2); }
        }
        .animate-mood-happy-face  { animation: mood-happy-face 0.8s cubic-bezier(0.45,0,0.55,1) infinite; }
        .animate-mood-happy-blink { animation: mood-happy-blink 4s infinite; }
        .animate-mood-stars       { animation: mood-stars 1s ease-in-out infinite; }

        /* Sad: rain, tear, quiver */
        @keyframes mood-rain {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -20; }
        }
        @keyframes mood-tear {
            0% { transform: translateY(-4px); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(8px); opacity: 0; }
        }
        @keyframes mood-quiver {
            0%, 100% { transform: translateX(0); }
            25%      { transform: translateX(-0.5px); }
            75%      { transform: translateX(0.5px); }
        }
        .animate-mood-rain   { animation: mood-rain 0.5s linear infinite; }
        .animate-mood-tear   { animation: mood-tear 2.4s cubic-bezier(0.45,0,0.55,1) infinite; }
        .animate-mood-quiver { animation: mood-quiver 0.1s linear infinite; }
      `}</style>
    </div>
  );
}
