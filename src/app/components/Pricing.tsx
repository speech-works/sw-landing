'use client';
import React, { useState, useRef } from 'react';

const CheckIcon = ({ className = "w-5 h-5", prominent = false }: { className?: string, prominent?: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={`${className} ${prominent ? "drop-shadow-sm" : ""}`}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const pricingTiers = [
  {
    theme: "light",
    title: "The Foundation",
    subtitle: "Establish your ground.",
    price: "$0",
    billingStr: "/mo",
    buttonLabel: "LAY THE FOUNDATION",
    features: [
      "One free core exercise per day",
      "Foundational resilience training",
      "Supportive community access",
      "Progress tracking dashboard"
    ],
    cardBg: "bg-white",
  },
  {
    theme: "dark",
    isPopular: true,
    title: "The Catalyst",
    subtitle: "Accelerate your impact & command the room.",
    price: "$11.99",
    billingStr: "/mo",
    buttonLabel: "BECOME A CATALYST",
    features: [
      "Everything in Free",
      "Build resilience with stamina activities",
      "Unlimited community posts",
      "Access to the therapist directory",
      "Unlock advanced speech techniques",
      "Personalized feedback & exercises"
    ],
    cardBg: "bg-[#2A231F]",
  },
  {
    theme: "dark-alt",
    isAnnual: true,
    title: "The Pioneer",
    subtitle: "Commit to the highest standard of lasting resilience.",
    price: "$9.90",
    billingStr: "/mo",
    billingSub: "BILLED ANNUALLY",
    buttonLabel: "PIONEER THE STANDARD",
    features: [
      "Everything in the Catalyst plan",
      "Save with discounted annual rate",
      "Access to exclusive webinars",
      "Early access to beta features",
      "Lead and inspire the community"
    ],
    cardBg: "bg-white",
  }
];

export default function Pricing() {
  const [activeCard, setActiveCard] = useState(1); // Default to Catalyst in the center
  const isHoverLocked = useRef(false);

  // Mapping function for logical circular position: -1 (Left), 0 (Center), 1 (Right)
  const getPos = (i: number, active: number) => {
    if (active === 0) return i === 0 ? 0 : i === 1 ? 1 : -1;
    if (active === 1) return i === 0 ? -1 : i === 1 ? 0 : 1;
    if (active === 2) return i === 0 ? 1 : i === 1 ? -1 : 0;
    return 0;
  };

  const handleCardHover = (i: number) => {
    if (isHoverLocked.current) return;
    if (activeCard === i) return;

    // Lock interactions during the spatial transit to prevent infinite loops when crossing path
    isHoverLocked.current = true;
    setActiveCard(i);
    setTimeout(() => {
      isHoverLocked.current = false;
    }, 700); 
  };

  const getDesktopStyles = (pos: number) => {
    if (pos === 0) {
      return {
        transform: 'translate(-50%, 0) scale(1.05)',
        zIndex: 30,
        opacity: 1,
        filter: 'blur(0px)',
      };
    } else if (pos === -1) {
      return {
        transform: 'translate(calc(-50% - 108%), 20px) scale(0.9)', 
        zIndex: 10,
        opacity: 0.6,
        filter: 'blur(1.5px)',
      };
    } else {
      return {
        transform: 'translate(calc(-50% + 108%), 20px) scale(0.9)',
        zIndex: 10,
        opacity: 0.6,
        filter: 'blur(1.5px)',
      };
    }
  };

  const renderCard = (tier: any, pos: number = 0) => {
    const isDark = tier.theme === "dark";
    const textMain = isDark ? "text-white" : "text-app-text";
    const textMuted = isDark ? "text-white/60" : "text-app-muted";
    
    return (
      <div className={`relative ${tier.cardBg} rounded-[2.5rem] shadow-xl border ${isDark ? 'border-brand/20' : 'border-slate-100'} flex flex-col overflow-hidden h-max min-h-full pb-8 pointer-events-auto`}>
        
        {tier.isPopular && (
          <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-[#2A231F] text-brand px-5 py-1.5 rounded-full text-[10px] font-black tracking-widest z-40 uppercase shadow-md border border-brand/20 whitespace-nowrap">
            Most Popular
          </div>
        )}

        {/* Content Body */}
        <div className={`pt-14 md:pt-16 pb-8 px-8 md:px-10 flex flex-col flex-1 ${tier.cardBg} relative z-30`}>
          <h3 className={`text-xl md:text-2xl font-black ${textMain} mb-2 tracking-tight flex items-center justify-between`}>
            {tier.title}
            {tier.isAnnual && (
              <span className="bg-orange-50 text-brand text-[10px] px-2 py-1 rounded-md uppercase tracking-wider font-extrabold shadow-sm border border-orange-100">
                Annual
              </span>
            )}
          </h3>
          <p className={`text-sm ${textMuted} font-medium mb-6 leading-relaxed`}>{tier.subtitle}</p>

          <div className="flex flex-col mb-8 mt-auto shrink-0">
            <div className="flex items-baseline gap-1">
              <span className={`text-5xl lg:text-6xl font-black ${textMain} tracking-tighter`}>{tier.price}</span>
              <span className={`${textMuted} font-bold`}>{tier.billingStr}</span>
            </div>
            {tier.billingSub && (
              <span className="text-xs font-bold text-brand mt-1.5 uppercase tracking-widest">{tier.billingSub}</span>
            )}
            {!tier.billingSub && (
              <span className="text-xs opacity-0 mt-1.5">spacer</span>
            )}
          </div>

          <button className={`w-full py-4 px-6 rounded-full font-black tracking-wide mb-10 transition-all duration-300 text-xs sm:text-[13px] xl:text-sm uppercase shrink-0 ${
            isDark ? 'bg-brand text-white shadow-lg shadow-brand/20 hover:bg-[#ff8f52]' : 
            'bg-white border-2 border-brand text-brand hover:bg-orange-50'
          }`}>
            {tier.buttonLabel}
          </button>

          <div className={`flex flex-col gap-4 xl:gap-5 ${isDark ? 'text-white/80' : 'text-app-text/80'} text-[13px] font-semibold tracking-wide`}>
            {tier.features.map((feat: string, idx: number) => {
              const isHighlight = feat.includes("Everything in") || feat.includes("Save with");
              return (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-brand mt-0.5 ${
                    isHighlight && isDark ? 'bg-brand text-white shadow-sm' :
                    isHighlight && !isDark ? 'bg-brand text-white shadow-sm' :
                    isDark ? 'bg-white/10' : 'bg-slate-100'
                  }`}>
                    <CheckIcon className="w-3.5 h-3.5" prominent={isHighlight} />
                  </div>
                  <span className={`leading-snug ${isDark ? 'text-white' : 'text-app-text/90'} ${isHighlight ? 'font-bold' : ''}`}>
                    {feat}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="pricing" className="py-24 md:py-32 bg-[#FFFAF5] relative z-10 border-t border-orange-900/5 overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
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
      <div className="max-w-7xl mx-auto px-6 relative w-full flex flex-col items-center">
        
        {/* Core Header */}
        <div className="text-center mb-16 reveal active flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-black/5 shadow-sm text-app-text text-[9px] md:text-[10px] font-bold uppercase tracking-widest mb-4 md:mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse"></span>
            The Movement
          </div>
          <h2 className="text-5xl sm:text-6xl md:text-[5.5rem] font-black text-app-text tracking-tighter leading-[0.9] mb-6">
            FORGE YOUR <br className="hidden md:block" />
            <span className="holo-text drop-shadow-sm">LEGACY.</span>
          </h2>
          <p className="text-app-muted text-lg md:text-xl max-w-2xl mx-auto font-medium">
            Your voice is the most powerful instrument you own. Join a collective of pioneers elevating how you are heard.
          </p>
        </div>


        {/* Mobile/Tablet Stack */}
        <div className="flex lg:hidden flex-col gap-8 w-full max-w-md mx-auto">
          {pricingTiers.map((tier, i) => (
             <div key={`m-${i}`} className="w-full h-auto min-h-[500px]">
               {renderCard(tier)}
             </div>
          ))}
        </div>

        {/* Desktop Interactive Carousel */}
        <div className="hidden lg:block relative w-full h-[650px] max-w-6xl mx-auto mt-6 perspective-1000">
          {pricingTiers.map((tier, i) => {
            const pos = getPos(i, activeCard);
            const style = getDesktopStyles(pos);
            
            return (
              <div 
                key={`d-${i}`}
                onMouseEnter={() => handleCardHover(i)}
                className="absolute top-0 left-1/2 w-full max-w-[340px] xl:max-w-[360px] h-auto min-h-[550px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
                style={style}
              >
                <div className="absolute inset-0 z-50 rounded-[2.5rem]" style={{ pointerEvents: pos === 0 ? 'none' : 'auto' }}></div>
                {renderCard(tier, pos)}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
