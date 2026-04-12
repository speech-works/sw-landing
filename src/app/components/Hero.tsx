import React from 'react';
import LiveAppMockup from './LiveAppMockup';

export default function Hero() {
  return (
    <>
      {/*  EXPERIMENTAL HERO SECTION: Dark Mode Cinematic Entrance  */}
          <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-28 md:pt-32 pb-16 md:pb-20 z-10 bg-[#0A0705] overflow-hidden">
              
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
      
                      {/*  Right Visual  */}
                      <div className="lg:col-span-4 hidden lg:flex justify-end reveal reveal-delay-3 relative active">
                          <div className="w-[300px] xl:w-[320px] h-[600px] xl:h-[640px] rounded-[3rem] xl:rounded-[3.5rem] border-[6px] border-[#2A2A2A] bg-black p-1 relative overflow-hidden flex flex-col shadow-[0_20px_60px_-15px_rgba(242,128,68,0.3)] animate-float transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 hover:scale-105">
                              {/* iPhone Hardware Elements */}
                              <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
                                  <div className="w-1/3 h-6 bg-[#2A2A2A] rounded-b-3xl"></div>
                              </div>
                              <div className="absolute top-[80px] -left-[7px] w-1 h-8 bg-[#1A1A1A] rounded-l-md"></div>
                              <div className="absolute top-[130px] -left-[7px] w-1 h-12 bg-[#1A1A1A] rounded-l-md"></div>
                              <div className="absolute top-[190px] -left-[7px] w-1 h-12 bg-[#1A1A1A] rounded-l-md"></div>
                              <div className="absolute top-[140px] -right-[7px] w-1 h-16 bg-[#1A1A1A] rounded-r-md"></div>
                              
                              {/* Live Screen Content */}
                              <div className="w-full h-full rounded-[2.5rem] xl:rounded-[3rem] overflow-hidden relative">
                                  <LiveAppMockup />
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </section>
    </>
  );
}
