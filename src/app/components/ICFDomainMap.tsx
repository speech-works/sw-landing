"use client";

import React from 'react';


export function ICFDomainMap() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const scrollToIndex = (index: number) => {
    const container = document.getElementById('icf-carousel');
    if (!container) return;
    const count = 4;
    const wrappedIndex = (index + count) % count;
    
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    if (isMobile) {
      const child = container.children[wrappedIndex] as HTMLElement;
      if (child) {
        container.scrollTo({ left: child.offsetLeft, behavior: 'smooth' });
      }
    } else {
      const scrollAmount = wrappedIndex * window.innerWidth;
      container.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
    setActiveIndex(wrappedIndex);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
    
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
    <section className="bg-[#FFFAF5] text-app-text py-8 md:py-32 relative z-10 overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[100px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-3 rounded-full border border-black/5 bg-white px-4 py-2 mb-6 shadow-sm reveal translate-y-4 opacity-0 transition-all duration-700 [&.active]:translate-y-0 [&.active]:opacity-100">
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-app-text">
              The 5 Dimensions
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 reveal translate-y-4 opacity-0 transition-all duration-700 delay-100 [&.active]:translate-y-0 [&.active]:opacity-100 text-app-text leading-[0.95]">
            What Growing<br className="hidden md:block"/> Actually Looks Like
          </h2>
          <p className="text-lg md:text-xl text-app-muted font-medium leading-relaxed reveal translate-y-4 opacity-0 transition-all duration-700 delay-200 ease-out [&.active]:translate-y-0 [&.active]:opacity-100">
            Every dimension on your Growth Profile maps directly to the World Health Organization&apos;s <span className="text-brand font-bold">International Classification of Functioning (ICF)</span>. Fluency alone is an incomplete picture.
          </p>
        </div>

        {/* Bento Grid / Mobile Carousel */}
        <div className="relative">
          <div 
            id="icf-carousel"
            onScroll={handleScroll}
            className="flex flex-col lg:grid lg:grid-cols-3 gap-4 lg:gap-8 auto-rows-[minmax(300px,_auto)]"
          >
            
            {/* MASTERY (Domain 1) - Col Span 2 */}
            <div className="shrink-0 w-full lg:w-auto snap-center lg:col-span-2 lg:min-h-[360px]">
              <div className="group h-full relative bg-white border border-orange-900/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-end hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
                {/* Ambient Animation: Sine Wave / Fluency representation */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] bg-brand/10 blur-[80px] rounded-full group-hover:scale-110 group-hover:bg-brand/15 transition-all duration-1000" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-app-muted">
                      Domain 1: Body Functions
                    </span>
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-app-text mb-3 tracking-tight group-hover:text-brand transition-colors duration-300">
                    Mastery
                  </h3>
                  <p className="text-[1.05rem] md:text-lg text-app-muted font-medium max-w-sm">
                    How freely the words come out — and how hard you work when they don't.
                  </p>
                </div>
              </div>
            </div>

            {/* EASE (Domain 2) - Col Span 1 */}
            <div className="shrink-0 w-full lg:w-auto snap-center lg:col-span-1 lg:min-h-[360px]">
              <div className="group h-full relative bg-white border border-orange-900/10 rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-end hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
                {/* Ambient Animation: Flowing Orb */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity duration-1000">
                  <div className="w-[200px] h-[200px] bg-purple-500/15 blur-[60px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-app-muted">
                      Domain 2: Activity
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-app-text mb-3 tracking-tight group-hover:text-purple-600 transition-colors duration-300">
                    Ease
                  </h3>
                  <p className="text-[1.05rem] md:text-lg text-app-muted font-medium">
                    How much effort it takes to get through a normal conversation.
                  </p>
                </div>
              </div>
            </div>

            {/* SOCIAL (Domain 3) - Col Span 1 */}
            <div className="shrink-0 w-full lg:w-auto snap-center lg:col-span-1 lg:min-h-[360px]">
              <div className="group h-full relative bg-white border border-orange-900/10 rounded-[2.5rem] p-8 md:p-10 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] flex flex-col justify-end hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500">
                {/* Ambient Animation: Intersecting Rings */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-1000">
                  <div className="w-[180px] h-[180px] bg-emerald-500/15 blur-[60px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-app-muted">
                      Domain 3: Participation
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-app-text mb-3 tracking-tight group-hover:text-emerald-600 transition-colors duration-300">
                    Social
                  </h3>
                  <p className="text-[1.05rem] md:text-lg text-app-muted font-medium">
                    How much of your social life you're actually living versus watching from the edge.
                  </p>
                </div>
              </div>
            </div>

            {/* CONTEXTUAL FACTORS (Domain 4) - Col Span 2, Containing 2 metrics */}
            <div className="shrink-0 w-full lg:w-auto snap-center lg:col-span-2 lg:min-h-[360px] flex flex-col">
              <div className="h-full bg-[#F7F2ED] border border-orange-900/5 rounded-[2.5rem] p-3 md:p-4 overflow-hidden shadow-[inset_0_4px_20px_rgba(0,0,0,0.02)] flex flex-col group/container">
                <div className="flex items-center gap-2 px-6 pt-5 pb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-app-muted">
                    Domain 4: Contextual Factors
                  </span>
                </div>

                {/* Inner Grid for Courage and Confidence */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-grow">
                  
                  {/* Courage */}
                  <div className="bg-white rounded-[2rem] p-6 md:p-10 flex flex-col justify-end shadow-sm border border-orange-900/5 group/inner relative overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/inner:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-black text-app-text mb-3 tracking-tight group-hover/inner:text-blue-600 transition-colors duration-300">
                        Courage
                      </h3>
                      <p className="text-[0.95rem] md:text-[1.05rem] text-app-muted font-medium leading-relaxed">
                        The phone calls you don't make. The introductions you skip. The situations you've quietly stopped walking into.
                      </p>
                    </div>
                  </div>

                  {/* Confidence */}
                  <div className="bg-white rounded-[2rem] p-6 md:p-10 flex flex-col justify-end shadow-sm border border-orange-900/5 group/inner relative overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover/inner:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10">
                      <h3 className="text-2xl md:text-3xl font-black text-app-text mb-3 tracking-tight group-hover/inner:text-blue-600 transition-colors duration-300">
                        Confidence
                      </h3>
                      <p className="text-[0.95rem] md:text-[1.05rem] text-app-muted font-medium leading-relaxed">
                        Whether your stutter still makes you feel ashamed, afraid, or less than — and whether that's starting to change.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
