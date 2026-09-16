"use client";

import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, useGSAP, instantMotion } from "@/lib/motion";

/** Enhance visible server HTML; never require JavaScript to read the page. */
export default function SiteMotion() {
  const pathname = usePathname();

  useGSAP(() => {
    const root = document.documentElement;
    const page = document.querySelector<HTMLElement>(".site-shell");
    if (!page) return;
    const keyboard = (event: KeyboardEvent) => {
      if (!event.metaKey && !event.ctrlKey && !event.altKey) root.dataset.input = "keyboard";
    };
    const pointer = () => { root.dataset.input = "pointer"; };
    document.addEventListener("keydown", keyboard);
    document.addEventListener("pointerdown", pointer, { passive: true });

    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const entries = new Map<HTMLElement, { context: gsap.Context; timeline: gsap.core.Timeline }>();
      let scanFrame = 0;
      let refreshTimer = 0;
      let disposed = false;
      const refresh = () => {
        if (disposed) return;
        clearTimeout(refreshTimer);
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 100);
      };

      const scan = () => {
        let changed = false;
        page.querySelectorAll<HTMLElement>("[data-reveal]").forEach((element) => {
          // Catalog results have their own filter + scroll controller.
          if (entries.has(element) || element.closest(".catalog-grid")) return;
          changed = true;
          let timeline: gsap.core.Timeline;
          const context = gsap.context(() => {
            timeline = gsap.timeline({ paused: true, defaults: { duration: 0.48, ease: "power3.out" } });
            const enter = (targets: HTMLElement[], at = 0, each = 0.055, distance = 18) => {
              if (!targets.length) return;
              targets.forEach((target) => { target.dataset.motionReady = "true"; });
              // Independent CSS translate preserves hover transforms and card rotations.
              timeline.fromTo(targets, { opacity: 0, "--reveal-y": `${distance}px` },
                { opacity: 1, "--reveal-y": "0px", stagger: each }, at);
            };
            const children = (selector: string) => Array.from(element.querySelectorAll<HTMLElement>(selector));
            if (element.matches(".feature-showcase")) {
              enter(children(".card-stage"), 0, 0, 22);
              enter(children(".hero-avatar"), 0.09, 0.045, 14);
              enter(children(".hero-doodle, .deck-controls"), 0.2, 0.025, 6);
            } else if (element.matches(".avatar-playground")) {
              enter(children(".avatar-pedestal, .avatar-orbit"), 0, 0.04, 14);
              enter(children(".avatar-option"), 0.1, 0.014, 8);
              enter(children(".shuffle-button, .playground-caption"), 0.26, 0.04, 8);
            } else if (element.matches(".download-copy")) {
              enter(children(".download-faces > *"), 0, 0.06, 10);
              enter(children(":scope > :not(.download-faces)"), 0.1, 0.06, 16);
            } else if (element.matches(".hero-copy, .section-heading, .personality-copy, .page-intro, .detail-hero, .about-intro")) {
              enter(children(":scope > *"), 0, 0.065);
            } else {
              const siblings = Array.from(element.parentElement?.children ?? []);
              const index = siblings.indexOf(element);
              const row = element.parentElement?.matches(".featured-programs, .about-principles, .detail-includes");
              enter([element], row && innerWidth > 700 ? index * 0.06 : 0, 0, 14);
            }
            const show = () => {
              if (instantMotion()) timeline.progress(1).pause();
              else timeline.timeScale(1).play();
            };
            const hide = () => {
              if (element.contains(document.activeElement) || instantMotion()) return;
              timeline.timeScale(2.6).reverse();
            };
            ScrollTrigger.create({
              trigger: element,
              start: "top bottom-=20", end: "bottom top+=20",
              onEnter: show, onEnterBack: show,
              onLeave: hide, onLeaveBack: hide,
              onRefresh: (self) => {
                if (self.isActive) show();
                else if (!element.contains(document.activeElement)) timeline.progress(0).pause();
              },
            });
            const rect = element.getBoundingClientRect();
            if (rect.top < innerHeight - 20 && rect.bottom > 20) show();
          }, element);
          entries.set(element, { context, timeline: timeline! });
        });
        entries.forEach((entry, element) => {
          if (!element.isConnected) {
            entry.context.revert();
            entries.delete(element);
            changed = true;
          }
        });
        if (changed) refresh();
      };
      const focus = (event: FocusEvent) => {
        entries.forEach(({ timeline }, element) => {
          if (event.target instanceof Node && element.contains(event.target)) timeline.progress(1).pause();
        });
      };
      scan();
      const mutations = new MutationObserver(() => {
        cancelAnimationFrame(scanFrame);
        scanFrame = requestAnimationFrame(scan);
      });
      mutations.observe(page, { childList: true, subtree: true });
      // Wait for accordion/filter reflow to settle before remeasuring triggers.
      const resize = new ResizeObserver(refresh);
      resize.observe(page);
      document.fonts.ready.then(refresh);
      page.addEventListener("load", refresh, true);
      document.addEventListener("focusin", focus);
      return () => {
        disposed = true;
        clearTimeout(refreshTimer);
        cancelAnimationFrame(scanFrame);
        mutations.disconnect();
        resize.disconnect();
        page.removeEventListener("load", refresh, true);
        document.removeEventListener("focusin", focus);
        entries.forEach(({ context }) => context.revert());
        page.querySelectorAll("[data-motion-ready]").forEach((element) => element.removeAttribute("data-motion-ready"));
      };
    });
    return () => {
      media.revert();
      document.removeEventListener("keydown", keyboard);
      document.removeEventListener("pointerdown", pointer);
    };
  }, { dependencies: [pathname], revertOnUpdate: true });
  return null;
}
