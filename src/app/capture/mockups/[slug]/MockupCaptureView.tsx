"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { renderMockupCapture } from "@/mockup-capture/renderers";

type MockupCaptureViewProps = {
  background: string;
  height: number;
  slug: string;
  width: number;
};

function clampScale(rawScale?: string | null) {
  const parsed = Number.parseFloat(rawScale ?? "1");
  if (!Number.isFinite(parsed)) return 1;
  return Math.min(Math.max(parsed, 1), 4);
}

function resolveDimension(rawValue: string | null, fallback: number) {
  const parsed = Number.parseInt(rawValue ?? "", 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return parsed;
}

export default function MockupCaptureView({
  background,
  height,
  slug,
  width,
}: MockupCaptureViewProps) {
  const searchParams = useSearchParams();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const scale = hasMounted ? clampScale(searchParams.get("scale")) : 1;
  const stageWidth = hasMounted
    ? resolveDimension(searchParams.get("stageWidth"), width)
    : width;
  const stageHeight = hasMounted
    ? resolveDimension(searchParams.get("stageHeight"), height)
    : height;
  const viewportWidth = Math.round(stageWidth * scale);
  const viewportHeight = Math.round(stageHeight * scale);
  const resolvedBackground =
    hasMounted && searchParams.get("background")
      ? searchParams.get("background") ?? background
      : background;
  const isTransparentStage = resolvedBackground === "transparent";
  const mockup = renderMockupCapture(slug);

  useEffect(() => {
    const previousHtmlBackground = document.documentElement.style.background;
    const previousBodyBackground = document.body.style.background;
    const previousBodyMargin = document.body.style.margin;

    document.documentElement.style.background = isTransparentStage
      ? "transparent"
      : resolvedBackground;
    document.body.style.background = isTransparentStage
      ? "transparent"
      : resolvedBackground;
    document.body.style.margin = "0";

    return () => {
      document.documentElement.style.background = previousHtmlBackground;
      document.body.style.background = previousBodyBackground;
      document.body.style.margin = previousBodyMargin;
    };
  }, [isTransparentStage, resolvedBackground]);

  return (
    <main
      suppressHydrationWarning
      className="grid place-items-center"
      style={{
        width: `${viewportWidth}px`,
        height: `${viewportHeight}px`,
        background: isTransparentStage ? "transparent" : resolvedBackground,
        overflow: "visible",
      }}
    >
      <div
        data-capture-ready={hasMounted ? "true" : "false"}
        data-capture-stage="true"
        style={{
          width: `${stageWidth}px`,
          height: `${stageHeight}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          background: isTransparentStage ? "transparent" : resolvedBackground,
          display: "grid",
          placeItems: "center",
          overflow: "visible",
          position: "relative",
        }}
      >
        <div
          className="flex h-full w-full items-center justify-center"
          style={{
            background: isTransparentStage ? "transparent" : resolvedBackground,
            overflow: "visible",
            position: "relative",
          }}
        >
          <div
            data-capture-root="true"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "visible",
              position: "relative",
              isolation: "isolate",
            }}
          >
            {mockup}
          </div>
        </div>
      </div>
    </main>
  );
}
