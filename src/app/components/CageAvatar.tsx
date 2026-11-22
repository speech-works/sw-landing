"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { cardSounds } from "@/lib/card-sounds";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";

// The Breaking Thought Traps page: Curly in a brittle cage under a dark rain cloud. The cage is drawn like the founder's picture (thick brush arch, four curved bars that meet at the
// top, a red floor); the cloud is the founder's cloud (dark navy, three lobes, plain teardrops); the white clouds are the same cloud shape in white; the sun is the founder's sun.
// By itself 1 s after the page loaded (hovering plays it again), about 6 s:
// 1. she stands in the cage, rain falls; 2. she looks up, the cage creaks (cracks, flakes, a rocking), one bar snaps;
// 3. the cage breaks into pieces that fall away, the floor splits, the dark cloud shrinks and leaves, she laughs; 4. the sun comes out, white clouds float in, she smiles.
// Then quiet things: the white clouds drift, the sun rays turn slowly. Reduced motion: the finished picture (no cage, sun, white clouds; no sound, nothing moves).

const CUT = avatarBlobs.curly.d;
const K = "#17161B", NAVY = "#2F3556", NAVY2 = "#454C75", RED = "#FF1236", PALE = "#D9E4F6";
const r1 = (n: number) => Math.round(n * 10) / 10;
const CX = 160, AP = -120, HW = 190, NB = 17, RT = 20, RB = 30;
// a round wooden cage like the founder's picture: a flat top rim, uneven brown slats, two hoops, a gourd knob with a hook, a dark oval floor
const WOOD = ["#A04E2A", "#9A4826", "#A85A33"], HOOP = "#A85A33", RIM = "#8F4423", FLOORC = "#7A3E22";
const ANG = Array.from({ length: NB }, (_, i) => ((-78 + (i * 156) / (NB - 1)) * Math.PI) / 180);
const OFFS = ANG.map((a) => HW * Math.sin(a));
const poly = (p: [number, number][]) => "M" + p.map((a) => `${r1(a[0])} ${r1(a[1])}`).join("L");
const slatPts = (i: number) => {
  const c = Math.cos(ANG[i]), y0 = AP + RT * c, y1 = 300 + RB * c, p: [number, number][] = [];
  for (let y = y0; y < y1; y += 14) p.push([CX + OFFS[i] + Math.sin(y * 0.045 + i * 2.1) * 2.2, y]);
  p.push([CX + OFFS[i], y1]);
  return p;
};
const SNAP_BAR = NB - 4;
const bar = (i: number) => {
  const pts = slatPts(i), a = `fill="none" stroke="${WOOD[i % 3]}" stroke-width="${4.4 + (i % 3) * 0.6}" stroke-linejoin="round" stroke-linecap="round"`;
  if (i !== SNAP_BAR) return `<path d="${poly(pts)}" ${a}/>`;
  const top = pts.filter((p) => p[1] < 150), low = pts.filter((p) => p[1] >= 176);
  const last = top[top.length - 1], first = low[0];
  return `<path data-k="barA" d="${poly(top)}" ${a}/><path data-k="barC" d="${poly(low)}" ${a}/><path data-k="link" d="M${r1(last[0])} ${r1(last[1])}L${r1(first[0])} ${r1(first[1])}" ${a}/>`;
};
const hoop = (yc: number) => `<path d="M${CX - HW} ${yc}A${HW} 17 0 0 0 ${CX + HW} ${yc}" fill="none" stroke="${HOOP}" stroke-width="4.2" stroke-linecap="round"/>`;
const RING =
  `<ellipse cx="${CX}" cy="${AP}" rx="${HW + 4}" ry="${RT}" fill="#B0603A" stroke="${RIM}" stroke-width="4.5"/>` +
  `<path d="M${CX - 13} ${AP - 8}Q${CX - 20} ${AP - 24} ${CX - 9} ${AP - 36}Q${CX - 12} ${AP - 50} ${CX} ${AP - 54}Q${CX + 12} ${AP - 50} ${CX + 9} ${AP - 36}Q${CX + 20} ${AP - 24} ${CX + 13} ${AP - 8}Z" fill="#A5532B" stroke="${RIM}" stroke-width="3"/>` +
  `<path d="M${CX} ${AP - 54}C${CX + 2} ${AP - 84} ${CX - 10} ${AP - 102} ${CX - 42} ${AP - 112}C${CX - 64} ${AP - 119} ${CX - 80} ${AP - 110} ${CX - 76} ${AP - 96}" fill="none" stroke="#5A5560" stroke-width="5.5" stroke-linecap="round"/>`;
