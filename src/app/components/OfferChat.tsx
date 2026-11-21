"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { playPop, unlockAudioOnInteraction } from "@/lib/pop-sound";
import ChatFace, { type ChatFaceHandle } from "./ChatFace";
import { gsap } from "@/lib/motion";

type Phase = "hidden" | "shown" | "leaving";

// Only a guard against a double pop when the grid flickers at the edge of the screen: every real appearance pops.
const POP_COOLDOWN_MS = 1500;

/** A cast member pops up in the corner with the launch offer while the program cards are on screen. Prices vary by country, so it shows only the discount. */
export default function OfferChat({ percent, same }: { percent: number; same: boolean }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("hidden");
  const lastPop = useRef(0);
  const face = useRef<ChatFaceHandle>(null);

  useEffect(() => unlockAudioOnInteraction(), []);

  useEffect(() => {
    // Only the home and programs pages list program cards.
    const cards = document.querySelector(".featured-programs, .catalog-grid");
    if (!cards) return;
    // Show once the grid's top edge is a quarter of the way up the screen (a ratio would
    // never be met by a tall grid on phones), and step aside after the grid scrolls past.
    const observer = new IntersectionObserver(([entry]) => {
      setPhase((current) => {
        if (entry.isIntersecting) return "shown";
        return current === "hidden" ? "hidden" : "leaving";
      });
    }, { rootMargin: "0px 0px -25% 0px" });
    observer.observe(cards);
    return () => {
      observer.disconnect();
      setPhase("hidden");
    };
  }, [pathname]);

  useEffect(() => {
    if (phase !== "shown" || Date.now() - lastPop.current < POP_COOLDOWN_MS) return;
    lastPop.current = Date.now();
    // Land the pop with the bubble, just after the face appears.
    const timer = window.setTimeout(playPop, 140);
    return () => window.clearTimeout(timer);
  }, [phase]);

  // Over the popup (the bubble or her face) or on its link with the keyboard: she zooms in, grins and looks at the text.
  const perk = () => { face.current?.loop(false); face.current?.to("grin", 0.3); face.current?.gazeTo(-16, -4, 0.3); };
  const calm = () => { face.current?.to("smile", 0.4); face.current?.gazeTo(0, 0, 0.3); face.current?.loop(true, 0.6); };

  // She waves hello just after she pops up, then blinks now and then. (No wave with reduced motion.)
  useEffect(() => {
    if (phase !== "shown") return;
    const f = face.current;
    if (!f || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const idle = f.idle();
    f.loop(true, 3.6);   // after the wave: the text, the visitor, the text, ...
    const wave = gsap.delayedCall(0.8, () => f.wave());
    return () => {
      wave.kill();
      idle.stop();
      f.loop(false);
      void f.lowerHands();
    };
  }, [phase]);

  if (phase === "hidden") return null;

  return (
    <aside
      onPointerEnter={perk}
      onPointerLeave={calm}
      onFocus={perk}
      onBlur={calm}
      className={`offer-chat${phase === "leaving" ? " is-leaving" : ""}`}
      aria-label="Launch offer"
      onAnimationEnd={(event) => {
        if (phase === "leaving" && event.target === event.currentTarget) setPhase("hidden");
      }}
    >
      <div className="offer-chat-bubble">
        <p>
          {same
            ? <>Psst, every program is <mark>{percent}% off</mark> at launch.</>
            : <>Psst, programs are <mark>up to {percent}% off</mark> at launch.</>}
        </p>
        <a href="#download" className="offer-chat-link">Get the app</a>
      </div>
      <span className="offer-chat-face">
        <span className="offer-chat-portrait"><ChatFace ref={face} /></span>
      </span>
    </aside>
  );
}
