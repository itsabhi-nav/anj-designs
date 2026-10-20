"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll choreography built on GSAP + ScrollTrigger.
 *
 * GSAP is imported dynamically so it never sits on the critical path — the
 * page renders and is usable before the animation library has even loaded.
 *
 * Two distinct effects are used, each in the place where it earns its keep:
 *
 *  • `Parallax` — an image drifts at a different rate from the text beside
 *    it, which gives large-format photography a sense of depth.
 *  • `PinnedStory` — a tall panel is held in view while its text advances
 *    through a short sequence. Used once, on the homepage only.
 *
 * Everything is skipped when the visitor prefers reduced motion, and the
 * pinned section always has a scroll-driven end point so a visitor can never
 * be trapped.
 */
export function Parallax({
  children,
  className,
  speed = 12,
}: {
  children: React.ReactNode;
  className?: string;
  /** Percentage of the layer's height the layer travels. */
  speed?: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const layer = layerRef.current;
    if (!section || !layer) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Only the position is animated. Chrome discards a Largest Contentful
        // Paint candidate whose size changes, so the scale is a static CSS
        // value on the image instead of an animated one.
        gsap.fromTo(
          layer,
          { yPercent: -speed / 2 },
          {
            yPercent: speed / 2,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.6,
              invalidateOnRefresh: true,
            },
          }
        );
      }, section);

      // Re-measure once fonts and images have settled.
      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") refresh();
      else window.addEventListener("load", refresh, { once: true });
      const timer = window.setTimeout(refresh, 900);
      return () => window.clearTimeout(timer);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [speed]);

  return (
    <div ref={sectionRef} className={className}>
      {/* The layer is taller than its frame so the drift never exposes an edge. */}
      <div
        ref={layerRef}
        className="-my-[15%] h-[130%] w-full will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}

/**
 * A pinned horizontal showcase.
 *
 * The visitor scrolls vertically and the track travels horizontally. The pin
 * always has a defined end, so scrolling is never trapped, and the whole
 * effect is skipped on small screens, on touch devices and under
 * `prefers-reduced-motion` — where the same content is presented as an
 * ordinary horizontal scroller instead.
 */
export function PinnedHorizontal({
  children,
  className,
  trackClassName,
  count,
  header,
}: {
  children: React.ReactNode;
  className?: string;
  trackClassName?: string;
  count: number;
  /** Rendered once, pinned in place, above the travelling track. */
  header?: React.ReactNode;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const narrow = window.matchMedia("(max-width: 1023px)").matches;
    const touch = window.matchMedia("(hover: none)").matches;

    if (reduced || narrow || touch) {
      // Fall back to a native horizontal scroller.
      const onScroll = () => {
        const max = track.scrollWidth - track.clientWidth;
        const ratio = max > 0 ? track.scrollLeft / max : 0;
        setProgress(ratio);
      };
      track.addEventListener("scroll", onScroll, { passive: true });
      return () => track.removeEventListener("scroll", onScroll);
    }

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      ctx = gsap.context(() => {
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance() + window.innerHeight * 0.6}`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const ratio = self.progress;
              setProgress(ratio);
              const per = 1 / Math.max(1, count - 1);
              setActive(Math.min(count - 1, Math.round(ratio / per)));
            },
          },
        });

        setPinned(true);
        return () => {
          tween.kill();
        };
      }, section);

      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") refresh();
      else window.addEventListener("load", refresh, { once: true });
      const timer = window.setTimeout(refresh, 900);
      return () => window.clearTimeout(timer);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [count]);

  return (
    <section ref={sectionRef} className={className}>
      <div className="relative h-full overflow-hidden">
        {header && (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
            {header}
          </div>
        )}

        <div
          ref={trackRef}
          className={cn(
            "flex items-center gap-6 px-[var(--gutter)] py-28 will-change-transform",
            !pinned
              ? "no-scrollbar overflow-x-auto lg:py-0"
              : "h-full lg:py-0",
            trackClassName
          )}
        >
          {children}
        </div>

        {/* Progress readout */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex items-center gap-6 px-[var(--gutter)]">
          <span className="meta text-ivory/60">
            <span ref={counterRef} className="text-champagne">
              {String(active + 1).padStart(2, "0")}
            </span>
            <span className="mx-2 text-ivory/45">/</span>
            {String(count).padStart(2, "0")}
          </span>
          <div className="h-px flex-1 bg-ivory/15">
            <div
              ref={barRef}
              className="h-full origin-left bg-champagne"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * A single pinned sequence: the image column stays in view while the caption
 * beneath it advances. The pin is always released at the end of the section,
 * so scrolling is never trapped.
 */
export function PinnedStory({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 900px)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          image,
          { clipPath: "inset(12% 8% 12% 8%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "center 55%",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          }
        );
      }, section);

      const refresh = () => ScrollTrigger.refresh();
      if (document.readyState === "complete") refresh();
      else window.addEventListener("load", refresh, { once: true });
      const timer = window.setTimeout(refresh, 900);
      return () => window.clearTimeout(timer);
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={className}
      aria-label={label}
    >
      <div ref={imageRef} className="will-change-[clip-path]">
        {children}
      </div>
    </section>
  );
}
