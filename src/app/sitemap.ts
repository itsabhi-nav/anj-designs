import type { MetadataRoute } from "next";

import { site } from "@/data/site";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${site.url}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
