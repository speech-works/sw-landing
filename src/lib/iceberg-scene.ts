// The "Understanding your stutter" page: he is the tip of an iceberg. This file draws the scene (in the picture's 320 x 310 units) as SVG text, in the style of the
// founder's iceberg picture: flat water, grainy faceted ice, a tall dark body. The doodles inside (heart, sun, rain cloud, moon) are copies of the founder's pictures.
// Everything is drawn IN FRONT of the figure; the water line hides the bottom of his body.

const WL = 262;                 // water line
const INK = "#242329";
const DK = "#0E2A2A";
const hj = 'stroke-linejoin="round" stroke-linecap="round"';

// fixed-seed grain: tiny vector dots
const grain = (() => {
  let s = 11;
  const R = () => { s = (s * 16807) % 2147483647; return s / 2147483647; };
  let d = "";
  for (let i = 0; i < 260; i++) d += `<circle cx="${(R() * 140).toFixed(1)}" cy="${(R() * 140).toFixed(1)}" r="${(0.5 + R() * 0.9).toFixed(1)}"/>`;
  return d;
})();

const BODY = "-34,262 -42,306 -12,420 34,436 66,520 112,584 150,640 196,640 238,580 262,496 316,432 330,350 350,306 350,262";

const dHeart = () => {
  let sp = "";
  [[-14, -20], [8, -26], [18, -6], [-4, 6], [12, 16], [-20, 4], [2, -12], [22, -18], [-8, 22], [6, 28]].forEach((p) => (sp += `<circle cx="${p[0]}" cy="${p[1]}" r="1.6" fill="#fff"/>`));
  return `<g><path d="M0 38C-14 24 -38 6 -38 -16C-38 -34 -24 -40 -14 -38C-6 -36 -2 -28 0 -24C2 -28 6 -36 14 -38C24 -40 38 -34 38 -16C38 6 14 24 0 38Z" fill="#FF5238"/>${sp}<circle cx="-11" cy="-2" r="3.2" fill="${DK}"/><circle cx="11" cy="-2" r="3.2" fill="${DK}"/><path d="M-5 2Q0 12 5 2" fill="none" stroke="${DK}" stroke-width="3.6" ${hj}/><g stroke="${DK}" stroke-width="4.4" ${hj}><path d="M-52 -22L-44 -17M-54 0L-46 0M-52 18L-44 14M52 -22L44 -17M54 0L46 0M52 18L44 14"/></g></g>`;
};
const dSun = () => `<g><path d="M-26 -6C-24 -26 -4 -32 14 -28C30 -22 34 -4 30 12C24 30 2 34 -14 28C-28 22 -30 6 -26 -6Z" fill="#FFD684"/><path d="M-22 -4C-20 -22 -2 -26 12 -23C26 -18 28 -2 25 11C20 26 2 28 -12 24C-24 19 -25 5 -22 -4Z" fill="#FFC85A" stroke="${INK}" stroke-width="3.2" ${hj}/><circle cx="-8" cy="-3" r="1.3" fill="${INK}"/><circle cx="9" cy="-3" r="1.3" fill="${INK}"/><path d="M-4 4Q0 8 5 4" fill="none" stroke="${INK}" stroke-width="2.2" ${hj}/><g stroke="${INK}" stroke-width="3" ${hj}><path d="M-34 -22L-28 -28M-2 -40L2 -34M28 -34L26 -28M36 -6L44 -8M-38 18L-44 20M24 32L30 38M-6 40L-8 34M30 14L36 18"/></g></g>`;
const dCloud = () => `<g><path d="M-38 12C-46 -2 -34 -14 -24 -14C-24 -28 -4 -32 6 -24C16 -30 36 -24 36 -6C42 0 42 14 30 20C16 26 -22 24 -38 12Z" fill="#DADADA" stroke="${INK}" stroke-width="3.2" ${hj}/><circle cx="-7" cy="-6" r="1.3" fill="${INK}"/><circle cx="9" cy="-6" r="1.3" fill="${INK}"/><path d="M-10 2L12 3" fill="none" stroke="${INK}" stroke-width="2.2" ${hj}/><g stroke="${INK}" stroke-width="2.4" ${hj}><path d="M-22 32L-22 36M-6 30L-6 36M-14 42L-14 48M6 34L6 40M18 30L18 34M26 40L26 44M-2 46L-2 52"/></g></g>`;
const spk = (x: number, y: number, r: number) => `<path transform="translate(${x} ${y})" d="M0 ${-r}Q0 0 ${r} 0Q0 0 0 ${r}Q0 0 ${-r} 0Q0 0 0 ${-r}Z" fill="#B3C6FF" stroke="${INK}" stroke-width="2.2" ${hj}/>`;
const dMoon = () => `<g><path d="M-34 -10C-30 -30 -6 -36 16 -30C34 -24 40 -4 34 14C30 28 14 34 4 32C26 22 28 -2 14 -14C2 -24 -18 -18 -34 -10Z" fill="#B3C6FF" opacity=".6" transform="scale(1.12) translate(-2 0)"/><path d="M-32 -8C-14 -22 8 -26 22 -16C34 -6 30 18 14 30C26 14 22 0 10 -6C-2 -12 -18 -6 -32 -8Z" fill="#B3C6FF" stroke="${INK}" stroke-width="3.2" ${hj}/><path d="M-4 -8Q4 -12 10 -9" fill="none" stroke="${INK}" stroke-width="2.2" ${hj}/>${spk(-30, 10, 7)}${spk(34, -26, 7)}${spk(26, 34, 5)}</g>`;

