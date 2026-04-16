"use client";

import Image from "next/image";
import { withBasePath } from "@/app/lib/withBasePath";
import React, { useState } from "react";
import ContactModal from "./ContactModal";
import { useIsMobileViewport } from "./useIsMobileViewport";

export default function Footer() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const isMobileViewport = useIsMobileViewport();

  const handleCommunityClick = () => {
    window.dispatchEvent(
      new CustomEvent("speechworks:open-roadmap-phase", {
        detail: { phase: 2 },
      })
    );
  };

  return (
    <>
      <footer className="mobile-content-auto bg-brand pt-16 md:pt-20 pb-8 md:pb-10 relative z-10 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {!isMobileViewport && (
            <video
              className="absolute inset-0 h-full w-full object-cover object-center opacity-[0.7] mix-blend-multiply"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source
                src={withBasePath("/assets/gif/avatars_discussing_loop.mp4")}
                type="video/mp4"
              />
            </video>
          )}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(242,128,68,0.76)_0%,rgba(242,128,68,0.82)_100%)]" />
        </div>
        <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[150%] bg-white/10 blur-[100px] rounded-full pointer-events-none hidden md:block"></div>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12 mb-16 md:mb-20">
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="relative h-8 w-8">
                  <Image
                    src={withBasePath("/assets/logo.png")}
                    alt="Speechworks logo"
                    fill
                    className="object-cover brightness-0 invert"
                    sizes="32px"
                  />
                </div>
                <span className="font-bold text-lg md:text-xl tracking-tight text-white">
                  Speechworks
                </span>
              </div>
              <p className="text-brand-50 font-medium max-w-sm text-sm md:text-base leading-relaxed">
                A radical fusion of AI-sculpted practice, community fuel, and
                expert therapy. Reclaim your voice. Join the rebellion.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 tracking-widest text-[10px] md:text-xs uppercase">
                Platform
              </h4>
              <ul className="space-y-3 md:space-y-4 text-sm font-medium text-brand-100">
                <li>
                  <a
                    href="#platform"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#roadmap"
                    className="hover:text-white transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href="#roadmap"
                    onClick={handleCommunityClick}
                    className="hover:text-white transition-colors"
                  >
                    Community
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4 md:mb-6 tracking-widest text-[10px] md:text-xs uppercase">
                Company
              </h4>
              <ul className="space-y-3 md:space-y-4 text-sm font-medium text-brand-100">
                <li>
                  <a href="#team" className="hover:text-white transition-colors">
                    Team
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {isMobileViewport ? (
          <div className="relative z-10 border-t border-white/20 px-6 pb-6 pt-10 text-center">
            <div className="text-[17vw] font-black tracking-tighter leading-none text-white/92">
              SPEECHWORKS
            </div>
          </div>
        ) : (
          <div className="w-full border-t border-white/20 pt-10 md:pt-16 pb-6 md:pb-8 overflow-hidden flex relative z-10">
            <div className="marquee-container w-full">
              <div className="marquee-content slow flex flex-nowrap items-center text-[18vw] font-black tracking-tighter leading-none select-none py-2 md:py-4">
                <span className="text-white px-4 md:px-8 drop-shadow-sm">
                  SPEECHWORKS
                </span>
                <span className="text-white/30 px-4 md:px-8">•</span>
                <span className="text-white px-4 md:px-8 drop-shadow-sm">
                  SPEECHWORKS
                </span>
                <span className="text-white/30 px-4 md:px-8">•</span>
              </div>
              <div
                className="marquee-content slow flex flex-nowrap items-center text-[18vw] font-black tracking-tighter leading-none select-none py-2 md:py-4"
                aria-hidden="true"
              >
                <span className="text-white px-4 md:px-8 drop-shadow-sm">
                  SPEECHWORKS
                </span>
                <span className="text-white/30 px-4 md:px-8">•</span>
                <span className="text-white px-4 md:px-8 drop-shadow-sm">
                  SPEECHWORKS
                </span>
                <span className="text-white/30 px-4 md:px-8">•</span>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs font-bold tracking-widest uppercase text-brand-100 mt-4 gap-4 md:gap-0">
            <p>© 2026 SPEECHWORKS.</p>
            <div className="flex gap-6 md:gap-8"></div>
          </div>
        </div>
      </footer>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
