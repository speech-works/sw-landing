// The animated face of a kit figure for the free-day page, which is a plain HTML page (no React, no GSAP).
// A small port of src/app/components/RigFace.tsx: same rig, same face morph (src/lib/mailman-rig-core.ts), same eyes, brows, mouth, teeth,
// tongue, cheeks and blink. Built into public/try-a-day/faces/<name>.js by scripts/build-day-face.mjs. Do not use it in the React app.
import { FACE_MS, faceAt, faceFrame, faceKit, type FaceKit, type FaceV } from "../../src/lib/mailman-rig-core";
import type { MailmanRig, RigAttrs } from "../../src/lib/mailman-rig.generated";

export type DayFace = {
  /** Smoothly change the face (a kit face: calm, smile, laugh, proud, curious, listening, thinking, warm). */
  to: (name: string, duration?: number) => void;
  /** Move the pupils smoothly (figure units: about -20..20 sideways, -14..16 up and down). */
  gazeTo: (x: number, y: number, duration?: number) => void;
  /** Move the pupils right now (for following something every frame). */
  look: (x: number, y: number) => void;
  /** Blink now and then until stop() is called. */
  idle: () => { stop: () => void };
  /** Stop everything and remove the picture. */
  destroy: () => void;
};

const NS = "http://www.w3.org/2000/svg";
let counter = 0;

type Tween = { kill: () => void };
function tween(seconds: number, update: (p: number) => void, done?: () => void, ease: (t: number) => number = (t) => t): Tween {
  let raf = 0, start = 0, dead = false;
  const step = (now: number) => {
    if (dead) return;
    if (!start) start = now;
    const t = Math.min(1, (now - start) / (Math.max(seconds, 0.001) * 1000));
    update(ease(t));
    if (t < 1) raf = requestAnimationFrame(step);
    else if (done) done();
  };
  raf = requestAnimationFrame(step);
  return { kill: () => { dead = true; cancelAnimationFrame(raf); } };
}

function fitTeethMask(rect: Element, mouth: Element) {
  let b: DOMRect;
  try { b = (mouth as SVGGraphicsElement).getBBox(); } catch { return; }
  const pad = (+(mouth.getAttribute("stroke-width") ?? 0)) / 2 + 1;
  rect.setAttribute("x", (b.x - pad).toFixed(2));
  rect.setAttribute("y", (b.y - pad).toFixed(2));
  rect.setAttribute("width", (b.width + 2 * pad).toFixed(2));
  rect.setAttribute("height", (b.height + 2 * pad).toFixed(2));
}

