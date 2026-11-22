"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { cardSounds } from "@/lib/card-sounds";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";

// The Word Swap page: the turban man with two boxes of the same size on his right: a plain lilac box (with a pale tape strip) and a gold gift box (lid, ribbon and bow),
// drawn like the founder's pictures (flat, thin brown outline, coral hearts, a soft swirly cloud). By itself 1 s after the page loaded (hovering plays it again), about 6.5 s:
// 1. the two boxes swap places 2 times: one hops over the other while the other slides under (they never touch). He looks from one to the other (kit faces curious, thinking).
// 2. he chooses the plain box: it hops once, his face is sure (kit face "proud").
// 3. the plain box opens: its lid is one rigid piece (a small press, it lifts, tips off to the right, tumbles over once, lands flat on the floor, bounces and settles). Hearts squeeze out and float up; he smiles.
// 4. the gold gift box goes "puff" (just before the lid lands where it stood): a ring of soft swirly puffs with a few sparkles, and it is gone.
// Then quiet things: the hearts bob and a small heart drifts up now and then. Reduced motion: the finished scene (plain box open, hearts up, no gift box, no sound, nothing moves).
// No words or letters on the boxes.

const CUT = avatarBlobs.turban.d;
const HF = "#F6A39D", HS = "#8E4B22";
const L = [262, 598], F = [560, 660], R = [806, 586], BK = [508, 524], H = 46;   // the box rim, in the picture's own coordinates (1024 canvas)
const f1 = (n: number) => n.toFixed(1);
const pts = (a: number[][]) => a.map((p) => `${f1(p[0])} ${f1(p[1])}`).join("L");
const poly = (a: number[][], fill: string, out: string, w = 5) => `<path d="M${pts(a)}Z" fill="${fill}" stroke="${out}" stroke-width="${w}" stroke-linejoin="round"/>`;
const up = (p: number[], h = H) => [p[0], p[1] - h];

type Pal = { l: string; ls: string; r: string; rs: string; inner: string; wl: string; wr: string; top: string; bl: string; br: string; out: string; stripes: boolean; ribbon: boolean; tape?: boolean };
const PAL: Record<"gold" | "lilac", Pal> = {
  gold: { l: "#F0BA4C", ls: "#F8D77E", r: "#E9AE3C", rs: "#F3CB6A", inner: "#D79A2A", wl: "#E6B04A", wr: "#D49A34", top: "#F6CB62", bl: "#E7B045", br: "#DCA233", out: "#8E4B22", stripes: true, ribbon: true },
  lilac: { l: "#CDBBF3", ls: "#CDBBF3", r: "#BCA8EA", rs: "#BCA8EA", inner: "#9F89D6", wl: "#B29DE2", wr: "#A592DA", top: "#DACBF7", bl: "#C6B2EE", br: "#B7A2E4", out: "#4B3A6E", stripes: false, ribbon: false, tape: true },
};
const RB = "#EE6F5F", RBD = "#D9503F";

const bow = (out: string) => `<g id="ws-bow" stroke="${out}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
<path d="M520 546C470 470 392 470 384 520C380 570 470 580 520 546Z" fill="${RB}"/>
<path d="M520 546C562 462 646 458 650 514C652 568 566 580 520 546Z" fill="${RB}"/>
<path d="M438 502C430 524 450 548 482 548" fill="none" stroke="${RBD}" stroke-width="7"/>
<path d="M592 494C606 520 590 546 560 548" fill="none" stroke="${RBD}" stroke-width="7"/>
<path d="M514 552C500 590 478 620 458 650L486 646L494 676C514 640 536 600 540 556Z" fill="${RB}"/>
<path d="M530 552C560 590 598 612 636 624L612 600L640 590C604 580 566 566 544 548Z" fill="${RB}"/>
<ellipse cx="522" cy="548" rx="26" ry="22" fill="${RBD}"/></g>`;

