"use client";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import ComicBubble from "./ComicBubble";
import { useInView } from "./useInView";
import { playPop, unlockAudioOnInteraction } from "@/lib/pop-sound";
import type { ProgramPageData } from "@/content/program-page";
import { useMascot } from "@/lib/useMascot";


/** The example as a comic strip: each line pops out of the person who says it. */
export default function ProgramChat({ data, you }: { data: ProgramPageData; you: string }) {
  const [ref, inView] = useInView<HTMLElement>(0.35);
  const mascot = useMascot();
  const [shown, setShown] = useState(0);
  const [run, setRun] = useState(0);

  useEffect(() => unlockAudioOnInteraction(), []);
  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(data.chat.length); return; }
    setShown(0);
    const timers = data.chat.map((_, i) => window.setTimeout(() => { setShown(i + 1); playPop(); }, 250 + i * 950));
    return () => timers.forEach(window.clearTimeout);
  }, [inView, run, data.chat]);

  if (!data.chat.length) return null;
  return (
    <section ref={ref} className="pc3 section-wrap" aria-labelledby="chat-title">
      <div className="pg-head">
        <h2 id="chat-title">{data.chatTitle}</h2>
        <p>{data.chatIntro}</p>
      </div>
      <ol className="pc3-strip" style={{ gridTemplateColumns: `repeat(${data.chat.length}, minmax(0, 1fr))` }}
        onClick={() => setRun((r) => r + 1)} title="Tap to replay">
        {data.chat.map((beat, i) => {
          const me = beat.who === "you";
          return (
            <li key={i} className={`pc3-beat ${me ? "me" : "sw"}${i < shown ? " show" : ""}`} style={{ "--k": i } as React.CSSProperties}>
              <ComicBubble kind="say" aim=".pc3-av" shape={me ? "box" : "oval"} tilt={[-2.5, 2, -1.5, 2.5][i % 4]} seed={i + 2} lean={i % 2 ? 0.2 : -0.2} bend={i % 2 ? 1.2 : -1.2} cls="pc3-bub" show={i < shown} tone={me ? "#9cc0ff" : "#fffdf6"}>{beat.text}</ComicBubble>
              <Avatar name={me ? you : mascot ?? "mascot"} size={200} className={`pc3-av${!me && !mascot ? " mascot-wait" : ""}`} />
              <small className="pc3-who">{me ? "You" : "Speechworks"}</small>
            </li>
          );
        })}
      </ol>
      <p className="pc3-note">{data.chatNote}</p>
    </section>
  );
}
