// All artwork uses the approved 320 × 310 face and eye anchors.
// Markup uses portable SVG primitives so the same parts can render with SvgXml
// in react-native-svg. Mobile integration is deliberately separate from export.
const master = require('./approved-parts.json');
const ink = '#242329';
const path = (d, fill = 'none', width = 3.5, extra = '') =>
  `<path d="${d}" fill="${fill}" stroke-width="${width}" ${extra}/>`;
const group = (id, markup) => `<g id="${id}">${markup}</g>`;
const line = d => path(d, 'none', 4.5);
const circle = (cx, cy, r, fill) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}"/>`;

const head = master.head;
// Facial hair is clipped against the actual head, not an approximate jawline.
// This eliminates skin slivers and keeps the beard inside the shared silhouette.
const headContour = head.match(/<path d="([^"]+)"/)[1];
const hair = {
  none: '',
  swoop: master['hair-front'],
  curls: group('hair-front', path('M53 156C35 156 34 139 40 130C25 120 33 102 44 100C36 86 48 74 61 76C58 59 74 50 86 58C89 41 107 39 118 49C127 33 146 35 153 46C165 32 183 35 190 46C204 35 222 43 223 56C241 52 254 67 248 79C266 79 275 95 266 106C282 115 277 132 265 136C276 150 270 165 258 167L250 125C244 104 227 87 209 83C202 100 186 99 177 89C169 111 150 114 134 101C124 121 103 122 88 111C81 134 68 144 53 156Z', '#242123')),
  crop: group('hair-front', path('M50 151C43 145 42 133 46 119L60 116C58 83 95 50 140 47C185 40 240 63 254 112L269 125L264 147L254 166L245 122C228 124 207 116 198 100C194 112 182 119 169 113C149 105 142 87 132 85C123 112 100 131 77 134L65 154L60 167L52 160Z', '#A9542E') + path('M77 124C109 110 119 88 128 72M194 86C211 103 227 110 243 113', 'none', 3, 'stroke="#733B28"')),
  bob: group('hair-back', path('M60 252C34 254 28 245 30 229L39 125C44 63 91 32 157 34C224 34 267 72 278 127L290 231C291 246 276 254 251 251Z', '#302525') + path('M53 151L47 239M264 147L276 237', 'none', 4, 'stroke="#48332F"')),
  waves: group('hair-back', path('M56 250C34 261 18 246 26 233C7 223 17 211 25 200C10 188 19 174 25 164C12 149 29 134 32 124C18 109 37 96 42 88C39 71 56 62 71 64C77 42 103 44 119 39C159 25 224 38 246 61C268 65 278 85 271 101C290 114 288 128 280 140C298 157 286 171 281 183C299 201 288 216 286 224C302 242 281 254 258 250Z', '#573C2E') + path('M47 95C64 122 36 139 45 161C60 185 40 201 45 223M261 108C245 134 277 146 264 165C251 185 279 202 267 229', 'none', 4, 'stroke="#372A24"')),
};

// Texture, age and grooming are independent of skin colour and wardrobe.
hair.silver = group('hair-back', path('M48 235C25 237 31 213 35 196C15 162 26 124 37 109C27 73 61 41 90 41C115 17 150 25 167 26C207 14 250 50 260 79C286 95 289 126 277 149C292 182 282 216 268 238L252 251L56 249Z', '#D6D5CF') + path('M42 108C57 88 76 81 89 84M257 115C267 136 263 155 269 174', 'none', 3, 'stroke="#A6AAA6"'));
hair.bald = group('hair-front', path('M58 100C45 118 46 152 52 169L68 154L70 106Z', '#A3A9A4') + path('M249 103C260 119 267 148 262 165L250 153L240 111Z', '#A3A9A4'));
hair.coils = group('hair-front', path('M48 157C25 157 24 135 33 122C15 108 28 89 41 86C35 66 50 52 69 56C71 36 88 28 107 39C119 19 139 21 153 33C168 17 190 22 201 38C220 24 242 36 243 55C265 54 275 70 269 89C289 99 287 120 274 130C283 147 272 162 254 161L246 118C223 128 208 123 198 105C183 129 165 127 152 112C139 134 118 132 105 116C95 141 79 145 64 139L58 161Z', '#252027'));
hair.braids = group('hair-back', path('M55 246C25 232 38 208 37 189C20 172 34 151 33 133C19 107 41 83 50 66C48 46 68 35 83 40C112 16 201 22 230 43C252 32 272 49 266 68C290 86 286 110 277 128C295 149 280 169 281 189C294 213 280 236 262 245Z', '#282024') + path('M45 103L58 117L42 132L55 149L41 167L53 185L41 203L53 223M271 99L259 115L278 132L263 152L278 170L265 188L277 207L262 225', 'none', 3, 'stroke="#4D3831"'));
hair.pigtails = group('hair-back', path('M80 100C61 116 31 108 21 82C13 62 15 30 28 23C44 14 61 30 65 48C69 64 90 68 94 86Z', '#F4D375') + path('M234 100C254 116 284 107 296 82C305 62 305 33 294 25C279 14 260 29 256 48C252 65 230 68 223 86Z', '#F4D375') + path('M30 43C26 65 43 89 62 96M48 42C49 63 59 72 73 83M288 45C291 66 274 89 252 96M272 44C269 63 258 74 247 84', 'none', 3, 'stroke="#CAAA56"'));
hair.sidepart = group('hair-front', path('M51 151C39 106 57 58 105 39C142 19 194 27 219 45C255 54 273 97 262 149L246 129C237 109 222 98 200 86C175 110 137 124 95 119L69 138L62 159Z', '#34363C') + path('M177 49C151 86 116 101 68 105M190 57C218 66 238 89 249 108', 'none', 4, 'stroke="#5A5D62"') + path('M53 125L67 127L65 153L54 163Z', '#A9AFAC', 0) + path('M247 127L261 130L259 153L251 158Z', '#A9AFAC', 0));

