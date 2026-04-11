import React from 'react';

export default function Simulator() {
  return (
    <>
      <section className="relative z-10 bg-[#FFFAF5] overflow-hidden flex flex-col justify-center min-h-[85vh] md:min-h-screen py-8 md:py-12">
              
              {/*  EXPERIMENTAL STYLES ONLY FOR THIS SECTION  */}
              <style dangerouslySetInnerHTML={{ __html: `
                  .magnetic-btn {
                      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), background-color 0.5s, color 0.5s, box-shadow 0.5s;
                  }
                  .tilt-card {
                      transition: transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                      transform-style: preserve-3d;
                      will-change: transform;
                  }
                  .tilt-inner {
                      transform: translateZ(0px);
                      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                      transform-style: preserve-3d;
                  }
                  .tilt-card:hover .tilt-inner {
                      transform: translateZ(30px);
                  }
                  .tilt-card:hover .tilt-floating-element {
                      transform: translateZ(50px) scale(1.02);
                  }
                  .tilt-floating-element {
                      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                  }
                  .stage-grid-glow {
                      mask-image: radial-gradient(350px circle at var(--stage-mouse-x, 50%) var(--stage-mouse-y, 50%), black 15%, transparent 100%);
                      -webkit-mask-image: radial-gradient(350px circle at var(--stage-mouse-x, 50%) var(--stage-mouse-y, 50%), black 15%, transparent 100%);
                      opacity: 0;
                      transition: opacity 0.5s ease;
                  }
                  #simulator-stage:hover .stage-grid-glow {
                      opacity: 1;
                  }
                  @keyframes text-glitch {
                      0% { transform: translate(0) skew(0) }
                      20% { transform: translate(-3px, 1px) skew(-5deg) }
                      40% { transform: translate(-1px, -2px) skew(5deg) }
                      60% { transform: translate(3px, 1px) skew(0) }
                      80% { transform: translate(1px, -1px) skew(-2deg) }
                      100% { transform: translate(0) skew(0) }
                  }
                  .animate-glitch {
                      animation: text-glitch 0.4s cubic-bezier(.25, .46, .45, .94) both;
                  }
                  .pointer-none-children * {
                      pointer-events: none;
                  }
                  
                  /* Enhanced Card Interaction Styles */
                  @keyframes scanline {
                      0% { transform: translateY(-170px); }
                      100% { transform: translateY(170px); }
                  }
                  @keyframes shimmer {
                      100% { transform: translateX(100%); }
                  }
                  .card-watermark {
                      transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease;
                      will-change: transform, opacity;
                  }
                  .tilt-card:hover .card-watermark {
                      transform: scale(1.5) rotate(-10deg) translateZ(40px) translateX(-15px) translateY(-15px);
                      opacity: 0.15;
                  }
      
                  /* New Cinematic Sticker Animation Styles */
                  @keyframes sticker-fly-in {
                      0% {
                          opacity: 0;
                          transform: translateX(150px) translateY(30px) rotate(15deg) scale(1.1);
                          filter: blur(12px);
                      }
                      100% {
                          opacity: 1;
                          transform: translateX(0) translateY(0) rotate(0deg) scale(1);
                          filter: blur(0);
                      }
                  }
                  .reveal.active .sticker-animate-in {
                      animation: sticker-fly-in 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards;
                      opacity: 0;
                  }
                  @keyframes sticker-float {
                      0%, 100% { transform: translateY(0px) rotate(2deg); }
                      50% { transform: translateY(-15px) rotate(-1deg); }
                  }
                  .sticker-float {
                      animation: sticker-float 6s ease-in-out infinite;
                      transform-origin: center right;
                      will-change: transform;
                  }
                  .magnetic-sticker {
                      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                      will-change: transform;
                  }
              ` }} />
      
              <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center">
                  
                  <div className="text-center mb-6 md:mb-8 reveal active">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-black/5 text-app-text text-[9px] font-black uppercase tracking-[0.2em] mb-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
                          The Adversarial Simulator
                      </div>
                      <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-none text-app-text">BRIDGING THE GAP.</h3>
                  </div>
      
                  <div className="w-full max-w-6xl flex flex-col items-center gap-6">
                      {/*  Toggles  */}
                      <div className="flex justify-center z-30">
                          <div className="bg-white/70 backdrop-blur-3xl border border-white/60 p-1.5 rounded-full shadow-lg flex items-center gap-1 overflow-x-auto hide-scrollbar">
                              <button id="sim-btn-1" onClick={() => {(window as any).activateSimulator(1)}} className="magnetic-btn pointer-none-children group flex items-center gap-3 px-6 py-2.5 rounded-full transition-all duration-500 bg-app-text text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] whitespace-nowrap outline-none cursor-pointer">
                                  <div id="sim-icon-1" className="text-brand transition-colors"><i data-lucide="coffee" className="w-4 h-4"></i></div>
                                  <h4 className="text-xs font-bold tracking-wide">The Café Order</h4>
                              </button>
                              <button id="sim-btn-2" onClick={() => {(window as any).activateSimulator(2)}} className="magnetic-btn pointer-none-children group flex items-center gap-3 px-6 py-2.5 rounded-full transition-all duration-500 bg-transparent text-app-muted hover:bg-black/5 whitespace-nowrap outline-none cursor-pointer">
                                  <div id="sim-icon-2" className="transition-colors group-hover:text-purple-500"><i data-lucide="phone-call" className="w-4 h-4"></i></div>
                                  <h4 className="text-xs font-bold tracking-wide">High-Pressure Call</h4>
                              </button>
                              <button id="sim-btn-3" onClick={() => {(window as any).activateSimulator(3)}} className="magnetic-btn pointer-none-children group flex items-center gap-3 px-6 py-2.5 rounded-full transition-all duration-500 bg-transparent text-app-muted hover:bg-black/5 whitespace-nowrap outline-none cursor-pointer">
                                  <div id="sim-icon-3" className="transition-colors group-hover:text-emerald-500"><i data-lucide="briefcase" className="w-4 h-4"></i></div>
                                  <h4 className="text-xs font-bold tracking-wide">Pro Interview</h4>
                              </button>
                          </div>
                      </div>
      
                      {/*  Unified Viewport  */}
                      <div className="w-full relative">
                          
                          {/*  THE STICKER: OVERFLOW OFF RIGHT SIDE (Fixed scaling for MacBook)  */}
                          <div className="absolute -right-4 md:-right-8 lg:-right-16 top-1/2 -translate-y-[55%] z-40 pointer-events-none sticker-animate-in">
                              <div className="sticker-float pointer-events-auto">
                                  <div className="magnetic-sticker flex flex-col items-end origin-right cursor-grab">
                                      <div className="bg-brand text-white px-6 md:px-8 py-3 md:py-5 text-[clamp(2.2rem,5vw,5.5rem)] font-black tracking-tightest leading-none -rotate-3 shadow-2xl border border-white/10 relative z-20">
                                          OVER 1,000+
                                      </div>
                                      <div className="flex items-start -mt-2 md:-mt-4 transform translate-x-4">
                                          <div className="bg-white text-app-text px-6 md:px-8 py-3 md:py-5 text-[clamp(2.2rem,5vw,5.5rem)] font-black tracking-tightest leading-none rotate-2 shadow-2xl border border-black/5">
                                              SCENARIOS
                                          </div>
                                          <span className="text-4xl md:text-7xl text-brand ml-2 font-black drop-shadow-lg">*</span>
                                      </div>
                                      <div className="mt-8 md:mt-10 mr-6 md:mr-12 border border-white/5 bg-[#0a0a0a]/95 backdrop-blur-xl rounded-xl px-5 py-3 flex items-center gap-3 shadow-2xl">
                                          <span className="text-brand text-xl font-black leading-none">*</span>
                                          <p className="text-white/60 font-mono text-[9px] md:text-[10px] tracking-[0.25em] uppercase font-bold leading-relaxed">Curated continuously by expert therapists.</p>
                                      </div>
                                  </div>
                              </div>
                          </div>
      
                          {/*  Stage Viewport: Strictly constrained height  */}
                          <div id="simulator-stage" className="relative w-full h-[480px] md:h-[440px] lg:h-[420px] bg-[#080808] rounded-[2.5rem] shadow-2xl ring-1 ring-white/10 overflow-hidden cursor-crosshair">
                              {/*  Standard Subtle Grid  */}
                              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
                              {/*  Mouse Tracking Holographic Grid Glow  */}
                              <div className="stage-grid-glow absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"></div>
      
                              {/*  STAGE VIEW 1: CAFE  */}
                              <div id="sim-view-1" className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 transition-all duration-[800ms] opacity-100 translate-y-0 scale-100 z-20 pointer-events-none">
                                  <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-brand/10 blur-[120px] rounded-full pointer-events-none"></div>
                                  
                                  <div className="max-w-[50%] relative z-10 animate-glitch pointer-events-auto">
                                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand/10 border border-brand/20 text-brand-100 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-ping"></span> Live Simulation
                                      </div>
                                      <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-3">The Café Order</h3>
                                      <p className="text-white/60 text-sm md:text-base leading-relaxed">Navigating the ambient noise and rapid exchanges of a busy service environment.</p>
                                  </div>
      
                                  <div className="relative z-10 flex justify-start mt-auto max-w-[50%] transform md:-translate-x-4 pointer-events-auto perspective-[1000px]">
                                      <div className="tilt-card w-full md:w-[480px] h-[170px] bg-gradient-to-br from-brand/80 to-[#D9692E]/80 p-[1px] rounded-3xl group/obj shadow-[0_20px_50px_-10px_rgba(242,128,68,0.3)] relative">
                                          
                                          {/*  Interactive Mouse Border Glow Overlay  */}
                                          <div className="absolute inset-0 opacity-0 group-hover/obj:opacity-100 transition-opacity duration-500 rounded-3xl z-0 mix-blend-screen pointer-events-none" style={{ background: 'radial-gradient(300px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(242, 128, 68, 0.6), transparent 40%)' }}></div>
      
                                          <div className="tilt-inner bg-[#121212]/95 backdrop-blur-2xl rounded-[23px] p-6 absolute inset-[1px] flex flex-col justify-between overflow-hidden z-10">
                                              
                                              {/*  Massive 3D Watermark  */}
                                              <i data-lucide="coffee" className="absolute -right-2 -bottom-6 w-36 h-36 text-brand opacity-[0.03] card-watermark pointer-events-none"></i>
                                              
                                              {/*  Sweeping Laser Scanline  */}
                                              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/obj:opacity-100 transition-opacity duration-500">
                                                  <div className="w-full h-[1px] bg-brand/50 shadow-[0_0_15px_#F28044] absolute top-0 left-0 animate-[scanline_2s_linear_infinite]"></div>
                                              </div>
      
                                              <div className="flex justify-end items-start relative z-10 tilt-floating-element">
                                                  <span className="text-brand font-mono text-[9px] uppercase tracking-widest bg-brand/10 px-2.5 py-1 rounded-full border border-brand/20 shadow-[0_0_10px_rgba(242,128,68,0.1)] group-hover/obj:bg-brand/20 group-hover/obj:border-brand/40 transition-all duration-300">SCN-01-A</span>
                                              </div>
                                              
                                              <div className="relative z-10 tilt-floating-element">
                                                  <h4 className="text-white/50 text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
                                                      <span className="w-1 h-1 rounded-full bg-brand/30 group-hover/obj:bg-brand group-hover/obj:animate-ping"></span>
                                                      Primary Objective
                                                  </h4>
                                                  <p className="text-white text-base md:text-lg font-medium leading-relaxed flex items-center flex-wrap gap-x-1">
                                                      Execute 
                                                      <strong className="relative inline-flex items-center justify-center px-3 py-0.5 bg-brand/10 border border-brand/30 rounded-lg overflow-hidden transition-all duration-500 group-hover/obj:border-brand/60 group-hover/obj:shadow-[0_0_15px_rgba(242,128,68,0.3)] group-hover/obj:scale-105 mx-1">
                                                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/obj:animate-[shimmer_1.5s_infinite]"></span>
                                                          <span className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-brand-100 tracking-wide relative z-10">Easy Onset</span>
                                                      </strong> 
                                                      under active pressure.
                                                  </p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
      
                              {/*  STAGE VIEW 2  */}
                              <div id="sim-view-2" className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 transition-all duration-[800ms] opacity-0 translate-y-16 scale-95 z-0 pointer-events-none">
                                  <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                                  <div className="max-w-[50%] relative z-10 pointer-events-auto">
                                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                          <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span> Live Simulation
                                      </div>
                                      <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-3">High-Pressure Call</h3>
                                      <p className="text-white/60 text-sm md:text-base leading-relaxed">Navigate an impatient listener when visual feedback is absent.</p>
                                  </div>
                                  <div className="relative z-10 flex justify-start mt-auto max-w-[50%] transform md:-translate-x-4 pointer-events-auto perspective-[1000px]">
                                      <div className="tilt-card w-full md:w-[480px] h-[170px] bg-gradient-to-br from-purple-600/80 to-[#4C1D95]/80 p-[1px] rounded-3xl group/obj shadow-[0_20px_50px_-10px_rgba(168,85,247,0.3)] relative">
                                          
                                          {/*  Interactive Mouse Border Glow Overlay  */}
                                          <div className="absolute inset-0 opacity-0 group-hover/obj:opacity-100 transition-opacity duration-500 rounded-3xl z-0 mix-blend-screen pointer-events-none" style={{ background: 'radial-gradient(300px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(168, 85, 247, 0.6), transparent 40%)' }}></div>
      
                                          <div className="tilt-inner bg-[#121212]/95 backdrop-blur-2xl rounded-[23px] p-6 absolute inset-[1px] flex flex-col justify-between overflow-hidden z-10">
                                              
                                              {/*  Massive 3D Watermark  */}
                                              <i data-lucide="phone-call" className="absolute -right-2 -bottom-6 w-36 h-36 text-purple-500 opacity-[0.03] card-watermark pointer-events-none"></i>
                                              
                                              {/*  Sweeping Laser Scanline  */}
                                              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/obj:opacity-100 transition-opacity duration-500">
                                                  <div className="w-full h-[1px] bg-purple-500/50 shadow-[0_0_15px_#A855F7] absolute top-0 left-0 animate-[scanline_2s_linear_infinite]"></div>
                                              </div>
      
                                              <div className="flex justify-end items-start relative z-10 tilt-floating-element">
                                                  <span className="text-purple-400 font-mono text-[9px] uppercase tracking-widest bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 shadow-[0_0_10px_rgba(168,85,247,0.1)] group-hover/obj:bg-purple-500/20 group-hover/obj:border-purple-500/40 transition-all duration-300">SCN-02-B</span>
                                              </div>
                                              
                                              <div className="relative z-10 tilt-floating-element">
                                                  <h4 className="text-white/50 text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
                                                      <span className="w-1 h-1 rounded-full bg-purple-500/30 group-hover/obj:bg-purple-500 group-hover/obj:animate-ping"></span>
                                                      Primary Objective
                                                  </h4>
                                                  <p className="text-white text-base md:text-lg font-medium leading-relaxed flex items-center flex-wrap gap-x-1">
                                                      Practice boundaries and 
                                                      <strong className="relative inline-flex items-center justify-center px-3 py-0.5 bg-purple-500/10 border border-purple-500/30 rounded-lg overflow-hidden transition-all duration-500 group-hover/obj:border-purple-500/60 group-hover/obj:shadow-[0_0_15px_rgba(168,85,247,0.3)] group-hover/obj:scale-105 mx-1">
                                                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/obj:animate-[shimmer_1.5s_infinite]"></span>
                                                          <span className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-200 relative z-10">Advertise</span>
                                                      </strong> 
                                                      your patterns.
                                                  </p>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
      
                              {/*  STAGE VIEW 3  */}
                              <div id="sim-view-3" className="absolute inset-0 flex flex-col justify-between p-8 md:p-10 transition-all duration-[800ms] opacity-0 translate-y-16 scale-95 z-0 pointer-events-none">
                                  <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                                  <div className="max-w-[50%] relative z-10 pointer-events-auto">
                                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span> Live Simulation
                                      </div>
                                      <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-3">Pro Interview</h3>
                                      <p className="text-white/60 text-sm md:text-base leading-relaxed">A formal Q&A targeting high-stakes conversations.</p>
                                  </div>
                                  <div className="relative z-10 flex justify-start mt-auto max-w-[50%] transform md:-translate-x-4 pointer-events-auto perspective-[1000px]">
                                      <div className="tilt-card w-full md:w-[480px] h-[170px] bg-gradient-to-br from-emerald-500/80 to-[#047857]/80 p-[1px] rounded-3xl group/obj shadow-[0_20px_50px_-10px_rgba(16,185,129,0.3)] relative">
                                          
                                          {/*  Interactive Mouse Border Glow Overlay  */}
                                          <div className="absolute inset-0 opacity-0 group-hover/obj:opacity-100 transition-opacity duration-500 rounded-3xl z-0 mix-blend-screen pointer-events-none" style={{ background: 'radial-gradient(300px circle at var(--card-mouse-x, 50%) var(--card-mouse-y, 50%), rgba(16, 185, 129, 0.6), transparent 40%)' }}></div>
      
                                          <div className="tilt-inner bg-[#121212]/95 backdrop-blur-2xl rounded-[23px] p-6 absolute inset-[1px] flex flex-col justify-between overflow-hidden z-10">
                                              
                                              {/*  Massive 3D Watermark  */}
                                              <i data-lucide="briefcase" className="absolute -right-2 -bottom-6 w-36 h-36 text-emerald-500 opacity-[0.03] card-watermark pointer-events-none"></i>
                                              
                                              {/*  Sweeping Laser Scanline  */}
                                              <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/obj:opacity-100 transition-opacity duration-500">
                                                  <div className="w-full h-[1px] bg-emerald-500/50 shadow-[0_0_15px_#10B981] absolute top-0 left-0 animate-[scanline_2s_linear_infinite]"></div>
                                              </div>
      
                                              <div className="flex justify-end items-start relative z-10 tilt-floating-element">
                                                  <span className="text-emerald-400 font-mono text-[9px] uppercase tracking-widest bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.1)] group-hover/obj:bg-emerald-500/20 group-hover/obj:border-emerald-500/40 transition-all duration-300">SCN-03-C</span>
                                              </div>
                                              
                                              <div className="relative z-10 tilt-floating-element">
                                                  <h4 className="text-white/50 text-[9px] font-black uppercase tracking-[0.2em] mb-1.5 flex items-center gap-2">
                                                      <span className="w-1 h-1 rounded-full bg-emerald-500/30 group-hover/obj:bg-emerald-500 group-hover/obj:animate-ping"></span>
                                                      Primary Objective
                                                  </h4>
                                                  <p className="text-white text-base md:text-lg font-medium leading-relaxed flex items-center flex-wrap gap-x-1">
                                                      Maintain 
                                                      <strong className="relative inline-flex items-center justify-center px-3 py-0.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg overflow-hidden transition-all duration-500 group-hover/obj:border-emerald-500/60 group-hover/obj:shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover/obj:scale-105 mx-1">
                                                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/obj:animate-[shimmer_1.5s_infinite]"></span>
                                                          <span className="font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-emerald-200 relative z-10">Authority</span>
                                                      </strong> 
                                                      during blocks.
                                                  </p>
                                              </div>
                                          </div>
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
