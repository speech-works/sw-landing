// Gentle facial rig derived from the approved brand avatar kit.
const {renderAvatar, parts} = require('./kit.cjs');
const expression = parts.moods.listening;
const eyes = expression.slice(expression.indexOf('<g id="eyes">'), expression.indexOf('<g id="mouth">'))
  .replace('<g id="eyes">', '<g class="rig-eyes">')
  .replace(/<path d="M123\.7[\s\S]*?\/>/, p=>`<g class="rig-pupil">${p}</g>`)
  .replace(/<path d="M222[\s\S]*?\/>/, p=>`<g class="rig-pupil">${p}</g>`);
parts.moods.gentle = `<g class="rig-expression"><g class="rig-brows"><path d="M99 127Q111 121 124 126M198 125Q211 118 224 125" stroke-width="4.2"/></g>${eyes}<g class="rig-lids" opacity="0"><path d="M95 170Q115 180 134 167M191 168Q211 178 231 166" stroke-width="4"/></g><path class="rig-smile" d="M146 224Q162 233 181 220" stroke-width="4"/><g class="rig-speech"><g class="rig-mouth"><path d="M143 214Q164 220 184 210C183 231 173 240 163 240C153 240 145 230 143 214Z" fill="#211d24" stroke-width="2.7"/><path d="M150 218Q165 222 178 216L177 222Q163 227 152 223Z" fill="#fff8ee" stroke="none"/><path d="M153 232Q166 223 176 232Q165 243 153 232" fill="#ed8192" stroke="none"/></g></g></g>`;

function renderCharacter(name, options = {}) {
  const svg = renderAvatar(name, { mood: 'gentle', ...options });
  return svg.replace('role="img"', 'aria-hidden="true" focusable="false"');
}
module.exports = { renderCharacter };
