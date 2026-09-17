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
        <h1>We cannot find this page.</h1>
        <p>Find a program for the conversation you want to prepare for.</p>
        <Link href="/programs/" className="button button-ink pressable">
          Find a program
        </Link>
      </main>
      <Footer />
    </div>
  );
}
