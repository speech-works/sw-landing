"use client";

import React from "react";

export default function ApplyButton() {
  const handleApplyClick = () => {
    // Explicit event tracking placeholder
    console.log('Event tracked: clicked_apply_advisory_board');
  };

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .clinician-cta-btn {
                border-radius: 9999px;
                background: linear-gradient(135deg, #FF955E 0%, #D9692E 100%);
                border: 1px solid rgba(255, 255, 255, 0.4);
                box-shadow: 0 15px 35px -5px rgba(242, 128, 68, 0.4), inset 0 2px 4px rgba(255,255,255,0.4);
                cursor: pointer;
                will-change: transform, box-shadow;
                transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease;
                isolation: isolate;
                display: inline-flex;
                text-decoration: none;
            }
            .clinician-cta-btn:hover {
                transform: translateY(-1px);
                box-shadow: 0 17px 30px -9px rgba(121, 76, 57, 0.22), inset 0 2px 4px rgba(255,255,255,0.42);
            }
            .clinician-cta-layer {
                color: #ffffff;
                transition: transform 0.18s cubic-bezier(0.22, 1, 0.36, 1);
                white-space: nowrap;
                text-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .clinician-cta-btn:hover .clinician-cta-layer {
                transform: scale(0.992);
            }
          `,
        }}
      />
      
      <a 
        href="https://form.typeform.com/to/placeholder" 
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleApplyClick}
        className="clinician-cta-btn relative z-30"
      >
        <div className="clinician-cta-layer w-full h-full flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-12 py-5 sm:py-6">
          <span className="font-black uppercase tracking-[0.25em] text-xs sm:text-sm whitespace-nowrap text-center">
            Apply for Advisory Board
          </span>
        </div>
      </a>
    </>
  );
}
