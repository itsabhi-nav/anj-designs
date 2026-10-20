"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { variantSrcSet } from "@/lib/image-loader";
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
  posterPortrait,
  posterAlt,
  desktopSrc,
  mobileSrc,
  sizes = "100vw",
  priority = true,
  className,
  imageClassName,
}: {
  poster: string;
  /** The portrait poster, used on phones where the frame is tall. */
  posterPortrait?: string;
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
  const [posterPainted, setPosterPainted] = useState(false);

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

    const begin = () => {
      // The poster is the Largest Contentful Paint. The film is not even
      // requested until the poster has landed, so the two never compete for
      // the connection.
      if (cancelled) return;
      if (!posterPainted) return;
      if (document.readyState === "complete") schedule();
      else window.addEventListener("load", schedule, { once: true });
    };

    begin();

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
  }, [desktopSrc, mobileSrc, posterPainted]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {/* ── The poster — this is the LCP and it never leaves the DOM. ──── */}
      {priority && (
        <>
          <link
            rel="preload"
            as="image"
            href={poster}
            imageSrcSet={variantSrcSet(poster)}
            imageSizes="100vw"
            media="(min-width: 768px)"
          />
          {posterPortrait && (
            <link
              rel="preload"
              as="image"
              href={posterPortrait}
              imageSrcSet={variantSrcSet(posterPortrait)}
              imageSizes="100vw"
              media="(max-width: 767px)"
            />
          )}
        </>
      )}

      <picture className="contents">
        {posterPortrait && (
          <source
            media="(max-width: 767px)"
            srcSet={variantSrcSet(posterPortrait)}
            sizes="100vw"
            width={640}
            height={1136}
          />
        )}
        <Image
          src={poster}
          alt={posterAlt}
          fill
          sizes={sizes}
          priority={false}
          loading="eager"
          fetchPriority={priority ? "high" : "low"}
          onLoad={() => setPosterPainted(true)}
          className={cn("object-cover", imageClassName)}
        />
      </picture>

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
    </div>
  );
}
