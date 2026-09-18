"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { playPop, unlockAudioOnInteraction } from "@/lib/pop-sound";

type Phase = "hidden" | "shown" | "leaving";

// Scrolling back and forth past the cards should not pop again every time.
const POP_COOLDOWN_MS = 10000;

/** A cast member pops up in the corner with the launch offer while the program cards are on screen. Prices vary by country, so it shows only the discount. */
export default function OfferChat({ percent, same, face }: { percent: number; same: boolean; face: string }) {
  const pathname = usePathname();
  const [phase, setPhase] = useState<Phase>("hidden");
  const lastPop = useRef(0);

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

  if (phase === "hidden") return null;

  return (
    <aside
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
        {/* Trusted SVG prepared at build time from our own avatar artwork. */}
        <span className="offer-chat-portrait" dangerouslySetInnerHTML={{ __html: face }} />
      </span>
    </aside>
  );
}
