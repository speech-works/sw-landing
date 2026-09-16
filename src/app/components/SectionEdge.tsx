const curves = {
  wide: "M0 35C220 35 250 78 510 78C640 78 724 66 808 60C822 59 835 58 848 58C849 80 839 101 822 115C860 113 891 87 902 61C1110 82 1230 35 1440 35",
  compact: "M0 22C66 22 99 49 181 49C219 49 237 44 259 42C262 59 255 71 247 79C268 78 286 59 289 42C332 47 347 22 390 22",
};

/** The central speech silhouette stays bounded even on very wide screens. */
export default function SectionEdge({ kind }: { kind: "hero" }) {
  return (
    <div className={`section-edge section-edge-${kind}`} aria-hidden="true">
      {(["wide", "compact"] as const).map((size) => {
        const width = size === "wide" ? 1440 : 390;
        const height = size === "wide" ? 140 : 90;
        return (
          <svg key={size} className={`section-edge-${size}`} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" focusable="false">
            <path className="section-edge-fill" d={`${curves[size]}V-1H0Z`} />
            <path className="section-edge-outline" d={curves[size]} fill="none" vectorEffect="non-scaling-stroke" />
          </svg>
        );
      })}
    </div>
  );
}
