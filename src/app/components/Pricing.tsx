"use client";
import React, { useEffect } from "react";

export default function Pricing() {
  useEffect(() => {
    // Ultra-smooth, jitter-free 3D physics for pricing cards
    const cards = document.querySelectorAll<HTMLElement>(
      ".pricing-premium-card",
    );

    // Physics variables
    let bounds: DOMRect;

    cards.forEach((card) => {
      const shine = card.querySelector<HTMLElement>(".pricing-shine");

      const mouseEnter = () => {
        bounds = card.getBoundingClientRect();
        card.style.transition = "none"; // remove transition for immediate 1-to-1 mouse follow
        if (shine) shine.style.opacity = "1";
      };

      const mouseLeave = () => {
        card.style.transition = "transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
        card.style.transform =
          "perspective(1500px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        if (shine) {
          shine.style.opacity = "0";
          shine.style.transition = "opacity 0.8s ease";
        }
      };

      const mouseMove = (e: MouseEvent) => {
        if (!bounds) bounds = card.getBoundingClientRect();
        const mouseX = e.clientX - bounds.left;
        const mouseY = e.clientY - bounds.top;
        const xPct = mouseX / bounds.width - 0.5;
        const yPct = mouseY / bounds.height - 0.5;

        // Gentle rotation: max 8 degrees to prevent jitter or clipping
        const rotateX = yPct * -8;
        const rotateY = xPct * 8;

        card.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

        // Move the shine element purely with translate for high performance
        if (shine) {
          shine.style.transition = "none";
          // Shine needs to follow the mouse inversely or directly
          const shineX = mouseX - bounds.width / 2;
          const shineY = mouseY - bounds.height / 2;
          shine.style.transform = `translate(${shineX}px, ${shineY}px)`;
        }
      };

      card.addEventListener("mouseenter", mouseEnter);
      card.addEventListener("mouseleave", mouseLeave);
      card.addEventListener("mousemove", mouseMove);
    });
  }, []);

  // Reusable SVG for the checkmark to avoid Lucide dependency issues on fast renders
  const CheckIcon = ({ className = "w-5 h-5" }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );

  return (
    <section
      id="pricing"
      className="py-24 md:py-32 bg-[#FFFAF5] relative z-10 border-t border-orange-900/5 group overflow-hidden"
    >
      {/* CSS specific features for this section to keep it isolated from global overrides */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .pricing-premium-card {
            will-change: transform;
            transform-style: preserve-3d;
        }
        .pricing-premium-card::before {
            content: '';
            position: absolute;
            inset: 0;
            border-radius: inherit;
            box-shadow: 0 30px 60px -12px rgba(63, 51, 45, 0.2), 0 18px 36px -18px rgba(0,0,0,0.1);
            opacity: 0;
            transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1);
            pointer-events: none;
            z-index: -1;
        }
        .pricing-premium-card:hover::before {
            opacity: 1;
        }
        .pricing-shine {
            position: absolute;
            top: 50%; left: 50%;
            width: 400px; height: 400px;
            margin-left: -200px; margin-top: -200px;
            background: radial-gradient(circle closest-side, rgba(255,255,255,0.7), transparent);
            opacity: 0;
            mix-blend-mode: soft-light;
            pointer-events: none;
            z-index: 10;
        }
        .pricing-dark-shine {
            background: radial-gradient(circle closest-side, rgba(242, 128, 68, 0.4), transparent);
            mix-blend-mode: screen;
        }
        .glass-btn {
            background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(250,250,250,1) 100%);
            box-shadow: 0 4px 15px -5px rgba(0,0,0,0.1), inset 0 1px 2px rgba(255,255,255,0.8);
        }
        .glass-btn:hover {
            box-shadow: 0 8px 25px -5px rgba(242,128,68,0.25), inset 0 1px 2px rgba(255,255,255,1);
        }
        /* Holographic tag animation */
        @keyframes holo-shimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        .holo-text {
            background: linear-gradient(to right, #F28044 20%, #a855f7 40%, #10b981 60%, #F28044 80%);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            animation: holo-shimmer 4s linear infinite;
        }
      `,
        }}
      />

      {/* Atmospheric Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1200px] h-[600px] pointer-events-none opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/10 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        {/* Modern Interactive Header */}
        <div className="text-center mb-16 md:mb-24 reveal active flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-brand/10 text-brand text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-sm transform transition-transform hover:scale-105">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
            </span>
            THE MOVEMENT
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-[5.5rem] font-black text-app-text tracking-tighter leading-[0.9] mb-6 max-w-4xl mx-auto">
            FORGE YOUR <br className="hidden md:block" />
            <span className="holo-text drop-shadow-sm">LEGACY.</span>
          </h2>
          <p className="text-app-muted text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Your voice is the most powerful instrument you own. Join a
            collective of pioneers elevating how you are heard.
          </p>
        </div>

        {/* Pricing Cards Container */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 max-w-6xl mx-auto items-center">
          {/* Card 1: Free */}
          <div className="pricing-premium-card relative bg-[#ffffff]/60 backdrop-blur-3xl rounded-[2.5rem] p-1 border border-white shadow-xl hover:shadow-2xl transition-shadow flex flex-col h-[90%]">
            <div className="pricing-shine"></div>
            <div className="bg-gradient-to-br from-[#FFFAF5] to-white rounded-[2.3rem] p-8 md:p-10 flex flex-col h-full border border-orange-50 relative overflow-hidden z-10">
              <h3 className="text-xl md:text-2xl font-black text-app-text mb-2 tracking-tight">
                The Foundation
              </h3>
              <p className="text-sm text-app-muted font-medium mb-6">
                Establish your ground.
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl lg:text-6xl font-black text-app-text tracking-tighter">
                  $0
                </span>
                <span className="text-app-muted font-bold">/mo</span>
              </div>

              <button className="glass-btn w-full py-4 px-6 rounded-full text-app-text font-black tracking-wide mb-10 transition-all duration-300 text-xs sm:text-sm">
                LAY THE FOUNDATION
              </button>

              <div className="flex-1 flex flex-col gap-5 text-app-text/80 text-sm font-semibold">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-app-text/90">
                    One free activity per day
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-app-text/90">
                    Foundational resilience training
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-app-text/90">
                    Supportive community access
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-app-text/90">
                    Progress tracking dashboard
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Pro (Focus) */}
          <div className="pricing-premium-card relative bg-gradient-to-br from-brand via-[#D9692E] to-[#b35726] rounded-[2.5rem] p-1 shadow-[0_40px_80px_-20px_rgba(242,128,68,0.5)] transform lg:scale-105 z-20 flex flex-col h-full">
            {/* Dark Shine specifically for the dark card */}
            <div className="pricing-shine pricing-dark-shine"></div>

            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-app-text text-white px-5 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-xl shadow-black/20 z-30 border border-white/10 whitespace-nowrap">
              Most Popular
            </div>

            <div className="bg-[#2A231F] rounded-[2.3rem] p-8 md:p-10 flex flex-col h-full relative overflow-hidden z-10 border border-white/5">
              {/* Atmospheric internal glow */}
              <div className="absolute -right-32 -bottom-32 w-64 h-64 bg-brand/20 blur-[60px] rounded-full pointer-events-none"></div>

              <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">
                The Catalyst
              </h3>
              <p className="text-sm text-white/50 font-medium mb-6">
                Accelerate your impact & command the room.
              </p>

              <div className="flex items-baseline gap-1 mb-8">
                <span className="text-5xl lg:text-6xl font-black text-white tracking-tighter">
                  $11.99
                </span>
                <span className="text-white/50 font-bold">/mo</span>
              </div>

              <button className="w-full py-4 px-6 rounded-full bg-brand text-white font-black tracking-wide mb-10 shadow-[0_10px_20px_rgba(242,128,68,0.3)] hover:shadow-[0_10px_30px_rgba(242,128,68,0.5)] hover:bg-[#ff8f52] transition-all duration-300 text-xs sm:text-sm">
                BECOME A CATALYST
              </button>

              <div className="flex-1 flex flex-col gap-5 text-white/80 text-sm font-semibold">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-white">
                    Everything in Free
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand/20 border border-brand/50 flex items-center justify-center shrink-0 text-brand mt-0.5 shadow-[0_0_15px_rgba(242,128,68,0.5)]">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-white">
                    Build resilience with stamina activities
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-white">
                    Unlimited community posts
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-white">
                    Access to the therapist directory
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-white">
                    Unlock advanced speech techniques
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-white">
                    Personalized feedback & exercises
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Pro Annual */}
          <div className="pricing-premium-card relative bg-[#ffffff]/60 backdrop-blur-3xl rounded-[2.5rem] p-1 border border-white shadow-xl hover:shadow-2xl transition-shadow flex flex-col h-[90%]">
            <div className="pricing-shine"></div>

            <div className="absolute top-6 right-6 hidden xl:flex items-center gap-1.5 opacity-50 font-bold text-xs uppercase tracking-widest text-brand border border-brand/20 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-brand rounded-full"></div>20% OFF
            </div>

            <div className="bg-gradient-to-br from-[#FFFAF5] to-white rounded-[2.3rem] p-8 md:p-10 flex flex-col h-full border border-orange-50 relative overflow-hidden z-10">
              <h3 className="text-xl md:text-2xl font-black text-app-text mb-2 tracking-tight flex items-center gap-2">
                The Pioneer{" "}
                <span className="bg-brand/10 text-brand text-[8px] md:text-[10px] px-2 py-0.5 rounded-sm uppercase tracking-widest border border-brand/20">
                  Annual
                </span>
              </h3>
              <p className="text-sm text-app-muted font-medium mb-6">
                Commit to the highest standard of lasting resilience.
              </p>

              <div className="flex flex-col mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl lg:text-6xl font-black text-app-text tracking-tighter">
                    $9.90
                  </span>
                  <span className="text-app-muted font-bold">/mo</span>
                </div>
                <span className="text-xs font-bold text-brand mt-1 uppercase tracking-widest">
                  Billed Annually
                </span>
              </div>

              <button className="relative w-full py-4 px-6 rounded-full bg-transparent border-2 border-brand text-brand font-black tracking-wide mb-10 overflow-hidden group hover:text-white transition-colors duration-300 text-xs sm:text-sm">
                <div className="absolute inset-0 bg-brand w-0 group-hover:w-full transition-all duration-300 ease-out z-0"></div>
                <span className="relative z-10">PIONEER THE STANDARD</span>
              </button>

              <div className="flex-1 flex flex-col gap-5 text-app-text/80 text-sm font-semibold">
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-app-text/90">
                    Everything in the Pro plan
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand flex items-center justify-center shrink-0 text-white mt-0.5 shadow-[0_0_10px_rgba(242,128,68,0.4)]">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-app-text font-bold">
                    Save with discounted annual rate
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-app-text/90">
                    Access to exclusive webinars
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-app-text/90">
                    Early access to beta features
                  </span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full bg-brand/10 flex items-center justify-center shrink-0 text-brand mt-0.5">
                    <CheckIcon className="w-3.5 h-3.5" />
                  </div>
                  <span className="leading-snug text-app-text/90">
                    Lead and inspire the community
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
