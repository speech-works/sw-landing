// Colours for the blob behind an avatar. The blob must stand out from the page it sits on, so the colours are picked in the browser
// from the background of the nearest opaque parent. The first choice is the avatar's own pair; if it is too close to the page colour,
// the next candidates are tried. All colours come from the site palette.
import type { AvatarBlob } from "./avatar-blobs";

export const blobPalette = ["#3B5BA9", "#F6A5C0", "#F58C1B", "#2E8B4E", "#FFE94A", "#A9DDF7", "#F36B4F", "#7B2D86", "#BEDB3C", "#9ED8C4", "#C7B8F0", "#FF9EB5", "#FFF4E6", "#1F2A5C"];
const CREAM = "#FFF4E6";

export type RGB = [number, number, number];
export function parseColour(value: string): { rgb: RGB; alpha: number } | null {
  const m = value.match(/rgba?\(([^)]+)\)/);
  if (!m) return null;
  const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
  return { rgb: [p[0], p[1], p[2]], alpha: p.length > 3 ? p[3] : 1 };
}
export function hexToRgb(hex: string): RGB {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
/** CIE Lab colour difference (dE76): about 2 is just visible, 30 or more is a clear difference. */
function lab([r, g, b]: RGB): [number, number, number] {
  const lin = (v: number) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const R = lin(r), G = lin(g), B = lin(b);
  const x = (0.4124 * R + 0.3576 * G + 0.1805 * B) / 0.95047, y = 0.2126 * R + 0.7152 * G + 0.0722 * B, z = (0.0193 * R + 0.1192 * G + 0.9505 * B) / 1.08883;
  const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
  return [116 * f(y) - 16, 500 * (f(x) - f(y)), 200 * (f(y) - f(z))];
}
export function colourGap(a: RGB, b: RGB): number {
  const p = lab(a), q = lab(b);
  return Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
}
// The limits. The blob colour must differ from the page by MAIN_GAP (CIE Lab dE) and be LIGHT_GAP lighter or darker (Lab L).
// The second colour of a pattern must also show on the page (SECOND_GAP, SECOND_LIGHT), and the two colours must differ from each other (PAIR_GAP).
export const MAIN_GAP = 48, LIGHT_GAP = 16, SECOND_GAP = 30, SECOND_LIGHT = 8, PAIR_GAP = 30;
const NAVY = "#1F2A5C", STEPS = [1, 3, 5, 9, 11, 13];
/** The measured gaps of a pair on a page colour: de, dl for the first colour; de2, dl2 for the second (null for a flat blob); pair = the gap between the two. */
export function blobGaps(c: { a: string; b: string | null }, surface: RGB) {
  const a = hexToRgb(c.a), b = c.b ? hexToRgb(c.b) : null, ls = lab(surface)[0];
  return { de: colourGap(a, surface), dl: Math.abs(lab(a)[0] - ls), de2: b ? colourGap(b, surface) : null, dl2: b ? Math.abs(lab(b)[0] - ls) : null, pair: b ? colourGap(a, b) : null };
}
/** The pair (a, b) for this avatar on this page colour. b is null for a flat blob. The first pair that stands out clearly wins; else the best one.
 *  Each avatar walks the palette in its own order, so the avatars on one page do not all fall back to the same colour. */
export function pickBlobColours(blob: AvatarBlob, surface: RGB, avoid: string[] = []): { a: string; b: string | null } {
  const n = blobPalette.length, start = Math.max(0, blobPalette.indexOf(blob.a)), step = STEPS[(blob.d.length + start) % STEPS.length];
  const firsts = [blob.a, ...Array.from({ length: n - 1 }, (_, k) => blobPalette[(start + (k + 1) * step) % n])];
  const seconds = blob.kind === "flat" ? [null] : [...new Set([blob.b ?? CREAM, CREAM, NAVY, "#FFE94A", "#F6A5C0", "#A9DDF7", "#3B5BA9", "#2E8B4E"])];
  let best = { a: blob.a, b: blob.kind === "flat" ? null : blob.b }, bestRank = -1;
  const passing: { a: string; b: string | null }[] = [];
  for (const a of firsts) for (const b of seconds) {
    if (b === a) continue;
    const g = blobGaps({ a, b }, surface);
    const rank = Math.min(g.de / MAIN_GAP, g.dl / LIGHT_GAP, b ? g.de2! / SECOND_GAP : 9, b ? g.dl2! / SECOND_LIGHT : 9, b ? g.pair! / PAIR_GAP : 9);
    if (rank >= 1 && avoid.includes(a)) continue;      // a neighbour in the same row already uses this colour: the blobs would merge
    if (rank >= 1) { if (a === blob.a) return { a, b }; if (!passing.some((p) => p.a === a)) passing.push({ a, b }); }      // the avatar's own colour wins when it stands out
    if (rank > bestRank) { best = { a, b }; bestRank = rank; }
  }
  if (passing.length) return passing[[...blob.d.slice(0, 60)].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) % 9973, 7) % passing.length];      // else one of the colours that stand out, spread over the avatars
  return best;
}
