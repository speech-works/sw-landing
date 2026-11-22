"use client";

import { forwardRef, useId, useImperativeHandle, useMemo, useRef } from "react";
import { gsap } from "@/lib/motion";
import { mailmanFace as F } from "@/lib/mailman-face.generated";

// The mailman's head, cap and moustache stay still. Only his eyes, brows and
// mouth move, so he can change expression smoothly. The shapes below come from
// the same artwork as the still faces (artwork/avatars/kit.cjs).

export type Expression =
  | "steady"
  | "inquisitive"
  | "effort"
  | "excited"
  | "gleeful"
  | "laughing"
  | "joyful";

type Shape = { d: string; fill: string; fo: number; w: number; so: number };
type Look = {
  /** Top edge of the visible eye: 100 wide open, 152 half closed, 200 shut. */
  lid: number;
  gaze: [number, number];
  arcs: number;
  browL: { d: string; w: number };
  browR: { d: string; w: number };
  mouth: Shape;
  teeth: Shape;
  tongue: Shape;
  creases: number;
  sparkles: number;
};

const NONE = (d: string): Shape => ({ d, fill: "#FFF8EF", fo: 0, w: 0, so: 0 });
const DOT = "M161 229L162 229L161 230Z";
const stroke = (d: string, w = 4): Shape => ({ d, fill: "#252128", fo: 0, w, so: 1 });
const solid = (d: string, fill: string, w: number): Shape => ({ d, fill, fo: 1, w, so: 1 });
const part = (d: string, fill: string, line = 0): Shape => ({ d, fill, fo: 1, w: line, so: line ? 1 : 0 });

const LOOKS: Record<Expression, Look> = {
  steady: {
    lid: 152, gaze: [-10.5, -1.5], arcs: 0,
    browL: { d: "M93 152L137 152", w: 5.5 }, browR: { d: "M187 152L233 152", w: 5.5 },
    mouth: stroke("M149 228Q161 234 173 228"),
    teeth: NONE(DOT), tongue: NONE(DOT), creases: 0, sparkles: 0,
  },
  inquisitive: {
    lid: 100, gaze: [-14, -4], arcs: 0,
    browL: { d: "M99 129Q111 135 124 130", w: 4.5 }, browR: { d: "M196 119Q210 111 224 119", w: 4.5 },
    mouth: solid("M167 218C162 217 156 221 158 227C161 232 169 232 172 228C176 221 172 218 167 218Z", "#252128", 2),
    teeth: NONE(DOT), tongue: NONE(DOT), creases: 0, sparkles: 0,
  },
  effort: {
    lid: 100, gaze: [-10, 1], arcs: 0,
    browL: { d: "M96 133Q113 126 133 142", w: 4.5 }, browR: { d: "M192 142Q211 125 229 133", w: 4.5 },
    mouth: solid("M137 217Q159 205 185 217L184 228Q160 224 138 229Z", "#FFF9EC", 3.5),
    teeth: { d: "M140 221Q161 216 182 221", fill: "#FFF9EC", fo: 0, w: 2.2, so: 1 },
    tongue: NONE(DOT), creases: 1, sparkles: 0,
  },
  excited: {
    lid: 100, gaze: [-8, -3], arcs: 0,
    browL: { d: "M99 127Q111 115 125 122", w: 4.5 }, browR: { d: "M197 123Q211 113 224 121", w: 4.5 },
    mouth: solid("M141 209Q163 217 187 207C185 232 174 245 162 243C149 241 140 225 141 209Z", "#221E25", 2.8),
    teeth: part("M148 215Q163 220 180 213L179 220Q162 225 150 220Z", "#FFF8EF"),
    tongue: part("M153 234C159 227 169 227 176 236C169 244 160 243 153 234Z", "#EC798C"),
    creases: 0, sparkles: 0,
  },
  gleeful: {
    lid: 100, gaze: [-5, -4], arcs: 0,
    browL: { d: "M98 124Q112 115 126 122", w: 4.5 }, browR: { d: "M197 119Q211 108 224 118", w: 4.5 },
    mouth: solid("M137 211C151 217 173 213 190 202C190 227 178 243 164 244C149 244 138 228 137 211Z", "#252129", 2.5),
    teeth: part("M144 217C158 222 173 215 182 211L181 220C169 226 156 228 146 222Z", "#FFF8EB"),
    tongue: part("M154 237C162 229 174 228 182 232C175 243 163 246 154 237Z", "#EE86A0"),
    creases: 0, sparkles: 1,
  },
  laughing: {
    lid: 200, gaze: [-10.5, -1.5], arcs: 1,
    browL: { d: "M101 126Q111 120 123 122", w: 4.5 }, browR: { d: "M196 123Q210 116 222 122", w: 4.5 },
    mouth: solid("M139 208C151 212 177 208 190 201C191 223 179 241 164 243C149 244 140 230 139 208Z", "#201D24", 3),
    teeth: part("M145 214C159 216 172 212 183 209L180 217C168 223 154 223 148 219Z", "#FFFFFF"),
    tongue: part("M151 234C159 223 172 225 182 233C175 242 161 245 151 234Z", "#EF7890"),
    creases: 0, sparkles: 0,
  },
  joyful: {
    lid: 200, gaze: [-10.5, -1.5], arcs: 1,
    browL: { d: "M100 128Q111 122 123 127", w: 4.5 }, browR: { d: "M197 126Q210 121 222 127", w: 4.5 },
    mouth: stroke("M138 223Q161 243 184 223", 4.4),
    teeth: NONE(DOT), tongue: NONE(DOT), creases: 0, sparkles: 0,
  },
};

