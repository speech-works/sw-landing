"use client";
import { useEffect, useState } from "react";
import ComicBubble, { type Pt } from "./ComicBubble";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { playPop, unlockAudioOnInteraction } from "@/lib/pop-sound";
import { heroStories } from "@/content/program-page";
import { useInView } from "./useInView";
import { useMascot } from "@/lib/useMascot";

const INK = "#141311";
// Where each tail points: just outside the speaker's head (matches the card positions in program-page.css).
const TIP: Record<"think" | "you" | "help" | "real", Pt> = { think: [0.17, 0.37], you: [0.17, 0.385], help: [0.735, 0.235], real: [0.665, 0.79] };

type Fill = { a: string; b?: string; kind?: "hstripe" | "dots" };

const lines = (t: string) => t.split("\n").map((l, i) => <span key={i} className="hs-l">{l}</span>);


/** One avatar on its own kit blob: the full collar shows and the body ends on the blob curve. */
function BlobAvatar({ name, fill, id }: { name: string; fill: Fill; id: string }) {
  const blob = avatarBlobs[name];
  const pattern =
    fill.kind === "hstripe" ? (
      <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse"><rect width="44" height="44" fill={fill.a} /><rect width="44" height="22" fill={fill.b} /></pattern>
    ) : fill.kind === "dots" ? (
      <pattern id={id} width="36" height="36" patternUnits="userSpaceOnUse"><rect width="36" height="36" fill={fill.a} /><circle cx="18" cy="18" r="6" fill={fill.b} /></pattern>
    ) : null;
  return (
    <svg viewBox="-60 -5 440 315" aria-hidden="true">
      {pattern && <defs>{pattern}</defs>}
      {blob && <path d={blob.d} fill={pattern ? `url(#${id})` : fill.a} />}
      <image href={`/avatars/${name}.svg?v=20261122`} width="320" height="310" />
    </svg>
  );
}

/**
 * The hero picture for a program page, three beats: you think (a thought bubble and a "?"), Speechworks helps,
 * then the real moment (the "?" becomes a lightbulb and you, or the other person, speak).
 */
export default function HeroStory({ program, you, label }: { program: string; you: string; label: string }) {
  const data = heroStories[program];
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [beat, setBeat] = useState(0);
  const [run, setRun] = useState(0);
  const mascot = useMascot();

  useEffect(() => unlockAudioOnInteraction(), []);
  useEffect(() => {
    if (!inView || !data) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setBeat(3); return; }
    setBeat(0);
    const timers = [500, 1900, 3300].map((ms, i) => window.setTimeout(() => { setBeat(i + 1); playPop(); }, ms));
    return () => timers.forEach(window.clearTimeout);
  }, [inView, run, data]);

  if (!data) {
    return (
      <div ref={ref} className="hs hs-solo" role="img" aria-label={label}>
        <div className="hs-card hs-one"><BlobAvatar name={you} fill={{ a: avatarBlobs[you]?.a ?? "#fff9e9" }} id={`hs-${program}`} /></div>
      </div>
    );
  }
  const youSpeaks = data.final.who === "you";
  return (
    <div ref={ref} className={`hs beat-${beat}`} role="img" aria-label={data.alt} onClick={() => setRun((r) => r + 1)}>
      {/* 1. you think; when you speak, your words take the thought's place */}
      <ComicBubble kind="think" tilt={-2} seed={3} tip={TIP.think} cls={`hs-think${youSpeaks && beat >= 3 ? " gone" : ""}`} show={beat >= 1}>{lines(data.thought)}</ComicBubble>
      <div className="hs-card hs-you"><BlobAvatar name={you} fill={{ a: "#3B5BA9", b: "#fff4e6", kind: "hstripe" }} id="hs-you" /><span className="hs-tag">You</span></div>
      <span className={`hs-mark${beat >= 1 ? " show" : ""}${beat >= 3 ? " idea" : ""}`} aria-hidden="true">
        <svg className="hs-q" viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="#fff9e9" stroke={INK} strokeWidth="3" /><path d="M14 15C14 9 26 8 26 15C26 20 20 20 20 25" fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" /><circle cx="20" cy="31" r="2.2" fill={INK} /></svg>
        <svg className="hs-bulb" viewBox="0 0 40 40"><circle cx="20" cy="20" r="17" fill="#c6f35b" stroke={INK} strokeWidth="3" /><path d="M20 9C14 9 11 13 11 17C11 21 15 23 15 27H25C25 23 29 21 29 17C29 13 26 9 20 9Z" fill="#fff9e9" stroke={INK} strokeWidth="2.6" strokeLinejoin="round" /><path d="M16 31H24" stroke={INK} strokeWidth="2.6" strokeLinecap="round" /></svg>
      </span>
      {/* 2. Speechworks helps */}
      <svg className="hs-arrow hs-a1" viewBox="0 0 140 90" aria-hidden="true"><path d="M6 78C20 40 52 30 60 52C66 70 40 74 46 52C54 26 92 18 128 14M128 14L110 4M128 14L114 28" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div className={`hs-card hs-sw${mascot ? "" : " mascot-wait"}`}><BlobAvatar name={mascot ?? "mascot"} fill={{ a: "#8fb8ff" }} id="hs-sw" /><span className="hs-tag dark">Speechworks</span></div>
      <ComicBubble kind="say" shape="oval" tilt={2} seed={7} tip={TIP.help} cls="hs-help" show={beat >= 2}>{lines(data.help)}</ComicBubble>
      {/* 3. the real moment */}
      <svg className="hs-arrow hs-a2" viewBox="0 0 120 110" aria-hidden="true"><path d="M10 8C60 14 96 36 100 96M100 96L86 82M100 96L112 80" fill="none" stroke={INK} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div className="hs-card hs-real"><BlobAvatar name={data.realAvatar} fill={{ a: "#c6f35b", b: "#fff4e6", kind: "dots" }} id="hs-real" /><span className="hs-tag">{data.real}</span></div>
      {youSpeaks
        ? <ComicBubble kind="say" shape="box" tilt={-3} tip={TIP.you} cls="hs-final-you" tone="#9cc0ff" show={beat >= 3}>{lines(data.final.text)}</ComicBubble>
        : <ComicBubble kind="say" shape="oval" tilt={-2} seed={11} tip={TIP.real} cls="hs-final-real" tone="#c7aaf3" show={beat >= 3}>{lines(data.final.text)}</ComicBubble>}
      <svg className={`hs-check${beat >= 3 ? " show" : ""}`} viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="#c6f35b" stroke={INK} strokeWidth="3.5" /><path d="M18 31L27 40L43 22" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
}
