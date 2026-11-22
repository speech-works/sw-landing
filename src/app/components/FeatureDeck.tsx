"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  Heart,
  PhoneIncoming,
  ScanFace,
  Users,
} from "lucide-react";
import Link from "next/link";
import Avatar from "./Avatar";
import { gsap, useGSAP } from "@/lib/motion";

const features = ["Interview", "AI calls", "Mirror", "Partner"];
// How long each card stays up before the deck turns; the progress pill fills over the same time.
const ROTATE_MS = 7500;
// Pill colours match the cards; the countdown fills in the colour of the card coming up next.
const cardColours = ["#3b3a36", "#c6f35b", "#94baff", "#c3a3f3"];
const poses = [
  { x: 0, y: 0, xPercent: 0, rotation: -3 },
  { x: 12, y: -7, xPercent: 0, rotation: 5 },
  { x: -9, y: 0, xPercent: 0, rotation: -8 },
  { x: 5, y: -9, xPercent: 0, rotation: 10 },
];
// Rotate the whole stack so previous and next remain inverse operations.
const bringForward = (order: number[], next: number) => {
  const slot = order.indexOf(next);
  return slot <= 0 ? order : [...order.slice(slot), ...order.slice(0, slot)];
};


function StillPortrait({ avatar, actor }: { avatar: string; actor: "interview-man" | "maya" | "caller" | "partner-one" | "partner-two" }) {
  return (
    <div className="character-portrait" data-actor={actor} aria-hidden="true">
      <Avatar name={avatar} size={200} />
    </div>
  );
}

function MirrorFace() {
  return (
    <div className="mirror-visual" aria-hidden="true">
      <div className="mirror-face">
        <div className="character-portrait" data-actor="mirror" aria-hidden="true"><Avatar name="mirror-quiff" size={320} plain /></div>
        <svg className="mirror-overlay" viewBox="0 0 320 310" focusable="false">
          <g transform="matrix(1.18 0 0 1.116 -28.8 18)">
            <g className="mirror-mesh">
              <path d="M92 108L125 98L160 96L196 98L230 108L230 133L227 165L223 190L203 210L160 224L117 210L97 190L95 165L92 133Z" />
              <path d="M92 108L122 108L124 138L92 133M230 108L197 108L196 138L230 133M125 98L122 108L160 96L197 108L196 98M122 108L160 120L197 108M160 96V120M124 138L160 120L196 138M124 138L157 163L196 138" />
              <path d="M92 133L95 165L124 138M230 133L227 165L196 138M95 165L139 187L157 163L181 187L227 165M95 165L97 190L139 187M227 165L223 190L181 187M97 190L117 210L139 187L160 193L117 210M223 190L203 210L181 187L160 193L203 210M117 210L160 224L203 210M139 187L181 187M157 163L160 193" />
            </g>
            <path className="mirror-scan" d="M92 138H230" />
            <g className="mirror-detection">
              <rect x="119" y="133" width="10" height="10" rx="1" />
              <rect x="191" y="133" width="10" height="10" rx="1" />
              <rect x="93" y="181" width="10" height="10" rx="1" />
              <rect x="217" y="181" width="10" height="10" rx="1" />
            </g>
          </g>
          <path className="mirror-frame" d="M24 48V22H50M270 22H296V48M24 262V288H50M270 288H296V262" />
        </svg>
      </div>
      <span className="mirror-legend"><i /> Jaw &amp; eye tension</span>

    </div>
  );
}

function FeatureLink({ href, children, note }: { href: string; children: ReactNode; note?: string }) {
  return (
    <Link className="feature-action" href={href}>
      <span><strong>{children}</strong>{note && <small>{note}</small>}</span>
      <span className="feature-action-arrow"><ArrowUpRight size={18} aria-hidden="true" /></span>
    </Link>
  );
}

