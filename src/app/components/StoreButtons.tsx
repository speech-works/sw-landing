import { downloads } from "@/content/downloads";

// Apple silhouette from Simple Icons (CC0):
// https://github.com/simple-icons/simple-icons/blob/develop/icons/apple.svg
function AppleMark() {
  return (
    <svg width="26" height="29" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function PlayMark() {
  return (
    <svg width="26" height="29" viewBox="0 0 26 29" aria-hidden="true">
      <path fill="#51C4EC" d="M1 1.2v26.6L14 14.5Z" />
      <path fill="#74CF84" d="m1 1.2 16.9 9.7-3.9 3.6Z" />
      <path fill="#FFD360" d="m17.9 10.9 6.3 3.6-6.3 3.6-3.9-3.6Z" />
      <path fill="#F17881" d="M1 27.8 17.9 18.1 14 14.5Z" />
    </svg>
  );
}

export default function StoreButtons({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div className={`store-buttons${compact ? " store-buttons-compact" : ""}`}>
      <a
        className="store-badge pressable"
        href={downloads.android}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get Speechworks on Google Play"
      >
        <PlayMark />
        <span>
          <small>Get it on</small>
          <strong>Google Play</strong>
        </span>
      </a>
      {downloads.ios ? (
        <a
          className="store-badge pressable"
          href={downloads.ios}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download Speechworks on the App Store"
        >
          <AppleMark />
          <span>
            <small>Download on the</small>
            <strong>App Store</strong>
          </span>
        </a>
      ) : (
        <span
          className="store-badge store-coming"
          role="img"
          aria-label="Speechworks for iOS is coming soon"
        >
          <AppleMark />
          <span>
            <small>Coming soon to the</small>
            <strong>App Store</strong>
          </span>
        </span>
      )}
    </div>
  );
}
