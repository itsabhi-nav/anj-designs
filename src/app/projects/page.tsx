import type { Metadata } from "next";

import { projects } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import ProjectIndex from "@/components/projects/ProjectIndex";
import ClosingCta from "@/components/home/ClosingCta";

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

      <section className="relative bg-ivory-soft py-[clamp(3.5rem,7vw,7rem)]">
        <div className="shell">
          <ProjectIndex projects={projects} />
        </div>
      </section>

      <ClosingCta />
    </>
  );
}