const CRACKS = "";
const INNER = `${hoop(40)}${hoop(165)}${OFFS.map((_, i) => bar(i)).join("")}${RING}${CRACKS}`;
// the pieces it breaks into: top, left, right (jagged edges, the same line is shared by neighbours so they fit) and the bottom stubs
const JT: [number, number][] = [[-200, 66], [-60, 78], [20, 62], [90, 82], [160, 64], [230, 80], [300, 62], [380, 78], [430, 60], [520, 70]];
const JB: [number, number][] = [[-200, 236], [-40, 224], [40, 236], [100, 222], [150, 232], [230, 236], [290, 224], [360, 238], [430, 226], [520, 236]];
const CH = {
  T: [[-200, -300], [520, -300], ...JT.slice().reverse()] as [number, number][],
  L: [...JT.slice(0, 5), [158, 150], ...JB.slice(0, 5).reverse()] as [number, number][],
  R: [JT[4], ...JT.slice(5), [520, 236], ...JB.slice(4).reverse(), [158, 150]] as [number, number][],
  B: [...JB, [520, 500], [-200, 500]] as [number, number][],
};
const PIECES = (["T", "L", "R", "B"] as const).map((k) => `<clipPath id="cg-k${k}"><path d="${poly(CH[k])}Z"/></clipPath>`).join("");
const piece = (k: string) => `<g id="cg-p${k}" style="display:none"><g clip-path="url(#cg-k${k})">${INNER}</g></g>`;

// ---- the red floor: a rough ellipse (hand-cut edge), seen only outside the colour blob ----
const rng = (s: number) => () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const SAND = FLOORC;
const RX = HW, RY = RB;
const FLOOR = `M${CX - RX} 300A${RX} ${RY} 0 1 0 ${CX + RX} 300A${RX} ${RY} 0 1 0 ${CX - RX} 300Z`;
const FL = "-400,-400 160,-400 150,280 170,300 150,320 160,500 -400,500", FR = "160,-400 800,-400 800,500 160,500 150,320 170,300 150,280";
// the front lip of the floor (drawn in front of her, so her body ends cleanly in the red floor, never on a bare cut edge)
const lipHalf = (k: string, pts: string) => `<clipPath id="cg-l${k}c"><polygon points="${pts}"/></clipPath><g id="cg-l${k}"><g clip-path="url(#cg-l${k}c)"><g clip-path="url(#cg-rim)"><path d="${FLOOR}" fill="${SAND}" stroke="${HOOP}" stroke-width="4"/></g></g></g>`;
const floorHalf = (k: string, pts: string) => `<clipPath id="cg-f${k}c"><polygon points="${pts}"/></clipPath><g id="cg-f${k}"><g clip-path="url(#cg-f${k}c)"><path d="${FLOOR}" fill="${SAND}" stroke="${HOOP}" stroke-width="4"/></g></g>`;

