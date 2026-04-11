import React from 'react';

export default function Platform() {
  return (
    <>
      <section id="platform" className="py-20 md:py-32 bg-white relative z-10 border-t border-orange-900/5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                  
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 reveal text-center md:text-left active">
                      <div className="max-w-2xl mx-auto md:mx-0">
                          <h2 className="text-brand font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-3 md:mb-4">Professional Speech Academy</h2>
                          <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-none text-app-text">POWERED BY<br />ADVERSARIAL AI.</h3>
                      </div>
                      <p className="text-app-muted font-medium mt-4 md:mt-0 max-w-xs mx-auto md:mx-0 md:text-right text-sm md:text-base">A clinical-grade foundation designed to analyze, challenge, and elevate your speech patterns.</p>
                  </div>
      
                  {/*  Bento Grid  */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                      
                      {/*  Large Feature (Spans 2 cols)  */}
                      <div className="md:col-span-2 bg-[#FFFAF5] border border-orange-100 rounded-[2rem] p-6 sm:p-8 md:p-10 relative overflow-hidden group reveal glow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-500 active" style={{ '--mouse-x': '463px', '--mouse-y': '331.0730743408203px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="trending-up" aria-hidden="true" className="lucide lucide-trending-up absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-40 h-40 md:w-56 md:h-56 text-brand opacity-10 -rotate-12 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg>
                          
                          <div className="relative z-10 flex flex-col h-full justify-between min-h-[220px] md:min-h-[250px]">
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-orange-100 text-brand text-[10px] md:text-xs font-bold uppercase tracking-widest w-fit shadow-sm mb-6 md:mb-8">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="pie-chart" aria-hidden="true" className="lucide lucide-pie-chart w-3 md:w-3.5 h-3 md:h-3.5"><path d="M21 12c.552 0 1.005-.449.95-.998a10 10 0 0 0-8.953-8.951c-.55-.055-.998.398-.998.95v8a1 1 0 0 0 1 1z"></path><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path></svg> Growth Profile
                              </div>
                              <div>
                                  <h4 className="text-xl sm:text-2xl md:text-3xl font-bold text-app-text tracking-tight mb-2 md:mb-3">Pro-Level Progress Tracking</h4>
                                  <p className="text-app-muted font-medium max-w-lg text-sm md:text-base">A 5-axis Radar Chart tracking Mastery, Ease, Courage, Confidence, and Social Participation. Leveling up isn't just a number—it’s an expansion of capability. See your growth not as a fluency score, but as a resilience map.</p>
                              </div>
                          </div>
                      </div>
      
                      {/*  Small Feature 1  */}
                      <div className="group bg-[#FFFAF5] border border-orange-100 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden reveal reveal-delay-1 glow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-500 flex flex-col justify-between min-h-[220px] active" style={{ '--mouse-x': '100.671875px', '--mouse-y': '253.40625px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="cpu" aria-hidden="true" className="lucide lucide-cpu absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 text-purple-500 opacity-10 -rotate-12 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"><path d="M12 20v2"></path><path d="M12 2v2"></path><path d="M17 20v2"></path><path d="M17 2v2"></path><path d="M2 12h2"></path><path d="M2 17h2"></path><path d="M2 7h2"></path><path d="M20 12h2"></path><path d="M20 17h2"></path><path d="M20 7h2"></path><path d="M7 20v2"></path><path d="M7 2v2"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect><rect x="8" y="8" width="8" height="8" rx="1"></rect></svg>
                          
                          <div className="relative z-10 mb-6 md:mb-8">
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-purple-100 text-purple-600 text-[10px] md:text-xs font-bold uppercase tracking-widest w-fit shadow-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="zap" aria-hidden="true" className="lucide lucide-zap w-3 md:w-3.5 h-3 md:h-3.5"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg> Adversarial AI
                              </div>
                          </div>
                          <div className="relative z-10">
                              <h4 className="text-lg md:text-xl font-bold text-app-text tracking-tight mb-2">The Pressure Test</h4>
                              <p className="text-app-muted font-medium text-sm">Most tools are too "polite." Our AI mimics the friction of real life. It will rush you, misinterpret your silence, and challenge your composure.</p>
                          </div>
                      </div>
      
                      {/*  Small Feature 2  */}
                      <div className="group bg-[#FFFAF5] border border-orange-100 rounded-[2rem] p-6 sm:p-8 relative overflow-hidden reveal glow-card hover:-translate-y-1 hover:shadow-card-hover transition-all duration-500 flex flex-col justify-between min-h-[220px] active" style={{ '--mouse-x': '365px', '--mouse-y': '9.51251220703125px' }}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="battery-charging" aria-hidden="true" className="lucide lucide-battery-charging absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 text-emerald-500 opacity-10 -rotate-12 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"><path d="m11 7-3 5h4l-3 5"></path><path d="M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935"></path><path d="M22 14v-4"></path><path d="M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936"></path></svg>
                          
                          <div className="relative z-10 mb-6 md:mb-8">
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-100 text-emerald-600 text-[10px] md:text-xs font-bold uppercase tracking-widest w-fit shadow-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="heart-pulse" aria-hidden="true" className="lucide lucide-heart-pulse w-3 md:w-3.5 h-3 md:h-3.5"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path><path d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"></path></svg> Biological Stamina
                              </div>
                          </div>
                          <div className="relative z-10">
                              <h4 className="text-lg md:text-xl font-bold text-app-text tracking-tight mb-2">Sustainable Training</h4>
                              <p className="text-app-muted font-medium text-sm">We treat speech mastery like an elite sport. Stamina Guardrails prevent burnout and ensure you only practice at your peak.</p>
                          </div>
                      </div>
      
                      {/*  Medium Feature (Spans 2 cols)  */}
                      <div className="group md:col-span-2 bg-brand text-white rounded-[2rem] p-6 sm:p-8 md:p-10 flex flex-col sm:flex-row sm:items-center justify-between reveal reveal-delay-1 shadow-soft-orange hover:-translate-y-1 transition-all duration-500 relative overflow-hidden gap-6 md:gap-8 active">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="library" aria-hidden="true" className="lucide lucide-library absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-48 h-48 md:w-64 md:h-64 text-white opacity-20 -rotate-12 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"><path d="m16 6 4 14"></path><path d="M12 6v14"></path><path d="M8 8v12"></path><path d="M4 4v16"></path></svg>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10"></div>
                          
                          <div className="relative z-10 flex flex-col justify-between h-full">
                              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest w-fit shadow-sm mb-6 md:mb-8 backdrop-blur-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="route" aria-hidden="true" className="lucide lucide-route w-3 md:w-3.5 h-3 md:h-3.5"><circle cx="6" cy="19" r="3"></circle><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"></path><circle cx="18" cy="5" r="3"></circle></svg> Clinical Packs
                              </div>
                              <div>
                                  <h4 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 md:mb-3">Your 0-to-100 Roadmap</h4>
                                  <p className="text-brand-50 font-medium max-w-lg text-sm md:text-base">Expert-designed curriculums that follow a strict Clinical Arc. No more guesswork. Our Recommendation Engine audits your unique speech profile and presents the exact "Pack" you need right now.</p>
                              </div>
                          </div>
                          <div className="relative z-10 self-start sm:self-end mt-2 sm:mt-0">
                              <a href="#roadmap" className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white text-brand flex items-center justify-center hover:bg-brand-50 transition-all transform hover:scale-110 shadow-md">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="arrow-right" aria-hidden="true" className="lucide lucide-arrow-right w-5 h-5 md:w-6 md:h-6"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                              </a>
                          </div>
                      </div>
      
                  </div>
              </div>
          </section>
    </>
  );
}
