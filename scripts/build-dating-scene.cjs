// Builds src/lib/dating-scene.generated.ts for the Dating and relationships page (two people, two paper boats).
// Scene units = the approved storyboard (sw-characters/native/prototype/shots/s22/site-avatars/cards-anim/dating-cups/build.cjs): viewBox -60 -50 820 470.
// She is drawn at (0,40) scale 1; he at (392.2,28) scale .88. One shared blob (wavy ellipse); the pond is its lower part.
const fs = require("fs"), path = require("path");
// one big, plump heart (soft rounded bottom, shallow dip, wide lobes) that holds both people. Their heads reach a little past the outer edge (the head line is not cut).
const cx = 346, P = [];
const KY = 1.297, SY = (y) => -170 + (y + 34) * KY;   // the heart is stretched upward (the picture is taller now)
const bez = (p0, p1, p2, p3, n = 80) => { [p0, p1, p2, p3] = [p0, p1, p2, p3].map((q) => [q[0], SY(q[1])]); for (let i = 0; i < n; i++) { const t = i / n, u = 1 - t; P.push([u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0], u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1]]); } };
const m = (p) => [2 * cx - p[0], p[1]];
const D = [cx, 56], TP = [548, -34], R = [738, 128], B = [cx, 424];
bez(D, [cx + 26, 6], [cx + 110, -34], TP);
bez(TP, [640, -34], [738, 40], R);
bez(R, [738, 250], [520, 380], B);
bez(B, m([520, 380]), m([738, 250]), m(R));
bez(m(R), m([738, 40]), m([640, -34]), m(TP));
bez(m(TP), m([cx + 110, -34]), m([cx + 26, 6]), D);
const WDX = 12, MDX = 30;   // how far the two figures are moved out from the old places
const poly = (f) => "M" + P.map(([x, y]) => { const [u, v] = f(x, y); return u.toFixed(1) + " " + v.toFixed(1); }).join("L") + "Z";
const blob = poly((x, y) => [x, y]);
const cutWoman = poly((x, y) => [x - WDX, y - 40]) + `M${-80 - WDX} 140H${230 - WDX}V${264 - 40}H${-80 - WDX}Z`;   // her hair may hang a little past the left edge, down to where it ends
const cutMan = poly((x, y) => [(x - 392.2 - MDX) / 0.88, (y - 28) / 0.88]);
const THEMES = {
  night: { sky: ["#0A0E2E", "#151B4D", "#2A2F72", "#4A3E8C"], sea: ["#26306E", "#121842"], W: "#0B1033", gold: "#FFC94A", glit: "#FFC94A", cloud: "#3A4290", cloudO: 1, decor: "#9FB0FF", extra: "" },
  sunset: { sky: ["#F7A9A0", "#F58E8B", "#F6B27A", "#FFD9A0"], sea: ["#E96F7E", "#B24A7C"], W: "#6A2B4F", gold: "#FFF4D6", glit: "#FFE9A8", cloud: "#FFE3D3", cloudO: 0.75, decor: "#FFD2C2", extra: "sun" },
  dusk: { sky: ["#6D63C9", "#A58BE0", "#E7A3CF", "#FFD1C4"], sea: ["#8F7AD8", "#5B4BB0"], W: "#3A2F80", gold: "#FFF1C9", glit: "#FFE9A8", cloud: "#F4E2FA", cloudO: 0.6, decor: "#E9DBFF", extra: "" },
  paper: { sky: ["#FFF3DC", "#FFF3DC", "#FFF3DC", "#FFF3DC"], sea: ["#6FD0C4", "#3FB6A8"], W: "#242329", gold: "#F2B93B", glit: "#E6F9F4", cloud: "#FFFFFF", cloudO: 0, decor: "#DDF6F2", extra: "hearts" },
};
THEMES.heart = { sky: ["#EA5A52", "#E8534F", "#E64F4E", "#E24A4D"], sea: ["#C23845", "#A32A3B"], W: "#B23038", gold: "#FFF4D6", glit: "#FFE9A8", cloud: "#FFFFFF", cloudO: 0, decor: "#F08A84", extra: "" };
const T = THEMES[process.env.THEME || "heart"];
const K = "#242329", J = 'stroke-linejoin="round" stroke-linecap="round"';
const wave = "M-160 322 q20 -12 40 0" + " t40 0".repeat(23) + " V470 H-160Z";
const decor = "M-60 308 q20 -8 40 0 t40 0 M40 332 q20 -8 40 0 t40 0 M200 314 q20 -8 40 0 t40 0 M300 342 q20 -8 40 0 t40 0 M-70 354 q20 -8 40 0 t40 0 M440 310 q20 -8 40 0 t40 0 M560 340 q20 -8 40 0 t40 0 M660 316 q20 -8 40 0 t40 0";
const W = T.W;
const water = `<path d="${wave}" fill="url(#dt-sea)"/>`;
const boat = (id, col) => `<g id="${id}"><g id="${id}-b"><path d="M-40 -40 L0 -112 L40 -40Z" fill="#FFF8F0" stroke="${K}" stroke-width="4" ${J}/><path d="M0 -112 L40 -40 L0 -40Z" fill="#E6DCCF" stroke="${K}" stroke-width="4" ${J}/><path d="M-54 -40 L54 -40 L34 2 L-34 2Z" fill="${col}" stroke="${K}" stroke-width="4" ${J}/><path d="M-34 -20 L34 -20" stroke="${K}" stroke-width="2.4" ${J} opacity=".5"/></g></g>`;
const ring = (id) => `<ellipse id="${id}" cx="0" cy="0" rx="40" ry="6.4" fill="none" stroke="#FFF8F0" stroke-width="4" opacity="0"/>`;
const spark = (id, r) => `<path id="${id}" opacity="0" d="M0 ${-r}Q0 0 ${r} 0Q0 0 0 ${r}Q0 0 ${-r} 0Q0 0 0 ${-r}Z" fill="#FFD84D" stroke="${K}" stroke-width="3" ${J}/>`;
// a dreamy night sky (after the founder's second reference): deep navy, golden four-point stars, drifting star dust, soft clouds, a glittering pond
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const star4 = (x, y, r, i, cls = "dt-star") => `<path class="${cls}" style="animation-delay:${(i * 0.41).toFixed(2)}s" transform="translate(${x} ${y})" d="M0 ${-r}Q${r * 0.12} ${-r * 0.12} ${r * 0.62} 0Q${r * 0.12} ${r * 0.12} 0 ${r}Q${-r * 0.12} ${r * 0.12} ${-r * 0.62} 0Q${-r * 0.12} ${-r * 0.12} 0 ${-r}Z" fill="${T.gold}"/>`;
const asterisk = (x, y, r, i) => `<g class="dt-star" style="animation-delay:${(i * 0.53).toFixed(2)}s" transform="translate(${x} ${y})" stroke="${T.gold}" stroke-width="1.6" stroke-linecap="round"><path d="M0 ${-r}V${r}M${-r} 0H${r}M${-r * 0.6} ${-r * 0.6}L${r * 0.6} ${r * 0.6}M${r * 0.6} ${-r * 0.6}L${-r * 0.6} ${r * 0.6}"/></g>`;
// a stream of tiny golden dots that rises from where the two boats meet and curls up between the two people
const dust = (pts, width, n) => { let o = ""; for (let i = 0; i < n; i++) { const t = rnd(), k = t * (pts.length - 1), j = Math.min(pts.length - 2, Math.floor(k)), u = k - j; const x = pts[j][0] + (pts[j + 1][0] - pts[j][0]) * u + (rnd() - 0.5) * width * (0.4 + t), y = pts[j][1] + (pts[j + 1][1] - pts[j][1]) * u + (rnd() - 0.5) * width * (0.4 + t); o += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(0.8 + rnd() * 1.6).toFixed(1)}" opacity="${(0.35 + rnd() * 0.65).toFixed(2)}"/>`; } return o; };
const cloud = (x, y, w, h, o) => `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${h}" fill="${T.cloud}" opacity="${(o * T.cloudO).toFixed(2)}"/>`;
// the chalky crayon texture of the founder's red heart: a fine grain of lighter flecks and a soft mottling, laid over the whole heart (sky and pond)
const grain = `<g clip-path="url(#dt-clip)"><rect x="-80" y="-200" width="840" height="680" filter="url(#dt-grain)"/></g>`;
const sky = `<path d="${blob}" fill="url(#dt-sky)"/>`;   // simple: a soft gradient, nothing else
const grainDef = `<filter id="dt-grain" x="-80" y="-200" width="840" height="680" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="3" seed="4" result="f"/><feColorMatrix in="f" type="matrix" values="0 0 0 0 1  0 0 0 0 .86  0 0 0 0 .84  0 0 0 1.9 -.98" result="fleck"/><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="9" result="m"/><feColorMatrix in="m" type="matrix" values="0 0 0 0 1  0 0 0 0 .8  0 0 0 0 .78  0 0 0 .9 -.4" result="mott"/><feMerge><feMergeNode in="mott"/><feMergeNode in="fleck"/></feMerge></filter>`;
const defs = `${grainDef}<linearGradient id="dt-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${T.sky[0]}"/><stop offset=".55" stop-color="${T.sky[1]}"/><stop offset=".85" stop-color="${T.sky[2]}"/><stop offset="1" stop-color="${T.sky[3]}"/></linearGradient><linearGradient id="dt-sea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${T.sea[0]}"/><stop offset="1" stop-color="${T.sea[1]}"/></linearGradient><clipPath id="dt-clip"><path d="${blob}"/></clipPath><clipPath id="dt-wclip"><path d="${wave}"/></clipPath>`;
const back = `<defs>${defs}</defs>${sky}${grain}`;
const front = `<g clip-path="url(#dt-clip)">${water}<g clip-path="url(#dt-wclip)"><rect x="-80" y="280" width="840" height="220" filter="url(#dt-grain)"/></g>${ring("dt-ra")}${ring("dt-rb")}${ring("dt-rc")}</g>${boat("dt-A", "#F07F6B")}${boat("dt-B", "#3FB6A8")}${spark("dt-s1", 11)}${spark("dt-s2", 7)}`;
const out = `// GENERATED by scripts/build-dating-scene.cjs. Do not edit by hand.\n/* eslint-disable */\nexport const datingBack = ${JSON.stringify(back)};\nexport const datingFront = ${JSON.stringify(front)};\nexport const datingCutWoman = ${JSON.stringify(cutWoman)};\nexport const datingCutMan = ${JSON.stringify(cutMan)};\n`;
fs.writeFileSync(path.join(__dirname, "../src/lib/dating-scene.generated.ts"), out);
console.log("ok", out.length);
