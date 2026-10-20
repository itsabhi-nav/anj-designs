"use client";

import { useEffect, useRef, type ReactNode } from "react";

import { canHover, subscribePointer } from "@/lib/pointer";
import { cn } from "@/lib/utils";

/**
 * Magnetic element.
 *
 * The element leans toward the pointer while it is near, and springs back
 * when the pointer leaves. It is the detail that makes an interface feel
 * physically responsive rather than merely interactive.
 *
 * The transform is applied to the element itself, so any child animation
 * should live on an inner wrapper.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.32,
  radius = 120,
}: {
  children: ReactNode;
  className?: string;
  /** How far the element may travel, as a fraction of the offset. */
  strength?: number;
  /** Distance (px) within which the element starts to respond. */
  radius?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!canHover()) return;

    let raf = 0;
    const current = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const apply = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      node.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      raf = requestAnimationFrame(apply);
    };

    const unsub = subscribePointer((state) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = state.x - cx;
      const dy = state.y - cy;
      const distance = Math.hypot(dx, dy);
      const reach = Math.max(radius, Math.max(rect.width, rect.height) / 2);

      if (distance < reach) {
        const falloff = 1 - distance / reach;
        target.x = dx * strength * falloff;
        target.y = dy * strength * falloff;
      } else {
        target.x = 0;
        target.y = 0;
      }
    });

    raf = requestAnimationFrame(apply);

    return () => {
      unsub();
      cancelAnimationFrame(raf);
      node.style.transform = "";
    };
  }, [strength, radius]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
