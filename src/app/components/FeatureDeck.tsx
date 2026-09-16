"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Mic,
  Pause,
  Phone,
  Play,
  Volume2,
  Wind,
} from "lucide-react";
import Avatar from "./Avatar";
import { gsap, useGSAP } from "@/lib/motion";
import { programs } from "@/content/programs";

const features = ["Programs", "Rehearse", "Practise", "Keep"];
const poses = [
  { x: 0, y: 0, xPercent: 0, rotation: -3 },
  { x: 12, y: -7, xPercent: 0, rotation: 5 },
  { x: -9, y: 0, xPercent: 0, rotation: -8 },
  { x: 5, y: -9, xPercent: 0, rotation: 10 },
];
const bringForward = (order: number[], next: number) =>
  next === order[0] ? order : [next, ...order.slice(1).filter(index => index !== next), order[0]];

function Preview({ index }: { index: number }) {
  if (index === 0)
    return (
      <>
        <div className="preview-top">
          <span className="preview-brand">14-day program</span>
          <BookOpen size={18} />
        </div>
        <div className="program-preview-title">
          <div>
            <h2>
              Interview
              <br />
              Ready.
            </h2>
          </div>
          <span className="preview-medallion">
            <Mic size={32} strokeWidth={1.8} />
          </span>
        </div>
        <div className="lesson-preview">
          <span className="lesson-number">01</span>
          <span>
            <small>Start here</small>
            <strong>{programs[0].outline[0].title}</strong>
          </span>
          <ArrowUpRight size={17} />
        </div>
        <div className="preview-bottom">
          <span>See the daily outline</span>
          <ArrowRight size={16} />
        </div>
      </>
    );
  if (index === 1)
    return (
      <>
        <div className="preview-top">
          <span>AI conversation practice</span>
          <Phone size={18} />
        </div>
        <div className="call-preview-person">
          <Avatar name="caller" size={78} />
          <div>
            <small>Let&apos;s rehearse</small>
            <h2>
              The call you
              <br />
              want to make.
            </h2>
          </div>
        </div>
        <div className="voice-bars" aria-hidden="true">
          {[
            16, 28, 42, 22, 36, 48, 26, 18, 34, 44, 22, 38, 16, 28, 42, 18, 32,
            24, 40, 18, 28, 14,
          ].map((height, i) => (
            <i key={i} style={{ height, animationDelay: `${i * -83}ms` }} />
          ))}
        </div>
        <div className="call-preview-controls">
          <span>
            <Volume2 size={19} />
          </span>
          <span className="call-mic">
            <Mic size={22} />
          </span>
          <span>
            <Phone size={19} />
          </span>
        </div>
      </>
    );
  if (index === 2)
    return (
      <>
        <div className="preview-top">
          <span>Breathing practice</span>
          <Wind size={20} />
        </div>
        <div className="practice-preview">
          <div className="breathing-disc">
            <div>
              <Wind size={39} strokeWidth={1.6} />
            </div>
          </div>
          <h2>
            A moment
            <br />
            for yourself.
          </h2>
          <p>Explore breathing practice in the app.</p>
        </div>
      </>
    );
  return (
    <>
      <div className="preview-top">
        <span>Saved notes</span>
        <span className="small-check">
          <Check size={16} />
        </span>
      </div>
      <div className="keepsake-preview">
        <span className="note-label">My call plan</span>
        <h2>
          “I&apos;ll start with
          <br />
          what I need.”
        </h2>
        <div className="note-rule" />
        <p>
          The repair. A time that works.
          <br />
          One thing at a time.
        </p>
      </div>
      <div className="preview-bottom">
        <span>Example of a personal keepsake</span>
        <BookOpen size={16} />
      </div>
    </>
  );
}