// ---- clouds and rain ----
const CLOUD = "M-130 20C-150 8 -146 -22 -118 -28C-112 -60 -70 -66 -52 -50C-40 -84 18 -92 40 -62C60 -80 110 -66 112 -34C140 -36 160 -4 140 14C130 26 110 26 100 22C60 30 -40 26 -76 24C-100 30 -122 28 -130 20Z";
const darkCloud = `<g id="cg-cloud"><path d="${CLOUD}" fill="${NAVY}"/><path d="M-52 -50C-40 -84 18 -92 40 -62C20 -70 -20 -66 -52 -40Z" fill="${NAVY2}" opacity=".7"/><path d="M60 -66C100 -70 120 -50 112 -34L84 -30Z" fill="${NAVY2}" opacity=".45"/></g>`;
const whiteCloud = (i: number) => `<g id="cg-w${i}"><path d="${CLOUD}" fill="#fff"/><path d="M-52 -50C-40 -84 18 -92 40 -62C20 -70 -20 -66 -52 -40Z" fill="${PALE}" opacity=".8"/><path d="M60 -66C100 -70 120 -50 112 -34L84 -30Z" fill="${PALE}" opacity=".55"/><path d="M-130 20C-100 30 -40 26 -76 24C-100 30 -122 28 -130 20ZM-60 24C-10 30 60 30 100 22C130 26 140 14 140 14C120 24 60 30 -60 24Z" fill="${PALE}" opacity=".7"/></g>`;
const DROP = "M0 -15C6 -5 9 1 9 6C9 12 5 15 0 15C-5 15 -9 12 -9 6C-9 1 -6 -5 0 -15Z";
// the rain: [x, where it ends]. The ones over her head end on her beret (now low, as she is small); the others fall down to the floor
const RAIN: [number, number][] = [[30, 290], [70, 270], [-10, 290], [110, 120], [150, 116], [200, 120], [240, 124], [262, 280], [300, 290], [340, 280], [-34, 285], [185, 118]];
const drops = RAIN.map((_, i) => `<path id="cg-d${i}" d="${DROP}" fill="${NAVY}" opacity="0"/>`).join("");
// white clouds: final place [x, y, size]
const WC: [number, number, number][] = [[-70, -70, 0.8], [160, -130, 0.6], [330, 60, 0.48], [-90, 170, 0.48], [420, 230, 0.6]];

// ---- the sun, copied from the founder's picture: orange crayon disc, darker cheeks, dot eyes, small smile, chunky yellow rays ----
const SR = 60, SX = 390, SY = -60, U = SR / 44;
const rays = Array.from({ length: 16 }, (_, i) => {
  const a = (i / 16) * Math.PI * 2 + 0.1, l0 = SR + 12 * U + (i % 2) * 3 * U, l1 = SR + 36 * U + ((i * 7) % 3) * 4 * U;
  return `<path d="M${r1(Math.cos(a) * l0)} ${r1(Math.sin(a) * l0)}L${r1(Math.cos(a) * l1)} ${r1(Math.sin(a) * l1)}" fill="none" stroke="#FFC61A" stroke-width="${r1(8 * U)}" stroke-linecap="round"/>`;
}).join("");
const cheek = (s: number) => `<path d="M${r1(s * SR * 1.1)} ${r1(-SR * 0.18)}C${r1(s * SR * 0.7)} ${r1(-SR * 0.34)} ${r1(s * SR * 0.6)} ${r1(SR * 0.1)} ${r1(s * SR * 0.62)} ${r1(SR * 0.38)}C${r1(s * SR * 0.8)} ${r1(SR * 0.5)} ${r1(s * SR)} ${r1(SR * 0.5)} ${r1(s * SR * 1.1)} ${r1(SR * 0.5)}Z" fill="#FF6A13"/>`;
const sunBody = `<g filter="url(#cg-crayon)"><circle r="${SR}" fill="#FFA00F"/><g clip-path="url(#cg-sunclip)">${cheek(-1)}${cheek(1)}</g></g>` +
  `<circle cx="${r1(-SR * 0.3)}" cy="${r1(-SR * 0.36)}" r="${r1(2.8 * U)}" fill="${K}"/><circle cx="${r1(SR * 0.3)}" cy="${r1(-SR * 0.36)}" r="${r1(2.8 * U)}" fill="${K}"/>` +
  `<path d="M${r1(-SR * 0.2)} ${r1(-SR * 0.1)}Q0 ${r1(SR * 0.06)} ${r1(SR * 0.2)} ${r1(-SR * 0.12)}" fill="none" stroke="#FF6A13" stroke-width="${r1(3 * U)}" stroke-linecap="round" stroke-linejoin="round"/>`;
