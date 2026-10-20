import type { Metadata } from "next";

import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import Hero from "@/components/home/Hero";
import BrandStatement from "@/components/home/BrandStatement";
import WhatWeDo from "@/components/home/WhatWeDo";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import ServicesShowcase from "@/components/home/ServicesShowcase";
import Values from "@/components/home/Values";
import Craftsmanship from "@/components/home/Craftsmanship";
import Approach from "@/components/home/Approach";
import Founder from "@/components/home/Founder";
import ClosingCta from "@/components/home/ClosingCta";

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
      <BrandStatement />
      <WhatWeDo />
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
