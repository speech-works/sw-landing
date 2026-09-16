import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>Speechworks</p>
      <nav aria-label="Support and legal">
        <a href="mailto:contact@speechworks.in">Contact</a>
        <Link href="/privacy/">Privacy</Link>
        <Link href="/account/delete/">Delete account</Link>
      </nav>
    </footer>
  );
}
