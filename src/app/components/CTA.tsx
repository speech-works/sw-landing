import React from "react";

export default function CTA() {
  return (
    <>
      <section
        id="download"
        className="py-24 md:py-32 relative z-10 bg-white group/cta"
      >
        <div className="absolute inset-0 bg-brand-50/50 z-0 pointer-events-none"></div>

        {/*  EXPERIMENTAL STYLES FOR CTA  */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
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
                      opacity: 0.25;
                  }
                  
                  /* Interaction on button affects fist */
                  .group\\/cta.btn-hovered .rebel-fist-animator {
                      transform: translateY(-30px) scale(1.1) rotate(4deg);
                      opacity: 0.6;
                      color: #D9692E; /* Deepens color slightly on hover */
                      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease, color 0.4s ease;
                  }

                  /* AWWWARDS EXPERIMENTAL REBEL BUTTON */
                  .awwwards-btn {
                      background: linear-gradient(135deg, #FF955E 0%, #D9692E 100%);
                      box-shadow: 
                          0 15px 35px -5px rgba(242, 128, 68, 0.4),
                          inset 0 2px 4px rgba(255, 255, 255, 0.5), /* 3D Top Inner Highlight */
                          inset 0 -4px 8px rgba(0, 0, 0, 0.15), /* 3D Bottom Inner Shadow */
                          0 0 0 1px rgba(255, 255, 255, 0.1) inset; /* Crisp edge */
                      transition: box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                      will-change: transform, box-shadow;
                  }
                  
                  /* Glossy Top Overlay */
                  .btn-gloss {
                      position: absolute;
                      top: 0; left: 5%; right: 5%; height: 40%;
                      background: linear-gradient(to bottom, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%);
                      border-radius: 999px 999px 0 0;
                      opacity: 1;
                      pointer-events: none;
                      transition: opacity 0.5s ease;
                      z-index: 2;
                  }
                  .group\/btn:hover .btn-gloss {
                      opacity: 0; /* Fade out when dark mode expands */
                  }

                  /* Sweeping Shimmer */
                  .btn-shimmer-sweep {
                      position: absolute;
                      top: 0; left: -100%; width: 50%; height: 100%;
                      background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
                      transform: skewX(-20deg);
                      animation: btn-sweep 3s infinite;
                      z-index: 2;
                      pointer-events: none;
                  }
                  .group\/btn:hover .btn-shimmer-sweep {
                      display: none; /* Hide during text marquee hover */
                  }

                  @keyframes btn-sweep {
                      0% { left: -100%; }
                      20% { left: 200%; }
                      100% { left: 200%; }
                  }

                  .group\/btn:hover .awwwards-btn {
                      box-shadow: 0 25px 50px -10px rgba(10, 7, 5, 0.5);
                      transform: scale(1.05);
                  }

                  .btn-dark-fill {
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      width: 150%;
                      aspect-ratio: 1;
                      background: #0A0705;
                      border-radius: 50%;
                      transform: translate(-50%, -50%) scale(0);
                      transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                      z-index: 0;
                      will-change: transform;
                  }

                  .group\/btn:hover .btn-dark-fill {
                      transform: translate(-50%, -50%) scale(1);
                  }

                  .btn-marquee-container {
                      position: absolute;
                      inset: 0;
                      display: flex;
                      align-items: center;
                      opacity: 0;
                      transition: opacity 0.6s ease 0.1s;
                      z-index: 1;
                      pointer-events: none;
                  }

                  .group\/btn:hover .btn-marquee-container {
                      opacity: 1;
                  }

                  .btn-marquee {
                      display: flex;
                      white-space: nowrap;
                      animation: btn-marquee-anim 4s linear infinite;
                      will-change: transform;
                  }

                  @keyframes btn-marquee-anim {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); }
                  }

                  .btn-marquee span {
                      font-size: 2.5rem;
                      font-weight: 900;
                      text-transform: uppercase;
                      color: transparent;
                      -webkit-text-stroke: 1px rgba(242, 128, 68, 0.25);
                      padding: 0 10px;
                      letter-spacing: -0.02em;
                  }

                  .btn-text {
                      transition: color 0.4s ease;
                      text-shadow: 0 2px 4px rgba(0,0,0,0.15);
                      position: relative;
                      z-index: 3;
                  }

                  .group\/btn:hover .btn-text {
                      color: #F28044;
                      text-shadow: none;
                  }

                  .btn-arrow-icon {
                      transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
                      position: relative;
                      z-index: 3;
                  }

                  .group\/btn:hover .btn-arrow-icon {
                      transform: translateX(8px) rotate(-45deg);
                      color: #F28044;
                  }
              `,
          }}
        />

        {/*  The Rising Fist Watermark (Z-index 10 to stay behind text Z-20)  */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[750px] h-[600px] sm:h-[680px] z-10 pointer-events-none rebel-fist-wrapper flex items-end justify-center">
          <div
            className="w-full h-full rebel-fist-animator flex justify-center items-end text-brand"
            style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))" }}
          >
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/rebel1.png"
              alt="Rebel fist"
              className="w-full h-auto max-h-full object-contain origin-bottom select-none"
              draggable={false}
            />
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-20 reveal active flex flex-col items-center">
          {/*  Staggered Rebellion Typography  */}
          <h2 className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7rem] font-black text-app-text tracking-tightest mb-6 md:mb-8 leading-[0.95] rebel-hover-zone pointer-events-auto cursor-default">
            <div className="relative z-10">
              <span
                className="premium-reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                JOIN&nbsp;
              </span>
              <span
                className="premium-reveal"
                style={{ transitionDelay: "0.2s" }}
              >
                THE
              </span>
            </div>
            <div className="mt-1 md:mt-2 relative z-20">
              <span
                className="premium-reveal text-brand drop-shadow-lg ghost-echo block pb-4"
                data-text="REBELLION."
                style={{ transitionDelay: "0.3s" }}
              >
                REBELLION.
              </span>
            </div>
          </h2>


          <div
            className="premium-reveal w-full sm:w-auto"
            style={{ transitionDelay: "0.5s" }}
          >
            <a
              href="#download"
              id="rebel-btn"
              className="magnetic-btn group/btn relative z-30 inline-flex items-center justify-center p-2 cursor-pointer pointer-events-auto w-full sm:w-auto"
            >
              <div className="awwwards-btn relative overflow-hidden rounded-full flex items-center justify-center px-10 sm:px-14 py-5 sm:py-6 w-full sm:w-auto text-white">
                
                {/* High-End Gloss Features */}
                <div className="btn-gloss"></div>
                <div className="btn-shimmer-sweep"></div>

                {/* Expanding Dark Mode Fill */}
                <div className="btn-dark-fill"></div>

                {/* Marquee Background */}
                <div className="btn-marquee-container select-none" aria-hidden="true">
                  <div className="btn-marquee">
                    <span>SPEECHWORKS • DOWNLOAD • SPEECHWORKS • DOWNLOAD • </span>
                    <span>SPEECHWORKS • DOWNLOAD • SPEECHWORKS • DOWNLOAD • </span>
                  </div>
                </div>

                {/* Foreground Text & Icon */}
                <div className="relative z-10 flex items-center gap-4">
                  <span className="btn-text font-black uppercase tracking-[0.2em] text-xs sm:text-sm">Download Speechworks</span>
                  <div className="btn-arrow-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
