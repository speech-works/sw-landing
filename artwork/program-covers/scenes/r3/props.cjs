// Round 3 wardrobe and helpers. Props are drawn in the avatar kit's 320x310
// space and laid over a rendered portrait, so they move and scale with it.
const k = require('../kit.cjs');
const { renderAvatar } = require('../../../avatars/kit.cjs');
const { INK } = k;

const p = (d, fill, w = 3.5) =>
  `<path d="${d}" fill="${fill}" stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const hi = (d, color, w = 5, op = 0.9) =>
  `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`;

// Safety hard hat with a centre ridge. Lifted so the brim clears the brows.
const hardhat = `<g transform="translate(0 -16)">` +
  p('M46 128C44 64 94 22 160 22C226 22 276 64 274 128C226 108 94 108 46 128Z', '#F5B536') +
  p('M146 25C150 23 170 23 174 25L178 112C166 110 154 110 142 112Z', '#FAC95A', 3) +
  hi('M72 98C78 68 102 46 130 37', '#FDE3A0') +
  p('M18 138C62 100 258 100 302 138L296 152C250 120 70 120 24 152Z', '#E49B22') +
  `</g>`;

// Hi-vis vest over a blue work shirt: orange panels, lime reflective bands.
const hivis =
  p('M54 240C96 256 222 256 258 240L284 308L28 308Z', '#3E86B8') +
  p('M86 244C112 254 136 260 158 264L132 284Z', '#63A6D4', 3) +
  p('M232 244C206 254 184 260 160 264L186 284Z', '#63A6D4', 3) +
  p('M42 244C60 240 92 250 118 260L128 308L28 308Z', '#FF8A2A') +
  p('M276 244C258 240 226 250 200 260L190 308L290 308Z', '#FF8A2A') +
  p('M38 258C62 258 92 266 120 274L122 286C94 278 64 272 36 271Z', '#E9F27A', 2.5) +
  p('M280 258C256 258 226 266 198 274L196 286C224 278 254 272 282 271Z', '#E9F27A', 2.5);

// A suit jacket over a white shirt and tie, drawn past the portrait's own
// bottom edge (to y 420) so a screen or sill can show the chest, not just the
// collar. Needs `overflow` on the portrait, which `seatDressed` sets.
const suit =
  p('M34 262C66 256 100 252 120 248L160 338L160 430L14 430L22 300Z', '#293A50') +
  p('M286 262C254 256 220 252 200 248L160 338L160 430L306 430L298 300Z', '#293A50') +
  p('M118 248L160 336L202 248C186 256 172 260 160 262C148 260 134 256 118 248Z', '#F7F2E6', 3) +
  p('M150 262L170 262L166 280L154 280Z', '#944F59', 3) +
  p('M154 280L166 280L174 354L160 370L146 354Z', '#944F59', 3) +
  p('M120 248L152 322L124 304L98 262Z', '#34496A', 3) +
  p('M200 248L168 322L196 304L222 262Z', '#34496A', 3) +
  p('M62 330L96 324L92 338Z', '#F7F2E6', 2.5) +
  `<circle cx="160" cy="396" r="5" fill="#1C2738" stroke="${INK}" stroke-width="2.5"/>`;
// The row where `suit` is a full chest.
const SUIT_SHOULDER = 360;

// A yellow knit jumper with a small no-sign badge, after the Panic Button
// reference: wide soft shoulders, sleeve seams falling at the sides, a plain
// crew neck and a speckled knit. Drawn down to y 560 so the sign's front arc
// can hide its lower edge.
const sweater =
  `<defs><pattern id="pb3-knit" width="10" height="10" patternUnits="userSpaceOnUse" stroke="none"><rect width="10" height="10" fill="#F6D33C"/><circle cx="2" cy="3" r="1.3" fill="#E6BD2A"/><circle cx="7" cy="8" r="1.1" fill="#FBE37A"/></pattern></defs>` +
  p('M62 252C92 244 122 241 160 241C198 241 228 244 258 252C300 263 322 290 324 326L334 560L-14 560L-4 326C-2 290 20 263 62 252Z', 'url(#pb3-knit)') +
  `<path d="M34 280C22 330 24 400 36 470M286 280C298 330 296 400 284 470" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>` +
  `<path d="M44 360C40 380 40 400 44 420M276 360C280 380 280 400 276 420" fill="none" stroke="#D9AE22" stroke-width="3" stroke-linecap="round"/>` +
  p('M108 246C128 272 192 272 212 246C194 258 126 258 108 246Z', '#E3BA28', 3) +
  `<circle cx="160" cy="336" r="33" fill="#FFFDF8" stroke="${INK}" stroke-width="3.5"/>` +
  `<circle cx="160" cy="336" r="23" fill="none" stroke="#D7362C" stroke-width="8.5"/>` +
  `<path d="M144 320L176 352" stroke="#D7362C" stroke-width="8.5" stroke-linecap="butt"/>`;

// Long blonde hair blown sideways, after the same reference: a yellow mass
// streaming off to the right, combed with dark wavy strands. It sits above the
// brows so the worried expression still reads.
const windHair =
  p('M56 134C46 84 82 44 140 32C196 20 258 26 318 40C352 48 392 46 432 34C424 56 400 70 376 74C406 80 434 76 458 66C446 94 416 108 386 108C408 118 432 122 450 118C426 142 384 148 354 138C332 148 304 148 284 140C252 118 212 104 162 104C122 104 90 116 56 134Z', '#F7D847', 4) +
  `<path d="M80 92C130 64 200 58 266 66C318 72 366 66 420 50M90 116C140 88 206 82 270 92C326 100 380 96 436 82M150 54C210 40 270 44 330 56M196 104C240 108 286 116 332 124C372 130 404 124 430 116" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>`;

const SWEATER_SHOULDER = 460;

// The Panic Button's hair: one windswept style, after the founder's "Don't
// panic" reference. It hugs the left of the head, sweeps over the crown and
// streams off to the right in three locks; the fringe stays above the brows
// so the worried face still reads. Drawn over the head as its front hair.
const BLONDE = '#F2CD45';
const windStream =
  p('M50 158C42 112 58 66 100 44C140 22 196 16 240 28C290 38 342 32 402 20C432 14 458 10 480 6C464 26 440 38 412 44C442 46 468 44 488 40C470 62 438 74 402 76C430 82 454 84 472 84C448 104 402 112 362 106C330 114 300 118 272 116C268 132 264 148 258 162C250 140 240 120 222 106C200 96 180 102 160 96C140 90 118 100 100 98C84 98 70 116 62 140C58 148 54 154 50 158Z', BLONDE, 4) +
  `<path d="M104 64C160 40 236 42 316 40C360 38 404 30 446 20M92 92C150 70 226 70 300 66C356 62 400 58 452 54M140 100C196 88 250 92 300 92C340 92 380 92 424 90M60 132C66 112 76 100 88 92" fill="none" stroke="#C99E22" stroke-width="3.5" stroke-linecap="round"/>`;
const WIND_RECOLOR = [['#A9542E', BLONDE], ['#733B28', '#C99E22']];
// A yellow A-line dress with puff sleeves, after the founder's dress
// reference, for the Panic Button. The white Peter Pan collar is the kit's
// own, laid in front of the chin as `pbCollar`. Drawn down to y 560.
const DRESS = '#F6D33C', DRESS_D = '#D9AE22';
const puff = (m) => {
  const X = (x) => (m ? 320 - x : x);
  return p(`M${X(70)} 252C${X(34)} 254 ${X(8)} 276 ${X(0)} 310C${X(-4)} 336 ${X(6)} 352 ${X(22)} 356C${X(42)} 360 ${X(62)} 350 ${X(72)} 334Z`, DRESS) +
    `<path d="M${X(8)} 336C${X(24)} 346 ${X(44)} 346 ${X(62)} 334M${X(18)} 344L${X(20)} 353M${X(32)} 346L${X(33)} 355M${X(46)} 343L${X(48)} 352" fill="none" stroke="${DRESS_D}" stroke-width="3" stroke-linecap="round"/>`;
};
const dress =
  p('M62 250C100 243 220 243 258 250L292 340L356 560L-36 560L28 340Z', DRESS) +
  puff(false) + puff(true) +
  `<circle cx="160" cy="331" r="25" fill="#FFFDF8" stroke="${INK}" stroke-width="3.5"/>` +
  `<circle cx="160" cy="331" r="17" fill="none" stroke="#D7362C" stroke-width="7"/>` +
  `<path d="M148 319L172 343" stroke="#D7362C" stroke-width="7" stroke-linecap="butt"/>`;
const pbCollar = require('../../../avatars/kit.cjs').parts.collars.peterpan.front;

// A ribbed crew neck in front of the chin, and blush for a flustered face.
const neckband =
  p('M88 258C122 282 198 282 232 258L236 276C200 304 120 304 84 276Z', '#E8BE2C', 3.5) +
  `<path d="M104 272L102 286M122 278L121 292M140 281L140 296M160 282L160 297M180 281L180 296M198 278L199 292M216 272L218 286" fill="none" stroke="#C99E22" stroke-width="2.5" stroke-linecap="round"/>`;
const blush = `<ellipse cx="98" cy="206" rx="17" ry="9" fill="#F49A9A" stroke="none" opacity="0.6"/><ellipse cx="228" cy="203" rx="17" ry="9" fill="#F49A9A" stroke="none" opacity="0.6"/>`;

// A flustered face for the Panic Button: brows up, eyes wide, teeth gritted.
// Registered on the kit's own mood table so `renderAvatar` can use it.
const kitParts = require('../../../avatars/kit.cjs').parts;
if (!kitParts.moods.flustered) {
  const eyes = kitParts.moods.speaking.match(/<g id="eyes">[\s\S]*?<\/g>/)[0];
  kitParts.moods.flustered = `<g id="expression-flustered"><g id="eyebrows">` +
    `<path d="M95 124Q109 106 125 114" fill="none" stroke-width="4.5"/><path d="M196 112Q212 104 227 122" fill="none" stroke-width="4.5"/></g>` +
    eyes +
    `<path d="M131 210C150 203 177 203 195 210C197 222 195 231 191 235C172 239 150 239 134 235C129 229 129 219 131 210Z" fill="#FFFDF8" stroke-width="3.5"/>` +
    `<path d="M133 222L193 222M146 207L146 237M159 205L159 238M172 205L172 238M184 207L184 236" fill="none" stroke-width="2.5"/>` +
    `</g>`;
}

// A tan fedora with a dark band and a pinched crown, after the Art of
// Disclosure reference. The brim sits just above the brows.
const fedora = `<g transform="translate(0 -20)">` +
  p('M54 118C48 70 70 30 110 18C140 10 180 10 210 18C250 30 272 70 266 118Z', '#E3A86A') +
  `<path d="M120 26C142 42 178 42 200 26" fill="none" stroke="#B9814A" stroke-width="4" stroke-linecap="round"/>` +
  p('M54 94C120 106 200 106 266 94L266 118C200 126 120 126 54 118Z', '#4A3220', 3.5) +
  p('M6 134C60 104 260 104 314 134C302 148 252 152 160 150C68 152 18 148 6 134Z', '#E9B176') +
  `<path d="M40 132C100 120 220 120 280 132" fill="none" stroke="#F3CC9C" stroke-width="4" stroke-linecap="round"/>` +
  `</g>`;
// Where the fedora's brim sits: hair above this row is under the hat.
const FEDORA_HAIRLINE = 118;

// A worried face for The Hard Conversations: inner brow ends raised, eyes
// open, a small tense open mouth mid-sentence.
if (!kitParts.moods.worried) {
  const eyes = kitParts.moods.speaking.match(/<g id="eyes">[\s\S]*?<\/g>/)[0];
  kitParts.moods.worried = `<g id="expression-worried"><g id="eyebrows">` +
    `<path d="M97 130Q110 124 125 114" fill="none" stroke-width="4.5"/><path d="M197 112Q212 122 225 128" fill="none" stroke-width="4.5"/></g>` +
    eyes +
    `<path d="M146 220Q162 210 179 220C178 231 171 236 162 236C153 236 147 231 146 220Z" fill="#201D24" stroke-width="2.5"/>` +
    `<path d="M152 230Q162 224 172 230C168 235 156 235 152 230Z" fill="#F47E91" stroke-width="0"/>` +
    `</g>`;
}

// `seat` with wardrobe laid over the portrait. `wear` replaces the cast's own
// headwear and collar; the overlay is added last, above the expression.
// A full-width collar such as `hivis` does not taper, so it brings its own
// shoulder row (`wear.shoulder`) and more of it shows above the sill.
function seatDressed(name, mood, x, edgeY, w, id, wear = {}) {
  const extra = {};
  if (wear.hat) extra.headwear = 'none';
  if (wear.collar) extra.collar = wear.base || 'polo';
  if (wear.headwear) extra.headwear = wear.headwear;
  if (wear.hairBase) extra.hair = wear.hairBase;
  const row = wear.shoulder || k.SHOULDER[name];
  const h = (w * 310) / 320;
  const y = Math.round(edgeY - (h * row) / 310 + 5);
  const base = k.avatar(name, mood, x, y, w, id, 0, extra).replace(/<svg x=/, '<svg overflow="visible" x=');
  // A worn top replaces the kit's collar outright, so none of it can peek out
  // between the jaw and the new neckline. It goes in BEHIND the head, so the
  // chin sits in front of the neckline as it does with the kit's own collars.
  // Hair and hats go on top.
  const bare = wear.collar ? base.replace(/<g id="[^"]*-collar">[\s\S]*?<\/g>/g, '') : base;
  let dressed = (wear.collar || wear.back) ? bare.replace(/<g id="[^"]*-head">/, (m) => `${wear.back || ''}${wear.collar || ''}${m}`) : bare;
  // Recolour the kit's own parts (e.g. hair), [[from, to], ...].
  (wear.recolor || []).forEach(([from, to]) => { dressed = dressed.split(from).join(to); });
  // A hat that covers the crown: keep only the hair below its brim.
  if (wear.hairBelow) {
    const clip = `${id}-under-hat`;
    dressed = dressed
      .replace(/<g id="[^"]*-hair-front">[\s\S]*?<\/g>/, (m) => `<clipPath id="${clip}"><rect x="-40" y="${wear.hairBelow}" width="400" height="320"/></clipPath><g clip-path="url(#${clip})">${m}</g>`);
  }
  return dressed.replace(/<\/svg>$/, `${(wear.front || '') + (wear.hair || '') + (wear.hat || '')}</svg>`);
}

// The row where `hivis` is still full width.
const HIVIS_SHOULDER = 300;

module.exports = { dress, pbCollar, windStream, WIND_RECOLOR, neckband, blush, fedora, FEDORA_HAIRLINE, hardhat, hivis, HIVIS_SHOULDER, suit, SUIT_SHOULDER, sweater, SWEATER_SHOULDER, windHair, seatDressed, p, hi };
