'use client';

import React, { useEffect, useState, useRef } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsInitializing(true);
      document.body.style.overflow = 'hidden';
      
      // Slight delay for rendering animations to allow display:block to take effect
      const raf = requestAnimationFrame(() => {
        setIsRendered(true);
        if ((window as any).lucide) {
          setTimeout(() => { (window as any).lucide.createIcons(); }, 50);
        }
      });
      return () => cancelAnimationFrame(raf);
    } else {
      setIsRendered(false);
      const timer = setTimeout(() => {
        setIsInitializing(false);
        document.body.style.overflow = 'unset';
      }, 700); // Wait for exit animations
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // 3D Parallax Tilt Logic
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const maxTilt = 5; 
    const rotateX = ((y - centerY) / centerY) * -maxTilt; 
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    modalRef.current.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    modalRef.current.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeave = () => {
    if (!modalRef.current) return;
    modalRef.current.style.transform = `perspective(2000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    modalRef.current.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  if (!isOpen && !isInitializing) return null;

  return (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRendered ? 'opacity-100' : 'opacity-0'}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Cinematic Backdrop */}
      <div 
        className="absolute inset-0 bg-[#3F332D]/70 backdrop-blur-xl transition-opacity duration-700"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div 
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full max-w-[540px] bg-[#0c0a09] border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.8)] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isRendered ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-24 opacity-0 scale-95'}`}
        style={{ willChange: 'transform' }}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300 z-20 group"
          aria-label="Close"
        >
          <i data-lucide="x" className="w-4 h-4 text-white/50 group-hover:text-white transition-all duration-300 group-hover:rotate-90"></i>
        </button>
        
        {/* Subtle dynamic background glow */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(217, 105, 46, 0.15) 0%, transparent 70%)' }}></div>
        
        <div className="relative z-10 w-full h-full flex flex-col">
          
          <div className="mb-10 max-w-sm">
            <div className={`w-14 h-14 bg-white/[0.03] border border-white/10 rounded-[1.25rem] flex items-center justify-center mb-6 shadow-sm filter drop-shadow hover:bg-white/[0.06] transition-all duration-500 transform ${isRendered ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'} delay-100`}>
              <i data-lucide="waves" className="w-6 h-6 text-brand"></i>
            </div>
            <h2 className={`text-4xl font-black tracking-tight text-white mb-4 transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRendered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} delay-200`}>
              Start a dialog.
            </h2>
            <p className={`text-[#8C7C73] text-[15px] font-medium leading-relaxed transform transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isRendered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} delay-300`}>
              Whether you're ready to reclaim your voice or simply have questions about the platform, our secure lines are always open.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {/* WhatsApp Interactive Grid Tile */}
            <a 
              href="https://wa.me/917020097491"
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col justify-between h-[180px] rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#10b981]/40 p-6 md:p-7 overflow-hidden transition-all duration-500 transform ease-[cubic-bezier(0.16,1,0.3,1)] ${isRendered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} delay-[400ms] hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(16,185,129,0.3)]`}
            >
               {/* Accent Glow */}
               <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#10b981] blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>

               <div className="flex justify-between items-start z-10 w-full relative">
                 <div className="w-11 h-11 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-[#10b981] group-hover:border-[#10b981]/30 transition-all duration-500">
                   <i data-lucide="message-square-text" className="w-5 h-5"></i>
                 </div>
                 <i data-lucide="arrow-up-right" className="w-5 h-5 text-white/20 group-hover:text-[#10b981] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500"></i>
               </div>
               
               <div className="z-10 relative">
                 <div className="font-bold text-xl text-white/90 group-hover:text-white transition-colors tracking-tight mb-1">WhatsApp</div>
                 <div className="text-xs text-[#10b981] font-medium tracking-wide">Encrypted line</div>
               </div>
            </a>

            {/* Email Interactive Grid Tile */}
            <a 
              href="mailto:contact@speechworks.in"
              className={`group relative flex flex-col justify-between h-[180px] rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#D9692E]/40 p-6 md:p-7 overflow-hidden transition-all duration-500 transform ease-[cubic-bezier(0.16,1,0.3,1)] ${isRendered ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} delay-[500ms] hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(217,105,46,0.3)]`}
            >
               {/* Accent Glow */}
               <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D9692E] blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"></div>

               <div className="flex justify-between items-start z-10 w-full relative">
                 <div className="w-11 h-11 rounded-full bg-black/40 border border-white/10 flex items-center justify-center text-white/50 group-hover:text-brand group-hover:border-brand/30 transition-all duration-500">
                   <i data-lucide="mail-plus" className="w-5 h-5"></i>
                 </div>
                 <i data-lucide="arrow-up-right" className="w-5 h-5 text-white/20 group-hover:text-brand group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-500"></i>
               </div>
               
               <div className="z-10 relative">
                 <div className="font-bold text-xl text-white/90 group-hover:text-white transition-colors tracking-tight mb-1">Email</div>
                 <div className="text-xs text-brand font-medium tracking-wide">Direct correspondence</div>
               </div>
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}