const sparkle = (id: string, f: string) => `<path id="${id}" opacity="0" d="M0 -9Q0 0 9 0Q0 0 0 9Q0 0 -9 0Q0 0 0 -9Z" fill="${f}" stroke="${K}" stroke-width="3" stroke-linejoin="round"/>`;
const SPARK: [number, number, string][] = [[60, -20, "#FFD84D"], [380, 120, "#fff"], [-30, 60, "#FFD84D"]];
const POP = `<g id="cg-pop" opacity="0"><path d="M-78 40L-104 20M-52 -22L-70 -50M30 -60L24 -92M290 -56L304 -88M370 30L398 8M420 120L452 112" fill="none" stroke="${K}" stroke-width="4" stroke-linecap="round"/></g>`;

const filterDefs = `<filter id="cg-crayon" x="-6%" y="-6%" width="112%" height="112%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="2" seed="3" result="w"/><feDisplacementMap in="SourceGraphic" in2="w" scale="5" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="8" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -0.6 1.25" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter>`;
const defs = `<defs>${filterDefs}${PIECES}<clipPath id="cg-rim"><path d="M-100 288Q160 298 420 288L420 500L-100 500Z"/></clipPath><clipPath id="cg-sunclip"><circle r="${SR}"/></clipPath></defs>`;

// behind her (between the colour blob and her): the sun, the white clouds, the red floor (only outside the blob)
const markupUnder = () =>
  defs +
  `<g>${floorHalf("L", FL)}${floorHalf("R", FR)}</g>` +
  `<ellipse id="cg-shadow" cx="160" cy="352" rx="95" ry="8" fill="#000" opacity=".22"/>` +
  `<g id="cg-sun" opacity="0"><g id="cg-rays">${rays}</g><g id="cg-sbody">${sunBody}</g></g>` +
  WC.map((_, i) => whiteCloud(i)).join("");
// in front of her: the cage (whole, then in pieces), the dark cloud, the rain, the sparkles
const markupOver = () =>
  lipHalf("L", FL) + lipHalf("R", FR) +
  `<circle id="cg-ring" cx="160" cy="200" r="50" fill="none" stroke="#fff" stroke-width="8" opacity="0"/>` +
  `<g id="cg-all"><g id="cg-rock">${INNER}</g></g>${piece("T")}${piece("L")}${piece("R")}${piece("B")}` +
  `<g id="cg-flakes" opacity="0">${[[318, 120], [330, 170], [300, 210], [340, 90], [322, 240], [292, 150]].map(([x, y], i) => `<path id="cg-fl${i}" d="M0 -8Q6 0 0 8Q-5 0 0 -8Z" fill="#8A4222" transform="translate(${x} ${y})"/>`).join("")}</g>` +
  `<g id="cg-creak" opacity="0" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"><path d="M-48 80q-10 12 0 26M-62 74q-14 18 0 36M368 120q10 12 0 26M382 114q14 18 0 36"/></g>` +
  drops + darkCloud + POP + SPARK.map(([, , f], i) => sparkle(`cg-s${i}`, f)).join("");

