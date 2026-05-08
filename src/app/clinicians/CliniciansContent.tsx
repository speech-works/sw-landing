"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApplyButton from './ApplyButton';

export default function CliniciansContent() {
  const [stageMousePos, setStageMousePos] = useState({ x: 500, y: 500 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStageMousePos({ x, y });
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <main 
      className="min-h-screen flex flex-col bg-[#FFFAF5] text-app-text relative overflow-hidden group"
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
      } as React.CSSProperties}
    >
      {/* Premium Ambient Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-white/50">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[60%] bg-gradient-to-tr from-brand/10 to-transparent blur-[120px] mix-blend-multiply rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] bg-gradient-to-bl from-purple-500/10 to-transparent blur-[120px] mix-blend-multiply rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* X-Ray Mouse Tracking Spotlight */}
        <div
          className="absolute inset-0 transition-opacity duration-1000 opacity-0 group-hover:opacity-100"
          style={{
            WebkitMaskImage: `radial-gradient(circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
            maskImage: `radial-gradient(circle 600px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
          }}
        >
          {/* Spotlight Orbs */}
          <div
            className="absolute w-[800px] h-[800px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-brand/10 via-transparent to-purple-500/5 blur-[80px] rounded-full transition-transform duration-75 ease-out mix-blend-multiply"
            style={{ left: "var(--mouse-x)", top: "var(--mouse-y)" }}
          />

          {/* Grid Overlay inside Spotlight */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(161,161,170,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.15)_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(161,161,170,0.25)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.25)_1px,transparent_1px)] bg-[size:120px_120px]" />
        </div>
      </div>

      <Navbar />

      <section className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-32 md:pt-48 pb-24 relative z-10 flex flex-col items-center">
        
        <div className="mb-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-brand/20 shadow-sm text-app-text text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-center transition-transform hover:scale-105">
          <svg className="w-4 h-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
          Built by people who know trust is part of the product.
        </div>

        {/* Hero Copy - Dramatic Scaling */}
        <div className="text-center max-w-5xl mx-auto mb-20 flex flex-col items-center">
          <h1 className="text-xs md:text-sm font-black text-brand uppercase tracking-[0.25em] mb-6">
            For Speech-Language Pathologists
          </h1>
          <h2 className="text-[clamp(3rem,8vw,6.5rem)] font-black tracking-tighter leading-[0.9] mb-8 text-transparent bg-clip-text bg-gradient-to-br from-app-text via-[#34190f] to-app-muted drop-shadow-sm">
            BUILD THE TOOLS <br />
            YOU WISH EXISTED.
          </h2>
          <p className="text-lg md:text-xl text-app-muted font-medium leading-relaxed max-w-3xl mx-auto">
            Most clinical software is built by engineers who have never managed a caseload, wrestled with point-of-service documentation, or dealt with the "carryover" crisis. We are taking a different approach.
          </p>
        </div>

        {/* Interactive Bento Box Layout */}
        <div className="w-full grid md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          
          {/* Left Bento: The Clinical Reality */}
          <div className="group relative rounded-[2.5rem] bg-white/40 backdrop-blur-3xl border border-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_20px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden p-10 md:p-14 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_30px_60px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500">
            {/* Subtle Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -inset-1 bg-gradient-to-br from-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-white shadow-sm w-fit mb-8 group-hover:scale-105 transition-transform">
                <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-app-text">Context</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-app-text mb-6">
                The Clinical Reality
              </h3>
              <p className="text-[1.05rem] md:text-[1.15rem] text-app-muted leading-relaxed font-medium">
                We are building the backend architecture for a new era of speech therapy—tracking objective progress, simulating adversarial environments, and bridging the massive data gap between the clinic and the living room. But the math means nothing without <strong className="text-app-text font-black">clinical truth</strong>.
              </p>
            </div>
          </div>

          {/* Right Bento: The Invitation */}
          <div className="group relative rounded-[2.5rem] bg-gradient-to-b from-[#1a1412] to-[#0A0705] text-white backdrop-blur-3xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_20px_40px_-15px_rgba(0,0,0,0.4)] overflow-hidden p-10 md:p-14 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_30px_60px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-1 transition-all duration-500">
             {/* Architectural lines/glows inside dark card */}
             <div className="absolute top-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand/30 to-transparent opacity-50" />
             <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand/15 via-transparent to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm w-fit mb-8 group-hover:scale-105 transition-transform">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/80">Opportunity</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-6">
                The Invitation
              </h3>
              <p className="text-[1.05rem] md:text-[1.15rem] text-white/70 leading-relaxed font-medium">
                As we build the clinical portal, we are actively recruiting a tight-knit <strong className="text-white font-black">Founding Clinical Advisory Board (CAB)</strong>. We are looking for 3 to 5 forward-thinking, private practice SLPs who are tired of clunky EMRs and want to steer the development of a platform that actually eliminates administrative friction and drives practice growth.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section - Elevated Glass Cards */}
        <div className="w-full relative rounded-[3rem] bg-white/40 backdrop-blur-3xl border border-white/60 shadow-sm p-8 md:p-16 mb-16">
          <h3 className="text-sm md:text-base font-black tracking-[0.2em] text-center mb-12 uppercase text-brand">
            Advisory Board Benefits
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
            {/* Benefit 1 */}
            <div className="relative group bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(242,128,68,0.1)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-orange-100 to-orange-50 flex items-center justify-center mb-6 shadow-inner border border-orange-200/50 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>
                <h4 className="text-xl font-black mb-3 text-app-text tracking-tight">Direct Influence</h4>
                <p className="text-[0.95rem] text-app-muted font-medium leading-relaxed">
                  Tell us what is broken in your workflow, and watch us engineer the solution.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="relative group bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.1)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center mb-6 shadow-inner border border-purple-200/50 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </div>
                <h4 className="text-xl font-black mb-3 text-app-text tracking-tight">Clinical Status</h4>
                <p className="text-[0.95rem] text-app-muted font-medium leading-relaxed">
                  A formal "Founding Clinical Advisory Board" position for your professional portfolio.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="relative group bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.1)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center mb-6 shadow-inner border border-emerald-200/50 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <h4 className="text-xl font-black mb-3 text-app-text tracking-tight">Exclusive Access</h4>
                <p className="text-[0.95rem] text-app-muted font-medium leading-relaxed">
                  Lifetime free access to the clinical portal for your private practice upon launch.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Global CTA */}
        <div className="flex justify-center z-20 relative">
          <ApplyButton />
        </div>

      </section>

      <Footer />
    </main>
  );
}
