import React from 'react';
import RoadmapMockup from './RoadmapMockup';

export default function Roadmap() {
  return (
    <>
      <section id="roadmap" className="py-20 md:py-32 relative z-10 bg-[#FFFAF5] overflow-hidden font-sans">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                  
                  <div className="mb-12 md:mb-16 reveal text-center lg:text-left active">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/5 shadow-sm text-app-text text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
                          Master Plan
                      </div>
                      <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5rem] font-black tracking-tighter leading-[0.95] text-app-text">
                          THE SPEECHWORKS<br />ROADMAP.
                      </h3>
                  </div>
                      
                  <div className="flex flex-col lg:flex-row gap-10 md:gap-16 items-stretch reveal reveal-delay-1 active">
                      
                      {/*  Left: Editorial Typography Menu  */}
                      <div className="w-full lg:w-5/12 relative pl-6 md:pl-10 border-l-2 border-black/[0.04] flex flex-col gap-6 md:gap-10 lg:self-center">
                          
                          {/*  Nav 1  */}
                          <button onClick={() => {(window as any).switchRoadmap(1)}} id="rm-btn-1" className="text-left group outline-none w-full opacity-100 transition-opacity duration-300 relative cursor-pointer">
                              <div id="rm-line-1" className="absolute left-[-27px] md:left-[-43px] -top-[2px] -bottom-[2px] w-[4px] bg-brand transition-all duration-500 opacity-100 scale-y-100 origin-top"></div>
                              
                              <span id="rm-label-1" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2 block text-brand transition-colors duration-300">01 / We Built</span>
                              <h4 id="rm-title-1" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-app-text transition-all duration-500">Forging the Tools</h4>
                              <div id="rm-desc-1" className="overflow-hidden transition-all duration-500 opacity-100 mt-2 md:mt-4" style={{ maxHeight: '200px' }}>
                                  <p className="text-app-muted font-medium leading-relaxed pr-2 md:pr-4 text-sm md:text-base">A clinical-grade sandbox. Live and available now. We have built an AI-driven app that provides a safe environment for you to practice real-world scenarios and build confidence at your own pace.</p>
                              </div>
                          </button>
      
                          {/*  Nav 2  */}
                          <button onClick={() => {(window as any).switchRoadmap(2)}} id="rm-btn-2" className="text-left group outline-none w-full opacity-50 hover:opacity-100 transition-opacity duration-300 relative cursor-pointer">
                              <div id="rm-line-2" className="absolute left-[-27px] md:left-[-43px] -top-[2px] -bottom-[2px] w-[4px] bg-transparent transition-all duration-500 opacity-0 scale-y-0 origin-top"></div>
                              
                              <span id="rm-label-2" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2 block text-app-muted transition-colors duration-300">02 / We Are Building</span>
                              <h4 id="rm-title-2" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(63,51,45,0.3)] group-hover:[-webkit-text-stroke:1px_rgba(63,51,45,0.7)] transition-all duration-500">Uniting the Community</h4>
                              <div id="rm-desc-2" className="overflow-hidden transition-all duration-500 opacity-0 mt-0" style={{ maxHeight: '0px' }}>
                                  <p className="text-app-muted font-medium leading-relaxed pr-2 md:pr-4 text-sm md:text-base">We are actively building a unified community space where users can share their experiences, celebrate victories, and find support from others who truly understand.</p>
                              </div>
                          </button>
      
                          {/*  Nav 3  */}
                          <button onClick={() => {(window as any).switchRoadmap(3)}} id="rm-btn-3" className="text-left group outline-none w-full opacity-50 hover:opacity-100 transition-opacity duration-300 relative cursor-pointer">
                              <div id="rm-line-3" className="absolute left-[-27px] md:left-[-43px] -top-[2px] -bottom-[2px] w-[4px] bg-transparent transition-all duration-500 opacity-0 scale-y-0 origin-top"></div>
                              
                              <span id="rm-label-3" className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2 block text-app-muted transition-colors duration-300">03 / We Will Build</span>
                              <h4 id="rm-title-3" className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(63,51,45,0.3)] group-hover:[-webkit-text-stroke:1px_rgba(63,51,45,0.7)] transition-all duration-500">Bridging the Gap</h4>
                              <div id="rm-desc-3" className="overflow-hidden transition-all duration-500 opacity-0 mt-0" style={{ maxHeight: '0px' }}>
                                  <p className="text-app-muted font-medium leading-relaxed pr-2 md:pr-4 text-sm md:text-base">Bridging the gap between practice and professional therapy. Connect seamlessly with vetted Speech-Language Pathologists through a built-in portal.</p>
                              </div>
                          </button>
                      </div>
      
                      {/*  Right: The Glassmorphic Stage  */}
                      <div className="w-full lg:w-7/12 relative h-[350px] sm:h-[400px] lg:h-[550px] mt-6 lg:mt-0">
                          
                          {/*  Canvas 1  */}
                          <div id="rm-canvas-1" className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-brand to-[#D9692E] p-6 sm:p-8 md:p-12 transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] opacity-100 translate-y-0 scale-100 z-20 pointer-events-auto border border-orange-100/20 shadow-2xl">
                              
                              {/* Experimental Blueprint Number - Strictly Bounded */}
                              <div className="absolute left-0 bottom-0 translate-y-[20%] -translate-x-[5%] text-[15rem] md:text-[30rem] font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.2)] leading-[0.75] select-none pointer-events-none z-0 overflow-hidden w-1/2">01</div>
                               
                              {/* Technical Metadata */}
                              <div className="absolute top-6 left-6 md:top-8 md:left-10 text-[8px] md:text-[9px] font-mono text-white/50 tracking-widest uppercase z-10 select-none hidden md:block">
                                  // SYS.PHASE_01 <br/>
                                  // STATUS :: DEPLOYED
                              </div>

                              {/* Vertical Grid Line */}
                              <div className="absolute top-0 bottom-0 left-[55%] w-px bg-white/10 hidden md:block z-10 mix-blend-overlay"></div>

                              <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between h-full w-full">
                                  {/* Left: Strictly Bounded Typography Lane */}
                                  <div className="w-full md:w-[45%] flex flex-col justify-start md:justify-center h-full relative z-30">
                                      <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] w-fit mb-4 md:mb-8">
                                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                                          Live &amp; Available
                                      </div>

                                      <div className="relative z-10 max-w-[240px] lg:max-w-[300px]">
                                          <h3 className="text-4xl md:text-[2.5rem] lg:text-[3.5rem] text-white tracking-tighter leading-[0.85] flex flex-col items-start gap-0">
                                              <span className="font-black drop-shadow-md uppercase">A Clinical</span>
                                              <span className="font-black drop-shadow-md uppercase mt-0 md:-mt-1">Grade</span>
                                              <span className="font-serif italic font-light text-white/90 drop-shadow-sm mt-1 md:mt-2 tracking-normal">sandbox.</span>
                                          </h3>
                                      </div>
                                  </div>

                                  {/* Right: Flat Realistic Phone Anchor */}
                                  <div className="absolute right-[0%] md:right-[2%] bottom-0 w-[80%] md:w-[60%] h-full flex justify-end items-center pointer-events-none z-20">
                                      {/* Scale Wrapper to fit Hero Phone (325x660) in Card (550px) */}
                                      <div className="relative transform scale-[0.75] xl:scale-[0.8] origin-right transition-transform duration-700">
                                          {/* Drop shadow on the flat phone */}
                                          <div className="absolute inset-0 bg-black/40 blur-[40px] rounded-[3.5rem] scale-95 translate-y-8 translate-x-4" />
                                          <RoadmapMockup phase={1} status="live" />
                                      </div>
                                  </div>
                              </div>
                          </div>
      
                          {/*  Canvas 2  */}
                          <div id="rm-canvas-2" className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-purple-500 to-purple-800 p-6 sm:p-8 md:p-12 transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] opacity-0 translate-y-16 scale-95 z-0 pointer-events-none border border-purple-100/20 shadow-2xl">
                              
                              {/* Experimental Blueprint Number - Strictly Bounded */}
                              <div className="absolute left-0 bottom-0 translate-y-[20%] -translate-x-[5%] text-[15rem] md:text-[30rem] font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.2)] leading-[0.75] select-none pointer-events-none z-0 overflow-hidden w-1/2">02</div>
                               
                              {/* Technical Metadata */}
                              <div className="absolute top-6 left-6 md:top-8 md:left-10 text-[8px] md:text-[9px] font-mono text-white/50 tracking-widest uppercase z-10 select-none hidden md:block">
                                  // SYS.PHASE_02 <br/>
                                  // STATUS :: BUILDING
                              </div>

                              {/* Vertical Grid Line */}
                              <div className="absolute top-0 bottom-0 left-[55%] w-px bg-white/10 hidden md:block z-10 mix-blend-overlay"></div>

                              <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between h-full w-full">
                                  {/* Left: Strictly Bounded Typography Lane */}
                                  <div className="w-full md:w-[45%] flex flex-col justify-start md:justify-center h-full relative z-30">
                                      <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] w-fit mb-4 md:mb-8">
                                          <span className="relative flex h-1.5 w-1.5">
                                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                                          </span>
                                          Active Development
                                      </div>

                                      <div className="relative z-10 max-w-[240px] lg:max-w-[300px]">
                                          <h3 className="text-4xl md:text-[2.5rem] lg:text-[3.5rem] text-white tracking-tighter leading-[0.85] flex flex-col items-start gap-0">
                                              <span className="font-black drop-shadow-md uppercase">Stronger</span>
                                              <span className="font-serif italic font-light text-white/90 drop-shadow-sm mt-1 md:mt-2 tracking-normal">together.</span>
                                          </h3>
                                      </div>
                                  </div>

                                  {/* Right: Flat Realistic Phone Anchor */}
                                  <div className="absolute right-[0%] md:right-[2%] bottom-0 w-[80%] md:w-[60%] h-full flex justify-end items-center pointer-events-none z-20">
                                      <div className="relative transform scale-[0.75] xl:scale-[0.8] origin-right transition-transform duration-700">
                                          <div className="absolute inset-0 bg-black/40 blur-[40px] rounded-[3.5rem] scale-95 translate-y-8 translate-x-4" />
                                          <RoadmapMockup phase={2} status="building" comingSoon={true} />
                                      </div>
                                  </div>
                              </div>
                          </div>
      
                          {/*  Canvas 3  */}
                          <div id="rm-canvas-3" className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-emerald-800 p-6 sm:p-8 md:p-12 transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] opacity-0 translate-y-16 scale-95 z-0 pointer-events-none border border-emerald-100/20 shadow-2xl">
                              
                              {/* Experimental Blueprint Number - Strictly Bounded */}
                              <div className="absolute left-0 bottom-0 translate-y-[20%] -translate-x-[5%] text-[15rem] md:text-[30rem] font-black text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.2)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.2)] leading-[0.75] select-none pointer-events-none z-0 overflow-hidden w-1/2">03</div>
                               
                              {/* Technical Metadata */}
                              <div className="absolute top-6 left-6 md:top-8 md:left-10 text-[8px] md:text-[9px] font-mono text-white/50 tracking-widest uppercase z-10 select-none hidden md:block">
                                  // SYS.PHASE_03 <br/>
                                  // STATUS :: HORIZON
                              </div>

                              {/* Vertical Grid Line */}
                              <div className="absolute top-0 bottom-0 left-[55%] w-px bg-white/10 hidden md:block z-10 mix-blend-overlay"></div>

                              <div className="relative z-20 flex flex-col md:flex-row md:items-center justify-between h-full w-full">
                                  {/* Left: Strictly Bounded Typography Lane */}
                                  <div className="w-full md:w-[45%] flex flex-col justify-start md:justify-center h-full relative z-30">
                                      <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] w-fit mb-4 md:mb-8">
                                          <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                                          On the Horizon
                                      </div>

                                      <div className="relative z-10 max-w-[240px] lg:max-w-[300px]">
                                          <h3 className="text-4xl md:text-[2.5rem] lg:text-[3.5rem] text-white tracking-tighter leading-[0.85] flex flex-col items-start gap-0">
                                              <span className="font-black drop-shadow-md uppercase">Expert</span>
                                              <span className="font-serif italic font-light text-white/90 drop-shadow-sm mt-1 md:mt-2 tracking-normal">guidance.</span>
                                          </h3>
                                      </div>
                                  </div>

                                  {/* Right: Flat Realistic Phone Anchor */}
                                  <div className="absolute right-[0%] md:right-[2%] bottom-0 w-[80%] md:w-[60%] h-full flex justify-end items-center pointer-events-none z-20">
                                      <div className="relative transform scale-[0.75] xl:scale-[0.8] origin-right transition-transform duration-700">
                                          <div className="absolute inset-0 bg-black/40 blur-[40px] rounded-[3.5rem] scale-95 translate-y-8 translate-x-4" />
                                          <RoadmapMockup phase={3} status="future" comingSoon={true} />
                                      </div>
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
