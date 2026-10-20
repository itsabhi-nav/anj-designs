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
 * The WhatsApp mark: the chat bubble drawn as an outline, with a handset
 * inside it. Built from primitives rather than a single opaque path so the
 * glyph is guaranteed to render correctly at every size.
 */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* The bubble, with its tail */}
      <path
        d="M20.4 11.7a8.3 8.3 0 0 1-12.2 7.3L3.4 20.6l1.6-4.7a8.3 8.3 0 1 1 15.4-4.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* The handset */}
      <path
        d="M9.1 7.4c.9 1.7 2.3 3.1 4 4l1.1-1.1c.3-.3.7-.4 1.1-.2.7.3 1.5.5 2.3.5.5 0 .8.4.8.8v1.4c0 .5-.3.8-.8.8-3.6 0-7-1.7-8.8-4.7-.3-.5-.5-1-.5-1.5 0-.4.3-.7.7-.7h1.5c.4 0 .8.3.8.7 0 .8.2 1.5.5 2.2.2.4.1.8-.2 1.1l-.5.4Z"
        fill="currentColor"
      />
    </svg>
  );
}
