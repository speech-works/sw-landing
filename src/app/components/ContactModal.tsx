'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useIsMobileViewport } from './useIsMobileViewport';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isRendered, setIsRendered] = useState(false);
  const isMobileViewport = useIsMobileViewport();
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
    const modalNode = modalRef.current;
    if (!isOpen) return;
    if (isMobileViewport) {
      if (modalNode) {
        modalNode.style.transform = 'none';
      }
      return;
    }
    
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
        modalRef.current.style.transform = isMobileViewport
          ? `translate3d(0, ${p.y}px, 0) scale3d(${p.scale}, ${p.scale}, ${p.scale})`
          : `perspective(1200px) translateX(${p.x}px) translateY(${p.y}px) scale3d(${p.scale}, ${p.scale}, ${p.scale}) rotateX(${p.rotateX}deg) rotateY(${p.rotateY}deg)`;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (modalNode) {
        modalNode.style.transform = '';
      }
    };
  }, [isMobileViewport, isOpen]);

  // Handle Lifecycle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (isMobileViewport) {
        if (modalRef.current) {
          modalRef.current.style.transform = 'none';
        }
      } else {
        // Reset physics to bottom state before showing
        physics.current = {
          ...physics.current,
          scale: 0.7,
          y: 120,
          x: 0,
          rotateX: -10,
          rotateY: 0,
          vScale: 0,
          vY: 0,
          vX: 0,
          vRotateX: 0,
          vRotateY: 0,
        };
      }
      setIsRendered(true);
    } else {
      setIsRendered(false);
      if (modalRef.current) {
        modalRef.current.style.transform = '';
      }
      if (isMobileViewport) {
        document.body.style.overflow = 'unset';
        return;
      }
      // Optional: push down when closing
      targets.current.scale = 0.9;
      targets.current.y = 80;
      const timeout = window.setTimeout(() => {
        document.body.style.overflow = 'unset';
      }, 500); 
      return () => window.clearTimeout(timeout);
    }
  }, [isMobileViewport, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Mouse Tracking drives the physics targets
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current || isMobileViewport) return;
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
    if (isMobileViewport) return;
    // Snap targets back to neutral (0), the physics engine handles the wobble
    targets.current.rotateX = 0;
    targets.current.rotateY = 0;
    targets.current.x = 0;
    targets.current.y = 0;
  };

  const handleEmailClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const mailtoUrl = 'mailto:contact@speechworks.in';
    const userAgent = navigator.userAgent;
    const shouldUseNativeMailClient =
      isMobileViewport ||
      /Android|iPhone|iPad|iPod/i.test(userAgent) ||
      window.matchMedia('(pointer: coarse)').matches;

    if (shouldUseNativeMailClient) {
      return;
    }

    event.preventDefault();

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      'contact@speechworks.in'
    )}`;

    const openedWindow = window.open(
      gmailComposeUrl,
      '_blank',
      'noopener,noreferrer'
    );

    if (!openedWindow) {
      window.location.href = mailtoUrl;
    }
  };

  if (!isOpen && !isRendered) return null;
  const isStaticMobileView = isMobileViewport || isRendered;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-3 sm:p-6 ${isMobileViewport ? '' : 'transition-opacity duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] '} ${isRendered ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className={`absolute inset-0 bg-[#000000]/70 backdrop-blur-xl ${isMobileViewport ? '' : 'transition-opacity duration-500'}`}
        onClick={onClose}
      />

      <div 
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        // Force hardware acceleration
        className="relative mx-auto w-full max-w-[500px] overflow-hidden rounded-[2.5rem] border border-white/5 bg-[#0c0a09] p-6 shadow-[0_40px_100px_rgba(0,0,0,0.8)] sm:p-7 md:p-10"
        style={{ willChange: isMobileViewport ? 'auto' : 'transform' }}
      >
        {/* Soft Ambient Lights inside the physics container so they move with it */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand/10 blur-[80px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#10b981]/5 blur-[80px] pointer-events-none rounded-full -translate-x-1/2 translate-y-1/2"></div>
        
        <button 
          onClick={onClose}
          className={`absolute top-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-white/5 shadow-lg group ${
            isMobileViewport
              ? ''
              : 'transition-all duration-300 hover:bg-white/10'
          }`}
          aria-label="Close"
        >
          <svg className={`h-4 w-4 text-white/50 ${isMobileViewport ? '' : 'transition-all duration-300 group-hover:rotate-90 group-hover:scale-110 group-hover:text-white'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>

        <div className="relative z-10 flex w-full flex-col">
          <div className="mb-7 max-w-[400px] md:mb-10">
            {/* The Badge */}
            <div className={`mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 shadow-sm md:mb-6 ${isMobileViewport ? '' : 'transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] '} ${isStaticMobileView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
               <span className="relative flex h-2 w-2">
                 <span className={`absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75 ${isMobileViewport ? '' : 'animate-ping'}`}></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10b981]"></span>
               </span>
               <span className="text-[11px] font-mono tracking-widest uppercase text-white/70">Online & Ready</span>
            </div>
            
            <h2 className={`mb-3 text-[36px] font-semibold tracking-tight text-white sm:text-[40px] md:mb-4 md:text-[44px] ${isMobileViewport ? '' : 'transition-all duration-700 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)] '} ${isStaticMobileView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Let&apos;s talk.
            </h2>
            <p className={`text-[15px] font-normal leading-[1.65] text-[#A39B95] md:text-[16px] ${isMobileViewport ? '' : 'transition-all duration-700 delay-150 ease-[cubic-bezier(0.34,1.56,0.64,1)] '} ${isStaticMobileView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              We are incredibly friendly people and we genuinely love chatting about speech, answering questions, or just saying hi. Don&apos;t be a stranger!
            </p>
          </div>

          <div className="space-y-3.5 perspective-1000 md:space-y-4">
            {/* WhatsApp Physical Tile */}
            <a 
              href="https://wa.me/917020097491"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex h-[82px] w-full items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-4 md:h-[88px] md:p-5 ${isMobileViewport ? '' : 'transition-all duration-500 delay-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-[#10b981]/20 hover:bg-white/[0.04] hover:scale-[1.02] hover:-translate-y-1 '} ${isStaticMobileView ? 'opacity-100 translate-y-0 scale-100 rotate-x-0' : 'opacity-0 translate-y-12 scale-95 rotate-x-12'}`}
            >
               <div className="flex items-center gap-4 md:gap-5">
                 <div className="relative">
                   <div className={`absolute inset-0 bg-[#10b981] blur-[15px] opacity-0 rounded-full ${isMobileViewport ? '' : 'transition-opacity duration-500 group-hover:opacity-30'}`}></div>
                   <div className={`relative flex h-11 w-11 items-center justify-center rounded-full border border-white/5 bg-[#141210] shadow-lg md:h-12 md:w-12 ${isMobileViewport ? '' : 'transition-all duration-500 group-hover:scale-110 group-hover:border-[#10b981]/30'}`}>
                     <svg className={`h-5 w-5 text-[#10b981] opacity-70 ${isMobileViewport ? '' : 'transition-opacity duration-300 group-hover:opacity-100'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                   </div>
                 </div>
                 
                 <div>
                   <div className={`mb-0.5 text-[15px] font-medium text-white md:text-[16px] ${isMobileViewport ? '' : 'transition-colors duration-300 group-hover:text-[#10b981]'}`}>Message on WhatsApp</div>
                   <div className={`text-[12px] font-medium tracking-wide text-[#A39B95] opacity-80 md:text-[13px] ${isMobileViewport ? '' : 'transition-opacity duration-300 group-hover:opacity-100'}`}>
                     We usually reply in minutes
                   </div>
                 </div>
               </div>

              <div className={`flex h-8 w-8 shrink-0 items-center justify-center ${isMobileViewport ? '' : 'transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2'}`}>
                <svg className={`h-4 w-4 text-white/30 ${isMobileViewport ? '' : 'transition-colors duration-300 group-hover:text-[#10b981]'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </a>

            {/* Email Physical Tile */}
            <a 
              href="mailto:contact@speechworks.in"
              onClick={handleEmailClick}
              className={`group flex h-[82px] w-full items-center justify-between rounded-2xl border border-white/5 bg-white/[0.02] p-4 md:h-[88px] md:p-5 ${isMobileViewport ? '' : 'transition-all duration-500 delay-[250ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:border-brand/20 hover:bg-white/[0.04] hover:scale-[1.02] hover:-translate-y-1 '} ${isStaticMobileView ? 'opacity-100 translate-y-0 scale-100 rotate-x-0' : 'opacity-0 translate-y-12 scale-95 rotate-x-12'}`}
            >
               <div className="flex items-center gap-4 md:gap-5">
                 <div className="relative">
                   <div className={`absolute inset-0 bg-brand blur-[15px] opacity-0 rounded-full ${isMobileViewport ? '' : 'transition-opacity duration-500 group-hover:opacity-30'}`}></div>
                   <div className={`relative flex h-11 w-11 items-center justify-center rounded-full border border-white/5 bg-[#141210] shadow-lg md:h-12 md:w-12 ${isMobileViewport ? '' : 'transition-all duration-500 group-hover:scale-110 group-hover:border-brand/30'}`}>
                     <svg className={`h-5 w-5 text-brand opacity-70 ${isMobileViewport ? '' : 'transition-opacity duration-300 group-hover:opacity-100'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                   </div>
                 </div>
                 
                 <div>
                   <div className={`mb-0.5 text-[15px] font-medium text-white md:text-[16px] ${isMobileViewport ? '' : 'transition-colors duration-300 group-hover:text-brand'}`}>Send an Email</div>
                   <div className={`text-[12px] font-medium tracking-wide text-[#A39B95] opacity-80 md:text-[13px] ${isMobileViewport ? '' : 'transition-opacity duration-300 group-hover:opacity-100'}`}>
                     For longer thoughts and questions
                   </div>
                 </div>
               </div>

               <div className={`flex h-8 w-8 shrink-0 items-center justify-center ${isMobileViewport ? '' : 'transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-2'}`}>
                 <svg className={`h-4 w-4 text-white/30 ${isMobileViewport ? '' : 'transition-colors duration-300 group-hover:text-brand'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" x2="19" y1="12" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
               </div>
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}
