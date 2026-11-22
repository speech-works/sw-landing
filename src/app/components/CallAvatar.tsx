"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { cardSounds } from "@/lib/card-sounds";
import { callOver, callUnder, callWindow } from "@/lib/call-scene.generated";
import type { MailmanRig } from "@/lib/mailman-rig.generated";
import RigFace, { type RigFaceHandle } from "./RigFace";

// The Phone call program page (The Hard Conversations): the cast woman at a call desk. It plays by itself 1 s after the page loaded (hovering it plays it again), about 3.7 s:
// 1. a big window and a wide flat desk slide in (the desk crosses out of the colour blob; the window stays behind the blob);
// 2. the lamp swings up and switches on, the notepad with her plan and the red phone pop up, one at a time;
// 3. the phone rings twice (the handset lifts and shakes, a yellow burst flashes) and she looks at it, curious;
// 4. she answers: the handset rests, she smiles (kit face) and a star pings.
// Then quiet things keep going: the lamp light breathes, a small bird crosses the window now and then. Reduced motion: the finished scene, nothing moves, no sound.
// The body ends on the blob outline (the kit cut), the desk is in front of her; nothing shows the bottom of the avatar.

const CUT = avatarBlobs["phone-call"].d;

/** The big window: it sits under the colour blob (it is drawn before the blob in the avatar box), so the blob hides part of it. */
export function CallWindow() {
  const html = useMemo(() => ({ __html: callWindow }), []);
  return <svg className="call-window" viewBox="0 0 320 310" aria-hidden="true" focusable="false" dangerouslySetInnerHTML={html} />;
}

