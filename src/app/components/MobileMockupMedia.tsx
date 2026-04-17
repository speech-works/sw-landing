"use client";

import Image from "next/image";
import { CSSProperties, useEffect, useMemo, useRef, useState } from "react";

import { withBasePath } from "@/app/lib/withBasePath";
import mockupManifest from "../../../public/assets/mockups/mobile/manifest.json";

type MobileMockupAsset = {
  slug: string;
  posterPng: string;
  webmAlpha: string;
  movAlpha: string;
  width: number;
  height: number;
};

type MobileMockupMediaProps = {
  slug: string;
  alt: string;
  shouldPlay: boolean;
  className?: string;
  mediaClassName?: string;
  mediaStyle?: CSSProperties;
  mediaTransform?: {
    x?: string;
    y?: string;
    scale?: number;
  };
};

const mobileMockupAssets = mockupManifest as MobileMockupAsset[];
const mobileMockupAssetMap = new Map(
  mobileMockupAssets.map((asset) => [asset.slug, asset])
);

function stripPublicPrefix(assetPath: string) {
  return assetPath.startsWith("public/")
    ? assetPath.replace(/^public/, "")
    : assetPath;
}

function isAppleMobileBrowser(userAgent: string) {
  return /iPad|iPhone|iPod/i.test(userAgent);
}

function canUseChromiumWebmMotion() {
  if (typeof navigator === "undefined" || typeof document === "undefined") {
    return false;
  }

  const userAgent = navigator.userAgent;
  if (isAppleMobileBrowser(userAgent)) {
    return false;
  }

  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
    userAgentData?: {
      mobile?: boolean;
      brands?: Array<{ brand: string; version: string }>;
      platform?: string;
    };
  };

  if (nav.connection?.saveData) {
    return false;
  }

  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) {
    return false;
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }

  const brandNames =
    nav.userAgentData?.brands?.map(({ brand }) => brand).join(" ") ?? "";
  const isChromiumBrowser =
    /Chrome|Chromium|CriOS|EdgA|EdgiOS|OPR|SamsungBrowser/i.test(
      `${userAgent} ${brandNames}`
    );

  if (!isChromiumBrowser) {
    return false;
  }

  const video = document.createElement("video");
  return Boolean(
    video.canPlayType('video/webm; codecs="vp9"') ||
      video.canPlayType('video/webm; codecs="vp8"')
  );
}

export default function MobileMockupMedia({
  slug,
  alt,
  shouldPlay,
  className = "",
  mediaClassName = "",
  mediaStyle,
  mediaTransform,
}: MobileMockupMediaProps) {
  const asset = mobileMockupAssetMap.get(slug);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canUseMotion, setCanUseMotion] = useState(false);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    setCanUseMotion(canUseChromiumWebmMotion());
    setIsVideoReady(false);
  }, [slug]);

  const posterSrc = useMemo(() => {
    if (!asset) return "";
    return withBasePath(stripPublicPrefix(asset.posterPng));
  }, [asset]);

  const webmSrc = useMemo(() => {
    if (!asset) return "";
    return withBasePath(stripPublicPrefix(asset.webmAlpha));
  }, [asset]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !canUseMotion) {
      return;
    }

    if (!shouldPlay) {
      video.pause();
      return;
    }

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        setCanUseMotion(false);
      }
    };

    void playVideo();

    return () => {
      video.pause();
    };
  }, [canUseMotion, shouldPlay, webmSrc]);

  if (!asset) {
    return null;
  }

  const transformValue = `translate(calc(-50% + ${mediaTransform?.x ?? "0px"}), calc(-50% + ${mediaTransform?.y ?? "0px"})) scale(${mediaTransform?.scale ?? 1})`;
  const resolvedMediaStyle: CSSProperties = {
    ...mediaStyle,
    transform: transformValue,
    transformOrigin: "center center",
  };
  const baseMediaClass = `pointer-events-none absolute left-1/2 top-1/2 block h-auto max-w-none select-none object-contain ${mediaClassName}`;
  const shouldShowVideo = canUseMotion && shouldPlay && isVideoReady;

  return (
    <div
      className={`pointer-events-none relative flex h-full items-center justify-center overflow-visible select-none touch-none ${className}`}
      aria-hidden="true"
    >
      <Image
        src={posterSrc}
        alt={alt}
        width={asset.width}
        height={asset.height}
        unoptimized
        draggable={false}
        style={resolvedMediaStyle}
        className={`${baseMediaClass} transition-opacity duration-300 ${
          shouldShowVideo ? "opacity-0" : "opacity-100"
        }`}
      />

      {canUseMotion ? (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload={shouldPlay ? "auto" : "none"}
          poster={posterSrc}
          style={resolvedMediaStyle}
          className={`${baseMediaClass} transition-opacity duration-300 ${
            shouldShowVideo ? "opacity-100" : "opacity-0"
          }`}
          onCanPlay={() => setIsVideoReady(true)}
          onLoadedData={() => setIsVideoReady(true)}
          onError={() => {
            setCanUseMotion(false);
            setIsVideoReady(false);
          }}
        >
          <source src={webmSrc} type="video/webm" />
        </video>
      ) : null}
    </div>
  );
}
