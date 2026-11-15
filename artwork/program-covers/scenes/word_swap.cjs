// The Word Swap: a railway station. The split-flap board overhead is mid-flip;
// in the train, the character is explaining something to the next window.
const k = require('./kit.cjs');
const { INK, CREAM, ORANGE, line, shape, avatar, seat, blob, sparkle, dots, scatter, grad, cover } = k;

module.exports = () => {
  const IRON = '#1F3B3A';
  const defs = grad('ws-glass', [[0, '#2D5A7A'], [1, '#5B8FB0']]) +
    `<radialGradient id="ws-lamp" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFE29A" stop-opacity="0.55"/><stop offset="1" stop-color="#FFE29A" stop-opacity="0"/></radialGradient>` +
    `<clipPath id="ws-w1"><rect x="30" y="806" width="210" height="200" rx="18"/></clipPath>` +
    `<clipPath id="ws-w2"><rect x="310" y="796" width="280" height="214" rx="18"/></clipPath>` +
    `<clipPath id="ws-w3"><rect x="660" y="806" width="210" height="200" rx="18"/></clipPath>`;
  let body = `<rect width="900" height="560" fill="url(#ws-glass)"/>`;
  // glazing in the arched roof
  for (let x = -10; x < 920; x += 75) body += line(`M${x} 0 L${x + 40} 560`, '#7FB0CC', 3, 'opacity="0.35"');
  body += line('M60 120 L120 60 M80 170 L170 80 M700 110 L760 50 M720 160 L810 70', '#FFFFFF', 5, 'opacity="0.3"');
  // iron arch ribs
  [620, 540, 460].forEach((r, i) => { body += `<path d="M${450 - r} 600 A${r} ${r * 0.9} 0 0 1 ${450 + r} 600" fill="none" stroke="${IRON}" stroke-width="${14 - i * 3}"/>`; });
  for (let d = 196; d <= 344; d += 16) {
    const a = (d * Math.PI) / 180;
    body += line(`M${(450 + 460 * Math.cos(a)).toFixed(1)} ${(600 + 414 * Math.sin(a)).toFixed(1)} L${(450 + 620 * Math.cos(a)).toFixed(1)} ${(600 + 558 * Math.sin(a)).toFixed(1)}`, IRON, 6);
  }
  // back wall
  body += `<rect x="-10" y="540" width="920" height="260" fill="#D9C4A0" stroke="${INK}" stroke-width="4"/>`;
  for (let y = 560; y < 800; y += 28) for (let x = (y / 28) % 2 ? -10 : 30; x < 910; x += 80) body += `<rect x="${x}" y="${y}" width="76" height="24" fill="none" stroke="#C4AB82" stroke-width="2.5"/>`;
  // hanging lamps
  [180, 720].forEach(x => { body += `<circle cx="${x}" cy="470" r="80" fill="url(#ws-lamp)"/>` + line(`M${x} 300 L${x} 450`, IRON, 4) + `<circle cx="${x}" cy="466" r="20" fill="#FFE29A" stroke="${INK}" stroke-width="3.5"/>` + shape(`M${x - 26} 452 L${x + 26} 452 L${x + 16} 438 L${x - 16} 438Z`, IRON, 3); });

  // the split-flap board
  body += line('M240 380 L240 476 M660 380 L660 476', IRON, 5);
  body += `<rect x="120" y="472" width="660" height="178" rx="10" fill="#1E2B2E" stroke="${INK}" stroke-width="5"/>`;
  const tile = (x, y, fill) => `<rect x="${x}" y="${y}" width="56" height="64" rx="5" fill="${fill}" stroke="${INK}" stroke-width="2.5"/>` + line(`M${x + 2} ${y + 32} L${x + 54} ${y + 32}`, '#1E2B2E', 2.5);
  for (let r = 0; r < 2; r++) for (let c = 0; c < 9; c++) {
    const x = 140 + c * 70, y = 488 + r * 78;
    const lit = r === 0 ? c >= 1 && c <= 5 : c >= 2 && c <= 7;
    if (r === 0 && c === 3) {
      // mid-flip: top flap falling toward us
      body += tile(x, y, CREAM) + `<path d="M${x} ${y + 32} L${x + 56} ${y + 32} L${x + 62} ${y + 52} L${x - 6} ${y + 52}Z" fill="${ORANGE}" stroke="${INK}" stroke-width="2.5"/>`;
    } else if (r === 1 && c === 5) {
      body += tile(x, y, ORANGE) + `<path d="M${x} ${y + 32} L${x + 56} ${y + 32} L${x + 60} ${y + 14} L${x - 4} ${y + 14}Z" fill="${CREAM}" stroke="${INK}" stroke-width="2.5"/>`;
    } else {
      body += tile(x, y, lit ? CREAM : '#2E3E42');
    }
  }
  body += line('M150 600 C160 610 180 612 200 606', '#FFFFFF', 3, 'opacity="0.2"');
  // station clock
  body += line('M820 540 L820 600', IRON, 6) + `<circle cx="820" cy="640" r="44" fill="${CREAM}" stroke="${INK}" stroke-width="5"/>`;
  for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; body += line(`M${(820 + 34 * Math.cos(a)).toFixed(1)} ${(640 + 34 * Math.sin(a)).toFixed(1)} L${(820 + 39 * Math.cos(a)).toFixed(1)} ${(640 + 39 * Math.sin(a)).toFixed(1)}`, INK, 3); }
  body += line('M820 640 L820 612 M820 640 L840 650', INK, 4);
  body += `<circle cx="80" cy="640" r="0"/>`;

  // the train
  body += `<rect x="-10" y="744" width="920" height="60" rx="26" fill="#24493F" stroke="${INK}" stroke-width="4.5"/>`;
  body += `<rect x="-10" y="776" width="920" height="364" fill="#2E6B58" stroke="${INK}" stroke-width="4.5"/>`;
  body += `<rect x="-10" y="1036" width="920" height="18" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/>`;
  const win = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="#F6D9A8"/>`;
  const frame = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="none" stroke="${CREAM}" stroke-width="10"/><rect x="${x - 5}" y="${y - 5}" width="${w + 10}" height="${h + 10}" rx="22" fill="none" stroke="${INK}" stroke-width="3.5"/>`;
  body += win(30, 806, 210, 200) + win(310, 796, 280, 214) + win(660, 806, 210, 200);
  body += line('M60 830 L60 856 M210 830 L210 856', '#E2BC80', 6);
  body += `<g clip-path="url(#ws-w1)">${seat('saltpepper', 'pleased', 50, 1006, 170, 'ws2', 4)}</g>`;
  body += `<g clip-path="url(#ws-w2)">${seat('turban', 'explaining', 334, 1010, 236, 'ws')}</g>`;
  body += `<g clip-path="url(#ws-w3)">${seat('bob', 'curious', 680, 1006, 170, 'ws3', -4)}</g>`;
  body += frame(30, 806, 210, 200) + frame(310, 796, 280, 214) + frame(660, 806, 210, 200);
  body += line('M262 1080 L262 1120 M640 1080 L640 1120', '#1E4D3F', 5);
  // wheels and bogies
  body += `<rect x="-10" y="1140" width="920" height="40" fill="#1B1C24"/>`;
  [90, 210, 690, 810].forEach(x => { body += `<circle cx="${x}" cy="1162" r="36" fill="#2E3A48" stroke="${INK}" stroke-width="4"/><circle cx="${x}" cy="1162" r="10" fill="#9AA3B5"/>`; });
  // platform edge
  body += `<rect x="-10" y="1176" width="920" height="44" fill="#B8AFA3" stroke="${INK}" stroke-width="4"/><rect x="-10" y="1176" width="920" height="12" fill="#FFD15C"/>`;
  // a pigeon on the board
  body += `<g transform="translate(600 472)"><ellipse cx="0" cy="-14" rx="18" ry="12" fill="#9AA3B5" stroke="${INK}" stroke-width="3"/><circle cx="14" cy="-26" r="8" fill="#9AA3B5" stroke="${INK}" stroke-width="3"/><path d="M21 -26 L28 -24 L21 -22Z" fill="${ORANGE}"/><circle cx="16" cy="-28" r="1.8" fill="${INK}"/><path d="M-16 -12 L-28 -6" stroke="${INK}" stroke-width="3"/></g>`;
  return cover(defs, body);
};
