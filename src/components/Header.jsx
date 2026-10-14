"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Globe, Menu, X } from "lucide-react";
import { Logo } from "./Brand";
import { nav } from "@/data/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  // Account pages open on a green panel, so the bar starts frosted there.
  const solid = ["/login", "/signup", "/forgot-password"].includes(pathname);
  const onDarkHero = pathname === "/" && !scrolled && !open;
  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  // Close the mobile sheet whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={`${onDarkHero ? "header-on-dark " : ""}mx-auto flex max-w-[1240px] items-center gap-4 rounded-full py-2 pl-2 pr-2 transition-all duration-300 sm:pl-3 ${
          scrolled || open || solid ? "glass glass-nav" : "border border-transparent"
        }`}
      >
        <Logo preload />

        <nav aria-label="Primary" className="ml-4 hidden flex-1 items-center gap-1 xl:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className="rounded-full px-3 py-2 text-[0.875rem] font-medium text-muted transition-colors hover:bg-green-50 hover:text-green aria-[current=page]:bg-green-50 aria-[current=page]:text-green"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm text-muted hover:bg-green-50 sm:inline-flex"
            aria-label="Choose language, current: English"
          >
            <Globe className="size-4" aria-hidden="true" />
            EN
          </button>
          <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm font-semibold text-green hover:bg-green-50 sm:inline-flex">
            Log in
          </Link>
          <Link href="/signup" className="btn-primary px-4 py-2 text-sm sm:px-5">
            Sign up
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-full text-green hover:bg-green-50 xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="glass mx-auto mt-2 max-w-[1240px] rounded-[28px] p-3 xl:hidden"
      >
        <nav aria-label="Mobile" className="grid gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 font-display text-lg font-semibold text-green hover:bg-green-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-2 grid grid-cols-2 gap-2 border-t border-line pt-3">
          <Link href="/login" className="btn-glass py-3 text-sm">Log in</Link>
          <Link href="/signup" className="btn-primary py-3 text-sm">Create free account</Link>
        </div>
      </div>
    </header>
  );
}
