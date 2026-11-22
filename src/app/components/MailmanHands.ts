import { gsap } from "@/lib/motion";
import { mailmanHands as DEFAULT_HANDS, type MailmanHands } from "@/lib/mailman-hands.generated";
import { beatChin, beatHeart, beatWave, handFrame, sio, type Beat, type Strip } from "@/lib/mailman-hands-core";

// The hands of the Notify dialog mailman: Wave hello (kit moment h-wave) and Heart hands (kit moment h-heart).
// The drawings, the sleeve, the cuff, the seam and the shadows are the characters kit's own hand layer
// (sw-characters: web/scripts/export_hands.mjs writes src/lib/mailman-hands.generated.ts and mailman-hands-core.ts).
// This file only gives each frame's numbers to those elements: the same job as the kit's web drawer.
// The hands come from below and stay inside the round frame, like in the kit's own round badge.
// It never plays by itself, and it never changes the face: the dialog decides when and with which expression.

export type HandsHandle = {
  /** Wave hello, the whole moment (about 3.25 s): the arm rises from below, waves, lowers. */
  wave: () => gsap.core.Timeline;
  /** Heart hands, the whole moment (about 2.6 s): the hands rise from below, pulse, lower. */
  heart: () => gsap.core.Timeline;
  /** Hand at the chin, the whole moment (about 3 s): a thinking hand rises from below, nods, lowers. Only for figures exported with chin=1. */
  chin: () => gsap.core.Timeline;
  /** Lower any hands smoothly from where they are. Resolves when they are down. */
  stop: () => Promise<void>;
};

type Kind = "wave" | "heart" | "chin";
const KINDS: Kind[] = ["wave", "heart", "chin"];
/** The name of each hand drawing in the exported layer. */
const ART: Record<Kind, string> = { wave: "wave", heart: "heart3", chin: "chin" };
/** When a moment starts while its hands are still up, the old pose and the new one are mixed for this long (ms). */
const BLEND_MS = 260;
/** Time to lower the hands on stop() (s). */
const LOWER_S = 0.42;

/** The hand layer as SVG text, for the same <svg> as the figure. All of it is hidden until a moment plays. */
export function handsMarkup(uid: string, H: MailmanHands = DEFAULT_HANDS) {
  return `<g data-hands="1" transform="${H.stageT}">${H.layer.replace(/(id="|url\(#|href="#)cd\d+/g, `$1mh${uid}`)}</g>`;
}

const mx = (m: number[]) => `matrix(${m.map((v) => +v.toFixed(5)).join(" ")})`;
const beatOf = (k: Kind, ms: number): Beat => (k === "wave" ? beatWave(ms) : k === "chin" ? beatChin(ms) : beatHeart(ms));
const mix = (a: Beat, b: Beat, t: number): Beat => {
  const l = (x: number, y: number) => x + (y - x) * t;
  return { ...b, up: l(a.up, b.up), spread: l(a.spread, b.spread), dy: l(a.dy, b.dy), dfa: l(a.dfa, b.dfa), dha: l(a.dha, b.dha), sk: l(a.sk, b.sk), pop: l(a.pop, b.pop), plush: l(a.plush, b.plush) };
};

