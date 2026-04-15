"use client";
import React, { useState, useRef, useCallback } from "react";
import InviteOnlyModal from "./InviteOnlyModal";
import MobileCarouselControls from "./MobileCarouselControls";

/* ─────────────────────────────────────────────
   REFINED DESIGN SYSTEM UTILS
   Focused on 'Physical' Minimalist Aesthetics
───────────────────────────────────────────── */

const CheckIcon = ({
  className = "w-5 h-5",
  active = false,
}: {
  className?: string;
  active?: boolean;
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={active ? "3" : "2"}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`${className} transition-all duration-300 ${active ? "scale-110" : "scale-100 opacity-60"}`}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const pricingTiers = [
  {
    id: "foundation",
    theme: "light",
    title: "The Foundation",
    subtitle: "Establish your ground.",
    price: "$0",
    billingStr: "/mo",
    buttonLabel: "LAY THE FOUNDATION",
    features: [
      "Five free activities per day",
      "Foundational resilience training",
      "Supportive community access",
      "Progress tracking dashboard",
    ],
    accentColor: "#F28044",
  },
  {
    id: "catalyst",
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
      "Personalized feedback & exercises",
    ],
    accentColor: "#F28044",
  },
  {
    id: "pioneer",
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
      "Lead and inspire the community",
    ],
    accentColor: "#F28044",
  },
];

type PricingTier = (typeof pricingTiers)[number];

