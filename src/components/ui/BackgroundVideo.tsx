"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Background film.
 *
 * The rules this component exists to enforce:
 *
 *  1. The poster frame is the Largest Contentful Paint. It is a priority
 *     image and it paints first, before a single video byte is requested.
 *  2. The video is only requested after the page has loaded and the browser
 *     is idle. It never competes with the first screen.
 *  3. It is never loaded at all for a visitor who prefers reduced motion, or
 *     who is on a metered / slow connection — the poster simply stays.
 *  4. The video has no audio track at all, so it can never make a sound.
 *  5. The poster is never removed from the DOM, so the LCP element never
 *     changes and no new LCP candidate is ever created.
 */
export default function BackgroundVideo({
  poster,
  posterAlt,
  desktopSrc,
  mobileSrc,
  sizes = "100vw",
  priority = true,
  className,
  imageClassName,
}: {
  poster: string;
  posterAlt: string;
  desktopSrc: string;
  mobileSrc: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Respect a metered or slow connection — the poster carries the page.
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string };
      }
    ).connection;
    if (connection?.saveData) return;
    if (connection?.effectiveType && /(^|-)2g$/.test(connection.effectiveType)) return;

    let cancelled = false;
    let idle: number | undefined;
    let timeout: number | undefined;

    const start = () => {
      if (cancelled || !video) return;

      const isNarrow = window.matchMedia("(max-width: 767px)").matches;
      const source = isNarrow ? mobileSrc : desktopSrc;

      const onReady = () => {
        if (cancelled) return;
        setReady(true);
        video
          .play()
          .then(() => {
            if (!cancelled) setVisible(true);
          })
          .catch(() => {
            /* Autoplay refused — the poster stays, which is the correct result. */
          });
      };

      video.addEventListener("canplay", onReady, { once: true });
      video.src = source;
      video.load();
    };

    const schedule = () => {
      const idleCallback = (
        window as Window & {
          requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback;
      if (typeof idleCallback === "function") {
        // A generous timeout: the film is a bonus, never something a visitor
        // waits for.
        idle = idleCallback(start, { timeout: 3500 });
      } else {
        timeout = window.setTimeout(start, 1400);
      }
    };

    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });

    return () => {
      cancelled = true;
      if (idle !== undefined) {
        const cancel = (
          window as Window & { cancelIdleCallback?: (id: number) => void }
        ).cancelIdleCallback;
        cancel?.(idle);
      }
      if (timeout !== undefined) window.clearTimeout(timeout);
      window.removeEventListener("load", schedule);
      if (video) {
        video.pause();
        video.removeAttribute("src");
        video.load();
      }
    };
  }, [desktopSrc, mobileSrc]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* The poster — this is the LCP and it never leaves the DOM. */}
      <Image
        src={poster}
        alt={posterAlt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : "low"}
        className={cn("object-cover", imageClassName)}
      />

      {/* The film — layered on top, faded in only once it can play. */}
      <video
        ref={videoRef}
        aria-hidden="true"
        tabIndex={-1}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ease-editorial will-change-opacity",
          ready && visible ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Keeps the poster from ever being the only thing painted. */}
      <noscript>
        <style>{`.absolute video{opacity:0 !important}`}</style>
      </noscript>
    </div>
  );
}
