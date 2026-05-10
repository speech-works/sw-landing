"use client";

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApplyButton from './ApplyButton';
import { AlgorithmTable } from '../components/AlgorithmTable';

export default function CliniciansContent() {
  const [stageMousePos, setStageMousePos] = useState({ x: 500, y: 500 });
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);

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
          For the SLP Tired of Assigning Homework That Doesn&apos;t Stick
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
            You spend six hours a week on documentation. You assign home practice that rarely happens. Your clients achieve clinical fluency, then lose it when they leave the clinic. The infrastructure for the hours between sessions doesn&apos;t exist yet. We&apos;re building it.
          </p>
        </div>

        {/* Unified Glass Content Container */}
        <div
          className="w-full relative overflow-hidden rounded-[2.7rem] border border-[#2e221c] bg-[#120d0a] shadow-[0_16px_36px_-20px_rgba(18,13,10,0.42)] sm:shadow-[0_46px_110px_-58px_rgba(18,13,10,0.92)] p-8 md:p-16 lg:p-20 mb-16 group/container transition-all duration-300 ease-out"
        >
          {/* Subtle Inner Glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(460px_circle_at_var(--mouse-x,72%)_var(--mouse-y,28%),rgba(242,128,68,0.16),transparent_48%),radial-gradient(circle_at_top_left,rgba(242,128,68,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_22%)]" />
            <div className="absolute inset-0 opacity-[0.06] bg-grid" />
          </div>

          {/* Algorithm Table - Moved to top */}
          <AlgorithmTable />

          {/* Elegant Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12 md:my-16 relative z-10" />

          <div className="relative z-10 grid md:grid-cols-2 gap-12 md:gap-20">
            {/* Left Column: The Clinical Reality */}
            <div 
              className={`flex flex-col relative transition-all duration-700 ease-out ${hoveredSide === 'right' ? 'opacity-30 blur-[2px] grayscale-[0.5]' : 'opacity-100'}`}
              onMouseEnter={() => setHoveredSide('left')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 shadow-sm w-fit mb-8 mt-2">
                <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-brand">Context</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-6 flex items-center gap-3">
                The Clinical Reality
              </h3>
              <p className="text-[1.05rem] md:text-[1.15rem] text-white/80 leading-relaxed font-medium">
                We scored our severity model against published clinical norms. We built our exposure hierarchy on evidence-based desensitization research. Our Kalman filters track real-time speech volatility, and we implemented phenotype-aware routing with built-in crisis gates. We did the reading. Now we need clinicians to tell us what we missed.
              </p>
            </div>

            {/* Right Column: The Invitation */}
            <div
              className={`flex flex-col relative group/invite cursor-default transition-all duration-700 ease-out ${hoveredSide === 'left' ? 'opacity-30 blur-[2px] grayscale-[0.5]' : 'opacity-100'}`}
              onMouseEnter={() => setHoveredSide('right')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              {/* Divider for desktop */}
              <div className="hidden md:block absolute -left-6 lg:-left-10 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-brand/20 to-transparent" />
              {/* Divider for mobile */}
              <div className="md:hidden w-full h-[1px] bg-gradient-to-r from-transparent via-brand/20 to-transparent my-4" />

              {/* Scarcity Tracker */}
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 shadow-sm w-fit mb-8 relative overflow-hidden mt-2">
                <div className="flex gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]" /> {/* Locked */}
                  <div className="w-2 h-2 rounded-full bg-white/10 shadow-[inset_0_1px_1px_rgba(0,0,0,0.1)]" /> {/* Locked */}
                  <div className="w-2 h-2 rounded-full bg-brand shadow-[0_0_8px_rgba(234,88,12,0.5)] animate-pulse" /> {/* Open */}
                  <div className="w-2 h-2 rounded-full bg-brand shadow-[0_0_8px_rgba(234,88,12,0.5)] animate-pulse" style={{ animationDelay: "0.2s" }} /> {/* Open */}
                  <div className="w-2 h-2 rounded-full bg-brand shadow-[0_0_8px_rgba(234,88,12,0.5)] animate-pulse" style={{ animationDelay: "0.4s" }} /> {/* Open */}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.22em] text-brand">
                  Exclusive CAB Membership
                </span>
              </div>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-6 flex items-center gap-3">
                The Invitation
                <svg 
                  className={`w-6 h-6 text-brand transition-all duration-700 ease-out ${hoveredSide === 'right' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} 
                  viewBox="0 0 24 24" fill="currentColor" 
                >
                  <path d="M12 2l2.4 7.6 7.6 2.4-7.6 2.4L12 22l-2.4-7.6-7.6-2.4 7.6-2.4L12 2z"/>
                </svg>
              </h3>

              <div className="relative">
                <div className="text-[0.95rem] md:text-[1.1rem] leading-relaxed relative z-10 w-full text-white/70 font-medium transition-colors duration-500">
                  We&apos;re looking for the clinician who has been quietly frustrated by the &quot;carryover gap&quot; for years. Who has a client with 80% clinic fluency and 10% real-world fluency, and no objective bridge between the two. <span className={`font-black transition-all duration-500 ${hoveredSide === 'right' ? 'text-brand drop-shadow-[0_0_8px_rgba(234,88,12,0.2)]' : 'text-white'}`}>Three to five founding advisory members.</span> We have the algorithm. We need the clinical judgment.
                </div>
              </div>
            </div>
          </div>

          {/* Elegant Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-12 md:my-16 relative z-10" />

          {/* Integrated Benefits Section */}
          <div className="relative z-10 w-full">
            <h3 className="text-sm md:text-base font-black tracking-[0.2em] text-center mb-10 md:mb-12 uppercase text-brand">
              Advisory Board Benefits
            </h3>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-10">
              {/* Benefit 1 */}
              <div className="relative group bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(242,128,68,0.15)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-[1.25rem] bg-white/10 flex items-center justify-center mb-6 shadow-inner border border-white/10 group-hover:scale-110 group-hover:border-brand/50 transition-all duration-500">
                    <svg className="w-6 h-6 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-black mb-3 text-white tracking-tight">Direct Influence</h4>
                  <p className="text-[0.95rem] text-white/60 font-medium leading-relaxed">
                    Your caseload problems become our build priorities. You&apos;ll see your feedback ship.
                  </p>
                </div>
              </div>

              {/* Benefit 2 */}
              <div className="relative group bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(168,85,247,0.15)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-[1.25rem] bg-white/10 flex items-center justify-center mb-6 shadow-inner border border-white/10 group-hover:scale-110 group-hover:border-purple-500/50 transition-all duration-500">
                    <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-black mb-3 text-white tracking-tight">Founding Clinical Advisory</h4>
                  <p className="text-[0.95rem] text-white/60 font-medium leading-relaxed">
                    Secure a strategic position shaping the first evidence-backed category for clinical carryover. Influence our algorithmic roadmap and establish your practice as a first-mover.
                  </p>
                </div>
              </div>

              {/* Benefit 3 */}
              <div className="relative group bg-white/5 backdrop-blur-xl rounded-[2rem] p-8 border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.15)] hover:-translate-y-1 transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-[1.25rem] bg-white/10 flex items-center justify-center mb-6 shadow-inner border border-white/10 group-hover:scale-110 group-hover:border-emerald-500/50 transition-all duration-500">
                    <svg className="w-6 h-6 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-black mb-3 text-white tracking-tight">Free Access, Forever</h4>
                  <p className="text-[0.95rem] text-white/60 font-medium leading-relaxed">
                    When we launch the clinical portal, your practice gets full access. No subscription. Forever.
                  </p>
                </div>
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
