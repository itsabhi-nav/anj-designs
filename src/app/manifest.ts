import type { MetadataRoute } from "next";

import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.fullName} — ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#102820",
    theme_color: "#102820",
    lang: "en-IN",
    categories: ["business", "lifestyle", "design"],
    icons: [
      {
        src: "/assets/brand/anj-favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/assets/brand/anj-favicon-cropped.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
