import type { Metadata } from 'next';
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ApplyButton from './ApplyButton';

export const metadata: Metadata = {
  title: 'Speechworks | Clinical Advisory Board',
  description: 'Build the tools you wish existed. Steer the development of a platform that actually eliminates administrative friction and drives practice growth.',
  openGraph: {
    title: 'Speechworks | Clinical Advisory Board',
    description: 'Build the tools you wish existed. We are recruiting forward-thinking private practice SLPs.',
    url: 'https://speechworks.app/clinicians',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Speechworks | Clinical Advisory Board',
    description: 'Build the tools you wish existed. We are recruiting forward-thinking private practice SLPs.',
  }
};

export default function CliniciansPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#F3F1EC] text-app-text relative overflow-hidden">
      {/* Abstract, muted background aesthetic */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-orange-900/5 to-transparent blur-3xl transform skew-x-12 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3 bg-gradient-to-tr from-brand/5 to-transparent blur-3xl rounded-full translate-y-32 -translate-x-32" />
      </div>

      <Navbar />

      <section className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-32 md:pt-48 pb-20 relative z-10 flex flex-col items-center justify-center">

        {/* Trust Anchor Top */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-orange-900/10 shadow-sm text-app-text text-[10px] md:text-xs font-bold uppercase tracking-widest text-center">
          <svg className="w-4 h-4 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
          Built by people who know trust is part of the product.
        </div>

        {/* Hero Copy */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-sm md:text-base font-black text-brand uppercase tracking-[0.2em] mb-4">
            For Speech-Language Pathologists
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] mb-8">
            BUILD THE TOOLS <br />
            YOU WISH EXISTED.
          </h2>
          <p className="text-lg md:text-xl text-app-muted font-medium leading-relaxed max-w-3xl mx-auto">
            Most clinical software is built by engineers who have never managed a caseload, wrestled with point-of-service documentation, or dealt with the "carryover" crisis. We are taking a different approach.
          </p>
        </div>

        {/* Frosted Glass Content Card */}
        <div className="w-full relative">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white/60" />

          <div className="relative p-8 md:p-16 lg:p-20 flex flex-col gap-16 md:gap-24">

            {/* 2-Column Grid */}
            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              <div className="flex flex-col gap-4">
                <div className="w-12 h-1 bg-brand rounded-full mb-2" />
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                  The Clinical Reality
                </h3>
                <p className="text-base md:text-lg text-app-muted leading-relaxed">
                  We are building the backend architecture for a new era of speech therapy—tracking objective progress, simulating adversarial environments, and bridging the massive data gap between the clinic and the living room. But the math means nothing without clinical truth.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="w-12 h-1 bg-black rounded-full mb-2" />
                <h3 className="text-2xl md:text-3xl font-black tracking-tight">
                  The Invitation
                </h3>
                <p className="text-base md:text-lg text-app-muted leading-relaxed">
                  As we build the clinical portal, we are actively recruiting a tight-knit Founding Clinical Advisory Board (CAB). We are looking for 3 to 5 forward-thinking, private practice SLPs who are tired of clunky EMRs and want to steer the development of a platform that actually eliminates administrative friction and drives practice growth.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

            {/* Perks Section */}
            <div>
              <h3 className="text-xl md:text-2xl font-black tracking-tight text-center mb-10 uppercase tracking-widest text-app-muted">
                Advisory Board Benefits
              </h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white/50 rounded-3xl p-8 border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-2xl bg-orange-100 flex items-center justify-center mb-6">
                    <svg className="w-5 h-5 text-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold mb-3">Direct Influence</h4>
                  <p className="text-sm text-[#525252] font-medium leading-relaxed">
                    Tell us what is broken in your workflow, and watch us engineer the solution.
                  </p>
                </div>

                <div className="bg-white/50 rounded-3xl p-8 border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center mb-6">
                    <svg className="w-5 h-5 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold mb-3">Clinical Status</h4>
                  <p className="text-sm text-[#525252] font-medium leading-relaxed">
                    A formal "Founding Clinical Advisory Board" position for your professional portfolio.
                  </p>
                </div>

                <div className="bg-white/50 rounded-3xl p-8 border border-white/40 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                    <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold mb-3">Exclusive Access</h4>
                  <p className="text-sm text-[#525252] font-medium leading-relaxed">
                    Lifetime free access to the clinical portal for your private practice upon launch.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex justify-center mt-4">
              <ApplyButton />
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
