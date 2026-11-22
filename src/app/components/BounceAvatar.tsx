"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { cardSounds } from "@/lib/card-sounds";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";

// The After a difficult conversation page: the braids woman watches one big glossy black ball (the look of the ball in the founder's video):
// a bright window highlight, a thin rim light, a dark gloss crescent, a soft floor shadow and a squash on every hit. No hands: the ball moves by itself.
// By itself 1 s after the page loaded (hovering plays it again), about 3.5 s: it drops from above on her left and bounces; every bounce lower and shorter (a real
// falling-ball arc): the first rebound carries it high over her head, then it lands on her right and bounces smaller and smaller until it rests. Her eyes follow it, then she smiles.
// Then it breathes a little. Reduced motion: the finished picture (ball resting on her right), no sound, nothing moves.

const CUT = avatarBlobs.braids.d;
const R = 44, FLOOR = 292, CY = FLOOR - R;          // ball radius, floor line, centre height when resting
const X0 = -80;                                       // where it lands first, on her left
const N = 8, D0 = 0.78, H0 = 240;                     // 8 arcs: the first goes high over her head; each next lasts 0.75 as long and is 0.5625 as high (a real bouncing ball)
const DUR = Array.from({ length: N }, (_, k) => D0 * 0.75 ** k);
const H = Array.from({ length: N }, (_, k) => H0 * 0.5625 ** k);
const W = [440, 40, 26, 16, 10, 6, 4, 2];              // how far sideways each arc goes: the first one carries it over her to her right, then it nearly stops
const IMP: number[] = [X0];                           // x of each hit
W.forEach((w) => IMP.push(IMP[IMP.length - 1] + w));
const SQ = [0.28, 0.2, 0.14, 0.1, 0.07, 0.05, 0.035, 0.02, 0.01];
const DROP = H0 / 0.5625, T_FALL = 0.2, T_HIT = 0.75;  // it falls from above (so the first rebound is H0 high)

const markup = () =>
  `<defs><radialGradient id="bb-g" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#3a3a40"/><stop offset=".55" stop-color="#161619"/><stop offset="1" stop-color="#050506"/></radialGradient>` +
  `<radialGradient id="bb-s"><stop offset="0" stop-color="#000" stop-opacity=".75"/><stop offset=".6" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>` +
  `<ellipse id="bb-shadow" rx="64" ry="11" fill="url(#bb-s)" opacity="0"/>` +
  `<g id="bb-ball" opacity="0"><circle r="${R}" fill="url(#bb-g)"/><circle r="${R}" fill="none" stroke="#fff" stroke-opacity=".1" stroke-width="2"/>` +
  `<path d="M${R * 0.72} ${-R * 0.5}A${R * 0.88} ${R * 0.88} 0 0 1 ${R * 0.62} ${R * 0.62}" fill="none" stroke="#fff" stroke-opacity=".28" stroke-width="3" stroke-linecap="round"/>` +
  `<path d="M${-R * 0.5} ${R * 0.46}Q0 ${R * 0.98} ${R * 0.52} ${R * 0.38}Q${R * 0.1} ${R * 0.58} ${-R * 0.5} ${R * 0.46}Z" fill="#000" opacity=".6"/>` +
  `<ellipse cx="${-R * 0.38}" cy="${-R * 0.5}" rx="${R * 0.26}" ry="${R * 0.15}" transform="rotate(-32 ${-R * 0.38} ${-R * 0.5})" fill="#fff" opacity=".85"/>` +
  `<ellipse cx="${-R * 0.62}" cy="${-R * 0.18}" rx="${R * 0.05}" ry="${R * 0.09}" fill="#fff" opacity=".45"/></g>`;

