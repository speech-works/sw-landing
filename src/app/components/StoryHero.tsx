"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { playChime, playPop, unlockAudioOnInteraction } from "@/lib/pop-sound";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";
import ComicBubble, { type Anchor } from "./ComicBubble";
import { useInView } from "./useInView";
import { MASCOT_PROPS } from "@/lib/mascot-props";
import { useMascot } from "@/lib/useMascot";
import { storyScripts } from "@/content/program-page";

// the mascot's pocket square and tie clip, drawn over his jacket
const PROPS = <g dangerouslySetInnerHTML={{ __html: MASCOT_PROPS }} />;

type Fill = { a: string; b?: string; kind?: "hstripe" | "dots" };
const VB = "-60 -5 440 315";

function Blob({ name, fill, id }: { name: string; fill: Fill; id: string }) {
  const d = avatarBlobs[name]?.d;
  const pat = fill.kind === "hstripe"
    ? <pattern id={id} width="44" height="44" patternUnits="userSpaceOnUse"><rect width="44" height="44" fill={fill.a} /><rect width="44" height="22" fill={fill.b} /></pattern>
    : fill.kind === "dots"
      ? <pattern id={id} width="36" height="36" patternUnits="userSpaceOnUse"><rect width="36" height="36" fill={fill.a} /><circle cx="18" cy="18" r="6" fill={fill.b} /></pattern>
      : null;
  return <>{pat && <defs>{pat}</defs>}{d && <path d={d} fill={pat ? `url(#${id})` : fill.a} />}</>;
}

function Person({ name, rig, fill, id, face, cls, tag, dark, initial = "calm", overlay }: {
  overlay?: React.ReactNode; name: string; rig: MailmanRig | null; fill: Fill; id: string; face: React.RefObject<RigFaceHandle | null>; cls: string; tag: string; dark?: boolean; initial?: string;
}) {
  return (
    <div className={`st-card ${cls}`}>
      {rig
        ? <RigFace ref={face} rig={rig} initial={initial} cut={avatarBlobs[name]?.d} viewBox={VB} underlay={<Blob name={name} fill={fill} id={id} />} overlay={overlay} className="st-fig" />
        : <svg viewBox={VB} className="st-fig" aria-hidden="true"><Blob name={name} fill={fill} id={id} /><image href={`/avatars/${name}.svg?v=20261122`} width="320" height="310" /></svg>}
      <span className={`hs-tag${dark ? " dark" : ""}`}>{tag}</span>
    </div>
  );
}

// Where each tail ends. You and the other person: the top of the head, measured from the figure's own drawing once it is on screen
// (auto). Speechworks: the right edge of the hair at eye level, measured from the art of each mascot.
const AT_SW: Anchor = { el: ".st-sw", pt: [238.2, 73], dir: [1, 0], gap: 3 };
const AT_SW_F: Anchor = { el: ".st-sw", pt: [239, 73], dir: [1, 0], gap: 3 };

// face rigs by figure name (loaded only when the story is on screen); "phone-call" is drawn by the call-f rig
const RIG: Record<string, () => Promise<MailmanRig>> = {
  "banker-b": () => import("@/lib/card-rigs/banker-b.generated").then((m) => m.bankerBRig),
  "phone-call": () => import("@/lib/card-rigs/call-f.generated").then((m) => m.callFRig),
  hijab: () => import("@/lib/card-rigs/hijab.generated").then((m) => m.hijabRig),
  beanie: () => import("@/lib/card-rigs/beanie.generated").then((m) => m.beanieRig),
  barista: () => import("@/lib/card-rigs/barista.generated").then((m) => m.baristaRig),
  braids: () => import("@/lib/card-rigs/braids.generated").then((m) => m.braidsRig),
  curly: () => import("@/lib/card-rigs/curly.generated").then((m) => m.curlyRig),
  flower: () => import("@/lib/card-rigs/flower.generated").then((m) => m.flowerRig),
  turban: () => import("@/lib/card-rigs/turban.generated").then((m) => m.turbanRig),
  coils: () => import("@/lib/card-rigs/coils.generated").then((m) => m.coilsRig),
  headphones: () => import("@/lib/card-rigs/headphones.generated").then((m) => m.headphonesRig),
  saltpepper: () => import("@/lib/card-rigs/saltpepper.generated").then((m) => m.saltpepperRig),
  bob: () => import("@/lib/card-rigs/bob.generated").then((m) => m.bobRig),
  coach: () => import("@/lib/card-rigs/coach.generated").then((m) => m.coachRig),
  cap: () => import("@/lib/card-rigs/cap.generated").then((m) => m.capRig),
  bald: () => import("@/lib/card-rigs/bald.generated").then((m) => m.baldRig),
  pigtails: () => import("@/lib/card-rigs/pigtails.generated").then((m) => m.pigtailsRig),
  cowboy: () => import("@/lib/card-rigs/cowboy.generated").then((m) => m.cowboyRig),
  scholar: () => import("@/lib/card-rigs/scholar.generated").then((m) => m.scholarRig),
  mascot: () => import("@/lib/card-rigs/mascot.generated").then((m) => m.mascotRig),
  "mascot-f": () => import("@/lib/card-rigs/mascot-f.generated").then((m) => m.mascotFRig),
};

