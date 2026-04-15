'use client';

import React, {useEffect} from 'react';
import Navbar from './components/Navbar';
import AmbientBackgrounds from './components/AmbientBackgrounds';
import Hero from './components/Hero';
import MarqueeDivider from './components/MarqueeDivider';
import Roadmap from './components/Roadmap';
import Platform from './components/Platform';
import Simulator from './components/Simulator';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Pricing from './components/Pricing';

declare global {
  interface Window {
    lucide?: {
      createIcons: () => void;
    };
    switchRoadmap?: (phase: number) => void;
    activateSimulator?: (index: number) => void;
  }
}

export default function Home() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const root = document.documentElement;
    const hasFinePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const canUsePointerEffects = hasFinePointer && !prefersReducedMotion;

    root.classList.toggle("touch-ui", !hasFinePointer);

    const addListener = (
      target: EventTarget,
      eventName: string,
      handler: EventListenerOrEventListenerObject
    ) => {
      target.addEventListener(eventName, handler);
      cleanups.push(() => target.removeEventListener(eventName, handler));
    };

    function activateSimulator(index: number) {
      const configs: Record<number, { text: string; hover: string }> = {
        1: { text: "text-brand", hover: "group-hover:text-brand" },
        2: { text: "text-purple-500", hover: "group-hover:text-purple-500" },
        3: { text: "text-emerald-500", hover: "group-hover:text-emerald-500" },
      };
      const activeButtonClass =
        "magnetic-btn pointer-none-children group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 bg-app-text text-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] whitespace-nowrap outline-none cursor-pointer sm:gap-3 sm:px-5 sm:py-2.5";
      const inactiveButtonClass =
        "magnetic-btn pointer-none-children group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 bg-transparent text-app-muted hover:bg-black/5 whitespace-nowrap outline-none cursor-pointer sm:gap-3 sm:px-5 sm:py-2.5";
      const activeViewClass =
        "sim-stage-view absolute inset-0 flex flex-col justify-between gap-6 p-5 sm:p-6 md:p-10 transition-all duration-[800ms] opacity-100 translate-y-0 scale-100 z-20 pointer-events-none";
      const inactiveViewClass =
        "sim-stage-view absolute inset-0 flex flex-col justify-between gap-6 p-5 sm:p-6 md:p-10 transition-all duration-[800ms] opacity-0 translate-y-16 scale-95 z-0 pointer-events-none";

      for (let i = 1; i <= 3; i++) {
        const btn = document.getElementById(`sim-btn-${i}`);
        const icon = document.getElementById(`sim-icon-${i}`);
        const view = document.getElementById(`sim-view-${i}`) as HTMLElement | null;
        const config = configs[i];

        if (btn && icon && view) {
          if (i === index) {
            btn.className = activeButtonClass;
            icon.className = `${config.text} transition-colors`;
            view.className = activeViewClass;

            const content = view.querySelector(".sim-stage-copy") as
              | HTMLElement
              | null;
            if (content && !prefersReducedMotion) {
              content.classList.remove("animate-glitch");
              void content.offsetWidth;
              content.classList.add("animate-glitch");
            }
          } else {
            btn.className = inactiveButtonClass;
            icon.className = `transition-colors ${config.hover}`;
            view.className = inactiveViewClass;
          }
        }
      }
    }

    if (canUsePointerEffects) {
      document.querySelectorAll<HTMLElement>(".magnetic-btn").forEach((btn) => {
        const handleMove = (event: Event) => {
          const e = event as MouseEvent;
          const rect = btn.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
          btn.style.transform = `translate(${x}px, ${y}px)`;
        };

        const handleLeave = () => {
          btn.style.transform = "translate(0px, 0px)";
        };

        addListener(btn, "mousemove", handleMove);
        addListener(btn, "mouseleave", handleLeave);
      });

      const stage = document.getElementById("simulator-stage");
      if (stage) {
        const handleStageMove = (event: Event) => {
          const e = event as MouseEvent;
          const rect = stage.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          stage.style.setProperty("--stage-mouse-x", `${x}px`);
          stage.style.setProperty("--stage-mouse-y", `${y}px`);
        };

        addListener(stage, "mousemove", handleStageMove);
      }

      document.querySelectorAll<HTMLElement>(".tilt-card").forEach((card) => {
        const handleMove = (event: Event) => {
          const e = event as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = ((y - centerY) / centerY) * -12;
          const rotateY = ((x - centerX) / centerX) * 12;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
          card.style.setProperty("--card-mouse-x", `${x}px`);
          card.style.setProperty("--card-mouse-y", `${y}px`);
        };

        const handleLeave = () => {
          card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        };

        addListener(card, "mousemove", handleMove);
        addListener(card, "mouseleave", handleLeave);
      });

      document
        .querySelectorAll<HTMLElement>(".magnetic-sticker")
        .forEach((sticker) => {
          const handleMove = (event: Event) => {
            const e = event as MouseEvent;
            const rect = sticker.getBoundingClientRect();
            const x = (e.clientX - rect.left - rect.width / 2) * 0.08;
            const y = (e.clientY - rect.top - rect.height / 2) * 0.08;
            const rotateX =
              ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) *
              -5;
            const rotateY =
              ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) *
              5;

            sticker.style.transform = `perspective(1000px) translate(${x}px, ${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
          };

          const handleLeave = () => {
            sticker.style.transform =
              "perspective(1000px) translate(0px, 0px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
          };

          addListener(sticker, "mousemove", handleMove);
          addListener(sticker, "mouseleave", handleLeave);
        });

      document.querySelectorAll<HTMLElement>(".glow-card").forEach((card) => {
        const handleMove = (event: Event) => {
          const e = event as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty("--mouse-x", `${x}px`);
          card.style.setProperty("--mouse-y", `${y}px`);
        };

        addListener(card, "mousemove", handleMove);
      });
    }

    // Initialize Icons
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll(".reveal");
    if (prefersReducedMotion) {
      revealElements.forEach((element) => element.classList.add("active"));
    } else {
      const observer = new IntersectionObserver(
        (entries, revealObserver) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("active");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.15,
        }
      );

      revealElements.forEach((element) => {
        observer.observe(element);
      });

      cleanups.push(() => observer.disconnect());
    }

    // Interactive Roadmap Logic
    function switchRoadmap(phase: number) {
      const themes: Record<number, string> = {
        1: "brand",
        2: "purple-500",
        3: "emerald-500",
      };

      for (let i = 1; i <= 3; i++) {
        const btn = document.getElementById(`rm-btn-${i}`);
        const label = document.getElementById(`rm-label-${i}`);
        const title = document.getElementById(`rm-title-${i}`);
        const desc = document.getElementById(`rm-desc-${i}`);
        const line = document.getElementById(`rm-line-${i}`);
        const canvas = document.getElementById(`rm-canvas-${i}`);

        if (btn && label && title && desc && line && canvas) {
          if (i === phase) {
            btn.classList.remove("opacity-50", "hover:opacity-100");
            btn.classList.add("opacity-100");

            label.className = `text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2 block transition-colors duration-300 text-${themes[i]}`;
            title.className =
              "text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-app-text transition-all duration-500";

            desc.style.maxHeight = `${desc.scrollHeight}px`;
            desc.classList.remove("opacity-0", "mt-0");
            desc.classList.add("opacity-100", "mt-2", "md:mt-4");

            line.className = `absolute left-[-27px] md:left-[-43px] -top-[2px] -bottom-[2px] w-[4px] bg-${themes[i]} transition-all duration-500 opacity-100 scale-y-100 origin-top`;
          } else {
            btn.classList.remove("opacity-100");
            btn.classList.add("opacity-50", "hover:opacity-100");

            label.className =
              "text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-1 md:mb-2 block text-app-muted transition-colors duration-300";
            title.className =
              "text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(63,51,45,0.3)] group-hover:[-webkit-text-stroke:1px_rgba(63,51,45,0.7)] transition-all duration-500";

            desc.style.maxHeight = "0px";
            desc.classList.remove("opacity-100", "mt-2", "md:md:mt-4");
            desc.classList.add("opacity-0", "mt-0");

            line.className =
              "absolute left-[-27px] md:left-[-43px] -top-[2px] -bottom-[2px] w-[4px] bg-transparent transition-all duration-500 opacity-0 scale-y-0 origin-top";
          }
        }
      }
    }

    window.switchRoadmap = switchRoadmap;
    window.activateSimulator = activateSimulator;
    
    return () => {
      window.switchRoadmap = undefined;
      window.activateSimulator = undefined;
      root.classList.remove("touch-ui");
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return (
    <main>
      <AmbientBackgrounds />
      <Navbar />
      <Hero />
      <MarqueeDivider />
      <Roadmap />
      <Platform />
      <Simulator />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
