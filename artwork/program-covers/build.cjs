// Renders the program covers (round 3, approved 2026-10-17; 3:4 scenes built
// on the avatar kit) from scenes/r3/ to svg/, png/ (900x1200) and png@2x/
// (1800x2400). Needs rsvg-convert. Text (the iceberg labels) is set in Inter
// from fonts/, through a fontconfig file written next to it.
// Usage: node build.cjs [slug ...]
// The round 2 scenes stay in scenes/*.cjs for reference; nothing renders them.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const all = ['interview_ready', 'hard_conversations', 'panic_button', 'understanding_your_voice', 'breaking_thought_traps', 'bouncing_back', 'dating_intimacy', 'speech_toolkit', 'art_of_disclosure', 'word_swap'];
const want = process.argv.slice(2).length ? process.argv.slice(2) : all;

const fontDir = path.join(__dirname, 'fonts');
const fontConf = path.join(fontDir, 'fonts.conf');
fs.writeFileSync(fontConf, `<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>${fontDir}</dir>
  <include ignore_missing="yes">/opt/homebrew/etc/fonts/fonts.conf</include>
</fontconfig>
`);
const env = { ...process.env, FONTCONFIG_FILE: fontConf };

for (const dir of ['svg', 'png', 'png@2x']) fs.mkdirSync(path.join(__dirname, dir), { recursive: true });
for (const slug of want) {
  const svg = require(`./scenes/r3/${slug}.cjs`)();
  const out = path.join(__dirname, 'svg', `${slug}.svg`);
  fs.writeFileSync(out, svg);
  execFileSync('rsvg-convert', ['-w', '900', '-h', '1200', out, '-o', path.join(__dirname, 'png', `${slug}.png`)], { env });
  execFileSync('rsvg-convert', ['-w', '1800', '-h', '2400', out, '-o', path.join(__dirname, 'png@2x', `${slug}.png`)], { env });
  console.log('built', slug);
}
