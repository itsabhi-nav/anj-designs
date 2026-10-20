"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { services } from "@/data/services";
import { cn } from "@/lib/utils";

/**
 * The studio index.
 *
 * The studio's four disciplines presented as a single interactive list. On a
 * fine-pointer device a preview plate follows the pointer and cross-fades
 * between disciplines; on touch and small screens it becomes a plain,
 * beautifully set list of links.
 *
 * Nothing is hover-only — every entry is a real link with a real title, and
 * the preview is an addition, never the content.
 */
export default function StudioIndex() {
  const [active, setActive] = useState(0);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [fine, setFine] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    setFine(query.matches);
    const onChange = (event: MediaQueryListEvent) => setFine(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!fine) return;
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={onMove}
      className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14"
    >
      {/* The list */}
      <ul className="lg:col-span-7">
        {services.map((service, index) => {
          const isActive = index === active;
          return (
            <li key={service.id} className="border-t border-forest/12 last:border-b">
              <Link
                href={`/services#${service.id}`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                data-cursor="view"
                data-cursor-label="Open"
                className="group relative flex items-start gap-5 py-7 md:gap-8 md:py-9"
              >
                <span
                  className={cn(
                    "meta mt-2 shrink-0 transition-colors duration-500",
                    isActive ? "text-champagne-dark" : "text-ink/30"
                  )}
                >
                  {service.index}
                </span>

                <span className="flex-1">
                  <span
                    className={cn(
                      "block font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-light leading-[1.02] tracking-[-0.025em] transition-all duration-700 ease-editorial",
                      isActive
                        ? "translate-x-0 text-forest"
                        : "translate-x-0 text-ink/45"
                    )}
                  >
                    {service.title}
                  </span>
                  <span
                    className={cn(
                      "mt-2 block text-[0.8125rem] uppercase tracking-[0.18em] transition-colors duration-500",
                      isActive ? "text-sage" : "text-ink/25"
                    )}
                  >
                    {service.strapline}
                  </span>

                  <span
                    className={cn(
                      "grid overflow-hidden transition-all duration-700 ease-editorial",
                      isActive
                        ? "mt-5 grid-rows-[1fr] opacity-100"
                        : "mt-0 grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <span className="min-h-0">
                      <span className="block max-w-lg text-sm leading-relaxed text-ink-muted">
                        {service.body}
                      </span>
                    </span>
                  </span>
                </span>

                <span
                  className={cn(
                    "mt-1 flex h-11 w-11 shrink-0 items-center justify-center border transition-all duration-500",
                    isActive
                      ? "border-forest bg-forest text-ivory-soft"
                      : "border-forest/15 text-forest/40"
                  )}
                >
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    "rule-draw absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-700 ease-editorial",
                    isActive && "scale-x-100"
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>

      {/* The preview plate */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-32">
          <div className="relative aspect-[4/5] overflow-hidden bg-forest shadow-lift">
            {services.map((service, index) => (
              <div
                key={service.id}
                className={cn(
                  "absolute inset-0 transition-opacity duration-700 ease-editorial",
                  index === active ? "opacity-100" : "opacity-0"
                )}
              >
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  width={service.image.width}
                  height={service.image.height}
                  sizes="40vw"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,22,.12)_0%,rgba(11,28,22,.8)_100%)]"
                />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="meta text-champagne">{service.index}</p>
                  <p className="mt-2 font-display text-2xl leading-tight text-ivory-soft">
                    {service.title}
                  </p>
                </div>
              </div>
            ))}

            {/* The plate that trails the pointer */}
            {fine && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/60 opacity-70"
                style={{
                  transform: `translate3d(${pointer.x - 48}px, ${pointer.y - 48}px, 0)`,
                  transition: "transform 320ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            )}

            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 frame-ticks"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
