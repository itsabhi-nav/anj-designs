import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { featuredProjects, projects } from "@/data/projects";
import Media from "@/components/ui/Media";
import Reveal from "@/components/motion/Reveal";
import ProjectRail from "./ProjectRail";

/**
 * Featured project experience.
 *
 * A dominant project anchors the composition, followed by a horizontally
 * navigable rail of the remaining featured work and a full-archive link.
 * Deliberately not a uniform card grid.
 */
export default function FeaturedProjects() {
  const [lead, ...rest] = featuredProjects;

  return (
    <section
      className="relative overflow-hidden bg-ivory-soft py-[clamp(4.5rem,10vw,10rem)]"
      aria-labelledby="projects-title"
    >
      <div className="shell">
        <Reveal>
          <div className="flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">~ Our projects ~</p>
              <h2
                id="projects-title"
                className="mt-5 max-w-2xl font-display text-display-md font-light text-ink"
              >
                Work that carries the{" "}
                <span className="display-italic text-forest-secondary">
                  mark of the hand
                </span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
              Thirteen commissioned interiors across residential, commercial and
              international projects — photographed exactly as they were
              completed.
            </p>
          </div>
        </Reveal>

        {/* Dominant project */}
        <Reveal delay={80} className="mt-12">
          <article className="group grid grid-cols-1 items-end gap-8 lg:grid-cols-12 lg:gap-10">
            <Link
              href={`/projects/${lead.slug}`}
              className="relative block overflow-hidden lg:col-span-8"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ivory-deep lg:aspect-[16/10]">
                <Media
                  src={lead.hero.src}
                  alt={lead.hero.alt}
                  width={lead.hero.width}
                  height={lead.hero.height}
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-editorial group-hover:scale-[1.05]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,22,0)_45%,rgba(11,28,22,.7)_100%)]"
                />
                <span className="absolute left-6 top-6 bg-forest/80 px-3.5 py-1.5 text-[0.6rem] uppercase tracking-[0.24em] text-champagne backdrop-blur-sm">
                  Featured project
                </span>
              </div>
            </Link>

            <div className="lg:col-span-4 lg:pb-4">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sage">
                {lead.location
                  ? `${lead.category} — ${lead.location}`
                  : lead.category}
              </p>
              <h3 className="mt-4 font-display text-display-sm font-light leading-[1.02] text-ink">
                {lead.title}
              </h3>
              <p className="mt-5 text-body-md text-ink-muted">{lead.note}</p>
              <Link
                href={`/projects/${lead.slug}`}
                className="btn btn-outline btn-sm mt-8 group/btn"
              >
                View project
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </article>
        </Reveal>

        {/* Rail */}
        <div className="mt-20">
          <Reveal>
            <h3 className="sr-only">More featured projects</h3>
          </Reveal>
          <ProjectRail projects={rest} />
        </div>

        {/* Archive link */}
        <Reveal delay={100} className="mt-14 flex flex-col items-center gap-4">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 border-b border-forest/25 pb-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-forest transition-colors duration-500 hover:border-forest"
          >
            View the complete portfolio
            <span className="text-sage">({projects.length})</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
