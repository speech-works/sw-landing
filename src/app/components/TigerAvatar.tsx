"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { cardSounds, preloadSamples } from "@/lib/card-sounds";
import { tigerOver, tigerUnder } from "@/lib/tiger-scene.generated";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";

// The Panic Button program page (Before a difficult conversation): panic is a big, round, roaring tiger. The beanie boy leans away, worried.
// A glossy red button pops up inside his colour shape and presses itself (nobody touches it): a soft ring spreads out and the tiger shrinks in a puff
// into a small round kitten that meows softly. He breathes out and smiles.
// By itself 1 s after the page loaded (hovering plays it again), about 5.5 s. Then the kitten bobs gently. Reduced motion: the finished scene, nothing moves, no sound.
// The art comes from the storyboard script (see scripts/build-tiger-scene.cjs).

const CUT = avatarBlobs.beanie.d;
// A really scared face (from the founder's picture of a frightened face): worried brows (inner ends high), wide eyes (the curious face), and a wide, wobbly open mouth.
const CUSTOM = {
  scared: {
    from: "curious",
    brow: [341.2, 486, 380, 456, 424.5, 426, 658.8, 486, 620, 456, 575.5, 426],
    mouth: [446, 746, 444, 722, 470, 704, 500, 710, 532, 714, 556, 722, 554, 744, 553, 756, 528, 758, 500, 752, 472, 758, 447, 756],
    sw: 0,
  },
};

