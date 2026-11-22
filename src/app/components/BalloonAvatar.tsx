"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { cardSounds } from "@/lib/card-sounds";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";

// The Talking about your stutter page: the hijab woman with three big balloons (magenta, yellow, red), drawn like the founder's picture (crayon colour, darker where they overlap,
// small knots, thin pencil strings). The strings come down in front of her and meet at her chest, so it looks as if she holds them (no hand).
// By itself 1 s after the page loaded (hovering plays it again), about 6 s:
// 1. the three balloons rise and bounce into place, one after another;
// 2. she is in doubt: her face goes curious and her eyes go from balloon to balloon; then she is thinking (kit face, eyes up);
// 3. she smirks (kit face "proud"), lets the yellow one go: it floats up and away, and pops into small hearts and sparkles that drift down. The other two stay.
// Then quiet things: the two balloons sway, a small heart drifts down now and then. Reduced motion: the finished picture (two balloons, no sound, nothing moves).

const CUT = avatarBlobs.hijab.d;
const G = { x: 160, y: 300 };   // the strings run down in front of her to here, below the bottom of the blob; the blob cut hides their ends
const ANCH: Record<string, number> = { m: -9, y: 0, r: 9 };
const START = { x: 30, y: 60 };   // behind her head   // where the strings meet, at her chest
const FINAL = { y: { x: -22, y: -46, r: 68 }, m: { x: 2, y: -134, r: 74 }, r: { x: 76, y: -92, r: 78 } };   // one bunch, to her left, like the picture
type Key = "y" | "m" | "r";
const COL: Record<Key, string> = { m: "#8B5CF6", r: "#2F6FED", y: "#12B5A6" };
const KNOT: Record<Key, string> = { m: "#5B36C4", r: "#1B4DB5", y: "#0B7F75" };


const ball = (k: Key) => `<g id="bl-${k}"><circle r="${FINAL[k].r}" fill="${COL[k]}" filter="url(#bl-crayon)" style="mix-blend-mode:multiply"/><path d="M0 ${FINAL[k].r - 2}L-9 ${FINAL[k].r + 13}L9 ${FINAL[k].r + 13}Z" fill="${KNOT[k]}"/></g>`;
const str = (k: Key) => `<path id="bl-s${k}" d="" fill="none" stroke="#17161B" stroke-width="1.5" stroke-linecap="round"/><path id="bl-t${k}" d="" fill="none" stroke="none"/>`;
const heart = (i: number) => `<path id="bl-h${i}" opacity="0" d="M0 7C-12 -1 -9 -12 -3 -10Q0 -9 0 -5Q0 -9 3 -10C9 -12 12 -1 0 7Z" fill="${["#E8573F", "#FF8FB0", "#FFC21A"][i % 3]}" stroke="#242329" stroke-width="2.4" stroke-linejoin="round"/>`;
const spark = (i: number) => `<path id="bl-p${i}" opacity="0" d="M0 -9Q0 0 9 0Q0 0 0 9Q0 0 -9 0Q0 0 0 -9Z" fill="#FFD84D" stroke="#242329" stroke-width="3" stroke-linejoin="round"/>`;
// the balloons are drawn BEHIND her (they rise from behind her head); the strings, the grip, the hearts and sparkles are drawn in FRONT of her
const markupUnder = () =>
  `<defs><clipPath id="bl-cut"><path d="${CUT}"/><rect x="-400" y="-600" width="1100" height="750"/></clipPath><filter id="bl-crayon" x="-6%" y="-6%" width="112%" height="112%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="4" result="w"/><feDisplacementMap in="SourceGraphic" in2="w" scale="6" result="d"/><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="9" result="g"/><feColorMatrix in="g" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -0.7 1.3" result="ga"/><feComposite in="d" in2="ga" operator="in"/></filter></defs>` +
  `<g style="isolation:isolate">${ball("y")}${ball("m")}${ball("r")}</g>`;
const markupOver = () =>
  `<g clip-path="url(#bl-cut)">${str("m")}${str("r")}</g><g id="bl-gy" clip-path="url(#bl-cut)">${str("y")}</g><g id="bl-grip" opacity="0"/>` +
  Array.from({ length: 10 }, (_, i) => heart(i)).join("") + Array.from({ length: 3 }, (_, i) => spark(i)).join("");