const headwear = {
  none: '',
  headphones: master.headgear,
  beret: group('headgear', path('M45 102C25 70 46 45 89 30C130 14 189 12 236 28C264 38 275 59 268 86L260 109C221 90 184 76 139 78C99 78 77 91 45 102Z', '#C7532B') + path('M154 18C155 9 152 7 147 3C142 -1 135 3 140 9L147 18', '#C7532B') + path('M48 99C111 65 190 67 260 106', 'none', 4)),
  beanie: group('headgear', path('M43 117C43 49 88 17 152 17C214 17 265 57 271 118L259 143C223 114 191 99 163 95C124 101 87 117 49 148Z', '#377CB5') + path('M58 112L53 142M86 51L90 126M127 25L135 108M166 21L181 104M211 39L222 118M249 73L257 137', 'none', 3.2, 'stroke="#24527F"') + path('M43 118C119 72 193 72 270 119L266 146C183 101 122 106 47 151Z', '#3D82BC') + path('M83 103L85 130M126 89L130 113M171 88L175 113M216 100L219 128', 'none', 3, 'stroke="#24527F"')),
  bucket: group('headgear', path('M73 71L91 22C132 1 195 4 231 31L248 85L277 129C240 138 212 129 189 121C151 110 104 108 60 130L37 119Z', '#F1C449') + path('M73 70C127 49 190 52 245 83L250 101C187 71 126 68 66 90Z', '#FBF6DF') + path('M37 119C111 87 200 96 277 129L263 142C192 117 125 108 60 137Z', '#E8B440')),
  cap: group('headgear', path('M51 108C55 53 94 21 145 18C190 13 236 44 244 83L269 102C222 121 176 126 146 118C118 112 83 107 51 108Z', '#BBA8DF') + path('M145 19L117 96L203 82C186 48 163 31 145 19Z', '#F3EDDC') + path('M40 108C78 80 131 79 171 86C211 61 257 67 276 85C285 95 279 111 265 119C274 98 251 90 223 99C191 112 181 128 157 131C122 134 72 120 40 108Z', '#C1AFE1')),
  newsboy: group('headgear', path('M37 104C20 84 49 53 90 38C132 21 193 22 229 42C258 58 282 88 270 107C228 120 191 120 153 114C105 121 67 120 37 104Z', '#F2EBD8') + path('M154 28C110 39 79 66 63 102M154 28C188 46 222 73 242 104M153 27L156 101', 'none', 3, 'stroke="#9F9073"') + path('M46 108C106 83 202 79 265 106C247 130 220 137 196 125C160 109 116 119 85 128C62 134 46 128 46 108Z', '#F9F3E4') + path('M148 28C143 20 159 18 166 25', '#C9B892')),
  communicator: group('headgear', path('M42 147C36 77 83 28 157 27C230 27 278 76 276 149L263 153C263 81 223 42 158 42C93 42 52 81 54 150Z', '#427449') + path('M40 146C25 147 22 159 23 180L24 198C25 216 33 227 49 226L66 220L65 149Z', '#3C7659') + path('M272 145C288 146 293 159 292 179L291 201C290 218 282 227 266 227L250 220L250 149Z', '#487E59') + path('M40 156C31 159 32 196 38 208L48 208L48 157Z', '#2D6049', 0) + path('M264 156L276 156C283 163 282 199 276 209L264 209Z', '#2D6049', 0) + path('M281 205C274 226 254 237 223 239', 'none', 7, 'stroke="#242329"') + path('M281 205C274 226 254 235 225 237', 'none', 3.3, 'stroke="#4D7656"') + path('M217 231C211 230 205 234 206 239C207 246 216 248 223 244L229 240C232 234 225 230 217 231Z', ink)),
  bandana: group('headgear', path('M48 104C79 51 176 33 247 91L255 108C185 57 105 66 48 122Z', '#EF7A61') + path('M219 72C206 56 196 34 196 15C221 22 237 43 239 64Z', '#EC755B') + path('M239 66C251 40 278 34 298 42C288 59 268 72 248 75Z', '#EF8066') + path('M240 66C256 75 270 99 269 113C251 108 237 91 233 76Z', '#E56B55') + circle(235, 70, 13, '#EF8066')),
};

