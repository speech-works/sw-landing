"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Brand from "./Brand";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const normalizedPath = pathname ? pathname.replace(/\/+$/, "") : "";
  const isProgramsActive = normalizedPath === "/programs" || normalizedPath.startsWith("/programs/");
  const isAboutActive = normalizedPath === "/about" || normalizedPath.startsWith("/about/");

  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Link href="/" className="wordmark" aria-label="Speechworks home">
        <Brand />
      </Link>
      <nav aria-label="Main navigation">
        <Link
          href="/programs/"
          className={`nav-link${isProgramsActive ? " is-active" : ""}`}
          aria-current={isProgramsActive ? "page" : undefined}
        >
          Programs
        </Link>
        <Link
          href="/about/"
          className={`nav-link${isAboutActive ? " is-active" : ""}`}
          aria-current={isAboutActive ? "page" : undefined}
        >
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
