"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { cardSounds } from "@/lib/card-sounds";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";

// The Speech Toolkit page: the coils woman with an open box of five crayons beside her (copied from the founder's picture: flat shapes, no outlines, open lid, a window on the front).
// By itself 1 s after the page loaded (hovering plays it again), about 8.5 s:
// 1. the box slides in and the crayons pop up one by one;
// 2. she is curious; the red crayon lifts out and draws a loose loop in the air, then goes back;
// 3. she is thinking; the blue crayon draws a wavy line, then goes back;
// 4. the yellow crayon lifts out and writes a loose handwriting-like line (no letters); then a big heart swells out of its tip and small hearts and sparkles scatter; she smiles (kit face).
// Then quiet things: the yellow crayon sways, a small heart drifts up now and then. Reduced motion: the finished picture (no sound, nothing moves).

const BX = 240, BY = 128, BS = 0.27;   // the box: its picture units (950 wide) are placed at (BX, BY) in the figure's units, scaled by BS
type Name = "red" | "yellow" | "green" | "blue" | "purple";
const C: Record<Name, [string, string]> = { red: ["#D93A2B", "#BB2212"], yellow: ["#E8B93E", "#D6A100"], green: ["#6ECB3F", "#52AA25"], blue: ["#4A8FC4", "#1565A5"], purple: ["#8B3FC0", "#7A12A0"] };
const SPOTS: { n: Name; x: number; y: number; w: number; r: number }[] = [
  { n: "red", x: 262, y: 80, w: 100, r: -7 }, { n: "yellow", x: 392, y: 163, w: 98, r: -4 }, { n: "green", x: 470, y: 28, w: 108, r: -6 },
  { n: "blue", x: 600, y: 107, w: 118, r: -5.5 }, { n: "purple", x: 740, y: 2, w: 120, r: -3.5 },
];
const LEN = 330;   // the striped part of the body, in box units. A crayon is as long as it looks in the picture: from its tip down through the window (to y 830)
const fullLen = (s: { y: number; w: number; r: number }) => (830 - s.y) / Math.cos((s.r * Math.PI) / 180) - s.w * 0.95;
const HOLD = { x: 390, y: -85 };   // where the lifted crayon's tip is while it draws (figure units)
const toBox = (p: { x: number; y: number }) => ({ x: (p.x - BX) / BS, y: (p.y - BY) / BS });
const LIFT_SCALE = 1;   // a crayon that comes out keeps the size it has in the box

const crayon = (n: Name, w: number, L: number) => {
  const [c, d] = C[n], th = w * 0.95, tw = w * 0.33;
  return `<path d="M${-tw} ${th + 1}C${-tw} ${th * 0.55} ${-w * 0.14} ${th * 0.2} ${-w * 0.07} ${th * 0.06}Q0 ${-th * 0.03} ${w * 0.07} ${th * 0.06}C${w * 0.14} ${th * 0.2} ${tw} ${th * 0.55} ${tw} ${th + 1}Z" fill="${c}"/><rect x="${-w / 2}" y="${th}" width="${w}" height="${L}" fill="${c}"/>` +
    [[0, 0.14], [0.3, 0.4], [0.5, 0.6], [0.72, 0.78]].map(([a, e]) => `<rect x="${-w / 2}" y="${th + LEN * a}" width="${w}" height="${LEN * (e - a)}" fill="${d}"/>`).join("") +
    `<rect x="${-w / 2}" y="${th + LEN * 0.14}" width="${w}" height="${LEN * 0.04}" fill="#fff" opacity=".18"/>`;
};
const heart = (i: number) => `<path id="cr-h${i}" opacity="0" d="M0 7C-12 -1 -9 -12 -3 -10Q0 -9 0 -5Q0 -9 3 -10C9 -12 12 -1 0 7Z" fill="${["#E8573F", "#FF8FB0", "#E8573F", "#FFC21A"][i % 4]}" stroke="#242329" stroke-width="2.4" stroke-linejoin="round"/>`;
const spark = (i: number) => `<path id="cr-p${i}" opacity="0" d="M0 -9Q0 0 9 0Q0 0 0 9Q0 0 -9 0Q0 0 0 -9Z" fill="#FFD84D" stroke="#242329" stroke-width="3" stroke-linejoin="round"/>`;