headwear.hijab = group('headgear', path('M31 269C42 238 26 178 31 127C36 65 86 24 151 23C216 18 270 59 283 126C291 171 273 226 290 275C260 295 222 307 157 305C96 304 59 292 31 269ZM62 137C57 166 57 208 66 232C85 249 127 258 158 265C193 257 232 247 252 230C261 208 261 165 251 134C220 122 194 104 177 84C148 107 103 120 62 137Z', '#6E708F', 3.5, 'fill-rule="evenodd"') + path('M33 267C82 266 137 280 184 292M251 244C221 270 194 284 157 305M39 132C49 62 115 25 167 35', 'none', 3, 'stroke="#9A9DB4"'));
headwear.turban = group('headgear', path('M47 132C35 101 42 66 73 48C85 23 123 10 155 18C191 6 229 25 246 49C278 68 283 105 266 135C225 132 189 114 159 87C121 117 86 133 47 132Z', '#427E86') + path('M49 128C116 112 177 64 230 42M51 105C100 92 142 59 182 20M58 79C100 61 126 37 140 18M266 131C218 107 191 74 156 38M274 108C229 88 207 58 183 23', 'none', 3.5, 'stroke="#A4C4BF"'));
headwear.workcap = headwear.cap.replaceAll('#BBA8DF', '#586E70').replaceAll('#C1AFE1', '#6A8280').replaceAll('#F3EDDC', '#D8C8AA');
headwear.cowboy = group('headgear', path('M75 82L91 23C99 12 117 26 135 24C154 29 176 12 190 18L223 83Z', '#B98550') + path('M94 34C114 40 133 52 147 64C161 48 178 35 194 31', 'none', 3, 'stroke="#78502F"') + path('M76 72C121 84 177 87 221 72L226 91C176 105 120 103 71 88Z', '#725035') + path('M17 80C31 70 49 83 75 93C124 112 186 113 234 95C257 86 278 70 302 77C299 92 282 108 259 116C202 134 110 130 53 109C35 103 22 91 17 80Z', '#C59158') + path('M39 89C110 121 211 125 283 88', 'none', 2.6, 'stroke="#E2B678"'));
headwear.ribbons = group('headgear', path('M74 88C55 74 46 70 43 79L46 96C49 104 63 98 74 95Z', '#E985A3') + path('M75 88C89 72 99 75 97 87L89 103Z', '#ED9CB4') + circle(76, 91, 7, '#F5B0C5') + path('M242 86C224 73 214 79 220 91L231 103Z', '#E985A3') + path('M244 87C258 72 274 73 271 88L264 101Z', '#ED9CB4') + circle(242, 91, 7, '#F5B0C5'));
headwear.coach = group('headgear', headwear.cap.replace('id="headgear"', 'id="coach-cap"').replaceAll('#BBA8DF', '#31554E').replaceAll('#C1AFE1', '#416B60').replaceAll('#F3EDDC', '#E3D9B9') + path('M261 147C275 143 282 155 281 171L278 191C275 202 266 203 259 197L256 158Z', '#393F42') + path('M275 190C268 215 245 226 221 227', 'none', 4.5) + path('M213 221C207 221 205 226 210 230C215 234 227 231 228 226C229 222 220 220 213 221Z', '#393F42'));

// Accessories are drawn for these eye anchors, with open lenses for expression.
headwear.visor = group('headgear', path('M50 98C106 71 196 72 254 97L252 116C196 97 103 94 54 117Z', '#BDAADE') + path('M38 113C97 90 178 88 231 101C261 106 275 119 279 129C232 143 197 140 162 129C119 115 82 121 38 113Z', '#CBBBDF') + path('M61 114C120 102 182 104 234 119', 'none', 2.5, 'stroke="#EEE6F5"'));
headwear.sunhat = group('headgear', path('M74 88L91 30C124 12 194 15 225 37L245 92Z', '#E8BD64') + path('M75 74C128 88 191 87 240 77L245 94C193 108 121 104 71 90Z', '#72998C') + path('M20 114C53 95 83 94 111 99C164 110 209 100 245 101C268 101 288 111 302 125C238 145 83 142 20 114Z', '#F3CF80') + path('M46 117C113 134 223 133 278 122', 'none', 2.5, 'stroke="#C79C4E"') + path('M236 91C222 78 218 74 212 79C208 85 215 96 231 99L214 116L229 114L236 102L248 118L254 118L248 99C265 95 272 84 265 80C258 76 249 84 241 92Z', '#7FA89A', 2.5) + circle(239, 96, 5, '#ADC7AE'));
const starFrame = (cx, cy) => {
  const points = Array.from({length: 10}, (_, i) => {
    const angle = -Math.PI / 2 + i * Math.PI / 5;
    const radius = i % 2 ? 29 : 49;
    return `${i ? 'L' : 'M'}${(cx + Math.cos(angle) * radius).toFixed(1)} ${(cy + Math.sin(angle) * radius).toFixed(1)}`;
  }).join('') + 'Z';
  return path(points, 'none', 7) + path(points, 'none', 3.8, 'stroke="#75BDB1"');
};
const eyewear = {
  round: group('eyewear', `<ellipse cx="114" cy="168" rx="28" ry="31" stroke-width="3.2"/><ellipse cx="210" cy="166" rx="28" ry="31" stroke-width="3.2"/>` + path('M142 164C153 158 171 158 182 164M85 165L65 156M239 161L251 153', 'none', 3.2)),
  stars: group('eyewear', path('M70 156L58 150M156 163Q162 157 169 162M253 155L263 148', 'none', 4) + starFrame(114, 169) + starFrame(210, 167)),
  cateye: group('eyewear', path('M75 137Q103 128 142 149L141 179C138 197 103 204 89 186C81 172 80 152 75 137ZM249 134Q222 128 182 148L183 178C186 198 221 201 235 184C243 168 244 150 249 134Z', 'none', 7) + path('M75 137Q103 128 142 149L141 179C138 197 103 204 89 186C81 172 80 152 75 137ZM249 134Q222 128 182 148L183 178C186 198 221 201 235 184C243 168 244 150 249 134Z', 'none', 3.8, 'stroke="#D8899E"') + path('M144 154Q163 145 180 153M78 149L64 143M247 146L258 139', 'none', 3.5)),
  banker: group('eyewear', `<rect x="85" y="138" width="58" height="58" rx="12" stroke-width="3"/><rect x="183" y="136" width="58" height="58" rx="12" stroke-width="3"/>` + path('M143 158Q164 149 183 156M85 151L65 145M241 148L253 141', 'none', 3)),
};
const ageDetails = group('age-details', path('M141 132Q158 127 175 131M81 180L75 184M82 187L77 192M241 178L247 181M242 185L247 190M131 225Q126 236 132 243M191 223Q198 233 194 241', 'none', 1.7, 'stroke="#71584B" opacity=".55"'));
const beardShape = 'M30 171C52 176 58 188 70 203C78 218 94 225 112 230C127 234 136 245 157 248C179 250 190 235 206 231C227 225 243 211 252 197C264 181 272 171 290 170L290 296L28 296Z';
const moustacheShape = 'M162 200C147 194 134 201 124 209C137 214 151 211 162 205C174 211 188 211 200 205C186 203 176 195 162 200Z';
const facialHair = {
  silver: group('facial-hair', path(beardShape, '#C9CBC5', 1.8) + path(moustacheShape, '#D6D8D1', 1.6) + path('M76 228Q84 239 96 243M111 250L120 257M199 251L191 257M239 226Q231 239 219 243', 'none', 2, 'stroke="#919C96"')),
  dark: group('facial-hair', path(beardShape, '#302526', 1.8) + path(moustacheShape, '#35292A', 1.6) + path('M75 223Q82 238 97 244M114 252L124 259M233 226Q224 240 215 245M196 253L186 260', 'none', 2, 'stroke="#594345"')),
  stubble: group('facial-hair', path('M28 187C57 195 73 220 97 230C124 237 136 247 159 249C180 247 193 237 216 230C247 214 263 190 290 185L290 295L28 295Z', '#745D4D', 0, 'opacity=".28"') + path('M78 226L81 230M97 239L100 243M119 250L122 254M210 245L207 249M231 231L228 235', 'none', 1.7, 'stroke="#715647" opacity=".5"')),
  cowboy: group('facial-hair', path('M127 205C141 194 153 196 161 201C176 194 190 198 202 205C207 208 212 209 218 206C214 222 197 226 183 218L161 208C151 215 139 222 126 218C117 215 111 214 108 206C116 211 121 209 127 205Z', '#D7D8CA', 2) + path('M141 250Q160 258 180 249L173 266L158 274L144 264Z', '#BFC4BA', 1.7)),
};

