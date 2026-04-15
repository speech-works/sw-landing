import React, { useState } from "react";
import InviteOnlyModal from "./InviteOnlyModal";

export default function CTA() {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

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
                      margin-bottom: -90px; /* Deep downward pull to bury transparent borders encoded into the PNG itself */
                  }
                  .rebel-fist-animator {
                      opacity: 0;
                      transform-origin: bottom center;
                      transform: translateY(100px) scale(0.6);
                      transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s, opacity 1s ease 0.3s, color 0.4s ease;
                      will-change: transform, opacity;
                  }
                  .reveal.active .rebel-fist-animator {
                      transform: translateY(0px) scale(1.1);
                      opacity: 0.25;
                      transition: transform 1.8s cubic-bezier(0.25, 1, 0.5, 1), opacity 1.5s cubic-bezier(0.25, 1, 0.5, 1), color 1s ease;
                  }

                  .group\\/cta.btn-hovered .rebel-fist-animator {
                      transform: translateY(0px) scale(1.15) rotate(2deg);
                      opacity: 0.6;
                      color: #D9692E;
                      transition: transform 1.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 1.2s cubic-bezier(0.22, 1, 0.36, 1), color 1s ease;
                  }
                  
                  /* Clean CTA button */
                  .dimension-btn-wrap {
                      border-radius: 9999px;
                      background: linear-gradient(135deg, #FF955E 0%, #D9692E 100%);
                      border: 1px solid rgba(255, 255, 255, 0.4);
                      box-shadow: 0 15px 35px -5px rgba(242, 128, 68, 0.4), inset 0 2px 4px rgba(255,255,255,0.4);
                      cursor: pointer;
                      will-change: transform, box-shadow;
                      transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease;
                      isolation: isolate;
                      display: inline-flex;
                  }

                  .dimension-btn-wrap:hover {
                      transform: translateY(-1px);
                      box-shadow: 0 17px 30px -9px rgba(121, 76, 57, 0.22), inset 0 2px 4px rgba(255,255,255,0.42);
                  }

                  .base-layer {
                      color: #ffffff;
                      transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
                      white-space: nowrap;
                      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                  }

                  .dimension-btn-wrap:hover .base-layer {
                      transform: scale(0.992);
                  }
              `,
          }}
        />

        {/*  The Rising Fist Watermark (Z-index 10 to stay behind text Z-20)  */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] sm:w-[120%] md:w-[90%] lg:w-[70%] h-[120%] z-10 pointer-events-none rebel-fist-wrapper flex items-end justify-center">
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
              src={withBasePath("/assets/rebel2.png")}
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
            <button
              type="button"
              id="rebel-btn"
              onClick={() => setIsInviteModalOpen(true)}
              onMouseEnter={() => {
                document
                  .getElementById("download")
                  ?.classList.add("btn-hovered");
              }}
              onMouseLeave={() => {
                document
                  .getElementById("download")
                  ?.classList.remove("btn-hovered");
              }}
              className="dimension-btn-wrap relative z-30 cursor-pointer pointer-events-auto"
            >
              <div className="base-layer w-full h-full flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-12 py-5 sm:py-6">
                {/* Phantom icon on left to flawlessly counter-balance the right icon and force text to dead-center */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className="invisible shrink-0"
                />
                <span className="font-black uppercase tracking-[0.25em] text-xs sm:text-sm whitespace-nowrap text-center">
                  Get Speechworks
                </span>
                {/* Placeholder for right icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  className="invisible shrink-0"
                />
              </div>
            </button>
          </div>
        </div>
      </section>

      <InviteOnlyModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
      />
    </>
  );
}
import { withBasePath } from "@/app/lib/withBasePath";
