"use client";
import { useId, useLayoutEffect, useRef, useState } from "react";

const INK = "#141311";

/** A point as a share of the host's width and height. */
export type Pt = [number, number];
/** Bubble outlines, after comic lettering: a full soft speech shape ("oval"), a squarer one ("box"), a puffy cloud for thoughts. */
export type BubbleShape = "oval" | "box" | "cloud";

/** Small deterministic wobble so each bubble looks hand drawn but never jumps between renders. */
function wobble(seed: number) {
  let s = seed * 9301 + 49297;
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 - 0.5; };
}
const f = (n: number) => n.toFixed(1);

function smooth(pts: number[][]) {
  const n = pts.length;
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return d + "Z";
}

function outline(shape: BubbleShape, w: number, h: number, seed: number) {
  const cx = w / 2, cy = h / 2, rx = w / 2, ry = h / 2;
  const rnd = wobble(seed);
  if (shape === "cloud") {
    // many uneven lumps, like a hand-drawn thought cloud
    const n = Math.min(14, Math.max(10, Math.round((w + h) / 30)));
    const pts = Array.from({ length: n }, (_, i) => {
      const a = ((i + rnd() * 0.35) / n) * Math.PI * 2;
      return [cx + rx * 0.9 * Math.cos(a), cy + ry * 0.86 * Math.sin(a)];
    });
    let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
    pts.forEach((p, i) => {
      const q = pts[(i + 1) % n], mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
      const ox = mx - cx, oy = my - cy, ol = Math.hypot(ox, oy) || 1;
      const bulge = Math.hypot(q[0] - p[0], q[1] - p[1]) * (0.38 + rnd() * 0.28);
      d += `Q${f(mx + (ox / ol) * bulge)} ${f(my + (oy / ol) * bulge)} ${f(q[0])} ${f(q[1])}`;
    });
    return d + "Z";
  }
  // speech: a full, soft rounded shape (between an oval and a rounded box) with a slight hand-drawn wobble
  const e = shape === "box" ? 3.4 : 2.6, n = 16;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2, c = Math.cos(a), sn = Math.sin(a), k = 1 + rnd() * 0.035;
    return [cx + rx * k * Math.sign(c) * Math.abs(c) ** (2 / e), cy + ry * k * Math.sign(sn) * Math.abs(sn) ** (2 / e)];
  });
  return smooth(pts);
}

/**
 * Comic bubble drawn as ONE shape (outline plus tail, or cloud plus trailing circles), so the ink line is continuous.
 * It measures itself and aims at `tip` (or the top of the `aim` element): a point just outside the speaker's head.
 */
/**
 * Tail tip at a measured point on a speaker's drawing: `pt` in the avatar's viewBox units ("-60 -5 440 315"),
 * pushed `gap` px along `dir` so the drawn tail (ink included) stops just short of the head.
 */
export type Anchor = { el: string; pt: [number, number]; dir: [number, number]; gap?: number };