const POS: [number, number][] = [[82, 352], [250, 352], [166, 444], [166, 556]];
const DOODLE = [dHeart, dSun, dCloud, dMoon];
const SCALE = [1.05, 1, 1, 0.95];

const star = (id: string, x: number, y: number, r: number, f: string) =>
  `<path id="${id}" opacity="0" transform="translate(${x} ${y})" d="M0 ${-r}Q0 0 ${r} 0Q0 0 0 ${r}Q0 0 ${-r} 0Q0 0 0 ${-r}Z" fill="${f}" stroke="${INK}" stroke-width="3" ${hj}/>`;

const lights = POS.map((p, i) =>
  `<g id="ib-l${i}" transform="translate(${p[0]} ${p[1]})"><circle id="ib-r${i}" r="56" fill="#FFF3B0" opacity="0"/><circle id="ib-d${i}" r="44" fill="#FFFBF0" opacity=".1"/><g id="ib-o${i}" transform="scale(${SCALE[i]})" opacity=".3">${DOODLE[i]()}</g></g>`).join("");

// the faceted white ice in front of his shoulders (the water line hides the rest of him)
const ice =
  `<g id="ib-ice"><polygon points="-56,${WL} -48,214 -14,176 8,196 34,150 64,206 86,236 116,${WL}" fill="#fff"/><polygon points="34,150 64,206 40,214 22,${WL} -14,${WL} -14,176 8,196" fill="#E4D6F8"/><polygon points="-14,176 8,196 -8,${WL} -56,${WL} -48,214" fill="#D3BFF2"/>` +
  `<polygon points="116,${WL} 150,246 200,252 236,240 262,${WL}" fill="#fff"/><polygon points="236,240 262,${WL} 372,${WL} 376,200 340,150 322,186 296,170 270,226" fill="#fff"/><polygon points="340,150 322,186 296,170 312,${WL} 372,${WL} 376,200" fill="#E4D6F8"/><polygon points="296,170 270,226 262,${WL} 312,${WL}" fill="#D3BFF2"/>` +
  `<polygon points="-56,${WL} -48,214 -14,176 8,196 34,150 64,206 86,236 116,${WL} 150,246 200,252 236,240 262,${WL} 270,226 296,170 322,186 340,150 376,200 372,${WL}" fill="url(#ib-gp)"/></g>`;

export const icebergOver =
  `<defs><pattern id="ib-gw" width="140" height="140" patternUnits="userSpaceOnUse"><g fill="#fff" opacity=".3">${grain}</g></pattern><pattern id="ib-gp" width="140" height="140" patternUnits="userSpaceOnUse"><g fill="#E58A9A" opacity=".5">${grain}</g></pattern></defs>` +
  `<g id="ib-all">` +
  `<path id="ib-water" d="M-60 262L380 262C412 330 420 450 372 556C328 650 236 668 170 664C80 660 -2 640 -44 560C-98 450 -96 330 -60 262Z" fill="#2466C8"/>` +
  `<g id="ib-bodyg"><polygon id="ib-body" points="${BODY}" fill="#272560"/><polygon points="${BODY}" fill="url(#ib-gw)"/>` +
  `<g id="ib-facets" fill="#fff" opacity=".1"><polygon points="296,300 322,350 306,430 286,372"/><polygon points="244,500 270,440 262,520 234,572"/><polygon points="60,470 84,520 120,590 96,540"/></g>` +
  `<g id="ib-lights">${lights}</g></g>` +
  `<g id="ib-ripples" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="3" ${hj}><path id="ib-w1" d="M-40 284q14 -8 28 0t28 0M290 284q14 -8 28 0t28 0"/><path id="ib-w2" d="M-20 300q14 -8 28 0M320 298q14 -8 28 0"/></g>` +
  `${ice}` +
  `${star("ib-s1", 4, 120, 9, "#FFD84D")}${star("ib-s2", 330, 96, 8, "#fff")}${star("ib-s3", 362, 310, 7, "#fff")}` +
  `</g>`;
