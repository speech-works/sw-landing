import React from 'react';

export default function Navbar() {
  return (
    <>
      <nav className="fixed w-full z-50 transition-all duration-500 py-2 md:py-4 shadow-sm" id="navbar">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                  {/*  Floating Island Navbar works on both dark hero and light body  */}
                  <div className="flex justify-between items-center backdrop-blur-2xl bg-white/90 border border-orange-900/10 rounded-full px-4 md:px-6 py-2.5 md:py-3 shadow-lg">
                      {/*  Logo  */}
                  <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-brand flex items-center justify-center text-white font-bold text-xs md:text-sm">S</div>
                      <span className="font-bold text-base md:text-lg tracking-tight text-app-text">Speechworks</span>
                  </div>
                  
                  {/*  Desktop Links  */}
                      <div className="hidden lg:flex items-center space-x-8">
                          <a href="#roadmap" className="text-xs font-semibold uppercase tracking-widest text-app-muted hover:text-brand transition-colors">Roadmap</a>
                          <a href="#platform" className="text-xs font-semibold uppercase tracking-widest text-app-muted hover:text-brand transition-colors">Platform</a>
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
    </>
  );
}
