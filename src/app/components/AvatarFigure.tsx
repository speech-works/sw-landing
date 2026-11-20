"use client";
import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { avatarBlobs } from "@/lib/avatar-blobs";
import { hexToRgb, parseColour, pickBlobColours, type RGB } from "@/lib/avatar-colours";

const PAPER: RGB = [247, 242, 234];

/** The colour of the page behind this element: the nearest parent with an opaque background colour. */
function surfaceOf(el: HTMLElement): RGB {
  for (let node: HTMLElement | null = el.parentElement; node; node = node.parentElement) {
    const c = parseColour(getComputedStyle(node).backgroundColor);
    if (c && c.alpha > 0.9) return c.rgb;
  }
  return PAPER;
}

export default function AvatarFigure({ name, size, className, alt, priority }: { name: string; size: number; className: string; alt: string; priority: boolean }) {
  const blob = avatarBlobs[name];
  const ref = useRef<HTMLSpanElement>(null);
  const [colours, setColours] = useState<{ a: string; b: string | null } | null>(null);
  useLayoutEffect(() => {
    if (blob && ref.current) setColours(pickBlobColours(blob, surfaceOf(ref.current)));
  }, [blob]);
  const image = <Image src={`/avatars/${name}.svg`} width={size} height={size} className={`avatar ${className}`} alt={alt} priority={priority} draggable={false} />;
  if (!blob) return image;
  const mask = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -5 320 320' preserveAspectRatio='none'><path d='${blob.d}'/></svg>`)}")`;
  const style = {
    width: size, height: size, "--av-mask": mask, "--av-cell": `${(size * blob.cell) / 320}px`,
    "--av-a": colours?.a ?? blob.a, "--av-b": colours?.b ?? blob.b ?? blob.a,
  } as React.CSSProperties;
  return (
    <span ref={ref} className="avatar-figure" data-kind={blob.kind} data-ready={colours ? "1" : "0"} style={style}>
      <span className="avatar-blob" aria-hidden="true" />
      {image}
    </span>
  );
}
