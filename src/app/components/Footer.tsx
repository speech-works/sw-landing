import Link from "next/link";
import Brand from "./Brand";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Link className="footer-wordmark" href="/" aria-label="Speechworks home">
        <Brand />
      </Link>
      <nav aria-label="Support and legal">
        <Link href="/programs/">Programs</Link>
        <Link href="/about/">About</Link>
        <a
          href="https://blog.speechworks.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Journal
        </a>
        <a href="mailto:contact@speechworks.in">Contact</a>
        <Link href="/privacy/">Privacy</Link>
        <Link href="/account/delete/">Delete account</Link>
      </nav>
    </footer>
  );
}
