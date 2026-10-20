"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * Deferred video.
 *
 * The poster frame is rendered as an ordinary image, so the browser paints
 * something meaningful immediately and no video bytes are requested. The
 * <source> elements are only attached once the visitor scrolls the video into
 * view (or presses play), and playback never starts automatically — so the
 * video can never compete with the first viewport for bandwidth.
 */
export default function DeferredVideo({
  poster,
  posterAlt,
  desktopSrc,
  mobileSrc,
  width,
  height,
  className,
  label = "Play film",
}: {
  poster: string;
  posterAlt: string;
  desktopSrc: string;
  mobileSrc: string;
  width: number;
  height: number;
  className?: string;
  label?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const node = videoRef.current;
    if (!node) return;

    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(reducedQuery.matches);

    const load = () => {
      if (node.dataset.loaded === "true") return;
      node.dataset.loaded = "true";
      setReady(true);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          load();
          observer.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const play = async () => {
    const node = videoRef.current;
    if (!node) return;
    if (!ready) {
      node.dataset.loaded = "true";
      setReady(true);
      // Let React attach the <source> elements before playing.
      window.setTimeout(() => void node.play(), 60);
      return;
    }
    try {
      await node.play();
    } catch {
      /* autoplay or decode failure — the poster stays visible */
    }
  };

  return (
    <div className={className}>
      <div className="relative overflow-hidden bg-forest">
        <video
          ref={videoRef}
          playsInline
          muted
          loop
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="h-full w-full object-cover"
          aria-label={posterAlt}
        >
          {ready && (
            <>
              <source src={desktopSrc} type="video/mp4" media="(min-width: 768px)" />
              <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />
            </>
          )}
        </video>

        {!playing && ready && (
          <>
            <Image
              src={poster}
              alt={posterAlt}
              width={width}
              height={height}
              sizes="100vw"
              fetchPriority="low"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={play}
              disabled={reduced}
              className="absolute inset-0 flex items-center justify-center bg-forest/35 transition-colors duration-500 hover:bg-forest/20 disabled:cursor-default"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-ivory/70 bg-forest/40 text-ivory-soft backdrop-blur-sm transition-all duration-500 hover:scale-105 hover:border-champagne hover:text-champagne">
                <Play className="ml-1 h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                <span className="sr-only">{label}</span>
              </span>
            </button>
          </>
        )}

        {!ready && (
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(135deg,rgba(16,40,32,.9),rgba(32,76,60,.75))]"
          />
        )}
      </div>
    </div>
  );
}
