import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { programs } from "@/content/programs";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ["home", "programs", ...programs.map((program) => program.slug)].map((slug) => ({ image: `${slug}.png` }));
}

const colors: Record<string, string> = {
  blue: "#92bcf2", orange: "#ffbc81", purple: "#c7aaf3",
  lime: "#c8f750", peach: "#f9c6ae", pink: "#efbed0",
};

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const slug = image.replace(/\.png$/, "");
  const program = programs.find((item) => item.slug === slug);
  if (!program && slug !== "home" && slug !== "programs") return new Response("Not found", { status: 404 });
  const title = program?.title ?? (slug === "programs" ? "Find your next program." : "Say what you want to say.");
  const description = program?.situation ?? "Speaking practice for adults who stutter.";
  const [regular, bold, portrait] = await Promise.all([
    readFile(path.join(process.cwd(), "src/app/fonts/Inter-Regular.ttf")),
    readFile(path.join(process.cwd(), "src/app/fonts/Inter-ExtraBold.ttf")),
    readFile(path.join(process.cwd(), `public/characters/${program?.key ?? "hard_conversations"}.svg`)),
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
        <div style={{ display: "flex", width: 320, height: 330, borderRadius: 28, border: "2px solid #141311", background: program ? colors[program.color] : "#ff9657", alignItems: "center", justifyContent: "center", transform: "rotate(3deg)" }}>
          {/* Existing vector artwork, embedded so builds do not fetch remote assets. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/svg+xml;base64,${portrait.toString("base64")}`} width={280} height={280} alt="" />
        </div>
      </div>
      <div style={{ display: "flex", borderTop: "2px solid #141311", paddingTop: 20, fontSize: 20 }}>
        {program ? `${program.days} days · One-time program purchase` : "Guided programs · Lessons · Speaking practice"}
      </div>
    </div>,
    { width: 1200, height: 630, fonts: [
      { name: "Inter", data: regular, weight: 400, style: "normal" },
      { name: "Inter", data: bold, weight: 800, style: "normal" },
    ] },
  );
}
