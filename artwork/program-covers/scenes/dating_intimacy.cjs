// Dating, Intimacy & Vulnerability: two people share a Ferris wheel cabin at
// sunset over the city. One laughs, one looks over, both easy.
const k = require('./kit.cjs');
const { INK, CREAM, ORANGE, line, shape, avatar, seat, sparkle, dots, bird, scatter, grad, cover } = k;

module.exports = () => {
  const C = [770, 330], R = 470;
  const defs = grad('di-sky', [[0, '#2B1A45'], [0.35, '#6B2C63'], [0.62, '#C24F6B'], [0.82, '#F08A5D'], [1, '#FFC27A']]) +
    `<clipPath id="di-win"><rect x="272" y="812" width="336" height="190" rx="22"/></clipPath>`;
  let body = `<rect width="900" height="1200" fill="url(#di-sky)"/>`;
  body += dots(scatter(31, 30, 10, 10, 890, 420, 1.3, 2.8), CREAM, 0.7);
  body += sparkle(120, 140, 13, CREAM) + sparkle(470, 70, 9, CREAM, 'opacity="0.8"');
  // low sun
  body += `<circle cx="190" cy="900" r="170" fill="#FFD27A" opacity="0.25"/><circle cx="190" cy="900" r="112" fill="#FFD27A"/>`;
  body += bird(330, 540, 18, '#3A1F45') + bird(372, 522, 14, '#3A1F45');

  // wheel legs
  body += line(`M${C[0]} ${C[1]} L560 1210 M${C[0]} ${C[1]} L980 1210`, INK, 20) + line(`M${C[0]} ${C[1]} L560 1210 M${C[0]} ${C[1]} L980 1210`, '#E8DCCB', 11);
  // rim and spokes
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    body += line(`M${C[0]} ${C[1]} L${(C[0] + R * Math.cos(a)).toFixed(1)} ${(C[1] + R * Math.sin(a)).toFixed(1)}`, CREAM, 3.5, 'opacity="0.85"');
  }
  body += `<circle cx="${C[0]}" cy="${C[1]}" r="${R}" fill="none" stroke="${INK}" stroke-width="16"/><circle cx="${C[0]}" cy="${C[1]}" r="${R}" fill="none" stroke="${CREAM}" stroke-width="8"/>`;
  body += `<circle cx="${C[0]}" cy="${C[1]}" r="${R - 34}" fill="none" stroke="${CREAM}" stroke-width="4" opacity="0.7"/>`;
  for (let d = 0; d < 360; d += 7.5) {
    const a = (d * Math.PI) / 180;
    body += `<circle cx="${(C[0] + R * Math.cos(a)).toFixed(1)}" cy="${(C[1] + R * Math.sin(a)).toFixed(1)}" r="5" fill="#FFE29A"/>`;
  }
  body += `<circle cx="${C[0]}" cy="${C[1]}" r="38" fill="${ORANGE}" stroke="${INK}" stroke-width="5"/><circle cx="${C[0]}" cy="${C[1]}" r="12" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>`;
  // other cabins on the rim
  const colors = ['#3E9A9A', '#FFD15C', '#E66F8F', '#7FA8D9'];
  [-90, -60, -30, 0, 30, 60, 90, 165, 195, 225].forEach((d, i) => {
    const a = (d * Math.PI) / 180;
    const px = C[0] + R * Math.cos(a), py = C[1] + R * Math.sin(a);
    body += line(`M${px} ${py} L${px} ${py + 14}`, INK, 4);
    body += `<rect x="${px - 34}" y="${py + 12}" width="68" height="56" rx="14" fill="${colors[i % 4]}" stroke="${INK}" stroke-width="3.5"/><rect x="${px - 22}" y="${py + 22}" width="44" height="24" rx="6" fill="#FFE8B0" stroke="${INK}" stroke-width="2.5"/>`;
  });

  // city
  const city = [[-10, 900, 90], [70, 940, 60], [130, 870, 70], [200, 920, 80], [290, 880, 60], [350, 940, 90], [450, 890, 70], [520, 930, 80], [600, 870, 90], [690, 920, 70], [760, 880, 80], [840, 930, 80]];
  city.forEach(([x, y, w], i) => {
    body += `<rect x="${x}" y="${y}" width="${w}" height="${1030 - y}" fill="${i % 2 ? '#3A1F45' : '#45264F'}"/>`;
    for (let wy = y + 14; wy < 1010; wy += 24) for (let wx = x + 10; wx < x + w - 12; wx += 20) if ((wx + wy + i) % 3) body += `<rect x="${wx}" y="${wy}" width="8" height="11" fill="#FFD27A" opacity="0.85"/>`;
  });
  // river with the sun in it
  body += `<rect x="-10" y="1030" width="920" height="190" fill="#4A2550"/>`;
  [[1050, 200], [1076, 150], [1102, 110], [1128, 80], [1154, 54]].forEach(([y, w]) => { body += line(`M${190 - w / 2} ${y} L${190 + w / 2} ${y}`, '#FFB36B', 7, 'opacity="0.85"'); });
  body += line('M520 1070 L600 1070 M680 1100 L760 1100 M420 1140 L520 1140 M760 1170 L860 1170', '#C24F6B', 5, 'opacity="0.7"');

  // our cabin
  const px = 440, py = 674;
  body += line(`M${px} ${py} L${px} 748`, INK, 12) + line(`M${px} ${py} L${px} 748`, CREAM, 5);
  body += `<g transform="translate(440 760) scale(1.18) translate(-440 -760)">`;
  body += shape('M244 792 Q440 700 636 792Z', ORANGE, 5) + `<circle cx="${px}" cy="742" r="12" fill="${CREAM}" stroke="${INK}" stroke-width="4"/>`;
  body += `<rect x="240" y="782" width="400" height="300" rx="36" fill="#3E9A9A" stroke="${INK}" stroke-width="5"/>`;
  body += `<rect x="272" y="812" width="336" height="190" rx="22" fill="#F7C28A"/>`;
  // string lights inside the cabin
  body += line('M286 828 Q440 862 594 828', INK, 2.5);
  [300, 340, 380, 420, 460, 500, 540, 580].forEach((x, i) => { body += `<circle cx="${x}" cy="${834 + Math.sin((i / 7) * Math.PI) * 26}" r="5" fill="${i % 2 ? '#FFE29A' : '#FFFFFF'}"/>`; });
  body += `<g clip-path="url(#di-win)">${seat('flower', 'laughing', 282, 996, 190, 'di', 5)}${seat('cap', 'pleased', 418, 996, 190, 'di2', -5)}</g>`;
  body += `<rect x="272" y="812" width="336" height="190" rx="22" fill="none" stroke="${INK}" stroke-width="5"/>`;
  body += `<rect x="262" y="996" width="356" height="18" rx="6" fill="${CREAM}" stroke="${INK}" stroke-width="4"/>`;
  body += line('M262 1040 L618 1040', '#2E7C7C', 4);
  // small heart on the cabin door panel
  body += `<path d="M440 1066 C424 1052 410 1046 412 1036 C414 1026 430 1024 440 1036 C450 1024 466 1026 468 1036 C470 1046 456 1052 440 1066Z" fill="${ORANGE}" stroke="${INK}" stroke-width="3.5"/>`;
  body += `</g>`;
  return cover(defs, body);
};
