#!/usr/bin/env node
/**
 * Guard: fail if any em/en dash (and friends) appear in source files.
 *
 * Em dashes are a common "AI-generated" tell, so we keep copy free of them.
 * This catches everything a regex can see, including code comments, which the
 * ESLint rule (AST-based) cannot. Runs on `npm run lint:dashes` and `prebuild`.
 *
 * If you ever genuinely need one of these characters, prefer the HTML entity
 * (e.g. &mdash;) or a Unicode escape, or narrow the BANNED set below.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "src";
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css", ".md", ".mdx"]);
// figure dash, en dash, em dash, horizontal bar, minus sign. This guard scans
// only ROOT (src/), so the literal characters in this regex never flag itself.
const BANNED = /[‒–—―−]/;

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

const offenders = [];
for (const file of walk(ROOT)) {
  readFileSync(file, "utf8")
    .split("\n")
    .forEach((line, i) => {
      if (BANNED.test(line)) offenders.push(`  ${file}:${i + 1}: ${line.trim()}`);
    });
}

if (offenders.length) {
  console.error(
    `\n✗ Found ${offenders.length} em/en dash(es) in ${ROOT}/. ` +
      `Replace with a hyphen (-), comma, colon, or period:\n`
  );
  console.error(offenders.join("\n"));
  console.error("\n(Guard: scripts/check-no-dashes.mjs)\n");
  process.exit(1);
}

console.log(`✓ check-no-dashes: no em/en dashes in ${ROOT}/.`);