export default function ComicBubble({ kind, shape, tip, aim, anchor, cls, show, tone = "#fffdf6", tilt = 0, seed = 1, dashed = false, children }: {
  kind: "say" | "think"; cls: string; show: boolean; tone?: string; children: React.ReactNode;
  /** A whisper: dashed outline (only the listener hears it). */ dashed?: boolean;
  shape?: BubbleShape; tilt?: number; seed?: number;
  /** Tail tip as a share of the host box. */ tip?: Pt;
  /** Or: CSS selector of the speaker inside the host; the tail aims at the top middle of it. */ aim?: string;
  /** Or: an exact point on the speaker's outline. */ anchor?: Anchor;
}) {
  const uid = "cb" + useId().replace(/:/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState<{ w: number; h: number; tx: number; ty: number } | null>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Re-measure whenever layout may have changed: it can run before styles, fonts or images are ready.
    const measure = () => {
      const host = el.offsetParent as HTMLElement | null;
      if (!host || !el.offsetWidth) return;
      const want = Math.round(el.offsetWidth * (kind === "think" ? 0.66 : 0.62));
      if (Math.abs(parseFloat(el.style.minHeight || "0") - want) > 1) el.style.minHeight = `${want}px`;
      let x = 0, y = 0;
      if (anchor) {
        const card = host.querySelector(anchor.el) as HTMLElement | null;
        if (!card || !card.offsetWidth) return;
        let cx = 0, cy = 0;
        for (let n: HTMLElement | null = card; n && n !== host; n = n.offsetParent as HTMLElement | null) { cx += n.offsetLeft; cy += n.offsetTop; }
        const u = card.offsetWidth / 440;
        // the ink line sticks out past the tail tip by half its width, so add that to the gap
        const g = (anchor.gap ?? 2) + (kind === "think" ? 0 : dashed ? 2 : 3.5);
        x = cx + (anchor.pt[0] + 60) * u + anchor.dir[0] * g; y = cy + (anchor.pt[1] + 5) * u + anchor.dir[1] * g;
      } else if (aim) {
        const t = host.querySelector(aim) as HTMLElement | null;
        if (!t) return;
        const hr = host.getBoundingClientRect(), tr = t.getBoundingClientRect(), k = host.offsetWidth / (hr.width || 1);
        x = (tr.left - hr.left + tr.width / 2) * k; y = (tr.top - hr.top) * k + tr.height * k * 0.06;
      } else if (tip) { x = tip[0] * host.clientWidth; y = tip[1] * host.clientHeight; }
      // offsetLeft/Top ignore a CSS translate (used to centre a bubble over its speaker), so add it back
      const tr = (getComputedStyle(el).translate || "").split(" ");
      const px = (v: string | undefined, size: number) => !v || v === "none" ? 0 : v.endsWith("%") ? (parseFloat(v) / 100) * size : parseFloat(v) || 0;
      const ox = px(tr[0], el.offsetWidth), oy = px(tr[1], el.offsetHeight);
      let tx = x - el.offsetLeft - ox, ty = y - el.offsetTop - oy;
      // the bubble is tilted around its transform-origin: turn the target back into the bubble's own frame
      if (tilt) {
        const [px0, py0] = getComputedStyle(el).transformOrigin.split(" ").map(parseFloat);
        const r = (-tilt * Math.PI) / 180, dx = tx - px0, dy = ty - py0;
        tx = px0 + dx * Math.cos(r) - dy * Math.sin(r); ty = py0 + dx * Math.sin(r) + dy * Math.cos(r);
      }
      const next = { w: el.offsetWidth, h: el.offsetHeight, tx, ty };
      setBox((b) => (b && b.w === next.w && b.h === next.h && Math.abs(b.tx - next.tx) < .5 && Math.abs(b.ty - next.ty) < .5 ? b : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    const frames = [requestAnimationFrame(measure), window.setTimeout(measure, 300), window.setTimeout(measure, 1200)];
    document.fonts?.ready.then(measure);
    window.addEventListener("load", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect(); cancelAnimationFrame(frames[0]); window.clearTimeout(frames[1]); window.clearTimeout(frames[2]);
      window.removeEventListener("load", measure); window.removeEventListener("resize", measure);
    };
  }, [tip, aim, kind, anchor, dashed, tilt]);

  const form: BubbleShape = shape ?? (kind === "think" ? "cloud" : "oval");
  let shapes: React.ReactNode = null;
  if (box) {
    const { w, h } = box, cx = w / 2, cy = h / 2, rx = w / 2, ry = h / 2;
    let { tx, ty } = box;
    // Where the tail leaves the bubble: the edge point facing the tip.
    const a = Math.atan2((ty - cy) / ry, (tx - cx) / rx);
    const ex = cx + rx * Math.cos(a), ey = cy + ry * Math.sin(a);
    let ux = tx - ex, uy = ty - ey, ul = Math.hypot(ux, uy);
    const nx = Math.cos(a) / rx, ny = Math.sin(a) / ry, nl = Math.hypot(nx, ny), onx = nx / nl, ony = ny / nl;
    // Never point back into the bubble; a short tail still ends exactly at the tip (so it never runs into the head).
    if (ux * onx + uy * ony < 0 || ul < 4) { ux = onx; uy = ony; ul = 1; tx = ex + onx * 16; ty = ey + ony * 16; }
    else if (ul > 52 && kind === "say") { tx = ex + (ux / ul) * 52; ty = ey + (uy / ul) * 52; }
    const body = <path d={outline(form, w, h, seed)} />;
    let extra: React.ReactNode, tailPath: React.ReactNode = null;
    if (kind === "say") {
      const bx = ex - onx * 10, by = ey - ony * 10, half = Math.min(12, w * 0.07), tnx = -ony, tny = onx;
      const b1 = [bx + tnx * half, by + tny * half], b2 = [bx - tnx * half, by - tny * half];
      const dx = tx - ex, dy = ty - ey, dl = Math.hypot(dx, dy) || 1, qx = (-dy / dl) * 9, qy = (dx / dl) * 9;
      const tailD = `M${f(b1[0])} ${f(b1[1])}Q${f((b1[0] + tx) / 2 + qx)} ${f((b1[1] + ty) / 2 + qy)} ${f(tx)} ${f(ty)}Q${f((b2[0] + tx) / 2 + qx)} ${f((b2[1] + ty) / 2 + qy)} ${f(b2[0])} ${f(b2[1])}`;
      extra = <path d={tailD + "Z"} />;
      tailPath = <path d={tailD} pathLength={100} />;
    } else {
      const L = Math.hypot(tx - ex, ty - ey), dx = (tx - ex) / (L || 1), dy = (ty - ey) / (L || 1);
      const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
      const at = (d: number) => [ex + dx * d, ey + dy * d];
      // the smallest dot ends right at the tip (ink included); the others step back toward the cloud
      const d2 = L - 2.4 - 3, d1 = Math.max(d2 - 18, 9), d0 = Math.max(d1 - 21, 4);
      const dots: [number, number, number][] = [[d0, 6.5, 4.6], [d1, 4.6, 3.3], [d2, 3.2, 2.4]];
      // each dot is its own piece so the thought can grow dot by dot from the head (index 0 is next to the cloud)
      extra = <>{dots.map(([d, a, b], i) => {
        const [x, y] = at(d), rot = `rotate(${f(ang + 90)} ${f(x)} ${f(y)})`;
        return (
          <g key={i} className={`cb-dot cb-d${i}`}>
            <ellipse cx={x} cy={y} rx={a} ry={b} transform={rot} fill={INK} stroke={INK} strokeWidth="6" />
            <ellipse cx={x} cy={y} rx={a} ry={b} transform={rot} fill={tone} />
          </g>
        );
      })}</>;
    }
    shapes = (
      <svg className="hs-shape" width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden="true">
        {kind === "think" ? (
          <>
            {extra}
            <g className="cb-body"><g fill={INK} stroke={INK} strokeWidth="6" strokeLinejoin="round">{body}</g><g fill={tone}>{body}</g></g>
          </>
        ) : dashed ? (
          <>
            {/* one outline for body + tail: each dashed line is hidden where it runs inside the other shape, and nothing is drawn outside */}
            <defs>
              <mask id={`${uid}-nt`} maskUnits="userSpaceOnUse" x={-200} y={-200} width={w + 400} height={h + 400}><rect x={-200} y={-200} width={w + 400} height={h + 400} fill="#fff" /><g fill="#000">{extra}</g></mask>
              <mask id={`${uid}-nb`} maskUnits="userSpaceOnUse" x={-200} y={-200} width={w + 400} height={h + 400}><rect x={-200} y={-200} width={w + 400} height={h + 400} fill="#fff" /><g fill="#000">{body}</g></mask>
            </defs>
            <g fill={tone}>{body}{extra}</g>
            <g fill="none" stroke={INK} strokeWidth="3" strokeDasharray="9 7" strokeLinecap="round" mask={`url(#${uid}-nt)`}>{body}</g>
            <g fill="none" stroke={INK} strokeWidth="3" strokeDasharray="9 7" strokeDashoffset="2.5" strokeLinecap="round" strokeLinejoin="round" mask={`url(#${uid}-nb)`}>{tailPath}</g>
          </>
        ) : (
          <>
            <g fill={INK} stroke={INK} strokeWidth="6" strokeLinejoin="round">{body}{extra}</g>
            <g fill={tone}>{body}{extra}</g>
          </>
        )}
      </svg>
    );
  }
  return (
    <div ref={ref} className={`hs-b b-${form}${kind === "think" ? " is-think" : ""} ${cls}${show ? " show" : ""}`} style={tilt ? { rotate: `${tilt}deg` } : undefined} aria-hidden="true">
      {shapes}
      <span className="hs-txt">{children}</span>
    </div>
  );
}
