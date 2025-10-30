"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/booking", label: "Book Now" },
    { href: "/about", label: "About" },
  ];

  return (
    <>
      {/* Desktop & Mobile Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-white"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-semibold tracking-tight text-black hover:opacity-70 transition-opacity duration-200"
            >
              NES TATTOO
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-base font-medium text-black relative transition-opacity duration-200 hover:opacity-70 ${
                      pathname === link.href ? "active" : ""
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-200 ${
                        pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden flex flex-col gap-1.5 p-2 z-[1001] ${
                isMobileMenuOpen ? "open" : ""
              }`}
              aria-label="Toggle navigation"
            >
              <span
                className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-[999] flex items-center justify-center transition-opacity duration-400 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="text-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={closeMobileMenu}
                className="block text-3xl font-semibold text-black py-4 hover:opacity-70 transition-opacity duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
