// The Hard Conversations: blue hour, phone lines run across the sky to a lit
// window where the character is on a call. Birds on the wire chat in pairs.
const k = require('./kit.cjs');
const { INK, CREAM, ORANGE, line, shape, avatar, seat, blob, sparkle, dots, scatter, grad, cover, wire, perched } = k;

module.exports = () => {
  const NIGHT = '#17181F';
  const defs = grad('hc-sky', [[0, '#1C2741'], [0.45, '#33507A'], [0.8, '#6A8AB5'], [1, '#86A2C6']]) +
    `<clipPath id="hc-win2"><rect x="40" y="958" width="200" height="150"/></clipPath><radialGradient id="hc-glow" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FFD15C" stop-opacity="0.55"/><stop offset="1" stop-color="#FFD15C" stop-opacity="0"/></radialGradient>`;
  let body = `<rect width="900" height="1200" fill="url(#hc-sky)"/>`;
  body += dots(scatter(5, 34, 10, 10, 890, 640, 1.4, 3), CREAM, 0.75);
  body += sparkle(760, 610, 14, CREAM) + sparkle(120, 180, 10, CREAM, 'opacity="0.8"') + sparkle(560, 90, 8, CREAM, 'opacity="0.7"');
  // moon behind the pole
  body += `<circle cx="252" cy="560" r="160" fill="url(#hc-glow)"/><circle cx="252" cy="560" r="96" fill="#FFD15C"/>`;

  // far town on the horizon with lit windows
  body += shape('M-10 960 L40 960 L40 920 L90 920 L90 945 L150 945 L150 905 L175 885 L200 905 L200 950 L260 950 L260 930 L310 930 L310 960 L470 960 L470 1210 L-10 1210Z', '#24304A', 0);
  [[58, 932], [70, 932], [112, 955], [160, 918], [182, 918], [214, 962], [276, 942], [292, 942]].forEach(([x, y]) => {
    body += `<rect x="${x}" y="${y}" width="8" height="10" fill="#FFD15C" opacity="0.9"/>`;
  });

  // far pole
  body += `<rect x="104" y="660" width="12" height="560" fill="${NIGHT}"/><rect x="62" y="684" width="96" height="9" fill="${NIGHT}"/>`;
  // main pole
  body += `<rect x="318" y="360" width="24" height="860" fill="${NIGHT}"/>`;
  body += `<rect x="196" y="420" width="268" height="14" fill="${NIGHT}"/><rect x="220" y="472" width="220" height="12" fill="${NIGHT}"/>`;
  body += `<rect x="262" y="512" width="46" height="96" rx="4" fill="${NIGHT}"/><rect x="352" y="512" width="46" height="96" rx="4" fill="${NIGHT}"/>`;
  body += line('M285 608 C280 650 300 660 318 668 M375 608 C380 640 360 650 342 660', NIGHT, 3);
  [204, 250, 410, 456].forEach(x => { body += `<rect x="${x - 4}" y="408" width="8" height="14" fill="${NIGHT}"/>`; });

  // wires
  const wires = [
    wire([204, 412], [-10, 250], 30), wire([250, 412], [-10, 330], 40),
    wire([204, 412], [62, 684], 40), wire([456, 412], [158, 684], 120),
    wire([62, 684], [-10, 760], 10), wire([158, 684], [-10, 840], 30),
    wire([410, 412], [910, 300], 60), wire([456, 412], [910, 420], 70),
    wire([228, 474], [910, 560], 110), wire([436, 474], [880, 770], 60),
    wire([250, 412], [910, 110], 40),
  ];
  wires.forEach(w => { body += w.d; });
  // birds chatting on the wires
  const [ax, ay] = wires[7].at(0.38), [bx, by] = wires[7].at(0.5);
  body += perched(ax, ay + 1, 1.1, 1) + perched(bx, by + 1, 1.1, -1);
  const [cx, cy] = wires[8].at(0.6), [dx, dy] = wires[8].at(0.71);
  body += perched(cx, cy + 1, 0.95, 1) + perched(dx, dy + 1, 0.95, -1);
  const [ex, ey] = wires[3].at(0.8);
  body += perched(ex, ey + 1, 0.85, -1);
  // tiny chat marks between the pairs
  body += line(`M${(ax + bx) / 2 - 6} ${ay - 46} l0 -10 M${(ax + bx) / 2 + 6} ${ay - 44} l4 -9`, CREAM, 3, 'opacity="0.8"');
  body += line(`M${(cx + dx) / 2 - 5} ${cy - 42} l0 -9 M${(cx + dx) / 2 + 6} ${cy - 40} l4 -8`, CREAM, 3, 'opacity="0.8"');

  // the house on the other end of the call
  body += shape('M-10 930 L150 820 L300 930 L300 1220 L-10 1220Z', NIGHT, 0);
  body += line('M-10 930 L150 820 L300 930', '#3A4560', 5);
  body += wire([204, 474], [150, 826], 30).d;
  body += `<rect x="40" y="958" width="200" height="150" fill="#FFC857"/>`;
  body += dots(scatter(17, 10, 46, 964, 234, 1100, 2, 3.2), '#F0A93E', 0.9);
  body += `<g clip-path="url(#hc-win2)">${seat('silver', 'listening', 66, 1104, 150, 'hc2', 3)}</g>`;
  body += `<rect x="36" y="954" width="208" height="158" fill="none" stroke="#3A4560" stroke-width="8"/>`;
  body += `<rect x="26" y="1104" width="228" height="20" rx="5" fill="${CREAM}" stroke="${INK}" stroke-width="3.5"/>`;
  body += `<rect x="252" y="990" width="30" height="60" fill="#FFC857"/>`;
  body += blob([[300, 1150, 60], [360, 1170, 56], [420, 1150, 50]], '#1E2433', 0) + `<rect x="-10" y="1124" width="480" height="100" fill="#1E2433"/>`;

  // house: a big gable on the right
  body += shape('M430 900 L700 690 L965 900 L965 1220 L470 1220 L470 900Z', NIGHT, 0);
  body += `<rect x="806" y="700" width="56" height="130" fill="${NIGHT}"/><rect x="796" y="694" width="76" height="16" fill="${NIGHT}"/>`;
  body += line('M430 902 L700 690 L965 902', '#3A4560', 5);
  // chimney smoke
  body += line('M834 680 C810 650 860 630 836 600 C816 576 852 556 838 530', '#8EA3C2', 6, 'opacity="0.45"');
  // round attic window
  body += `<circle cx="700" cy="800" r="40" fill="#FFC857" stroke="#3A4560" stroke-width="6"/>` + line('M700 760 L700 840 M660 800 L740 800', NIGHT, 6);
  // side window
  body += `<rect x="494" y="940" width="44" height="74" fill="#FFC857"/>` + line('M516 940 L516 1014', NIGHT, 5);

  // the main lit window
  body += `<rect x="556" y="890" width="300" height="252" fill="#FFC857"/>`;
  // room behind: wallpaper dots, a frame, a lamp
  body += dots(scatter(9, 30, 566, 900, 846, 1130, 2, 3.5), '#F0A93E', 0.9);
  body += `<rect x="790" y="912" width="44" height="54" rx="3" fill="#F0A93E" stroke="${INK}" stroke-width="3"/>`;
  body += line('M612 890 L612 920', INK, 3) + shape('M590 940 L634 940 L622 918 L602 918Z', ORANGE, 3);
  body += seat('communicator', 'speaking', 594, 1134, 226, 'hc', -3);
  // curtains tied back
  body += shape('M556 890 L606 890 C600 940 584 990 600 1044 C584 1080 570 1110 556 1142Z', ORANGE, 4);
  body += shape('M856 890 L806 890 C812 940 828 990 812 1044 C828 1080 842 1110 856 1142Z', ORANGE, 4);
  body += line('M572 900 C568 960 566 1020 574 1080 M840 900 C844 960 846 1020 838 1080', '#D96F25', 3);
  body += `<rect x="552" y="886" width="308" height="260" fill="none" stroke="#3A4560" stroke-width="10"/>`;
  // sill with a plant and a sleeping cat
  body += `<rect x="534" y="1134" width="344" height="28" rx="6" fill="${CREAM}" stroke="${INK}" stroke-width="4"/>`;
  body += shape('M566 1134 L570 1108 L598 1108 L602 1134Z', '#C9692F', 3.5);
  body += shape('M582 1108 C566 1086 562 1072 570 1062 C582 1074 586 1090 582 1108Z M584 1108 C592 1084 604 1076 614 1078 C610 1094 598 1104 584 1108Z', '#5E9B4A', 3);
  body += shape('M790 1134 C788 1116 804 1106 822 1108 C836 1110 846 1120 844 1134Z', NIGHT, 0);
  body += shape('M830 1112 L834 1098 L838 1108 L843 1099 L845 1116Z', NIGHT, 0);
  body += line('M790 1132 C778 1132 774 1124 779 1118', NIGHT, 5);
  return cover(defs, body);
};
