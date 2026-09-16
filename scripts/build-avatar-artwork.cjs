const fs = require('node:fs');
const path = require('node:path');
const { renderAvatar, cast, aliases, programCast, parts } = require('../artwork/avatars/kit.cjs');
const root = path.resolve(__dirname, '..');
for (const directory of ['public/avatars', 'public/characters', 'artwork/avatars/export']) {
  fs.mkdirSync(path.join(root, directory), { recursive: true });
}
for (const name of Object.keys(cast)) {
  fs.writeFileSync(path.join(root, `public/avatars/${name}.svg`), renderAvatar(name));
}
for (const [alias, { name, mood }] of Object.entries(aliases)) {
  fs.writeFileSync(path.join(root, `public/avatars/${alias}.svg`), renderAvatar(name, { mood, id: alias }));
}
for (const [program, { name, mood }] of Object.entries(programCast)) {
  fs.writeFileSync(path.join(root, `public/characters/${program}.svg`), renderAvatar(name, { mood, id: program }));
}
fs.writeFileSync(path.join(root, 'artwork/avatars/export/parts.json'), JSON.stringify({ version: 1, viewBox: '0 0 320 310', ink: '#242329', parts, cast, aliases, programCast }, null, 2) + '\n');
console.log(`Exported ${Object.keys(cast).length} avatars, ${Object.keys(aliases).length} hero portraits and ${Object.keys(programCast).length} program portraits.`);
