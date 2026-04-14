"use client";
import React from "react";

const radarSlices = [
  { r: 44, start: -90,  end: -18,  label: "MASTERY",    color: "#F28044" },
  { r: 36, start: -18,  end: 54,   label: "EASE",       color: "#F5956B" },
  { r: 42, start: 54,   end: 126,  label: "COURAGE",    color: "#F28044" },
  { r: 32, start: 126,  end: 198,  label: "CONFIDENCE", color: "#F7AC8A" },
  { r: 39, start: 198,  end: 270,  label: "SOCIAL",     color: "#F09060" },
];

export default function RadarUI({ animKey, isFloating = false }: { animKey: number; isFloating?: boolean }) {
  return (
    <div
      key={animKey}
      className={`relative w-full aspect-square p-2 md:p-4 rounded-2xl border border-white/20 antialiased overflow-visible ${isFloating ? "" : "absolute -right-2 md:-right-4 -bottom-4 w-[140px] md:w-[170px]"}`}
      style={{
        background: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 15px 30px rgba(0,0,0,0.07)",
        animation: isFloating ? "none" : "platform-springUp 0.7s cubic-bezier(0.23,1,0.32,1) 0.25s both",
      }}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible relative z-10">
          {/* Subtle grid rings */}
          {[40, 30, 20, 10].map((r, i) => (
            <circle key={i} cx="50" cy="50" r={r} fill="none"
              stroke="currentColor" className="text-black/5" strokeWidth="0.5" />
          ))}

          {/* Animated slices */}
          {radarSlices.map((slice, i) => {
            const x1 = 50 + slice.r * Math.cos((slice.start * Math.PI) / 180);
            const y1 = 50 + slice.r * Math.sin((slice.start * Math.PI) / 180);
            const x2 = 50 + slice.r * Math.cos((slice.end   * Math.PI) / 180);
            const y2 = 50 + slice.r * Math.sin((slice.end   * Math.PI) / 180);
            return (
              <path
                key={i}
                d={`M 50 50 L ${x1} ${y1} A ${slice.r} ${slice.r} 0 0 1 ${x2} ${y2} Z`}
                fill={slice.color}
                style={{
                  transformOrigin: "50% 50%",
                  animation: `platform-sliceReveal 0.65s cubic-bezier(0.23,1,0.32,1) ${0.35 + i * 0.1}s both`,
                }}
              />
            );
          })}
        </svg>

        {/* Dark label tags */}
        {radarSlices.map((slice, i) => {
          const mid = (slice.start + slice.end) / 2;
          const tx = 50 + slice.r * 0.9 * Math.cos((mid * Math.PI) / 180);
          const ty = 50 + slice.r * 0.9 * Math.sin((mid * Math.PI) / 180);
          return (
            <div
              key={i}
              className="absolute z-20 pointer-events-none"
              style={{
                left: `${tx}%`,
                top:  `${ty}%`,
                animation: `platform-labelPop 0.5s cubic-bezier(0.23,1,0.32,1) ${0.75 + i * 0.1}s both`,
                transform: "translate(-50%,-50%)",
              }}
            >
              <div className="bg-[#3F332D] text-white px-1.5 py-0.5 rounded-[2px] text-[8px] md:text-[9px] font-black tracking-tight whitespace-nowrap shadow-md border border-white/10">
                {slice.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
