// Interview Ready: morning in the city. The character rides a glass lift up
// the outside of an office building; one floor up, the panel waits in a lit room.
const k = require('./kit.cjs');
const { INK, CREAM, ORANGE, line, shape, avatar, seat, blob, cloud, sparkle, dots, bird, scatter, grad, cover, roundTree } = k;

module.exports = () => {
  const defs = grad('ir-sky', [[0, '#2A73BC'], [0.5, '#6FB3E6'], [0.75, '#B9E0F5']]) +
    `<clipPath id="ir-room"><rect x="52" y="634" width="388" height="156"/></clipPath>` +
    `<clipPath id="ir-car"><rect x="520" y="790" width="250" height="250"/></clipPath>`;
  let body = `<rect width="900" height="1200" fill="url(#ir-sky)"/>`;
  body += `<circle cx="760" cy="170" r="104" fill="#FFE29A" opacity="0.25"/><circle cx="760" cy="170" r="64" fill="#FFD15C" stroke="${INK}" stroke-width="4"/>`;
  body += cloud(40, 330, 230, CREAM, 4) + cloud(600, 420, 190, CREAM, 3.5) + cloud(330, 230, 120, CREAM, 3);
  body += bird(300, 380, 18) + bird(345, 410, 13) + bird(520, 330, 14);

  // far skyline, pale with distance
  const far = [[-10, 470, 90], [80, 520, 70], [150, 430, 80], [230, 500, 60], [290, 460, 90], [380, 520, 70], [450, 410, 70], [520, 480, 90], [610, 440, 60], [670, 500, 80], [750, 420, 70], [820, 480, 100]];
  far.forEach(([x, y, w]) => { body += `<rect x="${x}" y="${y}" width="${w}" height="${700 - y}" fill="#9CC3E2"/>`; });
  // clock tower
  body += `<rect x="168" y="360" width="56" height="300" fill="#7FAAD0" stroke="${INK}" stroke-width="3"/>` + shape('M160 362 L196 300 L232 362Z', '#6A97C2', 3);
  body += `<circle cx="196" cy="400" r="20" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>` + line('M196 400 L196 386 M196 400 L184 404', INK, 3);
  // mid skyline
  const mid = [[-10, 560, 120], [120, 600, 90], [260, 540, 110], [380, 590, 80], [600, 560, 120], [740, 600, 80], [830, 540, 90]];
  mid.forEach(([x, y, w], i) => {
    body += `<rect x="${x}" y="${y}" width="${w}" height="${700 - y}" fill="${i % 2 ? '#5F8FBA' : '#6B9AC4'}" stroke="${INK}" stroke-width="3"/>`;
    for (let wy = y + 16; wy < 680; wy += 26) for (let wx = x + 12; wx < x + w - 14; wx += 22) body += `<rect x="${wx}" y="${wy}" width="10" height="14" fill="#B9DAF0" opacity="0.8"/>`;
  });

  // the office building in front
  body += `<rect x="-10" y="610" width="920" height="600" fill="#EBDCC2" stroke="${INK}" stroke-width="4.5"/>`;
  body += `<rect x="-10" y="596" width="920" height="26" fill="#D6C29E" stroke="${INK}" stroke-width="4"/>`;
  // pigeons on the cornice
  const pigeon = (x, y, d = 1) => `<g transform="translate(${x} ${y}) scale(${d} 1)"><ellipse cx="0" cy="-14" rx="18" ry="12" fill="#9AA3B5" stroke="${INK}" stroke-width="3"/><circle cx="14" cy="-26" r="8" fill="#9AA3B5" stroke="${INK}" stroke-width="3"/><path d="M21 -26 L28 -24 L21 -22Z" fill="${ORANGE}"/><circle cx="16" cy="-28" r="1.8" fill="${INK}"/><path d="M-16 -12 L-28 -6" stroke="${INK}" stroke-width="3"/></g>`;
  body += pigeon(120, 596) + pigeon(170, 596, -1) + pigeon(830, 596);
  // window grid on the facade
  const win = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#8CC3E6" stroke="${INK}" stroke-width="3.5"/>` + line(`M${x + 10} ${y + h - 14} L${x + w * 0.45} ${y + 10}`, '#FFFFFF', 4, 'opacity="0.55"');
  [[860, 660], [860, 840], [860, 1020]].forEach(([x, y]) => { body += win(x - 40, y, 90, 130); });
  [[60, 860], [190, 860], [320, 860], [60, 1040], [190, 1040], [320, 1040]].forEach(([x, y]) => { body += win(x, y, 100, 130); });
  body += `<rect x="190" y="860" width="100" height="130" fill="#F6D9A8" stroke="${INK}" stroke-width="3.5"/>` + line('M226 860 L226 892', INK, 3) + shape('M208 912 L244 912 L236 892 L216 892Z', ORANGE, 3) + `<rect x="252" y="944" width="26" height="46" rx="3" fill="#7FB3A0" stroke="${INK}" stroke-width="3"/>`;
  [[110, 990], [370, 990], [370, 1170]].forEach(([x, y]) => { body += shape(`M${x - 18} ${y} L${x - 14} ${y - 26} L${x + 14} ${y - 26} L${x + 18} ${y}Z`, '#C9692F', 3) + shape(`M${x} ${y - 26} C${x - 18} ${y - 50} ${x - 12} ${y - 62} ${x - 4} ${y - 64} C${x + 4} ${y - 50} ${x + 2} ${y - 36} ${x} ${y - 26}Z M${x + 2} ${y - 26} C${x + 10} ${y - 48} ${x + 22} ${y - 54} ${x + 28} ${y - 50} C${x + 24} ${y - 36} ${x + 14} ${y - 28} ${x + 2} ${y - 26}Z`, '#5E9B4A', 2.5); });

  // the interview room: a lit window with the panel at a table
  body += `<rect x="52" y="634" width="388" height="156" fill="#F6D9A8"/>`;
  body += `<rect x="300" y="652" width="54" height="40" rx="3" fill="#7FB3A0" stroke="${INK}" stroke-width="3"/>` + shape('M70 790 L70 700 C70 676 104 676 104 700 L104 790Z', '#5E9B4A', 3);
  body += `<g clip-path="url(#ir-room)">${seat('banker', 'composed', 112, 780, 148, 'ir2', 2)}${seat('silver', 'warm', 252, 780, 148, 'ir3', -2)}</g>`;
  body += `<rect x="52" y="780" width="388" height="10" fill="#8A4E25"/>`;
  body += `<rect x="52" y="634" width="388" height="156" fill="none" stroke="${INK}" stroke-width="5"/>` + `<rect x="40" y="788" width="412" height="16" rx="4" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/>`;
  // water glass and papers on the table
  body += `<rect x="390" y="756" width="18" height="24" fill="#CFE8F5" stroke="${INK}" stroke-width="2.5"/>`;

  // lift shaft
  body += `<rect x="500" y="560" width="290" height="660" fill="#6A9AC6" stroke="${INK}" stroke-width="4"/>`;
  body += line('M510 560 L510 1210 M780 560 L780 1210', '#2E3A48', 8) + line('M520 620 L770 620 M520 700 L770 700 M520 780 L770 780 M520 1150 L770 1150', '#4E7FA8', 3);
  body += `<circle cx="645" cy="574" r="22" fill="#2E3A48" stroke="${INK}" stroke-width="3.5"/>` + line('M630 590 L630 770 M660 590 L660 770', INK, 3);
  // the lift car
  body += `<rect x="512" y="766" width="266" height="28" rx="6" fill="#2E3A48" stroke="${INK}" stroke-width="4"/><circle cx="645" cy="780" r="7" fill="#C8F750"/>`;
  body += `<rect x="520" y="790" width="250" height="250" fill="#DCEFF8"/>`;
  body += `<g clip-path="url(#ir-car)">${seat('scholar', 'determined', 535, 1036, 220, 'ir')}</g>`;
  body += `<rect x="512" y="1036" width="266" height="80" rx="6" fill="${ORANGE}" stroke="${INK}" stroke-width="4.5"/>` + line('M530 1062 L760 1062', '#D96F25', 3);
  body += `<rect x="512" y="790" width="16" height="250" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/><rect x="762" y="790" width="16" height="250" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/>`;
  body += line('M742 816 L716 866 M752 846 L734 882', '#FFFFFF', 4, 'opacity="0.7"');

  // street with trees
  body += `<rect x="-10" y="1180" width="920" height="40" fill="#8E8A82" stroke="${INK}" stroke-width="4"/>`;
  body += roundTree(70, 1186, 190, '#5E9E44', '#7A4A2C', 3.5) + roundTree(420, 1190, 160, '#4C8A38', '#7A4A2C', 3.5) + roundTree(860, 1190, 170, '#5E9E44', '#7A4A2C', 3.5);
  return cover(defs, body);
};
