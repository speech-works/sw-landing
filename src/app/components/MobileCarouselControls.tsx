"use client";

import React from "react";

type MobileCarouselControlsProps = {
  currentIndex: number;
  count: number;
  onPrevious: () => void;
  onNext: () => void;
  onSelect?: (index: number) => void;
  getItemLabel?: (index: number) => string;
  tone?: "light" | "dark";
  showDots?: boolean;
  layout?: "overlay" | "inline";
  className?: string;
};

function Chevron({
  direction,
  className,
}: {
  direction: "left" | "right";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={direction === "left" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"} />
    </svg>
  );
}

export default function MobileCarouselControls({
  currentIndex,
  count,
  onPrevious,
  onNext,
  onSelect,
  getItemLabel,
  tone = "light",
  showDots = true,
  layout = "overlay",
  className = "",
}: MobileCarouselControlsProps) {
  const isDark = tone === "dark";
  const dotsShellClasses = isDark
    ? "border-white/10 bg-[#140f0d]/64 text-white/84 shadow-[0_16px_36px_rgba(0,0,0,0.28)]"
    : "border-black/8 bg-white/80 text-app-text/78 shadow-[0_16px_36px_rgba(63,51,45,0.1)]";
  const buttonClasses = isDark
    ? "border-white/12 bg-[#18110f]/78 text-white shadow-[0_16px_30px_rgba(0,0,0,0.38)] hover:bg-[#221916]/88"
    : "border-black/8 bg-white/92 text-app-text shadow-[0_16px_30px_rgba(63,51,45,0.14)] hover:bg-white";
  const activeDotClasses = isDark
    ? "bg-brand shadow-[0_0_16px_rgba(242,128,68,0.45)]"
    : "bg-app-text shadow-[0_0_16px_rgba(63,51,45,0.18)]";
  const inactiveDotClasses = isDark ? "bg-white/20" : "bg-black/16";
  const dots = showDots ? (
    <div
      className={`mobile-section-glass inline-flex items-center gap-2 rounded-full border px-3 py-2 backdrop-blur-md ${dotsShellClasses}`}
    >
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === currentIndex;
        const label = getItemLabel?.(index) ?? `slide ${index + 1}`;

        return (
          <button
            key={label}
            type="button"
            onClick={() => onSelect?.(index)}
            className="flex h-7 items-center justify-center"
            aria-label={`Show ${label}`}
            aria-pressed={isActive}
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? `w-8 ${activeDotClasses}`
                  : `w-2.5 ${inactiveDotClasses}`
              }`}
            />
          </button>
        );
      })}
    </div>
  ) : null;

  if (layout === "inline") {
    return (
      <div
        className={`mt-5 flex items-center justify-center gap-3 ${className}`}
      >
        <button
          type="button"
          onClick={onPrevious}
          className={`mobile-section-glass flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-[1.04] ${buttonClasses}`}
          aria-label="Show previous slide"
        >
          <Chevron direction="left" className="h-4.5 w-4.5" />
        </button>

        {dots}

        <button
          type="button"
          onClick={onNext}
          className={`mobile-section-glass flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-[1.04] ${buttonClasses}`}
          aria-label="Show next slide"
        >
          <Chevron direction="right" className="h-4.5 w-4.5" />
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-2 sm:px-3 ${
          showDots ? "bottom-14" : "bottom-0"
        }`}
      >
        <button
          type="button"
          onClick={onPrevious}
          className={`mobile-section-glass pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-[1.04] sm:-translate-x-2 ${buttonClasses}`}
          aria-label="Show previous slide"
        >
          <Chevron direction="left" className="h-4.5 w-4.5" />
        </button>

        <button
          type="button"
          onClick={onNext}
          className={`mobile-section-glass pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 hover:scale-[1.04] sm:translate-x-2 ${buttonClasses}`}
          aria-label="Show next slide"
        >
          <Chevron direction="right" className="h-4.5 w-4.5" />
        </button>
      </div>

      {showDots && (
        <div className={`mt-4 flex items-center justify-center ${className}`}>
          {dots}
        </div>
      )}
    </>
  );
}
