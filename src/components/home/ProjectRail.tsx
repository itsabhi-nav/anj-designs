"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/project";
import { cn, nonBreakingHyphens } from "@/lib/utils";

/**
 * Horizontally navigable project rail.
 *
 * Built on native horizontal scrolling with scroll-snap, so it works with a
 * mouse, a trackpad, touch and the keyboard. The arrow buttons simply scroll
 * the container — no custom momentum, no scroll hijacking, no pinning.
 */
export default function ProjectRail({ projects }: { projects: Project[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByCard = (direction: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector<HTMLElement>("[data-rail-item]");
    const step = first ? first.offsetWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between gap-6">
        <p className="meta text-sage">Drag or use the arrows</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Previous projects"
            className="flex h-11 w-11 items-center justify-center border border-forest/20 text-forest transition-all duration-500 hover:border-forest hover:bg-forest hover:text-ivory-soft disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Next projects"
            className="flex h-11 w-11 items-center justify-center border border-forest/20 text-forest transition-all duration-500 hover:border-forest hover:bg-forest hover:text-ivory-soft disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory gap-6 overflow-x-auto px-[var(--gutter)] pb-2"
      >
        {projects.map((project, index) => (
          <article
            key={project.slug}
            data-rail-item
            className="group w-[78vw] shrink-0 snap-start sm:w-[22rem] lg:w-[25rem]"
          >
            <Link
              href={`/projects/${project.slug}`}
              data-cursor="view"
              data-cursor-label="View"
              className="block focus-visible:outline-none"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
                <Image
                  src={project.hero.src}
                  alt={project.hero.alt}
                  width={project.hero.width}
                  height={project.hero.height}
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 22rem, 25rem"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-editorial group-hover:scale-[1.07]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(11,28,22,.85)_100%)]"
                />
                <span
                  aria-hidden="true"
                  className="frame-ticks absolute inset-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                />
                <span className="absolute left-5 top-5 meta text-champagne">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl leading-tight text-ivory-soft">
                    {nonBreakingHyphens(project.title)}
                  </h3>
                  <p className="mt-1.5 text-[0.68rem] uppercase tracking-[0.2em] text-ivory/60">
                    {project.location ?? project.category}
                  </p>
                </div>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-ivory/40 text-ivory-soft",
                    "translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
                  )}
                >
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
