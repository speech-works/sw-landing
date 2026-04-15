import Image from "next/image";
import { withBasePath } from "@/app/lib/withBasePath";
import React, { useEffect, useRef, useState } from "react";
import LiveAppMockup from "./LiveAppMockup";
import { useMockDeviceTime } from "./useMockDeviceTime";

const HERO_FAN_SCREEN_KEYFRAMES = `
  @keyframes hero-ai-ripple {
    0% {
      transform: scale(0.72);
      opacity: 0;
    }
    18% {
      opacity: 0.34;
    }
    68% {
      opacity: 0.12;
    }
    100% {
      transform: scale(1.18);
      opacity: 0;
    }
  }
`;

type HeroPhoneId = "left" | "center" | "right";

const HERO_PHONE_SLOT_BY_ACTIVE: Record<
  HeroPhoneId,
  Record<HeroPhoneId, HeroPhoneId>
> = {
  center: {
    left: "left",
    center: "center",
    right: "right",
  },
  left: {
    left: "center",
    center: "left",
    right: "right",
  },
  right: {
    left: "left",
    center: "right",
    right: "center",
  },
};

const HERO_PHONE_SLOT_STYLE: Record<
  HeroPhoneId,
  {
    translateX: number;
    translateY: number;
    rotate: number;
    scale: number;
    zIndex: number;
    opacity: number;
    filter: string;
  }
> = {
  left: {
    translateX: -122,
    translateY: 50,
    rotate: -15,
    scale: 0.955,
    zIndex: 10,
    opacity: 0.98,
    filter: "drop-shadow(0 30px 42px rgba(0,0,0,0.26))",
  },
  center: {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    scale: 1,
    zIndex: 30,
    opacity: 1,
    filter: "drop-shadow(0 42px 58px rgba(0,0,0,0.34))",
  },
  right: {
    translateX: 126,
    translateY: 56,
    rotate: 14,
    scale: 0.955,
    zIndex: 12,
    opacity: 0.98,
    filter: "drop-shadow(0 30px 42px rgba(0,0,0,0.28))",
  },
};

const HERO_PHONE_IDS: HeroPhoneId[] = ["left", "center", "right"];

const HERO_PHONE_COPY: Record<
  HeroPhoneId,
  {
    tab: string;
    eyebrow: string;
    title: string;
    description: string;
    tag: string;
  }
> = {
  left: {
    tab: "Academy",
    eyebrow: "Therapist-led lessons",
    title: "Learn the technique before you test it.",
    description:
      "Structured tutorials, guided steps, and expert teaching make the fundamentals feel practical from day one.",
    tag: "Expert-crafted",
  },
  center: {
    tab: "Dashboard",
    eyebrow: "Daily momentum",
    title: "See your next move in one place.",
    description:
      "Assessments, progress, and your recommended practice flow stay organized so momentum never goes missing.",
    tag: "Progress-led",
  },
  right: {
    tab: "AI Coach",
    eyebrow: "Pressure-tested practice",
    title: "Rehearse with an AI that feels real.",
    description:
      "Step into difficult conversations, handle interruptions, and build steadiness before the real-world moment.",
    tag: "Adversarial mode",
  },
};

