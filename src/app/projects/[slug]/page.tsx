import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import {
  getAdjacentProjects,
  getProject,
  getRelatedProjects,
  projects,
} from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import { SheetGrid, SheetMarker } from "@/components/ui/Sheet";
import { nonBreakingHyphens } from "@/lib/utils";
import Media from "@/components/ui/Media";
import Reveal from "@/components/motion/Reveal";
import ProjectGallery from "@/components/projects/ProjectGallery";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return pageMetadata({
      title: "Project not found",
      description: "This project could not be found.",
      path: `/projects/${slug}`,
      noIndex: true,
    });
  }
  return pageMetadata({
    title: `${project.title} — Interior Design Project`,
    description: `${project.title} by ANJ Designs by Decor Inn, ${project.location}. An interior design project by Annie Nagpal Jain's studio in New Delhi.`,
    path: `/projects/${project.slug}`,
    images: [project.hero.src],
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { previous, next } = getAdjacentProjects(slug);
  const related = getRelatedProjects(slug);

  return (
    <>
      {/* Hero */}
      <section className="relative isolate flex min-h-[82svh] items-end overflow-hidden bg-forest">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="hero-scale absolute inset-0">
            <Media
              src={project.hero.src}
              alt={project.hero.alt}
              width={project.hero.width}
              height={project.hero.height}
              sizes="100vw"
              priority
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div
          aria-hidden="true"
          className="hero-veil absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,28,22,.78)_0%,rgba(11,28,22,.3)_40%,rgba(11,28,22,.94)_100%)]"
        />

        <div className="shell pb-14 pt-36">
          <nav aria-label="Breadcrumb" className="hero-fade">
            <ol className="meta flex items-center gap-2 text-ivory/55">
              <li>
                <Link href="/" className="transition-colors hover:text-champagne">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/projects"
                  className="transition-colors hover:text-champagne"
                >
                  Projects
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-champagne">
                {project.title}
              </li>
            </ol>
          </nav>

          <div className="grid-12 mt-7 items-end gap-y-8">
            <div className="col-span-12 lg:col-span-9">
              <h1
                className="font-display text-display-md font-light leading-[0.96] text-ivory-soft sm:text-display-lg"
              >
                <span className="block overflow-hidden">
                  <span
                    className="hero-line block"
                    style={{ animationDelay: "280ms" }}
                  >
                    {nonBreakingHyphens(project.title)}
                  </span>
                </span>
              </h1>
            </div>
            <div className="col-span-12 lg:col-span-3 lg:col-start-10">
              <div
                className="hero-fade border-l border-champagne/40 pl-6"
                style={{ animationDelay: "520ms" }}
              >
                <p className="meta text-champagne">
                  {project.category}
                </p>
                {project.location && (
                  <p className="mt-2 text-sm text-ivory/70">{project.location}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro + facts */}
      <section className="relative bg-ivory-soft py-[clamp(3.5rem,7vw,7rem)]">
        <SheetGrid />
        <div className="shell relative">
          <div className="grid-12 gap-y-10">
            <div className="col-span-12 lg:col-span-7">
              <Reveal>
                <SheetMarker
                  number="01"
                  label="The project"
                  note={project.category}
                  className="mb-9"
                />
                <p className="max-w-2xl font-display text-2xl leading-snug text-ink sm:text-3xl">
                  {project.note}
                </p>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted">
                  The original site publishes this project by name and
                  photography only — no description, area, budget, materials or
                  completion date have been released, so none are stated here.
                </p>
              </Reveal>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:col-start-9">
              <Reveal delay={120}>
                <dl className="border-t border-line">
                  {[
                    { label: "Project", value: project.title },
                    { label: "Category", value: project.category },
                    ...(project.location
                      ? [{ label: "Location", value: project.location }]
                      : []),
                    { label: "Studio", value: "ANJ Designs by Decor Inn" },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-baseline justify-between gap-6 border-b border-line py-4"
                    >
                      <dt className="meta text-sage">
                        {row.label}
                      </dt>
                      <dd className="text-right text-sm text-ink">{row.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="relative bg-ivory-soft pb-[clamp(3.5rem,7vw,7rem)]">
        <div className="shell">
          <Reveal>
            <div className="mb-8 flex items-center justify-between border-b border-line pb-4">
              <h2 className="meta text-ink">02 — Gallery</h2>
              <p className="meta text-sage">
                Select an image to enlarge
              </p>
            </div>
          </Reveal>
          <ProjectGallery images={project.gallery} />
        </div>
      </section>

      {/* Previous / next */}
      <section className="relative bg-ivory py-[clamp(3rem,6vw,6rem)]">
        <div className="shell">
          <nav aria-label="Project navigation" className="grid gap-px bg-line sm:grid-cols-2">
            {previous && (
              <Link
                href={`/projects/${previous.slug}`}
                className="group flex items-center gap-5 bg-ivory p-8 transition-colors duration-500 hover:bg-ivory-soft lg:p-10"
              >
                <ArrowLeft
                  className="h-4 w-4 shrink-0 text-sage transition-transform duration-500 group-hover:-translate-x-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span>
                  <span className="meta block text-sage">
                    Previous project
                  </span>
                  <span className="mt-1.5 block font-display text-2xl text-ink transition-colors duration-500 group-hover:text-forest-secondary">
                    {previous.title}
                  </span>
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex items-center justify-end gap-5 bg-ivory p-8 text-right transition-colors duration-500 hover:bg-ivory-soft lg:p-10"
              >
                <span>
                  <span className="meta block text-sage">
                    Next project
                  </span>
                  <span className="mt-1.5 block font-display text-2xl text-ink transition-colors duration-500 group-hover:text-forest-secondary">
                    {next.title}
                  </span>
                </span>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-sage transition-transform duration-500 group-hover:translate-x-1"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            )}
          </nav>
        </div>
      </section>

      {/* Related */}
      <section className="relative bg-ivory-soft py-[clamp(3.5rem,7vw,7rem)]">
        <div className="shell">
          <Reveal>
            <h2 className="border-b border-line pb-4 meta text-ink">
              03 — Related projects
            </h2>
          </Reveal>

          <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {related.map((item, index) => (
              <Reveal key={item.slug} delay={index * 90} as="li">
                <Link href={`/projects/${item.slug}`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ivory-deep">
                    <Media
                      src={item.hero.src}
                      alt={item.hero.alt}
                      width={item.hero.width}
                      height={item.hero.height}
                      sizes="(max-width: 640px) 100vw, 33vw"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.06]"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-xl text-ink transition-colors duration-500 group-hover:text-forest-secondary">
                    {item.title}
                  </h3>
                  <p className="meta mt-1 text-sage">
                    {item.location ?? item.category}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120} className="mt-14">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 border-b border-forest/25 pb-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-forest transition-colors duration-500 hover:border-forest"
            >
              Start a project like this
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
