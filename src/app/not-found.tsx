import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Avatar from "./components/Avatar";
import DownloadRibbon from "./components/DownloadRibbon";

// A round bubble whose tail grows out of the outline, drawn as one shape.
const bubble = "M150.9 118.6A78 78 0 1 0 118.6 150.9L158 166Z";

export default function NotFound() {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="not-found page-hero" id="main-content">
        <div className="lost-digits" aria-hidden="true">
          <span className="lost-digit lost-digit-left">4</span>
          <span className="lost-bubble">
            <svg viewBox="0 0 172 176" focusable="false">
              <path className="lost-bubble-shadow" d={bubble} />
              <path className="lost-bubble-shape" d={bubble} vectorEffect="non-scaling-stroke" />
            </svg>
            <Avatar name="beanie" size={104} />
          </span>
          <span className="lost-digit lost-digit-right">4</span>
        </div>
        <h1>We cannot find this page.</h1>
        <p>Find a program for the conversation you want to prepare for.</p>
        <div className="lost-actions">
          <Link href="/programs/" className="button button-ink pressable">
            Find a program
          </Link>
          <Link href="/" className="text-link">
            Back to home
          </Link>
        </div>
      </main>
      <DownloadRibbon fromHero />
      <Footer />
    </div>
  );
}
