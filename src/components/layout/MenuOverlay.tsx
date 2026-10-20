"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowUpRight, Phone } from "lucide-react";

import { contact, navigation } from "@/data/site";
import { cn } from "@/lib/utils";

/**
 * Full-screen mobile menu.
 *
 * Focus is moved into the overlay when it opens, trapped while it is open and
 * restored to the trigger on close. Escape closes it. Background scrolling is
 * locked while it is open.
 */
export default function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const timer = window.setTimeout(() => focusables()[0]?.focus(), 240);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(timer);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-0 z-40 overflow-hidden lg:hidden",
        open ? "pointer-events-auto" : "pointer-events-none"
      )}
      aria-hidden={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-forest transition-opacity duration-700 ease-editorial",
          open ? "opacity-100" : "opacity-0"
        )}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label="Site menu"
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-[26rem] flex-col overflow-y-auto bg-forest px-7 pb-10 pt-28 transition-transform duration-[750ms] ease-editorial",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav aria-label="Mobile" className="flex-1">
          <ul className="space-y-1">
            {navigation.map((item, index) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <li key={item.href} className="overflow-hidden">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    tabIndex={open ? 0 : -1}
                    className="group flex items-baseline gap-4 border-b border-ivory/10 py-4"
                  >
                    <span className="text-[0.65rem] tracking-[0.2em] text-champagne">
                      0{index + 1}
                    </span>
                    <span
                      className={cn(
                        "font-display text-3xl transition-colors duration-300",
                        active ? "text-champagne" : "text-ivory-soft"
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-10 space-y-6 border-t border-ivory/10 pt-8">
          <Link
            href="/contact"
            onClick={onClose}
            tabIndex={open ? 0 : -1}
            className="flex w-full items-center justify-between bg-champagne px-6 py-4 text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-forest-deep transition-colors duration-500 hover:bg-ivory-soft"
          >
            Let&apos;s Collaborate
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </Link>

          <div className="space-y-2 text-sm text-ivory/70">
            {contact.phones.map((phone) => (
              <a
                key={phone.href}
                href={phone.href}
                tabIndex={open ? 0 : -1}
                className="flex items-center gap-2.5 transition-colors hover:text-ivory-soft"
              >
                <Phone className="h-3.5 w-3.5 text-champagne" strokeWidth={1.5} />
                {phone.label}
              </a>
            ))}
            <a
              href={`mailto:${contact.emails.primary}`}
              tabIndex={open ? 0 : -1}
              className="block transition-colors hover:text-ivory-soft"
            >
              {contact.emails.primary}
            </a>
            <p className="pt-2 text-xs leading-relaxed text-ivory/65">
              {contact.address.line1}, {contact.address.line2},{" "}
              {contact.address.city} {contact.address.postcode}
            </p>
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-forest to-transparent" />
        <Image
          src="/assets/brand/anj-favicon.png"
          alt=""
          aria-hidden="true"
          width={44}
          height={44}
          className="pointer-events-none absolute right-7 top-7 h-9 w-9 opacity-25"
        />
      </div>
    </div>
  );
}