const markup = () =>
  `<g id="cr-box" opacity="0"><g transform="translate(${BX} ${BY}) scale(${BS})">` +
  `<polygon points="90,95 525,27 590,170 678,258 403,392 226,313 120,150" fill="#B07848"/><polygon points="90,95 525,27 498,70 118,140" fill="#8E572C"/><polygon points="0,190 90,95 226,313 135,405" fill="#C9945C"/><polygon points="135,405 226,313 226,338" fill="#8E572C"/><polygon points="482,545 835,490 865,697 512,770" fill="#925A2D"/>` +
  SPOTS.map((s, i) => `<g transform="translate(${s.x} ${s.y}) rotate(${s.r})"><g id="cr-c${i}">${crayon(s.n, s.w, fullLen(s))}</g></g>`).join("") +
  `<polygon points="226,313 403,390 478,978 300,812" fill="#C9945C"/><path d="M403 390L855 288L948 885L478 978ZM482 545L512 770L865 697L835 490Z" fill="#BF8450" fill-rule="evenodd"/></g></g>` +
  `<path id="cr-trail" d="" fill="none" stroke="#000" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" opacity="0"/>` +
  `<path id="cr-big" opacity="0" d="M0 7C-12 -1 -9 -12 -3 -10Q0 -9 0 -5Q0 -9 3 -10C9 -12 12 -1 0 7Z" fill="#E8573F" stroke="#242329" stroke-width="2.4" stroke-linejoin="round"/>` +
  Array.from({ length: 6 }, (_, i) => heart(i)).join("") + Array.from({ length: 3 }, (_, i) => spark(i)).join("");

const LOOP = `M${HOLD.x} ${HOLD.y}c20-34 70-30 66 6c-3 28-40 28-40 6c0-22 34-26 50-10`;
// the yellow crayon "writes": a loose handwriting-like line of small loops (no letters)
const SCRIB = `M${HOLD.x} ${HOLD.y}c8-26 28-22 22 4s-22 6-10-8s30-4 32 10s-10 20 4 14s24-20 34-6s-4 18 8 14s22-14 30-6`;
const WAVE = `M${HOLD.x} ${HOLD.y}q14-26 28 0q14 26 28 0q14-26 28 0q14 26 28 0`;