export default function BounceAvatar({ className = "", alt = "" }: { className?: string; alt?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const face = useRef<RigFaceHandle>(null);
  const [rig, setRig] = useState<MailmanRig | null>(null);
  const hover = useRef(false);
  const api = useRef<{ start: () => void } | null>(null);
  const over = useMemo(() => <g dangerouslySetInnerHTML={{ __html: markup() }} />, []);

  useEffect(() => {
    let alive = true;
    const go = () => import("@/lib/card-rigs/braids.generated").then((m) => { if (alive) setRig(m.braidsRig); });
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
    const ball = q("bb-ball"), shadow = q("bb-shadow");
    const idleBlink = reduced ? null : f.idle();
    let silent = false;
    const snd = <A extends unknown[]>(fn: (...a: A) => void, ...a: A) => () => { if (!silent) fn(...a); };

    // the picture is drawn from plain numbers: where the ball is, how squashed it is, which dots are out, how strong they are
    const st = { x: IMP[0], y: CY - DROP, sq: 0, o: 0, breathe: 0 };
    const render = () => {
      const sy = 1 - st.sq, sx = 1 + st.sq * 1.0;
      const cy = st.y + R * st.sq;   // a squashed ball keeps its bottom on the floor
      ball.setAttribute("transform", `translate(${st.x.toFixed(1)} ${cy.toFixed(1)}) scale(${(sx * (1 + st.breathe)).toFixed(3)} ${(sy * (1 - st.breathe)).toFixed(3)})`);
      ball.setAttribute("opacity", String(st.o));
      const height = Math.max(0, Math.min(1, (CY - st.y) / DROP));
      const k = (0.62 + 0.38 * (1 - height)) * (1 + st.sq * 0.9);
      shadow.setAttribute("transform", `translate(${(st.x + 16).toFixed(1)} ${FLOOR + 3}) scale(${k.toFixed(3)})`);
      shadow.setAttribute("opacity", String(st.o * (0.3 + 0.5 * (1 - height))));
    };
    const reset = () => {
      Object.assign(st, { x: IMP[0], y: CY - DROP, sq: 0, o: 0, breathe: 0 });
      render();
    };
    reset();

    const tl = gsap.timeline({ paused: true, onUpdate: render });
    // 1. it drops, her eyes follow it down
    tl.add(() => { void f.to("curious", 0.3); f.gazeTo(-14, -12, 0.2); }, 0);
    tl.to(st, { o: 1, duration: 0.12 }, T_FALL - 0.1);
    tl.to(st, { y: CY, duration: T_HIT - T_FALL, ease: "power2.in" }, T_FALL);
    tl.add(() => f.gazeTo(-16, 8, T_HIT - T_FALL), T_FALL);
    // 2. it keeps bouncing: each hit squashes (and a soft sound), each arc is a falling-ball arc, lower and shorter each time, the ball moves sideways at a steady speed
    let t = T_HIT;
    const hit = (i: number, at: number) => {
      tl.add(snd(cardSounds.bounce, i), at);
      tl.fromTo(st, { sq: SQ[i] }, { sq: 0, duration: 0.12, ease: "power2.out", immediateRender: false }, at);
    };
    hit(0, t);
    const prox = { u: 0 };
    H.forEach((h, a) => {
      const d = DUR[a], x0 = IMP[a], x1 = IMP[a + 1];
      tl.fromTo(prox, { u: 0 }, { u: 1, duration: d, ease: "none", immediateRender: false, onUpdate: () => { st.x = x0 + (x1 - x0) * prox.u; st.y = CY - h * 4 * prox.u * (1 - prox.u); } }, t);
      if (a === 0) { tl.add(() => f.gazeTo(0, -13, d * 0.5), t); tl.add(() => f.gazeTo(14, 6, d * 0.5), t + d * 0.5); }
      t += d;
      hit(a + 1, t);
    });
    // 3. it comes to rest on her right; she looks at it and smiles
    tl.add(() => { void f.to("smile", 0.5); f.gazeTo(12, 4, 0.5); }, t - 0.4);
    tl.add(snd(cardSounds.warm), t + 0.05);
    tl.add(() => f.gazeTo(0, 0, 0.7), t + 1.0);

    let ambient: gsap.core.Animation[] = [];
    const startAmbient = () => {
      ambient.forEach((a) => a.kill());
      ambient = [
        gsap.to(st, { breathe: 0.012, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1, onUpdate: render }),
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
      tl.progress(1).pause();
      void f.to("smile", 0.01);
      render();
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
      {rig ? <RigFace ref={face} rig={rig} initial="calm" cut={CUT} overlay={over} /> : <Image src="/avatars/braids.svg" width={288} height={288} className="avatar" alt="" draggable={false} unoptimized />}
    </span>
  );
}
