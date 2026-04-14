import Image from "next/image";
import React from "react";
import LiveAppMockup from "./LiveAppMockup";
import { useMockDeviceTime } from "./useMockDeviceTime";

const HERO_FAN_SCREEN_KEYFRAMES = `
  @keyframes hero-fan-screen {
    0%, 100% {
      transform: translate3d(-64px, 48px, -40px) rotate(-12deg) scale(0.96);
      opacity: 0.9;
    }
    50% {
      transform: translate3d(-164px, 10px, -40px) rotate(-22deg) scale(0.99);
      opacity: 1;
    }
  }

  @keyframes hero-fan-screen-right {
    0%, 100% {
      transform: translate3d(58px, 50px, -40px) rotate(10deg) scale(0.955);
      opacity: 1;
    }
    50% {
      transform: translate3d(156px, 12px, -40px) rotate(19deg) scale(0.985);
      opacity: 1;
    }
  }

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

export default function Hero() {
  const timeStr = useMockDeviceTime("09:41");

  return (
    <>
      {/*  EXPERIMENTAL HERO SECTION: Dark Mode Cinematic Entrance  */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center pt-28 md:pt-32 pb-16 md:pb-20 z-10 bg-[#0A0705] overflow-hidden">
        <style>{HERO_FAN_SCREEN_KEYFRAMES}</style>

        {/*  Fascinating Background: Floating Gradient Orbs & Kinetic Text  */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.42] saturate-[1.05] contrast-[1.08] brightness-[0.88]"
          >
            <source src="/assets/videos/group_avatars_vid2.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(242,128,68,0.16),transparent_24%),linear-gradient(180deg,rgba(10,7,5,0.72)_0%,rgba(10,7,5,0.42)_28%,rgba(10,7,5,0.58)_62%,rgba(10,7,5,0.82)_100%)]"></div>

          {/*  Glowing Orbs  */}
          <div className="absolute top-[-5%] right-[-5%] w-[60vw] md:w-[40vw] h-[60vw] md:h-[40vw] bg-brand/30 rounded-full blur-[80px] md:blur-[120px] mix-blend-screen animate-pulse"></div>
          <div
            className="absolute bottom-[-10%] left-[-5%] w-[50vw] md:w-[30vw] h-[50vw] md:h-[30vw] bg-purple-600/20 rounded-full blur-[60px] md:blur-[100px] mix-blend-screen animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/*  Diagonal Kinetic Typography  */}
          <div className="absolute inset-0 flex flex-col justify-center opacity-[0.04] md:opacity-[0.03] -rotate-6 scale-110 md:scale-125">
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
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
            {/*  Left Content  */}
            <div className="lg:col-span-8 reveal active">
              <div className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl text-brand-100 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-6 md:mb-8">
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand animate-ping absolute"></span>
                <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-brand relative z-10 shadow-[0_0_10px_#F28044]"></span>
                A Movement For Every Voice
              </div>

              <div className="mb-6 md:mb-10 flex flex-col gap-1 md:gap-3 relative">
                <div
                  className="text-[12vw] sm:text-[10vw] lg:text-[4.5rem] xl:text-[5.5rem] font-black tracking-tighter leading-none text-transparent select-none"
                  style={{ WebkitTextStroke: "1px rgba(255,255,255,0.4)" }}
                >
                  CHANGE THE
                </div>
                <h1 className="text-[13vw] sm:text-[11vw] lg:text-[5.5rem] xl:text-[6.5rem] font-black tracking-tighter leading-[0.9] text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                  CONVERSATION.
                </h1>
              </div>

              {/*  Neon Separator  */}
              <div className="w-10 md:w-12 h-1 bg-gradient-to-r from-brand to-purple-500 rounded-full mb-6 md:mb-8 reveal reveal-delay-1 shadow-[0_0_10px_#F28044] active"></div>

              <p className="text-lg sm:text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl font-light mb-8 md:mb-10 reveal reveal-delay-1 active">
                We are forging a comprehensive ecosystem—AI-powered practice, a
                united community, and expert therapists. Add your voice to the
                movement and{" "}
                <strong className="text-brand font-semibold drop-shadow-md">
                  speak on your terms.
                </strong>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 md:gap-5 reveal reveal-delay-2 w-full sm:w-auto active">
                <a
                  href="#download"
                  className="group relative flex items-center justify-center gap-3 px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider transition-all shadow-soft-orange overflow-hidden bg-brand border border-brand text-white hover:scale-105 w-full sm:w-auto"
                >
                  <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full z-0"></div>
                  <span className="relative z-10 group-hover:text-brand transition-colors">
                    Start Your Journey
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    data-lucide="arrow-right"
                    aria-hidden="true"
                    className="lucide lucide-arrow-right w-3.5 h-3.5 md:w-4 md:h-4 relative z-10 group-hover:text-brand group-hover:translate-x-1 transition-all"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </a>
                <a
                  href="#platform"
                  className="flex items-center justify-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-full font-bold text-xs md:text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/40 transition-all shadow-sm w-full sm:w-auto"
                >
                  Explore The Academy
                </a>
              </div>
            </div>

            {/*  Realistic Mobile Frame (Ultra-Refined)  */}
            <div className="lg:col-span-4 hidden lg:flex justify-end reveal reveal-delay-3 relative active">
              <div className="relative h-[369px] w-[182px] xl:h-[399px] xl:w-[197px]">
                <div className="absolute right-0 top-0 origin-top-right translate-y-[15%] scale-[0.604]">
                  <div className="relative w-[300px] xl:w-[325px] h-[610px] xl:h-[660px] animate-float transform rotate-[-2deg] hover:rotate-0 transition-transform duration-700 hover:scale-105 group">
                    <div
                      className="absolute left-0 top-0 z-0"
                      style={{
                        animation:
                          "hero-fan-screen 5.6s cubic-bezier(0.45, 0.05, 0.2, 1) infinite",
                        transformOrigin: "bottom center",
                        willChange: "transform, opacity",
                      }}
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
                                  src="/assets/demo-tut-img.png"
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
                      className="absolute left-0 top-0 z-0"
                      style={{
                        animation:
                          "hero-fan-screen-right 5.2s cubic-bezier(0.45, 0.05, 0.2, 1) infinite",
                        transformOrigin: "bottom center",
                        willChange: "transform, opacity",
                      }}
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
                                  <rect x="0" y="7" width="2.5" height="3" rx="0.5" />
                                  <rect x="4" y="5" width="2.5" height="5" rx="0.5" />
                                  <rect x="8" y="2.5" width="2.5" height="7.5" rx="0.5" />
                                  <rect x="12" y="0" width="2.5" height="10" rx="0.5" />
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
                                    style={{ animation: "hero-ai-ripple 3.4s ease-out infinite" }}
                                  />
                                  <div
                                    className="absolute left-1/2 top-1/2 h-[208px] w-[208px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8a79d6]/16"
                                    style={{ animation: "hero-ai-ripple 3.4s ease-out 1.1s infinite" }}
                                  />
                                  <div
                                    className="absolute left-1/2 top-1/2 h-[168px] w-[168px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8a79d6]/14"
                                    style={{ animation: "hero-ai-ripple 3.4s ease-out 2.2s infinite" }}
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
                                        <circle cx="35.5" cy="31" r="3.1" fill="#1B1248" />
                                        <circle cx="28" cy="39" r="2.7" fill="#1B1248" />
                                        <circle cx="41.5" cy="39" r="2.9" fill="#1B1248" />
                                        <circle cx="34.2" cy="41.8" r="1.6" fill="#FFB54F" />
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

                    {/* External Chassis (Titanium/Metal Edge) */}
                    <div className="absolute inset-0 rounded-[3.5rem] bg-gradient-to-tr from-[#1a1a1a] via-[#3a3a3a] to-[#2a2a2a] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_0_2px_rgba(255,255,255,0.2)]"></div>

                    {/* Physical Buttons - High-Fidelity Realistic Details */}
                    {/* Silent Switch / Action Button */}
                    <div className="absolute top-[85px] -left-[4px] w-[7px] h-9 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                    {/* Volume Up */}
                    <div className="absolute top-[140px] -left-[4px] w-[7px] h-14 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                    {/* Volume Down */}
                    <div className="absolute top-[210px] -left-[4px] w-[7px] h-14 bg-gradient-to-r from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-l-[3px] border-y border-l border-white/10 shadow-[1px_0_3px_rgba(0,0,0,0.5)]"></div>
                    {/* Power Button */}
                    <div className="absolute top-[160px] -right-[4px] w-[7px] h-24 bg-gradient-to-l from-[#0a0a0a] via-[#3a3a3a] to-[#2a2a2a] z-20 rounded-r-[3px] border-y border-l border-white/10 shadow-[-1px_0_3px_rgba(0,0,0,0.5)]"></div>

                    {/* Inner Bezel (Black Glass Edge) */}
                    <div className="absolute inset-[4px] rounded-[3.25rem] bg-black shadow-[inset_0_0_10px_rgba(255,255,255,0.1)] overflow-hidden">
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
      </section>
    </>
  );
}
