"use client";
import { useEffect, useRef, useState } from "react";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { playPop, unlockAudioOnInteraction } from "@/lib/pop-sound";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";
import ComicBubble, { type Anchor } from "./ComicBubble";
import { useInView } from "./useInView";
import { MASCOT_PROPS } from "@/lib/mascot-props";
import { useMascot } from "@/lib/useMascot";

// the mascot's pocket square and tie clip, drawn over his jacket
const PROPS = <g dangerouslySetInnerHTML={{ __html: MASCOT_PROPS }} />;

/**
 * Story hero (preview, Word Swap): the real moment first, then the inner struggle, then Speechworks helps, then you speak.
 * Triangle: Speechworks at the top, you bottom left, the other person bottom right. Faces change and eyes follow who is talking.
 */
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

// tail tips, as shares of the scene box: just outside each head
// exact points on each drawing (viewBox units), measured from the art: top of the turban and beanie, the right edge of his hair at eye level
const AT: Record<string, Anchor> = {
  you: { el: ".st-you", pt: [158, 7.4], dir: [0, -1] },
  real: { el: ".st-real", pt: [158, 7.4], dir: [0, -1] },
  sw: { el: ".st-sw", pt: [238.2, 73], dir: [1, 0], gap: 3 },
};
// the woman's bob reaches further out at eye level
const AT_SW_F: Anchor = { el: ".st-sw", pt: [239, 73], dir: [1, 0], gap: 3 };

export type ReplayStyle = "pill" | "icon" | "doodle" | "sticker" | "link" | "bubble" | "glass" | "scrim" | "frost" | "ring" | "hint";

