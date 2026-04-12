import { useEffect, useRef, useState } from "react";
import RoadmapMockup from "./RoadmapMockup";

export default function Roadmap() {
  const [activePhase, setActivePhase] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
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
                  className={`text-left group outline-none w-full transition-opacity duration-300 relative cursor-pointer ${activePhase === phase ? "opacity-100" : "opacity-50 hover:opacity-100"}`}
                >
                  <div
                    className={`absolute left-[-27px] md:left-[-43px] -top-[2px] -bottom-[2px] w-[4px] bg-${themes[phase]} transition-all duration-500 ${activePhase === phase ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"} origin-top`}
                  />

                  <span
                    className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2 block transition-colors duration-300 ${activePhase === phase ? `text-${themes[phase]}` : "text-app-muted"}`}
                  >
                    {phase.toString().padStart(2, "0")} /{" "}
                    {phase === 1
                      ? "We Built"
                      : phase === 2
                        ? "We Are Building"
                        : "We Will Build"}
                  </span>

                  <h4
                    className={`text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter transition-all duration-500 ${activePhase === phase ? "text-app-text" : "text-transparent [-webkit-text-stroke:1px_rgba(63,51,45,0.3)] group-hover:[-webkit-text-stroke:1px_rgba(63,51,45,0.7)]"}`}
                  >
                    {phase === 1
                      ? "Forging the Tools"
                      : phase === 2
                        ? "Uniting the Community"
                        : "Bridging the Gap"}
                  </h4>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${activePhase === phase ? "opacity-100 mt-2 md:mt-4" : "opacity-0 mt-0"}`}
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
                className={`absolute inset-0 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#F97316] to-[#EA580C] p-6 sm:p-8 md:p-12 transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] border border-white/10 shadow-[0_40px_100px_-20px_rgba(234,88,12,0.3)] group/canvas flex flex-col justify-between ${activePhase === 1 ? "opacity-100 translate-y-0 scale-100 z-20 pointer-events-auto" : "opacity-0 translate-y-8 scale-95 z-0 pointer-events-none"}`}
              >
                {/* Layer 1: Technical Grid Watermark (Deepest) */}
                <div
                  className="absolute inset-0 opacity-[0.1] mix-blend-overlay pointer-events-none"
                  style={{
                    transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px)`,
                  }}
                >
                  <div className="absolute inset-0 bg-grid opacity-20" />
                </div>

                {/* Layer 2: Massive Background Numeral */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] md:text-[35rem] font-black text-white/[0.03] tracking-tightest pointer-events-none leading-none select-none transition-transform duration-1000 ease-out"
                  style={{
                    transform: `translate(-50%, -50%) translate(${(mousePos.x - 0.5) * 40}px, ${(mousePos.y - 0.5) * 40}px)`,
                  }}
                >
                  01
                </div>

                <div className="relative z-30 flex items-center justify-center h-full w-full pointer-events-none">
                  {/* Floating Typography Poster */}
                  <div className="w-full flex flex-col items-center justify-center text-center transition-transform duration-300 ease-out"
                       style={{ transform: `translate(${(mousePos.x - 0.5) * -40}px, ${(mousePos.y - 0.5) * -40}px)` }}>
                    
                    <div className="space-y-0 pointer-events-auto relative group/poster">
                      <div className="space-y-0 relative">
                        <h3 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] text-white font-black tracking-tightest uppercase leading-[0.8] drop-shadow-2xl">
                          CLINICAL
                        </h3>
                        <h3 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] text-transparent font-black tracking-tightest uppercase leading-[0.8]" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.7)' }}>
                          GRADE
                        </h3>
                        <h3 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] text-brand-100 font-serif italic font-light tracking-tighter leading-[0.8]">
                          sandbox.
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Stage Mockup Anchor - Half Visible & Ultra Scale */}
                <div
                  className="absolute right-[-10%] md:right-[-5%] bottom-[-35%] w-[80%] md:w-[65%] h-full flex justify-end items-end pointer-events-none z-20 transition-transform duration-1000 ease-out"
                  style={{
                    transform: `translate(${(mousePos.x - 0.5) * 35}px, ${(mousePos.y - 0.5) * 35}px)`,
                  }}
                >
                  <div className="relative transform scale-[1.1] md:scale-[1.25] transition-all duration-700">
                    <div className="absolute inset-0 bg-black/60 blur-[60px] rounded-[3.5rem] scale-90 translate-y-12 translate-x-6 opacity-40 group-hover/canvas:opacity-60 transition-opacity" />
                    <RoadmapMockup phase={1} status="live" />
                  </div>
                </div>
              </div>

              {/*  Canvas 2: PHASE 02  */}
              <div
                className={`absolute inset-0 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-purple-500 to-purple-800 p-6 sm:p-8 md:p-12 transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] border border-white/10 shadow-2xl group/canvas flex flex-col justify-between ${activePhase === 2 ? "opacity-100 translate-y-0 scale-100 z-20 pointer-events-auto" : "opacity-0 translate-y-8 scale-95 z-0 pointer-events-none"}`}
              >
                <div
                  className="absolute inset-x-0 top-0 h-1/2 opacity-[0.05] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundSize: "20px 20px",
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  }}
                />

                {/* Layer 2: Massive Background Numeral */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] md:text-[35rem] font-black text-white/[0.03] tracking-tightest pointer-events-none leading-none select-none transition-transform duration-1000 ease-out"
                  style={{
                    transform: `translate(-50%, -50%) translate(${(mousePos.x - 0.5) * -40}px, ${(mousePos.y - 0.5) * -40}px)`,
                  }}
                >
                  02
                </div>

                <div className="relative z-30 flex items-center justify-center h-full w-full pointer-events-none">
                  <div className="w-full flex flex-col items-center justify-center text-center transition-transform duration-300 ease-out"
                       style={{ transform: `translate(${(mousePos.x - 0.5) * -40}px, ${(mousePos.y - 0.5) * -40}px)` }}>
                    
                    <div className="space-y-0 pointer-events-auto relative group/poster">
                      <div className="space-y-0 relative">
                        <h3 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] text-white font-black tracking-tightest uppercase leading-[0.8] drop-shadow-2xl">
                          STRONGER
                        </h3>
                        <h3 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] text-transparent font-black tracking-tightest uppercase leading-[0.8]" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.7)' }}>
                          UNIFIED
                        </h3>
                        <h3 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] text-purple-200 font-serif italic font-light tracking-tighter leading-[0.8]">
                          community.
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute right-[-10%] md:right-[-5%] bottom-[-35%] w-[80%] md:w-[65%] h-full flex justify-end items-end pointer-events-none z-20 transition-transform duration-1000 ease-out"
                  style={{
                    transform: `translate(${(mousePos.x - 0.5) * 35}px, ${(mousePos.y - 0.5) * 35}px)`,
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
                className={`absolute inset-0 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-emerald-800 p-6 sm:p-8 md:p-12 transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] border border-white/10 shadow-2xl group/canvas flex flex-col justify-between ${activePhase === 3 ? "opacity-100 translate-y-0 scale-100 z-20 pointer-events-auto" : "opacity-0 translate-y-8 scale-95 z-0 pointer-events-none"}`}
              >
                <div
                  className="absolute inset-0 h-1/2 opacity-[0.05] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 2px, transparent 2px)",
                    backgroundSize: "30px 30px",
                  }}
                />

                {/* Layer 2: Massive Background Numeral */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[25rem] md:text-[35rem] font-black text-white/[0.03] tracking-tightest pointer-events-none leading-none select-none transition-transform duration-1000 ease-out"
                  style={{
                    transform: `translate(-50%, -50%) translate(${(mousePos.x - 0.5) * -40}px, ${(mousePos.y - 0.5) * -40}px)`,
                  }}
                >
                  03
                </div>

                <div className="relative z-30 flex items-center justify-center h-full w-full pointer-events-none">
                  <div className="w-full flex flex-col items-center justify-center text-center transition-transform duration-300 ease-out"
                       style={{ transform: `translate(${(mousePos.x - 0.5) * -40}px, ${(mousePos.y - 0.5) * -40}px)` }}>
                    
                    <div className="space-y-0 pointer-events-auto relative group/poster">
                      <div className="space-y-0 relative">
                        <h3 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] text-white font-black tracking-tightest uppercase leading-[0.8] drop-shadow-2xl">
                          EXPERT
                        </h3>
                        <h3 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] text-transparent font-black tracking-tightest uppercase leading-[0.8]" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.7)' }}>
                          CLINICAL
                        </h3>
                        <h3 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[9.5rem] text-emerald-100 font-serif italic font-light tracking-tighter leading-[0.8]">
                          guidance.
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute right-[-10%] md:right-[-5%] bottom-[-35%] w-[80%] md:w-[65%] h-full flex justify-end items-end pointer-events-none z-20 transition-transform duration-1000 ease-out"
                  style={{
                    transform: `translate(${(mousePos.x - 0.5) * 35}px, ${(mousePos.y - 0.5) * 35}px)`,
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