// Some parts live in the nose / cheek area for the gritted-teeth look and the sparkles.
const CREASE_D = "M146 133L149 144M174 133L171 144";
const CHEEK_D = "M128 211Q123 221 129 232M193 211Q199 221 193 232";
const SPARKLE_D = "M95 151L90 145M96 147L94 140M228 149L234 143M226 144L230 137";

let morphReady = false;
let morphLoading: Promise<void> | null = null;
/** Loads the shape-morphing plugin. Call it before the animation needs it (for example when the dialog opens). */
export function loadMorph() {
  if (morphReady) return Promise.resolve();
  morphLoading ??= import("gsap/MorphSVGPlugin")
    .then(({ MorphSVGPlugin }) => {
      gsap.registerPlugin(MorphSVGPlugin);
      morphReady = true;
    })
    .catch(() => {
      // Without the plugin the face still changes, it just cuts instead of morphing.
    });
  return morphLoading;
}

export type IdleHandle = {
  /** Look down at the email box and stay there (the visitor is typing). */
  lookAtInput: () => void;
  /** Go back to glancing between the box and the visitor. */
  resume: () => void;
  /** Stop and return to the resting face. */
  stop: () => void;
};

export type FaceHandle = {
  /** Smoothly change to another expression. Returns a timeline you can add to your own. */
  to: (name: Expression, duration?: number, ease?: string) => gsap.core.Timeline;
  /** Change at once, with no animation. */
  set: (name: Expression) => void;
  /** Wait for the visitor: blink, glance at the email box, then look back up. */
  idle: () => IdleHandle;
};

type Props = { initial?: Expression; className?: string };

