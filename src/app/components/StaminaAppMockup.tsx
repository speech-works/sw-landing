"use client";
import React, { useState } from "react";
import { useMockDeviceTime } from "./useMockDeviceTime";

const STAMINA_SCROLL_KEYFRAMES = `
@keyframes stamina-energy-pulse {
  0%, 100% {
    transform: scaleX(1);
    opacity: 0.96;
    box-shadow: 0 0 0 rgba(249, 115, 22, 0);
  }
  50% {
    transform: scaleX(1.12);
    opacity: 1;
    box-shadow: 0 0 16px rgba(249, 115, 22, 0.38);
  }
}

@keyframes stamina-energy-reach {
  0%, 100% {
    transform: scaleX(0.88);
    opacity: 0.2;
  }
  50% {
    transform: scaleX(1.18);
    opacity: 0.42;
  }
}

@keyframes stamina-energy-glint {
  0%, 18%, 100% {
    transform: translateX(-140%);
    opacity: 0;
  }
  32% {
    opacity: 0.55;
  }
  56% {
    transform: translateX(175%);
    opacity: 0.6;
  }
  68% {
    opacity: 0;
  }
}

@keyframes stamina-carousel-track {
  0%, 38% {
    transform: translate3d(0, 0, 0);
  }
  50%, 88% {
    transform: translate3d(calc(-1 * var(--stamina-slide-shift)), 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes stamina-carousel-plane {
  0%, 100% {
    transform: rotate(-2deg) translateY(0px);
  }
  50% {
    transform: rotate(-2deg) translateY(-2px);
  }
}

@keyframes stamina-carousel-card {
  0%, 100% {
    box-shadow: 0 24px 46px rgba(15, 23, 42, 0.18);
  }
  50% {
    box-shadow: 0 28px 56px rgba(15, 23, 42, 0.22);
  }
}
`;

