// The Art of Disclosure, round 3: after the founder's "over the wall"
// reference (references/art_of_disclosure-01.png). The curly character in the
// kit's cowboy hat (hair above the brim hidden under it), fingers on the top
// of a brick wall, coming up over it with the whole face showing and a
// welcoming smile: the moment just before saying it.
// The wall's top edge hides the collar, as a sill does on the other covers.
const k = require('../kit.cjs');
const { INK, cover } = k;
const { seatDressed } = require('./props.cjs');
const { parts } = require('../../../avatars/kit.cjs');

// A small hand gripping the wall top at (x, y): only the four fingers show,
// curled over the edge, each fully outlined, the middle one longest.
// `flip` mirrors it.
function hand(x, y, flip, skin) {
  let g = '';
  [[-21, 30], [-7, 36], [7, 35], [21, 28]].forEach(([fx, len]) => {
    g += `<rect x="${fx - 7.5}" y="-12" width="15" height="${len}" rx="7.5" fill="${skin}" stroke="${INK}" stroke-width="4"/>`;
  });
  return `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1) rotate(-6)">${g}</g>`;
}

module.exports = () => {
  const SKY = '#8FB9D9';
  const WALL = '#E8665F';
  const MORTAR = '#F3A29C';
  const SKIN = parts.skinColors.deep[1];
  const TOP = 800;

  let body = `<rect width="900" height="1200" fill="${SKY}"/>`;
  // two soft clouds high up, low detail under the title
  body += k.cloud(560, 300, 200, '#B7D3E8', 0) + k.cloud(90, 420, 150, '#A6C8E2', 0);

  // the character, coming up over the wall
  // The kit's cowboy hat, widened and centred so its crown covers this head.
  const cowboy = `<g transform="translate(159 4) scale(1.18 1.06) translate(-149 0)">${parts.headwear.cowboy}</g>`;
  body += seatDressed('curly', 'welcoming', 275, TOP, 350, 'ad3', { hat: cowboy, hairBelow: 100 });

  // the wall: bricks, mortar, a dark top edge
  body += `<rect x="-10" y="${TOP}" width="920" height="420" fill="${WALL}"/>`;
  let mortar = '';
  for (let r = 0, y = TOP + 96; y < 1210; r++, y += 96) mortar += `M20 ${y} L880 ${y} `;
  for (let r = 0; r < 4; r++) {
    const y0 = TOP + r * 96, off = r % 2 ? 90 : 0;
    for (let x = 180 + off; x < 900; x += 300) mortar += `M${x} ${y0 + 12} L${x} ${y0 + 84} `;
  }
  body += `<path d="${mortar}" fill="none" stroke="${MORTAR}" stroke-width="7" stroke-linecap="round"/>`;
  body += `<path d="M-10 ${TOP} L910 ${TOP}" stroke="${INK}" stroke-width="7"/>`;

  // the little hands on the edge, either side of the face
  body += hand(300, TOP, false, SKIN) + hand(600, TOP, true, SKIN);
  return cover('', body);
};
