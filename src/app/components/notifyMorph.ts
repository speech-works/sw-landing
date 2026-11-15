"use client";

import { gsap } from "@/lib/motion";
import type { Sfx } from "./notifySfx";

// The "Notify me" animation. The dialog card folds into the mailman's face
// circle, pops open into a globe, three envelopes circle the globe while the
// sign-up is sent, then the globe shrinks back to the (now happy) mailman and
// grows into the thank-you card. Everything here is plain DOM work with GSAP.

const INK = "#141311";
const LIME = "#c8f750";
const CREAM = "#fff9e9";
const GLOBE = 250;
const SEED = 112;
const RING_X = 218;
const RING_Y = 70;
const TILT = -28;
const LOOP = 1.15; // seconds per orbit
const SPIN = 1.1; // radians per second
const CARD_SHADOW = `5px 6px 0 ${INK}`;
const CARD_RADII = [4, 28, 28, 28] as const;

export type MorphRefs = {
  card: HTMLElement;
  formView: HTMLElement;
  doneView: HTMLElement;
  globe: SVGSVGElement;
  orbit: HTMLElement;
};

export type MorphResult = "ok" | "fail";

const corners = (a: number, b: number, c: number, d: number) => ({
  borderTopLeftRadius: a,
  borderTopRightRadius: b,
  borderBottomRightRadius: c,
  borderBottomLeftRadius: d,
});
const round = (r: number) => corners(r, r, r, r);

const q = <T extends Element>(root: ParentNode, selector: string) =>
  root.querySelector<T>(selector);

/** The pieces of each view that move on their own, face first. */
function formKids(view: HTMLElement) {
  return [
    ".notify-face",
    "h2",
    ".launch-list-label",
    'input[type="email"]',
    ".launch-list-row .button",
    ".launch-list-error",
    ".launch-list-consent",
    ".launch-list-note",
  ]
    .map((s) => q<HTMLElement>(view, s))
    .filter((e): e is HTMLElement => Boolean(e));
}
function doneKids(view: HTMLElement) {
  return [".notify-face", "h2", ".notify-sentto", ".notify-help", ".notify-done"]
    .map((s) => q<HTMLElement>(view, s))
    .filter((e): e is HTMLElement => Boolean(e));
}

/** How far each piece is from the card centre. */
function offsets(card: HTMLElement, kids: HTMLElement[]) {
  gsap.set(kids, { clearProps: "transform,opacity" });
  const c = card.getBoundingClientRect();
  const cx = c.left + c.width / 2;
  const cy = c.top + c.height / 2;
  return kids.map((k) => {
    const b = k.getBoundingClientRect();
    return { k, dx: cx - (b.left + b.width / 2), dy: cy - (b.top + b.height / 2) };
  });
}

/** Take the card out of normal flow so it can change size without its text reflowing. */
function freeze(refs: MorphRefs) {
  const { card, formView, doneView } = refs;
  const rect = card.getBoundingClientRect();
  const viewH = formView.offsetHeight;
  const cw = formView.offsetWidth;
  const pad = rect.height - viewH; // padding + border around the content
  card.style.setProperty("--notify-cw", `${cw}px`);
  card.classList.add("is-morphing");
  gsap.set(card, { width: rect.width, height: rect.height });
  gsap.set(doneView, { opacity: 0, visibility: "hidden" });
  return { w: rect.width, pad };
}

export function cleanup(refs: MorphRefs) {
  const { card, formView, doneView, globe, orbit } = refs;
  const all = [
    card,
    formView,
    doneView,
    globe,
    ...formKids(formView),
    ...doneKids(doneView),
    ...Array.from(orbit.querySelectorAll<HTMLElement>("*")),
    ...Array.from(card.querySelectorAll<HTMLElement>(".notify-close, .notify-sound")),
  ];
  gsap.killTweensOf(all);
  gsap.set(all, { clearProps: "all" });
  card.classList.remove("is-morphing");
  card.style.removeProperty("--notify-cw");
  orbit.querySelectorAll(".notify-burst").forEach((e) => e.remove());
}

const drawIn = (globe: SVGSVGElement) =>
  gsap.fromTo(
    globe.querySelectorAll(".draw"),
    { strokeDashoffset: 1, strokeOpacity: 0 },
    { strokeDashoffset: 0, strokeOpacity: 1, duration: 0.5, stagger: 0.06, ease: "power2.out" },
  );
const drawOut = (globe: SVGSVGElement) =>
  gsap.to(globe.querySelectorAll(".draw"), {
    strokeDashoffset: 1,
    strokeOpacity: 0,
    duration: 0.22,
    stagger: 0.03,
    ease: "power2.in",
  });