function DailyProgressFloatingCard() {
  const freeActivityPercent =
    (FREE_ACTIVITY_CURRENT / FREE_ACTIVITY_TOTAL) * 100;
  const xpPercent = (XP_CURRENT / XP_TOTAL) * 100;

  return (
    <div className="relative w-[208px] overflow-hidden rounded-[24px] bg-gradient-to-br from-[#ff8a82] via-[#ff936e] to-[#ff9e54] p-[12px] shadow-[0_26px_50px_rgba(15,23,42,0.2)]">
      <div className="absolute -right-5 -top-5 h-[96px] w-[96px] rounded-full bg-white/10" />
      <div className="absolute right-0 top-0 h-[86px] w-[86px] translate-x-[14px] -translate-y-[6px] text-white/20 rotate-[8deg]">
        <FireWatermark />
      </div>

      <div className="relative z-10">
        <div className="text-[13px] font-medium leading-none tracking-[-0.03em] text-white">
          Daily Progress
        </div>
        <div className="mt-1 text-[7px] font-medium text-white/88">
          Your energy and growth
        </div>

        <div className="mt-3 rounded-[18px] bg-white/95 px-[10px] pb-[10px] pt-[10px] shadow-[0_12px_24px_rgba(138,63,14,0.14)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#FFF7ED] text-[#F97316]">
                <BoltIcon />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.06em] text-slate-600">
                Energy Tank
              </span>
            </div>
            <span className="text-[9px] font-extrabold tracking-[-0.03em] text-[#EA580C]">
              {ENERGY_PERCENT}%
            </span>
          </div>

          <div className="relative mt-2.5 h-[7px] w-full overflow-hidden rounded-full bg-black/[0.05]">
            <div
              className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-[#FB923C]/30 via-[#F97316]/18 to-transparent"
              style={{
                width: `calc(${ENERGY_PERCENT}% + 16px)`,
                transformOrigin: "left center",
                animation: "stamina-energy-reach 1.9s ease-in-out infinite",
                willChange: "transform, opacity",
              }}
            />
            <div
              className="relative h-full overflow-visible rounded-full"
              style={{ width: `${ENERGY_PERCENT}%` }}
            >
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff7a1a] via-[#ff8d26] to-[#f97316]"
                style={{
                  transformOrigin: "left center",
                  animation: "stamina-energy-pulse 1.9s ease-in-out infinite",
                  willChange: "transform, opacity, box-shadow",
                }}
              />
              <div
                className="absolute inset-y-0 -right-[3px] w-[12px] rounded-full bg-[#fb923c]/55 blur-[3px]"
                style={{
                  transformOrigin: "left center",
                  animation: "stamina-energy-reach 1.9s ease-in-out infinite",
                  willChange: "transform, opacity",
                }}
              />
              <div
                className="absolute inset-y-0 left-[-22%] w-[40%] rounded-full bg-white/50 blur-[1.5px]"
                style={{
                  animation: "stamina-energy-glint 2.8s linear infinite",
                  willChange: "transform, opacity",
                }}
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <span className="text-[7px] font-semibold text-slate-400">
              ~18h 29m until full
            </span>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <div className="relative overflow-hidden rounded-[14px] bg-[#F1F5F9] p-2">
              <div className="absolute -bottom-2 -right-2 h-[44px] w-[44px] -rotate-[20deg] text-[#10B981]/[0.05]">
                <CheckWatermark />
              </div>
              <div className="relative z-10 text-[7px] font-bold uppercase tracking-[0.03em] text-slate-500">
                Free Activity
              </div>
              <div className="mt-2.5 flex items-end gap-1 tracking-[-0.04em]">
                <span className="text-[18px] font-extrabold leading-none text-slate-800">
                  {FREE_ACTIVITY_CURRENT}
                </span>
                <span className="text-[8px] font-semibold leading-none text-slate-400">
                  / {FREE_ACTIVITY_TOTAL}
                </span>
              </div>
              <div className="mt-3 h-[4px] w-full overflow-hidden rounded-full bg-[rgba(16,185,129,0.1)]">
                <div
                  className="h-full rounded-full bg-[#10B981]"
                  style={{ width: `${freeActivityPercent}%` }}
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[14px] bg-[#F1F5F9] p-2">
              <div className="absolute -bottom-2 -right-2 h-[44px] w-[44px] -rotate-[20deg] text-[#3B82F6]/[0.05]">
                <StarWatermark />
              </div>
              <div className="relative z-10 text-[7px] font-bold uppercase tracking-[0.03em] text-slate-500">
                Level
              </div>
              <div className="mt-2 text-[18px] font-extrabold leading-none tracking-[-0.04em] text-slate-800">
                {LEVEL_VALUE}
              </div>
              <div className="mt-3 flex items-center gap-1">
                <span className="h-[4px] w-[4px] rounded-full bg-[#F97316]" />
                <span className="text-[6px] font-bold text-[#EA580C]">
                  {XP_CURRENT} / {XP_TOTAL} XP
                </span>
              </div>
              <div className="mt-1.5 h-[4px] w-full overflow-hidden rounded-full bg-[rgba(249,115,22,0.1)]">
                <div
                  className="h-full rounded-full bg-[#F97316]"
                  style={{ width: `${xpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LowStaminaFloatingCard() {
  return (
    <div
      className="relative w-[208px] rounded-[24px] bg-white px-5 pb-5 pt-7 text-center shadow-[0_24px_48px_rgba(15,23,42,0.18)]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <button
        aria-label="Close"
        className="absolute right-3 top-3 text-[20px] leading-none text-slate-400"
        type="button"
      >
        ×
      </button>

      <div
        className="mx-auto mb-3 flex h-[44px] w-[44px] items-center justify-center rounded-[16px] text-white shadow-[0_12px_22px_rgba(249,115,22,0.24)]"
        style={{
          background: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
        }}
      >
        <BoltIcon />
      </div>

      <div className="mb-1 text-[9px] font-extrabold uppercase tracking-[0.16em] text-[#F97316]">
        Low Stamina
      </div>
      <div className="mb-3 text-[15px] font-bold leading-tight tracking-[-0.03em] text-slate-900">
        Running on Empty
      </div>
      <p className="mx-auto mb-4 max-w-[172px] text-[9px] leading-[1.45] text-slate-500">
        Your stamina is running low because you&apos;ve practiced hard today.
        Take a break and come back stronger.
      </p>

      <div
        className="flex h-[36px] w-full items-center justify-center rounded-[14px] text-[12px] font-semibold text-white shadow-[0_10px_20px_rgba(249,115,22,0.22)]"
        style={{
          background: "linear-gradient(135deg, #F97316 0%, #EF4444 100%)",
        }}
      >
        I&apos;ll Be Back 💪
      </div>
    </div>
  );
}

const ENERGY_PERCENT = 22;
const FREE_ACTIVITY_CURRENT = 0;
const FREE_ACTIVITY_TOTAL = 5;
const LEVEL_VALUE = 10;
const XP_CURRENT = 140;
const XP_TOTAL = 342;
const SCREEN_BG_WIDTH = 260;
const SCREEN_BG_HEIGHT = 430;
const STAMINA_CAROUSEL_DURATION = "4s";

const BoltIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16px] h-[16px]">
    <path d="M13 2 6 13h5l-1 9 8-12h-5l0-8Z" />
  </svg>
);

const FireWatermark = () => (
  <svg viewBox="0 0 120 120" fill="currentColor" className="w-full h-full">
    <path d="M69.82 9.14c3.17 17.11-4.75 22.92-11.1 28.77-5.8 5.35-10.5 10.47-8.67 22.63 1.32 8.76 7.54 14.06 15.34 14.06 10.93 0 18.36-8.95 18.36-20.94 0-13.51-7.21-22.54-13.93-34.52Zm-33.2 40.17c-8.27 10.2-13.12 19.08-13.12 31.5 0 19.24 15.88 33.05 36.62 33.05 20.57 0 36.38-15.6 36.38-35.73 0-17.96-10.39-29.88-21.64-43.72 2.05 21.52-12.31 24.14-21.12 32.4-6.38 5.98-9.83 13.66-8.3 23.72-9.82-3.71-15.29-11.74-15.29-22.25 0-7.34 2.42-12.91 6.47-19.97Z" />
  </svg>
);

const CheckWatermark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm4.7 7.78-5.4 5.76a1 1 0 0 1-1.45.02l-2.54-2.53 1.41-1.42 1.8 1.8 4.68-4.99Z" />
  </svg>
);

const StarWatermark = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
    <path d="m12 2.75 2.84 5.76 6.36.92-4.6 4.48 1.08 6.33L12 17.26l-5.68 2.98 1.08-6.33-4.6-4.48 6.36-.92L12 2.75Z" />
  </svg>
);

function StaminaScreenBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#fff8f3]">
      <svg
        viewBox={`0 0 ${SCREEN_BG_WIDTH} ${SCREEN_BG_HEIGHT}`}
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient
            id="stamina-screen-base"
            x1="8%"
            y1="4%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFEFC" />
            <stop offset="42%" stopColor="#FFF2E8" />
            <stop offset="100%" stopColor="#FFE2D0" />
          </linearGradient>
          <radialGradient id="stamina-screen-coral" cx="72%" cy="20%" r="48%">
            <stop offset="0%" stopColor="#FF9C78" stopOpacity="0.88" />
            <stop offset="55%" stopColor="#FB923C" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#FB923C" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="stamina-screen-apricot" cx="26%" cy="78%" r="42%">
            <stop offset="0%" stopColor="#FFD3A8" stopOpacity="0.84" />
            <stop offset="58%" stopColor="#FDBA74" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#FDBA74" stopOpacity="0" />
          </radialGradient>
          <linearGradient
            id="stamina-screen-beam"
            x1="8%"
            y1="0%"
            x2="86%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.54" />
            <stop offset="48%" stopColor="#FFFFFF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="stamina-screen-ribbon"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFF3EA" />
            <stop offset="100%" stopColor="#FFD9BF" />
          </linearGradient>
          <linearGradient
            id="stamina-screen-ribbon-strong"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#FFDFC7" />
            <stop offset="100%" stopColor="#FDBA74" />
          </linearGradient>
          <filter
            id="stamina-screen-paper"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.95"
              numOctaves="2"
              seed="17"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.16" />
            </feComponentTransfer>
          </filter>
          <filter
            id="stamina-screen-soft-blur"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        <rect
          width={SCREEN_BG_WIDTH}
          height={SCREEN_BG_HEIGHT}
          fill="url(#stamina-screen-base)"
        />
        <ellipse
          cx="196"
          cy="92"
          rx="108"
          ry="112"
          fill="url(#stamina-screen-coral)"
          filter="url(#stamina-screen-soft-blur)"
        />
        <ellipse
          cx="48"
          cy="336"
          rx="92"
          ry="84"
          fill="url(#stamina-screen-apricot)"
          filter="url(#stamina-screen-soft-blur)"
        />

        <path
          d="M-24 214C30 172 88 170 146 194C186 212 228 216 290 206V266C230 286 184 304 130 324C74 346 16 344-32 314L-24 214Z"
          fill="url(#stamina-screen-ribbon)"
          opacity="0.82"
        />
        <path
          d="M176 -8C220 26 248 74 260 138C272 202 262 252 230 300C202 344 154 370 98 372C52 374 20 358 -14 330L-14 278C48 304 96 298 134 258C176 214 186 150 170 90C160 54 162 18 176 -8Z"
          fill="url(#stamina-screen-ribbon-strong)"
          opacity="0.34"
        />

        <rect
          x="-48"
          y="118"
          width="282"
          height="44"
          rx="22"
          transform="rotate(-16 93 140)"
          fill="url(#stamina-screen-beam)"
          opacity="0.76"
        />
        <rect
          x="112"
          y="204"
          width="168"
          height="30"
          rx="15"
          transform="rotate(-18 196 219)"
          fill="#FFFFFF"
          opacity="0.16"
        />
        <rect
          x="-12"
          y="260"
          width="140"
          height="24"
          rx="12"
          transform="rotate(18 58 272)"
          fill="#F97316"
          opacity="0.08"
        />

        <path
          d="M54 68C84 52 126 54 154 78"
          stroke="#FFFFFF"
          strokeOpacity="0.42"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M168 288C152 314 122 332 88 336"
          stroke="#FFFFFF"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M178 92C196 110 206 132 208 160"
          stroke="#EA580C"
          strokeOpacity="0.18"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
        />

        <rect
          width={SCREEN_BG_WIDTH}
          height={SCREEN_BG_HEIGHT}
          filter="url(#stamina-screen-paper)"
          opacity="0.88"
        />
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.34)_0%,rgba(255,255,255,0.12)_18%,rgba(255,255,255,0.04)_38%,rgba(124,45,18,0.12)_100%)]" />
    </div>
  );
}

function StaminaScreenUI({ timeStr }: { timeStr: string }) {
  return (
    <div className="absolute top-0 left-0 right-0 px-[1.4rem] pt-5 pb-3 flex justify-between items-center z-50">
      {/* System Time - Scaled down slightly */}
      <span className="text-[10px] font-bold text-slate-950 tracking-[-0.01em] leading-none mb-0.5">
        {timeStr}
      </span>

      <div className="flex items-center gap-1.5">
        {/* Scaled down Signal Strength SVG */}
        <svg
          className="w-[14px] h-[9px] text-slate-900"
          viewBox="0 0 17 10"
          fill="currentColor"
        >
          <rect x="0" y="7" width="2.5" height="3" rx="0.5" />
          <rect x="4" y="5" width="2.5" height="5" rx="0.5" />
          <rect x="8" y="2.5" width="2.5" height="7.5" rx="0.5" />
          <rect x="12" y="0" width="2.5" height="10" rx="0.5" />
        </svg>

        {/* Scaled down Wi-Fi SVG */}
        <svg
          className="w-[13px] h-[10px] text-slate-900"
          viewBox="0 0 15 11"
          fill="none"
        >
          <path
            d="M7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11Z"
            fill="currentColor"
          />
          <path
            d="M12.11 6.39C10.884 5.16398 9.23199 4.4754 7.5 4.4754C5.76801 4.4754 4.11602 5.16398 2.89 6.39"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M14.61 3.89C12.7239 2.00392 10.166 0.945312 7.5 0.945312C4.83401 0.945312 2.27602 2.00392 0.39 3.89"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
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

function PhoneShell({
  mousePos,
  timeStr,
}: {
  mousePos: { x: number; y: number };
  timeStr: string;
}) {
  return (
    <div
      className="relative h-[492px] w-[276px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div
        className="absolute inset-0 rounded-[3.5rem] bg-[#0F1115] shadow-[40px_80px_100px_rgba(0,0,0,0.6)]"
        style={{ transform: "translateZ(-12px)" }}
      />

      <div
        className="absolute inset-x-[1px] inset-y-[1px] rounded-[3.4rem] bg-[#0F1115] border-[0.5px] border-white/10 overflow-hidden"
        style={{ transform: "translateZ(0px)" }}
      >
        <div className="absolute inset-0 rounded-[3.4rem] opacity-40 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4),inset_1px_0_2px_rgba(255,255,255,0.2)]" />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute left-[-3px] top-[90px] w-[4px] h-7 bg-[#1A1D23] rounded-l-[2px] border-y border-l border-white/20 shadow-sm"
          style={{ transform: "translateZ(-2px)" }}
        />
        <div
          className="absolute left-[-3px] top-[130px] w-[4px] h-11 bg-[#1A1D23] rounded-l-[2px] border-y border-l border-white/20 shadow-sm"
          style={{ transform: "translateZ(-2px)" }}
        />
        <div
          className="absolute left-[-3px] top-[185px] w-[4px] h-11 bg-[#1A1D23] rounded-l-[2px] border-y border-l border-white/20 shadow-sm"
          style={{ transform: "translateZ(-2px)" }}
        />
        <div
          className="absolute right-[-3px] top-[160px] w-[4px] h-16 bg-[#1A1D23] rounded-r-[2px] border-y border-r border-white/20 shadow-sm"
          style={{ transform: "translateZ(-2px)" }}
        />
        <div
          className="absolute right-[-1.5px] bottom-[140px] w-[3px] h-14 bg-[#090A0C] rounded-r-md border border-white/5 opacity-80"
          style={{ transform: "translateZ(-2px)" }}
        />
      </div>

      <div
        className="absolute inset-[5px] rounded-[3rem] bg-white overflow-hidden shadow-[inset_0_0_10px_rgba(0,0,0,0.4)] flex flex-col"
        style={{ transform: "translateZ(1px)" }}
      >
        <StaminaScreenBackground />
        <StaminaScreenUI timeStr={timeStr} />

        <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[92px] h-[28px] bg-black rounded-full z-50">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent opacity-20" />
        </div>

        <div
          className="absolute inset-0 z-[60] pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-700"
          style={{
            background: `linear-gradient(${
              75 + mousePos.x * 20
            }deg, transparent, rgba(255,255,255,0.8) 45%, rgba(255,255,255,0.8) 55%, transparent)`,
            transform: `translateX(${mousePos.x * 100}%)`,
          }}
        />
      </div>
    </div>
  );
}

export default function StaminaAppMockup({
  animKey,
  isSectionHovered,
  externalMousePos,
}: {
  animKey: number;
  isSectionHovered?: boolean;
  externalMousePos?: { x: number; y: number };
}) {
  const isHovered = isSectionHovered || false;
  const [hasCarouselTouchInteracted, setHasCarouselTouchInteracted] =
    useState(false);
  const mousePos = externalMousePos || { x: 0, y: 0 };
  const timeStr = useMockDeviceTime("20:22");

  const compositionTransform = `translateY(${
    isHovered ? "-6px" : "0px"
  }) scale(${isHovered ? 1.005 : 0.99})`;

  return (
    <div
      key={animKey}
      className="w-full h-full flex items-center justify-center p-4 md:p-8 select-none relative group"
      style={{ perspective: "3000px", transformStyle: "preserve-3d" }}
    >
      <style>{STAMINA_SCROLL_KEYFRAMES}</style>
      <div
        className="relative h-[406px] w-[420px] transition-transform duration-700 ease-out md:h-[468px] md:w-[516px]"
        style={{
          transformStyle: "preserve-3d",
          transform: compositionTransform,
        }}
      >
        <div className="absolute left-1/2 bottom-5 h-[46px] w-[340px] -translate-x-1/2 rounded-full bg-black/20 blur-[30px] md:w-[392px]" />

        <div
          className="absolute left-1/2 top-0 z-10 transition-transform duration-700 ease-out"
          style={{
            transform: `translate3d(calc(-50% + ${
              isHovered ? "-1px" : "0px"
            }), ${isHovered ? "-12px" : "-4px"}, 0) rotate(-2deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="origin-center scale-[0.82] md:scale-[0.9]">
            <PhoneShell mousePos={mousePos} timeStr={timeStr} />
          </div>
        </div>

        <div
          className="absolute left-1/2 top-[108px] z-30 h-[232px] w-[344px] -translate-x-1/2 transition-transform duration-700 ease-out md:top-[124px] md:h-[248px] md:w-[418px]"
          onTouchStartCapture={() => setHasCarouselTouchInteracted(true)}
          style={{
            transformStyle: "preserve-3d",
            transform: `translate3d(0, ${isHovered ? "-4px" : "0px"}, 0)`,
          }}
        >
          <div
            className="absolute left-1/2 top-0 h-[284px] w-[216px] -translate-x-1/2 overflow-visible md:h-[300px]"
            style={
              {
                transformStyle: "preserve-3d",
                animation: hasCarouselTouchInteracted
                  ? "none"
                  : `stamina-carousel-plane ${STAMINA_CAROUSEL_DURATION} ease-in-out infinite`,
                "--stamina-slide-shift": "224px",
              } as React.CSSProperties
            }
          >
            <div
              className="flex items-start gap-4 px-1 will-change-transform"
              style={{
                animation: hasCarouselTouchInteracted
                  ? "none"
                  : `stamina-carousel-track ${STAMINA_CAROUSEL_DURATION} cubic-bezier(0.65, 0, 0.35, 1) infinite`,
              }}
            >
              <div
                className="rounded-[24px]"
                style={{
                  animation: hasCarouselTouchInteracted
                    ? "none"
                    : `stamina-carousel-card ${STAMINA_CAROUSEL_DURATION} ease-in-out infinite`,
                }}
              >
                <DailyProgressFloatingCard />
              </div>
              <div
                className="rounded-[24px]"
                style={{
                  animation: hasCarouselTouchInteracted
                    ? "none"
                    : `stamina-carousel-card ${STAMINA_CAROUSEL_DURATION} ease-in-out infinite`,
                }}
              >
                <LowStaminaFloatingCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
