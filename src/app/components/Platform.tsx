'use client';
import React, { useState, useEffect } from 'react';

const features = [
    {
        id: 'progress',
        shortTitle: 'Growth Profile',
        title: 'Pro-Level Progress Tracking',
        desc: "A 5-axis Radar Chart tracking Mastery, Ease, Courage, Confidence, and Social Participation. Leveling up isn't just a number—it’s an expansion of capability. See your growth not as a fluency score, but as a resilience map.",
        tagIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 md:w-3.5 h-3 md:h-3.5"><path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"></path><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path></svg>
        ),
        bgIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>
        ),
        colorTheme: 'brand', 
        bgGradient: 'from-[#FFF5F0] to-[#FFE6D9]',
        iconColor: 'text-brand',
        tagBg: 'bg-white',
        tagBorder: 'border-orange-100',
        activeBar: 'bg-brand',
        mockUI: (
            <div className="absolute -right-2 md:-right-4 -bottom-4 w-[140px] md:w-[170px] p-4 rounded-2xl bg-white/40 backdrop-blur-md border border-white/20 shadow-[0_15px_30px_rgba(0,0,0,0.06)] opacity-0 translate-y-10 group-[.active-stage]:opacity-100 group-[.active-stage]:translate-y-0 transition-all duration-1000 delay-300 antialiased overflow-visible">
                <div className="relative w-full aspect-square flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible relative z-10">
                        {/* Subdued Minimalist Grid */}
                        {[40, 30, 20, 10].map((r, i) => (
                            <circle 
                                key={i}
                                cx="50" cy="50" r={r}
                                fill="none" 
                                stroke="currentColor" 
                                className="text-black/5" 
                                strokeWidth="0.5"
                            />
                        ))}
                        
                        {/* Pizza Slices with Integrated Labels */}
                        {[
                            { r: 44, start: -90, end: -18, label: 'MASTERY', color: 'fill-brand' },
                            { r: 36, start: -18, end: 54, label: 'EASE', color: 'fill-brand/70' },
                            { r: 42, start: 54, end: 126, label: 'COURAGE', color: 'fill-brand' },
                            { r: 32, start: 126, end: 198, label: 'CONFIDENCE', color: 'fill-brand/55' },
                            { r: 39, start: 198, end: 270, label: 'SOCIAL', color: 'fill-brand/80' }
                        ].map((slice, i) => {
                            const x1 = 50 + slice.r * Math.cos(slice.start * Math.PI / 180);
                            const y1 = 50 + slice.r * Math.sin(slice.start * Math.PI / 180);
                            const x2 = 50 + slice.r * Math.cos(slice.end * Math.PI / 180);
                            const y2 = 50 + slice.r * Math.sin(slice.end * Math.PI / 180);
                            return (
                                <path 
                                    key={i}
                                    d={`M 50 50 L ${x1} ${y1} A ${slice.r} ${slice.r} 0 0 1 ${x2} ${y2} Z`}
                                    className={`${slice.color} transition-all duration-[1200ms] opacity-0 group-[.active-stage]:opacity-100 scale-0 group-[.active-stage]:scale-100 ease-[cubic-bezier(0.23,1,0.32,1)]`}
                                    style={{ transitionDelay: `${800 + i * 150}ms`, transformOrigin: '50% 50%' }}
                                />
                            );
                        })}
                    </svg>

                    {/* INTEGRATED DARK TAGS - Positioned at the Rim */}
                    {[
                        { r: 44, start: -90, end: -18, label: 'MASTERY' },
                        { r: 36, start: -18, end: 54, label: 'EASE' },
                        { r: 42, start: 54, end: 126, label: 'COURAGE' },
                        { r: 32, start: 126, end: 198, label: 'CONFIDENCE' },
                        { r: 39, start: 198, end: 270, label: 'SOCIAL' }
                    ].map((slice, i) => {
                        const midAngle = (slice.start + slice.end) / 2;
                        const tx = 50 + (slice.r * 0.9) * Math.cos(midAngle * Math.PI / 180);
                        const ty = 50 + (slice.r * 0.9) * Math.sin(midAngle * Math.PI / 180);
                        
                        return (
                            <div 
                                key={i}
                                className="absolute z-20 transition-all duration-700 opacity-0 group-[.active-stage]:opacity-100 pointer-events-none"
                                style={{ 
                                    left: `${tx}%`, 
                                    top: `${ty}%`, 
                                    transform: 'translate(-50%, -50%)',
                                    transitionDelay: `${1500 + i * 150}ms`
                                }}
                            >
                                <div className="bg-[#3F332D] text-white px-1.5 py-0.5 rounded-[2px] text-[8px] font-black tracking-tight whitespace-nowrap shadow-md border border-white/10">
                                    {slice.label}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )
    },
    {
        id: 'adversarial',
        shortTitle: 'Adversarial AI',
        title: 'The Pressure Test',
        desc: 'Most tools are too "polite." Our AI mimics the friction of real life. It will rush you, misinterpret your silence, and challenge your composure.',
        tagIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 md:w-3.5 h-3 md:h-3.5"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
        ),
        bgIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="M12 20v2"></path><path d="M12 2v2"></path><path d="M17 20v2"></path><path d="M17 2v2"></path><path d="M2 12h2"></path><path d="M2 17h2"></path><path d="M2 7h2"></path><path d="M20 12h2"></path><path d="M20 17h2"></path><path d="M20 7h2"></path><path d="M7 20v2"></path><path d="M7 2v2"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>
        ),
        colorTheme: 'purple-500',
        bgGradient: 'from-purple-50 to-purple-100',
        iconColor: 'text-purple-500',
        tagBg: 'bg-white',
        tagBorder: 'border-purple-200',
        activeBar: 'bg-purple-500',
        mockUI: (
            <div className="absolute -right-2 md:-right-6 top-[45%] -translate-y-1/2 w-[85%] max-w-[280px] flex flex-col gap-2 py-2 opacity-0 translate-x-12 group-[.active-stage]:opacity-100 group-[.active-stage]:translate-x-0 transition-all duration-[800ms] delay-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] antialiased">
                
                {/* Message 1: NPC Interruption */}
                <div className="bg-slate-800 text-white text-[10px] md:text-xs py-2.5 px-3.5 rounded-[1rem] rounded-bl-sm shadow-lg font-medium border border-slate-700 w-fit max-w-[85%] self-start transform transition-all duration-500 opacity-0 group-[.active-stage]:opacity-100 translate-y-3 group-[.active-stage]:translate-y-0" style={{ transitionDelay: '600ms' }}>
                    <span className="font-mono text-[8px] md:text-[9px] text-slate-400 uppercase tracking-widest block mb-0.5 font-bold">[NPC_WAITER]</span>
                    <p className="leading-snug opacity-95">Um, are you ready to order? We have a line forming...</p>
                </div>

                {/* Message 2: The System Challenge */}
                <div className="bg-red-500 text-white text-[10px] md:text-xs py-2.5 px-3.5 rounded-[1rem] rounded-bl-sm shadow-[0_15px_30px_rgba(239,68,68,0.35)] font-medium w-fit max-w-[90%] self-start transform transition-all duration-500 opacity-0 group-[.active-stage]:opacity-100 translate-y-3 group-[.active-stage]:translate-y-0 relative overflow-hidden border border-red-400" style={{ transitionDelay: '1400ms' }}>
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_2s_infinite]" />
                    <span className="font-mono text-[8px] md:text-[9px] text-red-100 bg-red-900/40 px-1 py-0.5 rounded uppercase tracking-widest inline-block mb-1 font-bold">[SYS_OBJECTIVE]</span>
                    <p className="leading-snug font-bold drop-shadow-sm">Friction Detected. Use <span className="underline decoration-white/60 underline-offset-2 decoration-2 cursor-help">Advertising</span> to set a boundary.</p>
                </div>

            </div>
        )
    },
    {
        id: 'stamina',
        shortTitle: 'Biological Stamina',
        title: 'Sustainable Training',
        desc: 'We treat speech mastery like an elite sport. Stamina Guardrails prevent burnout and ensure you only practice at your peak.',
        tagIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 md:w-3.5 h-3 md:h-3.5"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path></svg>
        ),
        bgIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="m11 7-3 5h4l-3 5"></path><path d="M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935"></path><path d="M22 14v-4"></path><path d="M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936"></path></svg>
        ),
        colorTheme: 'emerald-500',
        bgGradient: 'from-emerald-50 to-emerald-100',
        iconColor: 'text-emerald-500',
        tagBg: 'bg-white',
        tagBorder: 'border-emerald-200',
        activeBar: 'bg-emerald-500',
        mockUI: (
            <div className="absolute -right-2 md:-right-8 top-12 w-[220px] md:w-[260px] bg-white p-4 md:p-5 rounded-[2rem] shadow-[0_20px_40px_rgba(16,185,129,0.15)] border border-emerald-100 flex items-center gap-4 opacity-0 translate-x-12 group-[.active-stage]:opacity-100 group-[.active-stage]:translate-y-0 transition-all duration-700 delay-400 antialiased">
                <div className="relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center shrink-0">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                        <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                        <circle 
                            cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="6" fill="transparent" 
                            strokeDasharray="264" 
                            className="text-emerald-500 transition-all duration-[2000ms] drop-shadow-[0_0_8px_rgba(16,185,129,0.4)] [stroke-dashoffset:264] group-[.active-stage]:[stroke-dashoffset:150]" 
                            strokeLinecap="round" 
                        />
                    </svg>
                    <span className="text-emerald-700 font-bold font-mono text-base md:text-lg">42<span className="text-[10px]">%</span></span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">Alert</span>
                    <span className="text-sm md:text-base font-black text-slate-800 leading-tight">Guardrail<br/><span className="text-emerald-500">Active</span></span>
                </div>
            </div>
        )
    },
    {
        id: 'roadmap',
        shortTitle: 'Clinical Packs',
        title: 'Your 0-to-100 Roadmap',
        desc: 'Expert-designed curriculums that follow a strict Clinical Arc. No more guesswork. Our Recommendation Engine audits your unique speech profile and presents the exact "Pack" you need right now.',
        tagIcon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3 md:w-3.5 h-3 md:h-3.5"><circle cx="6" cy="19" r="3"></circle><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path><circle cx="18" cy="5" r="3"></circle></svg>
        ),
        bgIcon: (
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full"><path d="m16 6 4 14"></path><path d="M12 6v14"></path><path d="M8 8v12"></path><path d="M4 4v16"></path></svg>
        ),
        colorTheme: 'brand-dark',
        bgGradient: 'from-brand to-[#D9692E]', // the orange one
        iconColor: 'text-white',
        tagBg: 'bg-white/20',
        tagBorder: 'border-white/30',
        activeBar: 'bg-brand',
        isDark: true,
        mockUI: (
            <div className="absolute -left-6 md:-left-10 -bottom-8 w-[240px] md:w-[280px] bg-white rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.25)] flex flex-col px-6 py-5 gap-4 border border-orange-100/30 opacity-0 translate-y-12 group-[.active-stage]:opacity-100 group-[.active-stage]:translate-y-0 transition-all duration-[1000ms] delay-300 origin-bottom overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-brand/20 to-transparent rounded-full blur-[20px] -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#FFF5F0] flex items-center justify-center text-brand shrink-0 shadow-inner">
                        <span className="font-black text-xl md:text-2xl">1</span>
                    </div>
                    <div className="flex flex-col justify-center w-full">
                        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">Up Next</span>
                        <div className="w-3/4 h-2.5 bg-slate-200 rounded-full mb-1.5" />
                        <div className="w-1/2 h-1.5 bg-slate-100 rounded-full" />
                    </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full mt-2 relative overflow-hidden z-10">
                    <div className="absolute top-0 left-0 h-full bg-brand rounded-full w-0 group-[.active-stage]:w-[85%] transition-all duration-[1500ms] delay-700 ease-[cubic-bezier(0.23,1,0.32,1)]" />
                </div>
            </div>
        )
    }
];

