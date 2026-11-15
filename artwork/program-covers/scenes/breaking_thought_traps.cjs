// Breaking Thought Traps: late at night at the desk. The desk lamp throws the
// cat's shadow huge across the wall; the real cat is small. A wry look at it.
const k = require('./kit.cjs');
const { INK, CREAM, ORANGE, line, shape, avatar, seat, blob, sparkle, dots, scatter, grad, cover } = k;

// Sitting cat silhouette in a 100 x 120 box, facing left.
const CAT = 'M30 120 C18 100 20 72 34 56 L28 42 C23 32 23 22 29 15 L27 0 L40 9 C44 8 48 8 52 10 L63 1 L61 18 C65 26 63 34 57 40 C71 46 81 62 83 82 C85 100 81 112 73 120Z';
const TAIL = 'M72 118 C96 120 104 100 94 86 C88 76 96 66 104 70';

module.exports = () => {
  const defs = `<radialGradient id="btt-lamp" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFD38A" stop-opacity="0.5"/><stop offset="1" stop-color="#FFD38A" stop-opacity="0"/></radialGradient>` +
    `<pattern id="btt-paper" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M30 22 L34 30 L30 38 L26 30Z" fill="#453E80"/></pattern>`;
  let body = `<rect width="900" height="1200" fill="#38326C"/><rect width="900" height="1200" fill="url(#btt-paper)"/>`;
  // lamp light on the wall
  body += `<ellipse cx="700" cy="760" rx="420" ry="380" fill="url(#btt-lamp)"/>`;
  // the window: night city and moon
  body += `<rect x="60" y="300" width="270" height="380" fill="#1A2147"/>`;
  body += dots(scatter(3, 14, 70, 310, 320, 520, 1.3, 2.6), CREAM, 0.8);
  body += `<circle cx="250" cy="372" r="40" fill="#FFE08A"/><circle cx="268" cy="360" r="36" fill="#1A2147"/>`;
  body += shape('M60 680 L60 560 L100 560 L100 590 L140 590 L140 530 L190 530 L190 600 L230 600 L230 570 L280 570 L280 610 L330 610 L330 680Z', '#10142F', 0);
  [[72, 572], [118, 600], [152, 545], [168, 545], [152, 570], [206, 612], [246, 584], [296, 622]].forEach(([x, y]) => { body += `<rect x="${x}" y="${y}" width="9" height="11" fill="#FFD15C"/>`; });
  body += `<rect x="60" y="300" width="270" height="380" fill="none" stroke="${CREAM}" stroke-width="14"/>` + line('M195 300 L195 680 M60 490 L330 490', CREAM, 10);
  body += `<rect x="40" y="680" width="310" height="22" rx="4" fill="${CREAM}" stroke="${INK}" stroke-width="4"/>`;
  // small plant on the window sill
  body += shape('M262 680 L266 652 L300 652 L304 680Z', '#C9692F', 3.5) + shape('M282 652 C262 626 264 606 276 600 C290 616 288 634 282 652Z M284 652 C296 624 314 616 322 620 C316 640 300 650 284 652Z', '#5E9B4A', 3);

  // the big shadow on the wall
  body += `<g transform="translate(416 458) scale(4.4 4.6)" fill="#231E4A" opacity="0.92"><path d="${CAT}"/>` +
    `<path d="M36 54 L40 47 L44 54 L48 46 L52 55 L57 48 L60 57 L64 50 L67 60 L71 54 L73 65 L77 60 L78 70" fill="#231E4A"/>` +
    `<path d="${TAIL}" fill="none" stroke="#231E4A" stroke-width="9" stroke-linecap="round"/></g>`;

  // shelf with books, top right
  body += `<rect x="560" y="300" width="300" height="14" fill="#8A4E25" stroke="${INK}" stroke-width="3.5"/>`;
  [[572, 228, 26, '#FF9040'], [600, 238, 22, '#F3EDE2'], [624, 222, 30, '#5E9B4A'], [656, 244, 20, '#C8F750'], [678, 230, 26, '#7FA8D9']].forEach(([x, y, w, c]) => {
    body += `<rect x="${x}" y="${y}" width="${w}" height="${300 - y}" fill="${c}" stroke="${INK}" stroke-width="3"/>`;
  });
  body += `<rect x="712" y="252" width="46" height="48" rx="6" fill="#C9692F" stroke="${INK}" stroke-width="3"/>` + line('M720 252 C712 220 740 206 735 190 M744 252 C752 226 770 222 776 206', '#5E9B4A', 5);

  // desk
  // the character sits behind the desk
  body += seat('curly', 'wry', 214, 1010, 286, 'btt');
  body += shape('M-10 1010 L910 1010 L910 1046 L-10 1046Z', '#B36C35', 4.5);
  body += `<rect x="-10" y="1046" width="920" height="170" fill="#8A4E25" stroke="${INK}" stroke-width="4.5"/>`;
  body += `<rect x="560" y="1076" width="260" height="84" rx="8" fill="#9C5A2B" stroke="${INK}" stroke-width="4"/><rect x="664" y="1110" width="52" height="12" rx="6" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>`;
  body += line('M20 1030 L280 1030 M600 1028 L880 1028', '#D18A4E', 4);

  // books stacked at the left
  body += `<rect x="40" y="976" width="170" height="34" rx="4" fill="#5E9B4A" stroke="${INK}" stroke-width="4"/><rect x="56" y="944" width="146" height="32" rx="4" fill="${ORANGE}" stroke="${INK}" stroke-width="4"/><rect x="48" y="914" width="132" height="30" rx="4" fill="${CREAM}" stroke="${INK}" stroke-width="4"/>`;
  body += line('M64 960 L190 960 M60 929 L170 929', INK, 2.5, 'opacity="0.4"');
  // open notebook in front
  body += shape('M300 1012 L480 1012 L494 1040 L286 1040Z', CREAM, 4) + line('M390 1012 L390 1040 M314 1020 L378 1020 M310 1030 L374 1030 M404 1020 L468 1020 M406 1030 L474 1030', '#9E988F', 2.5);
  // mug
  body += `<rect x="478" y="940" width="56" height="70" rx="8" fill="#7FA8D9" stroke="${INK}" stroke-width="4"/>` + line('M534 954 C556 954 556 990 534 990', INK, 5);
  body += line('M496 924 C486 906 506 894 496 876 M516 924 C526 906 506 896 518 880', CREAM, 4, 'opacity="0.6"');

  // the real cat, small, on the desk
  body += `<g transform="translate(616 920) scale(0.78 0.75)"><path d="${CAT}" fill="#E98A3A" stroke="${INK}" stroke-width="5.5" stroke-linejoin="round"/>` +
    `<path d="${TAIL}" fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="${TAIL}" fill="none" stroke="#E98A3A" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M48 70 L60 66 M50 84 L64 82 M52 98 L66 98" stroke="#B85F1E" stroke-width="5" stroke-linecap="round"/><circle cx="36" cy="26" r="3.5" fill="${INK}"/></g>`;

  // desk lamp, front right, pointing at the cat
  body += `<ellipse cx="830" cy="1008" rx="56" ry="12" fill="${ORANGE}" stroke="${INK}" stroke-width="4"/>`;
  body += line('M830 1000 L860 880 L800 800', INK, 13) + line('M830 1000 L860 880 L800 800', '#F3EDE2', 6);
  body += `<circle cx="860" cy="880" r="9" fill="${ORANGE}" stroke="${INK}" stroke-width="3.5"/>`;
  body += shape('M760 770 L840 790 L812 860 L748 840Z', ORANGE, 4.5);
  body += `<ellipse cx="770" cy="852" rx="26" ry="14" fill="#FFE8B0" stroke="${INK}" stroke-width="3" transform="rotate(18 770 852)"/>`;
  body += sparkle(140, 220, 10, CREAM, 'opacity="0.5"');
  return cover(defs, body);
};