const stripes = (c: string) => { let s = ""; for (let x = 120; x < 1000; x += 150) s += `<path d="M${x} 980L${x + 380} 520" stroke="${c}" stroke-width="58"/>`; return s; };
const LF = [L, F, [562, 935], [262, 860]], RF = [F, R, [800, 845], [562, 935]];
const innerOf = (p: Pal) => `<path d="M${pts([L, BK, R, F])}Z" fill="${p.inner}" stroke="${p.out}" stroke-width="5" stroke-linejoin="round"/>` + poly([L, BK, [BK[0], BK[1] + 150], [L[0], L[1] + 150]], p.wl, p.out) + poly([BK, R, [R[0], R[1] + 150], [BK[0], BK[1] + 150]], p.wr, p.out);
const frontOf = (p: Pal) => poly(LF, p.l, p.out) + poly(RF, p.r, p.out) + (p.stripes ? `<g clip-path="url(#ws-cl)">${stripes(p.ls)}</g><g clip-path="url(#ws-cr)">${stripes(p.rs)}</g>` + poly(LF, "none", p.out) + poly(RF, "none", p.out) : "");
const lidOf = (p: Pal, id: string) => {
  const Lt = up(L), Ft = up(F), Rt = up(R), Bt = up(BK), o = p.out;
  let s = poly([Lt, Ft, F, L], p.bl, o) + poly([Ft, Rt, R, F], p.br, o) + poly([Lt, Ft, Rt, Bt], p.top, o);
  if (p.ribbon) s += `<path d="M365 521L405 509L703 571L663 583Z" fill="${RB}" stroke="${o}" stroke-width="5" stroke-linejoin="round"/><path d="M663 583L703 571L703 617L663 629Z" fill="${RBD}" stroke="${o}" stroke-width="5" stroke-linejoin="round"/>` + bow(o);
  if (p.tape) s += `<path d="M365 521L405 509L703 571L663 583Z" fill="#EADFFB" stroke="${o}" stroke-width="5" stroke-linejoin="round"/><path d="M663 583L703 571L703 617L663 629Z" fill="#DCCDF6" stroke="${o}" stroke-width="5" stroke-linejoin="round"/>`;
  return `<g id="${id}">${s}</g>`;
};

// the scene (card units, same as the figure: 320 x 310). Both boxes stand on his right.
const S = 0.2, P1 = 262, P2 = 372, BY = 326;   // box scale, the near and the far place, the floor line
const place = (x: number, y: number, s: number) => `translate(${f1(x)} ${f1(y)}) scale(${s.toFixed(4)}) translate(-534 -935)`;
const HEARTS = [
  { x: 296, y: 198, s: 1.3, r: -6 },
  { x: 314, y: 146, s: 1.9, r: 10 },
  { x: 268, y: 92, s: 1.2, r: -8 },
  { x: 332, y: 200, s: 1.0, r: 12 },
];
const DOTS = [[246, 60], [350, 96], [372, 150], [228, 130]];
const HEART_D = "M0 11C-17 -1 -14 -17 -5 -15Q0 -14 0 -8Q0 -14 5 -15C14 -17 17 -1 0 11Z";
const SPARK_D = "M0 -9Q0 0 9 0Q0 0 0 9Q0 0 -9 0Q0 0 0 -9Z";
const PUFF = { x: 372, y: 238, k: 0.85 };

// the puff, copied from the founder's cloud picture: a ring of soft swirly puffs, lilac-white on top, pale aqua below, three small puffs around it
const puffMarkup = () => {
  const lobes: number[][] = [];
  for (let i = 0; i < 9; i++) { const a = ((-90 + i * 40) * Math.PI) / 180; lobes.push([Math.cos(a) * 36, Math.sin(a) * 34, [22, 20, 23, 21, 22, 20, 24, 21, 22][i]]); }
  const all = lobes.concat([[-40, -66, 10], [-72, 50, 11], [62, 58, 11]]);
  const c = (l: number[], edge: boolean) => `<circle cx="${l[0]}" cy="${f1(l[1])}" r="${l[2]}" fill="url(#ws-pg)" ${edge ? 'stroke="#CFC3EC" stroke-width="3.6"' : ""}/>`;
  const swirl = (x: number, y: number, r: number) => `<path transform="translate(${f1(x)} ${f1(y)}) scale(${(r / 22).toFixed(2)})" d="M0 -2C5 -2 7 3 3 6C-2 9 -9 4 -7 -3C-5 -10 5 -12 10 -6" fill="none" stroke="#B9AEE0" stroke-width="2.4" stroke-linecap="round" opacity=".85"/>`;
  const sp = (x: number, y: number, k: number, fill: string, id: string) => `<path id="${id}" transform="translate(${x} ${y}) scale(${k})" d="${SPARK_D}" fill="${fill}"/>`;
  return `<g id="ws-puff" opacity="0" transform="translate(${PUFF.x} ${PUFF.y}) scale(0.01)">${all.map((l) => c(l, true)).join("")}${all.map((l) => c(l, false)).join("")}`
    + [0, 2, 4, 6, 8].map((i) => swirl(lobes[i][0] - 3, lobes[i][1] - 2, lobes[i][2])).join("") + swirl(-40, -66, 10)
    + sp(-18, -88, 1, "#FFD84D", "ws-ps0") + sp(74, -30, 0.85, "#FFC2D6", "ws-ps1") + sp(8, 84, 0.75, "#FFFFFF", "ws-ps2") + `</g>`;
};

