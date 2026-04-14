'use client';

import React, { useEffect, useState, useRef } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Custom Physics Engine State
  const physics = useRef({
    scale: 0.5,
    y: 80,
    x: 0,
    rotateX: 0,
    rotateY: 0,
    vScale: 0,
    vY: 0,
    vX: 0,
    vRotateX: 0,
    vRotateY: 0,
  });

  const targets = useRef({
    scale: 0.8, 
    y: 50,
    x: 0,
    rotateX: 0,
    rotateY: 0,
  });

  const rafRef = useRef<number | null>(null);

  // Physics Loop
  useEffect(() => {
    if (!isOpen) return;
    
    // Set targets for opening
    targets.current.scale = 1;
    targets.current.y = 0;
    
    const tension = 0.08;   // High tension = fast snap
    const friction = 0.70;  // Lower friction = more wobble, higher = damped tracking

    const loop = () => {
      const p = physics.current;
      const t = targets.current;

      // Damped Harmonic Oscillator (Spring)
      p.vScale += (t.scale - p.scale) * tension;
      p.vScale *= friction;
      p.scale += p.vScale;

      p.vY += (t.y - p.y) * tension;
      p.vY *= friction;
      p.y += p.vY;

      p.vX += (t.x - p.x) * (tension * 0.5); // Slower x drift
      p.vX *= friction;
      p.x += p.vX;

      p.vRotateX += (t.rotateX - p.rotateX) * (tension * 1.5);
      p.vRotateX *= friction;
      p.rotateX += p.vRotateX;

      p.vRotateY += (t.rotateY - p.rotateY) * (tension * 1.5);
      p.vRotateY *= friction;
      p.rotateY += p.vRotateY;

      // Apply to DOM directly (bypassing React state for 60fps locked performance)
      if (modalRef.current) {
        modalRef.current.style.transform = `perspective(1200px) translateX(${p.x}px) translateY(${p.y}px) scale3d(${p.scale}, ${p.scale}, ${p.scale}) rotateX(${p.rotateX}deg) rotateY(${p.rotateY}deg)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen]);

  // Handle Lifecycle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset physics to bottom state before showing
      physics.current = { ...physics.current, scale: 0.7, y: 120, x: 0, rotateX: -10, rotateY: 0, vScale: 0, vY: 0, vX: 0, vRotateX: 0, vRotateY: 0 };
      setIsRendered(true);
    } else {
      setIsRendered(false);
      // Optional: push down when closing
      targets.current.scale = 0.9;
      targets.current.y = 80;
      setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 500); 
    }
  }, [isOpen]);

  // Mouse Tracking drives the physics targets
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cursorY = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate normalized distance from center (-1 to 1)
    const normalizedX = (cursorX - centerX) / centerX;
    const normalizedY = (cursorY - centerY) / centerY;

    // Set physically dynamic targets
    targets.current.rotateX = normalizedY * -8; // Tilt along X
    targets.current.rotateY = normalizedX * 12; // Tilt along Y
    targets.current.x = normalizedX * -15;      // Slight opposite drag effect for floating feel
    targets.current.y = (normalizedY * -10);    // Slight vertical lift when hovering top
  };

  const handleMouseLeave = () => {
    // Snap targets back to neutral (0), the physics engine handles the wobble
    targets.current.rotateX = 0;
    targets.current.rotateY = 0;
    targets.current.x = 0;
    targets.current.y = 0;
  };

  if (!isOpen && !isRendered) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isRendered ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="absolute inset-0 bg-[#000000]/70 backdrop-blur-xl transition-opacity duration-500"
        onClick={onClose}
      />

      <div 
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // Force hardware acceleration
        className="relative w-full max-w-[500px] bg-[#0c0a09] border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
        style={{ willChange: 'transform' }}
      >
        {/* Soft Ambient Lights inside the physics container so they move with it */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[80px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10b981]/5 blur-[80px] pointer-events-none rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/5 transition-all duration-300 z-50 group shadow-lg"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-white/50 group-hover:text-white transition-all duration-300 group-hover:rotate-90 group-hover:scale-110" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="relative z-10 w-full flex flex-col">
          <div className="mb-10 max-w-[400px]">
            {/* The Badge */}
            <div className={`inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isRendered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
               </span>
               <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">Online & Ready</span>
            </div>
            
            <h2 className={`text-[40px] md:text-[44px] font-semibold tracking-tight text-white mb-4 transition-all duration-700 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isRendered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Let's talk.
            </h2>
            <p className={`text-[#A39B95] text-[16px] font-normal leading-[1.7] transition-all duration-700 delay-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isRendered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              We are incredibly friendly people and we genuinely love chatting about speech, answering questions, or just saying hi. Don't be a stranger!
            </p>
          </div>

          <div className="space-y-4 perspective-1000">
            {/* WhatsApp Physical Tile */}
            <a 
              href="https://wa.me/917020097491"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center justify-between w-full h-[88px] rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#10b981]/20 p-5 transition-all duration-500 delay-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isRendered ? 'opacity-100 translate-y-0 scale-100 rotate-x-0' : 'opacity-0 translate-y-12 scale-95 rotate-x-12'} hover:scale-[1.02] hover:-translate-y-1 hover:bg-white/[0.04]`}
            >
               <div className="flex items-center gap-5">
                 <div className="relative">
                   <div className="absolute inset-0 bg-[#10b981] blur-[15px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
                   <div className="relative w-12 h-12 rounded-full border border-white/5 bg-[#141210] flex items-center justify-center shadow-lg group-hover:border-[#10b981]/30 transition-all duration-500 group-hover:scale-110">
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

               <div className="w-8 h-8 shrink-0 flex items-center justify-center transform group-hover:translate-x-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                 <svg className="w-4 h-4 text-white/30 group-hover:text-[#10b981] transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
               </div>
            </a>

            {/* Email Physical Tile */}
            <a 
              href="mailto:contact@speechworks.in"
              className={`group flex items-center justify-between w-full h-[88px] rounded-2xl bg-white/[0.02] border border-white/5 hover:border-brand/20 p-5 transition-all duration-500 delay-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${isRendered ? 'opacity-100 translate-y-0 scale-100 rotate-x-0' : 'opacity-0 translate-y-12 scale-95 rotate-x-12'} hover:scale-[1.02] hover:-translate-y-1 hover:bg-white/[0.04]`}
            >
               <div className="flex items-center gap-5">
                 <div className="relative">
                   <div className="absolute inset-0 bg-brand blur-[15px] opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full"></div>
                   <div className="relative w-12 h-12 rounded-full border border-white/5 bg-[#141210] flex items-center justify-center shadow-lg group-hover:border-brand/30 transition-all duration-500 group-hover:scale-110">
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

               <div className="w-8 h-8 shrink-0 flex items-center justify-center transform group-hover:translate-x-2 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                 <svg className="w-4 h-4 text-white/30 group-hover:text-brand transition-colors duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
               </div>
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}
