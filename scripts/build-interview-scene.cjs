// Builds public/scenes/interview-scene.svg for the Job interview card from the layered still art in sw-characters (cards-anim/scene/scene.svg).
// What it changes (so the layers can move on their own, and the body stays on the blob bottom outline at every frame):
//  - drops the sky and the blob (the site draws its own colour blob behind the picture);
//  - the front banker is no longer cut by the blob inside its own (moving) coordinates: its own cut path becomes a huge box, and the cut is
//    done once, by a fixed clip (blobclip) around it, so it stays on the blob while the figure turns;
//  - the chair keeps no clip of its own; a fixed blobclip group wraps it instead (so it can roll in from below the blob).
// Run: node scripts/build-interview-scene.cjs
const fs = require("fs");
const SRC = "/Users/mayankav/Documents/speechworks-2/sw-characters/native/prototype/shots/s22/site-avatars/cards-anim/scene/scene.svg";
let t = fs.readFileSync(SRC, "utf8");
t = t.replace(/^<!--[\s\S]*?-->/, "");
t = t.replace(/<rect id="sky"[^>]*\/>/, "");
t = t.replace(/<g id="blob">[\s\S]*?<\/g>/, "");
t = t.replace(/<pattern id="stripe"[\s\S]*?<\/pattern>/, "");
// front + headset: they sit in a display:none group at the end
t = t.replace(/<g display="none">(<g id="banker-front">[\s\S]*)<\/g><\/svg>\s*$/, '<g id="front-stage" clip-path="url(#blobclip)">$1</g></svg>');
if (!t.includes('id="front-stage"')) throw new Error("front group not found");
// the front's own blob cut becomes a huge box
t = t.replace(/(<clipPath id="fr0_cr">)<path d="[^"]+"\/>/, '$1<path d="M-4000 -4000L5000 -4000L5000 4000L-4000 4000Z"/>');
// the chair: fixed clip outside, none inside
t = t.replace(/<g id="chair" data-origin="([^"]+)"><g clip-path="url\(#blobclip\)">([\s\S]*?)<\/g><\/g>/, '<g clip-path="url(#blobclip)"><g id="chair" data-origin="$1"><g>$2</g></g></g>');
// the back figure: its group carries the move/scale transform; give it an id and drop the fixed transform
t = t.replace(/<g clip-path="url\(#blobclip\)"><g transform="translate\(64.2 68.4\) scale\(0.6\)" style="--sw:6.67">(<g id="banker-back")/, '<g clip-path="url(#blobclip)"><g id="back-move" style="--sw:4">$1');
if (!t.includes('id="back-move"')) throw new Error("back group not found");
// the blob edge and the body edge are both anti-aliased, so a hairline of blob colour shows under the body: the fixed cut reaches 0.7 unit lower than the blob (the body edge then is the only edge there)
t = t.replace(/(<clipPath id="blobclip">)(<path d="[^"]+"\/>)/, '$1$2<path transform="translate(0 0.7)" d="__D__"/>');
t = t.replace("__D__", t.match(/<clipPath id="blobclip"><path d="([^"]+)"/)[1]);
// a bigger table that reaches past the blob on the right (the right screen, the clock and the cup move with it), as the founder asked for the program page
t = t.replace(/(<g id="desk"[^>]*>[\s\S]*?<\/g>)/, (g) => g.replace(/cx="160.5"/g, 'cx="198"').replace(/rx="159"/g, 'rx="196.5"').replace(/ry="70"/g, 'ry="78"'));
const shift = (id, dx, dy, nx, ny) => { t = t.replace(new RegExp(`<g id="${id}" data-origin="[\\d.]+ [\\d.]+">`), `<g id="${id}" data-origin="${nx} ${ny}" transform="translate(${dx} ${dy})">`); };
shift("props-clock", 49.5, -5, 333.5, 18);
t = t.replace(/<g id="props-check" data-origin="[\d.]+ [\d.]+">/, '<g id="props-check" data-origin="251.5 22" transform="translate(42.5 0)">'); shift("props-cup", 62, 0, 340, 160);
// a better paper plane: a folded dart with a lit upper wing, a shaded underside, a keel crease and a small shine (figure style: ink outline 4, round joins)
const INK = "#242329", J = 'stroke-linejoin="round" stroke-linecap="round"';
const PLANE = `<g id="props-plane" data-origin="65.5 8"><g transform="translate(65.5 8) scale(0.14) translate(-770 -455)">
<path d="M995 303L545 363L615 435Z" fill="#F7F2E8"/>
<path d="M615 435L995 303L650 480L620 555Z" fill="#D6CEBC"/>
<path d="M618 448L668 500L622 553Z" fill="#E6DFCF"/>
<path d="M995 303L760 607L650 480Z" fill="#EFE9DC"/>
<path d="M615 435L995 303L650 480L620 555" fill="none" stroke="#B5AB96" stroke-width="10" ${J}/>
<path d="M995 303L545 363L615 435L620 555L650 480L760 607Z" fill="none" stroke="${INK}" stroke-width="18" ${J}/>
</g></g>`;
t = t.replace(/<g id="props-plane"[\s\S]*?<\/g><\/g>/, PLANE);
// proper monitors, like a real desk setup: a flat front screen in the middle and two screens turned in towards the chair (the outer edge taller and nearer, the inner edge shorter),
// each with a thin black bezel inside an aluminium rim, a neck and a flat base standing ON the table, a soft shadow, and equal gaps between the three.
{
  const li = t.indexOf('<g id="interviewer-left">'), lj = t.indexOf('<polygon points="19,38.6 50,42', li);
  const silver = t.slice(li, lj).trimEnd().match(/<g transform="translate\(28\.8 45\.6\) scale\(0\.17\)">([\s\S]*)<\/g><\/g><\/g>$/)[1];
  // a new kit look "elder" (sw-characters web/scripts/run_site_stills.mjs, out/interviewer-lab3.json entry C-jacket_tie_n): bald with silver temples, square glasses, shirt, tie, blazer
  const elder = fs.readFileSync("/Users/mayankav/Documents/speechworks-2/sw-characters/web/out/interviewer-stills3/C-jacket_tie_n.svg", "utf8").replace(/cd(\d+)/g, (_m, n) => "el" + n + "_")
    // the kit draws a flat ink line across the jacket (a collar outline edge, "M248.84 797.67 ... 955.81"): right only for a short body, so it is dropped (the body runs on past the screen)
    .replace(/<path d="M248\.84 797\.67L203\.32 916\.71[^"]*"[^>]*\/>/g, "").replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  const longBody = (x) => x.replace(/905 1200L95 1200C128/g, "905 1200L925 2100L75 2100L95 1200C128").replace(/M500 1112L500 1200/g, "M500 1112L500 2100");
  const silverL = longBody(silver), elderL = longBody(elder);
  const RIM = "#F5F6FA", BEZ = "#121317", NECK = "#E9ECF2", BASE = "#D9DDE6";
  // a monitor is a quad: x from xa to xb; top and bottom heights at both ends (ta, ba at xa; tb, bb at xb)
  const quad = (g, d) => {
    const w = g.xb - g.xa, top = (x) => g.ta + ((g.tb - g.ta) * (x - g.xa)) / w + d, bot = (x) => g.ba + ((g.bb - g.ba) * (x - g.xa)) / w - d, x0 = g.xa + d, x1 = g.xb - d;
    return [[x0, top(x0)], [x1, top(x1)], [x1, bot(x1)], [x0, bot(x0)]].map((q) => q.map((v) => +v.toFixed(2)).join(",")).join(" ");
  };
  const mon = (id, feedId, clipId, g, cx, yb, feed) => {
    const bodyBottom = g.ba + ((g.bb - g.ba) * (cx - g.xa)) / (g.xb - g.xa);
    return `<g id="${id}" data-origin="${cx} ${yb + 3}">
<ellipse cx="${cx - 7}" cy="${yb + 3}" rx="36" ry="4.2" fill="#000" opacity=".14"/>
<rect x="${cx - 27}" y="${yb - 3.5}" width="54" height="6.5" rx="3.2" fill="${BASE}" stroke="${INK}" stroke-width="2.4" ${J}/>
<path d="M${cx - 10} ${bodyBottom - 2}L${cx + 10} ${bodyBottom - 2}L${cx + 15} ${yb - 2}L${cx - 15} ${yb - 2}Z" fill="${NECK}" stroke="${INK}" stroke-width="2.4" ${J}/>
<polygon points="${quad(g, 0)}" fill="${INK}" stroke="${INK}" stroke-width="5.4" ${J}/>
<polygon points="${quad(g, 0)}" fill="${RIM}" stroke="${RIM}" stroke-width="2" ${J}/>
<polygon points="${quad(g, 2.4)}" fill="${BEZ}" stroke="${BEZ}" stroke-width="2.6" ${J}/>
<clipPath id="${clipId}"><polygon points="${quad(g, 5.2)}"/></clipPath>
<g id="${feedId}"><g clip-path="url(#${clipId})">${feed}</g></g>
</g>`;
  };
  // people: eyes at about a third of the screen height, shoulders, collar, shirt and tie below; the body runs on past the screen bottom
  const person = (cx, eyeY, tile, art, squeeze) => `<polygon points="${quad(GEO[cx], 0)}" fill="${tile}"/><g transform="translate(${cx} 0) scale(${squeeze} 1) translate(${-cx} 0)"><g transform="translate(${(cx - 160 * 0.145).toFixed(2)} ${(eyeY - 135 * 0.145).toFixed(2)}) scale(0.145)">${art}</g></g>`;
  const GEO = {
    84: { xa: 84 - 48, xb: 84 + 48, ta: 40, tb: 44, ba: 102, bb: 98 },
    198: { xa: 198 - 52, xb: 198 + 52, ta: 22, tb: 22, ba: 84, bb: 84 },
    312: { xa: 312 - 48, xb: 312 + 48, ta: 44, tb: 40, ba: 98, bb: 102 },
  };
  const c = GEO[198], x0 = c.xa + 5.2, y0 = 22 + 5.2, SW = 104 - 10.4, SH = 62 - 10.4;
  const cv = `<rect x="${x0}" y="${y0}" width="${SW}" height="${SH}" fill="#F3F7FF"/><rect x="${x0}" y="${y0}" width="${SW}" height="9" fill="#DCE6FA"/>
<circle cx="${x0 + 6}" cy="${y0 + 4.5}" r="2" fill="#F08A6B"/><circle cx="${x0 + 12}" cy="${y0 + 4.5}" r="2" fill="#F5C34B"/><circle cx="${x0 + 18}" cy="${y0 + 4.5}" r="2" fill="#6CCB9A"/>
<rect x="${x0 + 6}" y="${y0 + 14}" width="26" height="24" rx="4" fill="#FFD9B0"/><circle cx="${x0 + 19}" cy="${y0 + 23.5}" r="5.2" fill="#8A5A3A"/><path d="M${x0 + 9} ${y0 + 38}C${x0 + 9} ${y0 + 30} ${x0 + 29} ${y0 + 30} ${x0 + 29} ${y0 + 38}Z" fill="#293A50"/>
<rect x="${x0 + 38}" y="${y0 + 13}" width="38" height="6.4" rx="3.2" fill="#293A50"/><rect x="${x0 + 38}" y="${y0 + 21.5}" width="26" height="4.4" rx="2.2" fill="#9DB0D3"/>
<rect x="${x0 + 38}" y="${y0 + 28.5}" width="46" height="4.4" rx="2.2" fill="#C9D6EE"/><rect x="${x0 + 38}" y="${y0 + 34.5}" width="40" height="4.4" rx="2.2" fill="#C9D6EE"/>
<rect x="${x0 + 38}" y="${y0 + 42}" width="12" height="3.4" rx="1.7" fill="#F58C1B"/><rect x="${x0 + 53}" y="${y0 + 42}" width="12" height="3.4" rx="1.7" fill="#6CA0F2"/><rect x="${x0 + 68}" y="${y0 + 42}" width="12" height="3.4" rx="1.7" fill="#6CCB9A"/>`;
  const a = t.indexOf('<g id="monitor-left"'), b = t.indexOf('<g id="props-notepad"');
  if (a < 0 || b < 0) throw new Error("monitors not found");
  t = t.slice(0, a)
    + mon("monitor-left", "interviewer-left", "scrL", GEO[84], 84, 118, person(84, 62, "#CFE0FF", silverL, 0.93))
    + mon("monitor-right", "interviewer-right", "scrR", GEO[312], 312, 118, person(312, 62, "#FFE2C2", elderL, 0.93))
    + mon("monitor-centre", "cv-window", "scrC", GEO[198], 198, 100, cv)
    + t.slice(b);
}
// the people in the screens must not show the cut bottom of their bodies: the blob cut of their pictures becomes a huge box, so the body runs on past the bottom of the screen (the screen clip then ends it)
t = t.replace(/(<clipPath id="(?:si|el)\d+_cr">)<path d="[^"]+"\/>/g, '$1<path d="M-4000 -4000L5000 -4000L5000 4000L-4000 4000Z"/>');
t = t.replace(/<svg [^>]*>/, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 310" width="100%" height="100%" overflow="visible" aria-hidden="true" focusable="false">');
fs.writeFileSync("public/scenes/interview-scene.svg", t);
console.log("ok", t.length);
