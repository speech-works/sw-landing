"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { cardSounds } from "@/lib/card-sounds";
import { datingBack, datingFront, datingCutMan, datingCutWoman } from "@/lib/dating-scene.generated";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";

// The Dating and relationships page: two people at a small pond, each with a paper boat. One shared wavy blob holds both of them, and the pond is its lower part.
// By itself 1 s after the page loaded (hovering plays it again), about 5 s:
// 1. the two boats pop onto the water, one at each side; both people look down at their boat;
// 2. each boat drifts toward the middle at its own pace, with soft bobs, and their eyes follow the boats;
// 3. the hulls touch softly (one ripple), both smile, and a small sparkle shows between the boats.
// Then quiet things: the boats rock, a soft ripple spreads now and then. Reduced motion: the finished scene, nothing moves, no sound.
// The art comes from scripts/build-dating-scene.cjs (the approved storyboard).

const BASE_Y = 334;                              // boats sit on the water here (scene units)
const A_START = 190, A_END = 292, B_START = 502, B_END = 400;   // hull edges touch at x 346
const RING_Y = 330;

export default function DatingAvatar({ className = "", alt = "" }: { className?: string; alt?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const woman = useRef<RigFaceHandle>(null);
  const man = useRef<RigFaceHandle>(null);
  const [rigs, setRigs] = useState<{ w: MailmanRig; m: MailmanRig } | null>(null);
  const hover = useRef(false);
  const api = useRef<{ start: () => void } | null>(null);
  const back = useMemo(() => <g dangerouslySetInnerHTML={{ __html: datingBack }} />, []);
  const front = useMemo(() => <g dangerouslySetInnerHTML={{ __html: datingFront }} />, []);

  useEffect(() => {
    let alive = true;
    const go = () => Promise.all([import("@/lib/card-rigs/flower.generated"), import("@/lib/card-rigs/man.generated")]).then(([a, b]) => { if (alive) setRigs({ w: a.flowerRig, m: b.manRig }); });
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
    const root = wrap.current, fw = woman.current, fm = man.current;
    if (!rigs || !root || !fw || !fm) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const q = (id: string) => root.querySelector<SVGElement>(`#${id}`)!;
    const boatA = q("dt-A"), boatB = q("dt-B"), ra = q("dt-ra"), rb = q("dt-rb"), rc = q("dt-rc"), s1 = q("dt-s1"), s2 = q("dt-s2");
    const blinkW = reduced ? null : fw.idle(), blinkM = reduced ? null : fm.idle();
    let silent = false;
    const snd = <A extends unknown[]>(fn: (...a: A) => void, ...a: A) => () => { if (!silent) fn(...a); };

    // the picture is drawn from plain numbers, so everything follows the boats
    const st = { ax: A_START, bx: B_END + (B_START - B_END), as: 0, bs: 0, phase: 0, nudge: 0, drift: 0, ring: 0, spark: 0, pulse: 0 };
    const render = () => {
      const bobA = Math.sin(st.phase) * 3.2, bobB = Math.sin(st.phase + 1.3) * 3.2;
      const tiltA = Math.sin(st.phase * 0.8) * 2.6 + st.nudge * -3, tiltB = Math.sin(st.phase * 0.8 + 1.1) * -2.6 + st.nudge * 3;
      const ax = st.ax - st.nudge * 5, bx = st.bx + st.nudge * 5;
      boatA.setAttribute("transform", `translate(${ax.toFixed(1)} ${(BASE_Y + bobA).toFixed(1)}) rotate(${tiltA.toFixed(2)}) scale(${st.as.toFixed(3)})`);
      boatB.setAttribute("transform", `translate(${bx.toFixed(1)} ${(BASE_Y + bobB).toFixed(1)}) rotate(${tiltB.toFixed(2)}) scale(${st.bs.toFixed(3)})`);
      // a faint ring under each moving boat
      const pulse = 1 + 0.12 * Math.sin(st.phase * 1.6);
      ra.setAttribute("transform", `translate(${ax.toFixed(1)} ${RING_Y}) scale(${(1.1 * pulse * st.as).toFixed(3)} 1)`);
      rb.setAttribute("transform", `translate(${bx.toFixed(1)} ${RING_Y}) scale(${(1.1 * pulse * st.bs).toFixed(3)} 1)`);
      ra.setAttribute("opacity", String((0.8 * st.drift * st.as).toFixed(3)));
      rb.setAttribute("opacity", String((0.8 * st.drift * st.bs).toFixed(3)));
      // the touch ripple (and the quiet one that comes now and then)
      const r = st.ring, p = st.pulse;
      rc.setAttribute("transform", `translate(346 ${RING_Y}) scale(${(1.4 + r * 2.4).toFixed(3)} ${(1 + r * 0.6).toFixed(3)})`);
      rc.setAttribute("opacity", String(Math.max(0, r > 0 && r < 1 ? 0.95 * (1 - r) : p > 0 && p < 1 ? 0.7 * (1 - p) : 0).toFixed(3)));
      if (p > 0 && p < 1) rc.setAttribute("transform", `translate(346 ${RING_Y}) scale(${(1.4 + p * 2.0).toFixed(3)} ${(1 + p * 0.5).toFixed(3)})`);
      const sp = st.spark, tw = 1 + 0.16 * Math.sin(st.phase * 2.2);
      s1.setAttribute("transform", `translate(346 218) scale(${(sp * tw).toFixed(3)})`);
      s2.setAttribute("transform", `translate(346 168) scale(${(sp * (2 - tw)).toFixed(3)})`);
      s1.setAttribute("opacity", String(Math.min(1, sp * 1.4)));
      s2.setAttribute("opacity", String(Math.min(1, sp * 1.4)));
    };
    const reset = () => {
      Object.assign(st, { ax: A_START, bx: B_START, as: 0, bs: 0, nudge: 0, drift: 0, ring: 0, pulse: 0, spark: 0 });
      render();
    };
    const finish = () => {
      Object.assign(st, { ax: A_END, bx: B_END, as: 1, bs: 1, nudge: 0, drift: 0, ring: 0, pulse: 0, spark: 1 });
      render();
    };
    reset();

    const tl = gsap.timeline({ paused: true, onUpdate: render });
    // 1. two boats pop onto the water; both people look down at their own boat
    tl.add(snd(cardSounds.bloop), 0.15);
    tl.to(st, { as: 1, duration: 0.55, ease: "back.out(1.7)" }, 0.15);
    tl.add(snd(cardSounds.bloop), 0.5);
    tl.to(st, { bs: 1, duration: 0.55, ease: "back.out(1.7)" }, 0.5);
    tl.add(() => { fw.gazeTo(-3, 12, 0.35); fm.gazeTo(3, 12, 0.35); }, 0.35);
    // 2. each boat drifts toward the middle at its own pace; their eyes follow
    tl.to(st, { drift: 1, duration: 0.3 }, 1.15);
    tl.add(() => { fw.gazeTo(10, 8, 0.5); fm.gazeTo(-10, 8, 0.5); }, 1.3);
    tl.add(snd(cardSounds.plink), 1.35);
    tl.to(st, { ax: A_END, duration: 2.3, ease: "sine.inOut" }, 1.3);
    tl.add(snd(cardSounds.plink), 1.75);
    tl.to(st, { bx: B_END, duration: 2.5, ease: "sine.inOut" }, 1.3);
    tl.add(() => { fw.gazeTo(15, 4, 0.8); fm.gazeTo(-15, 4, 0.8); }, 2.6);
    // 3. they touch softly; both smile; a sparkle between the boats
    tl.add(snd(cardSounds.tap), 3.78);
    tl.fromTo(st, { ring: 0 }, { ring: 1, duration: 1.1, ease: "power1.out" }, 3.78);
    tl.to(st, { drift: 0, duration: 0.3 }, 3.7);
    tl.to(st, { nudge: 1, duration: 0.1, ease: "power2.out" }, 3.78);
    tl.to(st, { nudge: 0, duration: 0.7, ease: "elastic.out(1,0.4)" }, 3.88);
    tl.add(() => { void fw.to("laugh", 0.45); void fm.to("smile", 0.45); fw.gazeTo(0, 0, 0.4); fm.gazeTo(-14, 0, 0.4); }, 3.85);
    tl.add(snd(cardSounds.warm), 3.95);
    tl.add(snd(cardSounds.sparkle), 4.1);
    tl.to(st, { spark: 1, duration: 0.5, ease: "back.out(2)" }, 4.05);
    tl.add(() => fm.gazeTo(-6, 2, 0.6), 5.0);

    let ambient: gsap.core.Animation[] = [];
    const startAmbient = () => {
      ambient.forEach((a) => a.kill());
      st.phase = 0;
      ambient = [
        gsap.to(st, { phase: Math.PI * 2, duration: 4.4, ease: "none", repeat: -1, onUpdate: render }),
        gsap.timeline({ repeat: -1, repeatDelay: 1.6, onUpdate: render }).fromTo(st, { pulse: 0 }, { pulse: 1, duration: 1.5, ease: "power1.out" }),
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
        void fw.to("calm", 0.01);
        void fm.to("calm", 0.01);
        fw.gazeTo(0, 0, 0.01);
        fm.gazeTo(0, 0, 0.01);
        tl.play(0);
      },
    };
    if (reduced) {
      silent = true;
      void fw.to("laugh", 0.01);
      void fm.to("smile", 0.01);
      finish();
    } else {
      // before the first play the boats are not there yet; with a hover that came first, play at once
      void fw.to("calm", 0.01);
      void fm.to("calm", 0.01);
      if (hover.current) api.current.start();
    }
    return () => {
      api.current = null;
      ambient.forEach((a) => a.kill());
      tl.kill();
      blinkW?.stop();
      blinkM?.stop();
    };
  }, [rigs]);

  return (
    <span ref={wrap} className={`dating-scene ${className}`} role={alt ? "img" : undefined} aria-label={alt || undefined}>
      <svg className="dating-back" viewBox="-60 -190 820 610" aria-hidden="true" focusable="false">{back}</svg>
      {rigs ? (
        <>
          <RigFace ref={woman} rig={rigs.w} initial="laugh" cut={datingCutWoman} className="dating-fig dating-w" />
          <RigFace ref={man} rig={rigs.m} initial="smile" cut={datingCutMan} className="dating-fig dating-m" />
        </>
      ) : (
        <Image src="/avatars/flower.svg" width={320} height={310} className="dating-fig dating-w" alt="" draggable={false} unoptimized />
      )}
      <svg className="dating-front" viewBox="-60 -190 820 610" aria-hidden="true" focusable="false">{front}</svg>
    </span>
  );
}