// a phone buzzing in the other person's blob, beside the head (never over the collar)
const PHONE = (
  <g className="st-phone-art" transform="translate(272 168) scale(1.75)">
    <path className="st-buzz" d="M-24 -14Q-30 0 -24 14M-31 -20Q-40 0 -31 20M24 -14Q30 0 24 14M31 -20Q40 0 31 20" fill="none" stroke="#141311" strokeWidth="3.2" strokeLinecap="round" />
    <rect x="-14" y="-25" width="28" height="50" rx="6" fill="#141311" />
    <rect x="-10.5" y="-19" width="21" height="36" rx="2.5" fill="#fff4e6" />
    <rect x="-7.5" y="-14" width="15" height="7" rx="2" fill="#F76117" />
    <path d="M-7.5 -1H7.5M-7.5 5H4" stroke="#141311" strokeWidth="2" strokeLinecap="round" />
    <circle cx="0" cy="21" r="1.8" fill="#fff4e6" />
  </g>
);

const lines = (t: string) => t.split("\n").map((l, i) => <span key={i} className="hs-l">{l}</span>);
const REPLAY = <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;

/**
 * The program page hero story, in a triangle: the other person asks (bottom right), you get stuck (a thought, worried face),
 * Speechworks drops in at the top and you look at each other while it whispers one tip, then you smile and answer.
 */
