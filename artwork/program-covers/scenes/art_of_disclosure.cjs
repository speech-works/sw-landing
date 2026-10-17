// The Art of Disclosure: an old-town street front. The character has opened
// the shutters wide and is talking to the street; neighbours lean out too.
const k = require('./kit.cjs');
const { INK, CREAM, ORANGE, line, shape, avatar, seat, blob, cloud, sparkle, dots, bird, scatter, grad, cover, wire } = k;

module.exports = () => {
  const defs = grad('ad-sky', [[0, '#2C68B6'], [1, '#78B0E4']]) +
    `<clipPath id="ad-main"><rect x="300" y="760" width="300" height="250" rx="0"/></clipPath>` +
    `<clipPath id="ad-up1"><rect x="130" y="470" width="160" height="140"/></clipPath>` +
    `<clipPath id="ad-up2"><rect x="610" y="470" width="160" height="140"/></clipPath>`;
  let body = `<rect width="900" height="420" fill="url(#ad-sky)"/>`;
  body += cloud(60, 230, 230, CREAM, 4) + cloud(580, 150, 190, CREAM, 3.5);
  body += bird(420, 200, 18) + bird(462, 226, 13) + bird(760, 260, 14);

  // facade
  body += `<rect x="-10" y="380" width="920" height="840" fill="#E9A35F"/>`;
  body += dots(scatter(41, 90, 0, 420, 900, 1200, 1.5, 3.5), '#D88E4D', 0.8);
  // neighbours' walls at the edges
  body += `<rect x="-10" y="380" width="100" height="840" fill="#C9705A" stroke="${INK}" stroke-width="4"/><rect x="820" y="380" width="100" height="840" fill="#F2C46E" stroke="${INK}" stroke-width="4"/>`;
  body += `<rect x="18" y="500" width="50" height="90" fill="#2F8C8A" stroke="${INK}" stroke-width="3.5"/><rect x="840" y="760" width="50" height="90" fill="#3D78B8" stroke="${INK}" stroke-width="3.5"/>`;
  // roof tiles and chimneys
  body += `<rect x="140" y="270" width="54" height="90" fill="#C65A3A" stroke="${INK}" stroke-width="4"/><rect x="132" y="262" width="70" height="16" fill="#A9472D" stroke="${INK}" stroke-width="3.5"/>`;
  body += `<rect x="690" y="250" width="54" height="110" fill="#C65A3A" stroke="${INK}" stroke-width="4"/><rect x="682" y="242" width="70" height="16" fill="#A9472D" stroke="${INK}" stroke-width="3.5"/>`;
  body += `<rect x="-10" y="340" width="920" height="54" fill="#C65A3A" stroke="${INK}" stroke-width="4"/>`;
  let tiles = '';
  for (let x = 0; x < 920; x += 30) tiles += `<path d="M${x} 394 Q${x + 15} 414 ${x + 30} 394" fill="#C65A3A" stroke="${INK}" stroke-width="3.5"/>`;
  for (let x = 15; x < 920; x += 30) tiles += line(`M${x} 346 L${x} 390`, '#A9472D', 3);
  body += tiles;
  // pigeons on the ridge
  const pigeon = (x, y, d = 1) => `<g transform="translate(${x} ${y}) scale(${d} 1)"><ellipse cx="0" cy="-14" rx="18" ry="12" fill="#9AA3B5" stroke="${INK}" stroke-width="3"/><circle cx="14" cy="-26" r="8" fill="#9AA3B5" stroke="${INK}" stroke-width="3"/><path d="M21 -26 L28 -24 L21 -22Z" fill="${ORANGE}"/><circle cx="16" cy="-28" r="1.8" fill="${INK}"/><path d="M-16 -12 L-28 -6" stroke="${INK}" stroke-width="3"/></g>`;
  body += pigeon(420, 340) + pigeon(462, 340, -1);

  // upper windows with neighbours
  const upper = (x, who, mood, id, flip) => {
    let s = `<rect x="${x}" y="470" width="160" height="140" fill="#F6D9A8"/>`;
    s += `<g clip-path="url(#${id === 'ad2' ? 'ad-up1' : 'ad-up2'})">${seat(who, mood, x + 10, 606, 140, id, flip)}</g>`;
    s += `<rect x="${x}" y="470" width="160" height="140" fill="none" stroke="${INK}" stroke-width="5"/>`;
    s += shape(`M${x} 470 L${x - 46} 480 L${x - 46} 600 L${x} 610Z`, '#2F8C8A', 4) + shape(`M${x + 160} 470 L${x + 206} 480 L${x + 206} 600 L${x + 160} 610Z`, '#2F8C8A', 4);
    s += line(`M${x - 40} 504 L${x - 6} 500 M${x - 40} 528 L${x - 6} 526 M${x - 40} 552 L${x - 6} 552 M${x - 40} 576 L${x - 6} 578 M${x + 166} 500 L${x + 200} 504 M${x + 166} 526 L${x + 200} 528 M${x + 166} 552 L${x + 200} 552 M${x + 166} 578 L${x + 200} 576`, '#1E6664', 3);
    s += `<rect x="${x - 14}" y="606" width="188" height="16" rx="4" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/>`;
    return s;
  };
  body += upper(130, 'pigtails', 'gleeful', 'ad2', 4) + upper(610, 'saltpepper', 'pleased', 'ad3', -4);
  // cat on the left sill
  body += `<g transform="translate(250 606)"><path d="M0 0 C-2 -22 12 -34 30 -32 C46 -30 54 -18 52 0Z" fill="#3A3438" stroke="${INK}" stroke-width="3"/><path d="M36 -28 L40 -44 L46 -32 L52 -42 L52 -22Z" fill="#3A3438" stroke="${INK}" stroke-width="3"/><path d="M0 -2 C-14 -2 -18 -14 -10 -20" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>`;

  // washing line across the street
  const wl = wire([90, 660], [820, 650], 60, INK, 3);
  body += wl.d;
  const hang = (t, w, h, fill, extra = '') => {
    const [x, y] = wl.at(t);
    return `<rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="6" fill="${fill}" stroke="${INK}" stroke-width="3.5"/>${extra}` + `<rect x="${x - w / 2 + 6}" y="${y - 6}" width="6" height="12" fill="${CREAM}" stroke="${INK}" stroke-width="2"/><rect x="${x + w / 2 - 12}" y="${y - 6}" width="6" height="12" fill="${CREAM}" stroke="${INK}" stroke-width="2"/>`;
  };
  body += hang(0.12, 70, 84, ORANGE) + hang(0.27, 30, 50, '#7FA8D9') + hang(0.33, 30, 46, '#7FA8D9');
  const [tx, ty] = wl.at(0.72);
  body += hang(0.72, 96, 70, CREAM, line(`M${tx - 48} ${ty + 22} L${tx + 48} ${ty + 22} M${tx - 48} ${ty + 46} L${tx + 48} ${ty + 46}`, '#2F8C8A', 6));
  const [sx, sy] = wl.at(0.88);
  body += `<path d="M${sx - 36} ${sy} L${sx + 36} ${sy} L${sx + 46} ${sy + 90} L${sx - 46} ${sy + 90}Z" fill="#E66F8F" stroke="${INK}" stroke-width="3.5"/>`;

  // the main window, shutters opened wide
  body += `<rect x="300" y="760" width="300" height="250" fill="#F6D9A8"/>`;
  body += dots(scatter(13, 16, 310, 770, 590, 1000, 2, 3.4), '#EBC48A', 0.9);
  body += `<rect x="520" y="780" width="50" height="40" rx="3" fill="#7FB3A0" stroke="${INK}" stroke-width="3"/>`;
  body += `<g clip-path="url(#ad-main)">${seat('hijab', 'welcoming', 324, 1002, 252, 'ad')}</g>`;
  body += `<rect x="300" y="760" width="300" height="250" fill="none" stroke="${INK}" stroke-width="6"/>`;
  body += shape('M300 760 L222 776 L222 1000 L300 1010Z', '#3D78B8', 4.5) + shape('M600 760 L678 776 L678 1000 L600 1010Z', '#3D78B8', 4.5);
  for (let y = 800; y < 1000; y += 26) body += line(`M230 ${y} L292 ${y - 2} M608 ${y - 2} L670 ${y}`, '#2A5C92', 3.5);
  body += `<circle cx="290" cy="890" r="5" fill="${CREAM}" stroke="${INK}" stroke-width="2"/><circle cx="610" cy="890" r="5" fill="${CREAM}" stroke="${INK}" stroke-width="2"/>`;
  // sill and flower box
  body += `<rect x="272" y="1002" width="356" height="22" rx="5" fill="${CREAM}" stroke="${INK}" stroke-width="4"/>`;
  [[300, 1030], [330, 1018], [362, 1032], [394, 1020], [428, 1030], [462, 1018], [496, 1032], [530, 1020], [562, 1030], [596, 1020]].forEach(([x, y], i) => {
    body += `<circle cx="${x}" cy="${y}" r="15" fill="${['#E8505B', '#F58FB0', CREAM][i % 3]}" stroke="${INK}" stroke-width="3"/><circle cx="${x}" cy="${y}" r="5" fill="#FFD15C"/>`;
  });
  body += `<rect x="286" y="1036" width="328" height="56" rx="6" fill="#8A4E25" stroke="${INK}" stroke-width="4.5"/>`;
  body += line('M300 1090 C296 1120 310 1140 300 1170 M380 1090 C386 1118 372 1136 382 1158 M520 1090 C516 1124 530 1146 522 1176 M596 1090 C600 1112 590 1130 598 1150', '#3F7A30', 4);
  [[300, 1130], [300, 1166], [382, 1124], [522, 1140], [598, 1136], [520, 1172]].forEach(([x, y], i) => {
    body += `<ellipse cx="${x + (i % 2 ? 9 : -9)}" cy="${y}" rx="11" ry="7" fill="#5E9B4A" stroke="${INK}" stroke-width="2.5"/>`;
  });
  // wall lantern and ivy
  body += line('M150 860 L190 860', INK, 6) + shape('M128 860 L172 860 L166 920 L134 920Z', '#FFD15C', 4) + shape('M124 856 L176 856 L150 830Z', '#2E3A48', 3.5);
  body += line('M110 1220 C120 1140 96 1080 120 1010 C134 970 120 940 130 900', '#3F7A30', 5);
  [[114, 1180], [112, 1120], [116, 1060], [124, 1000], [126, 940]].forEach(([x, y], i) => {
    body += `<ellipse cx="${x + (i % 2 ? 14 : -14)}" cy="${y}" rx="14" ry="9" fill="#5E9B4A" stroke="${INK}" stroke-width="2.5"/>`;
  });
  return cover(defs, body);
};
