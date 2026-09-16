import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Avatar from "./components/Avatar";
export default function NotFound() {
  return (
    <div className="site-shell">
      <Navbar />
      <main className="not-found" id="main-content">
        <Avatar name="beanie" size={110} />
        <h1>A little off track.</h1>
        <p>We could not find that page. Let us get you back.</p>
        <Link href="/" className="button button-ink pressable">
          Back to Speechworks
        </Link>
      </main>
      <Footer />
    </div>
  );
}
