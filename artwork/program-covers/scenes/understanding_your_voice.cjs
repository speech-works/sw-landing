// Understanding Your Voice: a small iceberg tip above the water, the much
// bigger part below. A submarine listens to it on sonar; the character looks
// out of the porthole with headphones on. Aurora overhead.
const k = require('./kit.cjs');
const { INK, CREAM, ORANGE, line, shape, avatar, seat, blob, sparkle, dots, scatter, grad, cover } = k;

module.exports = () => {
  const WL = 560;
  const PX = 640, PY = 905;
  const defs = grad('uv-sky', [[0, '#0B1932'], [1, '#22476B']]) +
    grad('uv-sea', [[0, '#2386A0'], [0.45, '#155C78'], [1, '#0A2B44']]) +
    `<clipPath id="uv-port"><circle cx="${PX}" cy="${PY}" r="132"/></clipPath>` +
    `<clipPath id="uv-body"><ellipse cx="800" cy="${PY}" rx="380" ry="176"/></clipPath>`;
  let body = `<rect width="900" height="${WL}" fill="url(#uv-sky)"/>`;
  body += dots(scatter(21, 40, 10, 10, 890, 520, 1.3, 3), CREAM, 0.75);
  // aurora ribbons
  body += `<path d="M-10 230 C140 140 300 290 460 190 C610 100 760 210 910 140 L910 210 C760 290 610 170 460 270 C300 370 140 220 -10 310Z" fill="#7FE0A8" opacity="0.32"/>`;
  body += `<path d="M-10 300 C170 230 320 360 480 280 C640 200 780 300 910 240 L910 280 C780 340 640 250 480 330 C320 410 170 280 -10 350Z" fill="#5FD0C8" opacity="0.25"/>`;
  body += `<path d="M-10 160 C160 100 320 200 470 130 C630 60 770 150 910 90 L910 130 C770 190 630 110 470 180 C320 250 160 150 -10 210Z" fill="#B79CF0" opacity="0.18"/>`;
  body += sparkle(780, 70, 14, CREAM) + sparkle(110, 420, 10, CREAM, 'opacity="0.8"');

  // sea
  body += `<rect y="${WL}" width="900" height="${1200 - WL}" fill="url(#uv-sea)"/>`;
  // light shafts from the surface
  body += `<path d="M120 ${WL} L220 ${WL} L120 1200 L-60 1200Z M380 ${WL} L440 ${WL} L520 1200 L380 1200Z" fill="${CREAM}" opacity="0.06"/>`;
  // the big part of the iceberg, under the water
  body += shape(`M140 ${WL} L560 ${WL} L640 680 L610 820 L670 960 L590 1110 L410 1175 L220 1130 L110 990 L150 850 L70 720Z`, '#A6D8E6', 3.5, 'stroke-opacity="0.5" fill-opacity="0.5"');
  body += line(`M300 ${WL + 20} L360 760 L250 900 L330 1080 M450 600 L520 760 L470 940 L560 1060 M360 760 L520 760 M250 900 L470 940`, '#D4EEF5', 3, 'opacity="0.5"');
  // the tip above the water
  body += shape(`M170 ${WL + 2} L232 470 L286 498 L350 398 L408 452 L452 424 L540 ${WL + 2}Z`, '#F4FAFC', 4.5);
  body += shape(`M350 398 L408 452 L452 424 L540 ${WL + 2} L404 ${WL + 2} L392 480Z`, '#BFE0EC', 0);
  body += line(`M350 398 L392 480 L404 ${WL}`, INK, 3);
  // water line and small floes
  body += line(`M-10 ${WL} L910 ${WL}`, '#BFE6EE', 4);
  body += `<ellipse cx="690" cy="${WL}" rx="44" ry="10" fill="#F4FAFC" stroke="${INK}" stroke-width="3"/><ellipse cx="820" cy="${WL + 2}" rx="26" ry="7" fill="#F4FAFC" stroke="${INK}" stroke-width="3"/>`;
  [[620, 590], [760, 600], [80, 590], [560, 620]].forEach(([x, y]) => { body += line(`M${x - 24} ${y} Q${x} ${y - 6} ${x + 24} ${y}`, '#8FD0DE', 3, 'opacity="0.7"'); });

  // fish
  const fish = (x, y, s, c, flip = 1) => `<path d="M${x} ${y} q${18 * s * flip} ${-12 * s} ${40 * s * flip} 0 q${-22 * s * flip} ${12 * s} ${-40 * s * flip} 0z M${x + 40 * s * flip} ${y} l${14 * s * flip} ${-9 * s} l0 ${18 * s}z" fill="${c}" stroke="${INK}" stroke-width="2.5"/>`;
  body += fish(250, 680, 0.8, '#FFB580') + fish(220, 700, 0.6, '#FFB580') + fish(275, 712, 0.6, '#FFB580');
  body += fish(130, 1040, 0.9, '#C8F750', -1) + fish(170, 1066, 0.7, '#C8F750', -1);
  // seabed
  body += blob([[60, 1210, 90], [200, 1230, 80], [360, 1240, 70], [520, 1230, 60]], '#0A2236', 0);
  body += line('M60 1200 C40 1150 80 1120 56 1080 C40 1050 70 1030 60 1000', '#2E8A6B', 9) + line('M110 1200 C130 1160 96 1130 118 1090', '#3FA07C', 8) + line('M380 1200 C360 1170 392 1150 372 1120', '#2E8A6B', 8);

  // sonar rings reaching toward the hidden part of the iceberg
  [190, 250, 310].forEach((r, i) => {
    const a1 = (150 * Math.PI) / 180, a2 = (210 * Math.PI) / 180;
    body += `<path d="M${(PX + r * Math.cos(a2)).toFixed(1)} ${(PY + r * Math.sin(a2)).toFixed(1)} A${r} ${r} 0 0 0 ${(PX + r * Math.cos(a1)).toFixed(1)} ${(PY + r * Math.sin(a1)).toFixed(1)}" fill="none" stroke="${CREAM}" stroke-width="5" stroke-linecap="round" opacity="${0.75 - i * 0.2}"/>`;
  });

  // submarine
  body += `<rect x="650" y="700" width="170" height="90" rx="22" fill="#FFC542" stroke="${INK}" stroke-width="4.5"/>`;
  body += line(`M770 700 L770 ${WL - 26} L806 ${WL - 26}`, INK, 16) + line(`M770 700 L770 ${WL - 26} L806 ${WL - 26}`, '#E0A23A', 8);
  body += `<ellipse cx="800" cy="${PY}" rx="380" ry="176" fill="#FFC542" stroke="${INK}" stroke-width="5"/>`;
  body += `<g clip-path="url(#uv-body)"><rect x="400" y="${PY + 96}" width="800" height="120" fill="${ORANGE}"/></g>`;
  body += `<ellipse cx="800" cy="${PY}" rx="380" ry="176" fill="none" stroke="${INK}" stroke-width="5"/>`;
  body += line(`M440 ${PY + 96} L900 ${PY + 96}`, INK, 4);
  body += line(`M470 ${PY - 90} C520 ${PY - 140} 600 ${PY - 160} 700 ${PY - 166}`, '#FFE08A', 8, 'opacity="0.9"');
  // rivets
  for (let x = 470; x < 900; x += 40) body += `<circle cx="${x}" cy="${PY + 120}" r="4" fill="${INK}"/>`;
  // small porthole
  body += `<circle cx="866" cy="${PY - 30}" r="44" fill="#E0A23A" stroke="${INK}" stroke-width="4"/><circle cx="866" cy="${PY - 30}" r="30" fill="#0F4A5E" stroke="${INK}" stroke-width="3"/>`;
  // main porthole with the character
  body += `<circle cx="${PX}" cy="${PY}" r="152" fill="#E0A23A" stroke="${INK}" stroke-width="5"/>`;
  body += `<circle cx="${PX}" cy="${PY}" r="132" fill="#124F63"/>`;
  body += `<g clip-path="url(#uv-port)">${seat('headphones', 'attentive', PX - 122, PY + 132, 244, 'uv')}</g>`;
  body += `<circle cx="${PX}" cy="${PY}" r="132" fill="none" stroke="${INK}" stroke-width="4"/>`;
  body += line(`M${PX - 96} ${PY - 50} A110 110 0 0 1 ${PX - 40} ${PY - 104}`, '#FFFFFF', 7, 'opacity="0.45"');
  for (let i = 0; i < 10; i++) {
    const a = (i / 10) * Math.PI * 2;
    body += `<circle cx="${(PX + 142 * Math.cos(a)).toFixed(1)}" cy="${(PY + 142 * Math.sin(a)).toFixed(1)}" r="5" fill="${INK}"/>`;
  }
  // bubbles
  [[520, 720, 10], [540, 680, 7], [512, 646, 5], [880, 760, 9], [896, 720, 6]].forEach(([x, y, r]) => {
    body += `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${CREAM}" stroke-width="3" opacity="0.8"/>`;
  });
  return cover(defs, body);
};