const markup = () => {
  const g = PAL.gold, p = PAL.lilac;
  const gx = (x: number) => P1 + (x - 534) * S, gy = (y: number) => BY + (y - 935) * S;
  const rim = `M-100 -100L500 -100L500 ${f1(gy(R[1]))}L${f1(gx(R[0]))} ${f1(gy(R[1]))}L${f1(gx(F[0]))} ${f1(gy(F[1]))}L${f1(gx(L[0]))} ${f1(gy(L[1]))}L-100 ${f1(gy(L[1]))}Z`;
  const shadow = (id: string, cx: number) => `<ellipse id="${id}" cx="${cx + 6}" cy="${BY + 3}" rx="${300 * S}" ry="${34 * S}" fill="#C9744A" opacity=".28"/>`;
  return `<defs><clipPath id="ws-cl"><path d="M262 598L560 660L562 935L262 860Z"/></clipPath><clipPath id="ws-cr"><path d="M560 660L806 586L800 845L562 935Z"/></clipPath><clipPath id="ws-rim"><path d="${rim}"/></clipPath>`
    + `<linearGradient id="ws-pg" gradientUnits="userSpaceOnUse" x1="0" y1="-68" x2="0" y2="68"><stop offset="0" stop-color="#E4D9F7"/><stop offset=".42" stop-color="#FFFFFF"/><stop offset=".7" stop-color="#F4F9FF"/><stop offset="1" stop-color="#B7E3EE"/></linearGradient></defs>`
    + shadow("ws-ps", P1) + shadow("ws-gs", P2)
    + `<g id="ws-plain" transform="${place(P1, BY, S)}">${innerOf(p)}${frontOf(p)}${lidOf(p, "ws-plid")}</g>`
    + `<g id="ws-gold" transform="${place(P2, BY, S)}">${innerOf(g)}${frontOf(g)}${lidOf(g, "ws-glid")}</g>`
    + `<g clip-path="url(#ws-rim)">${HEARTS.map((_, i) => `<path id="ws-h${i}" opacity="0" d="${HEART_D}" fill="${HF}" stroke="${HS}" stroke-linejoin="round"/>`).join("")}<path id="ws-h4" opacity="0" d="${HEART_D}" fill="${HF}" stroke="${HS}" stroke-linejoin="round"/></g>`
    + DOTS.map(([x, y], i) => `<circle id="ws-d${i}" cx="${x}" cy="${y}" r="2.6" fill="#F3948E" opacity="0"/>`).join("")
    + `<path id="ws-c0" opacity="0" d="${SPARK_D}" fill="#FFD84D"/><path id="ws-c1" opacity="0" d="${SPARK_D}" fill="#FFD84D"/>`
    + puffMarkup();
};

type Lid = { dx: number; dy: number; rot: number; bow: number };
// the lid ends lying flat on the floor on the box's right (where the gold box was), the right way up
const LID_OPEN: Lid = { dx: 560, dy: 262, rot: 360, bow: 0 };
const LC = [534, 585];   // the lid's own middle: it tumbles about this point

