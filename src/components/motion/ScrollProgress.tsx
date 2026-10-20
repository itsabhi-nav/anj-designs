"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A 2px reading-progress indicator.
 * Uses a transform updated on a requestAnimationFrame loop that is paused
 * whenever the tab is hidden — no layout properties are animated.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scale3d(${progress}, 1, 1)`;
      }
      setVisible(window.scrollY > 120);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        frame = requestAnimationFrame(update);
      }
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else {
        onScroll();
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 500ms cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-champagne"
      />
    </div>
  );
}