export default function FeatureDeck() {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [requested, setRequested] = useState(0);
  const active = order[0];
  const [playing, setPlaying] = useState(true);
  const [reduced, setReduced] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const root = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const animation = useRef<gsap.core.Timeline | null>(null);
  const direction = useRef(1);
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      setReduced(motion.matches);
      if (motion.matches) {
        setPlaying(false);
        animation.current?.progress(1);
      }
    };
    const updateVisibility = () => {
      setVisible(!document.hidden);
      if (document.hidden) animation.current?.progress(1);
    };
    const finishOnResize = () => animation.current?.progress(1);
    window.addEventListener("resize", finishOnResize);
    updateMotion();
    updateVisibility();
    motion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    if (root.current) observer.observe(root.current);
    return () => {
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
      observer.disconnect();
      window.removeEventListener("resize", finishOnResize);
      animation.current?.kill();
      animation.current = null;
    };
  }, []);

  useGSAP(() => {
    // While a handoff is running, remember only the latest requested card.
    if (animation.current) return;
    const elements = cards.current.filter((card): card is HTMLElement => card !== null);
    gsap.set(elements, { clearProps: "transform,zIndex,willChange" });
    elements.forEach(card => card.removeAttribute("data-exposed"));
    if (requested === active) return;
    const nextOrder = bringForward(order, requested);
    if (reduced || document.hidden) {
      setOrder(nextOrder);
      return;
    }
    const front = cards.current[active]!;
    const incoming = cards.current[requested]!;
    const compact = window.matchMedia("(max-width: 600px)").matches;
    const side = direction.current;
    front.dataset.exposed = "true";
    incoming.dataset.exposed = "true";
    elements.forEach((card, index) => {
      const slot = order.indexOf(index);
      gsap.set(card, { ...poses[slot], zIndex: 4 - slot, willChange: "transform" });
    });
    const timeline = gsap.timeline({
      onComplete: () => {
        animation.current = null;
        setOrder(nextOrder);
      },
    });
    animation.current = timeline;
    // Lift and fan the front card aside. No opacity change or content replacement.
    timeline.to(front, {
      xPercent: (compact ? 16 : 44) * side, x: 0,
      y: compact ? -14 : -24, rotation: (compact ? 7 : 11) * side,
      duration: 0.24, ease: "power2.out",
    }, 0);
    // The selected card meets it from the other side before moving to the front.
    timeline.to(incoming, {
      x: (compact ? -8 : -22) * side, y: 3, rotation: -6 * side,
      duration: 0.24, ease: "power2.inOut",
    }, 0);
    timeline.set(incoming, { zIndex: 5 }, 0.24);
    timeline.set(front, { zIndex: 1 }, 0.24);
    nextOrder.forEach((index, slot) => {
      const card = cards.current[index]!;
      if (index !== active && index !== requested) {
        timeline.set(card, { zIndex: 4 - slot }, 0.24);
      }
      timeline.to(card, {
        ...poses[slot], duration: index === active ? 0.36 : 0.3,
        ease: "power3.out",
      }, 0.24);
    });
    return () => {
      elements.forEach(card => card.removeAttribute("data-exposed"));
    };
  }, { scope: root, dependencies: [order, requested, active, reduced] });

  function change(next: number, immediate = false, side = 1) {
    direction.current = side;
    setRequested(next);
    if (immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animation.current?.kill();
      animation.current = null;
      setOrder(current => bringForward(current, next));
    }
  }

  const running =
    playing && !reduced && !hovered && !focused && visible && inView;
  useEffect(() => {
    if (!running || requested !== active) return;
    const timer = window.setTimeout(() => {
      direction.current = 1;
      setRequested(order[1]);
    }, 4800);
    return () => window.clearTimeout(timer);
  }, [active, order, requested, running]);

  return (
    <div ref={root} className="feature-showcase" data-running={running} data-reveal>
      <div className="hero-avatar hero-avatar-one">
        <div className="depth-portrait" data-depth="1.15"><Avatar name="turban" size={114} priority /></div>
      </div>
      <div className="hero-avatar hero-avatar-two">
        <div className="depth-portrait" data-depth="-0.85"><Avatar name="silver" size={96} priority /></div>
      </div>
      <div className="hero-avatar hero-avatar-three">
        <div className="depth-portrait" data-depth="0.75"><Avatar name="pigtails" size={104} priority /></div>
      </div>
      <div className="hero-avatar hero-avatar-four">
        <div className="depth-portrait" data-depth="-1.1"><Avatar name="coils" size={122} priority /></div>
      </div>
      <span className="hero-doodle doodle-one" aria-hidden="true">
        ✳
      </span>
      <span className="hero-doodle doodle-two" aria-hidden="true">
        ✳
      </span>
      <div
        className="feature-deck"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") setHovered(true);
        }}
        onPointerLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
        onPointerDown={(event) => {
          if (
            !event.isPrimary ||
            event.button !== 0 ||
            (event.target as HTMLElement).closest("button")
          )
            return;
          pointer.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
        onPointerUp={(event) => {
          const start = pointer.current;
          pointer.current = null;
          if (!start || start.id !== event.pointerId) return;
          const distance = event.clientX - start.x;
          if (
            Math.abs(distance) > 45 &&
            Math.abs(distance) > Math.abs(event.clientY - start.y)
          ) {
            setPlaying(false);
            change(order[distance < 0 ? 1 : 3], false, Math.sign(distance));
          }
        }}
        role="region"
        aria-roledescription="carousel"
        aria-label="A look inside Speechworks"
      >
        <div className="card-stage">
          {features.map((name, index) => {
            const slot = order.indexOf(index);
            return (
              <article
                key={name}
                ref={(element) => {
                  cards.current[index] = element;
                }}
                className={`feature-card feature-card-${index}`}
                data-slot={slot}
                aria-hidden={slot !== 0}
                aria-label={`${name}, ${index + 1} of 4`}
              >
                <Preview index={index} />
              </article>
            );
          })}
        </div>
        <div className="deck-controls">
          <div className="deck-choices" aria-label="Choose an app feature">
            {features.map((name, index) => (
              <button
                key={name}
                className="deck-choice"
                aria-pressed={index === requested}
                onClick={(event) => {
                  setPlaying(false);
                  change(index, event.detail === 0);
                }}
              >
                <span className="choice-dot" aria-hidden="true" />
                <span>{name}</span>
              </button>
            ))}
          </div>
          <button
            className="deck-play icon-button pressable"
            aria-label={
              playing && !reduced
                ? "Pause feature animation"
                : "Play feature animation"
            }
            aria-pressed={playing && !reduced}
            disabled={reduced}
            onClick={() => setPlaying((value) => !value)}
          >
            {playing && !reduced ? (
              <Pause size={14} fill="currentColor" />
            ) : (
              <Play size={14} fill="currentColor" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
