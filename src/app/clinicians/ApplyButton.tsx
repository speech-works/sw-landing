"use client";

import React from "react";

export default function ApplyButton() {
  const handleApplyClick = () => {
    // Explicit event tracking placeholder
    // If you add PostHog or Google Analytics later, you can add it here.
    // e.g., posthog.capture('clicked_apply_advisory_board')
    console.log('Event tracked: clicked_apply_advisory_board');
  };

  return (
    <a 
      href="https://form.typeform.com/to/placeholder" 
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleApplyClick}
      className="inline-flex items-center justify-center gap-3 px-8 py-5 md:px-12 md:py-6 rounded-full bg-brand text-white text-sm md:text-base font-black uppercase tracking-wider hover:bg-brand-600 transition-all duration-300 shadow-[0_15px_30px_-10px_rgba(234,88,12,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(234,88,12,0.5)] hover:-translate-y-1"
    >
      Apply for the Advisory Board
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
      </svg>
    </a>
  );
}