function Preview({ index, outcome }: { index: number; outcome: boolean }) {
  if (index === 0)
    return (
      <>
        <div className="preview-top"><span>{outcome ? "Job interviews" : "Interview practice"}</span><Briefcase size={18} aria-hidden="true" /></div>
        <h2 className="feature-headline">{outcome ? <>Show what<br />you can do.</> : <>Practice for<br />your job interview.</>}</h2>
        <div className="character-scene interview-scene" aria-hidden="true">
          <StillPortrait avatar="banker" actor="interview-man" />
        </div>
        <FeatureLink href="/programs/interview-ready/">See the interview program</FeatureLink>
      </>
    );
  if (index === 1)
    return (
      <>
        <div className="preview-top"><span>{outcome ? "Phone calls" : "AI call practice"}</span><PhoneIncoming size={18} aria-hidden="true" /></div>
        <h2 className="feature-headline">{outcome ? <>Ask for what<br />you need.</> : <>Practice the call<br />before you make it.</>}</h2>
        <div className="character-scene call-scene" aria-hidden="true">
          <span className="character-ring" />
          <svg className="character-connection" viewBox="0 0 350 180" focusable="false">
            <path className="call-line-base" d="M177 96C194 78 212 121 234 103" />
            <path className="call-line-pulse call-line-out" pathLength="100" d="M177 96C194 78 212 121 234 103" />
            <path className="call-line-pulse call-line-back" pathLength="100" d="M177 96C194 78 212 121 234 103" />
          </svg>
          <StillPortrait avatar="phone-call" actor="maya" />
          <StillPortrait avatar="beanie" actor="caller" />
        </div>
        <FeatureLink href="/programs/hard-conversations/">See the phone call program</FeatureLink>
      </>
    );
  if (index === 2)
    return (
      <>
        <div className="preview-top"><span>{outcome ? "On-screen mirror" : "Mirror practice"}</span><ScanFace size={18} aria-hidden="true" /></div>
        <div className="mirror-preview">
          <div className="mirror-copy"><h2>Notice tension<br />as you speak.</h2></div>
          <MirrorFace />
        </div>
        <FeatureLink href="#download" note="Your video stays on your phone">Try the mirror</FeatureLink>
      </>
    );
  return (
    <>
      <div className="preview-top"><span>{outcome ? "Speaking partner" : "Partner practice"}</span><Users size={18} aria-hidden="true" /></div>
      <h2 className="feature-headline">{outcome ? <>Talk with someone<br />who stutters too.</> : <>Practice with someone<br />who stutters too.</>}</h2>
      <div className="partner-preview" aria-hidden="true">
        <div className="partner-person"><StillPortrait avatar="curly" actor="partner-one" /></div>
        <div className="partner-connection"><span /><Heart size={22} /><span /></div>
        <div className="partner-person"><StillPortrait avatar="hijab" actor="partner-two" /></div>
      </div>
      <FeatureLink href="#download">Get the app</FeatureLink>
    </>
  );
}

export default function FeatureDeck({ outcome = false, paused = false }: { outcome?: boolean; paused?: boolean }) {
  const [order, setOrder] = useState([0, 1, 2, 3]);
  const [requested, setRequested] = useState(0);
  const active = order[0];
  const [playing, setPlaying] = useState(!paused);
  const [autoRotate, setAutoRotate] = useState(true);
  const [keyboardInput, setKeyboardInput] = useState(false);
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
    playing && autoRotate && !reduced && !hovered && !focused && visible && inView;
  const illustrating = playing && !reduced && !keyboardInput && visible && inView;
  useEffect(() => {
    if (!running || requested !== active) return;
    const timer = window.setTimeout(() => {
      direction.current = 1;
      setRequested(order[1]);
    }, ROTATE_MS);
    return () => window.clearTimeout(timer);
  }, [active, order, requested, running]);

  return (
    <div ref={root} className="feature-showcase" data-running={running} data-illustrating={illustrating}
      onKeyDownCapture={() => setKeyboardInput(true)}
      onPointerDownCapture={() => setKeyboardInput(false)} data-reveal>
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
            (event.target as HTMLElement).closest("button, a")
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
            setAutoRotate(false);
            change((requested + (distance < 0 ? 1 : features.length - 1)) % features.length, false, Math.sign(distance));
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
                inert={slot !== 0}
                aria-label={`${name}, ${index + 1} of 4`}
              >
                <Preview index={index} outcome={outcome} />
              </article>
            );
          })}
        </div>
        <div
          className="deck-controls"
          data-counting={playing && autoRotate && !reduced}
          data-running={running}
          style={{ "--deck-interval": `${ROTATE_MS}ms`, "--deck-next": cardColours[order[1]] } as CSSProperties}
        >
          <div className="deck-choices" role="group" aria-label="Choose an app feature">
            {features.map((name, index) => (
              <button
                key={name}
                className="deck-choice"
                style={{ "--pill": cardColours[index] } as CSSProperties}
                aria-label={name}
                aria-pressed={index === requested}
                onClick={(event) => {
                  setAutoRotate(false);
                  setKeyboardInput(event.detail === 0);
                  change(index, event.detail === 0);
                }}
              >
                {/* Keyed by card so the progress bar restarts each time the deck turns. */}
                {index === requested && <span key={requested} className="deck-choice-fill" aria-hidden="true" />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
