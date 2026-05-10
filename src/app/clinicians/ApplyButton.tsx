"use client";

import React from "react";

interface ApplyButtonProps {
  onClick?: (e: React.MouseEvent) => void;
}

export default function ApplyButton({ onClick }: ApplyButtonProps) {
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
                border: none;
                outline: none;
                -webkit-tap-highlight-color: transparent;
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
      
      <button 
        onClick={onClick}
        className="clinician-cta-btn relative z-30"
      >
        <div className="clinician-cta-layer w-full h-full flex items-center justify-center gap-2 sm:gap-3 px-8 sm:px-12 py-5 sm:py-6">
          <span className="font-black uppercase tracking-[0.25em] text-xs sm:text-sm whitespace-nowrap text-center">
            Apply for Advisory Board
          </span>
        </div>
      </button>
    </>
  );
}


