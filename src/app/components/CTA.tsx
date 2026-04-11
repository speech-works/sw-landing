import React from 'react';

export default function CTA() {
  return (
    <>
      <section id="download" className="py-24 md:py-32 relative z-10 bg-white overflow-hidden group/cta">
              <div className="absolute inset-0 bg-brand-50/50 z-0 pointer-events-none"></div>
      
              {/*  EXPERIMENTAL STYLES FOR CTA  */}
              <style dangerouslySetInnerHTML={{ __html: `
                                    /* Ultra-fast, Aggressive Cinematic Cut Reveal */
                  .premium-reveal {
                      display: inline-block;
                      opacity: 0;
                      transform: translateY(120%) scale(0.6) skewY(15deg);
                      transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), 
                                  opacity 0.4s ease;
                      will-change: transform, opacity;
                      transform-origin: bottom left;
                  }
                  .reveal.active .premium-reveal {
                      opacity: 1;
                      transform: translateY(0) scale(1) skewY(0deg);
                  }
                  
                  /* Cinematic Glitch Cut Hover */
                  .ghost-echo {
                      position: relative;
                      display: inline-block;
                      transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.1s;
                  }
                  .ghost-echo::before, .ghost-echo::after {
                      content: attr(data-text);
                      position: absolute;
                      top: 0; left: 0; width: 100%; height: 100%;
                      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                      opacity: 0;
                      pointer-events: none;
                      z-index: 10;
                  }
                  /* Top Slice */
                  .ghost-echo::before {
                      clip-path: polygon(0 0, 100% 0, 100% 50%, 0 50%);
                  }
                  /* Bottom Slice */
                  .ghost-echo::after {
                      clip-path: polygon(0 50%, 100% 50%, 100% 100%, 0 50%);
                  }
      
                  /* Hover State - Original text becomes glowing wireframe */
                  .group\/text:hover .ghost-echo {
                      color: transparent !important;
                      -webkit-text-stroke: 1.5px rgba(242, 128, 68, 0.8) !important;
                      text-shadow: 0 0 30px rgba(242, 128, 68, 0.9);
                      transform: scale(1.08) perspective(500px) translateZ(30px);
                      cursor: crosshair;
                  }
                  /* Slices violently jump apart */
                  .group\/text:hover .ghost-echo::before {
                      opacity: 1;
                      transform: translate(-15px, -15px) rotate(-3deg);
                      -webkit-text-stroke: 0 !important;
                      color: #3F332D;
                      text-shadow: -6px 0 0 rgba(242, 128, 68, 0.5);
                  }
                  .group\/text:hover .ghost-echo::after {
                      opacity: 1;
                      transform: translate(20px, 15px) rotate(3deg);
                      -webkit-text-stroke: 0 !important;
                      color: #F28044;
                      text-shadow: 6px 0 0 rgba(63, 51, 45, 0.5);
                  }

                  /* The Rising Rebel Fist */
                  .rebel-fist-wrapper {
                      margin-bottom: -20px; /* Sits cleanly behind the button position */
                  }
                  .rebel-fist-animator {
                      opacity: 0;
                      transform: translateY(120%) scale(0.6);
                      transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, opacity 1s ease 0.3s, color 0.4s ease;
                      will-change: transform, opacity;
                  }
                  .reveal.active .rebel-fist-animator {
                      transform: translateY(0px) scale(1);
                      opacity: 0.05; /* Subtle watermark behind text */
                  }
                  
                  /* Interaction on button affects fist */
                  .group\\/cta.btn-hovered .rebel-fist-animator {
                      transform: translateY(-30px) scale(1.1) rotate(4deg);
                      opacity: 0.12;
                      color: #D9692E; /* Deepens color slightly on hover */
                      transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease, color 0.4s ease;
                  }
              ` }} />
      
              {/*  The Rising Fist Watermark (Z-index 10 to stay behind text Z-20)  */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350px] sm:w-[450px] h-[450px] sm:h-[550px] z-10 pointer-events-none rebel-fist-wrapper flex items-end justify-center">
                  <div className="w-full h-full rebel-fist-animator flex justify-center items-end text-brand" style={{ filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))' }}>
                      
                      {/*  
                         ================================================================================
                         IMPORTANT: The preview environment cannot load local files directly via URL, 
                         so the external mask image trick didn't show up. 
                         
                         TO USE YOUR EXACT CUSTOM SVG (Screenshot 2026-04-11 at 4.56.59 AM.svg):
                         1. Open your SVG file in a text/code editor (like VS Code or Notepad).
                         2. Copy all the code inside it (the <svg> and <path> tags).
                         3. Replace the entire temporary <svg> block below with your code.
                         4. Ensure your <svg> tag has these classes: 
                            className="w-[85%] h-auto max-h-[90%] fill-current transform origin-bottom" 
                            so it perfectly inherits the glowing hover animations!
                         ================================================================================
                       */}
                      <svg viewBox="0 0 100 120" className="w-[85%] h-auto max-h-[90%] fill-current transform origin-bottom">
                          <path d="M35 120 V60 H65 V120 Z" />
                          <rect x="20" y="56" width="45" height="14" rx="4" />
                          <rect x="20" y="40" width="50" height="14" rx="4" />
                          <rect x="20" y="24" width="50" height="14" rx="4" />
                          <rect x="20" y="8" width="50" height="14" rx="4" />
                          <path d="M65 32 Q85 32 85 50 Q85 65 65 65 Z" />
                      </svg>
      
                  </div>
              </div>
      
              <div className="max-w-4xl mx-auto px-6 text-center relative z-20 reveal active flex flex-col items-center">
                  
                  {/*  Staggered Rebellion Typography  */}
                  <h2 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7rem] font-black text-app-text tracking-tightest mb-6 md:mb-8 leading-[0.95] rebel-hover-zone pointer-events-auto cursor-default">
                      <div className="overflow-hidden">
                          <span className="premium-reveal" style={{ transitionDelay: '0.1s' }}>JOIN&nbsp;</span>
                          <span className="premium-reveal" style={{ transitionDelay: '0.2s' }}>THE</span>
                      </div>
                      <div className="overflow-hidden mt-1 md:mt-2">
                          <span className="premium-reveal text-brand drop-shadow-lg ghost-echo relative" data-text="REBELLION." style={{ transitionDelay: '0.3s' }}>
                              REBELLION.
                          </span>
                      </div>
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-app-muted mb-10 md:mb-12 font-medium premium-reveal pointer-events-none" style={{ transitionDelay: '0.4s' }}>
                      Stop waiting for the world to listen. Make them.
                  </p>
                  
                  <div className="premium-reveal w-full sm:w-auto" style={{ transitionDelay: '0.5s' }}>
                      <a href="#download" id="rebel-btn" className="relative z-30 inline-flex items-center justify-center gap-3 bg-brand text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-black uppercase tracking-widest text-xs sm:text-sm hover:bg-brand-600 transition-all duration-300 transform hover:-translate-y-1 shadow-[0_15px_40px_-10px_rgba(242,128,68,0.4)] hover:shadow-[0_20px_50px_-10px_rgba(242,128,68,0.6)] w-full sm:w-auto overflow-hidden group/btn pointer-events-auto">
                          <div className="absolute inset-0 w-0 bg-white/20 transition-all duration-300 ease-out group-hover/btn:w-full z-0"></div>
                          <span className="relative z-10">Download Speechworks</span>
                      </a>
                  </div>
              </div>
      
              
          </section>
    </>
  );
}