export default function Hero() {
  const timeStr = useMockDeviceTime("09:41");
  const [activePhone, setActivePhone] = useState<HeroPhoneId>("center");
  const [hoveredPhone, setHoveredPhone] = useState<HeroPhoneId | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [hasMobileCarouselInteracted, setHasMobileCarouselInteracted] =
    useState(false);
  const activeHeroPhone = HERO_PHONE_COPY[activePhone];
  const activePhoneIndex = Math.max(0, HERO_PHONE_IDS.indexOf(activePhone));
  const mobileTouchStartXRef = useRef<number | null>(null);
  const mobileTouchCurrentXRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mobileMediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => {
      setIsMobileViewport(mobileMediaQuery.matches);
    };

    syncViewport();
    mobileMediaQuery.addEventListener("change", syncViewport);

    return () => {
      mobileMediaQuery.removeEventListener("change", syncViewport);
    };
  }, []);

  useEffect(() => {
    if (isMobileViewport && hasMobileCarouselInteracted) return;

    const intervalId = window.setInterval(() => {
      setActivePhone((currentPhone) => {
        const currentIndex = HERO_PHONE_IDS.indexOf(currentPhone);
        return HERO_PHONE_IDS[(currentIndex + 1) % HERO_PHONE_IDS.length];
      });
    }, 4200);

    return () => window.clearInterval(intervalId);
  }, [hasMobileCarouselInteracted, isMobileViewport]);

  const stopMobileCarouselAutoplay = () => {
    if (isMobileViewport) {
      setHasMobileCarouselInteracted(true);
    }
  };

  const getPhoneStyle = (phoneId: HeroPhoneId) => {
    const slot = HERO_PHONE_SLOT_BY_ACTIVE[activePhone][phoneId];
    const slotStyle = HERO_PHONE_SLOT_STYLE[slot];
    const isHovered = hoveredPhone === phoneId;
    const hoverScaleBoost = isHovered ? 0.045 : 0;
    const transform = `translate3d(${slotStyle.translateX}px, ${
      slotStyle.translateY
    }px, 0) rotate(${slotStyle.rotate}deg) scale(${
      slotStyle.scale + hoverScaleBoost
    })`;

    return {
      zIndex: slotStyle.zIndex,
      opacity: slotStyle.opacity,
      filter: slotStyle.filter,
      transform,
      transformOrigin: "bottom center" as const,
      willChange: "transform, opacity",
      transition:
        "transform 720ms cubic-bezier(0.22, 1, 0.36, 1), opacity 520ms ease, filter 720ms cubic-bezier(0.22, 1, 0.36, 1)",
    };
  };

  const handlePhoneKeyDown =
    (phoneId: HeroPhoneId) => (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setActivePhone(phoneId);
      }
    };

  const handleMobileCarouselTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    stopMobileCarouselAutoplay();
    mobileTouchStartXRef.current = event.touches[0]?.clientX ?? null;
    mobileTouchCurrentXRef.current = null;
  };

  const handleMobileCarouselTouchMove = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    mobileTouchCurrentXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleMobileCarouselTouchEnd = () => {
    if (
      mobileTouchStartXRef.current === null ||
      mobileTouchCurrentXRef.current === null
    ) {
      mobileTouchStartXRef.current = null;
      mobileTouchCurrentXRef.current = null;
      return;
    }

    const swipeDistance =
      mobileTouchStartXRef.current - mobileTouchCurrentXRef.current;

    if (Math.abs(swipeDistance) > 40) {
      if (swipeDistance > 0) {
        setActivePhone(
          HERO_PHONE_IDS[(activePhoneIndex + 1) % HERO_PHONE_IDS.length]
        );
      } else {
        setActivePhone(
          HERO_PHONE_IDS[
            (activePhoneIndex - 1 + HERO_PHONE_IDS.length) %
              HERO_PHONE_IDS.length
          ]
        );
      }
    }

    mobileTouchStartXRef.current = null;
    mobileTouchCurrentXRef.current = null;
  };

  return (
    <>
      {/*  EXPERIMENTAL HERO SECTION: Dark Mode Cinematic Entrance  */}
      <section className="relative flex min-h-[100svh] items-center bg-[#0A0705] overflow-hidden pb-16 pt-[calc(var(--nav-height)+1.5rem)] sm:pt-[calc(var(--nav-height)+2rem)] md:min-h-screen md:pt-32 md:pb-20 z-10">
        <style>{HERO_FAN_SCREEN_KEYFRAMES}</style>

        {/*  Fascinating Background: Floating Gradient Orbs & Kinetic Text  */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/*  Diagonal Kinetic Typography  */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center opacity-[0.04] md:opacity-[0.03] -rotate-6 scale-110 md:scale-125">
            <div className="marquee-container w-full mb-2 md:mb-4">
              <div
                className="marquee-content flex items-center gap-4 md:gap-8 text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none text-white"
                style={{ animationDuration: "30s" }}
              >
                <span>CHANGE THE CONVERSATION</span>
                <span>CHANGE THE CONVERSATION</span>
              </div>
              <div
                className="marquee-content flex items-center gap-4 md:gap-8 text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none text-white"
                style={{ animationDuration: "30s" }}
                aria-hidden="true"
              >
                <span>CHANGE THE CONVERSATION</span>
                <span>CHANGE THE CONVERSATION</span>
              </div>
            </div>
            <div className="marquee-container w-full">
              <div
                className="marquee-content flex items-center gap-4 md:gap-8 text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none text-transparent"
                style={{
                  WebkitTextStroke: "2px white",
                  animationDuration: "40s",
                  animationDirection: "reverse",
                }}
              >
                <span>SPEAK ON YOUR TERMS</span>
                <span>SPEAK ON YOUR TERMS</span>
              </div>
              <div
                className="marquee-content flex items-center gap-4 md:gap-8 text-[15vw] md:text-[12vw] font-black tracking-tighter leading-none text-transparent"
                style={{
                  WebkitTextStroke: "2px white",
                  animationDuration: "40s",
                  animationDirection: "reverse",
                }}
                aria-hidden="true"
              >
                <span>SPEAK ON YOUR TERMS</span>
                <span>SPEAK ON YOUR TERMS</span>
              </div>
            </div>
          </div>

          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute left-0 top-0 z-[1] h-full w-full object-cover object-[58%_18%] opacity-[0.42] saturate-[1.05] contrast-[1.08] brightness-[0.97] sm:object-[54%_16%] md:-top-[2%] md:h-[112%] md:object-center"
          >
            <source
              src={withBasePath("/assets/videos/group_avatars_vid2_loop.mp4")}
              type="video/mp4"
            />
          </video>
          <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_28%,rgba(242,128,68,0.16),transparent_24%),linear-gradient(180deg,rgba(10,7,5,0.72)_0%,rgba(10,7,5,0.42)_28%,rgba(10,7,5,0.58)_62%,rgba(10,7,5,0.82)_100%)]"></div>

          {/*  Glowing Orbs  */}
          <div className="absolute z-[3] top-[-5%] right-[-5%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-brand/30 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse"></div>
          <div
            className="absolute z-[3] bottom-[-10%] left-[-5%] w-[50vw] md:w-[30vw] h-[50vw] md:h-[30vw] bg-purple-600/20 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10 min-w-0">
          <div className="grid min-w-0 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/*  Left Content  */}
            <div className="lg:col-span-8 reveal active relative min-w-0">
              <div className="inline-flex max-w-full items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-brand-100 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6 md:mb-8">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand animate-ping absolute"></span>
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand relative z-10 shadow-[0_0_10px_#F28044]"></span>
                A Movement For Every Voice
              </div>

              <div className="mb-6 md:mb-10 flex w-full max-w-[19rem] pr-2 sm:max-w-[26rem] sm:pr-0 lg:max-w-none flex-col gap-1 md:gap-3 relative min-w-0">
                <div
                  className="block w-full max-w-full whitespace-nowrap text-[clamp(2.05rem,9.6vw,3.15rem)] sm:text-[clamp(2.8rem,11.8vw,4.5rem)] lg:w-auto lg:max-w-none lg:whitespace-normal lg:text-[4.5rem] xl:text-[5.5rem] font-black tracking-[-0.082em] lg:tracking-tighter leading-[0.9] lg:leading-none text-transparent select-none"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
                >
                  CHANGE THE
                </div>
                <h1 className="block w-full max-w-full whitespace-nowrap text-[clamp(2.48rem,11.15vw,3.7rem)] sm:max-w-[7ch] sm:text-[clamp(3.55rem,15vw,5.75rem)] lg:max-w-none lg:text-[5.5rem] xl:text-[6.5rem] font-black tracking-[-0.095em] sm:tracking-[-0.085em] lg:tracking-tighter leading-[0.84] lg:leading-[0.9] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  CONVERSATION.
                </h1>
              </div>

              {/*  Neon Separator  */}
              <div className="w-10 md:w-12 h-1 bg-gradient-to-r from-brand to-purple-500 rounded-full mb-6 md:mb-8 reveal reveal-delay-1 shadow-[0_0_10px_#F28044] active"></div>

              <p className="w-full max-w-none text-[1.02rem] sm:max-w-[24ch] sm:text-xl md:text-2xl text-white/70 leading-7 sm:leading-relaxed lg:max-w-2xl font-light mb-8 md:mb-10 reveal reveal-delay-1 active">
                We are forging a comprehensive ecosystem—AI-powered practice, a
                united community, and expert therapists. Add your voice to the
                movement and{" "}
                <strong className="text-brand font-semibold drop-shadow-md">
                  speak on your terms.
                </strong>
              </p>

              <div className="flex min-w-0 w-full max-w-none flex-col gap-3 sm:max-w-none sm:flex-row sm:gap-4 md:gap-5 reveal reveal-delay-2 active">
                <a
                  href="#download"
                  className="group relative flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full border border-brand bg-brand px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition-all shadow-soft-orange overflow-hidden hover:scale-[1.02] w-full sm:min-h-0 sm:w-auto sm:gap-3 sm:px-6 sm:py-3.5 sm:text-xs sm:tracking-wider md:px-8 md:py-4 md:text-sm"
                >
                  <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full z-0"></div>
                  <span className="relative z-10 group-hover:text-brand transition-colors">
                    Start Your Journey
                  </span>
                </a>
                <a
                  href="#platform"
                  className="flex min-h-[3.25rem] items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-md transition-all shadow-sm hover:bg-white/10 hover:border-white/40 w-full sm:min-h-0 sm:w-auto sm:gap-3 sm:px-6 sm:py-3.5 sm:text-xs sm:tracking-wider md:px-8 md:py-4 md:text-sm"
                >
                  Explore The Academy
                </a>
              </div>

              <div className="mt-10 lg:hidden reveal reveal-delay-3 active min-w-0">
                <div className="mx-auto w-full max-w-[286px]">
                  <div
                    className="relative rounded-[2.75rem] bg-gradient-to-tr from-[#1a1a1a] via-[#353535] to-[#262626] p-[4px] shadow-[0_32px_56px_rgba(0,0,0,0.34)]"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Speechworks mobile showcase"
                    onTouchStart={handleMobileCarouselTouchStart}
                    onTouchMove={handleMobileCarouselTouchMove}
                    onTouchEnd={handleMobileCarouselTouchEnd}
                  >
                    <div className="absolute left-[-4px] top-[102px] h-10 w-[7px] rounded-l-[3px] border-y border-l border-white/10 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] shadow-[1px_0_3px_rgba(0,0,0,0.5)]" />
                    <div className="absolute left-[-4px] top-[165px] h-16 w-[7px] rounded-l-[3px] border-y border-l border-white/10 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] shadow-[1px_0_3px_rgba(0,0,0,0.5)]" />
                    <div className="absolute left-[-4px] top-[246px] h-16 w-[7px] rounded-l-[3px] border-y border-l border-white/10 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] shadow-[1px_0_3px_rgba(0,0,0,0.5)]" />
                    <div className="absolute right-[-4px] top-[192px] h-28 w-[7px] rounded-r-[3px] border-y border-l border-white/10 bg-gradient-to-l from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] shadow-[-1px_0_3px_rgba(0,0,0,0.5)]" />

                    <div className="relative overflow-hidden rounded-[2.45rem] bg-black shadow-[inset_0_0_10px_rgba(255,255,255,0.08)]">
                      <div className="pointer-events-none absolute inset-x-0 top-3 z-[60] flex justify-center">
                        <div className="h-[22px] w-[74px] rounded-full bg-[#050505] shadow-[inset_0_0_1px_rgba(255,255,255,0.08)]" />
                      </div>
                      {activePhone !== "right" && (
                        <>
                          <div className="pointer-events-none absolute inset-x-0 top-0 z-[58] h-[72px] bg-[linear-gradient(180deg,rgba(248,243,237,0.92)_0%,rgba(248,243,237,0.74)_58%,rgba(248,243,237,0)_100%)]" />
                          <div className="pointer-events-none absolute inset-x-0 top-0 z-[59] flex items-center justify-between px-5 pb-2 pt-7 text-[11px] font-bold text-slate-900">
                            <span className="tracking-tight">{timeStr}</span>
                            <div className="flex items-center gap-1">
                              <svg className="h-[9px] w-[15px]" viewBox="0 0 17 10" fill="currentColor">
                                <rect x="0" y="7" width="2.5" height="3" rx="0.5" />
                                <rect x="4" y="5" width="2.5" height="5" rx="0.5" />
                                <rect x="8" y="2.5" width="2.5" height="7.5" rx="0.5" />
                                <rect x="12" y="0" width="2.5" height="10" rx="0.5" />
                              </svg>
                              <svg className="h-[10px] w-[13px]" viewBox="0 0 15 11" fill="currentColor">
                                <path d="M7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11Z" />
                                <path d="M12.11 6.39C10.884 5.16398 9.23199 4.4754 7.5 4.4754C5.76801 4.4754 4.11602 5.16398 2.89 6.39" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                                <path d="M14.61 3.89C12.7239 2.00392 10.166 0.945312 7.5 0.945312C4.83401 0.945312 2.27602 2.00392 0.39 3.89" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                              </svg>
                              <div className="ml-0 flex items-center gap-0.5">
                                <div className="relative h-[9px] w-[18px] rounded-[2.5px] border-[1px] border-black/80 p-[1px]">
                                  <div className="h-full w-[85%] rounded-[1px] bg-black/90" />
                                </div>
                                <div className="h-[3.5px] w-[1px] rounded-r-full bg-black/40" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      <div
                        className="flex h-[496px] will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                        style={{
                          width: `${HERO_PHONE_IDS.length * 100}%`,
                          transform: `translate3d(-${activePhoneIndex * (100 / HERO_PHONE_IDS.length)}%, 0, 0)`,
                        }}
                      >
                        {HERO_PHONE_IDS.map((phoneId) => (
                          <div
                            key={phoneId}
                            className="min-w-0 shrink-0"
                            style={{ width: `${100 / HERO_PHONE_IDS.length}%` }}
                          >
                            {phoneId === "left" && (
                              <div className="relative h-full overflow-hidden bg-[#f8f3ed]">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,183,126,0.14),transparent_24%),radial-gradient(circle_at_24%_82%,rgba(255,226,191,0.28),transparent_32%),linear-gradient(180deg,#f8f3ed_0%,#f7f1e9_48%,#f6efe7_100%)]" />
                                <div className="relative h-full px-4 pb-[6.5rem] pt-[4.4rem]">
                                  <div className="rounded-full bg-white/88 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-[#f27b2a] shadow-sm">
                                    Full Lesson
                                  </div>
                                  <div className="relative mt-3 h-[196px] overflow-hidden rounded-[1.5rem]">
                                    <Image
                                      src={withBasePath("/assets/demo-tut-img.png")}
                                      alt="Speechworks tutorial lesson"
                                      fill
                                      className="object-cover"
                                      sizes="220px"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.18)_28%,rgba(0,0,0,0.42)_68%,rgba(0,0,0,0.66)_100%)]" />
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-[linear-gradient(180deg,rgba(8,6,4,0)_0%,rgba(8,6,4,0.72)_100%)]" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-[rgba(255,255,255,0.16)] shadow-[0_16px_32px_rgba(0,0,0,0.24)] backdrop-blur-md">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/18 bg-[rgba(255,255,255,0.12)] backdrop-blur-sm">
                                          <svg
                                            className="ml-0.5 h-6 w-6 text-white"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                          >
                                            <path d="M8 6.5v11l9-5.5-9-5.5Z" />
                                          </svg>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="absolute inset-x-4 bottom-4 text-white">
                                      <div className="max-w-[10ch] text-lg font-black leading-tight tracking-[-0.04em] drop-shadow-[0_6px_18px_rgba(0,0,0,0.36)]">
                                        Continuous Phonation
                                      </div>
                                      <div className="mt-1 max-w-[18ch] text-sm font-medium leading-[1.35] text-white/92 drop-shadow-[0_4px_16px_rgba(0,0,0,0.32)]">
                                        Therapist-designed walkthroughs that turn technique into repeatable practice.
                                      </div>
                                    </div>
                                  </div>

                                  <div className="mt-4 rounded-[1.45rem] bg-white/88 px-4 py-4 shadow-[0_12px_24px_rgba(61,34,16,0.08)]">
                                    <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#f27b2a]">
                                      Step 1 of 4
                                    </div>
                                    <div className="mt-2 text-[1.05rem] font-black leading-tight tracking-[-0.03em] text-[#34190f]">
                                      Select words or phrases with continuous airflow.
                                    </div>
                                    <div className="mt-4 rounded-full bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a06f49] shadow-sm">
                                      Read. Repeat. Sustain.
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {phoneId === "center" && (
                              <div className="h-full overflow-hidden bg-[#f9fafb]">
                                <LiveAppMockup disableVerticalPan compact hideStatusBar />
                              </div>
                            )}

                            {phoneId === "right" && (
                              <div className="relative flex h-full flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(117,96,207,0.34),transparent_20%),linear-gradient(180deg,#191126_0%,#0f0b19_100%)] px-4 pb-[2.25rem] pt-[3.55rem]">
                                <div className="pointer-events-none absolute right-[-8%] top-[16%] h-40 w-40 rounded-full bg-purple-500/12 blur-[70px]" />
                                <div className="pointer-events-none absolute left-[-10%] bottom-[10%] h-32 w-32 rounded-full bg-brand/12 blur-[65px]" />
                                <div className="relative text-center">
                                  <div className="text-[10px] font-black uppercase tracking-[0.28em] text-white/60">
                                    AI Conversation
                                  </div>
                                  <div className="mt-2 text-[1.45rem] font-black tracking-[-0.04em] text-white">
                                    Order a pizza
                                  </div>
                                </div>

                                <div className="relative mt-4 flex justify-center">
                                  <div className="relative h-[156px] w-[156px]">
                                    <div
                                      className="absolute left-1/2 top-1/2 h-[132px] w-[132px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8a79d6]/18"
                                      style={{ animation: "hero-ai-ripple 3.4s ease-out infinite" }}
                                    />
                                    <div
                                      className="absolute left-1/2 top-1/2 h-[102px] w-[102px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8a79d6]/16"
                                      style={{ animation: "hero-ai-ripple 3.4s ease-out 1.1s infinite" }}
                                    />
                                    <div className="absolute inset-[40px] rounded-full bg-[radial-gradient(circle_at_30%_24%,rgba(117,96,207,0.92),rgba(47,31,102,0.96)_55%,rgba(14,10,40,1)_100%)] shadow-[0_18px_38px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.12)]">
                                      <div className="absolute inset-[8px] rounded-full border border-white/10" />
                                      <div className="absolute inset-0 flex items-center justify-center">
                                        <svg className="h-[30px] w-[30px] text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M12 15a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z" />
                                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                          <path d="M12 19v3" />
                                        </svg>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-3 text-center text-[9px] font-black uppercase tracking-[0.3em] text-white/68">
                                  AI is ready
                                </div>

                                <div className="mx-auto mt-auto flex w-full max-w-[206px] items-center justify-between rounded-full border border-[#7c68cf]/24 bg-[rgba(20,13,60,0.58)] px-3 py-2.5 shadow-[0_20px_38px_rgba(0,0,0,0.3)] backdrop-blur-md">
                                  <span className="pl-1 text-[10px] font-semibold text-white/78">
                                    Pressure-test
                                  </span>
                                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#ef1f57] text-white shadow-[0_14px_28px_rgba(239,31,87,0.46)]">
                                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.07 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.61 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.23a2 2 0 0 1 2.11-.45c.84.28 1.72.49 2.62.61A2 2 0 0 1 22 16.92Z" />
                                      <path d="M4 20 20 4" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="pointer-events-none absolute inset-x-0 bottom-2 z-[60] flex justify-center">
                        <div className="h-1 w-24 rounded-full bg-black/20" />
                      </div>
                    </div>

                    <div
                      className={`pointer-events-none absolute z-[70] ${
                        activePhone === "right"
                          ? "right-[4.5rem] top-[4.35rem] bottom-auto"
                          : "right-12 bottom-5"
                      }`}
                      style={{
                        left: "calc((100% - (100vw - 2rem)) / 2)",
                      }}
                    >
                      <div className="inline-flex max-w-full flex-col gap-2 overflow-hidden rounded-[1.15rem] border border-white/12 bg-[linear-gradient(180deg,rgba(7,7,10,0.42),rgba(7,7,10,0.72))] px-3.5 py-3 shadow-[0_18px_36px_rgba(0,0,0,0.3)] backdrop-blur-xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-brand/20 bg-brand/10 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.16em] text-brand-100">
                            {activeHeroPhone.tag}
                          </span>
                          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-white/48">
                            {activeHeroPhone.eyebrow}
                          </span>
                        </div>
                        <div className="max-w-[16ch] text-[0.98rem] font-black leading-[0.96] tracking-[-0.04em] text-white">
                          {activeHeroPhone.title}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-2.5">
                    {HERO_PHONE_IDS.map((phoneId) => {
                      const isActive = phoneId === activePhone;

                      return (
                        <button
                          key={phoneId}
                          type="button"
                          onClick={() => {
                            stopMobileCarouselAutoplay();
                            setActivePhone(phoneId);
                          }}
                          className="flex h-7 items-center justify-center"
                          aria-label={`Show ${HERO_PHONE_COPY[phoneId].tab} slide`}
                          aria-pressed={isActive}
                        >
                          <span
                            className={`block h-2.5 rounded-full transition-all duration-300 ${
                              isActive
                                ? "w-8 bg-brand shadow-[0_0_18px_rgba(242,128,68,0.5)]"
                                : "w-2.5 bg-white/24"
                            }`}
                          />
                        </button>
                      );
                    })}
                  </div>

                </div>
              </div>
            </div>

            {/*  Realistic Mobile Frame (Ultra-Refined)  */}
            <div className="lg:col-span-4 hidden lg:flex justify-end reveal reveal-delay-3 relative active">
              <div className="relative h-[369px] w-[182px] xl:h-[399px] xl:w-[197px]">
                <div className="absolute right-0 top-0 origin-top-right translate-y-[15%] scale-[0.604]">
                  <div className="relative w-[300px] xl:w-[325px] h-[610px] xl:h-[660px] animate-float transform rotate-[-2deg] group">
                    <div
                      className="absolute left-0 top-0 cursor-pointer"
                      style={getPhoneStyle("left")}
                      onClick={() => setActivePhone("left")}
                      onKeyDown={handlePhoneKeyDown("left")}
                      onMouseEnter={() => setHoveredPhone("left")}
                      onMouseLeave={() =>
                        setHoveredPhone((current) =>
                          current === "left" ? null : current
                        )
                      }
                      onFocus={() => setHoveredPhone("left")}
                      onBlur={() =>
                        setHoveredPhone((current) =>
                          current === "left" ? null : current
                        )
                      }
                      role="button"
                      tabIndex={0}
                      aria-label="Bring tutorial screen to front"
                    >
                      <div className="relative w-[300px] xl:w-[325px] h-[610px] xl:h-[660px]">
                        <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-[#1a1a1a] via-[#3a3a3a] to-[#2a2a2a] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_0_2px_rgba(255,255,255,0.2)]"></div>

                        <div className="absolute top-[85px] -left-[4px] w-[7px] h-9 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                        <div className="absolute top-[140px] -left-[4px] w-[7px] h-14 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                        <div className="absolute top-[210px] -left-[4px] w-[7px] h-14 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                        <div className="absolute top-[160px] -right-[4px] w-[7px] h-24 bg-gradient-to-l from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-r-[3px] border-y border-l border-white/10 shadow-[-1px_0_3px_rgba(0,0,0,0.5)]"></div>

                        <div className="absolute inset-[4px] rounded-[3.25rem] bg-black shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] overflow-hidden">
                          <div className="absolute top-4 inset-x-0 flex justify-center z-[60] pointer-events-none">
                            <div className="w-[85px] h-[26px] bg-[#050505] rounded-[20px] shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-end pr-4">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1c2e] shadow-[0_0_2px_#3b3b4d]"></div>
                            </div>
                          </div>

                          <div className="w-full h-full rounded-[inherit] overflow-hidden relative bg-[#f8f3ed]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(255,183,126,0.14),transparent_24%),radial-gradient(circle_at_24%_82%,rgba(255,226,191,0.28),transparent_32%),linear-gradient(180deg,#f8f3ed_0%,#f7f1e9_48%,#f6efe7_100%)]" />
                            <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 pb-3 pt-6 text-[12px] font-bold text-slate-900">
                              <span className="tracking-tight">{timeStr}</span>
                              <div className="flex items-center gap-1.5">
                                <svg
                                  className="h-[10px] w-[17px]"
                                  viewBox="0 0 17 10"
                                  fill="currentColor"
                                >
                                  <rect
                                    x="0"
                                    y="7"
                                    width="2.5"
                                    height="3"
                                    rx="0.5"
                                  />
                                  <rect
                                    x="4"
                                    y="5"
                                    width="2.5"
                                    height="5"
                                    rx="0.5"
                                  />
                                  <rect
                                    x="8"
                                    y="2.5"
                                    width="2.5"
                                    height="7.5"
                                    rx="0.5"
                                  />
                                  <rect
                                    x="12"
                                    y="0"
                                    width="2.5"
                                    height="10"
                                    rx="0.5"
                                  />
                                </svg>
                                <svg
                                  className="h-[11px] w-[15px]"
                                  viewBox="0 0 15 11"
                                  fill="currentColor"
                                >
                                  <path d="M7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11Z" />
                                  <path
                                    d="M12.11 6.39C10.884 5.16398 9.23199 4.4754 7.5 4.4754C5.76801 4.4754 4.11602 5.16398 2.89 6.39"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M14.61 3.89C12.7239 2.00392 10.166 0.945312 7.5 0.945312C4.83401 0.945312 2.27602 2.00392 0.39 3.89"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <div className="ml-0.5 flex items-center gap-0.5">
                                  <div className="relative h-[10px] w-[20px] rounded-[2.5px] border-[1px] border-black/80 p-[1px]">
                                    <div className="h-full w-[85%] rounded-[1px] bg-black/90"></div>
                                  </div>
                                  <div className="h-[4px] w-[1.5px] rounded-r-full bg-black/40"></div>
                                </div>
                              </div>
                            </div>

                            <div className="absolute inset-x-[18px] top-[86px] bottom-[22px]">
                              <div className="absolute left-0 top-0 flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-[#eee3d4] bg-white/92 shadow-[0_8px_18px_rgba(61,34,16,0.06)]">
                                <svg
                                  className="h-[18px] w-[18px] text-[#4b2918]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m15 18-6-6 6-6" />
                                </svg>
                              </div>
                              <div className="absolute right-0 top-0 flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-[#eee3d4] bg-white/92 shadow-[0_8px_18px_rgba(61,34,16,0.06)]">
                                <svg
                                  className="h-[18px] w-[18px] text-[#4b2918]"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <circle cx="12" cy="12" r="8.5" />
                                  <path d="M12 10v5" />
                                  <circle
                                    cx="12"
                                    cy="7.2"
                                    r="0.8"
                                    fill="currentColor"
                                    stroke="none"
                                  />
                                </svg>
                              </div>

                              <div className="absolute inset-x-[44px] top-[2px] text-center">
                                <div className="text-[18px] font-black tracking-[-0.035em] text-[#34190f]">
                                  Continuous Phonation
                                </div>
                              </div>

                              <div className="absolute inset-x-0 top-[52px] flex items-center gap-3">
                                <div className="flex h-[50px] flex-[1.6] items-center justify-center gap-2 rounded-[18px] bg-gradient-to-r from-[#ff7b1a] to-[#ff5a00] px-4 text-white shadow-[0_12px_22px_rgba(255,102,24,0.22)]">
                                  <svg
                                    className="h-[18px] w-[18px]"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                  <span className="text-[15px] font-bold tracking-[-0.02em]">
                                    Learn
                                  </span>
                                </div>
                                <div className="flex h-[50px] flex-1 items-center justify-center rounded-[18px] border border-[#efe5d8] bg-white/88 shadow-[0_8px_18px_rgba(61,34,16,0.05)]">
                                  <svg
                                    className="h-[21px] w-[21px] text-slate-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.25"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M4.5 10.2v3.6" />
                                    <path d="M7.5 8.2v7.6" />
                                    <path d="M16.5 8.2v7.6" />
                                    <path d="M19.5 10.2v3.6" />
                                    <path d="M9.8 12h4.4" />
                                  </svg>
                                </div>
                                <div className="flex h-[50px] flex-1 items-center justify-center rounded-[18px] border border-[#efe5d8] bg-white/88 shadow-[0_8px_18px_rgba(61,34,16,0.05)]">
                                  <svg
                                    className="h-[21px] w-[21px] text-slate-500"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.15"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  >
                                    <path d="M10.2 7.2C8 7.2 6.2 9.1 6.2 11.3c0 2.1 1.4 3.3 2.7 4.1" />
                                    <path d="M13.8 7.2c2.2 0 4 1.9 4 4.1 0 2.1-1.4 3.3-2.7 4.1" />
                                    <path d="M12 7v9.8" />
                                    <path d="M9.3 10.1v3" />
                                    <path d="M14.7 10.1v3" />
                                  </svg>
                                </div>
                              </div>

                              <div className="absolute inset-x-0 top-[122px] h-[322px] overflow-hidden rounded-[28px] border border-[#eadfce] bg-[#d1c0b0] shadow-[0_20px_36px_rgba(44,27,14,0.15)]">
                                <Image
                                  src={withBasePath("/assets/demo-tut-img.png")}
                                  alt="Tutorial lesson preview"
                                  fill
                                  className="object-cover"
                                  sizes="220px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/18" />
                                <div className="absolute left-[14px] top-[14px] right-[14px] flex items-start justify-between text-white">
                                  <div>
                                    <div className="max-w-[168px] text-[14px] font-medium leading-[1.18] tracking-[-0.02em] drop-shadow-[0_2px_4px_rgba(0,0,0,0.28)]">
                                      Introduction to Continuous Phonation
                                    </div>
                                    <div className="mt-1 text-[11px] font-semibold text-white/88 drop-shadow-[0_2px_4px_rgba(0,0,0,0.28)]">
                                      Full Lesson
                                    </div>
                                  </div>
                                  <div className="text-right text-[11px] font-semibold text-white/88 drop-shadow-[0_2px_4px_rgba(0,0,0,0.28)]">
                                    DUBAI | UAE
                                  </div>
                                </div>
                                <div className="absolute inset-x-[16px] bottom-[24px]">
                                  <div className="inline-flex rounded-[8px] bg-[#ff9d2e] px-3 py-1 text-[18px] font-black leading-none tracking-[-0.03em] text-white shadow-[0_8px_14px_rgba(255,135,35,0.26)]">
                                    Aalia Thobani
                                  </div>
                                  <div className="mt-1.5 inline-block rounded-[6px] bg-[#4a2a1f]/88 px-3 py-1.5 text-[10px] font-medium leading-[1.25] text-white/90">
                                    Speech-Language Pathologist &amp;
                                    <br />
                                    Learning Development Specialist
                                  </div>
                                </div>
                              </div>

                              <div className="absolute inset-x-0 top-[462px] text-[17px] font-black tracking-[-0.03em] text-[#34190f]">
                                Your Learning Path
                              </div>

                              <div className="absolute inset-x-0 top-[500px] h-[126px] overflow-hidden rounded-[28px] border border-white/85 bg-white/96 px-[22px] py-[18px] shadow-[0_16px_32px_rgba(44,27,14,0.08)]">
                                <div className="absolute right-[-12px] top-[-16px] h-[84px] w-[84px] rounded-full bg-[#f8dec9]/45" />
                                <div className="absolute right-[20px] bottom-[18px] h-[34px] w-[34px] rounded-full bg-[#fff2e5]" />
                                <div className="relative text-[10px] font-black uppercase tracking-[0.16em] text-[#f27b2a]">
                                  Step 1
                                </div>
                                <div className="relative mt-2 max-w-[205px] text-[16px] font-black leading-[1.12] tracking-[-0.03em] text-[#34190f]">
                                  Select words or phrases with continuous
                                  airflow.
                                </div>
                                <div className="relative mt-3 flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-[#ff7b1a]" />
                                    <div className="text-[10px] font-semibold text-[#906f56]">
                                      Read, repeat, and sustain.
                                    </div>
                                  </div>
                                  <div className="rounded-full bg-[#fff4ea] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#f27b2a]">
                                    01 / 04
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="absolute bottom-2 inset-x-0 flex justify-center z-50">
                              <div className="w-24 h-1 bg-black/10 rounded-full"></div>
                            </div>
                          </div>
                        </div>

                        <div className="absolute top-10 left-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                        <div className="absolute top-10 right-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                        <div className="absolute bottom-10 left-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                        <div className="absolute bottom-10 right-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                      </div>
                    </div>

                    <div
                      className="absolute left-0 top-0 cursor-pointer"
                      style={getPhoneStyle("right")}
                      onClick={() => setActivePhone("right")}
                      onKeyDown={handlePhoneKeyDown("right")}
                      onMouseEnter={() => setHoveredPhone("right")}
                      onMouseLeave={() =>
                        setHoveredPhone((current) =>
                          current === "right" ? null : current
                        )
                      }
                      onFocus={() => setHoveredPhone("right")}
                      onBlur={() =>
                        setHoveredPhone((current) =>
                          current === "right" ? null : current
                        )
                      }
                      role="button"
                      tabIndex={0}
                      aria-label="Bring AI conversation screen to front"
                    >
                      <div className="relative w-[300px] xl:w-[325px] h-[610px] xl:h-[660px]">
                        <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-[#1a1a1a] via-[#3a3a3a] to-[#2a2a2a] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.46),inset_0_0_2px_rgba(255,255,255,0.16)]"></div>

                        <div className="absolute top-[160px] -left-[4px] w-[7px] h-24 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.45)]"></div>
                        <div className="absolute top-[85px] -right-[4px] w-[7px] h-9 bg-gradient-to-l from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-r-[3px] border-y border-r border-white/10 shadow-[-1px_0_3px_rgba(0,0,0,0.45)]"></div>
                        <div className="absolute top-[140px] -right-[4px] w-[7px] h-14 bg-gradient-to-l from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-r-[3px] border-y border-r border-white/10 shadow-[-1px_0_3px_rgba(0,0,0,0.45)]"></div>
                        <div className="absolute top-[210px] -right-[4px] w-[7px] h-14 bg-gradient-to-l from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-r-[3px] border-y border-r border-white/10 shadow-[-1px_0_3px_rgba(0,0,0,0.45)]"></div>

                        <div className="absolute inset-[4px] rounded-[3.25rem] bg-black shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] overflow-hidden">
                          <div className="absolute top-4 inset-x-0 flex justify-center z-[60] pointer-events-none">
                            <div className="w-[85px] h-[26px] bg-[#050505] rounded-[20px] shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-end pr-4">
                              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1c2e] shadow-[0_0_2px_#3b3b4d]"></div>
                            </div>
                          </div>

                          <div className="w-full h-full rounded-[inherit] overflow-hidden relative bg-[#090a1f]">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_72%,rgba(91,52,197,0.34),transparent_36%),radial-gradient(circle_at_50%_92%,rgba(89,31,176,0.28),transparent_42%),linear-gradient(180deg,#070818_0%,#121236_44%,#2a1365_100%)]" />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_18%,transparent_100%)]" />
                            <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-6 pb-3 pt-6 text-[12px] font-bold text-white/95">
                              <span className="tracking-tight">{timeStr}</span>
                              <div className="flex items-center gap-1.5">
                                <svg
                                  className="h-[10px] w-[17px]"
                                  viewBox="0 0 17 10"
                                  fill="currentColor"
                                >
                                  <rect
                                    x="0"
                                    y="7"
                                    width="2.5"
                                    height="3"
                                    rx="0.5"
                                  />
                                  <rect
                                    x="4"
                                    y="5"
                                    width="2.5"
                                    height="5"
                                    rx="0.5"
                                  />
                                  <rect
                                    x="8"
                                    y="2.5"
                                    width="2.5"
                                    height="7.5"
                                    rx="0.5"
                                  />
                                  <rect
                                    x="12"
                                    y="0"
                                    width="2.5"
                                    height="10"
                                    rx="0.5"
                                  />
                                </svg>
                                <svg
                                  className="h-[11px] w-[15px]"
                                  viewBox="0 0 15 11"
                                  fill="currentColor"
                                >
                                  <path d="M7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11Z" />
                                  <path
                                    d="M12.11 6.39C10.884 5.16398 9.23199 4.4754 7.5 4.4754C5.76801 4.4754 4.11602 5.16398 2.89 6.39"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M14.61 3.89C12.7239 2.00392 10.166 0.945312 7.5 0.945312C4.83401 0.945312 2.27602 2.00392 0.39 3.89"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                                <div className="ml-0.5 flex items-center gap-0.5">
                                  <div className="relative h-[10px] w-[20px] rounded-[2.5px] border-[1px] border-white/85 p-[1px]">
                                    <div className="h-full w-[85%] rounded-[1px] bg-white/95"></div>
                                  </div>
                                  <div className="h-[4px] w-[1.5px] rounded-r-full bg-white/45"></div>
                                </div>
                              </div>
                            </div>

                            <div className="absolute inset-x-[18px] top-[78px] bottom-[18px]">
                              <div className="absolute left-0 top-0 flex h-[38px] w-[38px] items-center justify-center rounded-[14px] border border-white/10 bg-white/8 shadow-[0_8px_18px_rgba(0,0,0,0.18)] backdrop-blur-sm">
                                <svg
                                  className="h-[18px] w-[18px] text-white"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2.6"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <path d="m15 18-6-6 6-6" />
                                </svg>
                              </div>

                              <div className="absolute inset-x-[44px] top-[0px] text-center">
                                <div className="text-[12px] font-medium uppercase tracking-[0.16em] text-white/60">
                                  AI Conversation
                                </div>
                                <div className="mt-1 flex items-center justify-center gap-1.5 text-[18px] font-medium tracking-[-0.03em] text-white">
                                  <span>Order a pizza</span>
                                  <svg
                                    className="mt-0.5 h-[10px] w-[10px] text-white/70"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                  >
                                    <path d="M7 10l5 6 5-6z" />
                                  </svg>
                                </div>
                              </div>

                              <div className="absolute inset-x-0 top-[146px] flex justify-center">
                                <div className="relative h-[292px] w-[292px]">
                                  <div
                                    className="absolute left-1/2 top-1/2 h-[248px] w-[248px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8a79d6]/18"
                                    style={{
                                      animation:
                                        "hero-ai-ripple 3.4s ease-out infinite",
                                    }}
                                  />
                                  <div
                                    className="absolute left-1/2 top-1/2 h-[208px] w-[208px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8a79d6]/16"
                                    style={{
                                      animation:
                                        "hero-ai-ripple 3.4s ease-out 1.1s infinite",
                                    }}
                                  />
                                  <div
                                    className="absolute left-1/2 top-1/2 h-[168px] w-[168px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8a79d6]/14"
                                    style={{
                                      animation:
                                        "hero-ai-ripple 3.4s ease-out 2.2s infinite",
                                    }}
                                  />
                                  <div className="absolute inset-0 rounded-full border border-white/[0.04]" />
                                  <div className="absolute inset-[34px] rounded-full border border-[#8a79d6]/20" />
                                  <div className="absolute inset-[84px] rounded-full bg-[radial-gradient(circle_at_30%_24%,rgba(117,96,207,0.92),rgba(47,31,102,0.96)_55%,rgba(14,10,40,1)_100%)] shadow-[0_18px_38px_rgba(0,0,0,0.46),inset_0_1px_0_rgba(255,255,255,0.12)]">
                                    <div className="absolute inset-[10px] rounded-full border border-white/10" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <svg
                                        className="h-[58px] w-[58px]"
                                        viewBox="0 0 64 64"
                                        fill="none"
                                      >
                                        <path
                                          d="M17 50 29 14c8.8-3.2 18.2-3.2 27 0L43 50c-8.1 2.3-17.9 2.3-26 0Z"
                                          fill="white"
                                        />
                                        <path
                                          d="M28.2 17.2c8-2.8 16.1-2.8 24.2 0"
                                          stroke="#FFB54F"
                                          strokeWidth="4.8"
                                          strokeLinecap="round"
                                        />
                                        <path
                                          d="M28.5 22.2c6.8-2.2 14-2.2 21.2 0"
                                          stroke="#1B1248"
                                          strokeWidth="2.1"
                                          strokeLinecap="round"
                                          opacity="0.6"
                                        />
                                        <circle
                                          cx="35.5"
                                          cy="31"
                                          r="3.1"
                                          fill="#1B1248"
                                        />
                                        <circle
                                          cx="28"
                                          cy="39"
                                          r="2.7"
                                          fill="#1B1248"
                                        />
                                        <circle
                                          cx="41.5"
                                          cy="39"
                                          r="2.9"
                                          fill="#1B1248"
                                        />
                                        <circle
                                          cx="34.2"
                                          cy="41.8"
                                          r="1.6"
                                          fill="#FFB54F"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="absolute inset-x-0 top-[452px] text-center text-[17px] font-medium uppercase tracking-[0.28em] text-white/90">
                                AI IS READY
                              </div>

                              <div className="absolute inset-x-[16px] bottom-[28px] flex items-end justify-center">
                                <div className="relative flex h-[74px] w-full max-w-[252px] items-center justify-between rounded-full border border-[#7c68cf]/20 bg-[rgba(20,13,60,0.46)] px-[26px] shadow-[0_18px_34px_rgba(0,0,0,0.28)] backdrop-blur-md">
                                  <button
                                    type="button"
                                    className="flex h-[42px] w-[42px] items-center justify-center rounded-full text-white/92"
                                    aria-label="Mute microphone"
                                  >
                                    <svg
                                      className="h-[23px] w-[23px]"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2.2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M12 15a3 3 0 0 0 3-3V7a3 3 0 1 0-6 0v5a3 3 0 0 0 3 3Z" />
                                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                      <path d="M12 19v3" />
                                    </svg>
                                  </button>

                                  <div className="absolute left-1/2 top-1/2 flex h-[74px] w-[74px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ef1f57] shadow-[0_12px_26px_rgba(239,31,87,0.42)]">
                                    <svg
                                      className="h-[34px] w-[34px] text-white"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2.2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.07 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.61 2.62a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.46-1.23a2 2 0 0 1 2.11-.45c.84.28 1.72.49 2.62.61A2 2 0 0 1 22 16.92Z" />
                                      <path d="M4 20 20 4" />
                                    </svg>
                                  </div>

                                  <button
                                    type="button"
                                    className="ml-auto flex h-[42px] w-[42px] items-center justify-center rounded-full text-white/78"
                                    aria-label="Open conversation messages"
                                  >
                                    <svg
                                      className="h-[23px] w-[23px]"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2.15"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    >
                                      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="absolute bottom-2 inset-x-0 flex justify-center z-50">
                              <div className="w-24 h-1 bg-white/35 rounded-full"></div>
                            </div>
                          </div>
                        </div>

                        <div className="absolute top-10 left-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                        <div className="absolute top-10 right-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                        <div className="absolute bottom-10 left-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                        <div className="absolute bottom-10 right-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                      </div>
                    </div>

                    <div
                      className="absolute left-0 top-0 cursor-pointer"
                      style={getPhoneStyle("center")}
                      onClick={() => setActivePhone("center")}
                      onKeyDown={handlePhoneKeyDown("center")}
                      onMouseEnter={() => setHoveredPhone("center")}
                      onMouseLeave={() =>
                        setHoveredPhone((current) =>
                          current === "center" ? null : current
                        )
                      }
                      onFocus={() => setHoveredPhone("center")}
                      onBlur={() =>
                        setHoveredPhone((current) =>
                          current === "center" ? null : current
                        )
                      }
                      role="button"
                      tabIndex={0}
                      aria-label="Bring main dashboard screen to front"
                    >
                      <div className="relative w-[300px] xl:w-[325px] h-[610px] xl:h-[660px]">
                        {/* External Chassis (Titanium/Metal Edge) */}
                        <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-[#1a1a1a] via-[#3a3a3a] to-[#2a2a2a] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_0_2px_rgba(255,255,255,0.2)]"></div>

                        {/* Physical Buttons - High-Fidelity Realistic Details */}
                        <div className="pointer-events-none absolute top-[85px] -left-[4px] w-[7px] h-9 rounded-l-[3px] border-y border-l border-white/10 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                        <div className="pointer-events-none absolute top-[140px] -left-[4px] w-[7px] h-14 rounded-l-[3px] border-y border-l border-white/10 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                        <div className="pointer-events-none absolute top-[210px] -left-[4px] w-[7px] h-14 rounded-l-[3px] border-y border-l border-white/10 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                        <div className="pointer-events-none absolute top-[160px] -right-[4px] w-[7px] h-24 rounded-r-[3px] border-y border-l border-white/10 bg-gradient-to-l from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 shadow-[-1px_0_3px_rgba(0,0,0,0.5)]"></div>

                        {/* Inner Bezel (Black Glass Edge) */}
                        <div className="absolute inset-[4px] overflow-hidden rounded-[3.25rem] bg-black shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]">
                          {/* Dynamic Island */}
                          <div className="absolute top-4 inset-x-0 flex justify-center z-[60] pointer-events-none">
                            <div className="w-[85px] h-[26px] bg-[#050505] rounded-[20px] shadow-[inset_0_0_1px_rgba(255,255,255,0.1)] flex items-center justify-end pr-4">
                              {/* Subtle Lens Reflection */}
                              <div className="w-1.5 h-1.5 rounded-full bg-[#1a1c2e] shadow-[0_0_2px_#3b3b4d]"></div>
                            </div>
                          </div>

                          {/* Live Screen Content - SEAMLESS FIT */}
                          <div className="w-full h-full rounded-[inherit] overflow-hidden relative bg-[#f9fafb]">
                            {/* Screen Glass Reflection Overlay */}
                            <div className="absolute inset-0 z-50 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.03] to-white/[0.08] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                            <LiveAppMockup disableVerticalPan />

                            {/* Home Indicator */}
                            <div className="absolute bottom-2 inset-x-0 flex justify-center z-50">
                              <div className="w-24 h-1 bg-black/10 rounded-full"></div>
                            </div>
                          </div>
                        </div>

                        {/* Antenna Bands (Subtle detail) */}
                        <div className="absolute top-10 left-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                        <div className="absolute top-10 right-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                        <div className="absolute bottom-10 left-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                        <div className="absolute bottom-10 right-[45px] w-[2px] h-[3px] bg-white/10 opacity-20"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
