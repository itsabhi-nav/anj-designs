"use client";

import Image from "next/image";
import { useState } from "react";
import { Plus } from "lucide-react";

import type { CraftRange } from "@/types/service";
import { cn } from "@/lib/utils";

/**
 * Furniture range explorer.
 *
 * A keyboard-accessible accordion: the trigger is a real <button> with
 * aria-expanded / aria-controls, and the panel content is always present in
 * the DOM (visually collapsed rather than removed) so the information is
 * reachable without hovering and remains indexable.
 */
export default function CraftRangeList({ ranges }: { ranges: CraftRange[] }) {
  const [open, setOpen] = useState<string>(ranges[0]?.id ?? "");

  return (
    <div className="border-t border-line">
      {ranges.map((range) => {
        const expanded = open === range.id;
        return (
          <div key={range.id} className="border-b border-line">
            <h3>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`panel-${range.id}`}
                onClick={() => setOpen(expanded ? "" : range.id)}
                className="group flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span
                    className={cn(
                      "font-display text-2xl font-light transition-colors duration-500 sm:text-3xl",
                      expanded ? "text-forest" : "text-ink/60 group-hover:text-ink"
                    )}
                  >
                    {range.title}
                  </span>
                  <span className="hidden text-[0.62rem] uppercase tracking-[0.22em] text-sage sm:inline">
                    {range.items.length} pieces
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center border transition-all duration-500",
                    expanded
                      ? "rotate-45 border-forest bg-forest text-ivory-soft"
                      : "border-forest/20 text-forest group-hover:border-forest"
                  )}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
            </h3>

            <div
              id={`panel-${range.id}`}
              className={cn(
                "grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-editorial",
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="min-h-0">
                <div className="grid gap-6 pb-8 md:grid-cols-12 md:gap-8">
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 md:col-span-5">
                    {range.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm text-ink-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="h-1 w-1 rounded-full bg-champagne"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="grid grid-cols-2 gap-3 md:col-span-7">
                    {range.images.slice(0, 2).map((src, index) => (
                      <div
                        key={src}
                        className="relative aspect-[4/3] overflow-hidden bg-ivory-deep"
                      >
                        <Image
                          src={src}
                          alt={`${range.title} — ${range.items[index] ?? range.title} by Decor Inn`}
                          width={800}
                          height={600}
                          sizes="(max-width: 768px) 50vw, 26vw"
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
