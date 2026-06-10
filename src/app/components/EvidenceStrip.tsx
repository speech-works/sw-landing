"use client";

import React, { useRef, MouseEvent } from 'react';


const EVIDENCE_DATA = [
  {
    label: "Anchored in Reality",
    citation: "[YARUSS & QUESAL, 2006]",
    text: "The scale that measures where you are is built from real stories: 173 adults who stutter, whose experiences were studied and turned into the numbers you'll see.",
  },
  {
    label: "More Than Fluency",
    citation: "[WHO ICF FRAMEWORK]",
    text: "Stuttering affects more than how words come out. It affects what you do, who you see, and how you feel about yourself. We track all of it, using the same framework the WHO uses to understand disability and functioning.",
  },
  {
    label: "Safety-Gated Practice",
    citation: "[FOA & MCLEAN, 2016]",
    text: "Not every day is the right day to push hard. When your emotional state is too unstable, the app pulls back the intensity automatically. Progress needs a safe foundation.",
  },
  {
    label: "Two Distinct Paths",
    citation: "[TICHENOR & YARUSS, 2019]",
    text: "If you've spent years avoiding certain words, certain situations, certain people, your practice path is different from someone whose stutter is visible. The algorithm knows the difference and routes accordingly.",
  }
];

export function EvidenceStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = React.useState(0);

  const scrollToIndex = (index: number) => {
    if (!containerRef.current) return;
    const count = EVIDENCE_DATA.length;
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
    const cards = containerRef.current.querySelectorAll('.evidence-card');
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
    <section className="bg-[#050505] text-app-light py-8 md:py-32 relative overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand/10 blur-[150px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-6 shadow-sm backdrop-blur-xl reveal translate-y-4 opacity-0 transition-all duration-700 [&.active]:translate-y-0 [&.active]:opacity-100">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/80">
                Why You Can Trust This
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white reveal translate-y-4 opacity-0 transition-all duration-700 delay-100 [&.active]:translate-y-0 [&.active]:opacity-100">
              Rooted in decades of research.
            </h2>
          </div>
          <p className="text-white/40 font-medium max-w-sm md:text-right reveal translate-y-4 opacity-0 transition-all duration-700 delay-200 [&.active]:translate-y-0 [&.active]:opacity-100">
            The research behind this app is real and citable. We show our sources.
          </p>
        </div>

        <div className="relative">
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onScroll={handleScroll}
            className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-6 group/grid"
          >
            {EVIDENCE_DATA.map((item, index) => (
              <div 
                key={index} 
                className="evidence-card relative shrink-0 w-full md:w-auto snap-center"
              >
                <div className="relative h-full rounded-3xl bg-white/[0.02] border border-white/5 p-8 md:p-12 overflow-hidden transition-colors duration-500 hover:bg-white/[0.04] group/card reveal translate-y-8 opacity-0 transition-all duration-700 [&.active]:translate-y-0 [&.active]:opacity-100" style={{ transitionDelay: `${index * 100 + 300}ms` }}>
                  {/* Spotlight Background Glow */}
                  <div 
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover/grid:opacity-100"
                    style={{
                      background: `radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.06), transparent 40%)`
                    }}
                  />
                  {/* Spotlight Border Glow */}
                  <div 
                    className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition duration-500 group-hover/grid:opacity-100"
                    style={{
                      background: `radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(242,128,68,0.4), transparent 50%)`,
                      WebkitMaskImage: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
                      WebkitMaskComposite: `xor`,
                      maskComposite: `exclude`,
                      padding: `1px`
                    }}
                  />

                  <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px] gap-8">
                    <div className="flex flex-col space-y-5 items-start">
                      <div className="inline-flex items-center rounded bg-black/40 py-1.5 px-2.5 border border-white/5">
                        <span className="font-mono text-[10px] md:text-[11px] font-semibold tracking-widest text-brand group-hover/card:text-brand-light transition-colors duration-300">
                          {item.citation}
                        </span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white group-hover/card:translate-x-1 transition-transform duration-300 ease-out">
                        {item.label}
                      </h3>
                    </div>
                    
                    <p className="text-[0.95rem] md:text-[1.05rem] text-white/50 font-medium leading-relaxed max-w-[42ch]">
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
}