export default function CageAvatar({ className = "", alt = "" }: { className?: string; alt?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const face = useRef<RigFaceHandle>(null);
  const [rig, setRig] = useState<MailmanRig | null>(null);
  const hover = useRef(false);
  const api = useRef<{ start: () => void } | null>(null);
  const under = useMemo(() => <g dangerouslySetInnerHTML={{ __html: markupUnder() }} />, []);
  const over = useMemo(() => <g dangerouslySetInnerHTML={{ __html: markupOver() }} />, []);

  useEffect(() => {
    let alive = true;
    const go = () => import("@/lib/card-rigs/curly.generated").then((m) => { if (alive) setRig(m.curlyRig); });
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
    const all = (sel: string) => Array.from(root.querySelectorAll<SVGElement>(sel));
    const idleBlink = reduced ? null : f.idle();
    let silent = false;
    const snd = <A extends unknown[]>(fn: (...a: A) => void, ...a: A) => () => { if (!silent) fn(...a); };

    const gAll = q("cg-all"), gRock = q("cg-rock"), pcs = { T: q("cg-pT"), L: q("cg-pL"), R: q("cg-pR"), B: q("cg-pB") };
    const fl = { L: q("cg-fL"), R: q("cg-fR") }, lip = { L: q("cg-lL"), R: q("cg-lR") };
    const shadow = q("cg-shadow"), ring = q("cg-ring"), figG = root.querySelector("svg")!.children[1] as SVGElement, blobEl = root.closest(".avatar-figure")?.querySelector<HTMLElement>(".avatar-blob") ?? null;
    const cloud = q("cg-cloud"), flakes = q("cg-flakes"), creak = q("cg-creak"), pop = q("cg-pop");
    const dropEl = RAIN.map((_, i) => q(`cg-d${i}`)), flEl = Array.from({ length: 6 }, (_, i) => q(`cg-fl${i}`));
    const sun = q("cg-sun"), rays = q("cg-rays"), sbody = q("cg-sbody"), wEl = WC.map((_, i) => q(`cg-w${i}`)), spEl = SPARK.map((_, i) => q(`cg-s${i}`));
    const cracks = all('[data-k="crack"]'), links = all('[data-k="link"]'), barA = all('[data-k="barA"]'), barC = all('[data-k="barC"]');
    const flakeStart = [[318, 120], [330, 170], [300, 210], [340, 90], [322, 240], [292, 150]];

    const Z = () => ({ x: 0, y: 0, r: 0, o: 1 });
    const st = {
      broken: false, wob: 0, wobP: 0, crack: 0, bsnap: 0, creak: 0, flakes: 0, flakeT: 0, pop: 0, fig: 0.75, ring: 0,
      cloud: { x: 160, y: -302, s: 1.15, o: 1 }, rain: { o: 1, p: 0 },
      T: Z(), L: Z(), R: Z(), B: Z(), fL: Z(), fR: Z(),
      sun: { s: 0, o: 0, rot: 0, pulse: 0 }, drift: 0,
      w: WC.map(() => ({ dx: 0, dy: 0, o: 0 })), spark: WC.map(() => 0),
    };
    const piecePivot = { T: [160, -60], L: [-40, 160], R: [380, 160], B: [160, 300], fL: [0, 300], fR: [320, 300] } as const;
    const tr = (p: { x: number; y: number; r: number }, pv: readonly number[]) => `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${p.r.toFixed(2)} ${pv[0]} ${pv[1]})`;

    const render = () => {
      gAll.style.display = st.broken ? "none" : "";
      (["T", "L", "R", "B"] as const).forEach((k) => {
        pcs[k].style.display = st.broken && st[k].o > 0.01 ? "" : "none";
        pcs[k].setAttribute("transform", tr(st[k], piecePivot[k]));
        pcs[k].setAttribute("opacity", st[k].o.toFixed(3));
      });
      (["L", "R"] as const).forEach((k) => {
        const p = st[k === "L" ? "fL" : "fR"];
        fl[k].style.display = p.o > 0.01 ? "" : "none";
        fl[k].setAttribute("transform", tr(p, piecePivot[k === "L" ? "fL" : "fR"]));
        fl[k].setAttribute("opacity", p.o.toFixed(3));
        lip[k].style.display = p.o > 0.01 ? "" : "none";
        lip[k].setAttribute("transform", tr(p, piecePivot[k === "L" ? "fL" : "fR"]));
        lip[k].setAttribute("opacity", p.o.toFixed(3));
      });
      // the cage rocks and creaks
      gRock.setAttribute("transform", `translate(${(Math.sin(st.wobP * 1.7) * 2.2 * st.wob).toFixed(2)} 0) rotate(${(Math.sin(st.wobP) * 1.1 * st.wob).toFixed(2)} 160 312)`);
      cracks.forEach((c) => c.setAttribute("opacity", st.crack.toFixed(2)));
      links.forEach((l) => l.setAttribute("opacity", st.bsnap > 0 ? "0" : "1"));
      barA.forEach((b) => b.setAttribute("transform", `rotate(${(-3.5 * st.bsnap).toFixed(2)} ${CX + OFFS[SNAP_BAR]} 150) translate(${(-3 * st.bsnap).toFixed(1)} 0)`));
      barC.forEach((b) => b.setAttribute("transform", `translate(${(8 * st.bsnap).toFixed(1)} ${(3 * st.bsnap).toFixed(1)})`));
      creak.setAttribute("opacity", (st.creak * (0.55 + 0.45 * Math.sin(st.wobP * 2.4))).toFixed(2));
      flakes.setAttribute("opacity", st.flakes ? "1" : "0");
      flEl.forEach((e, i) => { const t = st.flakeT, y = flakeStart[i][1] + t * (60 + i * 14), x = flakeStart[i][0] + t * 34 + Math.sin(t * 6 + i) * 6; e.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(t * 240 + i * 50).toFixed(0)})`); e.setAttribute("opacity", String(Math.max(0, 1 - t * t))); });
      figG.setAttribute("transform", `translate(160 300) scale(${st.fig.toFixed(3)}) translate(-160 -300)`);
      if (blobEl) { blobEl.style.transformOrigin = "50% 93.75%"; blobEl.style.transform = `scale(${st.fig.toFixed(3)})`; }
      shadow.setAttribute("opacity", (0.22 * st.B.o).toFixed(3));
      ring.setAttribute("opacity", st.ring > 0 && st.ring < 1 ? ((1 - st.ring) * 0.9).toFixed(2) : "0");
      ring.setAttribute("r", (50 + 300 * st.ring).toFixed(1));
      ring.setAttribute("stroke-width", (2 + 8 * (1 - st.ring)).toFixed(1));
      cloud.setAttribute("transform", `translate(${st.cloud.x.toFixed(1)} ${st.cloud.y.toFixed(1)}) scale(${st.cloud.s.toFixed(3)})`);
      cloud.setAttribute("opacity", st.cloud.o.toFixed(3));
      RAIN.forEach(([x, end], i) => {
        const t = (st.rain.p + i / RAIN.length) % 1, y = -280 + t * (end + 14 + 280), a = (t < 0.1 ? t / 0.1 : t > 0.88 ? (1 - t) / 0.12 : 1) * st.rain.o;
        dropEl[i].setAttribute("transform", `translate(${x} ${y.toFixed(1)})`);
        dropEl[i].setAttribute("opacity", a.toFixed(2));
      });
      pop.setAttribute("opacity", String(st.pop > 0 && st.pop < 1 ? Math.sin(st.pop * Math.PI) : 0));
      pop.setAttribute("transform", `translate(160 120) scale(${(0.7 + 0.5 * st.pop).toFixed(3)}) translate(-160 -120)`);
      sun.setAttribute("opacity", st.sun.o.toFixed(2));
      sun.setAttribute("transform", `translate(${SX} ${SY}) scale(${Math.max(0.001, st.sun.s).toFixed(3)})`);
      rays.setAttribute("transform", `rotate(${st.sun.rot.toFixed(2)})`);
      sbody.setAttribute("transform", `scale(${(1 + 0.025 * Math.sin(st.sun.pulse)).toFixed(4)})`);
      WC.forEach(([x, y, s], i) => {
        const w = st.w[i];
        wEl[i].setAttribute("transform", `translate(${(x + w.dx + Math.sin(st.drift + i * 1.7) * 7).toFixed(1)} ${(y + w.dy + Math.cos(st.drift * 0.8 + i) * 2.5).toFixed(1)}) scale(${(s * (0.85 + 0.15 * w.o)).toFixed(3)})`);
        wEl[i].setAttribute("opacity", w.o.toFixed(3));
      });
      SPARK.forEach(([x, y], i) => {
        const a = st.spark[i] * (0.65 + 0.35 * Math.sin(st.drift * 2 + i * 2));
        spEl[i].setAttribute("opacity", a.toFixed(2));
        spEl[i].setAttribute("transform", `translate(${x} ${y}) scale(${(0.5 + st.spark[i] * 0.7).toFixed(2)})`);
      });
    };
    const initial = () => {
      Object.assign(st, { broken: false, wob: 0, wobP: 0, crack: 0, bsnap: 0, creak: 0, flakes: 0, flakeT: 0, pop: 0, drift: 0, fig: 0.75, ring: 0 });
      Object.assign(st.cloud, { x: 160, y: -302, s: 1.15, o: 1 });
      Object.assign(st.rain, { o: 1 });
      (["T", "L", "R", "B", "fL", "fR"] as const).forEach((k) => Object.assign(st[k], Z()));
      Object.assign(st.sun, { s: 0, o: 0, rot: 0, pulse: 0 });
      st.w.forEach((w, i) => Object.assign(w, { dx: i % 2 ? 160 : -160, dy: 0, o: 0 }));
      st.spark = WC.map(() => 0);
    };
    const finished = () => {
      Object.assign(st, { broken: true, wob: 0, crack: 0, bsnap: 1, creak: 0, flakes: 0, pop: 0, fig: 1, ring: 0 });
      Object.assign(st.cloud, { o: 0 });
      Object.assign(st.rain, { o: 0 });
      (["T", "L", "R", "B", "fL", "fR"] as const).forEach((k) => Object.assign(st[k], { o: 0 }));
      Object.assign(st.sun, { s: 1, o: 1 });
      st.w.forEach((w) => Object.assign(w, { dx: 0, dy: 0, o: 1 }));
      st.spark = WC.map(() => 1);
    };

    let rainTween: gsap.core.Tween | null = null;
    const startRain = () => { rainTween?.kill(); st.rain.p = 0; rainTween = gsap.to(st.rain, { p: 1, duration: 1.5, ease: "none", repeat: -1, onUpdate: render }); };

    const tl = gsap.timeline({ paused: true, onUpdate: render });
    // 1. trapped, in the rain
    tl.add(snd(cardSounds.hum), 0.15);
    [0.45, 0.8, 1.05].forEach((t) => tl.add(snd(cardSounds.drip), t));
    // 2. she looks up; the cage creaks, cracks, flakes fall; a bar snaps
    tl.add(() => { void f.to("curious", 0.35); f.gazeTo(0, -12, 0.4); }, 1.3);
    tl.add(snd(cardSounds.creak), 1.35);
    tl.to(st, { wob: 1, duration: 0.5, ease: "sine.out" }, 1.3);
    tl.to(st, { wobP: Math.PI * 8, duration: 1.9, ease: "none" }, 1.3);
    tl.to(st, { crack: 1, duration: 0.7 }, 1.4);
    tl.to(st, { creak: 1, duration: 0.3 }, 1.4);
    tl.add(() => { st.flakes = 1; st.flakeT = 0; }, 1.6);
    tl.to(st, { flakeT: 1, duration: 1.3, ease: "power1.in" }, 1.6);
    tl.add(snd(cardSounds.creak), 2.25);
    tl.add(snd(cardSounds.drip), 1.6);
    tl.add(() => f.gazeTo(-6, -14, 0.5), 2.3);
    tl.add(snd(cardSounds.snap), 2.85);
    tl.to(st, { bsnap: 1, duration: 0.12, ease: "power2.out" }, 2.85);
    // 3. it breaks; the floor splits; the cloud shrinks and leaves; she laughs
    tl.add(snd(cardSounds.crash), 3.2);
    tl.add(() => { st.broken = true; st.wob = 0; st.creak = 0; st.flakes = 0; render(); }, 3.2);
    tl.add(() => { void f.to("laugh", 0.3); f.gazeTo(6, -6, 0.3); }, 3.25);
    tl.add(snd(cardSounds.boom), 3.3);
    tl.to(st, { fig: 1, duration: 0.6, ease: "back.out(2.4)" }, 3.3);
    tl.fromTo(st, { ring: 0 }, { ring: 1, duration: 0.75, ease: "power2.out" }, 3.3);
    tl.to(st.T, { y: -90, r: 14, duration: 0.45, ease: "power2.out" }, 3.2);
    tl.to(st.T, { y: 60, r: 30, o: 0, duration: 0.6, ease: "power2.in" }, 3.65);
    tl.to(st.L, { x: -80, y: 30, r: -22, duration: 0.4, ease: "power2.out" }, 3.2);
    tl.to(st.L, { x: -110, y: 170, r: -40, o: 0, duration: 0.6, ease: "power2.in" }, 3.6);
    tl.to(st.R, { x: 84, y: 30, r: 20, duration: 0.4, ease: "power2.out" }, 3.2);
    tl.to(st.R, { x: 110, y: 170, r: 38, o: 0, duration: 0.6, ease: "power2.in" }, 3.6);
    tl.to(st.B, { y: 24, o: 0, duration: 0.7, ease: "power2.in" }, 3.3);
    tl.to(st.fL, { x: -34, y: 26, r: -9, o: 0, duration: 0.9, ease: "power2.in" }, 3.25);
    tl.to(st.fR, { x: 34, y: 26, r: 9, o: 0, duration: 0.9, ease: "power2.in" }, 3.25);
    tl.to(st, { pop: 1, duration: 0.7, ease: "power1.out" }, 3.2);
    tl.to(st.rain, { o: 0, duration: 0.35 }, 3.25);
    tl.to(st.cloud, { x: -120, y: -420, s: 0.5, o: 0, duration: 1.3, ease: "power2.in" }, 3.3);
    // 4. the sun comes out, white clouds float in, she smiles
    tl.add(snd(cardSounds.chime, 1), 3.75);
    tl.set(st.sun, { o: 1 }, 3.75);
    tl.to(st.sun, { s: 1, duration: 0.9, ease: "back.out(1.6)" }, 3.75);
    WC.forEach((_, i) => {
      const t0 = 4.0 + i * 0.22;
      tl.to(st.w[i], { dx: 0, o: 1, duration: 1.1, ease: "power2.out" }, t0);
      tl.to(st.spark, { [i]: 1, duration: 0.4 }, t0 + 0.4);
    });
    tl.add(snd(cardSounds.sparkle), 4.3);
    tl.add(snd(cardSounds.twinkle), 4.9);
    tl.add(() => { void f.to("warm", 0.5); f.gazeTo(10, -8, 0.6); }, 4.9);
    tl.add(snd(cardSounds.warm), 5.0);

    let ambient: gsap.core.Animation[] = [];
    const startAmbient = () => {
      ambient.forEach((a) => a.kill());
      ambient = [
        gsap.to(st, { drift: Math.PI * 2 * 3, duration: 36, ease: "none", repeat: -1, onUpdate: render }),
        gsap.to(st.sun, { rot: 360, duration: 60, ease: "none", repeat: -1 }),
        gsap.to(st.sun, { pulse: Math.PI * 2, duration: 4.5, ease: "none", repeat: -1 }),
      ];
    };
    tl.eventCallback("onComplete", () => { if (!reduced) startAmbient(); });

    initial();
    render();
    api.current = {
      start() {
        if (reduced || tl.isActive()) return;
        silent = false;
        ambient.forEach((a) => a.kill());
        ambient = [];
        initial();
        startRain();
        void f.to("thinking", 0.01);
        f.gazeTo(-4, 10, 0.01);
        render();
        tl.play(0);
      },
    };
    if (reduced) {
      silent = true;
      finished();
      void f.to("warm", 0.01);
      f.gazeTo(10, -8, 0.01);
      render();
    } else {
      void f.to("thinking", 0.01);
      f.gazeTo(-4, 10, 0.01);
      startRain();
      if (hover.current) api.current.start();
    }
    return () => {
      api.current = null;
      rainTween?.kill();
      ambient.forEach((a) => a.kill());
      tl.kill();
      idleBlink?.stop();
      if (blobEl) { blobEl.style.transform = ""; blobEl.style.transformOrigin = ""; }
    };
  }, [rig]);

  return (
    <span ref={wrap} className={`interview-art ${className}`} role={alt ? "img" : undefined} aria-label={alt || undefined}>
      {rig ? <RigFace ref={face} rig={rig} initial="thinking" cut={CUT} underlay={under} overlay={over} /> : <Image src="/avatars/curly.svg" width={288} height={288} className="avatar" alt="" draggable={false} unoptimized />}
    </span>
  );
}