function toGlobe(refs: MorphRefs, sfx?: Sfx) {
  const { card, formView, globe } = refs;
  const kids = offsets(card, formKids(formView));
  const face = kids[0];
  const rest = kids.slice(1).map((o) => o.k);
  const close = Array.from(card.querySelectorAll<HTMLElement>(".notify-close, .notify-sound"));
  const tl = gsap.timeline();
  // 1. The text steps aside. 2. The face slides to the middle. 3. Only then does
  // the card shrink around the (already centred) face. 4. It pops open into the globe.
  tl.to(rest, { y: -14, scale: 0.8, opacity: 0, duration: 0.2, stagger: { each: 0.025, from: "end" }, ease: "power2.in" }, 0)
    .to(close, { opacity: 0, duration: 0.2 }, 0)
    .add(() => sfx?.whoosh(), 0.12)
    .to(face.k, { x: face.dx, y: face.dy, duration: 0.38, ease: "power3.inOut" }, 0.12)
    .to(card, { width: SEED, height: SEED, ...round(SEED / 2), boxShadow: `0px 4px 0 ${INK}`, duration: 0.5, ease: "power3.inOut" }, 0.34)
    .add(() => sfx?.pwip(), 0.82)
    .to(card, { scale: 0.92, duration: 0.12, ease: "power2.out" }, 0.95)
    .add(() => sfx?.boing(), 1.07)
    .to(card, { backgroundColor: LIME, duration: 0.22, ease: "power1.out" }, 0.98)
    .to(card, { width: GLOBE, height: GLOBE, ...round(GLOBE / 2), backgroundColor: LIME, boxShadow: `0px 6px 0 ${INK}`, scale: 1, duration: 0.75, ease: "elastic.out(1,.55)" }, 1.07)
    .to(face.k, { scale: 0.6, opacity: 0, duration: 0.16, ease: "power2.in" }, 0.95)
    .set(globe, { opacity: 1 }, 1.15)
    .add(drawIn(globe), 1.17);
  return tl;
}

