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
                          <div id="rm-canvas-1" className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-brand to-[#D9692E] p-6 sm:p-8 md:p-12 flex flex-col justify-between transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] opacity-100 translate-y-0 scale-100 z-20 pointer-events-auto border border-orange-100/20 shadow-2xl">
                              <div className="absolute -right-4 md:-right-10 -bottom-10 md:-bottom-16 text-[15rem] md:text-[22rem] font-black text-white/10 leading-none select-none pointer-events-none z-0">1</div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute -left-10 md:left-10 top-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 text-white opacity-[0.05] -rotate-12 pointer-events-none z-0"><path d="M12 19v3"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><rect x="9" y="2" width="6" height="13" rx="3"></rect></svg>
                              
                              <div className="absolute inset-x-0 bottom-0 flex justify-center translate-y-[45%] pointer-events-none">
                                  <RoadmapMockup phase={1} status="live" />
                              </div>
                              
                              <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-lg w-fit mb-auto">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                                  Live &amp; Available
                              </div>

                              <div className="relative z-10">
                                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05]">A clinical-grade<br />sandbox.</h3>
                              </div>
                          </div>
      
                          {/*  Canvas 2  */}
                          <div id="rm-canvas-2" className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-purple-500 to-purple-800 p-6 sm:p-8 md:p-12 flex flex-col justify-between transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] opacity-0 translate-y-16 scale-95 z-0 pointer-events-none border border-purple-100/20 shadow-2xl">
                              <div className="absolute -right-4 md:-right-10 -bottom-10 md:-bottom-16 text-[15rem] md:text-[22rem] font-black text-white/10 leading-none select-none pointer-events-none z-0">2</div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute -left-10 md:left-10 top-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 text-white opacity-[0.05] -rotate-12 pointer-events-none z-0"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle></svg>

                              <div className="absolute inset-x-0 bottom-0 flex justify-center translate-y-[45%] pointer-events-none">
                                  <RoadmapMockup phase={2} status="building" comingSoon={true} />
                              </div>
                              
                              <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-lg w-fit mb-auto">
                                  <span className="relative flex h-1.5 w-1.5">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                                  </span>
                                  Active Development
                              </div>

                              <div className="relative z-10">
                                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05]">You never<br />walk alone.</h3>
                              </div>
                          </div>
      
                          {/*  Canvas 3  */}
                          <div id="rm-canvas-3" className="absolute inset-0 overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br from-emerald-500 to-emerald-800 p-6 sm:p-8 md:p-12 flex flex-col justify-between transition-all duration-[1100ms] ease-[cubic-bezier(0.4,0,0.2,1)] opacity-0 translate-y-16 scale-95 z-0 pointer-events-none border border-emerald-100/20 shadow-2xl">
                              <div className="absolute -right-4 md:-right-10 -bottom-10 md:-bottom-16 text-[15rem] md:text-[22rem] font-black text-white/10 leading-none select-none pointer-events-none z-0">3</div>
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute -left-10 md:left-10 top-1/2 -translate-y-1/2 w-48 h-48 md:w-80 md:h-80 text-white opacity-[0.05] -rotate-12 pointer-events-none z-0"><path d="M11 2v2"></path><path d="M5 2v2"></path><path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path><path d="M8 15a6 6 0 0 0 12 0v-3"></path><circle cx="20" cy="10" r="2"></circle></svg>

                              <div className="absolute inset-x-0 bottom-0 flex justify-center translate-y-[45%] pointer-events-none">
                                  <RoadmapMockup phase={3} status="future" comingSoon={true} />
                              </div>
                              
                              <div className="relative z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-lg w-fit mb-auto">
                                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                                  On the Horizon
                              </div>

                              <div className="relative z-10">
                                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.05]">Professional<br />care.</h3>
                              </div>
                          </div>
      
                      </div>
                  </div>
              </div>
          </section>
    </>
  );
}
