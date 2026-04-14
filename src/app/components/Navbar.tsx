 "use client";

import Image from "next/image";
import React, { useState } from "react";
import ContactModal from "./ContactModal";

export default function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <nav className="fixed w-full z-50 transition-all duration-500 py-2 md:py-4 shadow-sm" id="navbar">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                  {/*  Floating Island Navbar works on both dark hero and light body  */}
                  <div className="flex justify-between items-center backdrop-blur-2xl bg-white/90 border border-orange-900/10 rounded-full px-4 md:px-6 py-2.5 md:py-3 shadow-lg">
                      {/*  Logo  */}
                  <div className="flex items-center gap-2 md:gap-3">
                      <div className="relative h-7 w-7 overflow-hidden rounded-full md:h-8 md:w-8">
                        <Image
                          src="/assets/logo.png"
                          alt="Speechworks logo"
                          fill
                          className="object-cover"
                          sizes="32px"
                        />
                      </div>
                      <span className="font-bold text-base md:text-lg tracking-tight text-app-text">Speechworks</span>
                  </div>
                  
                  {/*  Desktop Links  */}
                      <div className="hidden lg:flex items-center space-x-8">
                          <a href="#roadmap" className="text-xs font-semibold uppercase tracking-widest text-app-muted hover:text-brand transition-colors">Roadmap</a>
                          <a href="#platform" className="text-xs font-semibold uppercase tracking-widest text-app-muted hover:text-brand transition-colors">Platform</a>
                          <button
                            type="button"
                            onClick={() => setIsContactOpen(true)}
                            className="text-xs font-semibold uppercase tracking-widest text-app-muted hover:text-brand transition-colors"
                          >
                            Contact Us
                          </button>
                      </div>
      
                      {/*  CTA (Visible on mobile now)  */}
                      <div className="flex items-center">
                          <a href="#download" className="bg-brand text-white hover:bg-brand-600 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg">
                              Get Access
                          </a>
                      </div>
                  </div>
              </div>
          </nav>
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