function toCard(refs: MorphRefs, target: "form" | "done", w: number, pad: number, sfx?: Sfx) {
  const { card, formView, doneView, globe } = refs;
  const view = target === "done" ? doneView : formView;
  const other = target === "done" ? formView : doneView;
  gsap.set(other, { opacity: 0, visibility: "hidden" });
  gsap.set(view, { display: "block", opacity: 1, visibility: "visible" });
  const kids = offsets(card, target === "done" ? doneKids(view) : formKids(view));
  const face = kids[0];
  const rest = kids.slice(1).map((o) => o.k);
  const close = Array.from(card.querySelectorAll<HTMLElement>(".notify-close, .notify-sound"));
  const h = view.offsetHeight + pad;
  gsap.set(face.k, { x: face.dx, y: face.dy, scale: 0.6, opacity: 0 });
  gsap.set(rest, { y: -14, scale: 0.8, opacity: 0 });
  const tl = gsap.timeline();
  tl.add(drawOut(globe), 0)
    .add(() => (target === "done" ? sfx?.pwip() : sfx?.bwomp()), target === "done" ? 0.5 : 0)
    .to(card, { width: SEED, height: SEED, ...round(SEED / 2), backgroundColor: CREAM, boxShadow: `0px 4px 0 ${INK}`, duration: 0.55, ease: "power3.inOut" }, 0.2)
    .set(globe, { opacity: 0 }, 0.32)
    .to(face.k, { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.8)" }, 0.4)
    .to(card, { scale: 0.92, duration: 0.1, ease: "power2.out" }, 0.78)
    .add(() => { if (target === "done") { sfx?.boing(); } }, 0.86)
    .add(() => { if (target === "done") { sfx?.tada(); } }, 1.0)
    .to(card, { width: w, height: h, ...corners(...CARD_RADII), boxShadow: CARD_SHADOW, scale: 1, duration: 0.8, ease: "elastic.out(1,.6)" }, 0.86)
    .to(face.k, { x: 0, y: 0, duration: 0.6, ease: "back.out(1.5)" }, 0.9)
    .to(rest, { y: 0, scale: 1, opacity: 1, duration: 0.5, stagger: 0.06, ease: "back.out(1.6)" }, 1.0)
    .to(close, { opacity: 1, duration: 0.3 }, 1.3);
  return tl;
}

// ---- Envelopes circling the globe ------------------------------------------

function createOrbit(refs: MorphRefs, sfx?: Sfx) {
  const { orbit, globe } = refs;
  const s = Math.min(1, (window.innerWidth - 16) / 470);
  const envs = Array.from(orbit.querySelectorAll<HTMLElement>(".notify-env"));
  const rings = Array.from(orbit.querySelectorAll<SVGSVGElement>(".notify-ring"));
  const merid = Array.from(globe.querySelectorAll<SVGEllipseElement>(".notify-merid"));
  const tilt = (TILT * Math.PI) / 180;
  const st = { theta: -Math.PI / 2, spin: 0, rs: 1, es: 1, eo: 0 };
  const wasFront = envs.map(() => false);

  rings.forEach((r) => {
    r.style.width = `${720 * s}px`;
    r.style.height = `${720 * s}px`;
    r.style.left = `${-360 * s}px`;
    r.style.top = `${-360 * s}px`;
  });
  const place = () => {
    envs.forEach((e, i) => {
      const th = st.theta + (i * 2 * Math.PI) / envs.length;
      const x0 = st.rs * RING_X * Math.cos(th) * s;
      const y0 = st.rs * RING_Y * Math.sin(th) * s;
      const x = x0 * Math.cos(tilt) - y0 * Math.sin(tilt);
      const y = x0 * Math.sin(tilt) + y0 * Math.cos(tilt);
      const d = Math.sin(th);
      if (d > 0 && !wasFront[i] && st.eo > 0.6 && st.rs > 0.9) sfx?.tink(i);
      wasFront[i] = d > 0;
      const sc = (0.74 + (0.34 * (d + 1)) / 2) * st.es * s;
      e.style.opacity = String(Math.max(0, st.eo));
      e.style.zIndex = d > 0 ? "5" : "1";
      e.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) rotate(${(TILT * 0.2 + Math.cos(th) * 10).toFixed(1)}deg) scale(${sc.toFixed(3)})`;
    });
  };
  const setMerid = () => {
    merid.forEach((m, k) => {
      const rx = Math.max(2, 123 * Math.abs(Math.cos(st.spin + (k * Math.PI) / 3)));
      m.setAttribute("rx", rx.toFixed(1));
    });
  };

  return {
    start() {
      place();
      setMerid();
      gsap.to(st, { theta: `+=${Math.PI * 2}`, duration: LOOP, ease: "none", repeat: -1, onUpdate: place });
      gsap.to(st, { spin: `+=${Math.PI * 2}`, duration: (2 * Math.PI) / SPIN, ease: "none", repeat: -1, onUpdate: setMerid });
      gsap.to(rings, { opacity: 1, duration: 0.4, delay: 0.9 });
      gsap.to(st, { eo: 1, es: 1, rs: 1, duration: 0.55, ease: "power2.out", delay: 0.95, onUpdate: place, onStart: () => { st.es = 0.2; st.rs = 1.25; } });
    },
    /** Envelopes fly into the globe. */
    land() {
      const tl = gsap.timeline();
      tl.to(st, { rs: 0, es: 0.15, duration: 0.45, ease: "power2.in", onUpdate: place }, 0)
        .to(st, { eo: 0, duration: 0.18, ease: "power1.in", onUpdate: place }, 0.3)
        .to(rings, { opacity: 0, duration: 0.3 }, 0)
        .to(globe, { scale: 1.07, duration: 0.14, yoyo: true, repeat: 1, ease: "power2.out", transformOrigin: "50% 50%" }, 0.36)
        .add(() => {
          burst(orbit, s);
          sfx?.pop();
        }, 0.36)
        .add(() => sfx?.land(), 0);
      return tl;
    },
    /** Envelopes fade away (the sign-up failed). */
    leave() {
      const tl = gsap.timeline();
      tl.to(st, { eo: 0, es: 0.3, rs: 1.2, duration: 0.35, ease: "power2.in", onUpdate: place }, 0).to(rings, { opacity: 0, duration: 0.35 }, 0);
      return tl;
    },
    stop() {
      gsap.killTweensOf(st);
    },
  };
}

function burst(orbit: HTMLElement, s: number) {
  for (let i = 0; i < 10; i++) {
    const d = document.createElement("div");
    d.className = "notify-burst";
    d.style.background = i % 2 ? LIME : CREAM;
    orbit.appendChild(d);
    const a = (i / 10) * Math.PI * 2;
    const dist = (150 + Math.random() * 50) * s;
    gsap.fromTo(d, { x: 0, y: 0, scale: 0.4, opacity: 1 }, { x: Math.cos(a) * dist, y: Math.sin(a) * dist, scale: 1, opacity: 0, duration: 0.7, ease: "power2.out", onComplete: () => d.remove() });
  }
}

const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

/**
 * Runs the whole animation. `result` settles when the sign-up has been sent.
 * Resolves with how it ended. `cancelled()` is checked between steps so a
 * closed dialog can stop it.
 */
export async function playMorph(
  refs: MorphRefs,
  result: Promise<MorphResult>,
  cancelled: () => boolean,
  sfx?: Sfx,
): Promise<MorphResult | "cancelled"> {
  const { w, pad } = freeze(refs);
  const orbit = createOrbit(refs, sfx);
  const g = toGlobe(refs, sfx);
  orbit.start();
  // The globe takes about 1.3 s to form; keep it orbiting for about one loop after that.
  const [res] = await Promise.all([result, wait(1300 + LOOP * 1000), g.then()]);
  if (cancelled()) { orbit.stop(); return "cancelled"; }
  if (res === "ok") await orbit.land().then();
  else await orbit.leave().then();
  orbit.stop();
  if (cancelled()) return "cancelled";
  await toCard(refs, res === "ok" ? "done" : "form", w, pad, sfx).then();
  return res;
}
