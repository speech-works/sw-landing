// A young, clean-shaven interview character, using the brand's eyes, palette,
// outlines and SVG construction. Head, collar and tie are independently posed.
const { parts } = require('./kit.cjs');
const path = (d, fill = 'none', extra = '') => `<path d="${d}" fill="${fill}" ${extra}/>`;

function renderInterviewCandidate() {
  const ink = '#242329', shirt = '#FFF9ED';
  // Use the approved face contour verbatim: wide cheeks and the short,
  // squared silhouette shared by the other brand portraits.
  const head = parts.head.match(/<path d="([^"]+)"/)[1];
  const original = parts.moods.listening;
  const eyes = original.slice(original.indexOf('<g id="eyes">'), original.indexOf('<g id="mouth">'))
    .replace('<g id="eyes">', '<g class="rig-eyes">')
    .replace(/<path d="M123\.7[\s\S]*?\/>/, p => `<g transform="translate(-10 0)">${p}</g>`)
    .replace(/<path d="M222[\s\S]*?\/>/, p => `<g transform="translate(-10 0)">${p}</g>`);
  let defs = parts.defs;
  ['#F1BE80', '#F2BE80', '#F4C386'].forEach((color, i) => {
    defs = defs.replace(color, ['#F1CEB3', '#F5D6BE', '#F9DDC8'][i]);
  });
  defs = defs.replace('</defs>', `<clipPath id="face-clip">${path(head)}</clipPath><clipPath id="collar-cut"><path d="M20 240H300V306H20Z" /></clipPath>
    <linearGradient id="shine" x1="0" x2="1"><stop stop-color="#FFFEF0" stop-opacity="0"/><stop offset=".46" stop-color="#FFFEF0" stop-opacity=".06"/><stop offset=".6" stop-color="#FFFEF0" stop-opacity=".3"/><stop offset="1" stop-color="#FFFEF0" stop-opacity="0"/></linearGradient></defs>`);
  // A short textured quiff and tapered sides, with no grey temples or beard.
  const hair = `<g class="candidate-hair">
    ${path('M53 157L48 124C42 104 49 86 62 75C54 60 68 41 88 39C98 19 128 13 149 23C174 10 202 17 218 33C246 30 267 49 266 70C282 85 273 112 260 127L254 156L242 140L236 105L219 112L202 96L184 105L166 91L146 107L127 99L110 119L93 111L77 139L66 160Z', '#9B6F44')}
    ${path('M51 127L64 123L72 147L65 166L55 160ZM245 123L260 127L256 161L249 165L241 143Z', '#B38A60', 'stroke-width="2.3"')}
    ${path('M72 86C95 70 123 61 153 58M100 48C125 36 152 33 177 41M156 78C184 61 210 61 238 75M184 34C211 36 237 48 247 61', 'none', 'stroke="#CA9F6D" stroke-width="4"')}
    ${path('M86 101L111 88M134 87L156 72M202 88L217 82', 'none', 'stroke="#775334" stroke-width="2.5"')}
  </g>`;
  const face = `<g class="candidate-head">
    ${path(head, 'url(#skin)', 'stroke-width="4"')}${hair}
    <g class="candidate-expression">
      ${path('M98 131Q110 125 126 129M194 130Q210 119 225 125', 'none', 'stroke="#644A35" stroke-width="4.4"')}
      ${eyes}
      <g class="candidate-smile">${path('M141 221Q161 235 183 216', 'none', 'stroke-width="3.8"')}${path('M180 215L186 215', 'none', 'stroke-width="2.7"')}</g>
    </g>
    <g clip-path="url(#face-clip)"><g class="candidate-shine">${path('M-125 60L-45 30L60 285L-20 315Z', 'url(#shine)', 'stroke="none"')}</g></g>
  </g>`;
  // The same collar-only construction as the banker avatar, without a torso.
  const collar = `<g class="candidate-collar">
    ${path('M54 244L36 272L67 279L54 288L144 306L157 273L174 306L260 288L247 279L276 272L256 243C220 261 192 268 157 273C121 265 85 254 54 244Z', '#344C65')}
    ${path('M125 267L155 276L184 267L164 306L150 306Z', shirt)}
    ${path('M135 270L155 276L146 287Z', '#FFFFFF', 'stroke-width="2"')}
    ${path('M180 270L155 276L168 287Z', '#FFFFFF', 'stroke-width="2"')}
  </g>`;
  const tie = `<g clip-path="url(#collar-cut)"><g class="candidate-tie">
    ${path('M154 287L164 288L169 306L151 306Z', '#527FC1', 'stroke-width="2.6"')}
    ${path('M146 276Q157 273 169 277L173 283L161 295L152 291L143 283Z', '#608ECE', 'stroke-width="2.8"')}
    ${path('M148 279L157 284L167 279M157 284L160 291', 'none', 'stroke="#A2BDE0" stroke-width="1.8"')}
  </g></g>`;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 310" fill="none" stroke="${ink}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${defs}${face}${collar}${tie}</svg>`;
  const prefix = 'character-id-interview-';
  svg = svg.replace(/id="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`);
  return svg;
}
module.exports = { renderInterviewCandidate };
