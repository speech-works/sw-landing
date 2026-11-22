"use client";

import { forwardRef, useId, useImperativeHandle, useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "@/lib/motion";
import { chatRig as R } from "@/lib/chat-rig.generated";
import { chatHands } from "@/lib/chat-hands.generated";
import type { RigAttrs } from "@/lib/mailman-rig.generated";
import { FACE_MS, faceAt, faceFrame, faceKit, type FaceV } from "@/lib/mailman-rig-core";
import { createHands, handsMarkup, type HandsHandle } from "./MailmanHands";

// The face of the offer chat (the avatar with the star glasses). Same way of working as MailmanFace: the figure and the face rig come from the
// characters kit (sw-characters: web/scripts/export_face_rig.mjs and export_hands.mjs, name=star-a), the kit's own face morph moves the brows,
// mouth, teeth, tongue, cheeks and eyes, and the kit's Wave hello moment gives the hand. Two faces are used: the resting smile and a grin with open eyes.

export type ChatExpression = "smile" | "grin";
// "grin" is not a kit face: it is the kit's laughing face (wide mouth, teeth, tongue, raised cheeks) with the eyes left open. Same number layout as the kit faces.
const CORE: Record<ChatExpression, string> = { smile: "smile", grin: "grin" };
const KIT = faceKit({ ...R.rig, names: [...R.rig.names, "grin"], t: { ...R.rig.t, grin: { ...R.rig.t.laugh, arc: 0 } } });

// every attribute that any state sets on a moving element (so a state can also remove one)
const KEYS: Record<string, string[]> = {};
const addKeys = (set: Record<string, RigAttrs>) => {
  for (const i in set) KEYS[i] = Array.from(new Set([...(KEYS[i] ?? []), ...Object.keys(set[i])]));
};
Object.values(R.rest).forEach(addKeys);
R.eyes.lid1.forEach(addKeys);
R.eyes.lid0.forEach(addKeys);

/** The picture as SVG text, with one state's attributes written in (for the first paint). */
function markupFor(uid: string, state: Record<string, RigAttrs>) {
  let html = R.svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/(id="|url\(#|href="#)cd\d+/g, (_m: string, a: string) => `${a}cf${uid}`)
    // the two glasses layers get a class, so the page can make them clear on hover
    .replace('fill="#14131C" fill-opacity="0.55"', 'class="cf-lens" fill="#14131C" fill-opacity="0.55"')
    .replace('fill="none" stroke="#FFE04A"', 'class="cf-frame" fill="none" stroke="#FFE04A"');
  for (const i in state) {
    html = html.replace(new RegExp(`<(\\w+)([^>]*?) data-i="${i}"(/?)>`), (_m, tag: string, attrs: string, close: string) => {
      let s = attrs;
      for (const k of KEYS[i] ?? []) {
        s = s.replace(new RegExp(` ${k}="[^"]*"`), "");
        const v = state[i][k];
        if (v !== undefined) s += ` ${k}="${k === "clip-path" || k === "filter" ? v.replace(/cd\d+/, `cf${uid}`) : v}"`;
      }
      return `<${tag}${s} data-i="${i}"${close}>`;
    });
  }
  return html;
}

const PUPILS = R.eyeIdx.filter((i) => /^translate\(/.test(R.eyes.lid1[0][i]?.transform ?? ""));

export type ChatFaceHandle = {
  /** Look at the chat text, then at the visitor, then at the text again, over and over. loop(false) stops it and keeps the eyes where they are. */
  loop: (on: boolean, delay?: number) => void;
  /** Move the pupils smoothly. x and y are in figure units: about -20..20 sideways, -14..16 up and down. */
  gazeTo: (x: number, y: number, duration?: number) => void;
  /** Smoothly change the face. */
  to: (name: ChatExpression, duration?: number) => gsap.core.Timeline;
  /** Wave hello with one hand (about 3.25 s, the kit's moment). Returns a timeline. */
  wave: () => gsap.core.Timeline;
  /** Lower the hand from where it is. */
  lowerHands: () => Promise<void>;
  /** Blink now and then until stop() is called. */
  idle: () => { stop: () => void };
};

const ChatFace = forwardRef<ChatFaceHandle, { className?: string }>(function ChatFace({ className }, ref) {
  const uid = useId().replace(/:/g, "");
  const html = useMemo(() => markupFor(uid, R.rest[CORE.smile]) + handsMarkup(uid, chatHands), [uid]);
  // The same object every render: React 19 writes innerHTML again whenever this prop is a new object, which would wipe the moving parts.
  const inner = useMemo(() => ({ __html: html }), [html]);
  const svg = useRef<SVGSVGElement>(null);
  const hands = useRef<HandsHandle | null>(null);
  const els = useRef<Record<string, Element>>({});
  const last = useRef<FaceV>(KIT.rest[CORE.smile].v);
  const active = useRef<gsap.core.Tween | null>(null);

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
      else if (e.getAttribute(k) !== v) e.setAttribute(k, k === "clip-path" || k === "filter" ? v.replace(/cd\d+/, `cf${uid}`) : v);
    };
    const mx = (m: number[]) => `matrix(${m.map((x) => +x.toFixed(5)).join(" ")})`;
    const show = (i: number | undefined, on: number) => setA(i, "display", on ? "inline" : "none");
    const eye = { s: 0, up: false };
    const gaze = { x: 0, y: 0 };

    /** The eyes at s: 0 open, 1 lid shut, 2 the closed arc. `up`: the lid is up and the arc shows (a settled closed-eye face). */
    const eyesAt = (s: number, up: boolean) => {
      eye.s = s;
      eye.up = up;
      const A = (up ? R.eyes.lid0 : R.eyes.lid1)[Math.max(0, Math.min(40, Math.round(s * 20)))];
      for (const i of R.eyeIdx) {
        for (const k of KEYS[i] ?? []) {
          let v: string | undefined = A[i]?.[k];
          if (k === "transform" && v && PUPILS.includes(i) && (gaze.x || gaze.y)) {
            const n = v.match(/-?[\d.]+/g)?.map(Number) ?? [0, 0];
            v = `translate(${(n[0] + gaze.x).toFixed(2)} ${((n[1] ?? 0) + gaze.y).toFixed(2)})`;
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

    const to = (name: ChatExpression, duration = 0.4) => {
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

    const idle = () => {
      let dead = false;
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
      let timer = gsap.delayedCall(2.2, blink);
      return { stop: () => { dead = true; timer.kill(); } };
    };

    const gazeTo = (x: number, y: number, d = 0.3) => {
      gsap.to(gaze, { x, y, duration: d, ease: "power2.out", overwrite: true, onUpdate: () => eyesAt(eye.s, eye.up) });
    };

    let looking: gsap.core.Timeline | null = null;
    const loop = (on: boolean, delay = 0) => {
      looking?.kill();
      looking = null;
      if (!on) return;
      const g = (x: number, y: number, hold: number) => (tl: gsap.core.Timeline) =>
        tl.to(gaze, { x, y, duration: 0.35, ease: "power2.inOut", onUpdate: () => eyesAt(eye.s, eye.up) }).to({}, { duration: hold });
      looking = gsap.timeline({ repeat: -1, delay });
      g(-16, -4, 1.5)(looking);   // the text of the chat (it sits to her left and a little up)
      g(0, 2, 1.1)(looking);      // the visitor
    };

    const H = () => (hands.current ??= createHands(svg.current as SVGSVGElement, uid, chatHands));
    return { to, gazeTo, loop, wave: () => H().wave(), lowerHands: () => H().stop(), idle };
  }, [uid]);

  return (
    <svg
      ref={svg}
      className={className}
      viewBox="0 0 320 310"
      aria-hidden="true"
      focusable="false"
      dangerouslySetInnerHTML={inner}
    />
  );
});

export default ChatFace;
