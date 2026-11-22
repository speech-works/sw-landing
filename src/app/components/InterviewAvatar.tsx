"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { cardSounds } from "@/lib/card-sounds";

// The Job interview card (the banker). On hover or keyboard focus of the card (once when the card is well in view on a touch phone), about 3.4 s:
// 1. a headset hops down from above and lands on his head;
// 2. he turns his back to us;
// 3. he slides in to a desk (the figure shrinks, the chair rolls in from below);
// 4. the desk, three screens (two interviewers and his CV) and a few small things (notepad, cup, clock, paper plane, tick badge) pop up, one at a time.
// Leaving the card plays it backwards quickly, so he is standing again. With reduced motion nothing moves: the finished scene shows, with no sound.
// The art is the layered scene in /public/scenes/interview-scene.svg (built by scripts/build-interview-scene.cjs). It loads when the card is first
// pointed at (or soon after the page is idle); until then the card shows the plain banker picture, which is the same art as the first frame.
// Every layer that touches the blob bottom (the front body, the back body, the chair) is cut by one fixed blob clip, so it ends on the blob outline at every frame.

const SRC = "/scenes/interview-scene.svg";
let cache: Promise<string> | null = null;
function loadScene() {
  cache ??= fetch(SRC).then((r) => (r.ok ? r.text() : Promise.reject(new Error("scene"))));
  cache.catch(() => { cache = null; });
  return cache;
}

type Api = { start: () => void; stop: () => void };

