"use client";
import { useRef, useState } from "react";
import { categories, programs } from "@/content/programs";
import { gsap, ScrollTrigger, useGSAP, instantMotion } from "@/lib/motion";
import ProgramCard from "./ProgramCard";

export default function ProgramCatalog() {
  const [selected, setSelected] = useState<string>(categories[0]);
  const [requested, setRequested] = useState<string>(categories[0]);
  const grid = useRef<HTMLDivElement>(null);
  const outgoing = useRef<gsap.core.Tween | null>(null);
  const immediate = useRef(false);
  const shown = programs.filter((program) => selected === categories[0] || program.category === selected);

  const { contextSafe } = useGSAP(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => { if (preference.matches) outgoing.current?.progress(1); };
    preference.addEventListener("change", finish);
    return () => preference.removeEventListener("change", finish);
  }, { scope: grid });

  useGSAP(() => {
    outgoing.current?.kill();
    const cards = Array.from(grid.current!.querySelectorAll<HTMLElement>(".program-card.pressable"));
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const removeListeners: (() => void)[] = [];
      cards.forEach((card, index) => {
        card.dataset.motionReady = "true";
        const tween = gsap.fromTo(card, { opacity: 0, "--reveal-y": "14px" }, {
          opacity: 1, "--reveal-y": "0px", duration: 0.38,
          delay: innerWidth > 700 ? (index % 3) * 0.045 : 0,
          ease: "power3.out", paused: true,
        });
        const show = () => {
          if (immediate.current || instantMotion()) tween.progress(1).pause();
          else tween.timeScale(1).play();
        };
        const hide = () => {
          if (!card.contains(document.activeElement) && !instantMotion()) tween.timeScale(2.5).reverse();
        };
        const focus = () => tween.progress(1).pause();
        card.addEventListener("focusin", focus);
        ScrollTrigger.create({
          trigger: card, start: "top bottom-=20", end: "bottom top+=20",
          onEnter: show, onEnterBack: show, onLeave: hide, onLeaveBack: hide,
          onRefresh: (self) => { if (self.isActive) show(); },
        });
        const rect = card.getBoundingClientRect();
        if (rect.top < innerHeight - 20 && rect.bottom > 20) show();
        removeListeners.push(() => card.removeEventListener("focusin", focus));
      });
      return () => {
        removeListeners.forEach((remove) => remove());
        cards.forEach((card) => card.removeAttribute("data-motion-ready"));
      };
    });
    ScrollTrigger.refresh(true);
    return () => media.revert();
  }, { scope: grid, dependencies: [selected], revertOnUpdate: true });

  const select = contextSafe((category: string, instant: boolean) => {
    outgoing.current?.kill();
    setRequested(category);
    immediate.current = instant || instantMotion();
    if (category === selected) {
      gsap.set(grid.current!.querySelectorAll(".program-card.pressable"), { opacity: 1 });
      return;
    }
    if (immediate.current) {
      setSelected(category);
      return;
    }
    // Fade the current results before showing the selected topic.
    outgoing.current = gsap.to(grid.current!.querySelectorAll(".program-card.pressable"), {
      opacity: 0, duration: 0.1, ease: "power2.out",
      onComplete: () => setSelected(category),
    });
  });

  return (
    <div className="catalog section-wrap">
      <div className="catalog-filters" aria-label="Filter programs by topic" data-reveal>
        {categories.map((category) => (
          <button className="filter-button pressable" key={category} aria-pressed={requested === category}
            onClick={(event) => select(category, event.detail === 0)}>
            {category}
          </button>
        ))}
      </div>
      <div className="catalog-status-bar" data-reveal>
        <p className="catalog-count" role="status">
          {shown.length} {shown.length === 1 ? "program" : "programs"}
        </p>
      </div>
      <div ref={grid} className="catalog-grid" aria-busy={requested !== selected}>
        {shown.map((program) => <ProgramCard program={program} key={program.key} />)}
      </div>
    </div>
  );
}
