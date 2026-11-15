// The Panic Button: a rowing boat on a still lake at first light, oars resting.
const k = require('./kit.cjs');
const { INK, CREAM, line, shape, avatar, seat, blob, sparkle, dots, bird, scatter, grad, cover, pine } = k;

function lilyPad(x, y, rx, rot = 0, fill = '#79B648', vein = '#4F8C33') {
  const ry = rx * 0.36;
  // pad with a wedge notch toward the viewer-right
  const d = `M${x} ${y} L${x + rx * 0.95} ${y - ry * 0.25} A${rx} ${ry} 0 1 0 ${x + rx * 0.9} ${y + ry * 0.35} Z`;
  const veins = line(`M${x} ${y} L${x - rx * 0.6} ${y - ry * 0.5} M${x} ${y} L${x - rx * 0.7} ${y + ry * 0.4} M${x} ${y} L${x + rx * 0.1} ${y + ry * 0.85}`, vein, 2.5);
  return `<g transform="rotate(${rot} ${x} ${y})">${shape(d, fill, 3.5)}${veins}</g>`;
}

function waterLily(x, y, s) {
  const petal = (a, len, wid, fill) => {
    const rad = (a * Math.PI) / 180;
    const tx = x + Math.cos(rad) * len, ty = y + Math.sin(rad) * len * 0.55;
    const nx = -Math.sin(rad) * wid, ny = Math.cos(rad) * wid * 0.55;
    return `<path d="M${x} ${y} Q${x + (tx - x) / 2 + nx} ${y + (ty - y) / 2 + ny} ${tx} ${ty} Q${x + (tx - x) / 2 - nx} ${y + (ty - y) / 2 - ny} ${x} ${y}Z" fill="${fill}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
  };
  let out = '';
  [200, 340, 160, 20, 250, 290].forEach(a => { out += petal(a, s * 1.15, s * 0.42, '#F7F0E2'); });
  [235, 270, 305, 215, 325].forEach(a => { out += petal(a, s * 0.95, s * 0.38, '#FFFFFF'); });
  out += `<ellipse cx="${x}" cy="${y - s * 0.12}" rx="${s * 0.3}" ry="${s * 0.2}" fill="#FFC542" stroke="${INK}" stroke-width="3"/>`;
  return out;
}

function reeds(x, base, flip = 1) {
  const stems = [
    [0, 330, 18], [26, 400, -6], [52, 300, 24], [-22, 260, -20], [70, 360, 8],
  ];
  let out = '';
  stems.forEach(([dx, h, lean], i) => {
    const sx = x + dx * flip, tx = sx + lean * flip;
    out += line(`M${sx} ${base} Q${sx + lean * 0.2 * flip} ${base - h * 0.6} ${tx} ${base - h}`, '#3F6B3A', 7);
    if (i % 2 === 0) out += line(`M${tx - lean * 0.06 * flip} ${base - h + 64} L${tx} ${base - h + 6}`, INK, 24) + line(`M${tx - lean * 0.06 * flip} ${base - h + 64} L${tx} ${base - h + 6}`, '#7A4A2C', 15) + line(`M${tx} ${base - h + 4} L${tx + lean * 0.03 * flip} ${base - h - 18}`, '#3F6B3A', 4);
  });
  // long leaves
  out += line(`M${x + 10 * flip} ${base} Q${x + 70 * flip} ${base - 140} ${x + 150 * flip} ${base - 180}`, '#5B8C45', 9);
  out += line(`M${x + 30 * flip} ${base} Q${x - 10 * flip} ${base - 180} ${x + 40 * flip} ${base - 250}`, '#4C7B3C', 8);
  return out;
}

module.exports = () => {
  const defs = grad('pb-sky', [[0, '#2F3561'], [0.38, '#6B4C82'], [0.52, '#C2678A'], [0.6, '#F0A07A']]) +
    grad('pb-lake', [[0, '#7FB2B4'], [0.18, '#3E8C92'], [1, '#1D5560']]);
  const stars = scatter(11, 26, 20, 20, 880, 420, 1.5, 3.2);
  let body = `<rect width="900" height="1200" fill="url(#pb-sky)"/>`;
  body += dots(stars, CREAM, 0.7);
  body += sparkle(720, 150, 16, CREAM) + sparkle(150, 300, 11, CREAM, 'opacity="0.8"') + sparkle(820, 380, 9, CREAM, 'opacity="0.7"');
  // the sun coming up behind the hills
  body += `<circle cx="590" cy="650" r="150" fill="#FFB86B" opacity="0.35"/><circle cx="590" cy="650" r="112" fill="#FFD27A"/>`;
  body += bird(250, 470, 22, INK, 4) + bird(305, 505, 15, INK, 3.5) + bird(640, 430, 18, INK, 3.5);
  // far hills
  body += shape('M-10 640 L80 560 L160 600 L270 500 L380 610 L450 580 L520 620 L600 540 L700 600 L790 520 L910 600 L910 720 L-10 720Z', '#A0628D', 3);
  body += shape('M-10 680 L60 640 L170 670 L250 625 L360 690 L480 660 L560 690 L680 640 L800 680 L910 650 L910 730 L-10 730Z', '#6A4878', 3);
  // tree line on the far shore
  let trees = '';
  for (let x = -10; x < 920; x += 26) trees += pine(x, 712 + (x % 3) * 3, 46 + ((x * 7) % 30), '#3B2F58');
  body += trees;
  // mist
  body += `<ellipse cx="220" cy="704" rx="260" ry="16" fill="${CREAM}" opacity="0.18"/><ellipse cx="700" cy="708" rx="240" ry="12" fill="${CREAM}" opacity="0.16"/>`;
  // lake
  body += `<rect x="-10" y="712" width="920" height="500" fill="url(#pb-lake)"/>`;
  body += line('M-10 712 L910 712', INK, 3);
  body += `<path d="M-10 900 C120 860 260 930 380 1000 C470 1050 600 1010 700 1060 C800 1110 860 1080 910 1060 L910 1210 L-10 1210Z" fill="#185060" opacity="0.45"/>`;
  body += `<path d="M-10 760 C150 740 300 790 450 770 C600 750 760 790 910 760 L910 800 C760 830 600 790 450 812 C300 832 150 784 -10 800Z" fill="#9CCBC8" opacity="0.18"/>`;
  // sun on the water
  [[730, 150], [756, 120], [784, 86], [814, 58], [846, 34]].forEach(([y, w]) => {
    body += line(`M${590 - w / 2} ${y} L${590 + w / 2} ${y}`, '#FFD27A', 8);
  });
  // ripples
  [[120, 780, 60], [330, 820, 44], [800, 800, 50], [210, 880, 36], [700, 870, 40]].forEach(([x, y, w]) => {
    body += line(`M${x - w} ${y} Q${x} ${y - 8} ${x + w} ${y}`, '#A9D3CF', 3.5, 'opacity="0.8"');
  });
  // fish under the water
  const fish = (x, y, s, flip = 1) => `<path d="M${x} ${y} q${18 * s * flip} ${-12 * s} ${40 * s * flip} 0 q${-22 * s * flip} ${12 * s} ${-40 * s * flip} 0z M${x + 40 * s * flip} ${y} l${14 * s * flip} ${-9 * s} l0 ${18 * s}z" fill="#1B4A55" opacity="0.8"/>`;
  body += fish(130, 1090, 1.3) + fish(160, 1120, 0.9) + fish(760, 1060, 1.2, -1);

  // boat: far gunwale and inside first
  body += shape('M150 908 C300 872 600 872 750 908 L750 940 L150 940Z', '#7E3C1D', 4.5);
  body += line('M210 902 C330 884 570 884 690 902', '#5E2C15', 4);
  // seat plank visible at the back
  body += `<rect x="300" y="880" width="300" height="20" rx="6" fill="#B65D2B" stroke="${INK}" stroke-width="4"/>`;
  body += seat('beanie', 'relieved', 305, 930, 290, 'pb');
  // oars resting in the oarlocks, blades in the water
  const oar = (x1, y1, x2, y2, bx, by, rot) =>
    line(`M${x1} ${y1} L${x2} ${y2}`, INK, 17) + line(`M${x1} ${y1} L${x2} ${y2}`, '#E6B060', 9) +
    `<ellipse cx="${bx}" cy="${by}" rx="58" ry="20" fill="#E6B060" stroke="${INK}" stroke-width="4.5" transform="rotate(${rot} ${bx} ${by})"/>`;
  const ring = (x, y) => `<ellipse cx="${x}" cy="${y}" rx="84" ry="20" fill="none" stroke="#A9D3CF" stroke-width="4" opacity="0.8"/><ellipse cx="${x}" cy="${y}" rx="120" ry="30" fill="none" stroke="#A9D3CF" stroke-width="3" opacity="0.45"/>`;
  body += ring(96, 1012) + ring(804, 1012);
  body += oar(212, 916, 104, 1000, 92, 1008, 34) + oar(688, 916, 796, 1000, 808, 1008, -34);
  // near hull
  body += shape('M140 906 C300 940 600 940 760 906 C742 990 660 1036 450 1040 C240 1036 158 990 140 906Z', '#C9692F', 4.5);
  body += shape('M140 906 C300 940 600 940 760 906 L756 922 C600 956 300 956 144 922Z', CREAM, 4);
  body += line('M160 940 C300 972 600 972 740 940', '#E48A4C', 6);
  body += line('M168 966 C300 1000 600 1000 732 966', '#8A4320', 3.5) + line('M210 1008 C330 1028 570 1028 690 1008', '#8A4320', 3.5);
  body += `<circle cx="210" cy="918" r="9" fill="${INK}"/><circle cx="690" cy="918" r="9" fill="${INK}"/>`;
  // reflection
  body += `<path d="M190 1048 C320 1076 580 1076 710 1048 L690 1066 C560 1092 340 1092 210 1066Z" fill="#164550" opacity="0.55"/>`;
  body += line('M260 1100 L400 1100 M470 1100 L620 1100 M320 1124 L560 1124', '#164550', 6, 'opacity="0.5"');

  // reeds at both edges
  body += reeds(40, 1210, 1);
  // dragonfly
  body += `<g transform="translate(760 780) rotate(-12)"><ellipse cx="-16" cy="-8" rx="22" ry="8" fill="#CFE9F0" opacity="0.9" stroke="${INK}" stroke-width="2.5"/><ellipse cx="16" cy="-8" rx="22" ry="8" fill="#CFE9F0" opacity="0.9" stroke="${INK}" stroke-width="2.5"/>${line('M-30 0 L34 0', '#2F6E9E', 7)}<circle cx="38" cy="0" r="6" fill="#2F6E9E" stroke="${INK}" stroke-width="2.5"/></g>`;

  // lily pads and flowers in the foreground
  body += lilyPad(240, 1150, 90, -6) + lilyPad(430, 1186, 76, 8, '#6BAA3E') + lilyPad(640, 1146, 96, 4) + lilyPad(806, 872, 44, 10, '#6BAA3E') + lilyPad(860, 1170, 70, -4, '#6BAA3E');
  body += waterLily(250, 1140, 34) + waterLily(650, 1136, 38) + waterLily(810, 864, 18);
  return cover(defs, body);
};
