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
const MAIN_GAP = 48, SECOND_GAP = 10, LIGHT_GAP = 14;      // the blob colour must differ from the page by at least this much (dE), its second colour a little less
/** The pair (a, b) for this avatar on this page colour. b is null for a flat blob. The first pair that stands out clearly wins; else the best one. */
export function pickBlobColours(blob: AvatarBlob, surface: RGB): { a: string; b: string | null } {
  const start = Math.max(0, blobPalette.indexOf(blob.a));
  const seconds = (first: string | null) => (blob.kind === "flat" ? [null] : [first, CREAM, "#FFFFFF", "#2B2A2E"]);
  const candidates: { a: string; b: string | null }[] = [];
  for (let k = 0; k < blobPalette.length; k++) {
    const a = k === 0 ? blob.a : blobPalette[(start + k) % blobPalette.length];
    for (const b of seconds(k === 0 ? blob.b : blobPalette[(start + k + 5) % blobPalette.length])) candidates.push({ a, b });
  }
  let best = candidates[0], bestRank = -1;
  for (const c of candidates) {
    const ga = colourGap(hexToRgb(c.a), surface), gb = c.b ? colourGap(hexToRgb(c.b), surface) : 1e9;
    const dl = Math.abs(lab(hexToRgb(c.a))[0] - lab(surface)[0]);       // the blob must also be clearly lighter or darker than the page, not only another hue
    if (ga >= MAIN_GAP && gb >= SECOND_GAP && dl >= LIGHT_GAP) return c;
    const rank = Math.min(ga / MAIN_GAP, gb / SECOND_GAP, dl / LIGHT_GAP);
    if (rank > bestRank) { best = c; bestRank = rank; }
  }
  return best;
}
