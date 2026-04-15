"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

import { withBasePath } from "@/app/lib/withBasePath";

import ContactModal from "./ContactModal";

const TEAM_STAGE_KEYFRAMES = `
  @keyframes team-selector-float-a {
    0%, 100% {
      transform: translate3d(0, -8px, 0);
    }
    50% {
      transform: translate3d(0, 8px, 0);
    }
  }

  @keyframes team-selector-float-b {
    0%, 100% {
      transform: translate3d(0, 8px, 0);
    }
    50% {
      transform: translate3d(0, -8px, 0);
    }
  }

  @keyframes team-content-reveal {
    from {
      opacity: 0;
      transform: translateY(18px) scale(0.985);
      filter: blur(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  @keyframes team-selector-orbit {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes team-selector-pulse {
    0%, 100% {
      transform: scale(0.98);
      opacity: 0.38;
    }
    50% {
      transform: scale(1.03);
      opacity: 0.7;
    }
  }

  @keyframes team-selector-sheen {
    0%, 100% {
      transform: translateX(-128%);
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    50% {
      transform: translateX(132%);
      opacity: 0.55;
    }
    80% {
      opacity: 0;
    }
  }

  @keyframes team-hover-avatar-enter {
    from {
      opacity: 0;
      transform: scale(1.04);
      filter: saturate(0.9) brightness(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
      filter: saturate(1) brightness(1);
    }
  }

  .team-selector-float {
    will-change: transform;
    animation-duration: 5s;
    animation-timing-function: cubic-bezier(0.45, 0.05, 0.55, 0.95);
    animation-iteration-count: infinite;
    animation-fill-mode: both;
  }

  .team-selector-float-a {
    animation-name: team-selector-float-a;
  }

  .team-selector-float-b {
    animation-name: team-selector-float-b;
  }

  .team-story-reveal {
    animation: team-content-reveal 560ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  .team-selector-orbit {
    animation: team-selector-orbit 18s linear infinite;
    animation-play-state: var(--team-anim-state, running);
    transform-origin: center;
  }

  .team-selector-pulse {
    animation: team-selector-pulse 4.2s ease-in-out infinite;
    animation-play-state: var(--team-anim-state, running);
  }

  .team-selector-sheen {
    animation: team-selector-sheen 7.5s ease-in-out infinite;
    animation-play-state: var(--team-anim-state, running);
  }

  .team-hover-avatar-enter {
    animation: team-hover-avatar-enter 260ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  @media (prefers-reduced-motion: reduce) {
    .team-selector-float,
    .team-story-reveal,
    .team-selector-orbit,
    .team-selector-pulse,
    .team-selector-sheen,
    .team-hover-avatar-enter {
      animation: none !important;
    }
  }
`;

