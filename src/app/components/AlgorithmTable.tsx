"use client";

import React, { useRef, MouseEvent } from 'react';


const ALGORITHM_DATA = [
  {
    name: "Severity Scoring",
    description: "Maps onboarding answers to a 0-100 scale anchored to published stuttering impact norms.",
    research: "[YARUSS & QUESAL, 2006]",
    status: "VALIDATED"
  },
  {
    name: "1-D Kalman Filter",
    description: "Updates clinical state after every session. Uncertainty grows when you go quiet; corrects when new data arrives.",
    research: "[EMA RESEARCH; N=173]",
    status: "VALIDATED"
  },
  {
    name: "Crisis Detection",
    description: "Recency-weighted volatility index. Decay factor 0.85/day. Triggers safety gate if SD > 15 over 7 days.",
    research: "[KUPPENS, ALLEN & SHEEBER, 2010]",
    status: "VALIDATED"
  },
  {
    name: "Safety Gating",
    description: "Blocks high-intensity exposure during high-anxiety states. Supported by exposure theory and stuttering-specific anxiety comorbidity research.",
    research: "[FOA & MCLEAN, 2016; IVERACH & RAPEE, 2014]",
    status: "VALIDATED"
  },
  {
    name: "Covert Phenotype Routing",
    description: "High-avoidance, low-struggle users get ACT-path content, not fluency shaping.",
    research: "[TICHENOR & YARUSS, 2019]",
    status: "VALIDATED"
  },
  {
    name: "Avoidance Frequency Mapping",
    description: "Translates self-reported avoidance frequency to severity scores.",
    research: "[CLINICAL HEURISTIC]",
    status: "HEURISTIC"
  },
  {
    name: "Emotional Weighting",
    description: "Modulates initial severity based on emotional state at onboarding.",
    research: "[CLINICAL HEURISTIC]",
    status: "HEURISTIC"
  }
];

export function AlgorithmTable() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = React.useState(0);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const count = ALGORITHM_DATA.length;
    const wrappedIndex = (index + count) % count;

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile) {
      const child = containerRef.current.children[wrappedIndex] as HTMLElement;
      if (child) {
        containerRef.current.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
      }
    } else {
      const scrollAmount = wrappedIndex * window.innerWidth;
      containerRef.current.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
    setActiveIndex(wrappedIndex);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.algo-card');
    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
      (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
    });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    let index = 0;
    if (isMobile) {
      const scrollLeft = element.scrollLeft;
      const children = Array.from(element.children) as HTMLElement[];
      let closestDistance = Infinity;

      children.forEach((child, i) => {
        const distance = Math.abs(child.offsetLeft - scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          index = i;
        }
      });
    } else {
      index = Math.round(element.scrollLeft / window.innerWidth);
    }

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <div className="w-full relative z-10 mb-16 md:mb-24 pt-8 md:pt-16">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6 shadow-sm backdrop-blur-xl">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/80">
            Built for every phenotype
          </span>
        </div>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6">
          The Logic. The Learning.
        </h3>
        <p className="text-[1.05rem] md:text-lg text-white/60 font-medium leading-relaxed max-w-3xl mx-auto">
          Some of these are validated against <span className="text-white font-bold">published research</span>. Some are still being refined as real user data comes in. We document the difference.
        </p>
      </div>

      <div className="relative">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onScroll={handleScroll}
          className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 group/grid"
        >
          {ALGORITHM_DATA.map((row, idx) => {
            const isValidated = row.status === 'VALIDATED';
            // Make the last item span 2 columns on large screens to balance the 7 items
            const isLast = idx === ALGORITHM_DATA.length - 1;

            return (
              <div
                key={idx}
                className={`algo-card relative shrink-0 w-full md:w-auto snap-center group/card ${isLast ? 'lg:col-span-2' : ''}`}
              >
                <div className="relative h-full rounded-3xl bg-[#1A1310]/40 backdrop-blur-md border border-white/5 p-6 md:p-8 overflow-hidden hover:bg-[#1A1310]/80 transition-colors duration-500" style={{ transitionDelay: `${idx * 100 + 300}ms` }}>
                  {/* Spotlight Background Glow */}
                  <div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover/grid:opacity-100"
                    style={{
                      background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.04), transparent 40%)`
                    }}
                  />
                  {/* Spotlight Border Glow */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-500 group-hover/grid:opacity-100"
                    style={{
                      background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), ${isValidated ? 'rgba(52,211,153,0.3)' : 'rgba(251,191,36,0.3)'}, transparent 50%)`,
                      WebkitMaskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                      WebkitMaskComposite: `xor`,
                      maskComposite: `exclude`,
                      padding: `1px`
                    }}
                  />

                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">

                    <div className="flex justify-between items-start gap-4">
                      <h4 className="text-xl md:text-2xl font-black text-white group-hover/card:translate-x-1 transition-transform duration-300 ease-out">
                        {row.name}
                      </h4>

                      {/* Status Badge */}
                      <div className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-black tracking-widest ${isValidated
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isValidated ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                        {row.status}
                      </div>
                    </div>

                    <p className="text-[0.95rem] md:text-base text-white/60 font-medium leading-relaxed max-w-[50ch]">
                      {row.description}
                    </p>

                    <div className="pt-4 mt-auto">
                      <div className="inline-flex items-center rounded bg-black/40 py-1.5 px-2.5 border border-white/5">
                        <span className="font-mono text-[10px] font-semibold tracking-widest text-white/50 group-hover/card:text-white/80 transition-colors duration-300">
                          {row.research}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </div>

      <div className="mt-12 text-center max-w-3xl mx-auto">
        <p className="text-sm md:text-base font-medium text-white/40">
          Two of our parameters are clearly marked as heuristics pending validation. We built the infrastructure to test and refine them as real user data comes in. We document everything.
        </p>
      </div>
    </div>
  );
}
