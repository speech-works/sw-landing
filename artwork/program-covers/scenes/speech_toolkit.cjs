// The Speech Toolkit: a greenhouse in the morning. A potting bench of
// different plants, each tried and tended; one pot still just soil.
const k = require('./kit.cjs');
const { INK, CREAM, ORANGE, line, shape, avatar, seat, blob, sparkle, dots, scatter, grad, cover } = k;

const leaf = (x, y, len, rot, fill = '#5DAA5E') =>
  `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M0 0 C${len * 0.3} ${-len * 0.28} ${len * 0.75} ${-len * 0.24} ${len} 0 C${len * 0.75} ${len * 0.24} ${len * 0.3} ${len * 0.28} 0 0Z" fill="${fill}" stroke="${INK}" stroke-width="3"/><path d="M4 0 L${len * 0.85} 0" stroke="${INK}" stroke-width="2" opacity="0.5"/></g>`;

module.exports = () => {
  const defs = grad('st-out', [[0, '#1B4A57'], [0.6, '#2C6B6A'], [1, '#3E8A74']]);
  let body = `<rect width="900" height="1200" fill="url(#st-out)"/>`;
  // outside: far trees through the glass
  body += blob([[60, 760, 120], [220, 720, 110], [380, 770, 100], [560, 730, 120], [740, 760, 110], [880, 720, 100]], '#24584F', 0);
  // sun beams
  body += `<path d="M900 0 L780 0 L120 1200 L380 1200Z M900 160 L900 300 L560 1200 L460 1200Z" fill="${CREAM}" opacity="0.07"/>`;
  body += sparkle(700, 160, 14, CREAM) + sparkle(220, 260, 10, CREAM, 'opacity="0.7"');

  // greenhouse frame: gable end with glazing bars
  const bar = d => line(d, INK, 16) + line(d, CREAM, 9);
  body += bar('M-10 430 L450 110 L910 430');
  body += bar('M-10 430 L910 430') + bar('M-10 700 L910 700');
  [150, 300, 450, 600, 750].forEach(x => {
    const top = x <= 450 ? 430 - ((x + 10) / 460) * 320 : 430 - ((910 - x) / 460) * 320;
    body += bar(`M${x} ${top.toFixed(0)} L${x} 1000`);
  });
  // glass sheen
  body += line('M180 560 L260 470 M200 600 L290 500 M640 560 L700 490 M820 640 L880 570', '#FFFFFF', 5, 'opacity="0.25"');

  // hanging baskets with trailing vines
  const basket = (x) => line(`M${x} 430 L${x - 30} 520 M${x} 430 L${x + 30} 520`, INK, 3) +
    shape(`M${x - 44} 516 L${x + 44} 516 C${x + 40} 556 ${x - 40} 556 ${x - 44} 516Z`, '#C9692F', 4) +
    line(`M${x - 30} 540 C${x - 50} 600 ${x - 20} 640 ${x - 40} 700 M${x + 26} 540 C${x + 44} 590 ${x + 20} 630 ${x + 34} 680 M${x} 548 C${x - 6} 590 ${x + 8} 610 ${x} 650`, '#3F7A30', 4) +
    leaf(x - 46, 610, 26, 200, '#6BB75C') + leaf(x - 38, 680, 24, 160, '#5DAA5E') + leaf(x + 40, 600, 24, -20, '#6BB75C') + leaf(x + 30, 666, 22, 30) + leaf(x - 4, 640, 20, 100, '#6BB75C') +
    leaf(x - 40, 512, 30, 210, '#5DAA5E') + leaf(x + 40, 512, 30, -30, '#6BB75C') + leaf(x, 500, 28, -90, '#4C9A4E');
  body += basket(160) + basket(740);

  // big leafy plants behind the bench
  [[40, 980, 150, -70], [70, 960, 130, -40], [20, 940, 120, -100], [860, 980, 150, -110], [830, 960, 130, -140], [880, 930, 120, -80]].forEach(([x, y, l, r], i) => {
    body += leaf(x, y, l, r, i % 2 ? '#3F8A55' : '#2F7A47');
  });

  // the character behind the bench
  body += seat('coils', 'inquisitive', 322, 1000, 256, 'st');
  // bench
  body += `<rect x="-10" y="1000" width="920" height="30" fill="#C98A4B" stroke="${INK}" stroke-width="4.5"/>`;
  body += `<rect x="-10" y="1030" width="920" height="190" fill="#A0652F" stroke="${INK}" stroke-width="4.5"/>`;
  body += line('M-10 1090 L910 1090 M-10 1150 L910 1150', '#7E4C22', 4);
  // garden tools hung along the bench front
  body += line('M120 1066 L780 1066', '#7E4C22', 6);
  const hook = x => `<circle cx="${x}" cy="1066" r="6" fill="#9AA3B5" stroke="${INK}" stroke-width="2.5"/>`;
  // trowel
  body += hook(150) + `<rect x="140" y="1070" width="20" height="44" rx="8" fill="${ORANGE}" stroke="${INK}" stroke-width="3.5"/>` + shape('M136 1112 L164 1112 C168 1140 158 1166 150 1176 C142 1166 132 1140 136 1112Z', '#9AA3B5', 3.5);
  // hand fork
  body += hook(270) + `<rect x="260" y="1070" width="20" height="44" rx="8" fill="#5E9B4A" stroke="${INK}" stroke-width="3.5"/>` + shape('M250 1112 L290 1112 L290 1122 L250 1122Z', '#9AA3B5', 3) + line('M254 1122 L254 1168 M270 1122 L270 1172 M286 1122 L286 1168', '#9AA3B5', 6) + line('M254 1122 L254 1168 M270 1122 L270 1172 M286 1122 L286 1168', INK, 1.5);
  // twine
  body += hook(400) + `<rect x="372" y="1080" width="56" height="64" rx="16" fill="#E8D4A8" stroke="${INK}" stroke-width="3.5"/>` + line('M378 1096 L422 1096 M378 1112 L422 1112 M378 1128 L422 1128', '#C9A66E', 3) + line('M400 1144 C404 1160 392 1168 398 1182', '#C9A66E', 3);
  // small rake
  body += hook(530) + `<rect x="522" y="1070" width="16" height="60" rx="6" fill="#C9874A" stroke="${INK}" stroke-width="3.5"/>` + shape('M500 1128 L560 1128 L560 1138 L500 1138Z', '#9AA3B5', 3) + line('M506 1138 L506 1158 M520 1138 L520 1158 M534 1138 L534 1158 M548 1138 L548 1158', INK, 4);
  // spare pots
  [[660, 1176], [720, 1176]].forEach(([x, y]) => { body += shape(`M${x - 26} ${y} L${x - 20} ${y - 46} L${x + 20} ${y - 46} L${x + 26} ${y}Z`, '#C9692F', 3.5); });
  body += shape('M800 1176 L806 1132 L846 1132 L852 1176Z', '#C9692F', 3.5);

  const pot = (x, w = 64, h = 60) => shape(`M${x - w / 2} 1000 L${x - w / 2 - 6} ${1000 - h} L${x + w / 2 + 6} ${1000 - h} L${x + w / 2} 1000Z`, '#C9692F', 4) + `<rect x="${x - w / 2 - 10}" y="${1000 - h - 12}" width="${w + 20}" height="16" rx="4" fill="#D9804A" stroke="${INK}" stroke-width="3.5"/>`;
  // sunflower, tall
  body += line('M110 940 C104 860 120 800 112 720', '#3F7A30', 8) + leaf(112, 850, 60, -30) + leaf(108, 900, 54, 200, '#6BB75C');
  for (let i = 0; i < 12; i++) body += `<ellipse cx="${112 + Math.cos((i / 12) * Math.PI * 2) * 34}" cy="${712 + Math.sin((i / 12) * Math.PI * 2) * 34}" rx="20" ry="9" fill="#FFD15C" stroke="${INK}" stroke-width="2.5" transform="rotate(${(i / 12) * 360} ${112 + Math.cos((i / 12) * Math.PI * 2) * 34} ${712 + Math.sin((i / 12) * Math.PI * 2) * 34})"/>`;
  body += `<circle cx="112" cy="712" r="24" fill="#7A4A2C" stroke="${INK}" stroke-width="3.5"/>` + dots([[104, 706, 2.5], [118, 716, 2.5], [112, 700, 2.5], [122, 702, 2.5], [102, 720, 2.5]], '#4A2C18');
  body += pot(112, 70, 66);
  // seedlings
  body += line('M226 936 L226 902 M246 940 L248 912', '#3F7A30', 5) + leaf(226, 902, 26, -150, '#8BCB5A') + leaf(226, 902, 26, -30, '#8BCB5A') + leaf(248, 912, 20, -40, '#8BCB5A');
  body += pot(236, 60, 56);
  // empty pot, just soil and a marker
  body += `<ellipse cx="660" cy="944" rx="34" ry="8" fill="#5A3A22"/>` + line('M676 944 L682 900', '#E8D4A8', 6) + `<rect x="672" y="884" width="22" height="20" rx="3" fill="${CREAM}" stroke="${INK}" stroke-width="2.5"/>`;
  body += pot(660, 60, 56);
  // cactus with a flower
  body += shape('M762 930 L762 870 C762 846 794 846 794 870 L794 930Z M794 900 L812 900 C822 900 822 880 822 872 L822 860', '#6BB75C', 4) + `<circle cx="778" cy="848" r="10" fill="#F58FB0" stroke="${INK}" stroke-width="3"/>`;
  body += line('M770 880 l-6 -3 M786 896 l6 -3 M770 912 l-6 -3', INK, 2);
  body += pot(778, 58, 56);
  // watering can and trowel
  body += shape('M836 1000 L836 940 C836 928 880 928 880 940 L880 1000Z', ORANGE, 4) + line('M836 960 L800 930', INK, 12) + line('M836 960 L800 930', ORANGE, 6) + line('M846 936 C846 912 872 912 872 936', INK, 5);
  // seed packet
  body += `<rect x="282" y="976" width="44" height="26" rx="3" fill="${CREAM}" stroke="${INK}" stroke-width="3" transform="rotate(-8 304 989)"/><circle cx="304" cy="988" r="7" fill="#F58FB0"/>`;

  // butterflies and a drifting feather
  const fly = (x, y, c, r) => `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse cx="-12" cy="-6" rx="13" ry="17" fill="${c}" stroke="${INK}" stroke-width="3"/><ellipse cx="12" cy="-6" rx="13" ry="17" fill="${c}" stroke="${INK}" stroke-width="3"/><ellipse cx="-8" cy="12" rx="8" ry="10" fill="${c}" stroke="${INK}" stroke-width="3"/><ellipse cx="8" cy="12" rx="8" ry="10" fill="${c}" stroke="${INK}" stroke-width="3"/><rect x="-2.5" y="-16" width="5" height="34" rx="2.5" fill="${INK}"/></g>`;
  body += fly(620, 600, ORANGE, 14) + fly(300, 650, '#C8F750', -18);
  body += `<g transform="translate(480 560) rotate(30)"><path d="M0 -40 C18 -20 16 20 0 40 C-16 20 -18 -20 0 -40Z" fill="${CREAM}" stroke="${INK}" stroke-width="3"/>${line('M0 -36 L0 50', INK, 2.5)}</g>`;
  return cover(defs, body);
};
