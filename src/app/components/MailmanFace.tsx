"use client";

import { forwardRef, useId, useImperativeHandle, useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/motion";
import { mailmanRig as R, type RigAttrs } from "@/lib/mailman-rig.generated";
import { FACE_MS, faceAt, faceFrame, faceKit, type FaceV } from "@/lib/mailman-rig-core";
import { createHands, handsMarkup, type HandsHandle } from "./MailmanHands";

// The mailman of the Notify dialog. The figure and the face rig come from the characters kit
// (sw-characters: web/scripts/export_face_rig.mjs writes src/lib/mailman-rig.generated.ts and mailman-rig-core.ts).
// The head, cap, moustache and collar stay still. The brows, mouth, teeth, tongue, cheeks and eyes are single
// shapes whose numbers move (the kit's own face morph), so a change is smooth, also when another change interrupts it.

export type Expression =
  | "steady"
  | "inquisitive"
  | "effort"
  | "excited"
  | "gleeful"
  | "laughing"
  | "joyful"
  | "stressed";

// "stressed" is not in the kit yet: it is made here from the kit's own numbers (the face rig is numbers only).
// The brows rise at the inside and fall at the outside, the mouth is a small downturned line. Same number layout as the kit faces.
const STRESSED = {
  ...R.rig.t[R.map.steady],
  brow: [336, 508, 372, 460, 425, 444, 664, 508, 628, 460, 575, 444],
  // a wide, wobbly, downturned line (the worried mouth of a stressed face); no teeth
  mouth: [436, 742, 450, 722, 472, 724, 496, 736, 518, 748, 544, 748, 564, 728, 544, 748, 518, 748, 496, 736, 472, 724, 450, 722],
  sw: 12.5,
};
// The kit faces are gentle. The dialog needs bolder ones (the older face had a wide laugh, wide eyes and a raised brow), so each
// expression is pushed further from the resting face: brows move 2x as far, mouth and teeth are drawn bigger about their own centre.
// Same number layout as the kit, so the kit's smooth change between faces (also when interrupted) still works.
const REST = R.rig.t[R.map.steady];
const scaleAbout = (a: number[], kx: number, ky: number) => {
  let cy = 0;
  for (let i = 1; i < a.length; i += 2) cy += a[i];
  cy /= a.length / 2;
  return a.map((v, i) => (i % 2 ? cy + (v - cy) * ky : 500 + (v - 500) * kx));
};
const BOLD: Record<string, { brow: number; mx: number; my: number }> = {
  curious: { brow: 2, mx: 1.5, my: 1.6 },
  smile: { brow: 2, mx: 1.35, my: 1.7 },
  proud: { brow: 2, mx: 1.3, my: 1.6 },
  laugh: { brow: 1.6, mx: 1.3, my: 1.5 },
  warm: { brow: 2, mx: 1.25, my: 1.8 },
};
// "huh?": a short, lopsided line that rises on the side of the raised brow (a drawn "hmm?"). A filled round "o" read as a hole.
const HMM = [464, 733, 479, 732, 492, 729, 504, 726, 518, 723, 532, 718, 546, 711, 532, 718, 518, 723, 504, 726, 492, 729, 479, 732];
const bold = Object.fromEntries(
  Object.entries(BOLD).map(([name, k]) => {
    const t = R.rig.t[name];
    return [name, { ...t, ...(name === "curious" ? { mouth: HMM, sw: 11.5 } : {}), brow: t.brow.map((v, i) => REST.brow[i] + (v - REST.brow[i]) * k.brow), ...(name === "curious" ? {} : { mouth: scaleAbout(t.mouth, k.mx, k.my) }), teeth: t.open ? scaleAbout(t.teeth, k.mx, k.my) : t.teeth }];
  }),
);
const KIT = faceKit({ ...R.rig, names: [...R.rig.names, "stressed"], t: { ...R.rig.t, ...bold, stressed: STRESSED } });
const CORE = { ...R.map, stressed: "stressed", effort: "stressed" } as Record<Expression, string>;
/** The part of the kit picture that the dialog shows (the figure is drawn smaller in the kit picture than the old face). */
const VIEW = "18 6 284 275";

// every attribute that any state sets on a moving element (so a state can also remove one)
const KEYS: Record<string, string[]> = {};
const addKeys = (set: Record<string, RigAttrs>) => {
  for (const i in set) KEYS[i] = Array.from(new Set([...(KEYS[i] ?? []), ...Object.keys(set[i])]));
};
Object.values(R.rest).forEach(addKeys);
R.eyes.lid1.forEach(addKeys);
R.eyes.lid0.forEach(addKeys);
const PUPILS = R.eyeIdx.filter((i) => /^translate\(/.test(R.eyes.lid1[0][i]?.transform ?? ""));
// The parts of the eyes that a wink needs to tell apart (the kit draws both eyes in one clip, one lash line and one eye group).
const CLIP = R.eyeIdx.find((i) => (R.eyes.lid1[0][i]?.d ?? "").startsWith("M-1000"));
const LASH = R.eyeIdx.find((i) => R.eyes.lid1[0][i]?.stroke === "#523027" && R.eyes.lid1[0][i]?.d !== undefined);
const EYEG = R.eyeIdx.find((i) => R.eyes.lid1[0][i]?.["clip-path"] !== undefined && R.eyes.lid1[0][i]?.display !== undefined);
const OPEN_L = "M296 430H470V710H296Z";
const OPEN_R = "M530 430H704V710H530Z";
/** The part of a two-eye path that belongs to one eye. */
const halfClip = (d: string, side: 0 | 1, open: string) => {
  if (!d || d.startsWith("M-1000")) return open;
  const p = d.split("ZM");
  return side === 0 ? `${p[0]}Z` : `M${p[1] ?? ""}`;
};
const halfLash = (d: string, side: 0 | 1) => (d ?? "").split(/(?=M)/)[side] ?? "";
const WINK_SIDE = 1; // the eye on the viewer's right closes

/** The picture as SVG text, with one state's attributes written in (for the first paint). */
function markupFor(uid: string, state: Record<string, RigAttrs>) {
  let html = R.svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/(id="|url\(#|href="#)cd\d+/g, `$1mf${uid}`);
  for (const i in state) {
    html = html.replace(new RegExp(`<(\\w+)([^>]*?) data-i="${i}"(/?)>`), (_m, tag: string, attrs: string, close: string) => {
      let s = attrs;
      for (const k of KEYS[i] ?? []) {
        s = s.replace(new RegExp(` ${k}="[^"]*"`), "");
        const v = state[i][k];
        if (v !== undefined) s += ` ${k}="${k === "clip-path" || k === "filter" ? v.replace(/cd\d+/, `mf${uid}`) : v}"`;
      }
      return `<${tag}${s} data-i="${i}"${close}>`;
    });
  }
  return html;
}

/** Kept for the callers: the face no longer needs a morph plugin. */
export function loadMorph() {
  return Promise.resolve();
}

export type IdleHandle = {
  /** Look down at the email box and stay there (the visitor is typing). */
  lookAtInput: () => void;
  /** Look back up at the visitor. */
  resume: () => void;
  /** Stop and return to the resting face. */
  stop: () => void;
};

export type FaceHandle = {
  /** Smoothly change to another expression. Returns a timeline you can add to your own. */
  to: (name: Expression, duration?: number, ease?: string) => gsap.core.Timeline;
  /** Change at once, with no animation. */
  set: (name: Expression) => void;
  /** Wait for the visitor: blink, and look at the email box while they type. */
  idle: () => IdleHandle;
  /** Move the eyes (pupils) smoothly. x and y are in figure units: about -20..20 sideways, -14..16 up and down. */
  gazeTo: (x: number, y: number, duration?: number) => void;
  /** Wink with one eye: close, hold, open. Returns a timeline. */
  wink: (hold?: number) => gsap.core.Timeline;
  /** Watch the email box while the visitor types. frac is how far along the box the text reaches (0..1). null: stop watching. */
  watch: (frac: number | null) => void;
  /** Wave hello with one hand (about 3.25 s, the kit's moment). The face does not change. Returns a timeline. */
  wave: () => gsap.core.Timeline;
  /** Heart hands (about 2.6 s, the kit's moment). The face does not change. Returns a timeline. */
  heart: () => gsap.core.Timeline;
  /** Lower any hands smoothly from where they are. */
  lowerHands: () => Promise<void>;
};

type Props = { initial?: Expression; className?: string };

const MailmanFace = forwardRef<FaceHandle, Props>(function MailmanFace({ initial = "steady", className }, ref) {
  const uid = useId().replace(/:/g, "");
  const html = useMemo(() => markupFor(uid, R.rest[CORE[initial]]) + handsMarkup(uid), [uid, initial]);
  // The same object every render: React 19 writes innerHTML again whenever this prop is a new object, which would wipe the moving parts.
  const inner = useMemo(() => ({ __html: html }), [html]);
  const svg = useRef<SVGSVGElement>(null);
  const hands = useRef<HandsHandle | null>(null);
  const els = useRef<Record<string, Element>>({});
  const last = useRef<FaceV>(KIT.rest[CORE[initial]].v);
  const active = useRef<gsap.core.Tween | null>(null);
  const gaze = useRef({ x: 0, y: 0 });
  const eye = useRef<{ s: number; up: boolean }>({ s: -1, up: false });
  /** How far the winking eye is along the eye path: 0 open, 1 lid shut, 2 the closed arc. */
  const wink = useRef({ s: 0 });
  const lash2 = useRef<Element | null>(null);
  const watching = useRef(false);

  useLayoutEffect(() => {
    const map: Record<string, Element> = {};
    svg.current?.querySelectorAll("[data-i]").forEach((e) => {
      map[e.getAttribute("data-i") as string] = e;
    });
    els.current = map;
  }, [html]);

  useImperativeHandle(ref, () => {
    const setA = (i: number | undefined, k: string, v: string | null | undefined) => {
      const e = i === undefined ? null : els.current[i];
      if (!e) return;
      if (v === null || v === undefined) e.removeAttribute(k);
      else if (e.getAttribute(k) !== v) e.setAttribute(k, k === "clip-path" || k === "filter" ? v.replace(/cd\d+/, `mf${uid}`) : v);
    };
    const mx = (m: number[]) => `matrix(${m.map((x) => +x.toFixed(5)).join(" ")})`;
    const show = (i: number | undefined, on: number) => setA(i, "display", on ? "inline" : "none");

    /** The two eyes at different places on the eye path (a wink). Left eye at sL, right eye at sR. The kit draws the eyes as one clip, one lash line and one eye group, so each is split here by eye. */
    const eyesSplit = (sL: number, sR: number) => {
      const step = (s: number) => R.eyes.lid1[Math.max(0, Math.min(40, Math.round(s * 20)))];
      const T = [step(sL), step(sR)];
      const S = [sL, sR];
      if (CLIP !== undefined) {
        setA(CLIP, "d", [0, 1].map((k) => (S[k] <= 0.001 ? (k ? OPEN_R : OPEN_L) : halfClip(T[k][CLIP]?.d, k as 0 | 1, k ? OPEN_R : OPEN_L))).join(""));
      }
      const g = EYEG !== undefined ? els.current[EYEG] : null;
      if (g) [0, 1].forEach((k) => (g.children[k] as Element | undefined)?.setAttribute("display", T[k][EYEG!]?.display ?? "inline"));
      if (g) setA(EYEG, "display", "inline");
      if (LASH !== undefined && els.current[LASH]) {
        const l1 = els.current[LASH];
        if (!lash2.current) {
          lash2.current = l1.cloneNode(false) as Element;
          lash2.current.removeAttribute("data-i");
          l1.parentNode?.insertBefore(lash2.current, l1.nextSibling);
        }
        const l2 = lash2.current;
        [l1, l2].forEach((el, k) => {
          const a = T[k][LASH] ?? {};
          el.setAttribute("d", S[k] <= 0.001 ? "M0 0" : halfLash(a.d, k as 0 | 1));
          el.setAttribute("display", S[k] <= 0.001 ? "none" : (a.display ?? "inline"));
          if (a["stroke-width"]) el.setAttribute("stroke-width", a["stroke-width"]);
        });
      }
      PUPILS.forEach((i, k) => {
        const v = T[k][i]?.transform;
        const n = v?.match(/-?[\d.]+/g)?.map(Number) ?? [0, 0];
        setA(i, "transform", `translate(${(n[0] + gaze.current.x).toFixed(2)} ${((n[1] ?? 0) + gaze.current.y).toFixed(2)})`);
      });
    };

    /** The eyes at s: 0 open, 1 lid shut, 2 the closed arc. `up`: the lid is up and the arc shows (a settled closed-eye face). */
    const eyesAt = (s: number, up: boolean) => {
      eye.current = { s, up };
      if (wink.current.s > 0.001 && s <= 1 && !up) return eyesSplit(s, Math.max(s, wink.current.s));
      if (lash2.current && lash2.current.getAttribute("display") !== "none") {
        // leave the split: the two eyes are one again
        lash2.current.setAttribute("display", "none");
        const g = EYEG !== undefined ? els.current[EYEG] : null;
        if (g) Array.from(g.children).forEach((c) => c.removeAttribute("display"));
      }
      const table = up ? R.eyes.lid0 : R.eyes.lid1;
      const A = table[Math.max(0, Math.min(40, Math.round(s * 20)))];
      for (const i of R.eyeIdx) {
        for (const k of KEYS[i] ?? []) {
          let v: string | undefined = A[i]?.[k];
          if (k === "transform" && v && PUPILS.includes(i) && (gaze.current.x || gaze.current.y)) {
            const n = v.match(/-?[\d.]+/g)?.map(Number) ?? [0, 0];
            v = `translate(${(n[0] + gaze.current.x).toFixed(2)} ${((n[1] ?? 0) + gaze.current.y).toFixed(2)})`;
          }
          setA(i, k, v);
        }
      }
    };

    const apply = (v: FaceV) => {
      const F = v.still ? KIT.rest[v.f].r : faceFrame(KIT.rig, v);
      const ro = R.roles;
      setA(ro.brow, "d", F.browD);
      setA(ro.mouth, "d", F.mouthD);
      setA(ro.mouth, "stroke-width", F.mouthSw.toFixed(2));
      show(ro.teeth, F.teethO);
      if (F.teethO) {
        setA(ro.teeth, "d", F.teethD);
        setA(ro.teeth, "transform", mx(F.teethM));
      }
      show(ro.tongue, F.tongueO);
      if (F.tongueO) setA(ro.tongue, "transform", mx(F.tongueM));
      show(ro.cheek, F.cheekO);
      if (F.cheekO) setA(ro.cheek, "transform", mx(F.cheekM));
      ro.blush.forEach((b, k) => {
        setA(b, "opacity", F.blushO.toFixed(3));
        if (F.blushM[k]) setA(b, "transform", mx(F.blushM[k]));
      });
      if (v.line !== null) eyesAt(1 + v.line, v.lid < 0.5);
      else eyesAt(v.lid, false);
    };

    const stopActive = () => {
      active.current?.kill();
      active.current = null;
    };

    const setNow = (name: Expression) => {
      stopActive();
      last.current = KIT.rest[CORE[name]].v;
      apply(last.current);
    };

    const to = (name: Expression, duration = 0.5) => {
      const target = KIT.rest[CORE[name]].v;
      const st = { p: 0 };
      let from: FaceV | null = null;
      const tl = gsap.timeline();
      const tw: gsap.core.Tween = gsap.to(st, {
        p: 1,
        duration: Math.max(duration, 0.001),
        ease: "none",
        onStart: () => {
          if (active.current && active.current !== tw) active.current.kill();
          active.current = tw;
          // start from the face as it is now, also in the middle of another change (nothing jumps)
          const c = last.current;
          from = { ...c, arc: c.line !== null ? 1 : 0, still: false };
        },
        onUpdate: () => {
          if (!from) return;
          const v = st.p >= 1 ? target : faceAt(from, target, st.p * FACE_MS);
          last.current = v;
          apply(v);
        },
        onComplete: () => {
          last.current = target;
          apply(target);
          if (active.current === tw) active.current = null;
        },
      });
      tl.add(tw, 0);
      return tl;
    };

    const idle = (): IdleHandle => {
      let dead = false;
      const look = (x: number, y: number, d = 0.35) =>
        gsap.to(gaze.current, { x, y, duration: d, ease: "power2.out", overwrite: true, onUpdate: () => eyesAt(eye.current.s < 0 ? 0 : eye.current.s, eye.current.up) });
      const blink = () => {
        if (dead) return;
        const v = last.current;
        if (v.still && v.line === null && !active.current) {
          const o = { s: 0 };
          gsap.to(o, {
            s: 1, duration: 0.09, yoyo: true, repeat: 1, ease: "sine.inOut",
            onUpdate: () => { if (!dead && !active.current) eyesAt(o.s, false); },
            onComplete: () => { if (!dead && !active.current) eyesAt(0, false); },
          });
        }
        timer = gsap.delayedCall(2.6 + Math.random() * 2.4, blink);
      };
      let timer = gsap.delayedCall(1.8, blink);
      return {
        lookAtInput: () => { look(0, 16); },
        resume: () => { look(0, 0); },
        stop: () => { dead = true; timer.kill(); look(0, 0, 0.2); },
      };
    };

    const gazeTo = (x: number, y: number, d = 0.3) => {
      gsap.to(gaze.current, { x, y, duration: d, ease: "power2.out", overwrite: true, onUpdate: () => eyesAt(eye.current.s < 0 ? 0 : eye.current.s, eye.current.up) });
    };
    const winkTl = (hold = 0.25) => {
      const tl = gsap.timeline();
      tl.add(() => { gaze.current.x = 0; gaze.current.y = 0; eyesAt(eye.current.s < 0 ? 0 : eye.current.s, eye.current.up); }, 0)
        .to(wink.current, { s: 2, duration: 0.13, ease: "power2.inOut", overwrite: true, onUpdate: () => eyesAt(eye.current.s < 0 ? 0 : eye.current.s, eye.current.up) }, 0)
        .to(wink.current, { s: 0, duration: 0.17, ease: "power2.inOut", onUpdate: () => eyesAt(eye.current.s < 0 ? 0 : eye.current.s, eye.current.up), onComplete: () => eyesAt(0, false) }, 0.13 + hold);
      return tl;
    };
    // He reads along the box: the eyes go down, then sweep from the left edge to the right edge as the text grows.
    const watch = (frac: number | null) => {
      if (frac === null) {
        if (watching.current) { watching.current = false; gazeTo(0, 0, 0.35); if (!active.current && last.current.f !== CORE.steady) to("steady", 0.4); }
        return;
      }
      if (!watching.current) { watching.current = true; to("inquisitive", 0.3); }
      gazeTo(-19 + 38 * Math.max(0, Math.min(1, frac)), 15, 0.14);
    };
    const H = () => (hands.current ??= createHands(svg.current as SVGSVGElement, uid));
    return { to, set: setNow, idle, gazeTo, wink: winkTl, watch, wave: () => H().wave(), heart: () => H().heart(), lowerHands: () => H().stop() };
  }, [uid]);

  return (
    <svg
      ref={svg}
      className={className}
      viewBox={VIEW}
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={inner}
    />
  );
});

export default MailmanFace;
