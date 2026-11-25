import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { programs } from "@/content/programs";
import { cast } from "../../components/ProgramIllustration";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { hexToRgb, pickBlobColours } from "@/lib/avatar-colours";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ["home", "programs", ...programs.map((program) => program.slug)].map((slug) => ({ image: `${slug}.png` }));
}

const colors: Record<string, string> = {
  blue: "#92bcf2", orange: "#ffbc81", purple: "#c7aaf3",
  lime: "#c8f750", peach: "#f9c6ae", pink: "#efbed0",
};

/** The avatar from the kit standing on its colour blob, as one SVG (same shapes and colour rules as AvatarFigure on the site). */
function avatarOnBlob(name: string, avatarSvg: string, surface: string): string {
  const blob = avatarBlobs[name];
  const inner = avatarSvg.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");
  if (!blob) return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 310" width="320" height="310">${inner}</svg>`;
  const c = pickBlobColours(blob, hexToRgb(surface));
  const T = 'transform="translate(0 5)"';
  const shapes = `<path ${T} d="${blob.d}"/>${blob.top ? `<path ${T} d="${blob.top}"/>` : ""}${blob.dots.map(([x, y, r]) => `<circle ${T} cx="${x}" cy="${y}" r="${r}"/>`).join("")}`;
  // the site draws the blob in a box that starts 70 units above and left of the picture; its outline is drawn from -75, so it sits 5 units lower
  const top = -70, cell = blob.cell, rows = Math.ceil(400 / Math.max(cell, 1));
  const second = c.b && blob.kind === "hstripe" ? Array.from({ length: rows }, (_, i) => `<rect x="-70" y="${top + i * cell + cell / 2}" width="460" height="${cell / 2}" fill="${c.b}"/>`).join("")
    : c.b && blob.kind === "vstripe" ? Array.from({ length: Math.ceil(460 / Math.max(cell, 1)) }, (_, i) => `<rect x="${-70 + i * cell + cell / 2}" y="-75" width="${cell / 2}" height="400" fill="${c.b}"/>`).join("") : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-70 -75 460 400" width="460" height="400"><defs><clipPath id="blob">${shapes}</clipPath></defs><g clip-path="url(#blob)"><rect x="-70" y="-75" width="460" height="400" fill="${c.a}"/>${second}</g>${inner}</svg>`;
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const slug = image.replace(/\.png$/, "");
  const program = programs.find((item) => item.slug === slug);
  if (!program && slug !== "home" && slug !== "programs") return new Response("Not found", { status: 404 });
  const title = program?.label ?? (slug === "programs" ? "Choose a program." : "Say what you want to say.");
  const description = program?.title ?? "Speaking practice for adults who stammer or stutter.";
  const surface = program ? colors[program.color] : "#ff9657";
  const avatarName = program?.key === "interview_ready" ? "banker-b" : cast[program?.key ?? "hard_conversations"];
  const [regular, bold, avatarSvg] = await Promise.all([
    readFile(path.join(process.cwd(), "src/app/fonts/Inter-Regular.ttf")),
    readFile(path.join(process.cwd(), "src/app/fonts/Inter-ExtraBold.ttf")),
    readFile(path.join(process.cwd(), `public/avatars/${avatarName}.svg`), "utf8"),
  ]);
  return new ImageResponse(
    <div style={{ display: "flex", width: "100%", height: "100%", background: "#fff9e9", color: "#141311", fontFamily: "Inter", padding: 64, flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
        <div style={{ fontWeight: 800 }}>Speechworks</div>
        <div style={{ fontSize: 20 }}>speechworks.app</div>
      </div>
      <div style={{ display: "flex", flex: 1, alignItems: "center", gap: 48 }}>
        <div style={{ display: "flex", flexDirection: "column", width: 676 }}>
          <div style={{ fontSize: 18, marginBottom: 20 }}>FOR ADULTS WHO STUTTER</div>
          <div style={{ fontSize: title.length > 28 ? 60 : 76, lineHeight: 1.02, letterSpacing: -3, fontWeight: 800 }}>{title}</div>
          <div style={{ fontSize: 27, lineHeight: 1.4, marginTop: 24 }}>{description}</div>
        </div>
        <div style={{ display: "flex", width: 320, height: 330, borderRadius: 28, border: "2px solid #141311", background: surface, alignItems: "center", justifyContent: "center", transform: "rotate(3deg)" }}>
          {/* The kit avatar on its colour blob, embedded so builds do not fetch remote assets. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;base64,${Buffer.from(avatarOnBlob(avatarName, avatarSvg, surface)).toString("base64")}`} width={304} height={265} alt="" />
        </div>
      </div>
      <div style={{ display: "flex", borderTop: "2px solid #141311", paddingTop: 20, fontSize: 20 }}>
        {program ? `${program.days} days · Pay once` : "Programs · Daily plans · Speaking practice"}
      </div>
    </div>,
    { width: 1200, height: 630, fonts: [
      { name: "Inter", data: regular, weight: 400, style: "normal" },
      { name: "Inter", data: bold, weight: 800, style: "normal" },
    ] },
  );
}