export default function Platform() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    
    // Auto-cycle logic
    const DURATION = 6000; // 6 seconds per slide
    const UPDATE_INTERVAL = 50; 
    
    useEffect(() => {
        if (isHovered) return;
        
        const tick = (UPDATE_INTERVAL / DURATION) * 100;
        
        const timer = setInterval(() => {
            setProgress((prev) => {
                // Return a capped value, the next useEffect will handle the overflow
                if (prev >= 100) return 100;
                return prev + tick;
            });
        }, UPDATE_INTERVAL);
        
        return () => clearInterval(timer);
    }, [activeIndex, isHovered]);

    // Handle the sequence change in a separate effect to avoid React Strict Mode double-invocation bug
    useEffect(() => {
        if (progress >= 100) {
            setActiveIndex((current) => (current + 1) % features.length);
            setProgress(0);
        }
    }, [progress]);

    const handleFeatureClick = (index: number) => {
        setActiveIndex(index);
        setProgress(0);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
        e.currentTarget.style.setProperty('--mouse-x-raw', `${x}`);
        e.currentTarget.style.setProperty('--mouse-y-raw', `${y}`);
    };

    return (
        <section 
            id="platform" 
            className="py-20 md:py-32 bg-[#FFFAF5] relative z-10 border-t border-orange-900/5 group overflow-hidden"
            onMouseMove={handleMouseMove}
            style={{ '--mouse-x': '50%', '--mouse-y': '50%', '--mouse-x-raw': '500', '--mouse-y-raw': '500' } as React.CSSProperties}
        >
            {/* --- Awwwards Experimental X-Ray Hover Core (Titanium Wireframe Theme) --- */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden bg-white">
                
                {/* Default Static Subtle Layer */}
                <div className="absolute inset-0 opacity-100 transition-opacity duration-1000 group-hover:opacity-10">
                    <div className="absolute top-[20%] left-[10%] w-[40%] h-[60%] bg-gradient-to-tr from-brand/5 to-transparent blur-[120px]" />
                </div>

                {/* The Interactive Flashlight Mask Layer */}
                <div 
                    className="absolute inset-0 transition-opacity duration-[1000ms] opacity-0 group-hover:opacity-100"
                    style={{
                        WebkitMaskImage: `radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`,
                        maskImage: `radial-gradient(circle 500px at var(--mouse-x, 50%) var(--mouse-y, 50%), black 0%, transparent 100%)`
                    }}
                >
                    {/* The soft structural core beneath the cursor */}
                    <div 
                        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-zinc-100 via-transparent to-zinc-50 blur-[50px] rounded-full transition-transform duration-75 ease-out"
                        style={{ left: 'var(--mouse-x)', top: 'var(--mouse-y)' }}
                    />
                    {/* Smoothly transitioning dynamic accent matching active tab */}
                    {['#F28044', '#a855f7', '#10b981', '#D9692E'].map((color, idx) => (
                        <div 
                            key={`accent-${idx}`}
                            className={`absolute w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 blur-[40px] rounded-full transition-all duration-1000 ease-in-out mix-blend-multiply ${activeIndex === idx ? 'opacity-100' : 'opacity-0'}`}
                            style={{ 
                                left: 'var(--mouse-x)', top: 'var(--mouse-y)',
                                backgroundColor: `${color}1A` // ~10% opacity
                            }}
                        />
                    ))}

                    {/* Surgical Engineering blueprint grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(161,161,170,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(161,161,170,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(161,161,170,0.2)_1px,transparent_1px)] bg-[size:120px_120px]" />
                    
                    {/* Optical Targeting Rings tracking cursor */}
                    <div 
                        className="absolute w-[2px] h-[2px] -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
                        style={{ left: 'var(--mouse-x)', top: 'var(--mouse-y)' }}
                    >
                        {/* Smoothly transitioning fully-colored crosshair assembly */}
                        {['#F28044', '#a855f7', '#10b981', '#D9692E'].map((color, idx) => {
                            const isCurrent = activeIndex === idx;
                            return (
                                <div 
                                    key={`assembly-${idx}`} 
                                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${isCurrent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                >
                                    <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] border rounded-full animate-spin" style={{ animationDuration: '30s', borderColor: `${color}40` }} />
                                    <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] border rounded-full border-dashed animate-spin" style={{ animationDuration: '40s', animationDirection: 'reverse', borderColor: `${color}20` }} />
                                    <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1px]" style={{ background: `linear-gradient(to right, transparent, ${color}66, transparent)` }} />
                                    <div className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[1px] h-[1000px]" style={{ background: `linear-gradient(to bottom, transparent, ${color}66, transparent)` }} />
                                    <div 
                                        className="absolute inset-0 -translate-x-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full"
                                        style={{ backgroundColor: color, boxShadow: `0 0 15px 3px ${color}66` }}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    {/* Architectural Abstract Typography */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none opacity-[0.03] text-black overflow-hidden font-mono">
                         <div 
                              className="text-[8rem] md:text-[14rem] font-sans font-black tracking-[-0.05em] leading-none whitespace-nowrap transition-transform duration-75 ease-out" 
                              style={{ transform: 'translateX(calc((var(--mouse-x-raw) - 500) * -0.05px))' }}
                          >
                              CLINICAL///ARC
                         </div>
                         <div 
                              className="text-[6rem] md:text-[10rem] font-sans font-black tracking-tighter leading-none whitespace-nowrap transition-transform duration-75 ease-out" 
                              style={{ transform: 'translateX(calc((var(--mouse-x-raw) - 500) * 0.08px))' }}
                          >
                              001.ADVERSARIAL
                         </div>
                    </div>
                </div>

                {/* Fade out masks to merge with top/bottom content */}
                <div className="absolute inset-x-0 top-0 h-32 md:h-48 bg-gradient-to-b from-white via-white/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-32 md:h-48 bg-gradient-to-t from-white via-white/80 to-transparent" />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
                  
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 reveal text-center md:text-left active">
                    <div className="max-w-2xl mx-auto md:mx-0">
                        <h2 className="text-brand font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-3 md:mb-4">Professional Speech Academy</h2>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-none text-app-text">POWERED BY<br />ADVERSARIAL AI.</h3>
                    </div>
                    <p className="text-app-muted font-medium mt-4 md:mt-0 max-w-xs mx-auto md:mx-0 md:text-right text-sm md:text-base">A clinical-grade foundation designed to analyze, challenge, and elevate your speech patterns.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12" 
                     onMouseEnter={() => setIsHovered(true)} 
                     onMouseLeave={() => setIsHovered(false)}
                     onTouchStart={() => setIsHovered(true)}
                     onTouchEnd={() => setIsHovered(false)}>
                    
                    {/* Left Side: Navigation List */}
                    <div className="lg:col-span-5 flex flex-col justify-center space-y-2 lg:pr-8">
                        {features.map((feature, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <button 
                                    key={feature.id}
                                    onClick={() => handleFeatureClick(index)}
                                    className={`relative flex flex-col text-left px-6 lg:px-8 py-5 md:py-6 rounded-2xl transition-all duration-300 w-full outline-none
                                        ${isActive ? 'bg-[#FFFAF5] shadow-sm' : 'hover:bg-black/[0.02]'}
                                    `}
                                >
                                    {/* Active Progress Line */}
                                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 transition-all duration-500 rounded-full overflow-hidden ${isActive ? 'h-[60%] bg-gray-200' : 'h-0 bg-transparent'}`}>
                                        {isActive && (
                                            <div 
                                                className={`w-full absolute bottom-0 left-0 transition-all duration-75 ease-linear ${feature.activeBar}`}
                                                style={{ height: `${progress}%` }}
                                            />
                                        )}
                                    </div>

                                    <h4 className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300 ${isActive ? 'text-app-text' : 'text-app-muted/60 hover:text-app-text/80'}`}>
                                        {feature.title}
                                    </h4>
                                    
                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-48 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'}`}>
                                        <p className="text-app-muted text-sm md:text-base leading-relaxed">{feature.desc}</p>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* Right Side: Visual Stage */}
                    <div className="lg:col-span-7 relative h-[350px] sm:h-[450px] lg:h-auto">
                        
                        {/* 3D Parallax Container */}
                        <div 
                            className="w-full h-full lg:aspect-square xl:aspect-[4/3] relative transition-transform duration-200 ease-out group/stage"
                        >
                            {/* Card Background / Screenshot Bounds */}
                            <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-card-hover border border-orange-100/50">
                                
                                {/* Dynamic Glass Glare Sweep (Inside Card) */}
                                <div 
                                    className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover/stage:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: `radial-gradient(circle 600px at calc(var(--mouse-x-raw) * 1px) calc(var(--mouse-y-raw) * 1px), rgba(255,255,255,0.4) 0%, transparent 60%)`,
                                        mixBlendMode: 'overlay'
                                    }}
                                />

                                {/* Animated Backgrounds / Will be replaced by app screenshots */}
                                {features.map((feature, index) => {
                                    const isActive = index === activeIndex;
                                    return (
                                        <div 
                                            key={`bg-${feature.id}`}
                                            className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} transition-opacity duration-700 ease-in-out flex items-center justify-center`}
                                            style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none', zIndex: isActive ? 10 : 0 }}
                                        >
                                            <div 
                                                className={`absolute w-[80%] h-[80%] opacity-[0.08] ${feature.iconColor} -rotate-6 transition-all duration-[1200ms] ease-out ${isActive ? 'translate-y-0 scale-110' : 'translate-y-20 scale-75 opacity-0'}`}
                                            >
                                                {feature.bgIcon}
                                            </div>
                                            
                                            {/* App Screenshot Placeholder text (optional) */}
                                            {/* <div className="absolute opacity-10 font-bold uppercase tracking-widest text-2xl rotate-12">App Screenshot</div> */}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Overflowing Floating Elements (Outside of overflow-hidden) */}
                            {features.map((feature, index) => {
                                const isActive = index === activeIndex;
                                const isDark = feature.isDark;
                                return (
                                    <div 
                                        key={`content-${feature.id}`}
                                        className={`absolute inset-0 flex flex-col justify-between p-8 md:p-12 transition-all duration-700 ease-in-out group ${isActive ? 'opacity-100 pointer-events-auto active-stage' : 'opacity-0 pointer-events-none'}`}
                                        style={{ zIndex: 20 }}
                                    >
                                            <div 
                                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] md:text-xs font-bold uppercase tracking-widest w-fit shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-[1200ms] ease-out
                                                    ${feature.tagBg} ${feature.tagBorder} ${isDark ? 'text-white' : feature.iconColor}
                                                    ${isActive ? 'translate-y-0' : '-translate-y-8'}
                                                `}
                                            >
                                            {feature.tagIcon} {feature.shortTitle}
                                        </div>
                                        
                                        {/* Dynamic Mock UI injection OUTSIDE the boundary */}
                                        <div 
                                            className="absolute inset-0 pointer-events-none"
                                        >
                                            {feature.mockUI}
                                        </div>
                                        
                                        <div 
                                            className={`self-end mt-auto origin-bottom-right transition-all duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] delay-100 ${isActive ? 'translate-y-0 scale-100' : 'translate-y-4 scale-75 opacity-0'}`} 
                                            style={{ transform: 'translateZ(140px)' }}
                                        >
                                            {isDark && (
                                                <a href="#roadmap" className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-brand flex items-center justify-center hover:bg-brand-50 transition-all transform hover:scale-110 shadow-2xl group/btn pointer-events-auto">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
