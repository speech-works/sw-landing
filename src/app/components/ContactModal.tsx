'use client';

import React, { useEffect, useState, useRef } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      raf = requestAnimationFrame(() => setIsRendered(true));
    } else {
      setIsRendered(false);
      setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 500); 
    }
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isOpen]);

  // Smooth 3D Parallax Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Very subtle, premium physics
    const maxTilt = 5; 
    const rotateX = ((y - centerY) / centerY) * -maxTilt; 
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    
    modalRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    modalRef.current.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeave = () => {
    if (!modalRef.current) return;
    modalRef.current.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    modalRef.current.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  if (!isOpen && !isRendered) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isRendered ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Premium Dark Backdrop */}
      <div 
        className="absolute inset-0 bg-[#000000]/60 backdrop-blur-xl transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Tilt Container */}
      <div 
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full max-w-[500px] bg-[#0c0a09] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden ${isRendered ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-[0.95]'}`}
        style={{ willChange: 'transform, opacity' }}
      >
        
        {/* Soft Ambient Corner Glows */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[80px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10b981]/5 blur-[80px] pointer-events-none rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 z-50 group hover:rotate-90"
          aria-label="Close"
        >
          {/* Close SVG */}
          <svg className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="relative z-10 w-full flex flex-col">
          
          <div className="mb-10 max-w-[400px]">
            {/* Online Badge */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 shadow-sm">
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
               </span>
               <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">Online & Ready</span>
            </div>
            
            <h2 className="text-[40px] md:text-[44px] font-semibold tracking-tight text-white mb-4">
              Let's talk.
            </h2>
            <p className="text-[#A39B95] text-[16px] font-normal leading-[1.7]">
              We are incredibly friendly people and we genuinely love chatting about speech, answering questions, or just saying hi. Don't be a stranger!
            </p>
          </div>

          <div className="space-y-4">
            {/* WhatsApp Sleek Tile */}
            <a 
              href="https://wa.me/917020097491"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between w-full h-[88px] rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#10b981]/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04]"
            >
               <div className="flex items-center gap-5">
                 <div className="relative">
                   <div className="absolute inset-0 bg-[#10b981] blur-[15px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
                   <div className="relative w-12 h-12 rounded-full border border-white/5 bg-[#141210] flex items-center justify-center shadow-lg group-hover:border-[#10b981]/30 transition-colors duration-300">
                     {/* Message SVG */}
                     <svg className="w-5 h-5 text-[#10b981] opacity-70 group-hover:opacity-100 transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                   </div>
                 </div>
                 
                 <div>
                   <div className="text-white font-medium text-[16px] mb-0.5 group-hover:text-[#10b981] transition-colors duration-300">Message on WhatsApp</div>
                   <div className="text-[#A39B95] text-[13px] font-medium tracking-wide opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                     We usually reply in minutes
                   </div>
                 </div>
               </div>

               <div className="w-8 h-8 shrink-0 flex items-center justify-center transform group-hover:translate-x-1 transition-all duration-300">
                 {/* Arrow SVG */}
                 <svg className="w-4 h-4 text-white/30 group-hover:text-[#10b981] transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
               </div>
            </a>

            {/* Email Sleek Tile */}
            <a 
              href="mailto:contact@speechworks.in"
              className="group flex items-center justify-between w-full h-[88px] rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.04]"
            >
               <div className="flex items-center gap-5">
                 <div className="relative">
                   <div className="absolute inset-0 bg-brand blur-[15px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
                   <div className="relative w-12 h-12 rounded-full border border-white/5 bg-[#141210] flex items-center justify-center shadow-lg group-hover:border-brand/30 transition-colors duration-300">
                     {/* Mail SVG */}
                     <svg className="w-5 h-5 text-brand opacity-70 group-hover:opacity-100 transition-opacity duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                   </div>
                 </div>
                 
                 <div>
                   <div className="text-white font-medium text-[16px] mb-0.5 group-hover:text-brand transition-colors duration-300">Send an Email</div>
                   <div className="text-[#A39B95] text-[13px] font-medium tracking-wide opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                     For longer thoughts and questions
                   </div>
                 </div>
               </div>

               <div className="w-8 h-8 shrink-0 flex items-center justify-center transform group-hover:translate-x-1 transition-all duration-300">
                 {/* Arrow SVG */}
                 <svg className="w-4 h-4 text-white/30 group-hover:text-brand transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
               </div>
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}
