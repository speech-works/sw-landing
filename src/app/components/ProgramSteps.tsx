"use client";
import { useEffect, useRef, useState } from "react";
import { useInView } from "./useInView";
import type { ProgramPageData } from "@/content/program-page";

const COLOURS = ["#9cc0ff", "#ffc48f", "#c7aaf3"];

/** The daily plan: step cards on the road; each holds its day tiles and the selected day's title. */
export default function ProgramSteps({ data, dayTitles }: { data: ProgramPageData; dayTitles: string[] }) {
  const [ref, inView] = useInView<HTMLElement>(0.3);
  const cursor = useRef(1); // last selected day, 1-based (drives the slow auto-advance)
  const [openStep, setOpenStep] = useState(0); // for phones, one step open at a time
  const touched = useRef(false);
  const stepOf = (d: number) => data.steps.findIndex((s) => d >= s.first && d <= s.last);
  // Each step remembers its own selected day.
  const [picked, setPicked] = useState(() => data.steps.map((s) => s.first));

  const select = (d: number, user: boolean) => {
    const s = stepOf(d);
    cursor.current = d;
    setPicked((p) => p.map((v, i) => (i === s ? d : v)));
    if (!user || window.innerWidth <= 900) setOpenStep(s);
    if (user) touched.current = true;
  };

  useEffect(() => {
    if (!inView || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (touched.current) return window.clearInterval(timer);
      const next = cursor.current >= dayTitles.length ? 1 : cursor.current + 1;
      select(next, false);
    }, 2600);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, dayTitles.length]);

  return (
    <section ref={ref} className={`ps section-wrap${inView ? " in" : ""}`} aria-labelledby="plan-title">
      <div className="pg-head">
        <h2 id="plan-title">{data.planTitle}</h2>
        <p>{data.planIntro}</p>
      </div>
      <div className="ps-steps" style={{ gridTemplateColumns: data.steps.map((s) => `${s.last - s.first + 1}fr`).join(" ") }}>
        {data.steps.map((step, s) => {
          const shown = picked[s];
          return (
            <article key={step.title} className={`ps-step${openStep === s ? " open" : ""}`} style={{ background: COLOURS[s % 3], "--k": s } as React.CSSProperties}>
              <button type="button" className="ps-head" aria-expanded={openStep === s} onClick={() => { touched.current = true; setOpenStep(s); }}>
                <span className="ps-hex" aria-hidden="true">
                  <svg viewBox="0 0 56 50"><polygon points="14,2 42,2 54,25 42,48 14,48 2,25" fill="#fff9e9" stroke="#141311" strokeWidth="3" strokeLinejoin="round" /></svg>
                  <b>{s + 1}</b>
                </span>
                <span className="ps-title"><b>{step.title}</b><small>Days {step.first} to {step.last}</small></span>
                <i className="ps-chev" aria-hidden="true" />
              </button>
              <div className="ps-body">
                <div className="ps-days">
                  {Array.from({ length: step.last - step.first + 1 }, (_, i) => step.first + i).map((d) => (
                    <button key={d} type="button" className={`ps-day${shown === d ? " on" : ""}`} aria-pressed={shown === d}
                      aria-label={`Day ${d}: ${dayTitles[d - 1]}`}
                      onClick={() => select(d, true)}
                      onMouseEnter={() => { if (window.innerWidth > 900) select(d, true); }}>
                      {d}
                    </button>
                  ))}
                </div>
                <p className="ps-line" aria-live="polite" key={shown}>
                  <small>Day {shown}</small>
                  <span>{dayTitles[shown - 1]}</span>
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
