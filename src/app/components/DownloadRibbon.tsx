const curves = [
  {
    size: "wide",
    viewBox: "0 0 1440 180",
    path: "M-100 80H0C180 80 180 25 390 25C650 25 770 135 1020 135C1270 135 1260 80 1440 80H1540",
    close: "V180H-100Z",
  },
  {
    size: "compact",
    viewBox: "0 0 390 140",
    path: "M-195 65Q-97.5 145 0 65T195 65T390 65T585 65",
    close: "V140H-195Z",
  },
];

/** The black fill continues directly into the dark section below it. */
export default function DownloadRibbon({ fromHero = false }: { fromHero?: boolean }) {
  return (
    <div className={`download-ribbon${fromHero ? " download-ribbon-from-hero" : ""}`} aria-hidden="true">
      {curves.map(({ size, viewBox, path, close }) => (
        <svg key={size} className={`download-ribbon-${size}`} viewBox={viewBox} preserveAspectRatio="none" focusable="false">
          <defs>
            <path id={`download-ribbon-${size}-curve`} d={path} />
          </defs>
          <path className="download-ribbon-fill" d={`${path}${close}`} />
          <use href={`#download-ribbon-${size}-curve`} className="download-ribbon-band" />
        </svg>
      ))}
    </div>
  );
}
