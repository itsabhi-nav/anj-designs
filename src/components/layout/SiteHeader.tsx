"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { navigation } from "@/data/site";
import { cn } from "@/lib/utils";
import MenuOverlay from "./MenuOverlay";

/**
 * Site header.
 *
 * Starts as a transparent overlay over the hero and settles into a refined
 * solid bar once the visitor scrolls. On inner pages it is solid from the
 * start. The logo, navigation and CTA are all rendered on the server.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-700 ease-editorial",
          solid
            ? // Fully opaque: at 80% the hero's bright content still read
              // through the bar and looked like a rendering fault.
              "border-b border-forest/10 bg-ivory-soft py-3 shadow-[0_1px_0_rgba(16,40,32,.06),0_10px_30px_-24px_rgba(16,40,32,.5)]"
            : "border-b border-transparent bg-transparent py-5"
        )}
      >
        <div className="shell flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="ANJ Designs by Decor Inn — home"
            className={cn(
              "relative z-10 flex shrink-0 items-center transition-opacity duration-500",
              solid ? "opacity-100" : "opacity-100"
            )}
          >
            {/*
              The brand mark is a fixed-size asset, so it is served as one
              exact file rather than a responsive srcset — a logo should be
              pixel-identical everywhere, and the old trimmed PNG in the
              library was itself cropped, which cut the wordmark in half.
            */}
            <span className="relative block w-[10.5rem] sm:w-[12rem]">
              <Image
                src="/assets/brand/anj-lockup-white.webp"
                alt="ANJ Designs by Decor Inn"
                width={732}
                height={172}
                unoptimized
                className={cn(
                  "block h-auto w-full transition-opacity duration-700 ease-editorial",
                  solid ? "opacity-0" : "opacity-100"
                )}
              />
              <Image
                src="/assets/brand/anj-lockup-forest.webp"
                alt=""
                aria-hidden="true"
                width={732}
                height={172}
                unoptimized
                className={cn(
                  "absolute inset-0 block h-auto w-full transition-opacity duration-700 ease-editorial",
                  solid ? "opacity-100" : "opacity-0"
                )}
              />
            </span>
          </Link>

          <nav
            aria-label="Primary"
            className={cn(
              "hidden items-center gap-9 transition-colors duration-700 lg:flex",
              solid ? "text-forest" : "text-ivory-soft"
            )}
          >
            {navigation.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group relative text-[0.78rem] font-medium uppercase tracking-[0.16em] transition-opacity duration-300 hover:opacity-60"
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-champagne transition-transform duration-500 ease-editorial",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className={cn(
                "hidden transition-colors duration-500 md:inline-flex",
                solid
                  ? "btn-outline btn-sm"
                  : "btn-ghost-light btn-sm border-ivory/40"
              )}
            >
              Let&apos;s Collaborate
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className={cn(
                "relative z-10 flex h-11 w-11 items-center justify-center border transition-colors duration-500 lg:hidden",
                solid
                  ? "border-forest/20 text-forest"
                  : "border-ivory/40 text-ivory-soft"
              )}
            >
              <span className="sr-only">
                {menuOpen ? "Close menu" : "Open menu"}
              </span>
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-all duration-500 ease-editorial",
                    menuOpen ? "top-1.5 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-all duration-500 ease-editorial",
                    menuOpen ? "top-1.5 -rotate-45" : "top-3"
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
