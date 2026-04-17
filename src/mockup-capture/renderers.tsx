import type { ReactNode } from "react";

import AdversarialAppMockup from "@/app/components/AdversarialAppMockup";
import LiveAppMockup from "@/app/components/LiveAppMockup";
import ProgressAppMockup from "@/app/components/ProgressAppMockup";
import RadarUI from "@/app/components/RadarUI";
import RoadmapAppMockup from "@/app/components/RoadmapAppMockup";
import RoadmapMockup from "@/app/components/RoadmapMockup";
import StaminaAppMockup from "@/app/components/StaminaAppMockup";

const STATIC_STAGE_MOUSE = { x: 0, y: 0 };
const PLATFORM_BASE_PROPS = {
  isSectionHovered: false,
  externalMousePos: STATIC_STAGE_MOUSE,
  softDeviceShadow: true,
  liteMode: false,
  isAnimationActive: true,
  syncTime: false,
} as const;

function compositionFrame(
  width: number,
  height: number,
  children: ReactNode,
  alignItems: "center" | "flex-start" | "flex-end" = "center"
) {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        display: "flex",
        alignItems,
        justifyContent: "center",
        overflow: "visible",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
}

function roadmapPhaseOneFanComposition() {
  const stack = [
    { phase: 2, x: -180, y: 50, rotate: -18, scale: 0.9, zIndex: 10 },
    { phase: 3, x: 180, y: 50, rotate: 18, scale: 0.9, zIndex: 20 },
    { phase: 1, x: 0, y: 0, rotate: 0, scale: 1, zIndex: 100 },
  ] as const;

  return (
    <div
      style={{
        width: "980px",
        height: "760px",
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {stack.map((item) => (
        <div
          key={item.phase}
          style={{
            position: "absolute",
            left: "50%",
            bottom: 0,
            transform: `translateX(calc(-50% + ${item.x}px)) translateY(${item.y}px) scale(${item.scale}) rotate(${item.rotate}deg)`,
            transformOrigin: "bottom center",
            zIndex: item.zIndex,
            opacity: item.phase === 1 ? 1 : 0.8,
            filter: item.phase === 1 ? "none" : "blur(1px)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0, 0, 0, 0.55)",
              filter: item.phase === 1 ? "blur(56px)" : "blur(40px)",
              borderRadius: "56px",
              transform: "translate(18px, 40px) scale(0.88)",
              opacity: item.phase === 1 ? 0.38 : 0.18,
            }}
          />
          <div style={{ position: "relative" }}>
            <RoadmapMockup
              phase={item.phase}
              status="live"
              animateContent={true}
              syncTime={false}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function renderMockupCapture(slug: string): ReactNode {
  switch (slug) {
    case "hero-live-screen":
      return compositionFrame(
        390,
        844,
        <LiveAppMockup
          compact
          disableVerticalPan
          hideStatusBar
          isAnimationActive={true}
          syncTime={false}
        />
      );
    case "platform-progress":
      return compositionFrame(
        760,
        1120,
        <ProgressAppMockup
          radarChart={<RadarUI animKey={1} isFloating={true} />}
          {...PLATFORM_BASE_PROPS}
        />
      );
    case "platform-adversarial":
      return compositionFrame(
        760,
        1120,
        <AdversarialAppMockup animKey={1} {...PLATFORM_BASE_PROPS} />
      );
    case "platform-stamina":
      return compositionFrame(
        840,
        860,
        <StaminaAppMockup
          animKey={1}
          disableTouchPause={true}
          {...PLATFORM_BASE_PROPS}
        />
      );
    case "platform-roadmap":
      return compositionFrame(
        1180,
        900,
        <RoadmapAppMockup
          animKey={1}
          compactCarouselLayout={true}
          compactVerticalPadding={true}
          {...PLATFORM_BASE_PROPS}
        />
      );
    case "roadmap-phase-1":
      return compositionFrame(
        1120,
        920,
        roadmapPhaseOneFanComposition(),
        "flex-end"
      );
    case "roadmap-phase-2":
      return compositionFrame(
        1120,
        920,
        <RoadmapMockup
          phase={2}
          status="building"
          comingSoon={true}
          animateContent={true}
          syncTime={false}
        />
      );
    case "roadmap-phase-3":
      return compositionFrame(
        1120,
        920,
        <RoadmapMockup
          phase={3}
          status="future"
          comingSoon={true}
          animateContent={true}
          syncTime={false}
        />
      );
    default:
      return null;
  }
}
