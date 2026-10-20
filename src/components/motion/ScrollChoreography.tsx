"use client";

import { useEffect, useRef } from "react";

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
