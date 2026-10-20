import type { Metadata } from "next";

import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import BrandStatement from "@/components/home/BrandStatement";
import StudioIndex from "@/components/home/StudioIndex";
import BeliefBand from "@/components/home/BeliefBand";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import Values from "@/components/home/Values";
import Craftsmanship from "@/components/home/Craftsmanship";
import Approach from "@/components/home/Approach";
import Founder from "@/components/home/Founder";
import ClosingCta from "@/components/home/ClosingCta";
import Reveal from "@/components/motion/Reveal";
import { SheetGrid, SheetMarker } from "@/components/ui/Sheet";

export const metadata: Metadata = pageMetadata({
  title: `${site.name} — ${site.tagline} | Interior Design, Bespoke Furniture & Turnkey Projects`,
  description:
    "ANJ Designs by Decor Inn — interior design, architectural design, bespoke furniture design and manufacturing, and turnkey interior projects from New Delhi.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhatWeDo />
      <BrandStatement />

      {/* The studio index — the four disciplines, interactively */}
      <section
        className="relative overflow-hidden bg-ivory-soft py-[clamp(4.5rem,10vw,10rem)]"
        aria-labelledby="studio-title"
      >
        <SheetGrid />
        <div className="shell relative">
          <Reveal>
            <div className="mb-14 flex flex-col gap-8 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <SheetMarker
                  number="03"
                  label="Our disciplines"
                  note="Four practices"
                  className="mb-8"
                />
                <h2
                  id="studio-title"
                  className="max-w-2xl font-display text-display-md font-light text-ink"
                >
                  A studio that builds{" "}
                  <span className="display-italic text-forest-secondary">
                    what it draws
                  </span>
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
                Design, furniture, and the execution that connects them — held
                in one studio, in one city, by one team.
              </p>
            </div>
          </Reveal>

          <StudioIndex />
        </div>
      </section>

      <BeliefBand line="Built on Belief ~ Powered by Purpose" />

      <FeaturedProjects />

      <ServicesShowcase />

      <Values />

      <Craftsmanship />

      <Approach />

      <Founder />

      <ClosingCta />
    </>
  );
}
