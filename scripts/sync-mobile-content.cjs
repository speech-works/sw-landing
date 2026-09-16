/* Export public brochure fields and the current app logo.
 * Avatar artwork uses the approved website vector kit; sync never restores
 * the older mobile portraits over the new drawings.
 */
const fs = require("node:fs");
const path = require("node:path");
const ts = require("typescript");
const root = path.resolve(__dirname, "..");
const mobile = path.resolve(root, "../sw-fe-m-2/app");
const backend = path.resolve(root, "../sw-be-2/src");
function prop(node, name) {
  return node.properties.find(
    (p) => ts.isPropertyAssignment(p) && p.name.text === name,
  )?.initializer;
}
function string(node) {
  return node && ts.isStringLiteralLike(node) ? node.text : "";
}
const brochures = [];
for (const filename of [
  "index.ts",
  "new_packs_1.ts",
  "new_packs_2.ts",
  "interviewReady.ts",
  "hardConversations.ts",
  "speechToolkit.ts",
]) {
  const source = ts.createSourceFile(
    filename,
    fs.readFileSync(path.join(backend, "seed/pack", filename), "utf8"),
    ts.ScriptTarget.Latest,
    true,
  );
  function visit(node) {
    if (ts.isObjectLiteralExpression(node) && prop(node, "catalogKey")) {
      const key = string(prop(node, "catalogKey"));
      const modules = prop(node, "modules");
      if (!key || !modules || !ts.isArrayLiteralExpression(modules))
        throw new Error(`Unexpected brochure shape in ${filename}`);
      const days = Number(prop(node, "arcDays")?.getText(source));
      const outline = modules.elements
        .filter(ts.isObjectLiteralExpression)
        .map((module) => ({
          day: Number(prop(module, "dayIndex")?.getText(source)),
          title: string(prop(module, "title")).replace(/^Day \d+:\s*/, ""),
        }));
      if (outline.length !== days || outline.some((m) => !m.title || !m.day))
        throw new Error(`Incomplete outline for ${key}`);
      brochures.push({ key, days, outline });
    }
    ts.forEachChild(node, visit);
  }
  visit(source);
}
if (brochures.length !== 10)
  throw new Error(`Expected ten programs, found ${brochures.length}`);
fs.mkdirSync(path.join(root, "src/content"), { recursive: true });
fs.writeFileSync(
  path.join(root, "src/content/program-outlines.json"),
  JSON.stringify(brochures, null, 2) + "\n",
);
console.log(
  `Exported ${brochures.length} public program outlines.`,
);

const logoDirectory = path.join(mobile, "assets/svg logos");
fs.mkdirSync(path.join(root, "public/brand"), { recursive: true });
fs.writeFileSync(
  path.join(root, "public/brand/mark.svg"),
  fs
    .readFileSync(path.join(logoDirectory, "sw-mark-orange.svg"), "utf8")
    .replace(
      'viewBox="0 0 1254 1254"',
      'viewBox="408.71 373.18 436.58 507.64"',
    ),
);
fs.copyFileSync(
  path.join(logoDirectory, "sw-icon-rounded.svg"),
  path.join(root, "src/app/icon.svg"),
);
fs.copyFileSync(
  path.join(mobile, "assets/icon.png"),
  path.join(root, "src/app/apple-icon.png"),
);
fs.copyFileSync(
  path.join(mobile, "assets/icon.png"),
  path.join(root, "public/assets/logo.png"),
);
console.log("Synced current app logo and icons.");

require("./build-avatar-artwork.cjs");
