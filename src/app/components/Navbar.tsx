import Link from "next/link";
import Brand from "./Brand";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Link href="/" className="wordmark" aria-label="Speechworks home">
        <Brand />
      </Link>
      <nav aria-label="Main navigation">
        <Link href="/programs/" className="nav-link">
          Programs
        </Link>
        <Link href="/about/" className="nav-link">
          About
        </Link>
        <Link
          href="/#download"
          className="button button-small button-ink pressable"
        >
          <span>Get the <span className="nav-cta-free">free </span>app</span> <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
