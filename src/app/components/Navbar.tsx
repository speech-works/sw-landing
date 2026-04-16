"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import { withBasePath } from "@/app/lib/withBasePath";

import ContactModal from "./ContactModal";

export default function Navbar() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    const handleHashChange = () => {
      setIsMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const openContact = () => {
    setIsMenuOpen(false);
    setIsContactOpen(true);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 py-2 ${
          isScrolled ? "md:py-4" : "md:py-6"
        }`}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="mobile-fixed-glass flex justify-between items-center backdrop-blur-2xl bg-white/90 border border-orange-900/10 rounded-full px-4 md:px-6 py-2.5 md:py-3 shadow-lg">
            <div className="flex items-center gap-2 md:gap-3">
                <div className="relative h-7 w-7 overflow-hidden rounded-full md:h-8 md:w-8">
                  <Image
                    src={withBasePath("/assets/logo.png")}
                    alt="Speechworks logo"
                    fill
                    className="object-cover"
                    sizes="32px"
                  />
                </div>
                <span className="font-bold text-base md:text-lg tracking-tight text-app-text">
                  Speechworks
                </span>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <a
                href="#roadmap"
                className="text-xs font-semibold uppercase tracking-widest text-app-muted transition-colors hover:text-brand"
              >
                Roadmap
              </a>
              <a
                href="#platform"
                className="text-xs font-semibold uppercase tracking-widest text-app-muted transition-colors hover:text-brand"
              >
                Platform
              </a>
              <a
                href="#team"
                className="text-xs font-semibold uppercase tracking-widest text-app-muted transition-colors hover:text-brand"
              >
                Team
              </a>
              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="text-xs font-semibold uppercase tracking-widest text-app-muted transition-colors hover:text-brand"
              >
                Contact Us
              </button>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="#download"
                onClick={closeMenu}
                className="bg-brand text-white hover:bg-brand-600 px-4 md:px-6 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Get Access
              </a>

              <button
                type="button"
                onClick={() => setIsMenuOpen((current) => !current)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-900/10 bg-white/80 text-app-text transition-colors hover:bg-white lg:hidden"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav"
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              >
                {isMenuOpen ? (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M18 6 6 18" />
                    <path d="m6 6 12 12" />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 6h18" />
                    <path d="M3 12h18" />
                    <path d="M3 18h18" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            id="mobile-nav"
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen
                ? "max-h-72 opacity-100 translate-y-0 pt-3"
                : "pointer-events-none max-h-0 opacity-0 -translate-y-2 pt-0"
            }`}
          >
            <div className="mobile-fixed-glass mx-3 rounded-[1.75rem] border border-orange-900/10 bg-white/92 px-4 py-3 shadow-lg backdrop-blur-2xl">
              <div className="grid gap-2">
                <a
                  href="#roadmap"
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-app-text transition-colors hover:bg-brand-50"
                >
                  Roadmap
                </a>
                <a
                  href="#platform"
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-app-text transition-colors hover:bg-brand-50"
                >
                  Platform
                </a>
                <a
                  href="#team"
                  onClick={closeMenu}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-app-text transition-colors hover:bg-brand-50"
                >
                  Team
                </a>
                <button
                  type="button"
                  onClick={openContact}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-semibold text-app-text transition-colors hover:bg-brand-50"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
