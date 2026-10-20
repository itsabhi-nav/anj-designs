"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Lightweight scroll reveal built on IntersectionObserver + CSS transitions.
 *
 * Deliberately not GSAP: this covers the majority of entrances on the site and
 * keeps the initial JavaScript payload tiny. If the observer never fires (JS
 * disabled, exotic browser) the content is still readable because the
 * "hidden" state is applied by the same script that reveals it.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  threshold = 0.15,
  rootMargin = "0px 0px -8% 0px",
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      node.classList.add("is-revealed");
      return;
    }

    node.classList.add("reveal-ready");
    if (delay) node.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay, threshold, rootMargin]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
