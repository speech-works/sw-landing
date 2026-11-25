// Builds the animated faces of the free-day page (a plain HTML page without React) into public/try-a-day/faces/<name>.js.
// Run it again when the kit rigs or colour blobs change:  node scripts/build-day-face.mjs
// Each file puts window.SWFace[<name>](host, "calm") on the page: the face of that figure, cut by its colour blob.
import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const blobs = readFileSync(join(root, "src/lib/avatar-blobs.ts"), "utf8");
const blobD = (name) => {
  const m = blobs.match(new RegExp(`"${name}":\\s*\\{\\s*"d":\\s*"([^"]+)"`));
  if (!m) throw new Error(`no blob for ${name}`);
  return m[1];
};
// the mascots use the banker and bob blobs (see the end of src/lib/avatar-blobs.ts)
const figures = [
  { name: "mascot", rig: "src/lib/card-rigs/mascot.generated.ts", rigExport: "mascotRig", blob: "banker" },
  { name: "mascot-f", rig: "src/lib/card-rigs/mascot-f.generated.ts", rigExport: "mascotFRig", blob: "bob" },
];
const tmp = join(root, "node_modules/.cache/day-face");
const out = join(root, "public/try-a-day/faces");
mkdirSync(tmp, { recursive: true });
mkdirSync(out, { recursive: true });
for (const f of figures) {
  const entry = join(tmp, `${f.name}.ts`);
  writeFileSync(entry, `import { makeFace } from ${JSON.stringify(join(root, "scripts/day-face/engine.ts"))};
import { ${f.rigExport} as RIG } from ${JSON.stringify(join(root, f.rig))};
const CUT = ${JSON.stringify(blobD(f.blob))};
const w = window as unknown as { SWFace?: Record<string, (host: Element, initial: string) => unknown> };
(w.SWFace ??= {})[${JSON.stringify(f.name)}] = (host, initial) => makeFace(host, RIG, initial, CUT);
`);
  execFileSync("npx", ["--yes", "esbuild@0.28.2", entry, "--bundle", "--minify", "--format=iife", "--target=es2019", `--outfile=${join(out, f.name + ".js")}`], { stdio: "inherit", cwd: root });
}