export function makeFace(host: Element, rig: MailmanRig, initial: string, cut?: string): DayFace {
  const uid = `df${++counter}`;
  const keys: Record<string, string[]> = {};
  const addKeys = (set: Record<string, RigAttrs>) => {
    for (const i in set) keys[i] = Array.from(new Set([...(keys[i] ?? []), ...Object.keys(set[i])]));
  };
  Object.values(rig.rest).forEach(addKeys);
  rig.eyes.lid1.forEach(addKeys);
  rig.eyes.lid0.forEach(addKeys);
  const kit: FaceKit = faceKit({ ...rig.rig, names: [...rig.rig.names], t: { ...rig.rig.t } });
  const pupils = rig.eyeIdx.filter((i) => /^translate\(/.test(rig.eyes.lid1[0][i]?.transform ?? ""));

  // the picture, with the first face's attributes written in
  let html = rig.svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/(id="|url\(#|href="#)cd\d+/g, (_m: string, a: string) => `${a}${uid}`);
  const state = rig.rest[initial];
  for (const i in state) {
    html = html.replace(new RegExp(`<(\\w+)([^>]*?) data-i="${i}"(/?)>`), (_m, tag: string, attrs: string, close: string) => {
      let s = attrs;
      for (const k of keys[i] ?? []) {
        s = s.replace(new RegExp(` ${k}="[^"]*"`), "");
        const v = state[i][k];
        if (v !== undefined) s += ` ${k}="${k === "clip-path" || k === "filter" ? v.replace(/cd\d+/, uid) : v}"`;
      }
      return `<${tag}${s} data-i="${i}"${close}>`;
    });
  }
  if (cut) html = `<defs><clipPath id="${uid}cut"><rect x="-200" y="-200" width="720" height="390"/><path d="${cut}"/></clipPath></defs><g clip-path="url(#${uid}cut)">${html}</g>`;

  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("viewBox", "0 0 320 310");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.setAttribute("style", "position:absolute;inset:0;display:block;width:100%;height:100%;max-width:none");
  svg.innerHTML = html;

  const els: Record<string, Element> = {};
  svg.querySelectorAll("[data-i]").forEach((e) => { els[e.getAttribute("data-i") as string] = e; });
  host.appendChild(svg);   // in the page now, so the mouth can be measured

  // keep the teeth inside the mouth (a closing laugh would leave a strip of teeth outside a small mouth)
  const teeth = rig.roles.teeth === undefined ? undefined : els[rig.roles.teeth], mouth = els[rig.roles.mouth];
  if (teeth && mouth && teeth.parentNode === mouth.parentNode) {
    const id = `${uid}tm`;
    const mask = document.createElementNS(NS, "mask");
    mask.setAttribute("id", id);
    mask.setAttribute("maskUnits", "userSpaceOnUse");
    for (const [k, v] of [["x", "-2000"], ["y", "-2000"], ["width", "6000"], ["height", "6000"]]) mask.setAttribute(k, v);
    const shape = document.createElementNS(NS, "rect");
    shape.setAttribute("fill", "#fff");
    mask.appendChild(shape);
    const g = document.createElementNS(NS, "g");
    g.setAttribute("mask", `url(#${id})`);
    teeth.parentNode?.insertBefore(g, teeth);
    g.appendChild(teeth);
    svg.insertBefore(mask, svg.firstChild);
    els.teethMask = shape;
    fitTeethMask(shape, mouth);
  }

  const setA = (i: number | undefined, k: string, v: string | null | undefined) => {
    const e = i === undefined ? null : els[i];
    if (!e) return;
    if (v === null || v === undefined) e.removeAttribute(k);
    else if (e.getAttribute(k) !== v) e.setAttribute(k, k === "clip-path" || k === "filter" ? v.replace(/cd\d+/, uid) : v);
  };
  const mx = (m: number[]) => `matrix(${m.map((x) => +x.toFixed(5)).join(" ")})`;
  const show = (i: number | undefined, on: number) => setA(i, "display", on ? "inline" : "none");
  const eye = { s: 0, up: false };
  const gaze = { x: 0, y: 0 };

  /** The eyes at s: 0 open, 1 lid shut, 2 the closed arc. */
  const eyesAt = (s: number, up: boolean) => {
    eye.s = s;
    eye.up = up;
    const A = (up ? rig.eyes.lid0 : rig.eyes.lid1)[Math.max(0, Math.min(40, Math.round(s * 20)))];
    for (const i of rig.eyeIdx) {
      for (const k of keys[i] ?? []) {
        let v: string | undefined = A[i]?.[k];
        if (k === "transform" && v && pupils.includes(i) && (gaze.x || gaze.y)) {
          const n = v.match(/-?[\d.]+/g)?.map(Number) ?? [0, 0];
          v = `translate(${(n[0] + gaze.x).toFixed(2)} ${((n[1] ?? 0) + gaze.y).toFixed(2)})`;
        }
        setA(i, k, v);
      }
    }
  };

  const apply = (v: FaceV) => {
    const F = v.still ? kit.rest[v.f].r : faceFrame(kit.rig, v);
    const ro = rig.roles;
    setA(ro.brow, "d", F.browD);
    setA(ro.mouth, "d", F.mouthD);
    setA(ro.mouth, "stroke-width", F.mouthSw.toFixed(2));
    const tm = els.teethMask;
    if (tm && els[ro.mouth]) fitTeethMask(tm, els[ro.mouth]);
    show(ro.teeth, F.teethO);
    setA(ro.teeth, "opacity", F.teethO >= 1 ? null : F.teethO.toFixed(3));
    if (F.teethO) { setA(ro.teeth, "d", F.teethD); setA(ro.teeth, "transform", mx(F.teethM)); }
    show(ro.tongue, F.tongueO);
    if (F.tongueO) setA(ro.tongue, "transform", mx(F.tongueM));
    show(ro.cheek, F.cheekO);
    if (F.cheekO) setA(ro.cheek, "transform", mx(F.cheekM));
    ro.blush.forEach((b, k) => {
      setA(b, "opacity", F.blushO.toFixed(3));
      if (F.blushM[k]) setA(b, "transform", mx(F.blushM[k]));
    });
    if (v.line !== null) eyesAt(1 + v.line, v.lid < 0.5);
    else eyesAt(v.lid, false);
  };

  let last: FaceV = kit.rest[initial].v;
  let active: Tween | null = null;
  let gazeTween: Tween | null = null;
  const timers: Tween[] = [];
  let dead = false;

  const to = (name: string, duration = 0.4) => {
    const target = kit.rest[name]?.v;
    if (!target || dead) return;
    active?.kill();
    const c = last;
    const from: FaceV = { ...c, arc: c.line !== null ? 1 : 0, still: false };   // from the face as it is now, also in the middle of another change
    const tw: Tween = tween(duration, (p) => {
      const v = p >= 1 ? target : faceAt(from, target, p * FACE_MS);
      last = v;
      apply(v);
    }, () => { last = target; apply(target); if (active === tw) active = null; });
    active = tw;
  };
  const look = (x: number, y: number) => { gaze.x = x; gaze.y = y; eyesAt(eye.s, eye.up); };
  const gazeTo = (x: number, y: number, d = 0.3) => {
    gazeTween?.kill();
    const x0 = gaze.x, y0 = gaze.y;
    gazeTween = tween(d, (p) => look(x0 + (x - x0) * p, y0 + (y - y0) * p), undefined, (t) => 1 - (1 - t) * (1 - t));
  };
  const idle = () => {
    let stopped = false;
    let timer: ReturnType<typeof setTimeout>;
    const blink = () => {
      if (stopped || dead) return;
      if (last.still && last.line === null && !active) {
        const t = tween(0.18, (p) => { if (!stopped && !active) eyesAt(Math.sin(Math.PI * p), false); }, () => { if (!stopped && !active) eyesAt(0, false); });
        timers.push(t);
      }
      timer = setTimeout(blink, (2.6 + Math.random() * 2.4) * 1000);
    };
    timer = setTimeout(blink, 2200);
    return { stop: () => { stopped = true; clearTimeout(timer); } };
  };
  const destroy = () => {
    dead = true;
    active?.kill();
    gazeTween?.kill();
    timers.forEach((t) => t.kill());
    svg.remove();
  };
  apply(last);
  return { to, gazeTo, look, idle, destroy };
}
