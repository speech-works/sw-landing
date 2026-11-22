"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { cardSounds } from "@/lib/card-sounds";
import { panicOver, panicUnder, panicWindow } from "@/lib/panic-scene.generated";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";

// The Panic Button program page (Before a difficult conversation): the beanie boy with a big arched window behind him, a wide desk and a big red calm button.
// By itself 1 s after the page loaded (hovering plays it again), about 6.5 s:
// 1. a thick tangle of worry (thin black loops with colour patches) wraps around his head; his face is tense, he looks up at it;
// 2. he presses the big red button (click, calm rings); the tangle loosens;
// 3. the plant, the window and the mug light up one at a time and he looks at each (a bell note each); the tangle shrinks and fades;
// 4. a big calm cloud drifts through the window, a checklist pops out of the button and its two ticks pop in; he breathes out and smiles.
// Quiet things after that: the clouds drift, the mug steams. Reduced motion: the finished scene, nothing moves, no sound.

const CUT = avatarBlobs.beanie.d;

export function PanicWindow() {
  const html = useMemo(() => ({ __html: panicWindow }), []);
  return <svg className="panic-window" viewBox="0 0 320 310" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={html} />;
}

export default function PanicAvatar({ className = "", alt = "" }: { className?: string; alt?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const face = useRef<RigFaceHandle>(null);
  const [rig, setRig] = useState<MailmanRig | null>(null);
  const hover = useRef(false);
  const api = useRef<{ start: () => void } | null>(null);
  const under = useMemo(() => <g dangerouslySetInnerHTML={{ __html: panicUnder }} />, []);
  const over = useMemo(() => <g dangerouslySetInnerHTML={{ __html: panicOver }} />, []);

  useEffect(() => {
    let alive = true;
    const go = () => import("@/lib/card-rigs/beanie.generated").then((m) => { if (alive) setRig(m.beanieRig); });
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
    const q = (id: string) => (root.parentElement as HTMLElement).querySelector<SVGGraphicsElement>(`#${id}`)!;
    const el = {
      win: q("pb-window"), glow: q("pb-wglow"), c1: q("pb-c1"), c2: q("pb-c2"), cb: q("pb-cb"),
      tb: q("pb-tb"), tf: q("pb-tf"), desk: q("pb-desk"), btn: q("pb-btn"), dome: q("pb-dome"), rip: q("pb-rip"),
      plant: q("pb-plant"), mug: q("pb-mug"), gp: q("pb-gp"), gm: q("pb-gm"), steam: q("pb-steam"),
      list: q("pb-list"), b1t: q("pb-b1t"), b2t: q("pb-b2t"), s1: q("pb-s1"), s2: q("pb-s2"), s3: q("pb-s3"),
    };
    const tangle = [el.tb.firstElementChild as SVGGraphicsElement, el.tf.firstElementChild as SVGGraphicsElement];
    const idleBlink = reduced ? null : f.idle();
    let silent = false;
    const snd = <A extends unknown[]>(fn: (...a: A) => void, ...a: A) => () => { if (!silent) fn(...a); };
    const T = { s: 1, o: 1, r: 0 };   // the tangle: scale, opacity, turn
    const drawT = () => {
      tangle.forEach((g) => { g.setAttribute("transform", `translate(160 ${(86 - (1 - T.s) * 120).toFixed(1)}) scale(${T.s.toFixed(3)}) rotate(${T.r.toFixed(2)})`); });
      el.tb.setAttribute("opacity", String(T.o));
      el.tf.setAttribute("opacity", String(T.o));
    };

    const reset = () => {
      T.s = 1; T.o = 1; T.r = 0; drawT();
      gsap.set(el.win, { autoAlpha: 0, y: 24 });
      gsap.set(el.glow, { opacity: 0 });
      gsap.set(el.cb, { opacity: 0, x: -140 });
      gsap.set(el.desk, { y: 110, autoAlpha: 0 });
      gsap.set([el.plant, el.mug, el.btn], { autoAlpha: 0 });
      gsap.set(el.dome, { y: 0 });
      gsap.set(el.rip, { opacity: 0 });
      gsap.set([el.gp, el.gm], { opacity: 0 });
      gsap.set(el.list, { autoAlpha: 0, scale: 0.2, y: 30, svgOrigin: "296 200" });
      gsap.set([el.b1t, el.b2t], { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" });
      gsap.set([el.s1, el.s2, el.s3], { opacity: 0 });
    };
    reset();

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" }, onUpdate: drawT });
    // 1. the room appears, the tangle of worry sits around his head
    tl.add(snd(cardSounds.pop), 0.02);
    tl.to(el.win, { autoAlpha: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" }, 0);
    tl.add(snd(cardSounds.thud), 0.55);
    tl.to(el.desk, { autoAlpha: 1, y: 0, duration: 0.55, ease: "back.out(1.3)" }, 0.15);
    tl.to([el.plant, el.mug], { autoAlpha: 1, duration: 0.3, stagger: 0.1 }, 0.6);
    tl.add(snd(cardSounds.pop), 0.8);
    tl.to(el.btn, { autoAlpha: 1, duration: 0.3 }, 0.8);
    tl.add(() => { void f.to("listening", 0.4); f.gazeTo(-6, -13, 0.4); }, 0.3);
    tl.add(snd(cardSounds.hum), 0.5);
    tl.fromTo(T, { s: 0.7 }, { s: 1, duration: 0.7, ease: "back.out(1.6)" }, 0.2);
    tl.fromTo(T, { r: -3 }, { r: 3, duration: 0.2, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.9);
    tl.add(() => f.gazeTo(10, -12, 0.3), 1.3);
    // 2. he presses the button; the tangle loosens
    tl.add(() => f.gazeTo(0, 8, 0.3), 1.9);
    tl.add(snd(cardSounds.clunk), 2.1);
    tl.to(el.dome, { y: 14, duration: 0.12, ease: "power2.in" }, 2.1);
    tl.to(el.dome, { y: 0, duration: 0.35, ease: "back.out(2.4)" }, 2.25);
    tl.fromTo(el.rip, { opacity: 0, scale: 0.7, svgOrigin: "160 250" }, { opacity: 1, scale: 1.12, duration: 0.3 }, 2.12);
    tl.to(el.rip, { opacity: 0, duration: 0.4 }, 2.5);
    tl.to(T, { s: 0.82, r: 0, duration: 0.7 }, 2.2);
    tl.add(() => { void f.to("curious", 0.4); }, 2.3);
    // 3. the plant, the window and the mug light up, one by one
    tl.add(snd(cardSounds.bell, 0), 2.85);
    tl.add(() => f.gazeTo(-14, 8, 0.3), 2.8);
    tl.to(el.gp, { opacity: 1, duration: 0.3 }, 2.85);
    tl.to(el.gp, { opacity: 0, duration: 0.4 }, 3.4);
    tl.add(snd(cardSounds.bell, 1), 3.4);
    tl.add(() => f.gazeTo(8, -14, 0.3), 3.35);
    tl.to(el.glow, { opacity: 1, duration: 0.35 }, 3.4);
    tl.to(el.glow, { opacity: 0, duration: 0.4 }, 3.95);
    tl.add(snd(cardSounds.bell, 2), 3.95);
    tl.add(() => f.gazeTo(14, 8, 0.3), 3.9);
    tl.to(el.gm, { opacity: 1, duration: 0.3 }, 3.95);
    tl.to(el.gm, { opacity: 0, duration: 0.4 }, 4.5);
    tl.to(T, { s: 0.38, o: 0.8, duration: 1.3, ease: "power1.inOut" }, 2.9);
    tl.add(snd(cardSounds.zoom), 4.1);
    tl.to(T, { s: 0.2, o: 0, duration: 0.5, ease: "power1.in" }, 4.2);
    // 4. calm: a big cloud drifts in, the checklist pops out, two ticks
    tl.add(() => { void f.to("warm", 0.5); f.gazeTo(0, -4, 0.5); }, 4.5);
    tl.to(el.cb, { opacity: 1, x: 0, duration: 1.4, ease: "power1.out" }, 4.4);
    tl.add(snd(cardSounds.pop), 4.8);
    tl.to(el.list, { autoAlpha: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.8)" }, 4.8);
    tl.add(snd(cardSounds.ding), 5.4);
    tl.to(el.b1t, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 5.4);
    tl.add(snd(cardSounds.ding), 5.8);
    tl.to(el.b2t, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 5.8);
    tl.add(snd(cardSounds.sparkle), 6.0);
    tl.to([el.s1, el.s2, el.s3], { opacity: 1, duration: 0.3, stagger: 0.12 }, 6.0);
    tl.add(() => { void f.to("smile", 0.5); f.gazeTo(0, 0, 0.5); }, 6.2);

    let ambient: gsap.core.Animation[] = [];
    const startAmbient = () => {
      ambient.forEach((a) => a.kill());
      ambient = [
        gsap.to(el.c1, { x: 26, duration: 7, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        gsap.to(el.c2, { x: -22, duration: 6, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        gsap.to(el.cb, { x: 10, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        gsap.to(el.steam, { y: -4, opacity: 0.3, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1 }),
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
      {rig ? <RigFace ref={face} rig={rig} initial="calm" cut={CUT} underlay={under} overlay={over} /> : <Image src="/avatars/beanie.svg" width={288} height={288} className="avatar" alt="" draggable={false} unoptimized />}
    </span>
  );
}
