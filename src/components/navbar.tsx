"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./language-switcher";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { href: "/", label: t("home") },
    { href: "/services", label: t("services") },
    { href: "/gallery", label: t("gallery") },
    { href: "/about", label: t("about") },
  ] as const;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo — floats below the header */}
          <Link href="/" className="absolute left-0 top-1/2 mt-[50px] -translate-y-1/3 z-10 block w-[150px] h-[150px] md:w-[200px] md:h-[200px] rounded-full bg-white shadow-lg border-2 border-white overflow-hidden">
            <Image src="/logo-blue.png" alt="SCUBA 507" width={200} height={200} className="w-full h-full object-cover" />
          </Link>

          {/* Spacer to push nav links past the logo */}
          <div className="w-48 md:w-64 shrink-0" />

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-primary" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <LanguageSwitcher />
            <Link
              href="/booking"
              className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
            >
              {t("book_now")}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4 pl-48">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-2.5 text-sm font-medium transition-colors ${
                  pathname === link.href ? "text-primary" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex items-center gap-4">
              <LanguageSwitcher />
              <Link
                href="/booking"
                onClick={() => setMobileOpen(false)}
                className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              >
                {t("book_now")}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
