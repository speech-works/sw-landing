// Builds src/lib/panic-scene.generated.ts: the props of the Panic Button program page scene (the calm button), as SVG text in the picture's 320 x 310 units.
// Art copied from the founder's pictures (the black worry tangle with colour patches, the arched window, the dotted checklist with coral ticks). Run: node scripts/build-panic-scene.cjs
const fs = require("fs");
const K = "#242329", J = 'stroke-linejoin="round" stroke-linecap="round"', S = `stroke="${K}" stroke-width="4" ${J}`, S3 = `stroke="${K}" stroke-width="3" ${J}`, S2 = `stroke="${K}" stroke-width="2.4" ${J}`, F = `stroke="${K}" stroke-width="3" ${J} fill="none"`;
// the worry tangle, copied from the founder's picture: a big round cloud of thin black scribble loops with small coloured patches (teal, orange, yellow, blue, red, purple, brown) showing through. Made as real vector shapes from a fixed random seed.
const tangle=(()=>{let seed=7;const R=()=>{seed=(seed*16807)%2147483647;return seed/2147483647;};
 const inCircle=(r)=>{const a=R()*Math.PI*2,d=Math.sqrt(R())*r;return [d*Math.cos(a),d*Math.sin(a)*0.9];};
 const pal=['#1FB5A8','#F58C1B','#FFD84D','#3B6FE0','#E4262B','#9B6BFF','#8A5A3A','#FF8FB0'];
 let patches='',loops='';
 for(let i=0;i<64;i++){const [x,y]=inCircle(128),n=5,rad=8+R()*14,pts=[];for(let k=0;k<n;k++){const an=k/n*Math.PI*2+R()*0.8,rr=rad*(0.6+R()*0.7);pts.push([x+rr*Math.cos(an),y+rr*Math.sin(an)]);}
  patches+=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(rad*1.1).toFixed(1)}" ry="${(rad*0.62).toFixed(1)}" transform="rotate(${Math.floor(R()*180)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${pal[i%pal.length]}"/>`;}
 for(let i=0;i<78;i++){const n=5+Math.floor(R()*3),pts=[];const cx=inCircle(92),rr=30+R()*66;for(let k=0;k<n;k++){const an=k/n*Math.PI*2+R()*0.9;pts.push([cx[0]+rr*Math.cos(an),cx[1]+rr*0.8*Math.sin(an)]);}
  let d=`M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;for(let k=1;k<=n;k++){const p=pts[k%n],q=pts[(k-1)%n],mx=(p[0]+q[0])/2+(R()-.5)*30,my=(p[1]+q[1])/2+(R()-.5)*30;d+=`Q${mx.toFixed(1)} ${my.toFixed(1)} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`;}
  loops+=`<path d="${d}"/>`;}
 return {patches,loops};})();
// back layer (patches and loops, behind him) and front layer (a few loops crossing over his beanie, never over his face)

const tgf = `translate(160 86)`;
const tangleBack = `<g id="pb-tb"><g transform="${tgf}"><g>${tangle.patches}</g><g fill="none" stroke="#1B1B1F" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${tangle.loops}</g></g></g>`;
const tangleFront = `<clipPath id="pb-tfc"><rect x="-300" y="-400" width="800" height="118"/></clipPath><g id="pb-tf" clip-path="url(#pb-tfc)"><g transform="${tgf}" fill="none" stroke="#1B1B1F" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${tangle.loops}</g></g>`;
// The window, copied from the founder's picture: a round-arched wooden window with two brown louvred shutters folded open, pale curtains with yellow diamonds tied back with orange bands,
// a cat and a flower pot on the sill. Smaller than the first window, and a bit to the right. The glass is a soft sky so the clouds can be seen through it.
const WX = -250;   // shift to the right
const WB = "#B5651D", WBD = "#8E4A12";
const X = (x) => x + WX;
const arch = `M${X(40)} 262V30Q${X(40)} -128 ${X(160)} -134Q${X(280)} -128 ${X(280)} 30V262Z`;
const wcloud = (id, x, y, sc, o = 1) => `<g id="${id}" opacity="${o}"><g transform="translate(${X(x)} ${y}) scale(${sc})"><path d="M-40 14a16 16 0 0 1 2 -30a24 24 0 0 1 46 -6a18 18 0 0 1 32 22a12 12 0 0 1 -4 14Z" fill="#fff" stroke="${K}" stroke-width="2.2" ${J}/></g></g>`;
const mxw = (x) => 2 * X(160) - x;
const leafShutter = (left) => {
  const F = left ? (x) => x : mxw;
  const path = `M${F(X(-8))} -30Q${F(X(22))} -78 ${F(X(52))} -46L${F(X(58))} 246L${F(X(-8))} 266Z`;
  let slots = "";
  for (let i = 0; i < 8; i++) { const y = -4 + i * 31; slots += `<path d="M${F(X(8))} ${y + (left ? 4 : 0)}H${F(X(42))}" stroke="#FFF6DC" stroke-width="6.5" stroke-linecap="round"/>`; }
  return `<path d="${path}" fill="${WB}" ${S}/><path d="M${F(X(-2))} -20Q${F(X(22))} -62 ${F(X(46))} -38" fill="none" stroke="${WBD}" stroke-width="3" ${J} opacity=".5"/>${slots}`;
};
const curtain = (left) => {
  const F = left ? (x) => x : mxw;
  let dia = "";
  for (let i = 0; i < 6; i++) dia += `<path d="M${F(X(58))} ${-10 + i * 36}l9 13l-9 13l-9 -13Z" fill="#FFD84D" stroke="${K}" stroke-width="1.6" ${J}/>`;
  return `<path d="M${F(X(46))} -40Q${F(X(92))} -20 ${F(X(88))} 70Q${F(X(84))} 150 ${F(X(90))} 262L${F(X(46))} 262Z" fill="#A9DCD3" ${S3}/>${dia}<rect x="${left ? X(46) : mxw(X(86))}" y="124" width="40" height="16" rx="3" fill="#F58C1B" ${S3}/>`;
};
const cat = `<g transform="translate(${X(212)} 238)"><ellipse cx="0" cy="16" rx="46" ry="26" fill="#9A9288" ${S}/><path d="M-30 -2L-26 -34L-6 -16Z" fill="#9A9288" ${S}/><path d="M30 -2L26 -34L6 -16Z" fill="#9A9288" ${S}/><ellipse cx="0" cy="-2" rx="34" ry="26" fill="#A89F94" ${S}/><path d="M-6 -22v8M0 -24v9M6 -22v8" stroke="#5E5750" stroke-width="3" ${J}/><circle cx="-12" cy="-4" r="3.4" fill="${K}"/><circle cx="12" cy="-4" r="3.4" fill="${K}"/><path d="M-4 6l4 3l4 -3M0 9v4" stroke="${K}" stroke-width="2.4" ${J} fill="none"/></g>`;
const pot = `<g transform="translate(${X(112)} 236)"><path d="M-22 -6L22 -6L16 26L-16 26Z" fill="#323A5A" ${S}/><path d="M-4 -6V-40M8 -6V-52" stroke="#3E9B58" stroke-width="3.4" ${J}/><ellipse cx="-14" cy="-26" rx="10" ry="6" transform="rotate(-30 -14 -26)" fill="#4FA33A" ${S2}/><circle cx="-6" cy="-48" r="13" fill="#E4442B" ${S2}/><circle cx="-6" cy="-48" r="5" fill="#fff" ${S2}/><circle cx="10" cy="-62" r="12" fill="#FFD84D" ${S2}/><circle cx="10" cy="-62" r="4" fill="#F58C1B"/></g>`;
const windowSvg = `<g id="pb-window"><ellipse id="pb-wglow" cx="${X(160)}" cy="60" rx="250" ry="215" fill="#FFF4B0" opacity="0"/>${leafShutter(true)}${leafShutter(false)}<path d="${arch}" fill="#DCEFFB" ${S}/><clipPath id="pb-wclip"><path d="${arch}"/></clipPath><g clip-path="url(#pb-wclip)">${wcloud("pb-c1", 100, -10, 1.0)}${wcloud("pb-c2", 220, 100, 0.9)}${wcloud("pb-cb", 160, 10, 2.0, 0)}${curtain(true)}${curtain(false)}${pot}${cat}</g><path d="${arch}" fill="none" stroke="${WB}" stroke-width="14" ${J}/><path d="${arch}" fill="none" stroke="${K}" stroke-width="3" ${J} transform="translate(0 0)" opacity=".6"/><rect x="${X(26)}" y="262" width="294" height="12" rx="3" fill="${WB}" ${S}/></g>`;
const desk = `<g id="pb-desk"><polygon points="-6,268 326,268 412,308 -92,308" fill="#F3CC94" ${S}/><polygon points="-92,308 412,308 410,320 -90,320" fill="#D9A05B" ${S}/><path d="M70 278H250" stroke="#fff" stroke-opacity=".45" stroke-width="3" ${J}/></g>`;
const button = `<g id="pb-btn" transform="translate(160 270) scale(1.3) translate(0 -8)"><ellipse cx="0" cy="12" rx="58" ry="13" fill="#000" opacity=".12"/><path d="M-56 4Q-56 -6 -44 -6L44 -6Q56 -6 56 4L56 12Q56 22 44 22L-44 22Q-56 22 -56 12Z" fill="#FFF4E6" ${S}/><g id="pb-dome"><path d="M-44 -6Q-44 -44 0 -44Q44 -44 44 -6Z" fill="#E4262B" ${S}/><path d="M-30 -14Q-26 -32 -8 -34" stroke="#fff" stroke-opacity=".6" stroke-width="5" ${J} fill="none"/></g></g>`;
const ripples = `<g id="pb-rip" opacity="0"><path d="M70 244q12 12 0 24M56 236q20 20 0 40M250 244q-12 12 0 24M264 236q-20 20 0 40" ${F}/></g>`;
const plant = `<g id="pb-plant"><circle id="pb-gp" cx="44" cy="230" r="42" fill="#FFF4B0" opacity="0"/><g transform="translate(52 8)"><path d="M-26 270L10 270L6 244L-22 244Z" fill="#F58C1B" ${S}/><ellipse cx="-16" cy="226" rx="8" ry="20" transform="rotate(-24 -16 226)" fill="#6CCB9A" ${S3}/><ellipse cx="2" cy="222" rx="8" ry="21" transform="rotate(20 2 222)" fill="#4FB584" ${S3}/><ellipse cx="-7" cy="218" rx="7" ry="22" fill="#7ED8A8" ${S3}/></g></g>`;
const mug = `<g id="pb-mug"><circle id="pb-gm" cx="282" cy="244" r="40" fill="#FFF4B0" opacity="0"/><g transform="translate(-18 4)"><path d="M282 250L282 268Q282 272 286 272L312 272Q316 272 316 268L316 250Z" fill="#FFF4E6" ${S}/><path d="M316 254q14 0 14 9q0 9 -14 9" fill="none" stroke="${K}" stroke-width="5" ${J}/><path d="M282 258H316" stroke="#5B8FE0" stroke-width="5"/><path id="pb-steam" d="M292 244q-5 -8 0 -13M304 244q-5 -8 0 -13" fill="none" stroke="#fff" stroke-opacity=".9" stroke-width="3" ${J}/></g></g>`;
const box = (id, x, y, r, tick) => `<g id="${id}" transform="translate(${x} ${y}) rotate(${r})"><path d="M-30 -28L28 -31L31 27L-28 30Z" fill="#FFF8EC" ${S3}/><path d="M-30 -28L28 -31L31 27L-28 30Z" fill="url(#pb-dots)"/>${tick ? `<g id="${id}t"><path d="M-22 2L-6 20L24 -26L16 -32L-6 6L-14 -4Z" fill="#F4876A" stroke="${K}" stroke-width="2.6" ${J}/><path d="M-22 2L-6 20L24 -26L16 -32L-6 6L-14 -4Z" fill="url(#pb-dots2)"/></g>` : ""}</g>`;
const list = `<g id="pb-list" opacity="0"><g transform="translate(296 100) scale(.7)">${box("pb-b1", -6, -70, -3, true)}${box("pb-b2", 2, 0, 2, true)}${box("pb-b3", -4, 70, -2, false)}</g></g>`;
const spark = (id, x, y, r) => `<g id="${id}" opacity="0"><path transform="translate(${x} ${y})" d="M0 ${-r}Q0 0 ${r} 0Q0 0 0 ${r}Q0 0 ${-r} 0Q0 0 0 ${-r}Z" fill="#FFD84D" ${S3}/></g>`;
const defs = `<defs><pattern id="pb-dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.1" fill="#242329" opacity=".55"/></pattern><pattern id="pb-dots2" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#242329" opacity=".6"/></pattern></defs>`;
const out = `// GENERATED by scripts/build-panic-scene.cjs. Do not edit by hand.\nexport const panicWindow = ${JSON.stringify(windowSvg)};\nexport const panicUnder = ${JSON.stringify(tangleBack)};\nexport const panicOver = ${JSON.stringify(defs + desk + plant + mug + button + ripples + tangleFront + list + spark("pb-s1", 70, 180, 8) + spark("pb-s2", 240, 120, 7) + spark("pb-s3", 28, 120, 6))};\n`;
fs.writeFileSync("src/lib/panic-scene.generated.ts", out);
console.log("ok", out.length);
