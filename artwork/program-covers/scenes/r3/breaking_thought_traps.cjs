// Breaking Thought Traps, round 3: after the founder's "Take a break"
// reference (references/breaking_thought_traps-01.webp). The bob character
// redrawn in side view as a big calm head, eyes closed; at the back of the
// head a door opens in the hair, and a small version of the same character
// steps out of it, down a staircase of dots. Getting out of the loop, not
// fighting it. The reference's words are left out.
const k = require('../kit.cjs');
const { INK, ORANGE, line, cover } = k;
const { parts } = require('../../../avatars/kit.cjs');

module.exports = () => {
  const BG = '#6EC1EA';
  const [SKIN_D, SKIN, SKIN_L] = parts.skinColors.brown;
  const HAIR = '#302525';
  const HAIR_L = '#48332F';
  const TOP = '#E77963';
  const PAPER = '#FFFDF8';
  const defs = `<pattern id="btt3-tone" width="9" height="9" patternUnits="userSpaceOnUse" stroke="none"><rect width="9" height="9" fill="#EDEDEA"/><circle cx="4.5" cy="4.5" r="1.8" fill="${INK}"/></pattern>`;
  const o = (w = 5) => `stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;

  let body = `<rect width="900" height="1200" fill="${BG}"/>`;


  // the big head in side view, facing left: skin, then the bob over the back
  body += `<path d="M392 1062 L392 968 C330 966 262 946 222 912 C178 874 150 826 140 780 L138 752 C112 754 94 738 96 716 C98 694 116 686 138 688 C136 600 166 520 222 470 C286 414 362 396 438 398 C540 402 620 456 660 540 C690 610 690 720 676 800 C664 880 650 960 650 1062 Z" fill="${SKIN}" ${o()}/>`;
  body += `<path d="M230 462 C290 410 364 394 438 398 C540 402 622 456 662 540 C692 610 692 720 678 800 C666 880 652 960 652 1062 L470 1062 C474 990 470 920 452 850 C426 750 378 650 310 568 C284 536 258 496 230 462 Z" fill="${HAIR}" ${o()}/>`;
  body += line('M300 458 C380 430 480 440 560 490 M330 520 C410 520 500 560 580 640', HAIR_L, 4);
  // ear on the hair line
  body += `<path d="M392 690 C432 680 448 712 444 736 C440 762 416 774 396 766 Z" fill="${SKIN}" ${o(4.5)}/>` + line('M408 704 C424 708 428 724 420 740', SKIN_D, 3.5);
  // eyebrow, closed eye, a small smile
  body += line('M160 588 Q188 570 220 584', INK, 5) + line('M164 636 Q190 660 216 636', INK, 5.5) + line('M148 812 Q164 824 182 816', INK, 4.5);

  // the stairs, in front of the back of the head as in the reference: a
  // landing at the door, then five steps down to the right
  body += `<path d="M596 720 L716 720 L716 788 L758 788 L758 856 L800 856 L800 924 L842 924 L842 992 L884 992 L884 1062 L596 1062 Z" fill="url(#btt3-tone)" ${o()}/>`;

  // ── the opening, cut into the back of the head ─────────────────────────
  // An arch in the hair, a little in from the head's outline so a rim of hair
  // stays round it. Its depth shows as the head's own thickness: a reveal on
  // the right and over the top, then the light inside.
  const xL = 600, xR = 674, yB = 720, yS = 600, r = (xR - xL) / 2;
  const arch = (l, rr, b, sTop) => { const rad = (rr - l) / 2; return `M${l} ${b} L${l} ${sTop} A${rad} ${rad} 0 0 1 ${rr} ${sTop} L${rr} ${b} Z`; };
  const defs2 = `<clipPath id="btt3-hole"><path d="${arch(xL, xR, yB, yS)}"/></clipPath>`;
  body += `<path d="${arch(xL, xR, yB, yS)}" fill="#5A423A"/>`;
  body += `<g clip-path="url(#btt3-hole)">` +
    `<path d="${arch(xL - 14, xR - 14, yB + 4, yS + 6)}" fill="#FFF1C9" stroke="${INK}" stroke-width="3"/>` +
    `<path d="M${xL - 14} ${yB - 30} L${xR - 14} ${yB - 30}" stroke="#F6DFA2" stroke-width="4"/>` +
    `<path d="M${xR - 14} ${yS + 6} L${xR} ${yS} M${xR - 14} ${yB + 4} L${xR} ${yB}" stroke="${INK}" stroke-width="2.5"/>` +
    `</g>`;
  body += `<path d="${arch(xL, xR, yB, yS)}" fill="none" ${o(5)}/>`;
  // light spilling out over the landing
  body += `<path d="M${xL} ${yB} L${xR} ${yB} L${xR + 34} ${yB + 14} L${xL + 22} ${yB + 14} Z" fill="#FFF1C9" opacity="0.85"/>`;

  // ── the door: hinged on the opening's left side, swung out toward us ────
  // Seen at an angle, so it is narrow, and its free edge (nearer to us) is
  // taller than the hinge edge. Its thickness shows along the free edge.
  const leaf = `M${xL} ${yB} L${xL} ${yS} C${xL} ${yS - 26} ${xL - 8} ${yS - 44} ${xL - 18} ${yS - 46} C${xL - 30} ${yS - 46} ${xL - 38} ${yS - 30} ${xL - 38} ${yS - 8} L${xL - 38} ${yB + 14} Z`;
  body += `<path d="M${xL - 38} ${yS - 8} C${xL - 38} ${yS - 32} ${xL - 30} ${yS - 48} ${xL - 18} ${yS - 48} L${xL - 22} ${yS - 50} C${xL - 36} ${yS - 50} ${xL - 46} ${yS - 32} ${xL - 46} ${yS - 6} L${xL - 46} ${yB + 12} L${xL - 38} ${yB + 14} Z" fill="#C9661F" ${o(4)}/>`;
  body += `<path d="${leaf}" fill="${ORANGE}" ${o(4.5)}/>`;
  body += `<path d="M${xL - 6} ${yB - 8} L${xL - 31} ${yB + 2} L${xL - 31} ${yB - 46} L${xL - 6} ${yB - 52} Z M${xL - 6} ${yB - 66} L${xL - 31} ${yB - 62} L${xL - 31} ${yS - 2} C${xL - 30} ${yS - 26} ${xL - 22} ${yS - 34} ${xL - 16} ${yS - 32} C${xL - 9} ${yS - 30} ${xL - 6} ${yS - 18} ${xL - 6} ${yS - 6} Z" fill="#FFA766" ${o(2.5)}/>`;
  body += `<circle cx="${xL - 33}" cy="${yB - 58}" r="4.5" fill="#F5C33B" ${o(2.5)}/>`;
  body += `<path d="M${xL - 2} ${yS + 8} L${xL + 4} ${yS + 8} M${xL - 2} ${yB - 14} L${xL + 4} ${yB - 14}" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`;

  // ── the runner: the same person in side view, escaping down the stairs ──
  // Built in her own frame (origin at the hip, x forward), leaning hard into
  // the run: back foot kicked up still in the doorway, front foot leaping to
  // the first step, the near arm pumping forward. The head is the big
  // head's own paths, mirrored, so she is plainly the same person.
  const S = 0.1, AX = 520, AY = 1062, NX = 22, NY = -44;
  const tp = (d) => d.replace(/(-?\d+(?:\.\d+)?)[ ,](-?\d+(?:\.\d+)?)/g, (_, x, y) =>
    `${(NX - (Number(x) - AX) * S).toFixed(1)} ${(NY + (Number(y) - AY) * S).toFixed(1)}`);
  const pt = (x, y) => [NX - (x - AX) * S, NY + (y - AY) * S];
  const SKIN_PATH = 'M392 1062 L392 968 C330 966 262 946 222 912 C178 874 150 826 140 780 L138 752 C112 754 94 738 96 716 C98 694 116 686 138 688 C136 600 166 520 222 470 C286 414 362 396 438 398 C540 402 620 456 660 540 C690 610 690 720 676 800 C664 880 650 960 650 1062 Z';
  const HAIR_PATH = 'M230 462 C290 410 364 394 438 398 C540 402 622 456 662 540 C692 610 692 720 678 800 C666 880 652 960 652 1062 L470 1062 C474 990 470 920 452 850 C426 750 378 650 310 568 C284 536 258 496 230 462 Z';
  const EAR_PATH = 'M392 690 C432 680 448 712 444 736 C440 762 416 774 396 766 Z';
  const tube = (d, fill, w) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 6}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${fill}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const shoe = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M-6 -6 C2 -9 12 -6 15 0 C16 4 13 6 9 6 L-7 6 C-10 2 -9 -4 -6 -6 Z" fill="${PAPER}" ${o(3)}/><path d="M-7 3 L14 3" stroke="${INK}" stroke-width="2"/></g>`;
  const fist = (x, y) => `<circle cx="${x}" cy="${y}" r="5.5" fill="${SKIN}" ${o(3)}/>`;
  const SKIN_FAR = SKIN_D;
  let run = '';
  // far side: arm swinging back behind the body, leg kicked up behind
  run += tube('M14 -38 L-2 -24 L-14 -32', SKIN_FAR, 7) + fist(-16, -33);
  run += tube('M-2 0 L-24 18 L-50 6', SKIN_FAR, 8) + shoe(-56, 2, -150);
  // near leg, thigh driven forward and down, reaching for the step
  run += tube('M4 2 L30 22 L40 58', SKIN, 8) + shoe(46, 62, 10);
  // the dress, leaning into the run, its hem flicked back by the speed
  run += `<path d="M4 -48 C14 -54 32 -52 40 -44 L30 8 C16 16 -6 16 -30 2 C-22 -2 -14 -6 -10 -10 Z" fill="${TOP}" ${o(3.5)}/>`;
  run += `<path d="M10 -2 C2 2 -10 2 -20 0" fill="none" stroke="#C95A48" stroke-width="2.5" stroke-linecap="round"/>`;
  // the head
  run += `<path d="${tp(SKIN_PATH)}" fill="${SKIN}" ${o(3)}/>`;
  run += `<path d="${tp(HAIR_PATH)}" fill="${HAIR}" ${o(3)}/>`;
  run += `<path d="${tp(EAR_PATH)}" fill="${SKIN}" ${o(2.5)}/>`;
  const [ex, ey] = pt(196, 640), [bx, by] = pt(196, 590), [mx, my] = pt(166, 818);
  run += `<ellipse cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" rx="3" ry="4" fill="${INK}"/>`;
  run += line(`M${(bx - 6).toFixed(1)} ${(by + 2).toFixed(1)} Q${bx.toFixed(1)} ${(by - 3).toFixed(1)} ${(bx + 6).toFixed(1)} ${(by + 1).toFixed(1)}`, INK, 2.5);
  run += line(`M${(mx - 5).toFixed(1)} ${(my - 1).toFixed(1)} Q${mx.toFixed(1)} ${(my + 5).toFixed(1)} ${(mx + 6).toFixed(1)} ${(my - 2).toFixed(1)}`, INK, 2.5);
  // near arm, pumping forward, bent at the elbow like a runner's
  run += tube('M22 -38 L34 -18 L50 -30', SKIN, 7) + fist(52, -32);
  body += `<g transform="translate(706 682) scale(1.05) rotate(4)">${run}</g>`;
  // speed lines behind her, inside the doorway's light
  body += line('M612 640 L640 640 M606 660 L638 660 M616 680 L640 680', '#E2C47E', 4);
  return cover(defs + defs2, body);
};
