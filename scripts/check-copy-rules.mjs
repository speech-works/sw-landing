#!/usr/bin/env node
/**
 * Guard: fail if reader-facing copy breaks the Speechworks claims rules.
 *
 * 1. No medical or overclaiming words, and no features the app does not have.
 * 2. Every product number (days, AI calls, tools, prices...) must be on the
 *    approved list below, and program day ranges must match program-outlines.json.
 *
 * Legal pages (privacy, account deletion) are skipped: their wording is a
 * legal decision, not marketing copy. Runs on `npm run lint:copy` and `prebuild`.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "src";
const EXTS = new Set([".ts", ".tsx", ".json", ".md", ".mdx"]);
const SKIP = [/^src\/app\/privacy\//, /^src\/app\/account\/delete\//];

const BANNED = [
  [/\b(treatments?|therap(y|ies|ist|ists|eutic)|clinical(ly)?|interventions?|diagnos\w*|assessments?)\b/i, "medical wording"],
  [/\b(proven|cures?|cured|fix(es|ed)?|breakthroughs?|miracles?)\b/i, "overclaim"],
  [/\b(stutterers?|stammerers?)\b/i, "say 'people who stutter'"],
  [/\bfluen(t|cy|tly)\b/i, "fluency outcome"],
  [/\byou will (feel|be|sound|speak)\b/i, "promised outcome"],
  [/\b(battle|conquer|defeat|mastery|overcome)\b/i, "fight framing"],
  [/[₹$€£¥]\s?[0-9]/, "prices vary by country, show a % discount instead"],
  [/\b(scores?|streaks?|leaderboards?|waitlist|free trial|forum|therapist directory)\b/i, "feature the app does not have"],
];

// Honest negations are allowed: saying what the app does NOT do is a selling
// point. They are removed from a line before the banned-word check, in order,
// so the longer "does not ... replace a speech therapist" pattern runs first.
const ALLOWED_PHRASES = [
  /\bno cure promises?\b/gi,
  /\bno fluency scores?\b/gi,
  /\bwill (this|it|speechworks) cure my (stammer|stutter)\??/gi,
  /\b(does not|doesn't|not)\b[^.]*\breplace(ment for)? (a )?speech therapist\b/gi,
  /\b(does not|doesn't) (treat|diagnose) (stammering|stuttering)\b/gi,
];

// Product facts that may appear in copy. Add here only after checking the app.
const APPROVED_NUMBERS = new Set([
  "10 ai practice calls", "10 ai call credits", "10 calls",
  "8 ai practice calls", "8 calls",
  "seven days", "six speech tools",
  "10 programs", "ten programs",
]);
const NUMBER_WORDS = "[0-9]+|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|fourteen|twenty";
const NUMBER_CLAIM = new RegExp(
  `\\b(?:${NUMBER_WORDS})(?: to (?:${NUMBER_WORDS}))? (?:programs?|days?|ai call credits?|ai (?:practice )?calls?|calls|call credits|speech tools?|techniques?|scenarios?|minutes?)\\b`,
  "gi",
);
// "one" is left out so singular phrases ("one AI call") pass.
// "7 to 14 days" style ranges must match the real program lengths.
const outlines = JSON.parse(readFileSync("src/content/program-outlines.json", "utf8"));
const days = outlines.map((o) => o.days);
const DAY_RANGE = `${Math.min(...days)} to ${Math.max(...days)} days`;

function walk(dir) {
  let out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out = out.concat(walk(p));
    else if (EXTS.has(extname(entry.name))) out.push(p);
  }
  return out;
}

// Only look at text a reader can see: skip imports and SVG path data.
const isCode = (line) => /^\s*(import |export \{)|\sd="|pathLength=/.test(line);

const offenders = [];
for (const file of walk(ROOT)) {
  if (SKIP.some((re) => re.test(file))) continue;
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (isCode(line)) return;
      const at = `  ${file}:${i + 1}`;
      const text = ALLOWED_PHRASES.reduce((t, re) => t.replace(re, ""), line);
      for (const [re, why] of BANNED) {
        const m = text.match(re);
        if (m) offenders.push(`${at}: "${m[0]}" (${why})`);
      }
      for (const m of line.matchAll(NUMBER_CLAIM)) {
        const claim = m[0].toLowerCase().replace(/ of lessons$/, "");
        if (/^\d+ to \d+ days$/.test(claim) ? claim !== DAY_RANGE : !APPROVED_NUMBERS.has(claim)) {
          offenders.push(`${at}: "${m[0]}" (number not on the approved list)`);
        }
      }
    });
}

if (offenders.length) {
  console.error(`\n✗ Found ${offenders.length} copy rule problem(s) in ${ROOT}/:\n`);
  console.error(offenders.join("\n"));
  console.error("\n(Guard: scripts/check-copy-rules.mjs)\n");
  process.exit(1);
}

console.log(`✓ check-copy-rules: copy in ${ROOT}/ follows the claims rules.`);
