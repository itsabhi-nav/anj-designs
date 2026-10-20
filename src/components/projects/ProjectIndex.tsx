"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "@/types/project";
import { projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Asymmetrical project index with filtering.
 *
 * The layout deliberately breaks the grid: cards alternate between a tall
 * 4:5 and a short 4:3 crop so the archive reads as an editorial spread
 * rather than a spreadsheet of thumbnails. Filters are plain buttons, so
 * they are keyboard- and touch-friendly and the active state is announced.
 */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter, projects]
  );

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col gap-5 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="group"
          aria-label="Filter projects by category"
          className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1"
        >
          {projectCategories.map((category) => {
            const active = filter === category.value;
            const count =
              category.value === "All"
                ? projects.length
                : projects.filter((p) => p.category === category.value).length;
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => setFilter(category.value)}
                aria-pressed={active}
                className={cn(
                  "shrink-0 whitespace-nowrap px-4 py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] transition-all duration-500",
                  active
                    ? "bg-forest text-ivory-soft"
                    : "text-ink-muted hover:bg-ivory hover:text-ink"
                )}
              >
                {category.label}
                <span
                  className={cn(
                    "ml-2 text-[0.62rem]",
                    active ? "text-champagne" : "text-sage"
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="text-[0.7rem] uppercase tracking-[0.18em] text-sage">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
        </p>
      </div>

      {/* Index */}
      <ul className="mt-12 grid grid-cols-1 gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => {
          const tall = index % 5 === 0 || index % 5 === 3;
          return (
            <li
              key={project.slug}
              className={cn(
                "group",
                tall ? "lg:row-span-2" : "",
                index % 5 === 4 && "lg:col-span-2"
              )}
            >
              <Link href={`/projects/${project.slug}`} className="block">
                <div
                  className={cn(
                    "relative overflow-hidden bg-ivory-deep",
                    tall ? "aspect-[4/5]" : "aspect-[4/3]"
                  )}
                >
                  <Image
                    src={project.hero.src}
                    alt={project.hero.alt}
                    width={project.hero.width}
                    height={project.hero.height}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(11,28,22,.78)_100%)] opacity-80 transition-opacity duration-700 group-hover:opacity-95"
                  />
                  <span className="absolute left-5 top-5 text-[0.6rem] tracking-[0.24em] text-champagne">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-light leading-tight text-ink transition-colors duration-500 group-hover:text-forest-secondary">
                      {project.title}
                    </h2>
                    <p className="mt-1.5 text-[0.66rem] uppercase tracking-[0.2em] text-sage">
                      {project.location ?? project.category}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center border border-forest/15 text-forest transition-all duration-500 group-hover:border-forest group-hover:bg-forest group-hover:text-ivory-soft"
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      {visible.length === 0 && (
        <p className="py-24 text-center text-body-md text-ink-muted">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