const collars = {
  polo: { back: master.collar, front: '' },
  peterpan: { back: '', front: group('collar', path('M56 244C85 257 121 265 155 270C149 290 133 303 112 299C83 295 55 282 45 267Z', '#FBF5E6') + path('M155 270C190 266 222 257 254 243L271 267C251 283 226 294 201 299C180 304 163 291 155 270Z', '#FBF5E6') + circle(157, 299, 4.2, '#C3B795')) },
  rollneck: { back: '', front: group('collar', path('M53 248C120 258 203 257 261 247L270 289C210 309 107 310 44 288Z', '#718247') + path('M61 252L59 290M82 256L82 296M107 257L107 301M133 259L133 303M159 259L159 303M185 258L185 303M211 256L212 299M235 253L238 294M256 251L262 288', 'none', 2.5, 'stroke="#47572F"')) },
  mandarin: { back: '', front: group('collar', path('M53 246C94 264 128 267 156 271L159 307C108 305 70 293 47 280Z', '#FAF5E9') + path('M156 271C191 267 228 257 259 245L267 281C237 298 199 305 159 307Z', '#FAF5E9') + circle(177, 289, 4, '#B1A289')) },
  sailor: { back: '', front: group('collar', path('M55 245C90 256 117 263 142 268L156 300L169 269C201 263 233 254 255 245L275 270C240 292 202 304 156 307C111 302 72 291 37 269Z', '#E77963') + path('M46 265C75 283 106 294 143 300L136 285C103 279 74 270 56 259M173 300C213 292 243 282 265 266L256 259C234 272 207 279 180 285', 'none', 4.5, 'stroke="#FFF1DC"')) },
  notched: { back: '', front: group('collar', path('M54 245L39 270L74 277L61 288L144 305L156 272Z', '#326B87') + path('M256 245L274 270L240 277L254 288L169 305L156 272Z', '#326B87') + path('M125 270L156 300L187 270C164 276 145 275 125 270Z', '#B76039')) },
  shawl: { back: '', front: group('collar', path('M55 245C80 255 111 262 139 268C150 274 155 290 151 306C115 304 69 291 42 276Z', '#E2D1A8') + path('M256 245C222 257 194 265 175 269C159 276 157 291 151 306C194 306 239 292 269 277Z', '#E9DABC') + circle(168, 294, 4.3, '#A99168')) },
  bowtie: { back: '', front: group('collar', path('M54 245L41 273L111 301L155 272Z', '#FFF9EF') + path('M255 245L271 274L200 301L155 272Z', '#FFF9EF') + path('M151 279C138 271 123 268 120 276L121 295C123 303 142 295 151 290Z', '#1B3C57') + path('M162 279C175 271 190 268 192 276L191 295C189 303 172 295 162 290Z', '#1B3C57') + path('M152 276C147 276 146 282 147 289C147 296 153 298 159 296C166 295 167 289 166 282C166 277 159 274 152 276Z', '#234660')) },
};
collars.western = { back: '', front: group('collar', path('M53 244L39 275L120 298L155 273L198 298L270 275L256 244C211 263 196 265 157 273C115 265 87 256 53 244Z', '#637E8C') + path('M67 250C111 266 202 270 244 249L224 275L164 298L96 278Z', '#AC5C4D') + path('M147 279L135 302L156 296L175 306L171 282Z', '#C77A60') + path('M148 277Q160 270 172 278L168 288L152 287Z', '#B96652') + path('M79 259L108 274M226 258L204 274', 'none', 2.5, 'stroke="#EABBA0"')) };
collars.rose = { back: '', front: group('collar', path('M54 246C94 260 125 267 155 272C181 268 221 259 255 245L272 276C240 295 190 305 157 306C114 303 71 291 40 274Z', '#D987A2') + path('M62 248C89 258 124 266 156 272C145 294 123 295 98 282L51 263Z', '#FFF4E4') + path('M156 272C188 267 222 257 247 248L261 263C227 288 189 300 156 272Z', '#FFF4E4') + circle(158, 299, 3, '#F4D6C8')) };
collars.banker = { back: '', front: group('collar', path('M54 244L36 272L67 279L54 288L144 306L157 273L174 306L260 288L247 279L276 272L256 243C220 261 192 268 157 273C121 265 85 254 54 244Z', '#293A50') + path('M125 267L155 276L184 267L164 306L150 306Z', '#F7F2E6') + path('M135 270L155 276L146 287Z', '#FFFFFF', 2) + path('M180 270L155 276L168 287Z', '#FFFFFF', 2) + path('M151 278L160 277L166 285L159 293L151 285Z', '#944F59', 2) + path('M155 291L162 291L166 305L151 305Z', '#944F59', 2)) };
collars.training = { back: '', front: group('collar', path('M55 246L47 278C77 294 120 305 157 306C197 306 239 294 266 276L258 244C220 260 192 266 157 273C123 267 86 257 55 246Z', '#E7DDC4') + path('M55 254C85 266 120 277 151 280L150 296C113 291 84 281 53 269Z', '#31554E', 0) + path('M258 252C226 267 194 277 164 279L165 295C200 290 233 279 262 267Z', '#31554E', 0) + path('M158 276L158 305', 'none', 3) + path('M153 282L163 282L163 291L153 291Z', '#B5B7A8', 2)) };

