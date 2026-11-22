"use client";

import { forwardRef, useId, useImperativeHandle, useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/motion";
import type { MailmanRig, RigAttrs } from "@/lib/mailman-rig.generated";
import type { MailmanHands } from "@/lib/mailman-hands.generated";
import { FACE_MS, faceAt, faceFrame, faceKit, type FaceKit, type FaceT, type FaceV } from "@/lib/mailman-rig-core";
import { createHands, handsMarkup, type HandsHandle } from "./MailmanHands";

// A figure of the characters kit that can change its face and raise a kit hand: the same way of working as MailmanFace (the Notify dialog), for any
// figure exported by sw-characters (web/scripts/export_face_rig.mjs and export_hands.mjs). The figure is the kit's picture drawn by the kit's drawer; the brows,
// mouth, teeth, tongue, cheeks and eyes are single shapes whose numbers move (the kit's own face morph), so a change is smooth, also when another interrupts it.

export type RigFaceHandle = {
  /** Smoothly change the face (a kit face name such as "calm", "smile", "thinking", or a custom one). Returns a timeline. */
  to: (name: string, duration?: number) => gsap.core.Timeline;
  /** Move the pupils smoothly. x and y are in figure units: about -20..20 sideways, -14..16 up and down. */
  gazeTo: (x: number, y: number, duration?: number) => void;
  /** Wave hello (about 3.25 s). */
  wave: () => gsap.core.Timeline;
  /** Heart hands (about 2.6 s). */
  heart: () => gsap.core.Timeline;
  /** Hand at the chin (3 s). Only for a figure exported with chin=1. */
  chin: () => gsap.core.Timeline;
  /** Lower any hand smoothly from where it is. */
  lowerHands: () => Promise<void>;
  /** Blink now and then until stop() is called. */
  idle: () => { stop: () => void };
};

/** A face made from a kit face: its numbers with some changed (for example the laughing face with the eyes open: { from: "laugh", arc: 0 }). */
export type CustomFace = { from: string } & Partial<FaceT>;

type Derived = { kit: FaceKit; keys: Record<string, string[]>; pupils: number[] };
const cache = new WeakMap<MailmanRig, Map<string, Derived>>();
function derive(rig: MailmanRig, custom: Record<string, CustomFace> | undefined): Derived {
  const id = JSON.stringify(custom ?? {});
  let byCustom = cache.get(rig);
  if (!byCustom) cache.set(rig, (byCustom = new Map()));
  let d = byCustom.get(id);
  if (d) return d;
  const t = { ...rig.rig.t };
  for (const [name, c] of Object.entries(custom ?? {})) {
    const { from, ...over } = c;
    t[name] = { ...rig.rig.t[from], ...over };
  }
  const keys: Record<string, string[]> = {};
  const addKeys = (set: Record<string, RigAttrs>) => {
    for (const i in set) keys[i] = Array.from(new Set([...(keys[i] ?? []), ...Object.keys(set[i])]));
  };
  Object.values(rig.rest).forEach(addKeys);
  rig.eyes.lid1.forEach(addKeys);
  rig.eyes.lid0.forEach(addKeys);
  d = {
    kit: faceKit({ ...rig.rig, names: [...rig.rig.names, ...Object.keys(custom ?? {})], t }),
    keys,
    pupils: rig.eyeIdx.filter((i) => /^translate\(/.test(rig.eyes.lid1[0][i]?.transform ?? "")),
  };
  byCustom.set(id, d);
  return d;
}

/** The picture as SVG text, with one state's attributes written in (for the first paint). `cut`: a path (in the picture's units) that the figure is cut by below the head line, the avatar's colour blob. */
function markupFor(uid: string, rig: MailmanRig, keys: Record<string, string[]>, state: Record<string, RigAttrs>, extra: string, cut?: string) {
  let html = rig.svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/(id="|url\(#|href="#)cd\d+/g, (_m: string, a: string) => `${a}rf${uid}`);
  for (const i in state) {
    html = html.replace(new RegExp(`<(\\w+)([^>]*?) data-i="${i}"(/?)>`), (_m, tag: string, attrs: string, close: string) => {
      let s = attrs;
      for (const k of keys[i] ?? []) {
        s = s.replace(new RegExp(` ${k}="[^"]*"`), "");
        const v = state[i][k];
        if (v !== undefined) s += ` ${k}="${k === "clip-path" || k === "filter" ? v.replace(/cd\d+/, `rf${uid}`) : v}"`;
      }
      return `<${tag}${s} data-i="${i}"${close}>`;
    });
  }
  html += extra;   // the hands: they rise from below, so the blob cut hides what is below the blob
  if (!cut) return html;
  // Everything above y 190 is free (hats and hair may leave the blob there); below it the figure ends on the blob's outline.
  return `<defs><clipPath id="rfcut${uid}"><rect x="-200" y="-200" width="720" height="390"/><path d="${cut}"/></clipPath></defs><g clip-path="url(#rfcut${uid})">${html}</g>`;
}

type Props = {
  rig: MailmanRig;
  /** The kit hand layer; leave out for a figure that never raises a hand. */
  hands?: MailmanHands;
  /** The kit face the figure starts with. */
  initial: string;
  custom?: Record<string, CustomFace>;
  cut?: string;
  className?: string;
  /** SVG drawn on top of the figure, in the picture's 320 x 310 units (props such as speech bubbles). */
  overlay?: ReactNode;
  /** SVG drawn behind the figure (between the colour blob and the figure), in the same units. */
  underlay?: ReactNode;
  /** The picture's box in units: the figure's own 320 x 310 by default; a larger one lets props leave the picture. */
  viewBox?: string;
};

const RigFace = forwardRef<RigFaceHandle, Props>(function RigFace({ rig, hands: handsData, initial, custom, cut, className, overlay, underlay, viewBox }, ref) {
  const uid = useId().replace(/:/g, "");
  const D = useMemo(() => derive(rig, custom), [rig, custom]);
  const html = useMemo(() => markupFor(uid, rig, D.keys, rig.rest[initial], handsData ? handsMarkup(uid, handsData) : "", cut), [uid, rig, D, initial, cut, handsData]);
  // The same object every render: React 19 writes innerHTML again whenever this prop is a new object, which would wipe the moving parts.
  const inner = useMemo(() => ({ __html: html }), [html]);
  const svg = useRef<SVGSVGElement>(null);
  const hands = useRef<HandsHandle | null>(null);
  const els = useRef<Record<string, Element>>({});
  const last = useRef<FaceV>(D.kit.rest[initial].v);
  const active = useRef<gsap.core.Tween | null>(null);

  useLayoutEffect(() => {
    const map: Record<string, Element> = {};
    svg.current?.querySelectorAll("[data-i]").forEach((e) => {
      map[e.getAttribute("data-i") as string] = e;
    });
    els.current = map;
  }, [html]);

  useImperativeHandle(ref, () => {
    const { kit, keys, pupils } = D;
    const setA = (i: number | undefined, k: string, v: string | null | undefined) => {
      const e = i === undefined ? null : els.current[i];
      if (!e) return;
      if (v === null || v === undefined) e.removeAttribute(k);
      else if (e.getAttribute(k) !== v) e.setAttribute(k, k === "clip-path" || k === "filter" ? v.replace(/cd\d+/, `rf${uid}`) : v);
    };
    const mx = (m: number[]) => `matrix(${m.map((x) => +x.toFixed(5)).join(" ")})`;
    const show = (i: number | undefined, on: number) => setA(i, "display", on ? "inline" : "none");
    const eye = { s: 0, up: false };
    const gaze = { x: 0, y: 0 };

    /** The eyes at s: 0 open, 1 lid shut, 2 the closed arc. `up`: the lid is up and the arc shows (a settled closed-eye face). */
    const eyesAt = (s: number, up: boolean) => {
      eye.s = s;
      eye.up = up;
      const A = (up ? rig.eyes.lid0 : rig.eyes.lid1)[Math.max(0, Math.min(40, Math.round(s * 20)))];
      for (const i of rig.eyeIdx) {
        for (const k of keys[i] ?? []) {
          let v: string | undefined = A[i]?.[k];
          if (k === "transform" && v && pupils.includes(i) && (gaze.x || gaze.y)) {
            const n = v.match(/-?[\d.]+/g)?.map(Number) ?? [0, 0];
            v = `translate(${(n[0] + gaze.x).toFixed(2)} ${((n[1] ?? 0) + gaze.y).toFixed(2)})`;
          }
          setA(i, k, v);
        }
      }
    };

    const apply = (v: FaceV) => {
      const F = v.still ? kit.rest[v.f].r : faceFrame(kit.rig, v);
      const ro = rig.roles;
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

    const to = (name: string, duration = 0.4) => {
      const target = kit.rest[name].v;
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

    const gazeTo = (x: number, y: number, d = 0.3) => {
      gsap.to(gaze, { x, y, duration: d, ease: "power2.out", overwrite: true, onUpdate: () => eyesAt(eye.s, eye.up) });
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

    const H = () => (hands.current ??= createHands(svg.current as SVGSVGElement, uid, handsData));
    const none = () => gsap.timeline();
    if (!handsData) return { to, gazeTo, idle, wave: none, heart: none, chin: none, lowerHands: () => Promise.resolve() };
    return { to, gazeTo, idle, wave: () => H().wave(), heart: () => H().heart(), chin: () => H().chin(), lowerHands: () => H().stop() };
  }, [uid, rig, D, handsData]);

  return (
    <svg ref={svg} className={className} viewBox={viewBox ?? "0 0 320 310"} aria-hidden="true" focusable="false">
      {underlay}
      <g dangerouslySetInnerHTML={inner} />
      {overlay}
    </svg>
  );
});

export default RigFace;