export default function BalloonAvatar({ className = "", alt = "" }: { className?: string; alt?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const face = useRef<RigFaceHandle>(null);
  const [rig, setRig] = useState<MailmanRig | null>(null);
  const hover = useRef(false);
  const api = useRef<{ start: () => void } | null>(null);
  const under = useMemo(() => <g dangerouslySetInnerHTML={{ __html: markupUnder() }} />, []);
  const over = useMemo(() => <g dangerouslySetInnerHTML={{ __html: markupOver() }} />, []);

  useEffect(() => {
    let alive = true;
    const go = () => import("@/lib/card-rigs/hijab.generated").then((m) => { if (alive) setRig(m.hijabRig); });
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
    const keys: Key[] = ["y", "m", "r"];
    const ballEl = Object.fromEntries(keys.map((k) => [k, q(`bl-${k}`)])) as Record<Key, SVGElement>;
    const strEl = Object.fromEntries(keys.map((k) => [k, q(`bl-s${k}`)])) as Record<Key, SVGElement>;
    const strIn = Object.fromEntries(keys.map((k) => [k, q(`bl-t${k}`)])) as Record<Key, SVGElement>;
    const hearts = Array.from({ length: 10 }, (_, i) => q(`bl-h${i}`)), sparks = Array.from({ length: 3 }, (_, i) => q(`bl-p${i}`));
    const grip = q("bl-grip"), gy = q("bl-gy");
    const idleBlink = reduced ? null : f.idle();
    let silent = false;
    const snd = <A extends unknown[]>(fn: (...a: A) => void, ...a: A) => () => { if (!silent) fn(...a); };

    // the picture is drawn from plain numbers (state), so the strings always follow the knots
    const st = {
      y: { x: START.x, y: START.y, s: 0.1, r: 0, o: 0 }, m: { x: START.x, y: START.y, s: 0.1, r: 0, o: 0 }, r: { x: START.x, y: START.y, s: 0.1, r: 0, o: 0 },
      released: false, free: { dx: 0 }, burst: 0, grip: 0, sway: 0, tw: 0, twp: 0, pull: 0,
    };
    const HEART = Array.from({ length: 10 }, (_, i) => { const a = (-160 + i * 36) * Math.PI / 180; return { dx: Math.cos(a) * (48 + (i % 3) * 22), dy: Math.sin(a) * (40 + (i % 2) * 24), s: 1.2 + (i % 3) * 0.4, r: (i * 37) % 40 - 20 }; });
    const render = () => {
      keys.forEach((k) => {
        const b = st[k], R = FINAL[k].r;
        const sw = k === "y" && !st.released ? 0 : 0;
        ballEl[k].setAttribute("transform", `translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) rotate(${b.r.toFixed(1)}) scale(${b.s.toFixed(3)})`);
        ballEl[k].setAttribute("opacity", String(b.o));
        const kx = b.x - Math.sin((b.r * Math.PI) / 180) * (R + 13) * b.s + sw, ky = b.y + Math.cos((b.r * Math.PI) / 180) * (R + 13) * b.s;
        let d: string;
        if (k === "y" && st.released) {
          // the whole string goes up with the balloon: a long tail (as long as the string was) that waves behind it
          const L = 300, n = 16, pts: string[] = [];
          for (let i = 0; i <= n; i++) {
            const u = i / n;
            pts.push(`${(kx + (10 + 22 * u) * u * Math.sin(u * 5 - st.twp * 0.5 + 1) + 40 * u * u).toFixed(1)} ${(ky + L * u).toFixed(1)}`);
          }
          d = "M" + pts.join("L");
        }
        else {
          // the string runs taut and almost straight down from the knot, with a little slack that moves, and leaves through the bottom of the blob (the blob cut hides its end)
          const ex = 70, ey = 330;   // the meeting point (her hand), below the blob, so it is hidden
          const sl = (2 + 1.6 * Math.sin(st.sway + (k === "m" ? 1 : k === "r" ? 2 : 0))) * (k === "y" && st.pull > 0 ? 0.2 : 1) + 9 * st.tw * Math.sin(st.twp + (k === "m" ? 0.8 : k === "r" ? 1.6 : 0)) * (k === "y" ? 0.6 : 1);
          d = `M${kx.toFixed(1)} ${ky.toFixed(1)}Q${(kx + (ex - kx) * 0.3 + sl).toFixed(1)} ${(ky + (ey - ky) * 0.5).toFixed(1)} ${ex} ${ey}`;
        }
        strEl[k].setAttribute("d", d);
        strIn[k].setAttribute("d", d);
        strEl[k].setAttribute("opacity", String(Math.min(1, b.o * 1.2)));
        strIn[k].setAttribute("opacity", String(Math.min(1, b.o * 1.2)));
      });
      grip.setAttribute("opacity", String(st.grip));
      const bx = st.y.x, by = st.y.y;
      hearts.forEach((h, i) => {
        const p = HEART[i], t = st.burst, a = t > 0 && t < 1;
        h.setAttribute("opacity", a ? String(Math.max(0, 1 - t * t)) : "0");
        h.setAttribute("transform", `translate(${(bx + p.dx * Math.min(1, t * 1.6)).toFixed(1)} ${(by + p.dy * Math.min(1, t * 1.6) + 70 * t * t).toFixed(1)}) rotate(${p.r}) scale(${(p.s * (0.6 + t * 0.6)).toFixed(2)})`);
      });
      sparks.forEach((s, i) => {
        const t = st.burst, a = t > 0 && t < 0.7, ang = (i * 120 - 30) * Math.PI / 180;
        s.setAttribute("opacity", a ? String(1 - t / 0.7) : "0");
        s.setAttribute("transform", `translate(${(bx + Math.cos(ang) * 52 * t).toFixed(1)} ${(by + Math.sin(ang) * 52 * t).toFixed(1)}) scale(${(1 + t).toFixed(2)})`);
      });
    };
    const reset = () => {
      keys.forEach((k) => Object.assign(st[k], { x: START.x, y: START.y, s: 0.1, r: 0, o: 0 }));
      gy.setAttribute("clip-path", "url(#bl-cut)");
      Object.assign(st, { released: false, burst: 0, grip: 0, sway: 0, tw: 0, twp: 0, pull: 0 });
      render();
    };
    reset();

    const tl = gsap.timeline({ paused: true, onUpdate: render });
    // 1. the balloons rise and bounce into place
    const order: Key[] = ["y", "m", "r"];
    tl.to(st, { grip: 1, duration: 0.2 }, 0);
    order.forEach((k, i) => {
      const t0 = 0.15 + i * 0.28, F = FINAL[k];
      tl.add(snd(cardSounds.rubber, i), t0);
      tl.to(st[k], { o: 1, duration: 0.1 }, t0);
      tl.to(st[k], { x: F.x, y: F.y, s: 1, duration: 0.9, ease: "back.out(1.5)" }, t0);
    });
    // 2. in doubt, then thinking
    tl.add(() => { void f.to("curious", 0.35); f.gazeTo(-12, -13, 0.35); }, 1.35);
    tl.add(snd(cardSounds.hmm), 1.45);
    tl.add(() => f.gazeTo(13, -12, 0.4), 1.9);
    tl.add(() => f.gazeTo(-4, -14, 0.35), 2.35);
    tl.to(st.y, { r: -4, duration: 0.5, yoyo: true, repeat: 1, ease: "sine.inOut" }, 1.9);
    tl.add(() => { void f.to("thinking", 0.45); f.gazeTo(-8, -14, 0.45); }, 2.7);
    tl.add(snd(cardSounds.hmm), 2.8);
    // 3. a smirk; she pulls the teal balloon down, the string goes tight, she lets go: it shoots up and the strings twang
    tl.add(() => { void f.to("proud", 0.4); f.gazeTo(-12, -12, 0.3); }, 3.8);
    tl.add(snd(cardSounds.tok, 1), 3.85);
    tl.add(snd(cardSounds.stretch), 4.0);
    tl.to(st, { pull: 1, duration: 0.1 }, 4.0);
    tl.to(st.y, { y: FINAL.y.y + 30, s: 1.0, duration: 0.5, ease: "power2.out" }, 4.0);
    tl.to(st.m, { y: FINAL.m.y + 8, duration: 0.5, ease: "power2.out" }, 4.0);
    tl.to(st.r, { y: FINAL.r.y + 8, duration: 0.5, ease: "power2.out" }, 4.0);
    tl.add(() => f.gazeTo(-4, -6, 0.3), 4.2);
    tl.add(() => { st.released = true; st.pull = 0; gy.removeAttribute("clip-path"); }, 4.55);
    tl.add(snd(cardSounds.twang), 4.55);
    tl.add(snd(cardSounds.zoom), 4.6);
    tl.to(st.y, { x: -96, y: -250, r: 18, duration: 1.0, ease: "power3.in" }, 4.55);
    tl.to(st.m, { y: FINAL.m.y, duration: 0.7, ease: "elastic.out(1,0.35)" }, 4.55);
    tl.to(st.r, { y: FINAL.r.y, duration: 0.8, ease: "elastic.out(1,0.35)" }, 4.55);
    tl.fromTo(st, { tw: 1, twp: 0 }, { tw: 0, twp: Math.PI * 14, duration: 1.1, ease: "power1.out" }, 4.55);
    tl.add(() => f.gazeTo(-10, -14, 0.3), 4.7);
    tl.add(snd(cardSounds.burst), 5.62);
    tl.to(st.y, { s: 1.3, o: 0, duration: 0.12, ease: "power2.out" }, 5.62);
    tl.add(snd(cardSounds.sparkle), 5.68);
    tl.to(st, { burst: 1, duration: 1.4, ease: "power1.out" }, 5.65);
    tl.add(snd(cardSounds.warm), 5.95);
    tl.add(() => { void f.to("smile", 0.5); f.gazeTo(0, 0, 0.5); }, 6.0);

    let ambient: gsap.core.Animation[] = [];
    const startAmbient = () => {
      ambient.forEach((a) => a.kill());
      ambient = [
        gsap.to(st, { sway: Math.PI * 2, duration: 5, ease: "none", repeat: -1, onUpdate: render }),
        gsap.to(st.m, { r: 2.5, y: FINAL.m.y - 4, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1, onUpdate: render }),
        gsap.to(st.r, { r: -2.5, y: FINAL.r.y - 4, duration: 3.1, ease: "sine.inOut", yoyo: true, repeat: -1, onUpdate: render }),
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
      {rig ? <RigFace ref={face} rig={rig} initial="calm" cut={CUT} underlay={under} overlay={over} /> : <Image src="/avatars/hijab.svg" width={288} height={288} className="avatar" alt="" draggable={false} unoptimized />}
    </span>
  );
}