/** open: the scene stands on the page itself (the program page): it plays once by itself 1 s after the page loaded (no hover needed), stays on the finished scene, and hovering it plays it again. */
export default function InterviewAvatar({ className = "", alt = "", open = false }: { className?: string; alt?: string; open?: boolean }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const [markup, setMarkup] = useState<string | null>(null);
  const hover = useRef(false);
  const api = useRef<Api | null>(null);

  // events on the card; the scene is fetched when the card is first pointed at, or when the browser is idle
  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = root.closest<HTMLElement>(".program-card, .detail-art") ?? root;
    let alive = true;
    const load = () => loadScene().then((m) => { if (alive) setMarkup(m); }).catch(() => {});
    const start = () => { hover.current = true; void load(); api.current?.start(); };
    const stop = () => { hover.current = false; api.current?.stop(); };
    const hoverable = window.matchMedia("(hover: hover) and (pointer: fine)").matches && !open;
    let io: IntersectionObserver | undefined;
    let timer = 0;
    const again0 = () => { hover.current = true; api.current?.start(); };
    if (reduced) void load();
    else {
      if (open) {
        target.addEventListener("pointerenter", again0);
        // the program page: no hover needed, it plays by itself 1 s after the page loaded
        void load();
        timer = window.setTimeout(start, 1000);
      } else if (hoverable) {
        target.addEventListener("pointerenter", start);
        target.addEventListener("pointerleave", stop);
      } else {
        // a phone has no hover: play once when the card is well on screen
        io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { start(); io?.disconnect(); } }, { threshold: 0.7 });
        io.observe(target);
      }
      target.addEventListener("focusin", start);
      if (!open) target.addEventListener("focusout", stop);
      const idle = (window as unknown as { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (idle) idle(() => void load(), { timeout: 4000 }); else setTimeout(() => void load(), 2500);
    }
    return () => {
      alive = false;
      target.removeEventListener("pointerenter", start);
      target.removeEventListener("pointerenter", again0);
      target.removeEventListener("pointerleave", stop);
      target.removeEventListener("focusin", start);
      target.removeEventListener("focusout", stop);
      io?.disconnect();
      window.clearTimeout(timer);
    };
  }, [open]);

  // the timeline, once the scene is in the page
  useEffect(() => {
    const root = wrap.current;
    if (!markup || !root) return;
    const $ = (id: string) => root.querySelector<SVGGraphicsElement>(`#${id}`)!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const front = $("front-stage"), headset = $("headset"), back = $("banker-back"), move = $("back-move"), chair = $("chair");
    const desk = $("desk");
    const mons = ["monitor-left", "monitor-right", "monitor-centre"].map($);
    const people = [$("interviewer-left"), $("interviewer-right"), $("cv-window")];
    const props = ["props-notepad", "props-cup", "props-clock", "props-plane", "props-check"].map($);
    const origin = (el: Element) => (el.getAttribute("data-origin") ?? "160 150").replace(" ", " ");
    const sw = { k: 1 };
    const setScale = (k: number) => { sw.k = k; move.style.setProperty("--sw", String(4 / k)); };

    let silent = false;
    const snd = <A extends unknown[]>(fn: (...a: A) => void, ...a: A) => () => { if (!silent) fn(...a); };

    const reset = () => {
      gsap.set(front, { autoAlpha: 1 });
      gsap.set(headset, { autoAlpha: 0, y: -90, rotation: 12, svgOrigin: "160 60" });
      gsap.set(back, { autoAlpha: 0, scaleX: 0, svgOrigin: "160.5 226" });
      gsap.set(move, { x: 0, y: 0, scale: 1, svgOrigin: "0 0" });
      setScale(1);
      gsap.set(chair, { autoAlpha: 0, y: 120 });
      gsap.set(desk, { autoAlpha: 0, scale: 0.4, svgOrigin: "160 150" });
      mons.forEach((m) => gsap.set(m, { autoAlpha: 0, scale: 0.3, svgOrigin: origin(m) }));
      people.forEach((p) => gsap.set(p, { autoAlpha: 0 }));
      props.forEach((p) => gsap.set(p, { autoAlpha: 0, scale: 0, rotation: -18, svgOrigin: origin(p) }));
    };
    reset();

    // a few quiet things keep moving once the scene is complete: steam over the cup, the interviewers stay in place, blink and slowly change colour in the cheeks
    const ambient: gsap.core.Animation[] = [];
    let blinkCall: gsap.core.Tween | null = null;
    // the paper plane flies one full 360 orbit around the whole scene, like the mail around the globe: along the far side (small, behind the screens and the desk),
    // down the right side, along the near side (bigger, in front of the chair) and up the left side, home to its spot. A dotted trail follows it.
    const plane = $("props-plane");
    const CX0 = 65.5, CY0 = 8, RX = 200, RY = 150;                           // the plane's resting centre; the orbit's radii
    const PHI0 = Math.atan2(-0.687, -0.73);                                  // where on the orbit the resting plane sits (upper left, far side)
    const OX = CX0 - RX * Math.cos(PHI0), OY = CY0 - RY * Math.sin(PHI0);    // orbit centre, so the orbit passes exactly through the resting spot
    const orbit = (u: number) => { const f = PHI0 + u * Math.PI * 2; return { f, x: OX + RX * Math.cos(f), y: OY + RY * Math.sin(f), z: Math.sin(f) }; };
    const H0 = Math.atan2(RY * Math.cos(PHI0), -RX * Math.sin(PHI0));        // the orbit's heading where the resting plane sits
    const planeHome = { parent: plane.parentNode, next: plane.nextSibling };
    const stack = chair.parentNode as Node;                                  // the plane flies in front of the scene while on the near side
    let trail: SVGPathElement | null = null;
    let planeTimer: gsap.core.Tween | null = null;
    let near = false;
    let restT: string | null = null;
    const place = (n: boolean) => {
      if (n === near) return;
      near = n;
      if (n) { stack.parentNode?.insertBefore(plane, stack.nextSibling); if (trail) front.parentNode?.insertBefore(trail, plane); }
      else { planeHome.parent?.insertBefore(plane, planeHome.next); if (trail) planeHome.parent?.insertBefore(trail, plane); }
    };
    const clearPlane = () => {
      near = true; place(false);
      trail?.remove();
      trail = null;
      if (restT !== null) plane.setAttribute("transform", restT);           // exactly the resting transform again
    };
    // the people in the screens follow the plane with their eyes (their pupils slide inside the eyes)
    const FACES = [{ id: "interviewer-left", x: 84, y: 62 }, { id: "interviewer-right", x: 312, y: 62 }].map((f) => ({
      ...f,
      pupils: Array.from($(f.id).querySelectorAll<SVGElement>('g[clip-path$="_eL)"] > g, g[clip-path$="_eR)"] > g')),
      cur: { x: 0, y: 0 },
    }));
    const setGaze = (f: (typeof FACES)[number]) => f.pupils.forEach((g) => g.setAttribute("transform", `translate(${f.cur.x.toFixed(1)} ${f.cur.y.toFixed(1)})`));
    const gazeAt = (px: number, py: number) => FACES.forEach((f) => {
      const dx = px - f.x, dy = py - f.y, d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 70);
      f.cur.x += ((dx / d) * 17 * k - f.cur.x) * 0.3;
      f.cur.y += ((dy / d) * 12 * k - f.cur.y) * 0.3;
      setGaze(f);
    });
    const gazeHome = () => FACES.forEach((f) => { ambient.push(gsap.to(f.cur, { x: 0, y: 0, duration: 0.5, ease: "power2.out", onUpdate: () => setGaze(f) })); });
    const orbitPlane = (withSound: boolean) => {
      if (restT === null) restT = plane.getAttribute("transform") ?? "";
      clearPlane();
      const NS = "http://www.w3.org/2000/svg";
      const tg = document.createElementNS(NS, "g") as unknown as SVGPathElement;
      trail = tg;
      // three thin speed streaks that curve behind the plane (different lengths and side offsets)
      const STREAKS = [{ off: -7, from: 0.016, len: 0.07, op: 0.9 }, { off: 0, from: 0.03, len: 0.055, op: 0.7 }, { off: 7, from: 0.012, len: 0.04, op: 0.8 }];
      const lines = STREAKS.map((st) => {
        const l = document.createElementNS(NS, "path");
        l.setAttribute("fill", "none"); l.setAttribute("stroke", "#FFFFFF"); l.setAttribute("stroke-width", "2"); l.setAttribute("stroke-linecap", "round"); l.setAttribute("opacity", String(st.op));
        tg.appendChild(l);
        return l;
      });
      planeHome.parent?.insertBefore(tg, plane);
      const u = { v: 0 };
      let passed = false;
      if (withSound) cardSounds.sweep();
      const streaks = (k: number) => {
        STREAKS.forEach((st, i) => {
          const pts: string[] = [];
          for (let j = 0; j <= 8; j++) {
            const uu = u.v - st.from - (st.len * j) / 8;
            if (uu < 0) break;
            const q = orbit(uu), vx = -RX * Math.sin(q.f), vy = RY * Math.cos(q.f), m = Math.hypot(vx, vy);
            pts.push(`${(q.x - (vy / m) * st.off * k).toFixed(1)} ${(q.y + (vx / m) * st.off * k).toFixed(1)}`);
          }
          lines[i].setAttribute("d", pts.length > 1 ? "M" + pts.join("L") : "");
        });
      };
      ambient.push(gsap.to(u, {
        v: 1, duration: 3.1, ease: "power1.inOut",
        onUpdate() {
          const o = orbit(u.v);
          place(o.z > 0.05);
          // like the mail around the globe: the nose always follows the path, turning a full 360 over the orbit (it flies upside down on the way, as a paper plane would)
          let rot = ((Math.atan2(RY * Math.cos(o.f), -RX * Math.sin(o.f)) - H0) * 180) / Math.PI;
          if (u.v > 0.5 && rot < 0) rot += 360;
          const k = 1 + 0.26 * (o.z + 0.687);
          plane.setAttribute("transform", `translate(${(o.x - CX0).toFixed(2)} ${(o.y - CY0).toFixed(2)}) translate(${CX0} ${CY0}) rotate(${rot.toFixed(2)}) scale(${k.toFixed(3)}) translate(${-CX0} ${-CY0})`);
          streaks(k);
          gazeAt(o.x, o.y);
          if (withSound && !passed && o.z > 0.9) { passed = true; cardSounds.flip(); }
        },
        onComplete: () => {
          if (withSound) cardSounds.tink();
          const t2 = tg;
          if (restT !== null) plane.setAttribute("transform", restT);
          place(false);
          gazeHome();
          lines.forEach((l) => l.setAttribute("d", ""));
          gsap.delayedCall(0.05, () => { if (trail === t2) clearPlane(); });
        },
      }));
    };
    const stopAmbient = () => {
      ambient.splice(0).forEach((a) => a.kill());
      blinkCall?.kill();
      blinkCall = null;
      planeTimer?.kill();
      planeTimer = null;
      clearPlane();
      FACES.forEach((f) => { f.cur.x = 0; f.cur.y = 0; setGaze(f); });
      const steam = root.querySelector<SVGElement>('#props-cup path[stroke="#B9C3D6"]');
      if (steam) gsap.set(steam, { y: 0, opacity: 1, clearProps: "transform" });
    };
    const startAmbient = () => {
      stopAmbient();
      const steam = root.querySelector<SVGElement>('#props-cup path[stroke="#B9C3D6"]');
      if (steam) ambient.push(gsap.fromTo(steam, { y: 1.5, opacity: 1 }, { y: -4, opacity: 0.25, duration: 1.7, ease: "sine.inOut", yoyo: true, repeat: -1 }));
      ["interviewer-left", "interviewer-right"].forEach((id, i) => {
        const who = $(id);
        const cheeks = who.querySelectorAll<SVGElement>('[id$="_bl"]');
        if (cheeks.length) ambient.push(gsap.fromTo(cheeks, { opacity: 0.2 }, { opacity: 1, duration: 3.4 + i * 1.1, ease: "sine.inOut", yoyo: true, repeat: -1 }));
      });
      const eyes = root.querySelectorAll<SVGElement>('#interviewer-left [id$="_eL"], #interviewer-left [id$="_eR"], #interviewer-right [id$="_eL"], #interviewer-right [id$="_eR"]');
      const blink = () => {
        blinkCall = gsap.delayedCall(2.4 + Math.random() * 2.6, () => {
          ambient.push(gsap.to(eyes, { scaleY: 0.12, transformOrigin: "50% 50%", duration: 0.07, yoyo: true, repeat: 1, ease: "power1.inOut" }));
          blink();
        });
      };
      blink();
      // the orbit: once right after the scene is complete, then now and then
      planeTimer = gsap.delayedCall(0.5, () => {
        orbitPlane(true);
        const again = () => { planeTimer = gsap.delayedCall(9, () => { orbitPlane(false); again(); }); };
        again();
      });
    };

    const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" }, onReverseComplete: reset, onComplete: () => { if (!reduced) startAmbient(); } });
    // 1. the headset hops down and lands on his head (a small bounce)
    tl.add(snd(cardSounds.hop), 0.02);
    tl.to(headset, { autoAlpha: 1, duration: 0.08 }, 0);
    tl.to(headset, { y: 0, rotation: -4, duration: 0.34, ease: "power3.in" }, 0);
    tl.add(snd(cardSounds.tok, 1), 0.34);
    tl.to(headset, { y: -8, rotation: 3, duration: 0.11, ease: "sine.out" }, 0.34);
    tl.to(headset, { y: 0, rotation: 0, duration: 0.14, ease: "sine.in" }, 0.45);
    // 2. he turns his back: the front squeezes thin, the back opens up
    tl.add(snd(cardSounds.flip), 0.62);
    tl.to(front, { scaleX: 0, duration: 0.2, ease: "power2.in", svgOrigin: "160.5 0" }, 0.62);
    tl.set(front, { autoAlpha: 0 }, 0.82);
    tl.set(back, { autoAlpha: 1 }, 0.82);
    tl.to(back, { scaleX: 1, duration: 0.26, ease: "back.out(1.6)" }, 0.82);
    // 3. he slides in to the desk: the figure shrinks, the chair rolls in from below
    tl.add(snd(cardSounds.roll), 1.15);
    tl.to(move, { x: 64.2, y: 68.4, scale: 0.6, duration: 0.55, ease: "power3.inOut", onUpdate() { setScale(gsap.getProperty(move, "scale") as number); } }, 1.15);
    tl.to(chair, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power2.out" }, 1.2);
    tl.add(snd(cardSounds.thud), 1.62);
    // 4. the desk, then the screens, then the small things
    tl.add(snd(cardSounds.tok, 0), 1.78);
    tl.to(desk, { autoAlpha: 1, scale: 1, duration: 0.32, ease: "back.out(1.6)" }, 1.78);
    mons.forEach((m, i) => {
      tl.add(snd(cardSounds.pop), 2.1 + i * 0.14);
      tl.to(m, { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(1.8)" }, 2.1 + i * 0.14);
      tl.to(people[i], { autoAlpha: 1, duration: 0.2, ease: "power1.out" }, 2.28 + i * 0.14);
    });
    props.forEach((p, i) => {
      const at = 2.62 + i * 0.1;
      tl.add(snd(i === 4 ? cardSounds.ding : cardSounds.pip), at);
      tl.to(p, { autoAlpha: 1, scale: 1, rotation: 0, duration: 0.3, ease: "back.out(2.2)" }, at);
    });

    let reversing = false;
    const api0: Api = {
      start() {
        if (reduced) return;
        reversing = false;
        silent = false;
        stopAmbient();
        tl.timeScale(1);
        if (tl.progress() === 1 && !tl.reversed()) { if (open) tl.play(0); return; }   // finished: stays on the last frame (open: hovering plays it again)
        if (tl.reversed()) tl.play(); else if (!tl.isActive()) tl.play(0);
      },
      stop() {
        if (reduced || open) return;
        stopAmbient();
        silent = true;                                          // the way back is quiet
        reversing = true;
        tl.timeScale(2.6);
        tl.reverse();
      },
    };
    void reversing;
    api.current = api0;
    if (reduced) {
      silent = true;
      tl.progress(1).pause();
    } else if (hover.current) api0.start();
    return () => {
      api.current = null;
      stopAmbient();
      tl.kill();
      gsap.killTweensOf([front, headset, back, move, chair, desk, ...mons, ...people, ...props]);
    };
  }, [markup, open]);

  return (
    <span
      ref={wrap}
      className={`interview-art ${className}`}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      {...(markup ? { dangerouslySetInnerHTML: { __html: markup } } : {})}
    >
      {markup ? undefined : <Image src="/avatars/banker.svg" width={288} height={288} className="avatar" alt="" draggable={false} unoptimized />}
    </span>
  );
}