export default function Pricing() {
  const [activeCard, setActiveCard] = useState(1);
  const [mobileCard, setMobileCard] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteVariant, setInviteVariant] = useState<"default" | "premium">(
    "default"
  );
  const isHoverLocked = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pricingTouchStartX = useRef<number | null>(null);
  const pricingTouchStartY = useRef<number | null>(null);

  // Track mouse coordinates for the 3D 'Magnetic' Tilt effect
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setMousePos({ x, y });
  }, []);

  const handleCardHover = (i: number) => {
    if (isHoverLocked.current) return;
    if (activeCard === i) return;

    isHoverLocked.current = true;
    setActiveCard(i);
    setTimeout(() => {
      isHoverLocked.current = false;
    }, 700);
  };

  const getDesktopStyles = (pos: number) => {
    // Magnetic Factor: How much the mouse affects the tilt (0.5 = 50%)
    const tiltX = (mousePos.y - 0.5) * 15; // Vertical tilt
    const tiltY = (mousePos.x - 0.5) * -15; // Horizontal tilt

    if (pos === 0) {
      return {
        transform: `translate(-50%, 0) scale(1.05) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)`,
        zIndex: 30,
        opacity: 1,
        filter: "none",
      };
    } else if (pos === -1) {
      return {
        transform:
          "translate(calc(-50% - 110%), 40px) scale(0.85) rotateY(15deg) translateZ(0)",
        zIndex: 10,
        opacity: 0.5,
        filter: "none",
      };
    } else {
      return {
        transform:
          "translate(calc(-50% + 110%), 40px) scale(0.85) rotateY(-15deg) translateZ(0)",
        zIndex: 10,
        opacity: 0.5,
        filter: "none",
      };
    }
  };

  const handleTierClick = (tierId: string) => {
    setInviteVariant(tierId === "foundation" ? "default" : "premium");
    setIsInviteModalOpen(true);
  };

  const showPreviousTier = () => {
    setMobileCard(
      (current) => (current - 1 + pricingTiers.length) % pricingTiers.length
    );
  };

  const showNextTier = () => {
    setMobileCard((current) => (current + 1) % pricingTiers.length);
  };

  const handlePricingTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    pricingTouchStartX.current = touch.clientX;
    pricingTouchStartY.current = touch.clientY;
  };

  const handlePricingTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (
      pricingTouchStartX.current === null ||
      pricingTouchStartY.current === null
    ) {
      return;
    }

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - pricingTouchStartX.current;
    const deltaY = touch.clientY - pricingTouchStartY.current;

    pricingTouchStartX.current = null;
    pricingTouchStartY.current = null;

    if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      showNextTier();
      return;
    }

    showPreviousTier();
  };

  const handlePricingTouchCancel = () => {
    pricingTouchStartX.current = null;
    pricingTouchStartY.current = null;
  };

  const renderCard = (
    tier: PricingTier,
    pos: number = 0,
    compact: boolean = false
  ) => {
    const isActive = pos === 0;
    const isDark = tier.theme === "dark";

    return (
      <div
        key={`${tier.id}-${activeCard}`}
        className={`relative ${compact ? "rounded-[2rem]" : "rounded-[2.8rem]"} transition-all duration-500 flex flex-col pointer-events-auto antialiased
          ${
            isDark
              ? "bg-[#1C1A19] border border-white/[0.06] text-white"
              : "bg-white border border-black/[0.04] text-app-text"
          }`}
        style={{
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
          boxShadow: compact
            ? "none"
            : isActive
              ? isDark
                ? "0 30px 60px -15px rgba(0,0,0,0.8)"
                : "0 30px 60px -15px rgba(63, 51, 45, 0.12)"
              : "0 10px 20px -5px rgba(0,0,0,0.05)",
          minHeight: "100%",
        }}
      >
        {/* Overflowing Right Badge */}
        {(tier.isPopular || tier.isAnnual) && (
          <div
            className={`absolute ${
              compact ? "-top-2 -right-2 px-4 py-1.5 text-[8px]" : "-top-3 -right-3 lg:-top-4 lg:-right-4 px-5 py-2 text-[9px] lg:text-[10px]"
            } rounded-full font-black tracking-[0.2em] z-50 uppercase shadow-xl whitespace-nowrap
            ${isDark ? "bg-brand text-white" : "bg-[#3F332D] text-white"}`}
          >
            {tier.isPopular ? "Most Popular" : "Annual"}
          </div>
        )}

        <div
          className={`flex flex-col flex-1 relative z-20 ${
              compact
                ? "pt-9 pb-7 px-5.5"
                : "pt-14 pb-10 px-8 md:px-12"
          }`}
        >
          <h3
            className={`${compact ? "text-[1.6rem]" : "text-2xl md:text-3xl"} font-black mb-1.5 tracking-tight`}
          >
            {tier.title}
          </h3>
          <p
            className={`${compact ? "text-[12px] mb-6" : "text-sm mb-10"} opacity-60 font-medium leading-relaxed max-w-[90%]`}
          >
            {tier.subtitle}
          </p>

          <div className={`flex flex-col ${compact ? "mb-6" : "mb-10"} mt-auto shrink-0`}>
            <div className="flex items-baseline gap-1.5">
              <span
                className={`${compact ? "text-[3rem]" : "text-6xl md:text-7xl"} font-black tracking-tightest`}
              >
                {tier.price}
              </span>
              <span className={`${compact ? "text-sm" : "text-base"} font-bold opacity-40`}>
                {tier.billingStr}
              </span>
            </div>
            {tier.billingSub && (
              <span className={`text-[10px] font-black text-brand ${compact ? "mt-1.5" : "mt-2"} uppercase tracking-[0.25em]`}>
                {tier.billingSub}
              </span>
            )}
            {!tier.billingSub && <div className="h-4 mt-2" />}
          </div>

          <button
            type="button"
            onClick={() => handleTierClick(tier.id)}
            className={`w-full ${
              compact ? "py-3 px-5 rounded-[0.95rem] mb-7 text-[8.5px]" : "py-4 md:py-5 px-8 rounded-[1.25rem] mb-12 text-[10px] md:text-xs"
            } font-black tracking-[0.15em] transition-all duration-300 uppercase shrink-0 flex items-center justify-center gap-3 group/btn active:scale-[0.97] border-2
            ${
              isDark
                ? "bg-brand border-brand text-white hover:bg-transparent hover:text-brand"
                : "bg-[#3F332D] border-[#3F332D] text-white hover:bg-transparent hover:text-[#3F332D]"
            }`}
          >
            <span>{tier.buttonLabel}</span>
          </button>

          <div className={`flex flex-col ${compact ? "gap-3.5 text-[11.5px]" : "gap-5 text-[13px]"} font-bold tracking-tight`}>
            {tier.features.map((feat: string, idx: number) => {
              const isHighlight =
                feat.includes("Everything in") || feat.includes("Save with");
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-4 transition-all duration-700 ease-out 
                    ${isActive ? "opacity-100 translate-x-0" : "opacity-20 -translate-x-4"}`}
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div
                    className={`${compact ? "w-4.5 h-4.5 rounded-[0.4rem]" : "w-5 h-5 rounded-md"} flex items-center justify-center shrink-0 mt-0.5
                    ${isHighlight ? "bg-brand text-white" : "bg-brand/10 text-brand"}`}
                  >
                    <CheckIcon
                      className={compact ? "w-3 h-3" : "w-3.5 h-3.5"}
                      active={isHighlight && isActive}
                    />
                  </div>
                  <span
                    className={`leading-snug transition-opacity duration-500 ${isHighlight ? "opacity-100 font-black" : "opacity-80"}`}
                  >
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

  const getPos = (i: number, active: number) => {
    if (active === 0) return i === 0 ? 0 : i === 1 ? 1 : -1;
    if (active === 1) return i === 0 ? -1 : i === 1 ? 0 : 1;
    if (active === 2) return i === 0 ? 1 : i === 1 ? -1 : 0;
    return 0;
  };

  return (
    <>
      <section
        id="pricing"
        className="pt-8 pb-8 md:py-40 bg-[#FFFAF5] relative z-10 border-t border-[#3F332D]/5 overflow-hidden"
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
        @keyframes pricing-holo {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
        }
        .holo-text {
            background: linear-gradient(to right, #F28044 20%, #a855f7 40%, #10b981 60%, #F28044 80%);
            background-size: 200% auto;
            color: transparent;
            -webkit-background-clip: text;
            animation: pricing-holo 4s linear infinite;
        }
        .pricing-grid {
            perspective: 2000px;
        }
      `,
          }}
        />

        <div className="max-w-7xl mx-auto px-6 relative w-full flex flex-col items-center">
          {/* Designer Header */}
          <div className="text-center mb-14 md:mb-24 reveal active flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-black/5 shadow-sm text-app-text text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              The Movement
            </div>
            <h2 className="text-6xl sm:text-7xl md:text-[6.5rem] font-black text-app-text tracking-tightest leading-[0.85] mb-10">
              FORGE YOUR <br className="hidden md:block" />
              <span className="holo-text px-2">LEGACY.</span>
            </h2>
            <p className="text-app-muted text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
              Your voice is the most powerful instrument you own. Join a
              collective of pioneers elevating how you are heard.
            </p>
          </div>

          {/* Mobile View */}
          <div
            className="relative lg:hidden w-full max-w-sm mx-auto"
            role="region"
            aria-roledescription="carousel"
            aria-label="Pricing tiers"
            onTouchStart={handlePricingTouchStart}
            onTouchEnd={handlePricingTouchEnd}
            onTouchCancel={handlePricingTouchCancel}
            style={{ touchAction: "pan-y" }}
          >
            <div className="overflow-x-hidden overflow-y-visible pt-4 pb-8">
              <div
                className="flex will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  width: `${pricingTiers.length * 100}%`,
                  transform: `translate3d(-${mobileCard * (100 / pricingTiers.length)}%, 0, 0)`,
                }}
              >
                {pricingTiers.map((tier, i) => (
                  <div
                    key={`m-${i}`}
                    className="shrink-0 px-5"
                    style={{ width: `${100 / pricingTiers.length}%` }}
                  >
                    <div className="mx-auto w-full max-w-[19.75rem] min-h-[478px]">
                      {renderCard(tier, mobileCard === i ? 0 : 1, true)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <MobileCarouselControls
              currentIndex={mobileCard}
              count={pricingTiers.length}
              onPrevious={showPreviousTier}
              onNext={showNextTier}
              onSelect={setMobileCard}
              getItemLabel={(index) => pricingTiers[index].title}
              layout="inline"
            />
          </div>

          {/* Desktop Interactive Stages */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="hidden lg:block relative w-full h-[850px] max-w-6xl mx-auto pricing-grid"
          >
            {pricingTiers.map((tier, i) => {
              const pos = getPos(i, activeCard);
              const style = getDesktopStyles(pos);

              return (
                <div
                  key={`pivot-${i}`}
                  onMouseEnter={() => handleCardHover(i)}
                  onClick={() => handleCardHover(i)}
                  className="absolute top-0 left-1/2 w-full max-w-[360px] xl:max-w-[400px] h-auto min-h-[780px] transition-all duration-700 ease-[cubic-bezier(0.2,1,0.3,1)] cursor-pointer group active:scale-[0.98]"
                  style={style}
                >
                  {/* Visual Depth Lock Shield (prevents interactions while blurred) */}
                  <div
                    className="absolute inset-0 z-50 rounded-[2.8rem]"
                    style={{ pointerEvents: pos === 0 ? "none" : "auto" }}
                  />
                  {renderCard(tier, pos)}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <InviteOnlyModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        variant={inviteVariant}
      />
    </>
  );
}
