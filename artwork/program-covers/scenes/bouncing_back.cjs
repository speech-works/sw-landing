// Bouncing Back: after the rain. A hot-air balloon lifts off a wet field again,
// the rain cloud drifting away, a rainbow behind.
const k = require('./kit.cjs');
const { INK, CREAM, ORANGE, line, shape, avatar, seat, blob, cloud, sparkle, dots, bird, scatter, grad, cover, roundTree } = k;

module.exports = () => {
  const BX = 520;
  const T0 = 340;
  const env = `M${BX} ${T0} C${BX + 140} ${T0} ${BX + 195} ${T0 + 95} ${BX + 186} ${T0 + 185} C${BX + 177} ${T0 + 270} ${BX + 98} ${T0 + 305} ${BX + 63} ${T0 + 360} L${BX - 63} ${T0 + 360} C${BX - 98} ${T0 + 305} ${BX - 177} ${T0 + 270} ${BX - 186} ${T0 + 185} C${BX - 195} ${T0 + 95} ${BX - 140} ${T0} ${BX} ${T0}Z`;
  const defs = grad('bb-sky', [[0, '#2A78C2'], [0.55, '#6FB5E6'], [0.8, '#B5DDF3']]) + `<clipPath id="bb-env"><path d="${env}"/></clipPath>`;
  let body = `<rect width="900" height="1200" fill="url(#bb-sky)"/>`;
  // sun breaking through
  body += `<circle cx="770" cy="250" r="110" fill="#FFE29A" opacity="0.22"/><circle cx="770" cy="250" r="72" fill="#FFD15C" stroke="${INK}" stroke-width="4"/>`;
  // rainbow
  const bands = ['#FF7A59', ORANGE, '#FFD15C', '#8BCB5A', '#5AA9E6', '#8C7CD6'];
  bands.forEach((c, i) => {
    const r = 600 - i * 24;
    body += `<path d="M${BX - 60 - r} 1000 A${r} ${r} 0 0 1 ${BX - 60 + r} 1000" fill="none" stroke="${c}" stroke-width="25"/>`;
  });
  body += `<path d="M${BX - 60 - 613} 1000 A613 613 0 0 1 ${BX - 60 + 613} 1000 M${BX - 60 - 467} 1000 A467 467 0 0 1 ${BX - 60 + 467} 1000" fill="none" stroke="${INK}" stroke-width="3.5"/>`;
  // the rain cloud moving off, last drops
  body += cloud(-60, 300, 380, '#8B98AB', 4.5, '#77849A');
  body += line('M40 330 L28 372 M100 330 L88 372 M160 330 L148 372 M220 330 L208 372 M70 392 L60 424 M130 392 L120 424 M190 392 L180 424', '#E6EEF5', 4, 'opacity="0.8"');
  body += cloud(600, 520, 230, CREAM, 4) + cloud(60, 640, 170, CREAM, 3.5);
  body += bird(300, 470, 18) + bird(345, 500, 13) + bird(820, 470, 15);

  // ground: hills and fields
  body += shape('M-10 960 C150 900 300 930 460 950 C620 970 760 900 910 920 L910 1210 L-10 1210Z', '#7FBF5A', 4);
  body += shape('M-10 1040 C120 1000 260 1010 400 1050 C540 1090 700 1020 910 1030 L910 1210 L-10 1210Z', '#5E9E44', 4);
  body += shape('M560 960 C640 940 720 930 800 940 L840 1010 C760 1008 680 1018 610 1030Z', '#E8C657', 3.5);
  body += line('M600 970 L640 1020 M650 958 L690 1014 M700 950 L740 1012 M750 944 L790 1008', '#C9A63E', 3);
  body += shape('M-10 1150 C80 1110 200 1110 300 1150 C330 1170 340 1190 340 1210 L-10 1210Z', '#4C8A38', 3.5);
  // path through the field
  body += shape('M300 1210 C320 1150 380 1110 460 1080 C520 1060 560 1050 600 1046 L612 1052 C570 1060 530 1074 480 1096 C410 1126 370 1170 360 1210Z', '#D9B07A', 3.5);
  // puddles that hold the sky
  body += `<ellipse cx="200" cy="1090" rx="70" ry="16" fill="#9ED2F0" stroke="${INK}" stroke-width="3.5"/><ellipse cx="760" cy="1120" rx="90" ry="18" fill="#9ED2F0" stroke="${INK}" stroke-width="3.5"/>`;
  body += line('M170 1088 L210 1088 M730 1116 L790 1116', '#FFFFFF', 4, 'opacity="0.8"');
  // farmhouse and trees
  body += shape('M70 960 L70 900 L110 868 L150 900 L150 960Z', CREAM, 3.5) + shape('M62 904 L110 862 L158 904Z', '#C9692F', 3.5) + `<rect x="98" y="920" width="20" height="40" fill="#8A4E25" stroke="${INK}" stroke-width="3"/>`;
  body += roundTree(210, 958, 110, '#4C8A38', '#7A4A2C', 3.5) + roundTree(860, 940, 120, '#4C8A38', '#7A4A2C', 3.5) + roundTree(30, 1000, 90, '#3F7A30', '#7A4A2C', 3.5);
  // flowers in the near grass
  [[60, 1170], [110, 1186], [640, 1170], [700, 1190], [820, 1176], [860, 1196]].forEach(([x, y], i) => {
    const c = i % 2 ? '#FFD15C' : CREAM;
    body += `<circle cx="${x}" cy="${y}" r="12" fill="${c}" stroke="${INK}" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="4.5" fill="${ORANGE}"/>`;
  });
  body += line('M30 1150 l6 -18 M40 1152 l-4 -16 M590 1150 l6 -18 M600 1150 l-4 -16 M790 1150 l6 -18', '#3F7A30', 4);

  // balloon
  const T = 340;
  body += `<g clip-path="url(#bb-env)"><rect x="${BX - 230}" y="${T - 10}" width="460" height="400" fill="${ORANGE}"/>` +
    `<ellipse cx="${BX}" cy="${T + 190}" rx="130" ry="270" fill="${CREAM}"/><ellipse cx="${BX}" cy="${T + 190}" rx="82" ry="270" fill="#2E8C8A"/><ellipse cx="${BX}" cy="${T + 190}" rx="34" ry="270" fill="${CREAM}"/>` +
    `<path d="M${BX - 240} ${T + 272} C${BX - 80} ${T + 308} ${BX + 80} ${T + 308} ${BX + 240} ${T + 272} L${BX + 240} ${T + 290} C${BX + 80} ${T + 326} ${BX - 80} ${T + 326} ${BX - 240} ${T + 290}Z" fill="#FFD15C" stroke="${INK}" stroke-width="3.5"/>` +
    `<path d="M${BX + 104} ${T + 40} C${BX + 156} ${T + 84} ${BX + 172} ${T + 146} ${BX + 162} ${T + 200}" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linecap="round" opacity="0.45"/></g>`;
  body += `<path d="${env}" fill="none" stroke="${INK}" stroke-width="5"/>`;
  body += line(`M${BX - 130} ${T + 44} C${BX - 176} ${T + 124} ${BX - 166} ${T + 250} ${BX - 63} ${T + 360} M${BX - 84} ${T + 10} C${BX - 118} ${T + 90} ${BX - 104} ${T + 250} ${BX - 22} ${T + 360} M${BX + 84} ${T + 10} C${BX + 118} ${T + 90} ${BX + 104} ${T + 250} ${BX + 22} ${T + 360} M${BX + 130} ${T + 44} C${BX + 176} ${T + 124} ${BX + 166} ${T + 250} ${BX + 63} ${T + 360}`, INK, 3);
  body += `<rect x="${BX - 68}" y="${T + 358}" width="136" height="20" rx="6" fill="#B9733A" stroke="${INK}" stroke-width="4"/>`;
  // ropes down to the basket
  body += line(`M${BX - 62} ${T + 376} L${BX - 122} 1004 M${BX + 62} ${T + 376} L${BX + 122} 1004 M${BX - 30} ${T + 376} L${BX - 60} 1004 M${BX + 30} ${T + 376} L${BX + 60} 1004`, INK, 3.5);
  body += `<rect x="${BX - 22}" y="${T + 376}" width="44" height="26" rx="6" fill="#6E6A66" stroke="${INK}" stroke-width="3.5"/>`;
  body += `<path d="M${BX - 12} ${T + 404} C${BX - 18} ${T + 420} ${BX + 16} ${T + 420} ${BX + 10} ${T + 404}" fill="#FFB580" stroke="${INK}" stroke-width="3"/>`;
  // the character in the basket, face and collar clear of the rim
  body += seat('braids', 'warm', BX - 117, 994, 234, 'bb');
  body += `<rect x="${BX - 140}" y="1004" width="280" height="126" rx="14" fill="#C9874A" stroke="${INK}" stroke-width="5"/>`;
  body += `<rect x="${BX - 150}" y="994" width="300" height="26" rx="10" fill="#8A4E25" stroke="${INK}" stroke-width="4.5"/>`;
  body += line(`M${BX - 124} 1050 L${BX + 124} 1050 M${BX - 124} 1078 L${BX + 124} 1078 M${BX - 124} 1104 L${BX + 124} 1104`, '#9C6230', 3.5);
  for (let x = BX - 100; x <= BX + 100; x += 40) body += line(`M${x} 1022 L${x} 1126`, '#9C6230', 3);
  body += line(`M${BX + 134} 1030 L${BX + 154} 1068`, INK, 3) + `<ellipse cx="${BX + 160}" cy="1084" rx="20" ry="24" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/>`;
  return cover(defs, body);
};
