import Link from "next/link";

export default function Navbar() {
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Speechworks home">
        Speechworks<span aria-hidden="true">.</span>
      </Link>
    </header>
  );
}