export default function WordSwapAvatar({ className = "", alt = "" }: { className?: string; alt?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const face = useRef<RigFaceHandle>(null);
  const [rig, setRig] = useState<MailmanRig | null>(null);
  const hover = useRef(false);
  const api = useRef<{ start: () => void } | null>(null);
  const over = useMemo(() => <g dangerouslySetInnerHTML={{ __html: markup() }} />, []);

  useEffect(() => {
    let alive = true;
    const go = () => import("@/lib/card-rigs/turban.generated").then((m) => { if (alive) setRig(m.turbanRig); });
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
    const plain = q("ws-plain"), gold = q("ws-gold"), pshadow = q("ws-ps"), gshadow = q("ws-gs"), plid = q("ws-plid");
    const puffEl = q("ws-puff"), c0 = q("ws-c0"), c1 = q("ws-c1");
    const pspark = [q("ws-ps0"), q("ws-ps1"), q("ws-ps2")];
    const hearts = Array.from({ length: 5 }, (_, i) => q(`ws-h${i}`));
    const dots = Array.from({ length: 4 }, (_, i) => q(`ws-d${i}`));
    const idleBlink = reduced ? null : f.idle();
    let silent = false;
    const snd = <A extends unknown[]>(fn: (...a: A) => void, ...a: A) => () => { if (!silent) fn(...a); };

    // the picture is drawn from plain numbers (state). The tweens hold these objects, so they are only ever changed in place.
    const st = {
      p: { x: P1, y: BY },                       // plain box
      g: { x: P2, y: BY, k: 1 },                 // gold box (k = size, shrinks to 0 in the puff)
      lid: { dx: 0, dy: 0, rot: 0 },             // the plain box's lid
      h: [0, 0, 0, 0] as number[],               // each heart: 0 = inside the box, 1 = floating in place
      pf: { k: 0, o: 0, sp: 0 },                 // the puff: size, opacity, sparkles
      ch: { a: 0, b: 0 },                        // two small sparkles when he chooses
      dots: 0, bob: 0, dr: 0,
    };
    const heartAt = (el: SVGElement, x: number, y: number, s: number, r: number, sq: number, o: number) => {
      el.setAttribute("opacity", String(o));
      el.setAttribute("stroke-width", f1(4 / s));
      el.setAttribute("transform", `translate(${f1(x)} ${f1(y)}) rotate(${f1(r)}) scale(${(s * sq).toFixed(3)} ${(s / sq).toFixed(3)})`);
    };
    const START = { x: P1 + 2, y: 236 };
    const render = () => {
      plain.setAttribute("transform", place(st.p.x, st.p.y, S));
      pshadow.setAttribute("transform", `translate(${f1(st.p.x - P1)} 0)`);
      gold.setAttribute("transform", place(st.g.x, st.g.y - (1 - st.g.k) * 45, S * Math.max(0.001, st.g.k)));
      gold.setAttribute("opacity", String(Math.min(1, st.g.k * 1.6)));
      gshadow.setAttribute("transform", `translate(${f1(st.g.x - P2)} 0)`);
      gshadow.setAttribute("opacity", String(0.28 * Math.min(1, st.g.k * 1.6)));
      plid.setAttribute("transform", `translate(${f1(st.lid.dx)} ${f1(st.lid.dy)}) rotate(${f1(st.lid.rot)} ${LC[0]} ${LC[1]})`);
      HEARTS.forEach((fh, i) => {
        const t = st.h[i], a = t > 0;
        const ease = 1 - (1 - t) * (1 - t);
        const sq = t < 0.55 ? 0.6 + 0.5 * (t / 0.55) : 1.1 - 0.1 * ((t - 0.55) / 0.45);
        const sway = t < 1 ? 6 * Math.sin(t * 7 + i) * (1 - t) : 0;
        const bob = t >= 1 ? 3 * Math.sin(st.bob + i * 1.7) : 0;
        heartAt(hearts[i], START.x + (fh.x - START.x) * ease + sway, START.y + (fh.y - START.y) * ease + bob, fh.s * (0.55 + 0.45 * ease), fh.r * ease + (t >= 1 ? 4 * Math.sin(st.bob * 0.9 + i) : 0), sq, a ? 1 : 0);
      });
      const dr = st.dr;   // a small heart that drifts up now and then
      heartAt(hearts[4], 300 + 12 * Math.sin(dr * 6), 232 - 150 * dr, 0.8, 8 * Math.sin(dr * 5), 1, dr > 0 && dr < 1 ? Math.min(1, dr * 6, (1 - dr) * 3) : 0);
      dots.forEach((d, i) => d.setAttribute("opacity", String(Math.min(1, Math.max(0, st.dots * 1.4 - i * 0.12)))));
      puffEl.setAttribute("opacity", String(st.pf.o));
      puffEl.setAttribute("transform", `translate(${PUFF.x} ${PUFF.y}) scale(${(PUFF.k * Math.max(0.01, st.pf.k)).toFixed(3)})`);
      pspark.forEach((sp, i) => { const t = st.pf.sp; sp.setAttribute("opacity", String(Math.max(0, Math.sin(Math.PI * Math.min(1, Math.max(0, t * 1.2 - i * 0.12)))))); });
      const sparkAt = (el: SVGElement, x: number, y: number, v: number) => { el.setAttribute("opacity", String(Math.sin(Math.PI * v))); el.setAttribute("transform", `translate(${x} ${f1(y - 10 * v)}) scale(${(0.6 + 0.6 * v).toFixed(2)})`); };
      sparkAt(c0, P1 - 30, 222, st.ch.a); sparkAt(c1, P1 + 34, 214, st.ch.b);
    };
    const reset = () => {
      Object.assign(st.p, { x: P1, y: BY });
      Object.assign(st.g, { x: P2, y: BY, k: 1 });
      Object.assign(st.lid, { dx: 0, dy: 0, rot: 0 });
      st.h.fill(0);
      Object.assign(st.pf, { k: 0, o: 0, sp: 0 });
      Object.assign(st.ch, { a: 0, b: 0 });
      Object.assign(st, { dots: 0, bob: 0, dr: 0 });
      render();
    };
    const finish = () => {
      reset();
      Object.assign(st.lid, LID_OPEN);
      Object.assign(st.g, { k: 0 });
      st.h.fill(1);
      st.dots = 1;
      render();
    };
    reset();

    // one swap: A hops over B (an arc, apex 104 high), B slides under it. Both move with the same ease, so at the middle B's top is still below A's bottom.
    const swap = (tl: gsap.core.Timeline, t0: number, hopper: { x: number; y: number }, slider: { x: number; y: number }, from: number, to: number) => {
      const u = { v: 0 };
      tl.fromTo(u, { v: 0 }, { v: 1, duration: 0.7, ease: "power2.inOut", onUpdate: () => {
        hopper.x = from + (to - from) * u.v;
        slider.x = to + (from - to) * u.v;
        hopper.y = BY - 104 * Math.sin(Math.PI * u.v);
        slider.y = BY;
      } }, t0);
      tl.add(snd(cardSounds.swapWhoosh), t0 + 0.05);
      tl.add(snd(cardSounds.swapTap), t0 + 0.68);
    };

    const tl = gsap.timeline({ paused: true, onUpdate: render });
    tl.add(() => f.gazeTo(8, 6, 0.3), 0);
    // 1. two swaps: the gold box hops over to the near place, then the plain box hops back. He looks from one to the other, puzzled.
    tl.add(() => { void f.to("curious", 0.35); f.gazeTo(15, -4, 0.3); }, 0.55);
    swap(tl, 0.7, st.g, st.p, P2, P1);
    tl.add(() => f.gazeTo(9, 4, 0.35), 1.1);
    tl.add(() => { void f.to("thinking", 0.4); f.gazeTo(9, -2, 0.3); }, 1.65);
    swap(tl, 1.8, st.p, st.g, P2, P1);   // the plain box is now at the far place: it hops back over the gold box
    tl.add(() => f.gazeTo(15, 3, 0.35), 2.25);
    // 2. he chooses the plain box: one small happy hop, a sure face, two small sparkles
    tl.add(() => { void f.to("proud", 0.4); f.gazeTo(10, 4, 0.3); }, 2.75);
    tl.to(st.p, { y: BY - 16, duration: 0.2, ease: "power2.out" }, 2.85);
    tl.to(st.p, { y: BY, duration: 0.28, ease: "power2.in" }, 3.05);
    tl.add(snd(cardSounds.swapTap), 3.33);
    tl.fromTo(st.ch, { a: 0, b: 0 }, { a: 1, duration: 0.7, ease: "none" }, 2.9);
    tl.fromTo(st.ch, { b: 0 }, { b: 1, duration: 0.7, ease: "none" }, 3.0);
    // 3. the plain box opens (the lid is one rigid piece), hearts leave once it has cleared the opening
    const T = 3.7;
    tl.to(st.lid, { dy: 5, duration: 0.14, ease: "power1.out" }, T);
    tl.add(snd(cardSounds.rustle), T + 0.12);
    tl.to(st.lid, { dy: -80, rot: -6, duration: 0.5, ease: "power2.in" }, T + 0.14);
    tl.add(() => f.gazeTo(8, -8, 0.4), T + 0.4);
    // the lid tips off the box and tumbles over once to the right, lands flat on the floor, bounces a little and settles
    tl.to(st.lid, { rot: 360, dx: 560, duration: 0.9, ease: "power1.inOut" }, T + 0.7);
    tl.to(st.lid, { dy: -200, duration: 0.3, ease: "power2.out" }, T + 0.7);
    tl.to(st.lid, { dy: 262, duration: 0.6, ease: "power2.in" }, T + 1.0);
    tl.add(snd(cardSounds.lidThump), T + 1.6);
    tl.to(st.lid, { dy: 222, rot: 366, duration: 0.14, ease: "power2.out" }, T + 1.6);
    tl.to(st.lid, { dy: 262, rot: 360, duration: 0.16, ease: "bounce.out" }, T + 1.74);
    tl.add(snd(cardSounds.heartChime), T + 0.85);
    HEARTS.forEach((_, i) => tl.to(st.h, { [i]: 1, duration: 1.15, ease: "power1.out" }, T + 0.85 + i * 0.22));
    tl.add(snd(cardSounds.sparkle), T + 1.45);
    tl.to(st, { dots: 1, duration: 0.6, ease: "power1.out" }, T + 1.3);
    tl.add(() => { void f.to("smile", 0.5); f.gazeTo(4, -8, 0.5); }, T + 1.2);
    // 4. the gold gift box goes puff and is gone
    const P = T + 0.5;   // the gold box is gone before the lid lands in its place
    tl.add(snd(cardSounds.puff), P);
    tl.to(st.pf, { k: 1, o: 1, duration: 0.32, ease: "back.out(1.6)" }, P);
    tl.to(st.g, { k: 0, duration: 0.3, ease: "power2.in" }, P + 0.04);
    tl.fromTo(st.pf, { sp: 0 }, { sp: 1, duration: 1.0, ease: "none" }, P + 0.1);
    tl.to(st.pf, { k: 1.25, o: 0, duration: 0.6, ease: "power1.in" }, P + 0.55);
    tl.add(() => f.gazeTo(0, 0, 0.5), P + 0.9);

    let ambient: gsap.core.Animation[] = [];
    const startAmbient = () => {
      ambient.forEach((a) => a.kill());
      ambient = [
        gsap.to(st, { bob: Math.PI * 2, duration: 4.2, ease: "none", repeat: -1, onUpdate: render }),
        gsap.fromTo(st, { dr: 0 }, { dr: 1, duration: 3.2, ease: "sine.inOut", repeat: -1, repeatDelay: 2.4, delay: 1.2, onUpdate: render }),
      ];
    };
    tl.eventCallback("onComplete", () => { if (!reduced) startAmbient(); });

    api.current = {
      start() {
        if (reduced || tl.isActive()) return;
        silent = false;
        ambient.forEach((a) => a.kill());
        ambient = [];
        reset();
        void f.to("calm", 0.01);
        tl.play(0);
      },
    };
    if (reduced) {
      silent = true;
      tl.kill();
      void f.to("smile", 0.01);
      finish();
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
      {rig ? <RigFace ref={face} rig={rig} initial="calm" cut={CUT} overlay={over} /> : <Image src="/avatars/turban.svg" width={288} height={288} className="avatar" alt="" draggable={false} unoptimized />}
    </span>
  );
}