export default function StoryHero({ replay = "hint" }: { replay?: ReplayStyle }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const [rigs, setRigs] = useState<{ you: MailmanRig; sw: MailmanRig; real: MailmanRig } | null>(null);
  const you = useRef<RigFaceHandle>(null), sw = useRef<RigFaceHandle>(null), real = useRef<RigFaceHandle>(null);
  const [beat, setBeat] = useState(0);
  const [run, setRun] = useState(0);
  const mascot = useMascot();
  const again = (e: React.MouseEvent) => { e.stopPropagation(); setRun((r) => r + 1); };

  useEffect(() => unlockAudioOnInteraction(), []);
  useEffect(() => {
    if (!mascot) return;
    let alive = true;
    Promise.all([import("@/lib/card-rigs/turban.generated"), mascot === "mascot-f" ? import("@/lib/card-rigs/mascot-f.generated").then((m) => m.mascotFRig) : import("@/lib/card-rigs/mascot.generated").then((m) => m.mascotRig), import("@/lib/card-rigs/beanie.generated")])
      .then(([a, b, c]) => { if (alive) setRigs({ you: a.turbanRig, sw: b, real: c.beanieRig }); });
    return () => { alive = false; };
  }, [mascot]);

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
      [500, () => { setBeat(1); playPop(); void R.to("smile", 0.4); }],
      // 2. you get stuck: worried face, eyes drop, a thought grows
      [1900, () => { void Y.to("thinking", 0.5); Y.gazeTo(-4, 11, 0.5); }],
      [2300, () => { setBeat(2); playPop(); }],
      // 3. Speechworks drops in at the top and looks at you; you look up at her
      [3900, () => { setBeat(3); playPop(); S.gazeTo(-14, 11, 0.4); void S.to("listening", 0.3); }],
      [4500, () => { void Y.to("curious", 0.4); Y.gazeTo(9, -13, 0.4); R.gazeTo(-14, 6, 0.4); }],
      // 4. Speechworks whispers the help
      [5100, () => { setBeat(4); playPop(); void S.to("warm", 0.4); }],
      // 5. the thought goes, you smirk: you know what to say
      [6900, () => { setBeat(5); void Y.to("proud", 0.5); }],
      // 6. you turn to the other person and say it; Speechworks steps back and watches, pleased
      [7900, () => { Y.gazeTo(16, 2, 0.4); void S.to("smile", 0.4); S.gazeTo(8, 10, 0.4); R.gazeTo(-16, 2, 0.3); }],
      [8300, () => { setBeat(6); playPop(); void Y.to("smile", 0.4); }],
      [9200, () => { void R.to("smile", 0.4); }],
    ];
    const timers = steps.map(([ms, fn]) => window.setTimeout(fn, ms));
    return () => { timers.forEach(window.clearTimeout); blinks.forEach((b) => b.stop()); };
  }, [inView, rigs, run]);

  return (
    <div ref={ref} className={`st beat-${beat}${mascot === "mascot-f" ? " sw-f" : ""}`} role="img" onClick={() => setRun((r) => r + 1)}
      aria-label="At a coffee shop, the barista asks what you would like. You think: coffee, or maybe just tea? Speechworks whispers: try the word you wanted. You smile and say: a coffee, please.">
      <div className={`st-swwrap${beat >= 3 ? " in" : ""}`}>
        <Person name={mascot ?? "mascot"} rig={rigs?.sw ?? null} overlay={PROPS} fill={{ a: "#8fb8ff" }} id="st-sw" face={sw} cls="st-sw" tag="Speechworks" dark initial="listening" />
      </div>
      <Person name="turban" rig={rigs?.you ?? null} fill={{ a: "#3B5BA9", b: "#fff4e6", kind: "hstripe" }} id="st-you" face={you} cls="st-you" tag="You" />
      <Person name="beanie" rig={rigs?.real ?? null} fill={{ a: "#c6f35b", b: "#fff4e6", kind: "dots" }} id="st-real" face={real} cls="st-real" tag="Coffee shop" />

      <ComicBubble kind="say" shape="oval" seed={11} tilt={2} anchor={AT.real} cls={`st-b st-ask${beat >= 3 ? " gone" : ""}`} show={beat >= 1} tone="#c7aaf3">
        <span className="hs-l">What can I</span><span className="hs-l">get you?</span>
      </ComicBubble>
      <ComicBubble kind="think" seed={3} tilt={-2} anchor={AT.you} cls={`st-b st-think${beat >= 5 ? " gone" : ""}`} show={beat >= 2}>
        <span className="hs-l">Coffee… no,</span><span className="hs-l">maybe just tea?</span>
      </ComicBubble>
      <ComicBubble kind="say" dashed shape="oval" seed={7} tilt={-1} anchor={mascot === "mascot-f" ? AT_SW_F : AT.sw} cls={`st-b st-whisper${mascot === "mascot-f" ? " is-f" : ""}`} show={beat >= 4}>
        <span className="hs-l">Try the word</span><span className="hs-l">you wanted.</span>
      </ComicBubble>
      <ComicBubble kind="say" shape="box" tilt={-3} anchor={AT.you} cls="st-b st-say" show={beat >= 6} tone="#9cc0ff">
        <span className="hs-l">A coffee,</span><span className="hs-l">please.</span>
      </ComicBubble>
      {replay === "bubble" ? (
        <button type="button" className={`st-replay r-bubble${beat >= 6 ? " show" : ""}`} onClick={again} aria-label="Replay the story">
          <ComicBubble kind="say" shape="oval" seed={5} tip={[0.58, 0.3]} cls="st-again" show={beat >= 6}><span className="hs-l">Again?</span></ComicBubble>
        </button>
      ) : replay === "ring" ? (
        // media-player style: a frosted round button whose ring fills while the story plays; click any time to start again
        <button type="button" key={run} className={`st-replay r-ring show${beat >= 1 ? " play" : ""}${beat >= 6 ? " done" : ""}`} onClick={again} aria-label="Replay the story">
          <svg className="rg" viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" pathLength="100" /></svg>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      ) : replay === "scrim" ? (
        <button type="button" className={`st-replay r-scrim${beat >= 6 ? " show" : ""}`} onClick={again} aria-label="Replay the story">
          <span className="disc"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
        </button>
      ) : (
        <button type="button" className={`st-replay r-${replay}${beat >= 6 ? " show" : ""}`} onClick={again} aria-label="Replay the story">
          {replay === "doodle"
            ? <svg viewBox="0 0 120 70" aria-hidden="true"><path d="M8 52C8 20 46 8 66 26C80 40 64 58 52 46C42 36 60 14 92 16M92 16L80 8M92 16L82 28" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>}
          {replay === "pill" && "Replay"}
          {replay === "frost" && <span>Watch again</span>}
          {replay === "doodle" && <span>Watch again</span>}
          {replay === "link" && <span>Watch it again</span>}
          {replay === "hint" && <span><span className="w-tap">Tap</span><span className="w-click">Click</span> the picture to replay</span>}
        </button>
      )}
      <svg className={`st-check${beat >= 6 ? " show" : ""}`} viewBox="0 0 60 60" aria-hidden="true"><circle cx="30" cy="30" r="26" fill="#c6f35b" stroke="#141311" strokeWidth="3.5" /><path d="M18 31L27 40L43 22" fill="none" stroke="#141311" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </div>
  );
}
