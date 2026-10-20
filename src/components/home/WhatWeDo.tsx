import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Media from "@/components/ui/Media";
import Reveal from "@/components/motion/Reveal";

/**
 * “What We Do” — the original site's DESIGN / BUILD / FURNITURE triad,
 * presented as a dark, ruled three-column band rather than a card row.
 */
const PILLARS = [
  {
    index: "01",
    title: "Design",
    copy: "Spatial planning, material and colour curation, lighting, and furniture coordination for residential and commercial interiors.",
    image: "/assets/craft/design-gallery/design-concept-portfolio-03.webp",
    alt: "Interior designed and executed by ANJ Designs by Decor Inn",
    width: 914,
    height: 875,
  },
  {
    index: "02",
    title: "Build",
    copy: "Turnkey delivery — from research and concept through implementation, handled end to end by our own team.",
    image: "/assets/craft/bedroom-range/bedroom-decorinn-03.webp",
    alt: "Bespoke furniture manufactured in the Decor Inn production unit",
    width: 1048,
    height: 667,
  },
  {
    index: "03",
    title: "Furniture",
    copy: "Beds, wardrobes, study and dining tables, media units, wall panels and accent pieces — made in Panchkula.",
    image: "/assets/craft/bespoke-bed/bespoke-bed-portfolio-02.webp",
    alt: "Bespoke bed and side table by Decor Inn",
    width: 1192,
    height: 656,
  },
];

export default function WhatWeDo() {
  return (
    <section className="relative overflow-hidden bg-forest py-[clamp(4rem,9vw,9rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-secondary/20 blur-3xl"
      />
      <div className="shell relative">
        <Reveal>
          <p className="eyebrow eyebrow-light">~ What we do ~</p>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden border border-ivory/12 bg-ivory/12 md:grid-cols-3">
          {PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 90} className="group relative bg-forest">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Media
                  src={pillar.image}
                  alt={pillar.alt}
                  width={pillar.width}
                  height={pillar.height}
                  sizes="(max-width: 768px) 100vw, 34vw"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,28,22,.25)_0%,rgba(11,28,22,.85)_100%)]"
                />
                <span className="absolute left-6 top-6 font-display text-sm tracking-[0.2em] text-champagne">
                  {pillar.index}
                </span>
              </div>

              <div className="relative p-7 lg:p-9">
                <h3 className="font-display text-4xl font-light uppercase tracking-[0.02em] text-ivory-soft">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory/60">
                  {pillar.copy}
                </p>
                <Link
                  href="/services"
                  className="mt-7 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-champagne transition-colors duration-500 hover:text-ivory-soft"
                >
                  Explore
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
