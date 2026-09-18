import { readFileSync } from "node:fs";
import { join } from "node:path";

// Build-time only: turns the static visor avatar into a small, cheerful rig for the offer chat.
// The source art has a half-lidded, side-glancing "confident" look; the chat needs the face
// looking straight at the visitor, smiling, blinking, and able to talk. The shared avatar
// file is left as it is.

const edits: [from: string, to: string][] = [
  // Decorative here: the chat text carries the message.
  [' role="img" aria-labelledby="cap-confident-title cap-confident-description"', ' aria-hidden="true" focusable="false"'],
  // Open the eyes fully: drop the half-lid clip and the flat lid line.
  ['<g clip-path="url(#cap-confident-confident-eyes)">', "<g>"],
  ['<path d="M94 157L136 153M188 153L232 149" fill="none" stroke-width="4" />', ""],
  ['id="cap-confident-eyes"', 'id="cap-confident-eyes" class="rig-eyes"'],
  // The visor hides the right brow, so drop both for a symmetric, open face.
  ['<path d="M99 131Q111 124 124 126" fill="none" stroke-width="4.5" />', ""],
  ['<path d="M198 124Q211 119 224 122" fill="none" stroke-width="4.5" />', ""],
  // Swap the lopsided smirk for an open grin, rosy cheeks, and a smaller open smile for speaking.
  [
    '<path d="M147 226C158 238 177 230 181 218" fill="none" stroke-width="4.5" />',
    '<ellipse cx="104" cy="203" rx="13" ry="7" fill="#F4A3A0" opacity=".55" stroke="none" />' +
      '<ellipse cx="221" cy="199" rx="13" ry="7" fill="#F4A3A0" opacity=".55" stroke="none" />' +
      '<g class="rig-smile"><path d="M139 214Q162 247 186 211Q162 221 139 214Z" fill="#3b2626" stroke-width="4" /><path d="M150 229Q162 222 175 228Q163 238 150 229Z" fill="#ED8192" stroke="none" /></g>' +
      '<g class="rig-speech"><path class="rig-mouth" d="M144 217Q162 240 181 215Q162 223 144 217Z" fill="#3b2626" stroke-width="3.5" /></g>',
  ],
];

// The pupils sit toward the right in the source; centre each one on its eye white.
const PUPILS = /<path d="M(?:123\.7 153\.8|222 152\.1)[^"]*" fill="#19191F" stroke="none" \/>/g;

export function visorChatFace(): string {
  let svg = readFileSync(join(process.cwd(), "public/avatars/cap.svg"), "utf8");
  for (const [from, to] of edits) {
    if (!svg.includes(from)) throw new Error(`cap.svg changed shape; update src/lib/chat-face.ts (missing: ${from.slice(0, 60)})`);
    svg = svg.replace(from, to);
  }
  let pupils = 0;
  svg = svg.replace(PUPILS, (pupil) => {
    pupils += 1;
    return `<g class="rig-pupil" transform="translate(-10.5 -1.5)">${pupil}</g>`;
  });
  if (pupils !== 2) throw new Error("cap.svg pupils changed; update src/lib/chat-face.ts so the face still looks at the visitor.");
  return svg
    .replace(/<title[^>]*>[^<]*<\/title>|<desc[^>]*>[^<]*<\/desc>/g, "")
    // Keep gradient and clip ids unique from any visor image elsewhere on the page.
    .replaceAll("cap-confident-", "chat-visor-");
}
