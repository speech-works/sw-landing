"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { cardSounds } from "@/lib/card-sounds";
import { icebergOver } from "@/lib/iceberg-scene";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";

// The Understanding your stutter page: he is the tip of an iceberg (the founder's iceberg picture). Only his face and headphones show above the water line; below it hangs
// a tall dark body. By itself 1 s after the page loaded (hovering plays it again), about 6 s:
// 1. the scene appears: calm, dark body below the water; he looks out;
// 2. he looks down (curious); the water gets lighter, faint outlines show inside the body;
// 3. the founder's doodles light up one by one (heart, sun, rain cloud, moon), a soft bell each, and his eyes follow them;
// 4. sparkles over the water, a warm chord; he smiles.
// Quiet after that: the lights breathe, the ripples drift, a sparkle twinkles. Reduced motion: the finished scene, nothing moves, no sound.

const CUT = avatarBlobs.headphones.d;
const GAZE: [number, number][] = [[-9, 13], [9, 13], [-2, 16], [0, 16]];

export default function IcebergAvatar({ className = "", alt = "" }: { className?: string; alt?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const face = useRef<RigFaceHandle>(null);
  const [rig, setRig] = useState<MailmanRig | null>(null);
  const hover = useRef(false);
  const api = useRef<{ start: () => void } | null>(null);
  const over = useMemo(() => <g dangerouslySetInnerHTML={{ __html: icebergOver }} />, []);

  useEffect(() => {
    let alive = true;
    const go = () => import("@/lib/card-rigs/headphones.generated").then((m) => { if (alive) setRig(m.headphonesRig); });
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
    const scope = root.parentElement as HTMLElement;
    const q = (id: string) => scope.querySelector<SVGGraphicsElement>(`#${id}`)!;
    const all = q("ib-all"), water = q("ib-water"), body = q("ib-body"), facets = q("ib-facets");
    const ripples = [q("ib-w1"), q("ib-w2")];
    const stars = [q("ib-s1"), q("ib-s2"), q("ib-s3")];
    const L = [0, 1, 2, 3].map((i) => ({ g: q(`ib-l${i}`), ring: q(`ib-r${i}`), disc: q(`ib-d${i}`), art: q(`ib-o${i}`) }));
    const idleBlink = reduced ? null : f.idle();
    let silent = false;
    const snd = <A extends unknown[]>(fn: (...a: A) => void, ...a: A) => () => { if (!silent) fn(...a); };

    const light = (i: number, on: boolean, d = 0.35) => {
      gsap.to(L[i].disc, { opacity: on ? 0.96 : 0.1, duration: d });
      gsap.to(L[i].art, { opacity: on ? 1 : 0.3, duration: d });
      gsap.to(L[i].ring, { opacity: on ? 0.22 : 0, duration: d });
    };
    const reset = () => {
      gsap.set(all, { autoAlpha: 0, y: 40 });
      gsap.set(water, { attr: { fill: "#2466C8" } });
      gsap.set(body, { attr: { fill: "#272560" } });
      gsap.set(facets, { opacity: 0.1 });
      gsap.set(stars, { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" });
      L.forEach((l, i) => {
        gsap.set(l.disc, { opacity: 0 }); gsap.set(l.art, { opacity: 0 }); gsap.set(l.ring, { opacity: 0 });
        gsap.set(l.g, { scale: 1, svgOrigin: `${[[82, 352], [250, 352], [166, 444], [166, 556]][i].join(" ")}` });
      });
    };
    reset();

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
    // 1. the scene appears
    tl.add(snd(cardSounds.hum), 0.05);
    tl.add(snd(cardSounds.pop), 0.1);
    tl.to(all, { autoAlpha: 1, y: 0, duration: 0.7, ease: "back.out(1.2)" }, 0.05);
    tl.add(() => { void f.to("calm", 0.3); f.gazeTo(0, -3, 0.3); }, 0.1);
    // 2. he looks down; the water clears, outlines show
    tl.add(snd(cardSounds.sweep), 1.2);
    tl.add(() => { void f.to("curious", 0.5); f.gazeTo(0, 14, 0.5); }, 1.2);
    tl.to(water, { attr: { fill: "#3078DA" }, duration: 1, ease: "power1.inOut" }, 1.2);
    tl.to(body, { attr: { fill: "#2E2D78" }, duration: 1, ease: "power1.inOut" }, 1.2);
    L.forEach((l, i) => {
      tl.to(l.disc, { opacity: 0.1, duration: 0.5 }, 1.6 + i * 0.12);
      tl.to(l.art, { opacity: 0.3, duration: 0.5 }, 1.6 + i * 0.12);
    });
    // 3. the doodles light up, one by one
    L.forEach((l, i) => {
      const t = 2.6 + i * 0.7;
      tl.add(snd(cardSounds.chime, i), t);
      tl.add(() => f.gazeTo(GAZE[i][0], GAZE[i][1], 0.3), t - 0.1);
      tl.add(() => light(i, true), t);
      tl.fromTo(l.g, { scale: 0.88 }, { scale: 1, duration: 0.45, ease: "back.out(2.4)", svgOrigin: `${[[82, 352], [250, 352], [166, 444], [166, 556]][i].join(" ")}` }, t);
    });
    tl.to(water, { attr: { fill: "#3680E0" }, duration: 1.2 }, 3.2);
    tl.to(facets, { opacity: 0.18, duration: 1 }, 3.2);
    // 4. sparkles, a warm chord, a smile
    tl.add(snd(cardSounds.warm), 5.4);
    tl.add(snd(cardSounds.sparkle), 5.55);
    tl.to(stars, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.12, ease: "back.out(3)" }, 5.5);
    tl.add(() => { void f.to("smile", 0.5); f.gazeTo(0, 0, 0.5); }, 5.5);

    let ambient: gsap.core.Animation[] = [];
    const startAmbient = () => {
      ambient.forEach((a) => a.kill());
      ambient = [
        ...L.map((l, i) => gsap.to(l.ring, { opacity: 0.38, duration: 1.8 + i * 0.3, ease: "sine.inOut", yoyo: true, repeat: -1, delay: i * 0.4 })),
        gsap.to(ripples[0], { x: 8, duration: 4, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        gsap.to(ripples[1], { x: -8, duration: 5, ease: "sine.inOut", yoyo: true, repeat: -1 }),
        gsap.to(stars, { opacity: 0.45, duration: 1.4, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: { each: 0.5, repeat: -1, yoyo: true } }),
      ];
    };
    tl.eventCallback("onComplete", () => { if (!reduced) startAmbient(); });

    api.current = {
      start() {
        if (reduced || tl.isActive()) return;
        silent = false;
        ambient.forEach((a) => a.kill());
        ambient = [];
        gsap.killTweensOf([...L.map((l) => l.ring), ...stars, ...ripples]);
        gsap.set(ripples, { x: 0 });
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
      {rig ? <RigFace ref={face} rig={rig} initial="calm" cut={CUT} overlay={over} /> : <Image src="/avatars/headphones.svg" width={288} height={288} className="avatar" alt="" draggable={false} unoptimized />}
    </span>
  );
}
