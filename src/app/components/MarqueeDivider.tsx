import React from 'react';

export default function MarqueeDivider() {
  return (
    <>
      <div className="w-full border-b border-orange-900/5 bg-white py-4 md:py-6 overflow-hidden flex relative z-10 reveal mask-edges active">
              <div className="marquee-container w-full">
                  <div className="marquee-content pr-4 md:pr-8 flex items-center gap-6 md:gap-8 text-app-muted font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm">
                      <span className="whitespace-nowrap">Adversarial AI</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="asterisk" aria-hidden="true" className="lucide lucide-asterisk w-3 h-3 md:w-4 md:h-4 text-brand-100 shrink-0"><path d="M12 6v12"></path><path d="M17.196 9 6.804 15"></path><path d="m6.804 9 10.392 6"></path></svg>
                      <span className="whitespace-nowrap">Speech Audit</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="asterisk" aria-hidden="true" className="lucide lucide-asterisk w-3 h-3 md:w-4 md:h-4 text-brand-100 shrink-0"><path d="M12 6v12"></path><path d="M17.196 9 6.804 15"></path><path d="m6.804 9 10.392 6"></path></svg>
                      <span className="whitespace-nowrap">Clinical Packs</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="asterisk" aria-hidden="true" className="lucide lucide-asterisk w-3 h-3 md:w-4 md:h-4 text-brand-100 shrink-0"><path d="M12 6v12"></path><path d="M17.196 9 6.804 15"></path><path d="m6.804 9 10.392 6"></path></svg>
                      <span className="whitespace-nowrap">Biological Stamina</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="asterisk" aria-hidden="true" className="lucide lucide-asterisk w-3 h-3 md:w-4 md:h-4 text-brand-100 shrink-0"><path d="M12 6v12"></path><path d="M17.196 9 6.804 15"></path><path d="m6.804 9 10.392 6"></path></svg>
                      <span className="whitespace-nowrap">Evidence Based</span>
                  </div>
                  {/* Duplicate for seamless loop */}
                  <div className="marquee-content pr-4 md:pr-8 flex items-center gap-6 md:gap-8 text-app-muted font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] text-xs md:text-sm" aria-hidden="true">
                      <span className="whitespace-nowrap">Adversarial AI</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="asterisk" aria-hidden="true" className="lucide lucide-asterisk w-3 h-3 md:w-4 md:h-4 text-brand-100 shrink-0"><path d="M12 6v12"></path><path d="M17.196 9 6.804 15"></path><path d="m6.804 9 10.392 6"></path></svg>
                      <span className="whitespace-nowrap">Speech Audit</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="asterisk" aria-hidden="true" className="lucide lucide-asterisk w-3 h-3 md:w-4 md:h-4 text-brand-100 shrink-0"><path d="M12 6v12"></path><path d="M17.196 9 6.804 15"></path><path d="m6.804 9 10.392 6"></path></svg>
                      <span className="whitespace-nowrap">Clinical Packs</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="asterisk" aria-hidden="true" className="lucide lucide-asterisk w-3 h-3 md:w-4 md:h-4 text-brand-100 shrink-0"><path d="M12 6v12"></path><path d="M17.196 9 6.804 15"></path><path d="m6.804 9 10.392 6"></path></svg>
                      <span className="whitespace-nowrap">Biological Stamina</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" data-lucide="asterisk" aria-hidden="true" className="lucide lucide-asterisk w-3 h-3 md:w-4 md:h-4 text-brand-100 shrink-0"><path d="M12 6v12"></path><path d="M17.196 9 6.804 15"></path><path d="m6.804 9 10.392 6"></path></svg>
                      <span className="whitespace-nowrap">Evidence Based</span>
                  </div>
              </div>
          </div>
    </>
  );
}
