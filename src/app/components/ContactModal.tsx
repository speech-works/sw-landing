"use client";

import React, { useEffect, useState, useRef } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = "hidden";
      // Re-initialize lucide icons if they exist
      if ((window as any).lucide) {
        setTimeout(() => {
          (window as any).lucide.createIcons();
        }, 50);
      }
    } else {
      const timer = setTimeout(() => setIsAnimating(false), 500);
      document.body.style.overflow = "unset";
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
    const maxTilt = 4;
    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;
    modalRef.current.style.transform = `perspective(2000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    modalRef.current.style.transition = "transform 0.1s ease-out";
  };

  const handleMouseLeave = () => {
    if (!modalRef.current) return;
    modalRef.current.style.transform = `perspective(2000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    modalRef.current.style.transition =
      "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
  };

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "opacity-100" : "opacity-0"}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Cinematic Backdrop with Brown Tint */}
      <div
        className="absolute inset-0 bg-[#3F332D]/60 backdrop-blur-xl transition-opacity duration-700"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative w-full max-w-[420px] bg-[#141210] border border-white/5 rounded-[2rem] p-8 md:p-10 shadow-[0_30px_100px_rgba(0,0,0,0.6)] transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-y-0 opacity-100 scale-100" : "translate-y-20 opacity-0 scale-95"}`}
        style={{ willChange: "transform" }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 flex items-center justify-center rounded-full bg-white/5 border border-white/5 hover:bg-white/10 transition-colors duration-300 z-20"
          aria-label="Close"
        >
          <i
            data-lucide="x"
            className="w-4 h-4 text-white/50 hover:text-white transition-colors duration-300"
          ></i>
        </button>

        {/* Real Content Box */}
        <div className="relative z-10 w-full h-full flex flex-col">
          <div className="mb-10">
            <h2 className="text-[10px] md:text-xs font-black tracking-widest uppercase text-brand mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brand"></span>
              Secure Comm Link
            </h2>
            <div className="text-[44px] md:text-[52px] font-black tracking-tighter text-white leading-[0.85] uppercase">
              Initiate <br />
              <span className="text-transparent block mt-1 [-webkit-text-stroke:1px_rgba(255,255,255,0.3)]">
                Protocol.
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {/* WhatsApp Interactive Tile */}
            <a
              href="https://wa.me/917020097491"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-row items-center justify-between w-full rounded-2xl bg-black border border-white/5 hover:border-white/10 p-5 md:p-6 transition-colors duration-300"
            >
              <div className="flex flex-col justify-center">
                <div className="text-[#10b981] font-mono text-[9px] tracking-widest mb-2 uppercase flex items-center gap-2">
                  <i data-lucide="smartphone" className="w-3 h-3"></i>
                  Primary Target / Secure Line
                </div>
                <div className="text-[26px] md:text-[28px] font-black text-white/90 group-hover:text-white tracking-tighter transition-colors duration-300">
                  WhatsApp
                </div>
              </div>

              <div className="w-10 h-10 shrink-0 rounded-full bg-[#1c1a18] flex items-center justify-center group-hover:bg-[#2a2623] transition-colors duration-300">
                <i
                  data-lucide="arrow-right"
                  className="w-4 h-4 text-white/70 group-hover:text-white transition-colors"
                ></i>
              </div>
            </a>

            {/* Email Interactive Tile */}
            <a
              href="mailto:contact@speechworks.in"
              className="group flex flex-row items-center justify-between w-full rounded-2xl bg-black border border-white/5 hover:border-white/10 p-5 md:p-6 transition-colors duration-300"
            >
              <div className="flex flex-col justify-center">
                <div className="text-[#D9692E] font-mono text-[9px] tracking-widest mb-2 uppercase flex items-center gap-2 opacity-80 group-hover:opacity-100">
                  <i data-lucide="globe" className="w-3 h-3"></i>
                  Secondary Relay / Direct Comm
                </div>
                <div className="text-[26px] md:text-[28px] font-black text-white/90 group-hover:text-white tracking-tighter transition-colors duration-300">
                  Email
                </div>
              </div>

              <div className="w-10 h-10 shrink-0 rounded-full bg-[#1c1a18] flex items-center justify-center group-hover:bg-[#2a2623] transition-colors duration-300">
                <i
                  data-lucide="arrow-right"
                  className="w-4 h-4 text-white/70 group-hover:text-white transition-colors"
                ></i>
              </div>
            </a>
          </div>

          <div className="relative z-10 w-full mt-8 md:mt-12">
            <div className="w-full h-[1px] bg-white/5 mb-4"></div>
            <div className="flex justify-between items-center text-[9px] font-mono text-white/40 tracking-widest uppercase">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#10b981] rounded-full"></span>{" "}
                Network Active
              </span>
              <span className="flex items-center gap-1.5">
                <i data-lucide="clock" className="w-3 h-3"></i> T.T.A: 2 Hours
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
