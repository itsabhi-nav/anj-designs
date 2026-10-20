import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import Media from "@/components/ui/Media";
import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/layout/PageHero";
import ProjectIndex from "@/components/projects/ProjectIndex";
import ClosingCta from "@/components/home/ClosingCta";
import { PinnedHorizontal } from "@/components/motion/ScrollChoreography";
import { SheetGrid, SheetMarker } from "@/components/ui/Sheet";
import { nonBreakingHyphens } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Projects — Interior design portfolio",
  description:
    "Thirteen completed interior projects by ANJ Designs by Decor Inn: apartments, houses, villas, commercial spaces, room interiors and an international commission in Baltimore, USA.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our projects"
        title="A portfolio worth the work it presents."
        intro="Thirteen projects across residential, commercial and international work — photographed as completed, with nothing added that was not built."
        image="/assets/projects/villa-golf-course-extension/01.webp"
        imageAlt="Interior of the Villa at Golf Course Extension Road, Gurugram"
        imageWidth={344}
        imageHeight={344}
        portraitSrc="/assets/hero-crops/villa-golf-course-extension.webp"
        portraitWidth={258}
        portraitHeight={344}
        stat={{ value: "13", label: "Commissioned projects" }}
      />

      {/* The showcase — a horizontal run through the portfolio */}
      <section className="relative bg-forest" aria-labelledby="showcase-title">
        <PinnedHorizontal
          className="relative bg-forest lg:h-[100svh] lg:min-h-[38rem]"
          count={projects.length}
          header={
            <div className="shell pt-24 md:pt-28">
              <SheetMarker
                number="01"
                label="The showcase"
                note="Scroll to travel"
                tone="dark"
                className="mb-7"
              />
              <h2
                id="showcase-title"
                className="max-w-3xl font-display text-display-sm font-light text-ivory-soft"
              >
                Thirteen interiors, one continuous{" "}
                <span className="display-italic text-champagne">sequence</span>.
              </h2>
            </div>
          }
        >
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="group relative h-[42vh] min-h-[18rem] w-[76vw] shrink-0 sm:w-[54vw] lg:h-[50vh] lg:min-h-[20rem] lg:w-[40vw] xl:w-[34vw]"
            >
              <Link
                href={`/projects/${project.slug}`}
                data-cursor="view"
                data-cursor-label="Open"
                className="block h-full"
              >
                <div className="relative h-full overflow-hidden bg-forest-emerald">
                  <Media
                    src={project.hero.src}
                    alt={project.hero.alt}
                    width={project.hero.width}
                    height={project.hero.height}
                    sizes="(max-width: 640px) 76vw, (max-width: 1024px) 54vw, 40vw"
                    className="h-full w-full object-cover transition-transform duration-[1600ms] ease-editorial group-hover:scale-[1.06]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,22,.1)_0%,rgba(11,28,22,.15)_45%,rgba(11,28,22,.92)_100%)]"
                  />
                  <span
                    aria-hidden="true"
                    className="frame-ticks absolute inset-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-6 md:p-8">
                  <div>
                    <p className="meta text-champagne">
                      {String(index + 1).padStart(2, "0")}
                      <span className="mx-2 text-ivory/30">/</span>
                      {project.category}
                    </p>
                    <h3 className="mt-2 font-display text-[clamp(1.5rem,2.4vw,2.35rem)] font-light leading-tight text-ivory-soft">
                      {nonBreakingHyphens(project.title)}
                    </h3>
                    <p className="mt-1.5 text-[0.66rem] uppercase tracking-[0.2em] text-ivory/55">
                      {project.location ?? project.category}
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center border border-ivory/30 text-ivory-soft transition-colors duration-500 group-hover:border-champagne group-hover:text-champagne"
                  >
                    <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </PinnedHorizontal>
      </section>

      {/* The archive */}
      <section
        className="relative bg-ivory-soft py-[clamp(3.5rem,7vw,7rem)]"
        aria-labelledby="archive-title"
      >
        <SheetGrid />
        <div className="shell relative">
          <Reveal>
            <div className="mb-12 flex flex-col gap-6 border-b border-line pb-6 md:flex-row md:items-end md:justify-between">
              <div>
                <SheetMarker
                  number="02"
                  label="The archive"
                  note="Filter by category"
                  className="mb-7"
                />
                <h2
                  id="archive-title"
                  className="font-display text-display-sm font-light text-ink"
                >
                  Every project, in full
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
                Filter the archive by the kind of work it is, then open any
                project for the full gallery.
              </p>
            </div>
          </Reveal>

          <ProjectIndex projects={projects} />
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