export default function CallAvatar({ className = "", alt = "" }: { className?: string; alt?: string }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const face = useRef<RigFaceHandle>(null);
  const [rig, setRig] = useState<MailmanRig | null>(null);
  const ready = useRef<(() => void) | null>(null);
  const hover = useRef(false);
  const api = useRef<{ start: () => void } | null>(null);
  const under = useMemo(() => <g dangerouslySetInnerHTML={{ __html: callUnder }} />, []);
  const over = useMemo(() => <g dangerouslySetInnerHTML={{ __html: callOver }} />, []);

  // the face rig loads after the page is ready (it is big); until then the plain picture shows
  useEffect(() => {
    let alive = true;
    const go = () => import("@/lib/card-rigs/call-f.generated").then((m) => { if (alive) setRig(m.callFRig); });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) void go();
    else {
      const idle = (window as unknown as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (idle) idle(() => void go(), { timeout: 600 }); else setTimeout(() => void go(), 200);
    }
    return () => { alive = false; };
  }, []);

  // by itself 1 s after load; hover or focus plays it again
  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const target = root.closest<HTMLElement>(".detail-art") ?? root;
    let timer = window.setTimeout(() => { hover.current = true; api.current?.start(); }, 1000);
    const again = () => { hover.current = true; api.current?.start(); };
    target.addEventListener("pointerenter", again);
    target.addEventListener("focusin", again);
    return () => { window.clearTimeout(timer); timer = 0; target.removeEventListener("pointerenter", again); target.removeEventListener("focusin", again); };
  }, []);

  useEffect(() => {
    const root = wrap.current, f = face.current;
    if (!rig || !root || !f) return;
    const q = (id: string) => root.querySelector<SVGGraphicsElement>(`#${id}`)!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desk = q("cs-desk"), lamp = q("cs-lamp"), cone = q("cs-cone"), pad = q("cs-pad"), phone = q("cs-phone"), burst = q("cs-burst"), hand = q("cs-hand"), spark = q("cs-spark"), sparkP = q("cs-spark-p");
    const win = root.parentElement!.querySelector<SVGGraphicsElement>("#cs-window")!, bird = root.parentElement!.querySelector<SVGGraphicsElement>("#cs-bird")!;
    const idleBlink = reduced ? null : f.idle();
    let silent = false;
    const snd = <A extends unknown[]>(fn: (...a: A) => void, ...a: A) => () => { if (!silent) fn(...a); };

    const reset = () => {
      gsap.set(desk, { y: 110, autoAlpha: 0 });
      gsap.set(win, { autoAlpha: 0, scale: 0.88, y: -30, svgOrigin: "244 57" });
      gsap.set(lamp, { autoAlpha: 0, scaleY: 0, svgOrigin: "-30 296" });
      gsap.set(cone, { autoAlpha: 0 });
      gsap.set(pad, { autoAlpha: 0, scale: 0, svgOrigin: "130 300" });
      gsap.set(phone, { autoAlpha: 0, scale: 0.2, svgOrigin: "330 304" });
      gsap.set(burst, { opacity: 0, scale: 0.6, svgOrigin: "330 232" });
      gsap.set(hand, { y: 0, rotation: 0, svgOrigin: "330 234" });
      gsap.set(spark, { opacity: 0 });
      gsap.set(sparkP, { scale: 0 });
      gsap.set(bird, { opacity: 0, x: 0, y: 0 });
    };
    reset();
    win.closest<SVGElement>("svg")!.style.opacity = "1";   // the window's own picture shows now; its group starts hidden

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
    // 1. the window and the desk
    tl.add(snd(cardSounds.pop), 0.02);
    tl.to(win, { autoAlpha: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.4)" }, 0);
    tl.add(snd(cardSounds.flip), 0.12);
    tl.to(desk, { autoAlpha: 1, y: 0, duration: 0.55, ease: "back.out(1.3)" }, 0.15);
    tl.add(snd(cardSounds.thud), 0.58);
    // 2. the lamp, the notepad, the phone
    tl.add(snd(cardSounds.tok, 0), 0.85);
    tl.to(lamp, { autoAlpha: 1, scaleY: 1, duration: 0.4, ease: "back.out(2)" }, 0.85);
    tl.add(snd(cardSounds.click), 1.2);
    tl.to(cone, { autoAlpha: 1, duration: 0.5, ease: "power1.out" }, 1.2);
    tl.add(snd(cardSounds.tok, 1), 1.35);
    tl.to(pad, { autoAlpha: 1, scale: 1, duration: 0.32, ease: "back.out(2.2)" }, 1.35);
    tl.add(snd(cardSounds.pop), 1.62);
    tl.to(phone, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2.4)" }, 1.62);
    // 3. it rings twice; she looks at it
    tl.add(() => { void f.to("curious", 0.3); f.gazeTo(14, 6, 0.3); }, 2.15);
    [2.2, 3.0].forEach((t0) => {
      tl.add(snd(cardSounds.brr), t0);
      tl.fromTo(burst, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1.05, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out" }, t0);
      tl.fromTo(hand, { y: -8, rotation: -3.5 }, { y: -8, rotation: 3.5, duration: 0.05, repeat: 9, yoyo: true, ease: "sine.inOut" }, t0);
      tl.to(hand, { y: 0, rotation: 0, duration: 0.15 }, t0 + 0.62);
    });
    // 4. she answers
    tl.add(() => { void f.to("smile", 0.4); f.gazeTo(0, 0, 0.4); }, 3.75);
    tl.add(snd(cardSounds.warm), 3.78);
    tl.set(spark, { opacity: 1 }, 3.85);
    tl.to(sparkP, { scale: 1, duration: 0.35, ease: "back.out(3)" }, 3.85);

    let ambient: gsap.core.Animation[] = [];
    let birdCall: gsap.core.Tween | null = null;
    const stopAmbient = () => { ambient.forEach((a) => a.kill()); ambient = []; birdCall?.kill(); birdCall = null; };
    const flyBird = () => {
      const x0 = 130;
      gsap.set(bird, { x: x0 + 20, y: -78 + 70, opacity: 0 });
      ambient.push(gsap.timeline()
        .add(() => { if (!silent) cardSounds.chirp(); })
        .to(bird, { opacity: 1, duration: 0.2 }, 0)
        .to(bird, { x: x0 + 190, y: -78 + 52, duration: 2.8, ease: "sine.inOut" }, 0)
        .to(bird, { opacity: 0, duration: 0.3 }, 2.3));
    };
    const startAmbient = () => {
      stopAmbient();
      ambient.push(gsap.to(cone, { opacity: 0.68, duration: 3, ease: "sine.inOut", yoyo: true, repeat: -1 }));
      const loop = () => { birdCall = gsap.delayedCall(6.5 + Math.random() * 3, () => { flyBird(); loop(); }); };
      birdCall = gsap.delayedCall(2.5, () => { flyBird(); loop(); });
    };
    tl.eventCallback("onComplete", () => { if (!reduced) startAmbient(); });

    api.current = {
      start() {
        if (reduced) return;
        silent = false;
        stopAmbient();
        if (tl.isActive()) return;
        reset();
        void f.to("smile", 0.01);
        tl.play(0);
      },
    };
    if (reduced) {
      silent = true;
      tl.progress(1).pause();
      void f.to("smile", 0.01);
    } else if (hover.current) api.current.start();
    ready.current = null;
    return () => {
      api.current = null;
      stopAmbient();
      tl.kill();
      idleBlink?.stop();
    };
  }, [rig]);

  return (
    <span ref={wrap} className={`interview-art ${className}`} role={alt ? "img" : undefined} aria-label={alt || undefined}>
      {rig ? (
        <>
          <RigFace ref={face} rig={rig} initial="smile" cut={CUT} underlay={under} overlay={over} />
        </>
      ) : (
        <Image src="/avatars/phone-call.svg" width={288} height={288} className="avatar" alt="" draggable={false} unoptimized />
      )}
    </span>
  );
}
