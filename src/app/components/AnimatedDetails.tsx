"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function AnimatedDetails({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const element = ref.current!;
    const trigger = element.querySelector("summary")!;
    const content = element.querySelector<HTMLElement>(".accordion-content")!;
    let animation: Animation | undefined;
    let contentAnimation: Animation | undefined;
    let expanded = element.open;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => {
      animation?.cancel();
      contentAnimation?.cancel();
      animation = undefined;
      element.open = expanded;
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
      content.inert = !expanded;
    };
    const toggle = (event: MouseEvent) => {
      event.preventDefault();
      const from = element.getBoundingClientRect().height;
      expanded = !expanded;
      element.dataset.expanded = String(expanded);
      trigger.setAttribute("aria-expanded", String(expanded));
      animation?.cancel();
      contentAnimation?.cancel();
      if (reduced.matches || event.detail === 0) {
        finish();
        return;
      }
      element.open = true;
      content.inert = !expanded;
      element.style.height = "auto";
      const to = expanded ? element.getBoundingClientRect().height : trigger.getBoundingClientRect().height + 1;
      element.style.overflow = "hidden";
      // Only this disclosure changes height; decorative motion uses transforms.
      const current = element.animate([{ height: `${from}px` }, { height: `${to}px` }], {
        duration: expanded ? 260 : 190, easing: "cubic-bezier(0.23,1,0.32,1)", fill: "both",
      });
      animation = current;
      contentAnimation = content.animate(expanded
        ? [{ opacity: 0, transform: "translateY(-6px)" }, { opacity: 1, transform: "translateY(0)" }]
        : [{ opacity: getComputedStyle(content).opacity, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(-4px)" }],
      { duration: expanded ? 220 : 140, easing: "cubic-bezier(0.23,1,0.32,1)", fill: "both" });
      current.finished.then(() => { if (animation === current) finish(); }).catch(() => {});
    };
    trigger.addEventListener("click", toggle);
    window.addEventListener("resize", finish);
    reduced.addEventListener("change", finish);
    return () => {
      trigger.removeEventListener("click", toggle);
      window.removeEventListener("resize", finish);
      reduced.removeEventListener("change", finish);
      finish();
    };
  }, []);
  return (
    <details ref={ref} data-reveal>
      <summary>{summary}</summary>
      <div className="accordion-content">{children}</div>
    </details>
  );
}