const openEyes = (() => {
  const expression = master['expression-listening'];
  return expression.slice(expression.indexOf('<g id="eyes">'), expression.indexOf('<g id="mouth">'));
})();
const smile = master['expression-listening'].slice(master['expression-listening'].indexOf('<g id="mouth">')).replace(/\s*<\/g>\s*$/, '');
const brow = (left, right) => group('eyebrows', line(left) + line(right));
const eyesClosed = group('eyes', path('M95 170C101 151 124 150 134 167M191 168C200 150 221 150 232 166', 'none', 5));
const softSmile = group('mouth', path('M143 221C152 232 172 234 181 218', 'none', 4.7));
const gaze = (dx, dy = 0) => openEyes
  .replace(/<path d="M123\.7[\s\S]*?\/>/, pupil => `<g transform="translate(${dx} ${dy})">${pupil}</g>`)
  .replace(/<path d="M222[\s\S]*?\/>/, pupil => `<g transform="translate(${dx} ${dy})">${pupil}</g>`);
const moods = {
  listening: master['expression-listening'],
  amused: group('expression-amused', brow('M98 127C107 126 117 124 121 118', 'M199 123C209 120 219 124 224 128') + openEyes + path('M149 229C166 233 180 225 183 215', 'none', 4.5)),
  relieved: group('expression-relieved', brow('M101 130Q111 124 122 128', 'M197 126Q210 122 221 128') + eyesClosed + softSmile),
  curious: group('expression-curious', brow('M98 131Q110 125 122 127', 'M198 119Q211 112 222 123') + openEyes + path('M158 208C149 208 150 220 153 226C158 236 169 234 172 225C176 214 168 206 158 208Z', '#201D24', 2.5) + path('M155 224C160 219 165 222 169 227C164 232 159 232 155 224Z', '#F37A8B', 0)),
  confident: group('expression-confident', brow('M99 131Q111 124 124 126', 'M198 124Q211 119 224 122') + `<g clip-path="url(#confident-eyes)">${openEyes}</g>` + path('M94 157L136 153M188 153L232 149', 'none', 4) + path('M147 226C158 238 177 230 181 218', 'none', 4.5)),
  thoughtful: group('expression-thoughtful', brow('M100 128Q115 132 125 124', 'M198 123Q211 131 223 127') + openEyes + path('M152 225L164 220', 'none', 4.5)),
  speaking: group('expression-speaking', brow('M98 128Q110 119 123 124', 'M198 121Q212 117 224 124') + openEyes + path('M144 208C153 210 170 210 183 206C184 224 174 239 163 239C152 239 144 224 144 208Z', '#201D24', 2.5) + path('M153 229C159 221 170 223 176 231C169 240 159 238 153 229Z', '#F47E91', 0)),
  laughing: group('expression-laughing', brow('M101 126Q111 120 123 122', 'M196 123Q210 116 222 122') + eyesClosed + path('M139 208C151 212 177 208 190 201C191 223 179 241 164 243C149 244 140 230 139 208Z', '#201D24', 3) + path('M145 214C159 216 172 212 183 209L180 217C168 223 154 223 148 219Z', '#FFFFFF', 0) + path('M151 234C159 223 172 225 182 233C175 242 161 245 151 234Z', '#EF7890', 0)),
};

moods.warm = group('expression-warm', brow('M100 129Q111 123 124 128', 'M198 130Q211 124 223 129') + gaze(-9, 2) + path('M142 218C151 221 169 221 181 216C177 229 170 233 161 232C153 232 146 228 142 218Z', '#262229', 2.5) + path('M148 222Q162 226 176 221', 'none', 3.5, 'stroke="#FFF8ED"'));
moods.pleased = group('expression-pleased', brow('M99 132Q111 128 123 130', 'M198 128Q211 122 224 125') + `<g clip-path="url(#soft-lids)">${gaze(-15, 1)}</g>` + path('M94 158Q115 151 136 156M189 156Q210 147 232 153', 'none', 3.5) + path('M148 223C157 235 173 238 183 222', 'none', 4));
moods.reflective = group('expression-reflective', brow('M100 127Q112 134 125 128', 'M197 124Q210 129 222 126') + gaze(-16, 4) + path('M148 226Q162 222 175 226', 'none', 3.8));
moods.determined = group('expression-determined', brow('M99 128L124 132', 'M198 132L224 125') + gaze(-9) + path('M146 222Q162 231 179 219', 'none', 4.3));
moods.inquisitive = group('expression-inquisitive', brow('M99 129Q111 135 124 130', 'M196 119Q210 111 224 119') + gaze(-14, -4) + path('M167 218C162 217 156 221 158 227C161 232 169 232 172 228C176 221 172 218 167 218Z', '#252128', 2));
moods.excited = group('expression-excited', brow('M99 127Q111 115 125 122', 'M197 123Q211 113 224 121') + gaze(-8, -3) + path('M141 209Q163 217 187 207C185 232 174 245 162 243C149 241 140 225 141 209Z', '#221E25', 2.8) + path('M148 215Q163 220 180 213L179 220Q162 225 150 220Z', '#FFF8EF', 0) + path('M153 234C159 227 169 227 176 236C169 244 160 243 153 234Z', '#EC798C', 0));
moods.welcoming = group('expression-welcoming', brow('M98 129Q111 117 125 121', 'M198 130Q211 123 224 129') + gaze(-11, 1) + path('M139 215Q161 222 184 212C182 228 171 237 160 236C149 235 142 227 139 215Z', '#241F27', 2.6) + path('M146 220Q162 225 177 217L175 223Q160 229 147 223Z', '#FFFAF0', 0));
moods.easygoing = group('expression-easygoing', brow('M99 128Q111 124 123 130', 'M196 133Q210 126 223 129') + `<g clip-path="url(#soft-lids)">${gaze(-16, 2)}</g>` + path('M94 158Q115 151 136 156M189 156Q210 147 232 153', 'none', 3.5) + path('M142 222C151 218 161 234 178 221', 'none', 4));
moods.explaining = group('expression-explaining', brow('M99 125Q111 121 123 125', 'M197 124Q211 130 224 125') + gaze(-13, -1) + path('M146 218C157 216 173 215 182 214C178 228 167 232 157 229C151 227 147 223 146 218Z', '#241F27', 2.5) + path('M152 220L175 219', 'none', 3, 'stroke="#FFF8ED"') + path('M159 226Q166 221 174 226', 'none', 3, 'stroke="#EF7C8D"'));
moods.attentive = group('expression-attentive', brow('M99 127Q111 121 124 127', 'M198 125Q211 119 224 126') + gaze(-10, -2) + path('M146 224Q161 230 177 223', 'none', 3.8));
moods.wry = group('expression-wry', brow('M98 131Q110 124 124 128', 'M198 125Q212 116 225 123') + `<g clip-path="url(#soft-lids)">${gaze(-15, 2)}</g>` + path('M94 158Q115 151 136 156M189 156Q210 147 232 153', 'none', 3.5) + path('M145 231Q164 237 179 225', 'none', 4));
moods.gleeful = group('expression-gleeful', brow('M98 124Q112 115 126 122', 'M197 119Q211 108 224 118') + gaze(-5, -4) + path('M95 151L90 145M96 147L94 140M228 149L234 143M226 144L230 137', 'none', 2.6) + path('M137 211C151 217 173 213 190 202C190 227 178 243 164 244C149 244 138 228 137 211Z', '#252129', 2.5) + path('M144 217C158 222 173 215 182 211L181 220C169 226 156 228 146 222Z', '#FFF8EB', 0) + path('M154 237C162 229 174 228 182 232C175 243 163 246 154 237Z', '#EE86A0', 0));
moods.composed = group('expression-composed', brow('M99 128Q111 123 125 127', 'M197 126Q211 121 225 125') + gaze(-13, 1) + path('M147 226C154 227 164 229 175 223', 'none', 3.8));
moods.encouraging = group('expression-encouraging', brow('M98 125L124 130', 'M197 129Q212 119 225 122') + gaze(-10, -1) + path('M141 214Q163 218 185 209C184 225 173 236 160 235C150 234 143 225 141 214Z', '#242127', 2.5) + path('M147 218Q163 222 179 215L176 223Q161 227 149 222Z', '#FFF9EC', 0) + path('M158 232Q167 225 177 228', 'none', 3, 'stroke="#DF8291"'));

// A restrained speaking-effort expression for the mirror illustration.
// Centered pupils retain the approved eye shapes and head construction.
moods.effort = group('expression-effort',
  brow('M96 133Q113 126 133 142', 'M192 142Q211 125 229 133') +
  gaze(-10, 1) +
  path('M146 133L149 144M174 133L171 144', 'none', 2.2, 'opacity=".6"') +
  path('M137 217Q159 205 185 217L184 228Q160 224 138 229Z', '#FFF9EC', 3.5) +
  path('M140 221Q161 216 182 221', 'none', 2.2) +
  path('M128 211Q123 221 129 232M193 211Q199 221 193 232', 'none', 2.2, 'opacity=".65"')
);

const cast = {
  headphones: { label: 'Mint headphones and open polo collar', skin: 'tan', hair: 'swoop', headwear: 'headphones', collar: 'polo', mood: 'listening' },
  curly: { label: 'Curly hair, orange beret and Peter Pan collar', skin: 'deep', hair: 'curls', headwear: 'beret', collar: 'peterpan', mood: 'amused' },
  beanie: { label: 'Blue beanie and moss roll neck', skin: 'light', hair: 'crop', headwear: 'beanie', collar: 'rollneck', mood: 'relieved' },
  bob: { label: 'Bob haircut, ribboned sunhat and mandarin collar', skin: 'brown', hair: 'bob', headwear: 'sunhat', collar: 'mandarin', mood: 'curious' },
  cap: { label: 'Lilac sun visor and coral sailor collar', skin: 'tan', hair: 'curls', headwear: 'visor', collar: 'sailor', mood: 'confident' },
  scholar: { label: 'Cream newsboy cap and blue notched collar', skin: 'deep', hair: 'curls', headwear: 'newsboy', collar: 'notched', mood: 'thoughtful', age: 'middle' },
  communicator: { label: 'Green microphone headset and shawl collar', skin: 'dark', hair: 'curls', headwear: 'communicator', collar: 'shawl', mood: 'speaking' },
  flower: { label: 'Wavy hair, coral bandana and navy bow tie', skin: 'tan', hair: 'waves', headwear: 'bandana', collar: 'bowtie', mood: 'laughing' },
  silver: { label: 'Silver waves, round glasses and a shawl collar', skin: 'fair', hair: 'silver', headwear: 'none', collar: 'shawl', mood: 'warm', age: 'older', eyewear: 'round' },
  saltpepper: { label: 'Silver curls, a short silver beard and open polo collar', skin: 'dark', hair: 'coils', headwear: 'none', collar: 'polo', mood: 'pleased', age: 'older', beard: 'silver', silverHair: true },
  hijab: { label: 'Slate headscarf with a wrapped neckline', skin: 'brown', hair: 'none', headwear: 'hijab', collar: 'mandarin', mood: 'reflective' },
  turban: { label: 'Teal turban, beard and a mandarin collar', skin: 'tan', hair: 'none', headwear: 'turban', collar: 'mandarin', mood: 'determined', beard: 'dark' },
  bald: { label: 'Bald head, silver temples and a notched collar', skin: 'fair', hair: 'bald', headwear: 'none', collar: 'notched', mood: 'inquisitive', age: 'older' },
  coils: { label: 'Natural coils, mint star glasses and a coral sailor collar', skin: 'dark', hair: 'coils', headwear: 'none', collar: 'sailor', mood: 'excited', eyewear: 'stars' },
  braids: { label: 'Braided hair, rose cat-eye glasses and a Peter Pan collar', skin: 'deep', hair: 'braids', headwear: 'none', collar: 'peterpan', mood: 'welcoming', eyewear: 'cateye' },
  workcap: { label: 'Sage cap, stubble and an open polo collar', skin: 'olive', hair: 'crop', headwear: 'workcap', collar: 'polo', mood: 'easygoing', beard: 'stubble', age: 'middle' },
  cowboy: { label: 'Older cowboy with a weathered hat, silver moustache and neckerchief', skin: 'olive', hair: 'bald', headwear: 'cowboy', collar: 'western', mood: 'wry', beard: 'cowboy', age: 'older' },
  pigtails: { label: 'Jolly blonde girl with high pigtails, rose ribbons and a rounded collar', skin: 'fair', hair: 'pigtails', headwear: 'ribbons', collar: 'rose', mood: 'gleeful' },
  banker: { label: 'Middle-aged banker with a neat side part, glasses, navy lapels and burgundy tie', skin: 'brown', hair: 'sidepart', headwear: 'none', collar: 'banker', mood: 'composed', age: 'middle', eyewear: 'banker' },
  coach: { label: 'Football coach with a green cap, sideline headset and zipped training collar', skin: 'deep', hair: 'crop', headwear: 'coach', collar: 'training', mood: 'encouraging', age: 'middle', beard: 'stubble' },
};

const skinColors = {
  tan: ['#F1BE80', '#F2BE80', '#F4C386'],
  deep: ['#985F39', '#A36A42', '#AC7249'],
  brown: ['#B97B47', '#C48650', '#CC8C55'],
  light: ['#F5BC91', '#F7C197', '#F8C79F'],
  fair: ['#F1D3BA', '#F3D9C4', '#F5DECD'],
  dark: ['#53382D', '#5A3C30', '#654738'],
  olive: ['#CFA477', '#D6AD81', '#DBB78D'],
};
const extraDefs = `<clipPath id="head-clip"><path d="${headContour}"/></clipPath><clipPath id="confident-eyes"><path d="M90 158L238 148L238 199L90 199Z"/></clipPath><clipPath id="soft-lids"><path d="M90 160Q114 149 139 157L139 199L90 199ZM185 157Q210 145 236 153L236 199L185 199Z"/></clipPath>`;
const hairFrontOverrides = {
  bob: group('hair-front', path('M51 147C49 84 95 45 157 44C214 44 260 82 264 144C238 130 220 110 214 94C177 116 139 131 92 130L69 146Z', '#302525')),
  waves: group('hair-front', path('M50 147C47 86 91 43 155 42C218 41 265 83 265 142C239 120 228 104 224 91C188 119 152 109 143 86C132 112 112 134 88 132L67 153Z', '#573C2E')),
  silver: group('hair-front', path('M47 144C44 88 82 38 144 37C210 31 261 69 268 142C251 136 241 120 233 99C211 115 193 113 177 88C157 108 134 112 119 96C108 120 90 133 71 132L59 148Z', '#D6D5CF') + path('M64 125C91 120 107 91 112 69M183 54C202 73 224 81 249 84', 'none', 3, 'stroke="#AFB3AD"')),
  braids: group('hair-front', path('M48 141C45 83 91 37 154 36C218 35 264 81 267 144L246 133C210 121 183 90 160 67C133 95 104 121 68 135Z', '#282024') + path('M65 112C92 105 126 81 151 52M88 84C108 73 128 57 138 43M169 49C199 76 226 100 250 111M190 43C214 62 237 81 249 85', 'none', 3, 'stroke="#514039"')),
  pigtails: group('hair-front', path('M50 144C44 93 76 51 118 37C143 25 178 28 203 42C241 48 266 90 265 143C241 131 225 113 214 96C204 115 189 123 174 115C160 105 151 86 147 70C133 105 114 129 95 126L72 119L58 148Z', '#F4D375') + path('M72 113C103 93 122 69 127 49M163 48C176 79 192 97 205 103M216 57C233 71 246 95 251 117', 'none', 2.7, 'stroke="#CCAB55"')),
};
const headwearOffsets = { beanie: -6, bucket: -9, cap: -7, newsboy: -8, workcap: -7, coach: -7 };

function renderAvatar(name, options = {}) {
  const c = { ...cast[name], ...options };
  if (!cast[name]) throw new Error(`Unknown avatar ${name}`);
  if (!moods[c.mood]) throw new Error(`Unknown expression ${c.mood}`);
  let defs = master.defs.replace('</defs>', `${extraDefs}</defs>`);
  ['#F1BE80', '#F2BE80', '#F4C386'].forEach((original, i) => {
    defs = defs.replace(original, skinColors[c.skin][i]);
  });
  const isBackHair = Boolean(hairFrontOverrides[c.hair]);
  let hairFront = hairFrontOverrides[c.hair] || hair[c.hair];
  if (c.silverHair) hairFront = hairFront.replaceAll('#252027', '#A5AAA5');
  const description = `${c.label}; ${c.mood} expression. Head and collar only.`;
  const hatLift = headwearOffsets[c.headwear] || 0;
  const hat = hatLift ? `<g transform="translate(0 ${hatLift})">${headwear[c.headwear]}</g>` : headwear[c.headwear];
  const beard = c.beard ? `<g clip-path="url(#head-clip)">${facialHair[c.beard]}</g>` : '';
  const ageMarks = c.beard ? ageDetails.replace('M131 225Q126 236 132 243M191 223Q198 233 194 241', '') : ageDetails;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 310" fill="none" stroke="${ink}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" role="img" aria-labelledby="title description"><title id="title">Speechworks ${name} avatar</title><desc id="description">${description}</desc>${defs}${isBackHair ? hair[c.hair] : ''}${collars[c.collar].back}${head}${hairFront}${beard}${collars[c.collar].front}${c.age ? ageMarks : ''}${moods[c.mood]}${c.eyewear ? eyewear[c.eyewear] : ''}${hat}</svg>`;
  // Prefix every reference so multiple inline avatars can safely share a DOM.
  const prefix = `${options.id || name}-${c.mood}-`;
  svg = svg.replace(/id="([^"]+)"/g, (_, id) => `id="${prefix}${id}"`)
    .replace(/url\(#([^)]+)\)/g, (_, id) => `url(#${prefix}${id})`)
    .replace('aria-labelledby="title description"', `aria-labelledby="${prefix}title ${prefix}description"`);
  return svg;
}

const programCast = {
  interview_ready: { name: 'scholar', mood: 'determined' },
  hard_conversations: { name: 'communicator', mood: 'speaking' },
  art_of_disclosure: { name: 'hijab', mood: 'welcoming' },
  panic_button: { name: 'beanie', mood: 'relieved' },
  bouncing_back: { name: 'braids', mood: 'warm' },
  breaking_thought_traps: { name: 'curly', mood: 'reflective' },
  dating_intimacy: { name: 'flower', mood: 'amused' },
  word_swap: { name: 'turban', mood: 'explaining' },
  speech_toolkit: { name: 'coils', mood: 'inquisitive' },
  understanding_your_voice: { name: 'headphones', mood: 'attentive' },
};
const aliases = {
  mirror: { name: 'bob', mood: 'effort', headwear: 'none', label: 'Front-facing bob haircut and mandarin collar' },
  guide: { name: 'turban', mood: 'determined' },
  caller: { name: 'communicator', mood: 'speaking' },
  pause: { name: 'beanie', mood: 'relieved' },
  keeper: { name: 'silver', mood: 'warm' },
};

module.exports = { renderAvatar, cast, programCast, aliases, parts: { head, hair, hairFrontOverrides, headwear, headwearOffsets, collars, moods, eyewear, facialHair, ageDetails, defs: master.defs, extraDefs, skinColors } };
