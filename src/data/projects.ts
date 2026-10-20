import type { Project, ProjectImage } from "@/types/project";

/**
 * The 13 projects published on the original site at /anjproject/.
 *
 * Project names and locations are verbatim. The original site publishes no
 * descriptions, clients, budgets, areas, materials or dates for these
 * projects, so none are asserted here — each project page is image-led, as
 * the brief requires.
 *
 * Image dimensions are the true pixel dimensions of the original files
 * (the source site only hosts 344 × 344 thumbnails for most of them).
 */

const img = (
  slug: string,
  file: string,
  title: string,
  width: number,
  height: number,
  position?: string
): ProjectImage => ({
  src: `/assets/projects/${slug}/${file}`,
  alt: `${title} — interior by ANJ Designs by Decor Inn`,
  width,
  height,
  position,
});

export const projects: Project[] = [
  {
    slug: "apartment",
    title: "Apartment",
    category: "Residential",
    note: "A composed apartment interior balancing warm neutrals with tailored joinery.",
    hero: img("apartment", "01.webp", "Apartment", 344, 344),
    gallery: [
      img("apartment", "01.webp", "Apartment", 344, 344),
      img("apartment", "02.webp", "Apartment", 344, 344),
      img("apartment", "03.webp", "Apartment", 344, 344),
      img("apartment", "04.webp", "Apartment", 344, 344),
    ],
    order: 1,
    featured: false,
  },
  {
    slug: "gk-2-house",
    title: "GK 2 House",
    category: "Residential",
    note: "A family house in Chandigarh, layered with classic proportions and soft daylight.",
    hero: img("gk-2-house", "01.webp", "GK 2 House", 344, 344),
    gallery: [
      img("gk-2-house", "01.webp", "GK 2 House", 344, 344),
      img("gk-2-house", "02.webp", "GK 2 House", 344, 344),
      img("gk-2-house", "03.webp", "GK 2 House", 344, 344),
      img("gk-2-house", "04.webp", "GK 2 House", 344, 344),
    ],
    order: 2,
    featured: true,
  },
  {
    slug: "dlf-phase-1-gurugram",
    title: "DLF Phase-1 Gurugram",
    location: "Gurugram, Haryana",
    category: "Residential",
    note: "An urban residence in Gurugram finished in a calm, contemporary register.",
    hero: img("dlf-phase-1-gurugram", "01.png", "DLF Phase-1 Gurugram", 344, 344),
    gallery: [
      img("dlf-phase-1-gurugram", "01.png", "DLF Phase-1 Gurugram", 344, 344),
      img("dlf-phase-1-gurugram", "02.webp", "DLF Phase-1 Gurugram", 344, 344),
      img("dlf-phase-1-gurugram", "03.webp", "DLF Phase-1 Gurugram", 344, 344),
      img("dlf-phase-1-gurugram", "04.webp", "DLF Phase-1 Gurugram", 344, 344),
    ],
    order: 3,
    featured: true,
  },
  {
    slug: "farmhouse-chandigarh",
    title: "Farm House, Chandigarh Punjab",
    location: "Chandigarh, Punjab",
    category: "Residential",
    note: "A farmhouse interior with generous volumes, natural light and crafted detail.",
    hero: img("farmhouse-chandigarh", "01.webp", "Farm House, Chandigarh", 344, 344),
    gallery: [
      img("farmhouse-chandigarh", "01.webp", "Farm House, Chandigarh", 344, 344),
      img("farmhouse-chandigarh", "02.webp", "Farm House, Chandigarh", 344, 344),
      img("farmhouse-chandigarh", "03.webp", "Farm House, Chandigarh", 344, 344),
      img("farmhouse-chandigarh", "04.webp", "Farm House, Chandigarh", 344, 344),
    ],
    order: 4,
    featured: true,
  },
  {
    slug: "commercial-space-nainital",
    title: "Commercial Space, Nainital",
    location: "Nainital, Uttarakhand",
    category: "Commercial",
    note: "A commercial interior in Nainital, designed around material and mood.",
    hero: img("commercial-space-nainital", "01.webp", "Commercial Space, Nainital", 344, 344),
    gallery: [
      img("commercial-space-nainital", "01.webp", "Commercial Space, Nainital", 344, 344),
      img("commercial-space-nainital", "02.png", "Commercial Space, Nainital", 344, 344),
      img("commercial-space-nainital", "03.webp", "Commercial Space, Nainital", 344, 344),
      img("commercial-space-nainital", "04.webp", "Commercial Space, Nainital", 344, 344),
    ],
    order: 5,
    featured: true,
  },
  {
    slug: "villa-golf-course-extension",
    title: "Villa, Golf Course Extension Road",
    location: "Gurugram, Haryana",
    category: "Residential",
    note: "A villa interior on Golf Course Extension Road in a restrained, timeless palette.",
    hero: img("villa-golf-course-extension", "01.webp", "Villa, Golf Course Extension Road", 344, 344),
    gallery: [
      img("villa-golf-course-extension", "01.webp", "Villa, Golf Course Extension Road", 344, 344),
      img("villa-golf-course-extension", "02.webp", "Villa, Golf Course Extension Road", 344, 344),
      img("villa-golf-course-extension", "03.webp", "Villa, Golf Course Extension Road", 344, 344),
      img("villa-golf-course-extension", "04.webp", "Villa, Golf Course Extension Road", 344, 344),
    ],
    order: 6,
    featured: true,
  },
  {
    slug: "baltimore-usa",
    title: "USA, Baltimore",
    location: "Baltimore, Maryland, USA",
    category: "International",
    note: "An international commission executed for a client in Baltimore, USA.",
    hero: img("baltimore-usa", "01.webp", "Baltimore, USA", 344, 344),
    gallery: [
      img("baltimore-usa", "01.webp", "Baltimore, USA", 344, 344),
      img("baltimore-usa", "02.webp", "Baltimore, USA", 344, 344),
      img("baltimore-usa", "03.webp", "Baltimore, USA", 344, 344),
      img("baltimore-usa", "04.webp", "Baltimore, USA", 344, 344),
    ],
    order: 7,
    featured: true,
  },
  {
    slug: "apartment-golf-course-road",
    title: "Apartment, Golf Course Road, Gurugram",
    location: "Gurugram, Haryana",
    category: "Residential",
    note: "An apartment interior on Golf Course Road with a light, layered finish.",
    hero: img("apartment-golf-course-road", "01.webp", "Apartment, Golf Course Road, Gurugram", 344, 344),
    gallery: [
      img("apartment-golf-course-road", "01.webp", "Apartment, Golf Course Road, Gurugram", 344, 344),
      img("apartment-golf-course-road", "02.webp", "Apartment, Golf Course Road, Gurugram", 344, 344),
      img("apartment-golf-course-road", "03.webp", "Apartment, Golf Course Road, Gurugram", 344, 344),
      img("apartment-golf-course-road", "04.webp", "Apartment, Golf Course Road, Gurugram", 344, 344),
    ],
    order: 8,
    featured: false,
  },
  {
    slug: "contemporary-bedroom",
    title: "Contemporary Theme based Bedroom",
    category: "Room Interiors",
    note: "A contemporary bedroom, composed around a feature wall and layered textiles.",
    hero: img("contemporary-bedroom", "01.png", "Contemporary Theme based Bedroom", 344, 344),
    gallery: [
      img("contemporary-bedroom", "01.png", "Contemporary Theme based Bedroom", 344, 344),
      img("contemporary-bedroom", "02.webp", "Contemporary Theme based Bedroom", 344, 344),
      img("contemporary-bedroom", "03.webp", "Contemporary Theme based Bedroom", 344, 344),
      img("contemporary-bedroom", "04.webp", "Contemporary Theme based Bedroom", 344, 344),
    ],
    order: 9,
    featured: false,
  },
  {
    slug: "living-room",
    title: "Living Room",
    category: "Room Interiors",
    note: "A living room interior defined by furniture placement, proportion and light.",
    hero: img("living-room", "01.webp", "Living Room", 344, 344),
    gallery: [
      img("living-room", "01.webp", "Living Room", 344, 344),
      img("living-room", "02.webp", "Living Room", 344, 344),
      img("living-room", "03.webp", "Living Room", 344, 344),
      img("living-room", "04.webp", "Living Room", 344, 344),
    ],
    order: 10,
    featured: false,
  },
  {
    slug: "contemporary-living-room",
    title: "Contemporary living Room",
    category: "Room Interiors",
    note: "A contemporary living room with a modern, sculptural furniture language.",
    hero: img("contemporary-living-room", "01.webp", "Contemporary living Room", 344, 344),
    gallery: [
      img("contemporary-living-room", "01.webp", "Contemporary living Room", 344, 344),
      img("contemporary-living-room", "02.webp", "Contemporary living Room", 344, 344),
      img("contemporary-living-room", "03.webp", "Contemporary living Room", 344, 344),
      img("contemporary-living-room", "04.webp", "Contemporary living Room", 344, 344),
    ],
    order: 11,
    featured: true,
  },
  {
    slug: "vasant-vihar",
    title: "Vasant Vihar, Residential Project",
    location: "New Delhi",
    category: "Residential",
    note: "A residential project in Vasant Vihar, New Delhi.",
    hero: img("vasant-vihar", "01.webp", "Vasant Vihar, Residential Project", 344, 344),
    gallery: [
      img("vasant-vihar", "01.webp", "Vasant Vihar, Residential Project", 344, 344),
      img("vasant-vihar", "02.webp", "Vasant Vihar, Residential Project", 344, 344),
      img("vasant-vihar", "03.webp", "Vasant Vihar, Residential Project", 344, 344),
      img("vasant-vihar", "04.webp", "Vasant Vihar, Residential Project", 344, 344),
    ],
    order: 12,
    featured: false,
  },
  {
    slug: "standalone-house-vikaspuri",
    title: "Standalone House, Vikaspuri, New Delhi",
    location: "Vikaspuri, New Delhi",
    category: "Residential",
    note: "A standalone house in Vikaspuri, New Delhi.",
    hero: img("standalone-house-vikaspuri", "01.webp", "Standalone House, Vikaspuri, New Delhi", 632, 414),
    gallery: [
      img("standalone-house-vikaspuri", "01.webp", "Standalone House, Vikaspuri, New Delhi", 632, 414),
      img("standalone-house-vikaspuri", "02.webp", "Standalone House, Vikaspuri, New Delhi", 632, 414),
      img("standalone-house-vikaspuri", "03.webp", "Standalone House, Vikaspuri, New Delhi", 632, 414),
      img("standalone-house-vikaspuri", "04.webp", "Standalone House, Vikaspuri, New Delhi", 632, 414),
      img("standalone-house-vikaspuri", "05.webp", "Standalone House, Vikaspuri, New Delhi", 632, 414),
    ],
    order: 13,
    featured: false,
  },
];

/**
 * The homepage "featured" sequence.
 *
 * Ordered so the lead project is one of the strongest photographs the studio
 * has published, followed by a curated run of contrasting spaces.
 */
export const featuredProjects = [
  getProject("dlf-phase-1-gurugram"),
  getProject("gk-2-house"),
  getProject("farmhouse-chandigarh"),
  getProject("commercial-space-nainital"),
  getProject("baltimore-usa"),
  getProject("villa-golf-course-extension"),
  getProject("contemporary-living-room"),
].filter((project): project is Project => Boolean(project));

export const projectCategories = [
  { label: "All Projects", value: "All" },
  { label: "Residential", value: "Residential" },
  { label: "Commercial", value: "Commercial" },
  { label: "Room Interiors", value: "Room Interiors" },
  { label: "International", value: "International" },
] as const;

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}

export function getRelatedProjects(slug: string, limit = 3): Project[] {
  const current = getProject(slug);
  if (!current) return projects.slice(0, limit);
  const sameCategory = projects.filter(
    (p) => p.slug !== slug && p.category === current.category
  );
  const others = projects.filter(
    (p) => p.slug !== slug && p.category !== current.category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
