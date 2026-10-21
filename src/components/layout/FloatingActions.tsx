"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { cn } from "@/lib/utils";

/**
 * The floating actions.
 *
 * Two fixed controls, deliberately kept apart:
 *
 *  • WhatsApp — bottom LEFT. A direct line to the studio on
 *    +91 92311 00003. It opens the WhatsApp app on a phone and the web
 *    client on a desktop, with a pre-filled message so the conversation
 *    starts on topic. The mark is the official WhatsApp brand glyph.
 *  • Back to top — bottom RIGHT. Appears once the visitor has scrolled, and
 *    returns them to the top without a long scroll.
 *
 * Both are keyboard reachable, labelled for screen readers, and the back-to-top
 * respects `prefers-reduced-motion`.
 */
export default function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setShow(window.scrollY > 720);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const whatsappHref = `https://wa.me/919231100003?text=${encodeURIComponent(
    "Hello ANJ Designs, I would like to discuss an interior design project."
  )}`;

  return (
    <>
      {/* WhatsApp — bottom left */}
      <div className="pointer-events-none fixed bottom-5 left-4 z-[55] sm:bottom-7 sm:left-6">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with ANJ Designs on WhatsApp"
          title="Chat with us on WhatsApp"
          data-cursor="link"
          className="pointer-events-auto group relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-[#25D366] p-[0.72rem] text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,.75)] transition-transform duration-500 ease-spring hover:scale-105 active:scale-95"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-0 transition-opacity duration-500 group-hover:opacity-40"
          />
          <FaWhatsapp className="relative h-full w-full" aria-hidden="true" />
        </a>
      </div>

      {/* Back to top — bottom right */}
      <div className="pointer-events-none fixed bottom-5 right-4 z-[55] sm:bottom-7 sm:right-6">
        <button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          className={cn(
            "pointer-events-auto flex h-11 w-11 items-center justify-center border border-forest/15 bg-ivory-soft/90 text-forest shadow-plate backdrop-blur-md transition-all duration-500 ease-editorial hover:border-forest hover:bg-forest hover:text-ivory-soft",
            // `invisible` (not just opacity) so the control leaves the tab order
            // entirely while it is hidden.
            show
              ? "visible translate-y-0 opacity-100"
              : "invisible translate-y-3 opacity-0"
          )}
        >
          <ArrowUp className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
        </button>
      </div>
    </>
  );
}
