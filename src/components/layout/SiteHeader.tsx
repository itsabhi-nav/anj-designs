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
          "fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color,padding] duration-700 ease-editorial",
          solid
            ? "border-b border-forest/10 bg-ivory-soft/92 py-3 backdrop-blur-xl supports-[backdrop-filter]:bg-ivory-soft/80"
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
            <span className="relative block w-[10.5rem] sm:w-[12rem]">
              <Image
                src="/assets/brand/anj-logo-white.png"
                alt="ANJ Designs by Decor Inn"
                width={686}
                height={147}
                sizes="(max-width: 640px) 168px, 192px"
                priority
                className={cn(
                  "h-auto w-full transition-all duration-700 ease-editorial",
                  solid ? "opacity-0" : "opacity-100"
                )}
              />
              <Image
                src="/assets/brand/anj-logo-forest.png"
                alt="ANJ Designs by Decor Inn"
                width={686}
                height={147}
                sizes="(max-width: 640px) 168px, 192px"
                priority
                className={cn(
                  "absolute inset-0 h-auto w-full transition-all duration-700 ease-editorial",
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
