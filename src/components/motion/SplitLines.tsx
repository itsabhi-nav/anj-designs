"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Splits a headline into visual lines and reveals them one after another.
 *
 * Lines are measured at runtime against the real rendered width, so the split
 * always matches the layout — no hard-coded <br />, no hydration mismatch.
 * Before measurement completes the text renders as a single plain line, so the
 * content is never hidden and the page is fully readable without JavaScript.
 */
export default function SplitLines({
  text,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.085,
  trigger = "load",
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  trigger?: "load" | "scroll";
  as?: "span" | "h1" | "h2" | "h3" | "p";
}) {
  const rootRef = useRef<HTMLSpanElement & HTMLHeadingElement & HTMLParagraphElement>(null);
  const [lines, setLines] = useState<string[] | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let observer: IntersectionObserver | undefined;
    let resizeTimer = 0;

    const measure = () => {
      const source = root.querySelector<HTMLElement>("[data-split-source]");
      if (!source) return;
      const full = source.textContent ?? "";
      const words = full.split(/\s+/).filter(Boolean);
      const width = source.clientWidth;
      if (width < 80) return;

      const style = window.getComputedStyle(source);
      const probe = document.createElement("div");
      probe.style.position = "absolute";
      probe.style.visibility = "hidden";
      probe.style.whiteSpace = "pre-wrap";
      probe.style.width = `${width}px`;
      probe.style.font = style.font;
      probe.style.fontSize = style.fontSize;
      probe.style.lineHeight = style.lineHeight;
      probe.style.letterSpacing = style.letterSpacing;
      probe.style.textTransform = style.textTransform;
      probe.style.fontWeight = style.fontWeight;
      document.body.appendChild(probe);

      const result: string[] = [];
      let current = "";
      for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;
        probe.textContent = candidate;
        if (probe.scrollWidth > width + 1 && current) {
          result.push(current);
          current = word;
        } else {
          current = candidate;
        }
      }
      if (current) result.push(current);
      document.body.removeChild(probe);

      setLines(result.length > 1 ? result : null);
    };

    const start = () => {
      measure();
      window.setTimeout(() => setShown(true), 60);
    };

    if (trigger === "scroll") {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            observer?.disconnect();
            start();
          }
        },
        { threshold: 0.2 }
      );
      observer.observe(root);
    } else {
      const raf = requestAnimationFrame(() => start());
      window.addEventListener("load", start, { once: true });
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("load", start);
      };
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(measure, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer?.disconnect();
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
    };
  }, [text, trigger]);

  return (
    <Tag ref={rootRef} className={className}>
      {lines === null ? (
        <span data-split-source>{text}</span>
      ) : (
        <span aria-label={text} className="block">
          {lines.map((line, index) => (
            <span
              key={`${line}-${index}`}
              aria-hidden="true"
              className={cn("block overflow-hidden pb-[0.08em]", lineClassName)}
            >
              <span
                className="block will-change-transform"
                style={{
                  transform: shown
                    ? "translate3d(0, 0, 0)"
                    : "translate3d(0, 105%, 0)",
                  transition: `transform 1.05s cubic-bezier(0.22, 1, 0.36, 1) ${
                    delay * 1000 + index * stagger * 1000
                  }ms`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </span>
      )}
    </Tag>
  );
}
