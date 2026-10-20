"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import type { ProjectImage } from "@/types/project";

/**
 * Accessible lightbox.
 *
 * Keyboard: ← / → move, Escape closes, Tab is trapped inside the dialog.
 * Touch: horizontal swipe moves between images.
 * Focus returns to the thumbnail that opened it on close.
 */
export default function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: ProjectImage[];
  index: number;
  onClose: () => void;
  onIndexChange: (next: number) => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  const go = useCallback(
    (delta: number) => {
      onIndexChange((index + delta + images.length) % images.length);
    },
    [index, images.length, onIndexChange]
  );

  useEffect(() => {
    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    const node = dialogRef.current;
    const focusable = () =>
      Array.from(
        node?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
        ) ?? []
      );
    focusable()[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        go(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        go(-1);
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      restoreFocusTo.current?.focus?.();
    };
  }, [onClose, go]);

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[70] flex flex-col bg-forest-deep/97 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${images.length}`}
      ref={dialogRef}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;
        const delta = event.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(delta) > 48) go(delta > 0 ? -1 : 1);
        touchStartX.current = null;
      }}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close gallery"
        onClick={onClose}
        className="absolute inset-0 -z-10 cursor-zoom-out"
        tabIndex={-1}
      />

      <header className="flex items-center justify-between px-5 py-4 sm:px-8">
        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-ivory/60">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="flex h-11 w-11 items-center justify-center border border-ivory/25 text-ivory-soft transition-colors duration-500 hover:border-ivory-soft hover:bg-ivory-soft hover:text-forest-deep"
        >
          <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">Close gallery</span>
        </button>
      </header>

      {/* Stage */}
      <div className="relative flex flex-1 items-center justify-center px-4 pb-4 sm:px-16">
        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center border border-ivory/25 text-ivory-soft transition-colors duration-500 hover:border-ivory-soft hover:bg-ivory-soft hover:text-forest-deep sm:left-5"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">Previous image</span>
        </button>

        <figure className="relative max-h-full">
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt}
            width={current.width}
            height={current.height}
            sizes="(max-width: 1024px) 92vw, 80vw"
            className="max-h-[68vh] w-auto max-w-full object-contain"
          />
        </figure>

        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center border border-ivory/25 text-ivory-soft transition-colors duration-500 hover:border-ivory-soft hover:bg-ivory-soft hover:text-forest-deep sm:right-5"
        >
          <ChevronRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
          <span className="sr-only">Next image</span>
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-5 sm:justify-center sm:px-8">
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => onIndexChange(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === index}
              className={`relative h-14 w-14 shrink-0 overflow-hidden border transition-all duration-500 ${
                i === index
                  ? "border-champagne opacity-100"
                  : "border-ivory/20 opacity-55 hover:opacity-100"
              }`}
            >
              <Image
                src={image.src}
                alt=""
                width={56}
                height={56}
                sizes="56px"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