export function createHands(svg: SVGSVGElement, uid: string, H: MailmanHands = DEFAULT_HANDS): HandsHandle {
  const root = svg.querySelector('[data-hands="1"]');
  const p = `mh${uid}`;
  const q = (s: string) => (root ? root.querySelector(s) : null);
  const parts = KINDS.map((k, i) => ({
    g: q(`[data-hand="${ART[k]}"]`),
    clip: q(`#${p}h${i} path`),
    sleeve: root?.querySelectorAll("[data-arm]")[i] ?? null,
    cuffClip: q(`#${p}c${i} path`),
    cuff: root?.querySelectorAll("[data-cuff]")[i] ?? null,
    shadow: q(`path[fill="url(#${p}sg${i})"]`),
    shadowGrad: q(`#${p}sg${i}`),
    seam: q(`path[stroke="url(#${p}mg${i})"]`),
    seamGrad: q(`#${p}mg${i}`),
    plush: i === 1 ? q("[data-plush]") : null,
  }));
  // No heart (and no pink glow) between the hands: the hands alone make the heart shape.
  root?.querySelector("[data-plush]")?.setAttribute("display", "none");
  parts[1].g?.querySelector(":scope > circle")?.setAttribute("display", "none");
  // arm contact shadow (wave only): one silhouette of each hand drawing in each region; the wave one is the first of each pair
  const armShadow = q("[data-armshadow]");
  const nArts = root ? Math.max(1, root.querySelectorAll("[data-hand]").length) : 1;
  const armShadowHands = root ? Array.from(root.querySelectorAll("[data-shadow-hand]")).filter((_e, i) => i % nArts === 0) : [];

  const set = (e: Element | null, k: string, v: string) => {
    if (e && e.getAttribute(k) !== v) e.setAttribute(k, v);
  };
  const strip = (el: Element | null, gr: Element | null, s: Strip) => {
    set(el, "display", s.on ? "inline" : "none");
    if (!s.on) return;
    set(el, "d", s.d);
    set(gr, "x1", String(s.x1));
    set(gr, "y1", String(s.y1));
    set(gr, "x2", String(s.x2));
    set(gr, "y2", String(s.y2));
  };

  const state: Record<Kind, { b: Beat | null; tw: gsap.core.Tween | null }> = { wave: { b: null, tw: null }, heart: { b: null, tw: null }, chin: { b: null, tw: null } };

  /** One frame of one moment: the kit's maths gives the numbers, the elements get them (the kit web drawer does the same). */
  const draw = (k: Kind, b: Beat) => {
    state[k].b = b;
    const M = H[k] as NonNullable<(typeof H)[Kind]>;
    const e = parts[KINDS.indexOf(k)];
    const show = b.up > 0;
    const s = handFrame(M.hands[0], M.variantA, b, show, H.shoulder, M.shadow);
    const disp = show ? "inline" : "none";
    set(e.g, "display", disp);
    set(e.sleeve, "display", disp);
    set(e.cuff, "display", disp);
    set(e.g, "transform", s.transform);
    if (e.plush && s.plush) {
      const g = s.plush[0];
      const u = Math.max(0, Math.min(1, (g - 1) / 0.08));
      const beat = H.plushBeat === null ? null : 1 + H.plushBeat * u;
      set(e.plush, "transform", beat === null ? mx(s.plush) : mx([beat, 0, 0, beat, 1168 * (1 - beat), 515 * (1 - beat)]));
    }
    if (k === "wave") {
      const on = show && s.armShadow.on;
      set(armShadow, "display", on ? "inline" : "none");
      armShadowHands.forEach((hg) => {
        set(hg, "display", on ? "inline" : "none");
        if (on) set(hg, "transform", mx(s.armShadow.matrix));
      });
    }
    if (!show) {
      set(e.shadow, "display", "none");
      set(e.seam, "display", "none");
      return;
    }
    set(e.clip, "d", s.clip);
    set(e.sleeve, "d", s.sleeve);
    set(e.cuffClip, "d", s.sleeve);
    set(e.cuff, "d", s.cuff);
    strip(e.shadow, e.shadowGrad, s.shadow);
    strip(e.seam, e.seamGrad, s.seam);
  };

  /** Lower the hands of one moment from the pose they have now (the same path they rose on). */
  const lower = (k: Kind, seconds = LOWER_S): number => {
    const s = state[k];
    s.tw?.kill();
    s.tw = null;
    const b0 = s.b;
    if (!b0 || b0.up <= 0) return 0;
    const o = { p: 0 };
    const tw: gsap.core.Tween = gsap.to(o, {
      p: 1,
      duration: seconds,
      ease: "sine.inOut",
      onUpdate: () => draw(k, { ...b0, up: b0.up * (1 - o.p) }),
      onComplete: () => {
        draw(k, { ...b0, up: 0 });
        if (s.tw === tw) s.tw = null;
      },
    });
    s.tw = tw;
    return seconds;
  };

  const play = (k: Kind) => {
    const M = H[k] as NonNullable<(typeof H)[Kind]>;
    const s = state[k];
    const o = { t: 0 };
    let from: Beat | null = null;
    const tl = gsap.timeline();
    const tw: gsap.core.Tween = gsap.to(o, {
      t: M.dur,
      duration: M.dur / 1000,
      ease: "none",
      onStart: () => {
        KINDS.forEach((o2) => o2 !== k && lower(o2, 0.3)); // the other hands go down while these come up
        if (s.tw && s.tw !== tw) s.tw.kill();
        s.tw = tw;
        from = s.b && s.b.up > 0 ? s.b : null; // these hands are still up: start from the pose they have (nothing jumps)
      },
      onUpdate: () => {
        if (s.tw !== tw) return;
        let b = beatOf(k, Math.max(0.01, o.t));
        if (o.t >= M.dur) b = { ...b, up: 0 };
        if (from && o.t < BLEND_MS) b = mix(from, b, sio(o.t / BLEND_MS));
        draw(k, b);
      },
      onComplete: () => {
        if (s.tw === tw) s.tw = null;
      },
    });
    tl.add(tw, 0);
    return tl;
  };

  return {
    wave: () => play("wave"),
    heart: () => play("heart"),
    chin: () => play("chin"),
    stop: () =>
      new Promise<void>((done) => {
        const wait = Math.max(...KINDS.map((k) => lower(k)));
        if (wait) gsap.delayedCall(wait, done);
        else done();
      }),
  };
}

/** For a check in the browser console only: the largest gap between this copy of the maths and the kit's own answers. */
export function handsSelfCheck() {
  const H = DEFAULT_HANDS;
  let worst = 0;
  const nums = (t: string) => (t.match(/-?\d+\.?\d*(?:e-?\d+)?/g) ?? []).map(Number);
  for (const k of KINDS.filter((x): x is "wave" | "heart" => x !== "chin")) {
    for (const [ms, want] of H.check[k]) {
      const got = handFrame(H[k].hands[0], H[k].variantA, beatOf(k, ms), true, H.shoulder, H[k].shadow);
      for (const [a, b] of [[got.transform, want.transform], [got.sleeve, want.sleeve], [got.cuff, want.cuff], [got.seam.d, want.seam]] as [string, string][]) {
        const x = nums(a);
        const y = nums(b);
        if (x.length !== y.length) return Infinity;
        x.forEach((v, i) => { worst = Math.max(worst, Math.abs(v - y[i])); });
      }
    }
  }
  return worst;
}
