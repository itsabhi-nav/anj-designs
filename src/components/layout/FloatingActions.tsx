"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The floating actions.
 *
 * Two fixed controls in the bottom-right corner:
 *
 *  • WhatsApp — a direct line to the studio on +91 92311 00003. It opens the
 *    WhatsApp app on a phone and the web client on a desktop, with a
 *    pre-filled message so the conversation starts on topic.
 *  • Back to top — appears once the visitor has scrolled, and returns them to
 *    the top without a long scroll.
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
    <div className="pointer-events-none fixed bottom-5 right-4 z-[55] flex flex-col items-end gap-3 sm:bottom-7 sm:right-6">
      {/* Back to top */}
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

      {/* WhatsApp */}
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with ANJ Designs on WhatsApp"
        title="Chat with us on WhatsApp"
        data-cursor="link"
        className="pointer-events-auto group relative flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-full bg-[#25D366] p-[0.7rem] text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,.75)] transition-transform duration-500 ease-spring hover:scale-105 active:scale-95"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366] opacity-0 transition-opacity duration-500 group-hover:opacity-40"
        />
        <WhatsAppIcon className="relative h-full w-full" />
      </a>
    </div>
  );
}

/**
 * The WhatsApp mark.
 *
 * Built as a mask rather than a single opaque path: the bubble is a filled
 * disc with a tapered tail, and the handset is knocked out of it. That gives
 * the authentic single-colour WhatsApp mark, and it renders correctly at
 * every size because no part depends on a hand-traced path.
 */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <mask id="anj-wa-mark" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          {/* The bubble */}
          <circle cx="12" cy="10.1" r="9.5" fill="white" />
          {/* The tail */}
          <path
            d="M4.6 15c-1 2.1-1.6 4.2-1.8 6.2 2.1-.3 4.3-1.1 6.1-2.2-1.5-1-2.6-2.4-3.3-3.9Z"
            fill="white"
          />
          {/* The handset, knocked out of the bubble */}
          <path
            d="M9.5 8.3c.8 1.6 2 2.8 3.6 3.6l1.2-1.2c.3-.3.7-.4 1.1-.2.6.3 1.3.4 2 .4.4 0 .7.3.7.7v1.3c0 .4-.3.7-.7.7"
            fill="none"
            stroke="black"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(12 10.1) scale(0.86) translate(-13 -12.4)"
          />
        </mask>
      </defs>
      <rect
        width="24"
        height="24"
        fill="currentColor"
        mask="url(#anj-wa-mark)"
      />
    </svg>
  );
}