export default function TigerAvatar({ className = "", alt = "" }: { className?: string; alt?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const face = useRef<RigFaceHandle>(null);
  const [rig, setRig] = useState<MailmanRig | null>(null);
  const hover = useRef(false);
  const api = useRef<{ start: () => void } | null>(null);
  const under = useMemo(() => <g dangerouslySetInnerHTML={{ __html: tigerUnder }} />, []);
  const over = useMemo(() => <g dangerouslySetInnerHTML={{ __html: tigerOver }} />, []);

  useEffect(() => {
    let alive = true;
    preloadSamples();
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
    const q = (id: string) => root.querySelector<SVGGraphicsElement>(`#${id}`)!;
    const el = {
      ring: q("tg-ring"), big: q("tg-big"), drop: q("tg-drop"), small: q("tg-small"), poof: q("tg-poof"), b0: q("tg-btn0"), b1: q("tg-btn1"),
      kit: q("tg-kit"), breath: q("tg-breath"), s1: q("tg-s1"), s2: q("tg-s2"), s3: q("tg-s3"),
    };
    let blinker: { stop: () => void } | null = reduced ? null : f.idle();
    let silent = false;
    const snd = <A extends unknown[]>(fn: (...a: A) => void, ...a: A) => () => { if (!silent) fn(...a); };
    const BASE = { x: 298, y: 274 };     // the button's foot
    const KIT = { x: -62, y: 346 };      // the kitten's foot
    const GROUND = { x: -84, y: 346 };   // where the tiger stands

    const reset = () => {
      gsap.set([el.ring, el.big, el.drop, el.small, el.poof, el.b0, el.b1, el.kit, el.breath, el.s1, el.s2, el.s3], { opacity: 0 });
      gsap.set(el.big, { x: 0, y: 0, scale: 1, svgOrigin: `${GROUND.x} ${GROUND.y}` });
      gsap.set(el.small, { scale: 1, svgOrigin: `${GROUND.x} ${GROUND.y}` });
      gsap.set(el.poof, { scale: 0.3, svgOrigin: "-44 260" });
      gsap.set(el.ring, { scale: 0.4, svgOrigin: `${BASE.x} ${BASE.y - 68}` });
      gsap.set(el.b0, { scale: 0.2, svgOrigin: `${BASE.x} ${BASE.y}` });
      gsap.set(el.b1, { scale: 1, svgOrigin: `${BASE.x} ${BASE.y}` });
      gsap.set(el.kit, { scale: 0, y: 0, svgOrigin: `${KIT.x} ${KIT.y}` });
      gsap.set(el.breath, { x: 0 });
    };
    reset();

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
    // 1. the tiger roars, he leans away, wide-eyed
    tl.add(() => { blinker?.stop(); blinker = null; void f.to("scared", 0.22); f.gazeTo(-14, 2, 0.22); }, 0.05);
    tl.add(snd(cardSounds.growl), 0.1);
    tl.to(el.big, { opacity: 1, duration: 0.25 }, 0.1);
    tl.fromTo(el.big, { x: -50, scale: 0.85 }, { x: 0, scale: 1, duration: 0.5, ease: "back.out(1.6)", immediateRender: false }, 0.1);
    tl.to(el.big, { x: 3, duration: 0.05, repeat: 17, yoyo: true, ease: "sine.inOut" }, 0.7);
    tl.to(el.drop, { opacity: 1, duration: 0.2 }, 0.9);
    tl.to(el.drop, { opacity: 0, duration: 0.3 }, 3.2);
    // 2. the red button pops up inside the blob, he looks at it
    tl.add(() => { f.gazeTo(13, 9, 0.3); }, 1.7);
    tl.add(snd(cardSounds.pop), 1.8);
    tl.to(el.b0, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.6)" }, 1.8);
    // it wobbles, asking to be pressed
    tl.to(el.b0, { scale: 1.07, duration: 0.14, yoyo: true, repeat: 3, ease: "sine.inOut" }, 2.28);
    // 3. it presses itself: click, ring; the tiger shrinks in a puff
    tl.add(snd(cardSounds.clunk), 2.7);
    tl.set(el.b0, { opacity: 0 }, 2.7);
    tl.set(el.b1, { opacity: 1 }, 2.7);
    tl.fromTo(el.ring, { opacity: 0.95, scale: 0.4 }, { opacity: 0, scale: 1.25, duration: 0.9, ease: "power1.out", immediateRender: false }, 2.7);
    tl.to(el.big, { scale: 0.5, duration: 0.35, ease: "power2.in" }, 3.0);
    tl.to(el.big, { opacity: 0, duration: 0.2 }, 3.15);
    tl.fromTo(el.small, { opacity: 0 }, { opacity: 1, duration: 0.2, immediateRender: false }, 3.1);
    tl.add(() => { void f.to("listening", 0.3); if (!reduced && !blinker) blinker = f.idle(); }, 3.0);
    tl.add(snd(cardSounds.poof), 3.4);
    tl.fromTo(el.poof, { opacity: 1, scale: 0.3 }, { scale: 1.1, duration: 0.3, immediateRender: false }, 3.4);
    tl.to(el.small, { opacity: 0, duration: 0.15 }, 3.5);
    tl.to(el.poof, { opacity: 0, duration: 0.35 }, 3.7);
    tl.to([el.s1, el.s2, el.s3], { opacity: 1, duration: 0.2, stagger: 0.08 }, 3.45);
    tl.to([el.s1, el.s2, el.s3], { opacity: 0, duration: 0.4 }, 4.1);
    tl.set(el.b1, { opacity: 0 }, 3.6);
    tl.set(el.b0, { opacity: 1, scale: 1 }, 3.6);
    // 4. only a kitten: it meows softly, he breathes out and smiles
    tl.to(el.kit, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2.2)" }, 3.75);
    tl.add(snd(cardSounds.meow), 4.3);
    tl.add(() => { void f.to("smile", 0.5); f.gazeTo(-15, 13, 0.4); }, 3.85);
    tl.to(el.breath, { opacity: 1, duration: 0.3 }, 4.5);
    tl.to(el.breath, { x: -12, opacity: 0, duration: 0.9, ease: "power1.out" }, 4.85);
    tl.add(snd(cardSounds.warm), 4.7);

    let ambient: gsap.core.Animation[] = [];
    const startAmbient = () => {
      ambient.forEach((a) => a.kill());
      ambient = [gsap.to(el.kit, { y: -2.5, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1 })];
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
      f.gazeTo(-15, 13, 0.01);
    } else if (hover.current) api.current.start();
    return () => {
      api.current = null;
      ambient.forEach((a) => a.kill());
      tl.kill();
      blinker?.stop();
    };
  }, [rig]);

  return (
    <span ref={wrap} className={`interview-art ${className}`} role={alt ? "img" : undefined} aria-label={alt || undefined}>
      {rig ? <RigFace ref={face} rig={rig} initial="calm" custom={CUSTOM} cut={CUT} underlay={under} overlay={over} /> : <Image src="/avatars/beanie.svg" width={288} height={288} className="avatar" alt="" draggable={false} unoptimized />}
    </span>
  );
}