const MailmanFace = forwardRef<FaceHandle, Props>(function MailmanFace(
  { initial = "steady", className },
  ref,
) {
  const uid = useId().replace(/:/g, "");
  const markup = useMemo(
    () => ({
      still: (F.defs + F.pre).replaceAll("mf-", `mf${uid}-`),
      post: F.post.replaceAll("mf-", `mf${uid}-`),
    }),
    [uid],
  );
  const els = {
    lid: useRef<SVGRectElement>(null),
    pupilL: useRef<SVGGElement>(null),
    pupilR: useRef<SVGGElement>(null),
    arcs: useRef<SVGPathElement>(null),
    browL: useRef<SVGPathElement>(null),
    browR: useRef<SVGPathElement>(null),
    mouth: useRef<SVGPathElement>(null),
    teeth: useRef<SVGPathElement>(null),
    tongue: useRef<SVGPathElement>(null),
    creases: useRef<SVGGElement>(null),
    sparkles: useRef<SVGPathElement>(null),
  };
  const start = LOOKS[initial];

  useImperativeHandle(ref, () => {
    const q = () => ({
      lid: els.lid.current, pupilL: els.pupilL.current, pupilR: els.pupilR.current,
      arcs: els.arcs.current, browL: els.browL.current, browR: els.browR.current,
      mouth: els.mouth.current, teeth: els.teeth.current, tongue: els.tongue.current,
      creases: els.creases.current, sparkles: els.sparkles.current,
    });

    const setNow = (name: Expression) => {
      const L = LOOKS[name];
      const e = q();
      if (!e.lid || !e.mouth || !e.teeth || !e.tongue || !e.browL || !e.browR || !e.arcs || !e.pupilL || !e.pupilR || !e.creases || !e.sparkles) return;
      gsap.killTweensOf(Object.values(e));
      gsap.set(e.lid, { attr: { y: L.lid } });
      gsap.set([e.pupilL, e.pupilR], { x: L.gaze[0], y: L.gaze[1] });
      gsap.set(e.arcs, { opacity: L.arcs });
      gsap.set([e.browL, e.browR], { y: 0 });
      gsap.set(e.browL, { attr: { d: L.browL.d, "stroke-width": L.browL.w } });
      gsap.set(e.browR, { attr: { d: L.browR.d, "stroke-width": L.browR.w } });
      (["mouth", "teeth", "tongue"] as const).forEach((k) => {
        const s = L[k];
        gsap.set(e[k], { attr: { d: s.d, "stroke-width": s.w }, fill: s.fill, fillOpacity: s.fo, strokeOpacity: s.so });
      });
      gsap.set(e.creases, { opacity: L.creases });
      gsap.set(e.sparkles, { opacity: L.sparkles });
    };

    const build = (name: Expression, duration = 0.3, ease = "power2.inOut") => {
      const L = LOOKS[name];
      const e = q();
      const tl = gsap.timeline({ defaults: { duration, ease } });
      if (!e.lid || !e.mouth || !e.teeth || !e.tongue || !e.browL || !e.browR || !e.arcs || !e.pupilL || !e.pupilR || !e.creases || !e.sparkles) return tl;
      tl.to([e.browL, e.browR], { y: 0 }, 0)
        .to(e.lid, { attr: { y: L.lid } }, 0)
        .to([e.pupilL, e.pupilR], { x: L.gaze[0], y: L.gaze[1] }, 0)
        // The closed-eye arcs appear as the lids come down, and leave as they lift.
        .to(e.arcs, { opacity: L.arcs, duration: duration * 0.5, delay: L.arcs ? duration * 0.5 : 0 }, 0);
      const shape = (el: SVGPathElement, d: string, extra: gsap.TweenVars = {}) =>
        morphReady ? tl.to(el, { morphSVG: { shape: d, shapeIndex: "auto" }, ...extra }, 0) : tl.set(el, { attr: { d }, ...extra }, duration / 2);
      shape(e.browL, L.browL.d, { attr: { "stroke-width": L.browL.w } });
      shape(e.browR, L.browR.d, { attr: { "stroke-width": L.browR.w } });
      shape(e.mouth, L.mouth.d, { attr: { "stroke-width": L.mouth.w }, fill: L.mouth.fill, fillOpacity: L.mouth.fo, strokeOpacity: L.mouth.so });
      // Teeth and tongue: if they are already showing, morph. If they are about to appear, place them first and fade in.
      (["teeth", "tongue"] as const).forEach((k) => {
        const s = L[k];
        const el = e[k] as SVGPathElement;
        const showing = Number(gsap.getProperty(el, "fillOpacity")) > 0.05 || Number(gsap.getProperty(el, "strokeOpacity")) > 0.05;
        if (s.fo > 0 || s.so > 0) {
          if (!showing) {
            tl.set(el, { attr: { d: s.d, "stroke-width": s.w }, fill: s.fill }, 0);
          } else {
            shape(el, s.d, { attr: { "stroke-width": s.w }, fill: s.fill });
          }
          tl.to(el, { fillOpacity: s.fo, strokeOpacity: s.so, duration: duration * 0.6, delay: showing ? 0 : duration * 0.3 }, 0);
        } else {
          tl.to(el, { fillOpacity: 0, strokeOpacity: 0, duration: duration * 0.5 }, 0);
        }
      });
      tl.to(e.creases, { opacity: L.creases }, 0).to(e.sparkles, { opacity: L.sparkles }, 0);
      return tl;
    };

    // The change is built at the moment it starts, so it begins from whatever the face looks like then.
    const to = (name: Expression, duration = 0.3, ease = "power2.inOut") => {
      const wrap = gsap.timeline();
      wrap.call(() => void build(name, duration, ease), [], 0).to({}, { duration }, 0);
      return wrap;
    };

    const idle = (): IdleHandle => {
      const e = q();
      const none: IdleHandle = { lookAtInput: () => {}, resume: () => {}, stop: () => {} };
      if (!e.lid || !e.pupilL || !e.pupilR || !e.browL || !e.browR) return none;
      const { lid, pupilL, pupilR, browL, browR } = e;
      const pupils = [pupilL, pupilR];
      const brows = [browL, browR];
      const rest = LOOKS.steady;
      const DOWN = 9;
      // His pupils can move about 9 px either side of centre before they leave the eye.
      const SCAN_LEFT = rest.gaze[0] - 9;
      const SCAN_RIGHT = rest.gaze[0] + 9;
      const blink = (tl: gsap.core.Timeline, at: number) =>
        tl.to(lid, { attr: { y: 190 }, duration: 0.08, ease: "power1.in" }, at).to(lid, { attr: { y: rest.lid }, duration: 0.14, ease: "power1.out" }, at + 0.08);
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power2.inOut" } });
      blink(tl, 0.7);
      // Look down at the left end of the email box, then read along it to the right end.
      tl.to(pupils, { x: SCAN_LEFT, y: DOWN, duration: 0.28 }, 1.6)
        .to(lid, { attr: { y: rest.lid + 7 }, duration: 0.28 }, 1.6)
        .to(pupils, { x: SCAN_RIGHT, duration: 2.3, ease: "sine.inOut" }, 2.0)
        // Back up at the visitor, with a small eyebrow lift: "go on".
        .to(pupils, { x: rest.gaze[0], y: rest.gaze[1], duration: 0.28 }, 4.5)
        .to(lid, { attr: { y: rest.lid }, duration: 0.28 }, 4.5)
        .to(brows, { y: -4, duration: 0.16, ease: "power2.out" }, 4.7)
        .to(brows, { y: 0, duration: 0.3 }, 5.05);
      blink(tl, 5.6);
      tl.to({}, { duration: 0.2 }, 6.4);
      let extra: gsap.core.Timeline | null = null;
      let later: gsap.core.Tween | null = null;
      const clear = () => {
        extra?.kill();
        later?.kill();
        extra = null;
        later = null;
      };
      const settle = (dur: number) =>
        gsap
          .timeline()
          .to(pupils, { x: rest.gaze[0], y: rest.gaze[1], duration: dur, ease: "power2.out" }, 0)
          .to(lid, { attr: { y: rest.lid }, duration: dur }, 0)
          .to(brows, { y: 0, duration: dur }, 0);
      return {
        lookAtInput: () => {
          clear();
          tl.pause();
          extra = gsap
            .timeline()
            .to(pupils, { x: rest.gaze[0], y: DOWN, duration: 0.25, ease: "power2.out" }, 0)
            .to(lid, { attr: { y: rest.lid + 7 }, duration: 0.25 }, 0)
            .to(brows, { y: 0, duration: 0.2 }, 0);
        },
        resume: () => {
          clear();
          extra = settle(0.2);
          later = gsap.delayedCall(0.2, () => tl.restart());
        },
        stop: () => {
          clear();
          tl.kill();
          settle(0.15);
        },
      };
    };

    return { to, set: setNow, idle };
    // The refs are stable, so this only needs to run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mouthProps = (s: Shape) => ({ d: s.d, fill: s.fill, fillOpacity: s.fo, strokeWidth: s.w, strokeOpacity: s.so });

  return (
    <svg
      className={className}
      viewBox={F.viewBox}
      preserveAspectRatio="xMidYMin slice"
      fill="none"
      stroke={F.ink}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <g dangerouslySetInnerHTML={{ __html: markup.still }} />
      <clipPath id={`lid${uid}`}>
        <rect ref={els.lid} x="60" y={start.lid} width="200" height="160" />
      </clipPath>
      <g clipPath={`url(#lid${uid})`}>
        <g dangerouslySetInnerHTML={{ __html: F.whiteL + F.whiteR }} />
        <g ref={els.pupilL} style={{ transform: `translate(${start.gaze[0]}px, ${start.gaze[1]}px)` }} dangerouslySetInnerHTML={{ __html: F.pupilL }} />
        <g ref={els.pupilR} style={{ transform: `translate(${start.gaze[0]}px, ${start.gaze[1]}px)` }} dangerouslySetInnerHTML={{ __html: F.pupilR }} />
      </g>
      <path ref={els.arcs} d={F.arcs} strokeWidth={5} opacity={start.arcs} />
      <path ref={els.browL} d={start.browL.d} strokeWidth={start.browL.w} />
      <path ref={els.browR} d={start.browR.d} strokeWidth={start.browR.w} />
      <g ref={els.creases} opacity={start.creases} strokeWidth={2.2}>
        <path d={CREASE_D} opacity={0.6} />
        <path d={CHEEK_D} opacity={0.65} />
      </g>
      <path ref={els.sparkles} d={SPARKLE_D} strokeWidth={2.6} opacity={start.sparkles} />
      <path ref={els.mouth} {...mouthProps(start.mouth)} />
      <path ref={els.teeth} {...mouthProps(start.teeth)} />
      <path ref={els.tongue} {...mouthProps(start.tongue)} />
      <g dangerouslySetInnerHTML={{ __html: markup.post }} />
    </svg>
  );
});

export default MailmanFace;
