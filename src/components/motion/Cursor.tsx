"use client";

import { useEffect, useRef, useState } from "react";

import { canHover, subscribePointer, type CursorMode } from "@/lib/pointer";

/**
 * The cursor.
 *
 * A small dot that tracks the pointer exactly, and a ring that trails it with
 * a little inertia. The ring responds to whatever is under the pointer — it
 * tightens over text, swells over an image, and can carry a label.
 *
 * It is decorative: it never intercepts the pointer, it is suppressed on
 * touch devices, and it disappears entirely under `prefers-reduced-motion`.
 */

const RING_SIZE: Record<CursorMode, number> = {
  default: 34,
  link: 46,
  view: 92,
  drag: 64,
  text: 20,
};

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<CursorMode>("default");
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!canHover()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...target };
    let raf = 0;

    const unsub = subscribePointer((state) => {
      target.x = state.x;
      target.y = state.y;
      setMode(state.mode);
      setLabel(state.label);
    });

    const tick = () => {
      // The dot is exact; the ring eases toward the pointer.
      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      ringPos.x += (target.x - ringPos.x) * 0.16;
      ringPos.y += (target.y - ringPos.y) * 0.16;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("pointerdown", () => setVisible(false));
    window.addEventListener("pointerup", () => setVisible(true));

    return () => {
      unsub();
      cancelAnimationFrame(raf);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = RING_SIZE[mode];
  const ringLabel = mode === "view" || mode === "drag" ? label : "";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[90]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms ease" }}
    >
      {/* Trailing ring */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-champagne/70"
        style={{
          width: size,
          height: size,
          transition:
            "width 420ms cubic-bezier(0.22,1,0.36,1), height 420ms cubic-bezier(0.22,1,0.36,1), background-color 420ms ease, border-color 420ms ease",
          backgroundColor:
            mode === "view" || mode === "drag"
              ? "rgba(192,168,120,.16)"
              : "transparent",
          borderColor:
            mode === "link"
              ? "rgba(16,40,32,.55)"
              : "rgba(192,168,120,.75)",
        }}
      >
        <span
          ref={labelRef}
          className="font-mono text-[0.58rem] uppercase tracking-[0.18em] text-forest"
          style={{ opacity: ringLabel ? 1 : 0, transition: "opacity 260ms ease" }}
        >
          {ringLabel}
        </span>
      </div>

      {/* Exact dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-champagne"
        style={{
          opacity: mode === "view" || mode === "drag" ? 0 : 1,
          transition: "opacity 240ms ease",
        }}
      />
    </div>
  );
}
