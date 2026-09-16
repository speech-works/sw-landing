const message = "Buy a program once. Revisit the lessons anytime.";

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

/** The black fill continues directly into the app-download section below. */
export default function DownloadRibbon() {
  return (
    <div className="download-ribbon" role="img" aria-label={message}>
      {curves.map(({ size, viewBox, path, close }) => (
        <svg key={size} className={`download-ribbon-${size}`} viewBox={viewBox} preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <defs>
            <path id={`download-ribbon-${size}-curve`} d={path} />
          </defs>
          <path className="download-ribbon-fill" d={`${path}${close}`} />
          <use href={`#download-ribbon-${size}-curve`} className="download-ribbon-band" />
          <text className="download-ribbon-lettering" textAnchor="middle">
            <textPath href={`#download-ribbon-${size}-curve`} startOffset="50%">
              {message}
            </textPath>
          </text>
        </svg>
      ))}
    </div>
  );
}