export default function StoryHero({ program, you: youName }: { program: string; you: string }) {
  const data = storyScripts[program];
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [rigs, setRigs] = useState<{ you: MailmanRig | null; sw: MailmanRig | null; real: MailmanRig | null } | null>(null);
  const you = useRef<RigFaceHandle>(null), sw = useRef<RigFaceHandle>(null), real = useRef<RigFaceHandle>(null);
  const [beat, setBeat] = useState(0);
  const [run, setRun] = useState(0);
  const mascot = useMascot();
  const again = (e: React.MouseEvent) => { e.stopPropagation(); setRun((r) => r + 1); };
  // new anchor objects once the rigs are drawn, so the bubbles measure the heads again
  const at = useMemo(() => ({
    you: { el: ".st-you", dir: [0, -1], auto: !!rigs } as Anchor,
    real: { el: ".st-real", dir: [0, -1], auto: !!rigs } as Anchor,
  }), [rigs]);

  useEffect(() => unlockAudioOnInteraction(), []);
  useEffect(() => {
    if (!mascot || !data) return;
    let alive = true;
    const load = (n: string) => (RIG[n] ? RIG[n]() : Promise.resolve(null));
    Promise.all([load(youName), load(mascot), load(data.realAvatar)])
      .then(([a, b, c]) => { if (alive) setRigs({ you: a, sw: b, real: c }); });
    return () => { alive = false; };
  }, [mascot, youName, data]);

  useEffect(() => {
    if (!inView || !rigs) return;
    const Y = you.current, S = sw.current, R = real.current;
    if (!Y || !S || !R) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (still) { setBeat(6); void Y.to("smile", 0.01); Y.gazeTo(16, 2, 0.01); return; }
    const blinks = [Y.idle(), S.idle(), R.idle()];
    // start: you and the other person face each other; Speechworks is not here yet
    setBeat(0);
    void Y.to("calm", 0.2); void S.to("listening", 0.2); void R.to("calm", 0.2);
    Y.gazeTo(16, 2, 0.2); R.gazeTo(-16, 2, 0.2); S.gazeTo(-6, 10, 0.2);
    const steps: [number, () => void][] = [
      // 1. the real moment: the other person asks
      [500, () => { setBeat(1); playPop(); void R.to("smile", 0.4); if (data.prop === "phone") R.gazeTo(14, 12, 0.3); }],
      // 2. you get stuck: worried face, eyes drop, a thought grows
      [1900, () => { void Y.to("thinking", 0.5); Y.gazeTo(-4, 11, 0.5); }],
      [2300, () => { setBeat(2); playPop(); }],
      // 3. Speechworks drops in at the top and looks at you; you look up
      [3900, () => { setBeat(3); playPop(); S.gazeTo(-14, 11, 0.4); void S.to("listening", 0.3); }],
      [4500, () => { void Y.to("curious", 0.4); Y.gazeTo(9, -13, 0.4); if (data.prop !== "phone") R.gazeTo(-14, 6, 0.4); }],
      // 4. Speechworks whispers the tip
      [5100, () => { setBeat(4); playChime("sparkle"); void S.to("warm", 0.4); }],
      // 5. the thought goes, you smile: you know what to say
      [6900, () => { setBeat(5); void Y.to("proud", 0.5); }],
      // 6. you turn to the other person and answer; Speechworks watches, pleased
      [7900, () => { Y.gazeTo(16, 2, 0.4); void S.to("smile", 0.4); S.gazeTo(8, 10, 0.4); R.gazeTo(-16, 2, 0.3); }],
      [8300, () => { setBeat(6); playPop(); void Y.to("smile", 0.4); }],
      [9200, () => { void R.to("smile", 0.4); }],
    ];
    const timers = steps.map(([ms, fn]) => window.setTimeout(fn, ms));
    return () => { timers.forEach(window.clearTimeout); blinks.forEach((b) => b.stop()); };
  }, [inView, rigs, run, data]);

  if (!data) return null;
  const f = mascot === "mascot-f";
  return (
    <div ref={ref} className={`st beat-${beat}${f ? " sw-f" : ""}`} role="img" onClick={() => setRun((r) => r + 1)} aria-label={data.alt}>
      <div className={`st-swwrap${beat >= 3 ? " in" : ""}${mascot ? "" : " mascot-wait"}`}>
        <Person name={mascot ?? "mascot"} rig={rigs?.sw ?? null} overlay={PROPS} fill={{ a: "#8fb8ff" }} id="st-sw" face={sw} cls="st-sw" tag="Speechworks" dark initial="listening" />
      </div>
      <Person name={youName} rig={rigs?.you ?? null} fill={{ a: "#3B5BA9", b: "#fff4e6", kind: "hstripe" }} id="st-you" face={you} cls="st-you" tag="You" />
      <Person name={data.realAvatar} rig={rigs?.real ?? null} overlay={data.prop === "phone" ? <g className={`st-phone${beat >= 1 && beat < 5 ? " on" : ""}`}>{PHONE}</g> : undefined} fill={{ a: "#c6f35b", b: "#fff4e6", kind: "dots" }} id="st-real" face={real} cls="st-real" tag={data.real} />

      <ComicBubble kind="say" shape="oval" seed={11} tilt={2} anchor={at.real} cls={`st-b st-ask${beat >= 3 ? " gone" : ""}`} show={beat >= 1} tone="#c7aaf3">{lines(data.ask)}</ComicBubble>
      <ComicBubble kind="think" seed={3} tilt={-2} anchor={at.you} cls={`st-b st-think${beat >= 5 ? " gone" : ""}`} show={beat >= 2}>{lines(data.thought)}</ComicBubble>
      <ComicBubble kind="say" dashed shape="oval" seed={7} tilt={-1} anchor={f ? AT_SW_F : AT_SW} cls={`st-b st-whisper${f ? " is-f" : ""}`} show={beat >= 4}>{lines(data.help)}</ComicBubble>
      <ComicBubble kind="say" shape="box" tilt={-3} anchor={at.you} cls="st-b st-say" show={beat >= 6} tone="#9cc0ff">{lines(data.answer)}</ComicBubble>
      <button type="button" className={`st-replay r-hint${beat >= 6 ? " show" : ""}`} onClick={again} aria-label="Replay the story">
        {REPLAY}<span><span className="w-tap">Tap</span><span className="w-click">Click</span> the picture to replay</span>
      </button>
      <svg className={`st-check${beat >= 6 ? " show" : ""}`} viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="#c6f35b" stroke="#141311" strokeWidth="3.5" /><path d="M18 31L27 40L43 22" fill="none" stroke="#141311" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
}
