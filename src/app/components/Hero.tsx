import React from 'react';
import LiveAppMockup from './LiveAppMockup';

const HERO_FAN_SCREEN_KEYFRAMES = `
  @keyframes hero-fan-screen {
    0%, 100% {
      transform: translate3d(-36px, 42px, -40px) rotate(-9deg) scale(0.96);
      opacity: 0.82;
    }
    50% {
      transform: translate3d(-108px, 18px, -40px) rotate(-18deg) scale(0.99);
      opacity: 0.98;
    }
  }
`;

export default function Hero() {
  return (
    <>
      {/*  EXPERIMENTAL HERO SECTION: Dark Mode Cinematic Entrance  */}
          <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-28 md:pt-32 pb-16 md:pb-20 z-10 bg-[#0A0705] overflow-hidden">
              <style>{HERO_FAN_SCREEN_KEYFRAMES}</style>
              
              {/*  Fascinating Background: Floating Gradient Orbs & Kinetic Text  */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/*  Glowing Orbs  */}
                  <div className="absolute top-[-5%] right-[-5%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-brand/30 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse"></div>
                  <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] md:w-[30vw] h-[50vw] md:h-[30vw] bg-purple-600/20 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
                  
                  {/*  Diagonal Kinetic Typography  */}
                  <div className="absolute inset-0 flex flex-col justify-center opacity-[0.04] md:opacity-[0.03] -rotate-6 scale-110 md:scale-125">
                      <div className="marquee-container w-full mb-2 md:mb-4">
                          <div className="marquee-content flex items-center gap-4 md:gap-8 text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none text-white" style={{ animationDuration: '30s' }}>
                              <span>CHANGE THE CONVERSATION</span><span>CHANGE THE CONVERSATION</span>
                          </div>
                          <div className="marquee-content flex items-center gap-4 md:gap-8 text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none text-white" style={{ animationDuration: '30s' }} aria-hidden="true">
                              <span>CHANGE THE CONVERSATION</span><span>CHANGE THE CONVERSATION</span>
                          </div>
                      </div>
                      <div className="marquee-container w-full">
                          <div className="marquee-content flex items-center gap-4 md:gap-8 text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none text-transparent" style={{ WebkitTextStroke: '2px white', animationDuration: '40s', animationDirection: 'reverse' }}>
                              <span>SPEAK ON YOUR TERMS</span><span>SPEAK ON YOUR TERMS</span>
                          </div>
                          <div className="marquee-content flex items-center gap-4 md:gap-8 text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none text-transparent" style={{ WebkitTextStroke: '2px white', animationDuration: '40s', animationDirection: 'reverse' }} aria-hidden="true">
                              <span>SPEAK ON YOUR TERMS</span><span>SPEAK ON YOUR TERMS</span>
                          </div>
                      </div>
                  </div>
              </div>
      
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10">
                  <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
                      
                      {/*  Left Content  */}
                      <div className="lg:col-span-8 reveal active">
                          <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-brand-100 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6 md:mb-8">
                              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand animate-ping absolute"></span>
                              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand relative z-10 shadow-[0_0_10px_#F28044]"></span>
                              A Movement For Every Voice
                          </div>
                          
                          <div className="mb-6 md:mb-10 flex flex-col gap-1 md:gap-3 relative">
                              <div className="text-[12vw] sm:text-[10vw] lg:text-[4.5rem] xl:text-[5.5rem] font-black tracking-tighter leading-none text-transparent select-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>
                                  CHANGE THE
                              </div>
                              <h1 className="text-[13vw] sm:text-[11vw] lg:text-[5.5rem] xl:text-[6.5rem] font-black tracking-tighter leading-[0.9] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                                  CONVERSATION.
                              </h1>
                          </div>
                          
                          {/*  Neon Separator  */}
                          <div className="w-10 md:w-12 h-1 bg-gradient-to-r from-brand to-purple-500 rounded-full mb-6 md:mb-8 reveal reveal-delay-1 shadow-[0_0_10px_#F28044] active"></div>
                          
                          <p className="text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl font-light mb-8 md:mb-10 reveal reveal-delay-1 active">
                              We are forging a comprehensive ecosystem—AI-powered practice, a united community, and expert therapists. Add your voice to the movement and <strong className="text-brand font-semibold drop-shadow-md">speak on your terms.</strong>
                          </p>
                          
                          <div className="flex flex-col sm:flex-row gap-4 md:gap-5 reveal reveal-delay-2 w-full sm:w-auto active">
                              <a href="#download" className="group relative flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider transition-all shadow-soft-orange overflow-hidden bg-brand border border-brand text-white hover:scale-105 w-full sm:w-auto">
                                  <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full z-0"></div>
                                  <span className="relative z-10 group-hover:text-brand transition-colors">Start Your Journey</span>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" aria-hidden="true" className="lucide lucide-arrow-right w-3.5 h-3.5 md:w-4 md:h-4 relative z-10 group-hover:text-brand group-hover:translate-x-1 transition-all"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                              </a>
                              <a href="#platform" className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all shadow-sm w-full sm:w-auto">
                                  Explore The Academy
                              </a>
                          </div>
                      </div>
      
                      {/*  Realistic Mobile Frame (Ultra-Refined)  */}
                      <div className="lg:col-span-4 hidden lg:flex justify-end reveal reveal-delay-3 relative active">
                          <div className="relative h-[305px] w-[150px] xl:h-[330px] xl:w-[162.5px]">
                          <div className="absolute right-0 top-0 origin-top-right scale-50">
                          <div className="relative w-[300px] xl:w-[325px] h-[610px] xl:h-[660px] animate-float transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 hover:scale-105 group">
                              <div
                                  className="absolute left-0 top-0 z-0"
                                  style={{
                                      animation: "hero-fan-screen 5.6s cubic-bezier(0.45, 0.05, 0.2, 1) infinite",
                                      transformOrigin: "bottom center",
                                      willChange: "transform, opacity",
                                  }}
                              >
                                  <div className="relative w-[300px] xl:w-[325px] h-[610px] xl:h-[660px]">
                                      <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-[#1a1a1a] via-[#3a3a3a] to-[#2a2a2a] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_0_2px_rgba(255,255,255,0.2)]"></div>

                                      <div className="absolute top-[85px] -left-[4px] w-[7px] h-9 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                                      <div className="absolute top-[140px] -left-[4px] w-[7px] h-14 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                                      <div className="absolute top-[210px] -left-[4px] w-[7px] h-14 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                                      <div className="absolute top-[160px] -right-[4px] w-[7px] h-24 bg-gradient-to-l from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-r-[3px] border-y border-l border-white/10 shadow-[-1px_0_3px_rgba(0,0,0,0.5)]"></div>

                                      <div className="absolute inset-[4px] rounded-[3.25rem] bg-black shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] overflow-hidden">
                                          <div className="absolute top-4 inset-x-0 flex justify-center z-[60] pointer-events-none">
                                              <div className="w-[85px] h-[26px] bg-[#050505] rounded-[20px] shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-end pr-4">
                                                  <div className="w-1.5 h-1.5 rounded-full bg-[#1a1c2e] shadow-[0_0_2px_#3b3b4d]"></div>
                                              </div>
                                          </div>

                                          <div className="w-full h-full rounded-[inherit] overflow-hidden relative bg-[#f9fafb]">
                                              <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.9),rgba(255,255,255,0.22)_28%,transparent_46%),linear-gradient(180deg,#fff8f1_0%,#fff0e2_55%,#ffd7bc_100%)]" />
                                              <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 pb-3 pt-6 text-[12px] font-bold text-slate-900">
                                                  <span className="tracking-tight">09:41</span>
                                                  <div className="flex items-center gap-1.5">
                                                      <svg className="h-[10px] w-[17px]" viewBox="0 0 17 10" fill="currentColor">
                                                          <rect x="0" y="7" width="2.5" height="3" rx="0.5" />
                                                          <rect x="4" y="5" width="2.5" height="5" rx="0.5" />
                                                          <rect x="8" y="2.5" width="2.5" height="7.5" rx="0.5" />
                                                          <rect x="12" y="0" width="2.5" height="10" rx="0.5" />
                                                      </svg>
                                                      <svg className="h-[11px] w-[15px]" viewBox="0 0 15 11" fill="currentColor">
                                                          <path d="M7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11Z" />
                                                          <path d="M12.11 6.39C10.884 5.16398 9.23199 4.4754 7.5 4.4754C5.76801 4.4754 4.11602 5.16398 2.89 6.39" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                                          <path d="M14.61 3.89C12.7239 2.00392 10.166 0.945312 7.5 0.945312C4.83401 0.945312 2.27602 2.00392 0.39 3.89" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                                      </svg>
                                                      <div className="ml-0.5 flex items-center gap-0.5">
                                                          <div className="relative h-[10px] w-[20px] rounded-[2.5px] border-[1px] border-black/80 p-[1px]">
                                                              <div className="h-full w-[85%] rounded-[1px] bg-black/90"></div>
                                                          </div>
                                                          <div className="h-[4px] w-[1.5px] rounded-r-full bg-black/40"></div>
                                                      </div>
                                                  </div>
                                              </div>
                                              <div className="absolute inset-x-[22px] top-[76px] h-[94px] rounded-[26px] bg-gradient-to-br from-[#ff9d63] to-[#f97316] shadow-[0_14px_28px_rgba(249,115,22,0.2)] opacity-95">
                                                  <div className="absolute left-[18px] top-[18px] h-[10px] w-[92px] rounded-full bg-white/35" />
                                                  <div className="absolute left-[18px] top-[38px] h-[22px] w-[150px] rounded-full bg-white/90" />
                                                  <div className="absolute left-[18px] top-[68px] h-[8px] w-[110px] rounded-full bg-white/35" />
                                              </div>
                                              <div className="absolute inset-x-[22px] top-[188px] grid grid-cols-2 gap-3">
                                                  <div className="h-[124px] rounded-[24px] bg-white/88 shadow-[0_12px_24px_rgba(148,163,184,0.12)]" />
                                                  <div className="h-[124px] rounded-[24px] bg-white/78 shadow-[0_12px_24px_rgba(148,163,184,0.08)]" />
                                              </div>
                                              <div className="absolute inset-x-[22px] bottom-[56px] h-[120px] rounded-[28px] bg-white/82 shadow-[0_16px_28px_rgba(15,23,42,0.08)]">
                                                  <div className="absolute left-[18px] top-[18px] h-[12px] w-[118px] rounded-full bg-[#f97316]/20" />
                                                  <div className="absolute left-[18px] top-[44px] h-[40px] w-[160px] rounded-[18px] bg-[#fff5eb]" />
                                                  <div className="absolute right-[18px] bottom-[20px] h-[30px] w-[86px] rounded-full bg-[#3E2723]" />
                                              </div>
                                              <div className="absolute bottom-2 inset-x-0 flex justify-center z-50">
                                                  <div className="w-24 h-1 bg-black/10 rounded-full"></div>
                                              </div>
                                          </div>
                                      </div>

                                      <div className="absolute top-10 left-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                                      <div className="absolute top-10 right-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                                      <div className="absolute bottom-10 left-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                                      <div className="absolute bottom-10 right-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                                  </div>
                              </div>
                              
                              {/* External Chassis (Titanium/Metal Edge) */}
                              <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-[#1a1a1a] via-[#3a3a3a] to-[#2a2a2a] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_0_2px_rgba(255,255,255,0.2)]"></div>
                              
                              {/* Physical Buttons - High-Fidelity Realistic Details */}
                              {/* Silent Switch / Action Button */}
                              <div className="absolute top-[85px] -left-[4px] w-[7px] h-9 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                              {/* Volume Up */}
                              <div className="absolute top-[140px] -left-[4px] w-[7px] h-14 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                              {/* Volume Down */}
                              <div className="absolute top-[210px] -left-[4px] w-[7px] h-14 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                              {/* Power Button */}
                              <div className="absolute top-[160px] -right-[4px] w-[7px] h-24 bg-gradient-to-l from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-r-[3px] border-y border-l border-white/10 shadow-[-1px_0_3px_rgba(0,0,0,0.5)]"></div>
                              
                              {/* Inner Bezel (Black Glass Edge) */}
                              <div className="absolute inset-[4px] rounded-[3.25rem] bg-black shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] overflow-hidden">
                                  
                                  {/* Dynamic Island */}
                                  <div className="absolute top-4 inset-x-0 flex justify-center z-[60] pointer-events-none">
                                      <div className="w-[85px] h-[26px] bg-[#050505] rounded-[20px] shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-end pr-4">
                                          {/* Subtle Lens Reflection */}
                                          <div className="w-1.5 h-1.5 rounded-full bg-[#1a1c2e] shadow-[0_0_2px_#3b3b4d]"></div>
                                      </div>
                                  </div>

                                  {/* Live Screen Content - SEAMLESS FIT */}
                                  <div className="w-full h-full rounded-[inherit] overflow-hidden relative bg-[#f9fafb]">
                                      {/* Screen Glass Reflection Overlay */}
                                      <div className="absolute inset-0 z-50 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                      
                                      <LiveAppMockup disableVerticalPan />
                                      
                                      {/* Home Indicator */}
                                      <div className="absolute bottom-2 inset-x-0 flex justify-center z-50">
                                          <div className="w-24 h-1 bg-black/10 rounded-full"></div>
                                      </div>
                                  </div>
                              </div>

                              {/* Antenna Bands (Subtle detail) */}
                              <div className="absolute top-10 left-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                              <div className="absolute top-10 right-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                              <div className="absolute bottom-10 left-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                              <div className="absolute bottom-10 right-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
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
