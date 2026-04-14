import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import RoadmapMockup from "./RoadmapMockup";

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [hoveredStackIndex, setHoveredStackIndex] = useState<number | null>(
    null
  );
  const sectionRef = useRef<HTMLElement>(null);

  // Navigation Themes
  const themes: Record<number, string> = {
    1: "brand",
    2: "purple-500",
    3: "emerald-500",
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <section
        id="roadmap"
        ref={sectionRef}
        className="py-20 md:py-32 relative z-10 bg-[#FFFAF5] overflow-hidden font-sans select-none"
        style={
          {
            "--mouse-x": `${mousePos.x * 100}%`,
            "--mouse-y": `${mousePos.y * 100}%`,
          } as React.CSSProperties
        }
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="mb-12 md:mb-16 reveal text-center lg:text-left active">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/5 shadow-sm text-app-text text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
              Master Plan
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter leading-[0.95] text-app-text">
              THE SPEECHWORKS
              <br />
              ROADMAP.
            </h3>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-stretch reveal reveal-delay-1 active">
            {/*  Left: Editorial Typography Menu  */}
            <div className="w-full lg:w-5/12 relative pl-6 md:pl-10 border-l-2 border-black/[0.04] flex flex-col gap-6 md:gap-10 lg:self-center">
              {[1, 2, 3].map((phase) => (
                <button
                  key={phase}
                  onClick={() => setActivePhase(phase)}
                  className={`text-left group outline-none w-full transition-opacity duration-300 relative cursor-pointer ${
                    activePhase === phase
                      ? "opacity-100"
                      : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`absolute left-[-27px] md:left-[-43px] -top-[2px] -bottom-[2px] w-[4px] bg-${
                      themes[phase]
                    } transition-all duration-500 ${
                      activePhase === phase
                        ? "opacity-100 scale-y-100"
                        : "opacity-0 scale-y-0"
                    } origin-top`}
                  />

                  <span
                    className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2 block transition-colors duration-300 ${
                      activePhase === phase
                        ? `text-${themes[phase]}`
                        : "text-app-muted"
                    }`}
                  >
                    {phase.toString().padStart(2, "0")} /{" "}
                    {phase === 1
                      ? "We Built"
                      : phase === 2
                      ? "We Are Building"
                      : "We Will Build"}
                  </span>

                  <h4
                    className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter transition-all duration-500 ${
                      activePhase === phase
                        ? "text-app-text"
                        : "text-transparent [-webkit-text-stroke:1px_rgba(63,51,45,0.3)] group-hover:[-webkit-text-stroke:1px_rgba(63,51,45,0.7)]"
                    }`}
                  >
                    {phase === 1
                      ? "Forging the Tools"
                      : phase === 2
                      ? "Uniting the Community"
                      : "Bridging the Gap"}
                  </h4>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      activePhase === phase
                        ? "opacity-100 mt-2 md:mt-4"
                        : "opacity-0 mt-0"
                    }`}
                    style={{
                      maxHeight: activePhase === phase ? "200px" : "0px",
                    }}
                  >
                    <p className="text-app-muted font-medium leading-relaxed pr-2 md:pr-4 text-sm md:text-base">
                      {phase === 1
                        ? "A clinical-grade sandbox. Live and available now. We have built an AI-driven app that provides a safe environment for you to practice real-world scenarios."
                        : phase === 2
                        ? "We are actively building a unified community space where users can share their experiences, celebrate victories, and find support."
                        : "Bridging the gap between practice and professional therapy. Connect seamlessly with vetted Speech-Language Pathologists."}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/*  Right: The Experimental Stage  */}
            <div className="w-full lg:w-7/12 relative h-[450px] sm:h-[500px] lg:h-[600px] mt-6 lg:mt-0 perspective-[1200px]">
              {/*  Canvas 1: PHASE 01  */}
              <div
                className={`absolute inset-0 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#F97316] to-[#EA580C] p-6 sm:p-8 md:p-12 transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] border border-white/10 shadow-[0_40px_100px_-20px_rgba(234,88,12,0.3)] group/canvas flex flex-col justify-between ${
                  activePhase === 1
                    ? "opacity-100 translate-y-0 scale-100 z-20 pointer-events-auto"
                    : "opacity-0 translate-y-8 scale-95 z-0 pointer-events-none"
                }`}
              >
                {/* Layer 1: Technical Grid Watermark (Deepest) */}
                <div
                  className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none"
                  style={{
                    transform: `translate(${(mousePos.x - 0.5) * 20}px, ${
                      (mousePos.y - 0.5) * 20
                    }px)`,
                  }}
                >
                  <div className="absolute inset-0 bg-grid opacity-20" />
                </div>

                {/* Bottom Icon Watermark */}
                <div className="absolute bottom-12 inset-x-0 overflow-hidden opacity-[0.03] pointer-events-none">
                  <div className="marquee-content slow flex gap-12 whitespace-nowrap">
                    {[...Array(12)].map((_, i) => (
                      <svg
                        key={i}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="flex-shrink-0"
                      >
                        <path d="M3 12H5M8 8V16M11 4V20M14 7V17M17 10V14M20 12H21" />
                      </svg>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
                  {/* Watermark Marquee Layer */}
                  <div className="w-full marquee-container rotate-[-3deg] opacity-[0.03]">
                    <div className="marquee-content very-slow flex gap-20 whitespace-nowrap">
                      {[...Array(4)].map((_, i) => (
                        <span
                          key={i}
                          className="text-[8rem] md:text-[14rem] text-white font-black tracking-tighter uppercase leading-none select-none"
                        >
                          CLINICAL GRADE SANDBOX •
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Stage Mockup Anchor - Triple Phone Stack (Symmetric & Centered) */}
                <div
                  className="absolute right-[5%] md:right-[15%] bottom-[-30%] w-full h-full flex justify-end items-end z-50 transition-transform duration-1000 ease-out perspective-[2000px] origin-bottom-right"
                  style={{
                    transform: `translate(${(mousePos.x - 0.5) * 50}px, ${
                      (mousePos.y - 0.5) * 50
                    }px) rotateY(${(mousePos.x - 0.5) * -10}deg) rotateX(${
                      (mousePos.y - 0.5) * 10
                    }deg) scale(0.8)`,
                  }}
                >
                  <div className="relative w-full h-full flex justify-end items-end [transform-style:preserve-3d]">
                    {/* GUARD ZONES (Widened for symmetric stack) */}
                    <div className="absolute inset-x-0 bottom-0 z-[300] flex justify-center items-end pointer-events-none">
                      <div
                        className="relative w-[700px] h-[600px] pointer-events-auto flex translate-y-20 cursor-pointer"
                        onMouseLeave={() => setHoveredStackIndex(null)}
                      >
                        <div
                          className="flex-1 h-full"
                          onMouseEnter={() => setHoveredStackIndex(0)}
                        />
                        <div
                          className="flex-1 h-full"
                          onMouseEnter={() => setHoveredStackIndex(2)}
                        />
                        <div
                          className="flex-1 h-full"
                          onMouseEnter={() => setHoveredStackIndex(1)}
                        />
                      </div>
                    </div>

                    {[0, 1, 2].map((i) => {
                      // Physics-based positions for perfect, intuitive shuffling
                      const PosLeft = { x: -180, y: 50, r: -18, s: 0.9, z: 10 };
                      const PosRight = { x: 180, y: 50, r: 18, s: 0.9, z: 20 };
                      const PosCenterIdle = { x: 0, y: 0, r: 0, s: 1, z: 100 };
                      const PosCenterActive = {
                        x: 0,
                        y: -60,
                        r: 0,
                        s: 1.15,
                        z: 300,
                      };

                      let config = PosCenterIdle;

                      // Positional swapping logic to ensure ALL 3 remain visible without clipping.
                      // Whichever is hovered moves to center, dynamically displacing the center card to the side void.
                      if (
                        hoveredStackIndex === null ||
                        hoveredStackIndex === 2
                      ) {
                        if (i === 0) config = PosLeft;
                        if (i === 1) config = PosRight;
                        if (i === 2)
                          config =
                            hoveredStackIndex === 2
                              ? PosCenterActive
                              : PosCenterIdle;
                      } else if (hoveredStackIndex === 0) {
                        if (i === 0) config = PosCenterActive;
                        if (i === 1) config = PosRight;
                        if (i === 2) config = PosLeft; // Move original center card to the left void
                      } else if (hoveredStackIndex === 1) {
                        if (i === 0) config = PosLeft;
                        if (i === 1) config = PosCenterActive;
                        if (i === 2) config = PosRight; // Move original center card to the right void
                      }

                      const transform = `translate3d(${config.x}px, ${config.y}px, ${config.z}px) scale(${config.s}) rotate(${config.r}deg)`;
                      const isTop =
                        config === PosCenterActive ||
                        (hoveredStackIndex === null && i === 2);
                      const isFocused = config === PosCenterActive;

                      return (
                        <div
                          key={i}
                          className="absolute bottom-0 right-0 pointer-events-none transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform"
                          style={{
                            transform,
                            zIndex: config.z,
                          }}
                        >
                          <div
                            className={`relative transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                              !isTop
                                ? "opacity-70 blur-[1px]"
                                : "opacity-100 blur-0"
                            }`}
                          >
                            <div
                              className={`absolute inset-0 bg-black/60 blur-[60px] rounded-[3.5rem] scale-90 translate-y-12 translate-x-6 transition-opacity duration-700 pointer-events-none ${
                                isFocused ? "opacity-50" : "opacity-0"
                              }`}
                            />
                            <RoadmapMockup
                              phase={i === 0 ? 2 : i === 1 ? 3 : 1}
                              status="live"
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/*  Canvas 2: PHASE 02  */}
              <div
                className={`absolute inset-0 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-500 to-purple-800 p-6 sm:p-8 md:p-12 transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] border border-white/10 shadow-2xl group/canvas flex flex-col justify-between ${
                  activePhase === 2
                    ? "opacity-100 translate-y-0 scale-100 z-20 pointer-events-auto"
                    : "opacity-0 translate-y-8 scale-95 z-0 pointer-events-none"
                }`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
                  <Image
                    src="/assets/gif/agif.gif"
                    alt=""
                    fill
                    unoptimized
                    className="absolute inset-y-0 -right-[72%] h-full w-[150%] object-cover object-right opacity-[0.24] mix-blend-screen saturate-[1.05] contrast-[1.06]"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_32%,rgba(255,255,255,0.12),transparent_24%),linear-gradient(135deg,rgba(168,85,247,0.16),transparent_42%),linear-gradient(180deg,rgba(76,29,149,0.12)_0%,rgba(76,29,149,0.04)_100%)]" />
                </div>

                <div
                  className="absolute inset-x-0 top-0 h-1/2 opacity-[0.05] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundSize: "20px 20px",
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                  }}
                />

                {/* Bottom Icon Watermark */}
                <div className="absolute bottom-12 inset-x-0 overflow-hidden opacity-[0.03] pointer-events-none">
                  <div
                    className="marquee-content slow flex gap-12 whitespace-nowrap"
                    style={{ animationDirection: "reverse" }}
                  >
                    {[...Array(12)].map((_, i) => (
                      <svg
                        key={i}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="flex-shrink-0"
                      >
                        <path d="M12 2v20M17 5v14M22 9v6M7 5v14M2 9v6" />
                      </svg>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
                  {/* Watermark Marquee Layer */}
                  <div className="w-full marquee-container rotate-[2deg] opacity-[0.03]">
                    <div
                      className="marquee-content very-slow flex gap-20 whitespace-nowrap"
                      style={{ animationDirection: "reverse" }}
                    >
                      {[...Array(4)].map((_, i) => (
                        <span
                          key={i}
                          className="text-[8rem] md:text-[14rem] text-white font-black tracking-tighter uppercase leading-none select-none"
                        >
                          STRONGER UNIFIED COMMUNITY •
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Stage Mockup Anchor - Single Phone (Phase 2 & 3) */}
                <div
                  className="absolute right-[-10%] md:right-[-5%] bottom-[-35%] w-[80%] md:w-[65%] h-full flex justify-end items-end pointer-events-none z-50 transition-transform duration-1000 ease-out"
                  style={{
                    transform: `translate(${(mousePos.x - 0.5) * 35}px, ${
                      (mousePos.y - 0.5) * 35
                    }px)`,
                  }}
                >
                  <div className="relative transform scale-[1.1] md:scale-[1.25]">
                    <div className="absolute inset-0 bg-black/60 blur-[60px] rounded-[3.5rem] scale-90 translate-y-12 translate-x-6 opacity-40 shadow-[0_0_80px_rgba(167,139,250,0.4)]" />
                    <RoadmapMockup
                      phase={2}
                      status="building"
                      comingSoon={true}
                    />
                  </div>
                </div>
              </div>

              {/*  Canvas 3: PHASE 03  */}
              <div
                className={`absolute inset-0 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-emerald-800 p-6 sm:p-8 md:p-12 transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] border border-white/10 shadow-2xl group/canvas flex flex-col justify-between ${
                  activePhase === 3
                    ? "opacity-100 translate-y-0 scale-100 z-20 pointer-events-auto"
                    : "opacity-0 translate-y-8 scale-95 z-0 pointer-events-none"
                }`}
              >
                <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
                  <div className="absolute inset-y-0 -left-[30%] w-[130%]">
                    <Image
                      src="/assets/gif/bridge_gap.gif"
                      alt=""
                      fill
                      unoptimized
                      className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.33] mix-blend-screen saturate-[1.02] contrast-[1.04]"
                      sizes="(min-width: 900px) 50vw, 100vw"
                    />
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_24%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_38%),linear-gradient(180deg,rgba(6,95,70,0.08)_0%,rgba(6,95,70,0.02)_100%)]" />
                </div>

                <div
                  className="absolute inset-0 h-1/2 opacity-[0.05] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.2) 2px, transparent 2px)",
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Bottom Icon Watermark */}
                <div className="absolute bottom-12 inset-x-0 overflow-hidden opacity-[0.03] pointer-events-none">
                  <div className="marquee-content slow flex gap-12 whitespace-nowrap">
                    {[...Array(12)].map((_, i) => (
                      <svg
                        key={i}
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        className="flex-shrink-0"
                      >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                      </svg>
                    ))}
                  </div>
                </div>

                <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
                  {/* Watermark Marquee Layer */}
                  <div className="w-full marquee-container rotate-[-1.5deg] opacity-[0.03]">
                    <div className="marquee-content very-slow flex gap-20 whitespace-nowrap">
                      {[...Array(4)].map((_, i) => (
                        <span
                          key={i}
                          className="text-[8rem] md:text-[14rem] text-white font-black tracking-tighter uppercase leading-none select-none"
                        >
                          EXPERT CLINICAL GUIDANCE •
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Stage Mockup Anchor - Single Phone (Phase 2 & 3) */}
                <div
                  className="absolute right-[-10%] md:right-[-5%] bottom-[-35%] w-[80%] md:w-[65%] h-full flex justify-end items-end pointer-events-none z-50 transition-transform duration-1000 ease-out"
                  style={{
                    transform: `translate(${(mousePos.x - 0.5) * 35}px, ${
                      (mousePos.y - 0.5) * 35
                    }px)`,
                  }}
                >
                  <div className="relative transform scale-[1.1] md:scale-[1.25]">
                    <div className="absolute inset-0 bg-black/60 blur-[60px] rounded-[3.5rem] scale-90 translate-y-12 translate-x-6 opacity-40 shadow-[0_0_80px_rgba(52,211,153,0.4)]" />
                    <RoadmapMockup
                      phase={3}
                      status="future"
                      comingSoon={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
