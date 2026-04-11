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
        activeBar: 'bg-brand'
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
        activeBar: 'bg-purple-500'
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
        activeBar: 'bg-emerald-500'
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
        isDark: true
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

    return (
        <section id="platform" className="py-20 md:py-32 bg-white relative z-10 border-t border-orange-900/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                  
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
                        <div className="w-full h-full lg:aspect-square xl:aspect-[4/3] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden relative shadow-card-hover border border-orange-100/50">
                            
                            {/* Animated Backgrounds */}
                            {features.map((feature, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <div 
                                        key={`bg-${feature.id}`}
                                        className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} transition-opacity duration-700 ease-in-out z-0 flex items-center justify-center`}
                                        style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
                                    >
                                        <div className={`w-[80%] h-[80%] opacity-[0.05] ${feature.iconColor} -rotate-12 scale-110 md:scale-125 transition-transform duration-1000 ${isActive ? 'translate-y-0' : 'translate-y-8'}`}>
                                            {feature.bgIcon}
                                        </div>
                                    </div>
                                );
                            })}
                            
                            {/* Glass Content Overlay */}
                            {features.map((feature, index) => {
                                const isActive = index === activeIndex;
                                const isDark = feature.isDark;
                                return (
                                    <div 
                                        key={`content-${feature.id}`}
                                        className={`absolute inset-0 flex flex-col justify-between p-8 md:p-12 transition-all duration-700 ease-in-out z-10 ${isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}`}
                                    >
                                        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] md:text-xs font-bold uppercase tracking-widest w-fit shadow-sm backdrop-blur-sm
                                            ${feature.tagBg} ${feature.tagBorder} ${isDark ? 'text-white' : feature.iconColor}
                                        `}>
                                            {feature.tagIcon} {feature.shortTitle}
                                        </div>
                                        
                                        <div className="self-end mt-auto origin-bottom-right transition-transform duration-700 delay-100" style={{ transform: isActive ? 'scale(1)' : 'scale(0.8)' }}>
                                            {isDark && (
                                                <a href="#roadmap" className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white text-brand flex items-center justify-center hover:bg-brand-50 transition-all transform hover:scale-110 shadow-lg group">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 group-hover:translate-x-1 transition-transform"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
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