export default function CrayonAvatar({ className = "", alt = "" }: { className?: string; alt?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const face = useRef<RigFaceHandle>(null);
  const [rig, setRig] = useState<MailmanRig | null>(null);
  const hover = useRef(false);
  const api = useRef<{ start: () => void } | null>(null);
  const over = useMemo(() => <g dangerouslySetInnerHTML={{ __html: markup() }} />, []);

  useEffect(() => {
    let alive = true;
    const go = () => import("@/lib/card-rigs/coils.generated").then((m) => { if (alive) setRig(m.coilsRig); });
    const idle = (window as unknown as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) void go();
    else if (idle) idle(() => void go(), { timeout: 600 }); else setTimeout(() => void go(), 200);
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    const root = wrap.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const target = root.closest<HTMLElement>(".detail-art") ?? root;
    const timer = window.setTimeout(() => { hover.current = true; api.current?.start(); }, 1000);
    const again = () => { hover.current = true; api.current?.start(); };
    target.addEventListener("pointerenter", again);
    target.addEventListener("focusin", again);
    return () => { window.clearTimeout(timer); target.removeEventListener("pointerenter", again); target.removeEventListener("focusin", again); };
  }, []);

  useEffect(() => {
    const root = wrap.current, f = face.current;
    if (!rig || !root || !f) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = (id: string) => root.querySelector<SVGElement>(`#${id}`)!;
    const box = q("cr-box"), trail = q("cr-trail") as unknown as SVGPathElement;
    const cr = SPOTS.map((_, i) => q(`cr-c${i}`));
    const hearts = Array.from({ length: 6 }, (_, i) => q(`cr-h${i}`)), sparks = Array.from({ length: 3 }, (_, i) => q(`cr-p${i}`));
    const idleBlink = reduced ? null : f.idle();
    let silent = false;
    const snd = <A extends unknown[]>(fn: (...a: A) => void, ...a: A) => () => { if (!silent) fn(...a); };
    const gaze = (px: number, py: number, d = 0.3) => f.gazeTo(Math.max(-20, Math.min(20, (px - 160) / 11)), Math.max(-14, Math.min(16, (py - 100) / 9)), d);

    // A crayon's place when it lies in the box: its tip in box units and its tilt. Moving a crayon = moving its inner group by an offset in the tilted frame.
    const offsetFor = (i: number, tip: { x: number; y: number }) => {
      const s = SPOTS[i], t = toBox(tip), a = (-s.r * Math.PI) / 180, dx = t.x - s.x, dy = t.y - s.y;
      return { x: dx * Math.cos(a) - dy * Math.sin(a), y: dx * Math.sin(a) + dy * Math.cos(a) };
    };
    // each crayon is drawn from plain numbers (offset in its tilted frame, extra tilt, scale), written as one transform
    const stc = SPOTS.map(() => ({ x: 0, y: 0, r: 0, s: 1, o: 1 }));
    const paint = (i: number) => { cr[i].setAttribute("opacity", String(stc[i].o)); cr[i].setAttribute("transform", `translate(${stc[i].x.toFixed(1)} ${stc[i].y.toFixed(1)}) rotate(${stc[i].r.toFixed(1)}) scale(${stc[i].s.toFixed(3)})`); };
    const place = (i: number, tip: { x: number; y: number }, rot: number, sc = LIFT_SCALE) => { const o = offsetFor(i, tip); Object.assign(stc[i], { x: o.x, y: o.y, r: rot - SPOTS[i].r, s: sc }); paint(i); };
    const rest = (i: number) => { Object.assign(stc[i], { x: 0, y: 0, r: 0, s: 1, o: 1 }); paint(i); };
    const tipAt = (i: number) => ({ x: BX + BS * SPOTS[i].x, y: BY + BS * SPOTS[i].y });
    const resetAll = () => {
      gsap.set(box, { opacity: 0, x: 80, y: 30 });
      cr.forEach((_, i) => { rest(i); stc[i].y = 90; stc[i].o = 0; paint(i); });
      gsap.set(trail, { opacity: 0 });
      hearts.concat(sparks).forEach((h) => gsap.set(h, { opacity: 0 }));
    };
    resetAll();

    // draw a path: the trail grows and the crayon's tip follows it
    const draw = (tl: gsap.core.Timeline, i: number, d: string, color: string, at: number, dur: number) => {
      const tmp = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tmp.setAttribute("d", d);
      const total = tmp.getTotalLength(), prog = { u: 0 };
      tl.add(() => { trail.setAttribute("d", d); trail.setAttribute("stroke", color); trail.setAttribute("pathLength", "1"); trail.style.strokeDasharray = "1"; trail.style.strokeDashoffset = "1"; gsap.set(trail, { opacity: 1 }); }, at);
      tl.to(prog, { u: 1, duration: dur, ease: "none", onUpdate: () => {
        const p = tmp.getPointAtLength(prog.u * total);
        trail.style.strokeDashoffset = String(Math.max(0, 1 - prog.u - 0.05));
        place(i, { x: p.x, y: p.y }, 8 + 4 * Math.sin(prog.u * 9));
      } }, at);
    };
    const lift = (tl: gsap.core.Timeline, i: number, at: number, rot = 8) => {
      const from = tipAt(i), pr = { u: 0 };
      tl.add(() => { rest(i); }, at - 0.001);
      tl.to(pr, { u: 1, duration: 0.4, ease: "power2.out", onUpdate: () => {
        place(i, { x: from.x + (HOLD.x - from.x) * pr.u, y: from.y + (HOLD.y - from.y) * pr.u }, SPOTS[i].r + (rot - SPOTS[i].r) * pr.u, 1 + (LIFT_SCALE - 1) * pr.u);
      } }, at);
    };
    const putBack = (tl: gsap.core.Timeline, i: number, at: number) => {
      const to = tipAt(i), pr = { u: 0 };
      tl.add(() => gsap.set(trail, { opacity: 0 }), at);
      tl.to(pr, { u: 1, duration: 0.35, ease: "power2.inOut", onUpdate: () => {
        place(i, { x: HOLD.x + (to.x - HOLD.x) * pr.u, y: HOLD.y + (to.y - HOLD.y) * pr.u }, 8 + (SPOTS[i].r - 8) * pr.u, LIFT_SCALE + (1 - LIFT_SCALE) * pr.u);
      } }, at);
      tl.add(() => { rest(i); }, at + 0.36);
    };

    const sp = document.createElementNS("http://www.w3.org/2000/svg", "path");
    sp.setAttribute("d", SCRIB);
    const END = (() => { const p = sp.getPointAtLength(sp.getTotalLength()); return { x: p.x, y: p.y }; })();
    const big = q("cr-big"), bigS = { s: 0, o: 0, bob: 0 };
    const renderBig = () => gsap.set(big, { opacity: bigS.o, x: END.x + 8, y: END.y - 30 - 4 * bigS.bob, scale: bigS.s, rotation: -8 + 6 * bigS.bob });
    const burst = { t: 0 };
    const HEART = Array.from({ length: 6 }, (_, i) => { const a = (-150 + i * 24) * Math.PI / 180; return { dx: Math.cos(a) * (40 + (i % 3) * 18), dy: Math.sin(a) * (36 + (i % 2) * 20), s: 1.1 + (i % 3) * 0.35, r: (i * 37) % 40 - 20 }; });
    const renderBurst = () => {
      const t = burst.t, bx = END.x + 8, by = END.y - 30;
      hearts.forEach((h, i) => { const p = HEART[i], a = t > 0 && t < 1; gsap.set(h, { opacity: a ? Math.max(0, 1 - t ** 4) : 0, x: bx + p.dx * Math.min(1, t * 1.5), y: by + p.dy * Math.min(1, t * 1.5) - 20 * t, rotation: p.r, scale: p.s * (0.6 + t * 0.5) }); });
      sparks.forEach((s, i) => { const a = t > 0 && t < 0.7, ang = (i * 120 - 40) * Math.PI / 180; gsap.set(s, { opacity: a ? 1 - t / 0.7 : 0, x: bx + Math.cos(ang) * 46 * t, y: by + Math.sin(ang) * 46 * t, scale: 1 + t }); });
    };

    const tl = gsap.timeline({ paused: true });
    // 1. the box slides in; the crayons pop up one by one
    tl.add(snd(cardSounds.flip), 0);
    tl.to(box, { opacity: 1, x: 0, y: 0, duration: 0.5, ease: "back.out(1.4)" }, 0);
    SPOTS.forEach((_, i) => {
      const t0 = 0.45 + i * 0.13;
      tl.add(snd(cardSounds.tap), t0 + 0.05);
      tl.to(stc[i], { y: 0, o: 1, duration: 0.32, ease: "back.out(1.6)", onUpdate: () => paint(i) }, t0);
    });
    // 2. curious; the red crayon draws a loose loop
    tl.add(() => { void f.to("curious", 0.35); gaze(BX + 120, BY + 40, 0.35); }, 1.2);
    lift(tl, 0, 1.5);
    tl.add(snd(cardSounds.scribble), 1.9);
    draw(tl, 0, LOOP, "#D93A2B", 1.9, 0.8);
    tl.add(() => gaze(HOLD.x + 20, HOLD.y, 0.3), 2.0);
    tl.add(() => gaze(HOLD.x + 40, HOLD.y + 20, 0.3), 2.4);
    putBack(tl, 0, 2.8);
    tl.add(snd(cardSounds.tap), 3.15);
    // 3. thinking; the blue crayon draws a wave
    tl.add(() => { void f.to("thinking", 0.4); gaze(BX + 120, BY, 0.3); }, 3.15);
    lift(tl, 3, 3.3);
    tl.add(snd(cardSounds.scribble), 3.7);
    draw(tl, 3, WAVE, "#4A8FC4", 3.7, 0.8);
    tl.add(() => gaze(HOLD.x + 30, HOLD.y, 0.3), 3.8);
    tl.add(() => gaze(HOLD.x + 70, HOLD.y, 0.3), 4.2);
    putBack(tl, 3, 4.6);
    tl.add(snd(cardSounds.tap), 4.95);
    // 4. the yellow crayon stays up; she smiles; hearts and sparkles rise
    tl.add(() => { void f.to("proud", 0.4); gaze(HOLD.x - 30, HOLD.y + 10, 0.3); }, 5.0);
    lift(tl, 1, 5.1, 8);
    tl.add(snd(cardSounds.scribble), 5.55);
    draw(tl, 1, SCRIB, "#FFD84D", 5.55, 1.1);
    tl.add(() => gaze(HOLD.x + 30, HOLD.y, 0.3), 5.7);
    tl.add(() => gaze(HOLD.x + 70, HOLD.y - 5, 0.3), 6.2);
    // it "blows" a big heart: the line is done, the heart swells out of the tip, then small hearts and sparkles scatter
    tl.add(() => { void f.to("smile", 0.4); gaze(END.x, END.y - 20, 0.3); }, 6.95);
    tl.add(snd(cardSounds.pop), 7.0);
    tl.add(() => gsap.set(trail, { opacity: 0 }), 7.0);
    tl.fromTo(bigS, { s: 0, o: 1 }, { s: 2.6, duration: 0.45, ease: "back.out(2)", onUpdate: renderBig }, 7.0);
    tl.add(snd(cardSounds.sparkle), 7.5);
    tl.to(burst, { t: 1, duration: 1.3, ease: "power1.out", onUpdate: renderBurst }, 7.45);
    tl.add(snd(cardSounds.warm), 7.55);
    tl.add(() => gaze(160, 100, 0.5), 8.0);

    let ambient: gsap.core.Animation[] = [];
    const startAmbient = () => {
      ambient.forEach((a) => a.kill());
      const sway = { v: 0 };
      ambient = [
        gsap.to(sway, { v: 1, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, onUpdate: () => { place(1, END, 8 + 3 * (sway.v - 0.5) * 2); bigS.bob = sway.v; renderBig(); } }),
        gsap.to(burst, { t: 1, duration: 3.2, ease: "power1.out", repeat: -1, repeatDelay: 1.2, onRepeat: () => { if (!silent) cardSounds.sparkle(); }, onUpdate: renderBurst }),
      ];
    };
    tl.eventCallback("onComplete", () => { if (!reduced) startAmbient(); });

    api.current = {
      start() {
        if (reduced || tl.isActive()) return;
        silent = false;
        ambient.forEach((a) => a.kill());
        ambient = [];
        burst.t = 0; renderBurst();
        bigS.s = 0; bigS.o = 0; renderBig();
        resetAll();
        void f.to("calm", 0.01);
        tl.play(0);
      },
    };
    if (reduced) {
      silent = true;
      tl.progress(1).pause();
      void f.to("smile", 0.01);
      burst.t = 0.55; renderBurst();
      bigS.s = 2.6; bigS.o = 1; renderBig();
    } else if (hover.current) api.current.start();
    return () => {
      api.current = null;
      ambient.forEach((a) => a.kill());
      tl.kill();
      idleBlink?.stop();
    };
  }, [rig]);

  return (
    <span ref={wrap} className={`interview-art ${className}`} role={alt ? "img" : undefined} aria-label={alt || undefined}>
      {rig ? <RigFace ref={face} rig={rig} initial="calm" cut={avatarBlobs.coils.d} overlay={over} /> : <Image src="/avatars/coils.svg" width={288} height={288} className="avatar" alt="" draggable={false} unoptimized />}
    </span>
  );
}