function normalizeTeamTag(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\b([a-z]{4,})s\b/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

type TeamMember = {
  name: string;
  role: string;
  badge: string;
  story: string[];
  highlights: string[];
  image: string;
  animatedImage: string;
};

const teamMembers: TeamMember[] = [
  {
    name: "Sanae",
    role: "Communications & Development",
    badge: "Communications",
    image: "/assets/Sanae_avatar.jpeg",
    animatedImage: "/assets/Sanae_avatar_animated.gif",
    story: [
      "Growing up, I never saw anyone else who stuttered, but I knew I couldn't be the only one. When I finally connected with others who shared that exact experience, I realized I wanted to do more than just belong. I wanted to build.",
      "At Speechworks, I jump between writing code and driving communications to create the platform I always wished existed. We're laying the foundation right now, but it won't be complete without you. Bring your ideas, and let's finish building this together.",
    ],
    highlights: ["Development", "Community Care"],
  },
  {
    name: "Mayank",
    role: "Founder & Developer",
    badge: "Founder",
    image: "/assets/mayank_avatar.png",
    animatedImage: "/assets/mayank_avatar_animated.gif",
    story: [
      "I don't have a stutter, but I've watched brilliant people silence themselves because they do. Seeing remarkable minds choose to stay quiet rather than face judgment showed me a broken system.",
      "I founded Speechworks to build a different reality. We are laying the groundwork for a platform where no brilliant mind has to choose between speaking up and feeling safe.",
      "But we can't do it alone. A space built for your voice needs to be guided by your voice. Join us as we build this from the ground up, and help shape Speechworks into what you need it to be.",
    ],
    highlights: ["Product", "AI Practice"],
  },
];

const teamAnimationStateVar = "--team-anim-state" as const;
const defaultTeamMemberIndex = Math.max(
  teamMembers.findIndex((member) => member.name === "Sanae"),
  0
);

export default function Team() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeMemberIndex, setActiveMemberIndex] = useState(
    defaultTeamMemberIndex
  );
  const [hoveredDesktopMemberIndex, setHoveredDesktopMemberIndex] = useState<
    number | null
  >(null);
  const [hasStoppedIdleMotion, setHasStoppedIdleMotion] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    if (stageRef.current) {
      stageRef.current.style.setProperty("--team-mouse-x", "72%");
      stageRef.current.style.setProperty("--team-mouse-y", "28%");
    }
  }, []);

  const stopIdleMotion = () => {
    setHasStoppedIdleMotion(true);
  };

  const handleMemberSelect = (index: number) => {
    stopIdleMotion();
    setActiveMemberIndex(index);
  };

  const handleStageMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current || prefersReducedMotion) return;

    const rect = stageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    stageRef.current.style.setProperty("--team-mouse-x", `${x}px`);
    stageRef.current.style.setProperty("--team-mouse-y", `${y}px`);
  };

  const activeMember = teamMembers[activeMemberIndex];
  const visibleHighlights = activeMember.highlights.filter(
    (item, index, all) => {
      const normalizedItem = normalizeTeamTag(item);
      const normalizedBadge = normalizeTeamTag(activeMember.badge);

      if (normalizedItem === normalizedBadge) {
        return false;
      }

      return (
        all.findIndex((entry) => normalizeTeamTag(entry) === normalizedItem) ===
        index
      );
    }
  );

  return (
    <>
      <style>{TEAM_STAGE_KEYFRAMES}</style>
      <section
        id="team"
        className="relative z-10 overflow-hidden bg-[linear-gradient(180deg,#fffdf9_0%,#fff7f0_45%,#fffdf9_100%)] py-20 md:py-28"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(242,128,68,0.18),transparent_26%),radial-gradient(circle_at_86%_20%,rgba(63,51,45,0.08),transparent_24%),radial-gradient(circle_at_80%_84%,rgba(242,128,68,0.1),transparent_28%)]" />
          <div className="absolute inset-0 opacity-[0.05] bg-grid" />
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full border border-brand/15" />
          <div className="absolute -right-28 bottom-10 h-80 w-80 rounded-full border border-black/5" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-12">
          <div className="reveal max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-900/10 bg-white/85 px-4 py-2 shadow-sm backdrop-blur-xl">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-app-text">
                Meet The Team
              </span>
            </div>

            <h2 className="text-4xl font-black tracking-tightest text-app-text sm:text-5xl md:text-6xl">
              Built by people who know trust is part of the product.
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-7 text-app-muted sm:text-lg">
              Speechworks is being built close to the people it serves. These
              are the voices laying the foundation and inviting you into the
              process.
            </p>
          </div>

          <div
            ref={stageRef}
            className="mt-10 reveal reveal-delay-1 relative overflow-hidden rounded-[2.7rem] border border-[#2e221c] bg-[#120d0a] px-5 pb-6 pt-8 shadow-[0_46px_110px_-58px_rgba(18,13,10,0.92)] sm:px-7 sm:py-8 lg:px-9 lg:py-10"
            onPointerEnter={stopIdleMotion}
            onPointerDown={stopIdleMotion}
            onTouchStart={stopIdleMotion}
            onFocusCapture={stopIdleMotion}
            onMouseMove={handleStageMove}
          >
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-[radial-gradient(460px_circle_at_var(--team-mouse-x,72%)_var(--team-mouse-y,28%),rgba(242,128,68,0.16),transparent_48%),radial-gradient(circle_at_top_left,rgba(242,128,68,0.18),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_22%)]" />
              <div className="absolute inset-0 opacity-[0.06] bg-grid" />
              <svg
                className="absolute inset-0 h-full w-full opacity-60"
                viewBox="0 0 1200 760"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M126 190C246 132 348 140 454 206C552 266 624 352 744 370C842 384 946 342 1068 240"
                  stroke="rgba(242,128,68,0.18)"
                  strokeWidth="2"
                  strokeDasharray="8 12"
                />
                <path
                  d="M168 540C266 594 372 606 474 572C604 528 694 420 804 404C896 390 972 430 1060 512"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                  strokeDasharray="8 12"
                />
                <circle cx="248" cy="206" r="5" fill="rgba(242,128,68,0.7)" />
                <circle cx="830" cy="404" r="5" fill="rgba(255,255,255,0.5)" />
              </svg>
            </div>

            <div className="relative z-10 grid gap-4 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:items-center xl:gap-14">
              <div className="relative min-h-[8.5rem] sm:min-h-[10rem] lg:min-h-[32rem]">
                <div className="absolute inset-0 hidden lg:block">
                  <div className="absolute left-[6%] top-[16%] h-44 w-44 rounded-full border border-white/6" />
                  <div className="absolute right-[10%] bottom-[18%] h-52 w-52 rounded-full border border-brand/10" />
                </div>

                <div className="relative h-[7.75rem] lg:hidden">
                  <div className="pointer-events-none absolute left-3 top-8 h-16 w-16 rounded-full border border-brand/10" />
                  <div className="pointer-events-none absolute left-12 top-3 h-24 w-24 rounded-full border border-white/8" />

                  {teamMembers.map((member, index) => {
                    const isActive = index === activeMemberIndex;
                    const portraitImageStyle =
                      member.name === "Mayank"
                        ? { objectPosition: "center 22%" }
                        : undefined;
                    const selectorAnimationState =
                      !hasStoppedIdleMotion && !prefersReducedMotion
                        ? "running"
                        : "paused";
                    const selectorMotionStyle = {
                      [teamAnimationStateVar]: selectorAnimationState,
                    } as React.CSSProperties;
                    const positionClass = isActive
                      ? "translate-x-[3.85rem] translate-y-0 z-20"
                      : "translate-x-0 translate-y-7 z-10";

                    return (
                      <button
                        key={member.name}
                        type="button"
                        onClick={() => handleMemberSelect(index)}
                        aria-pressed={isActive}
                        style={selectorMotionStyle}
                        className={`group absolute left-0 top-0 text-left transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${positionClass}`}
                      >
                        <div
                          className={`relative transform-gpu transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                            isActive
                              ? "scale-100 opacity-100"
                              : "scale-[0.96] opacity-82"
                          }`}
                        >
                          <div
                            className={`pointer-events-none absolute rounded-full blur-2xl transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isActive
                                ? "-inset-x-3 top-3 h-16 bg-brand/26"
                                : "-inset-1 top-2 h-14 bg-white/8"
                            }`}
                          />

                          <div className="relative flex items-center">
                            <div className="relative shrink-0">
                              <span
                                className={`team-selector-pulse pointer-events-none absolute -inset-2 rounded-[1.5rem] border ${
                                  isActive
                                    ? "border-brand/25"
                                    : "border-white/10"
                                }`}
                              />
                              <div
                                className="relative h-[4.35rem] w-[4.35rem] overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/5 shadow-[0_20px_40px_-24px_rgba(0,0,0,0.85)]"
                              >
                                <Image
                                  src={withBasePath(member.image)}
                                  alt={`${member.name} portrait`}
                                  fill
                                  className="object-cover"
                                  style={portraitImageStyle}
                                  sizes="64px"
                                />
                              </div>
                              <span
                                className={`absolute -right-1 top-2 h-2.5 w-2.5 rounded-full ${
                                  isActive
                                    ? "bg-brand shadow-[0_0_18px_rgba(242,128,68,0.85)]"
                                    : "bg-white/20"
                                }`}
                              />
                            </div>

                            <div
                              className={`pointer-events-none absolute left-[4.95rem] top-1/2 w-[10.75rem] min-w-0 -translate-y-1/2 transform-gpu transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                isActive
                                  ? "translate-x-0 opacity-100"
                                  : "-translate-x-2 opacity-0"
                              }`}
                            >
                              <div
                                className={`relative overflow-hidden rounded-[1.7rem] border backdrop-blur-xl transition-[opacity,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                  isActive
                                    ? "border-white/10 bg-white/10 px-4 py-3 text-white shadow-[0_24px_50px_-28px_rgba(0,0,0,0.9)]"
                                    : "border-transparent bg-transparent px-0 py-0 text-white/82 shadow-none"
                                }`}
                              >
                                <span className="team-selector-sheen pointer-events-none absolute inset-y-0 left-[-20%] w-20 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]" />

                                <div className="relative z-10 min-w-0">
                                  <p className="text-[9px] font-black uppercase tracking-[0.18em] text-brand/90">
                                    {member.badge}
                                  </p>
                                  <h3 className="mt-1 truncate text-[1.45rem] font-black tracking-tight text-white">
                                    {member.name}
                                  </h3>
                                  <p className="mt-1 text-[9px] font-black uppercase tracking-[0.18em] text-white/48">
                                    {member.role}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="hidden h-full lg:block">
                  {teamMembers.map((member, index) => {
                    const isActive = index === activeMemberIndex;
                    const isDesktopAvatarAnimated =
                      hoveredDesktopMemberIndex === index;
                    const portraitImageStyle =
                      member.name === "Mayank"
                        ? { objectPosition: "center 22%" }
                        : undefined;
                    const positionClass =
                      index === 0
                        ? "left-[0%] top-[7%] w-[23rem]"
                        : "right-[1%] bottom-[10%] w-[22rem]";
                    const floatClass =
                      index === 0
                        ? "team-selector-float team-selector-float-a"
                        : "team-selector-float team-selector-float-b";
                    const selectorAnimationState =
                      !hasStoppedIdleMotion && !prefersReducedMotion
                        ? "running"
                        : "paused";
                    const selectorMotionStyle = {
                      animationPlayState: selectorAnimationState,
                      [teamAnimationStateVar]: selectorAnimationState,
                    } as React.CSSProperties;
                    const tiltClass =
                      index === 0 ? "-rotate-[5deg]" : "rotate-[5deg]";

                    return (
                      <button
                        key={member.name}
                        type="button"
                        onClick={() => handleMemberSelect(index)}
                        onMouseEnter={() => setHoveredDesktopMemberIndex(index)}
                        onMouseLeave={() =>
                          setHoveredDesktopMemberIndex((current) =>
                            current === index ? null : current
                          )
                        }
                        aria-pressed={isActive}
                        className={`absolute ${positionClass} ${floatClass} text-left transition-all duration-500 ${
                          isActive
                            ? "z-20 opacity-100"
                            : "z-10 opacity-72 hover:opacity-100"
                        }`}
                        style={selectorMotionStyle}
                      >
                        <div
                          className={`relative transition-all duration-500 ${
                            isActive
                              ? "rotate-0 scale-100"
                              : `${tiltClass} scale-[0.96] group-hover:scale-[0.99] group-hover:rotate-0`
                          }`}
                        >
                          <span
                            className={`pointer-events-none absolute inset-x-10 top-10 h-24 rounded-full blur-3xl transition-all duration-500 ${
                              isActive ? "bg-brand/30" : "bg-white/8"
                            }`}
                          />

                          <span
                            className={`team-selector-orbit pointer-events-none absolute ${
                              index === 0
                                ? "-left-6 -top-8 h-56 w-56"
                                : "-right-8 -bottom-10 h-60 w-60"
                            } rounded-full border border-dashed transition-colors duration-500 ${
                              isActive ? "border-brand/18" : "border-white/8"
                            }`}
                          />

                          <div className="relative flex items-center gap-5">
                            <div className="relative shrink-0">
                              <span
                                className={`team-selector-pulse pointer-events-none absolute -inset-3 rounded-[2rem] border ${
                                  isActive
                                    ? "border-brand/25"
                                    : "border-white/10"
                                }`}
                              />
                              <span
                                className={`pointer-events-none absolute -inset-5 rounded-[2.3rem] bg-[radial-gradient(circle,rgba(242,128,68,0.25),transparent_68%)] blur-2xl transition-opacity duration-500 ${
                                  isActive ? "opacity-80" : "opacity-30"
                                }`}
                              />
                              <div className="relative h-24 w-24 overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_28px_48px_-30px_rgba(0,0,0,0.95)]">
                                {isDesktopAvatarAnimated ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={withBasePath(member.animatedImage)}
                                    alt={`${member.name} portrait`}
                                    className="team-hover-avatar-enter h-full w-full object-cover"
                                    style={portraitImageStyle}
                                    draggable={false}
                                  />
                                ) : (
                                  <Image
                                    src={withBasePath(member.image)}
                                    alt={`${member.name} portrait`}
                                    fill
                                    className="object-cover"
                                    style={portraitImageStyle}
                                    sizes="96px"
                                  />
                                )}
                              </div>
                              <span
                                className={`absolute -right-2 top-3 h-3 w-3 rounded-full ${
                                  isActive
                                    ? "bg-brand shadow-[0_0_22px_rgba(242,128,68,0.9)]"
                                    : "bg-white/20"
                                }`}
                              />
                            </div>

                            <div className="min-w-0 flex-1">
                              <div
                                className={`relative ml-4 overflow-hidden rounded-[2rem] border px-5 py-4 backdrop-blur-xl transition-all duration-500 ${
                                  isActive
                                    ? "border-white/12 bg-white/10 text-white shadow-[0_28px_70px_-36px_rgba(0,0,0,0.78)]"
                                    : "border-white/8 bg-white/[0.04] text-white/82"
                                }`}
                              >
                                <span className="team-selector-sheen pointer-events-none absolute inset-y-0 left-[-22%] w-24 -skew-x-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]" />
                                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(242,128,68,0.14),transparent_42%)]" />

                                <div className="relative z-10 min-w-0">
                                  <h3 className="text-[2.15rem] font-black tracking-tight text-white">
                                    {member.name}
                                  </h3>
                                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.22em] text-white/48">
                                    {member.role}
                                  </p>
                                  <div className="mt-4 h-px w-14 bg-white/10" />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="min-w-0">
                <div key={activeMember.name} className="team-story-reveal">
                  <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1.5 shadow-sm">
                    <span className="h-2 w-2 rounded-full bg-brand" />
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-brand">
                      {activeMember.badge}
                    </span>
                  </div>

                  <div className="hidden min-w-0 sm:mt-6 sm:block">
                    <h3 className="text-5xl font-black tracking-tightest text-white sm:text-6xl xl:text-[5.3rem]">
                      {activeMember.name}
                    </h3>
                    <p className="mt-3 text-[11px] font-black uppercase tracking-[0.22em] text-white/48">
                      {activeMember.role}
                    </p>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2 sm:mt-6">
                    {visibleHighlights.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 max-w-2xl space-y-5 text-[16px] leading-8 text-white/80">
                    {activeMember.story.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>

                  <div className="mt-9">
                    <button
                      type="button"
                      onClick={() => setIsContactOpen(true)}
                      className="inline-flex max-w-full items-center gap-3 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#F28044_0%,#D9692E_100%)] px-5 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_-18px_rgba(242,128,68,0.6)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_48px_-18px_rgba(242,128,68,0.72)] sm:px-6 sm:py-3.5 sm:text-xs"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/14 ring-1 ring-white/10">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.6a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.48-1.29a2 2 0 0 1 2.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </span>
                      <span>Talk To The Team</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
