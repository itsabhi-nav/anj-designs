import type { CraftRange, ServiceDetail } from "@/types/service";

/**
 * Services, exactly as described on the original /services/ page.
 * Architectural design is included because the original site states
 * "We provides a full range of interior design, architectural design." on every
 * page — but its scope is unconfirmed, so the wording stays neutral and no
 * specific deliverables are promised.
 */

export const services: ServiceDetail[] = [
  {
    id: "interior-design",
    index: "01",
    title: "Interior Design",
    strapline: "Where style meets comfort",
    body: "Great interiors do more than fill a room—they shape the way you live, work, and feel. Our interior design service is all about creating spaces that inspire comfort, creativity, and connection. From selecting the perfect layout and materials to curating colors, textures, and lighting, we design environments that reflect your personality and purpose. Whether it's a serene home, a vibrant office, or a stylish commercial space, every detail is thoughtfully planned to bring harmony and character to your surroundings.",
    capabilities: [
      "Spatial planning and layout",
      "Material selection",
      "Colour and texture curation",
      "Lighting design",
      "Furniture coordination",
      "Residential and commercial interiors",
    ],
    image: {
      src: "/assets/craft/design-gallery/design-concept-portfolio-03.webp",
      alt: "Contemporary bedroom interior designed by ANJ Designs",
      width: 914,
      height: 875,
    },
    secondaryImage: {
      src: "/assets/craft/formal-living/formal-living-decorinn-01.webp",
      alt: "Formal living room with layered lighting and soft furnishings",
      width: 1469,
      height: 1064,
    },
    cta: { label: "Start an interior project", href: "/contact" },
    layout: "split",
  },
  {
    id: "furniture-design",
    index: "02",
    title: "Bespoke Furniture Design",
    strapline: "Artistery in every Detail",
    body: "Every space deserves furniture that feels as personal as it looks. Our furniture design service focuses on creating signature pieces that add character and elegance to your interiors. From modern wall panels and artistic accents to custom-built home essentials, each product is crafted with precision in our Panchkula facility. Skilled artisans bring innovative designs to life using premium materials, ensuring that every item is both beautiful and built to last.",
    capabilities: [
      "Bespoke beds, side tables and study tables",
      "Media units, dressers and wardrobes",
      "Signature wall panels",
      "Consoles, sideboards and accent pieces",
      "Dining tables, chairs and serving trolleys",
      "Over 50 polishes and finishes",
    ],
    image: {
      src: "/assets/craft/bespoke-bed/bespoke-bed-portfolio-01.webp",
      alt: "Bespoke upholstered bed manufactured by Decor Inn, Panchkula",
      width: 1600,
      height: 1008,
      position: "50% 45%",
    },
    secondaryImage: {
      src: "/assets/craft/wall-panels/wall-panel-decorinn-01.webp",
      alt: "Hand-finished decorative wall panel",
      width: 1090,
      height: 655,
    },
    cta: { label: "Commission a furniture piece", href: "/contact" },
    layout: "stagger",
  },
  {
    id: "turnkey-interior-design",
    index: "03",
    title: "Turnkey Interior Design",
    strapline: "Inspired living tailored for You",
    body: "Founded in 2010 by Annie Nagpal Jain, Decor Inn began with a vision to craft interiors that blend beauty with purpose. Over the years, it has grown into a trusted name for delivering complete décor and space solutions that bring elegance and functionality together. With an in-house production facility in Panchkula, Haryana, our team of skilled professionals designs and manufactures everything from custom wall panels to statement furniture and art pieces—each created with quality materials and a passion for innovation.",
    capabilities: [
      "Complete space and décor management",
      "In-house production at Panchkula, Haryana",
      "Concept through to finished installation",
      "Custom wall panels, furniture and art pieces",
      "Planning, execution and finish",
    ],
    image: {
      src: "/assets/services/anjservices-3.webp",
      alt: "Turnkey interior solution by ANJ Designs by Decor Inn",
      width: 417,
      height: 421,
    },
    secondaryImage: {
      src: "/assets/home/aboutus-anj.webp",
      alt: "Turnkey interior project executed by ANJ Designs",
      width: 1530,
      height: 1095,
    },
    cta: { label: "Discuss a turnkey project", href: "/contact" },
    layout: "panel",
  },
  {
    id: "architectural-design",
    index: "04",
    title: "Architectural Design",
    strapline: "Design with depth",
    body: "ANJ Designs provides a full range of interior and architectural design services. Our work spans residential and commercial properties, houses, restaurants, cafés, schools, banks, hotels and offices — each led by a qualified interior designer with a specialisation in furniture design and a mastery of complete design aesthetics.",
    capabilities: [
      "Interior and architectural design services",
      "Residential and commercial properties",
      "Homes, restaurants, cafés and schools",
      "Banks, hotels and offices",
      "Vastu-informed design guidance",
    ],
    image: {
      src: "/assets/about/group-47814.png",
      alt: "Architectural interior corridor designed by ANJ Designs",
      width: 1466,
      height: 673,
    },
    cta: { label: "Talk to our design team", href: "/contact" },
    layout: "grid",
  },
];

/**
 * Furniture ranges, item lists published in the company's own portfolio PDFs
 * (Decor Inn Gallery 3 / Portfolio 2). Categories follow the source headings.
 */
export const craftRanges: CraftRange[] = [
  {
    id: "bedroom",
    title: "Bedroom",
    items: [
      "Beds",
      "Side tables",
      "Study tables",
      "Media unit",
      "Dressing table",
      "Chest of drawers",
      "Wardrobes",
    ],
    images: [
      "/assets/craft/bedroom-range/bedroom-decorinn-01.webp",
      "/assets/craft/bespoke-bed/bespoke-bed-portfolio-01.webp",
      "/assets/craft/bedroom-range/bedroom-decorinn-03.webp",
      "/assets/craft/bespoke-bed/bespoke-bed-decor-01.webp",
    ],
  },
  {
    id: "entrance-foyers",
    title: "Entrance Foyers",
    items: [
      "Sideboards",
      "Consoles",
      "Accent chairs",
      "Frame mirrors",
      "Accent pieces",
      "Bar units",
    ],
    images: [
      "/assets/craft/entrance-foyers/entrance-foyer-decorinn-01.webp",
      "/assets/craft/entrance-foyers/entrance-foyer-decorinn-03.webp",
      "/assets/craft/bar-units/bar-unit-decor-01.webp",
      "/assets/craft/entrance-foyers/entrance-foyer-decorinn-05.webp",
    ],
  },
  {
    id: "dining",
    title: "Dining Room",
    items: [
      "Dining table and chairs",
      "Serving trolleys",
      "Consoles",
      "Crockery cabinets",
    ],
    images: [
      "/assets/craft/dining/dining-portfolio-01.webp",
      "/assets/craft/dining-range/dining-decorinn-01.webp",
      "/assets/craft/dining/dining-set-decor-01.webp",
      "/assets/craft/dining/dining-portfolio-05.webp",
    ],
  },
  {
    id: "formal-living",
    title: "Formal Living Room",
    items: [
      "Formal sofa set",
      "Centre table",
      "End / side table",
      "Accent chair",
      "Corner pedestals",
      "Bar unit",
    ],
    images: [
      "/assets/craft/formal-living/formal-living-decorinn-01.webp",
      "/assets/craft/informal-living/informal-living-decorinn-01.webp",
      "/assets/craft/design-gallery/design-concept-portfolio-01.webp",
      "/assets/craft/design-gallery/design-concept-portfolio-03.webp",
    ],
  },
  {
    id: "informal-living",
    title: "Informal Living Space",
    items: [
      "Couches",
      "Coffee table",
      "End tables",
      "Media unit",
      "Corner units",
      "Lounge chairs",
    ],
    images: [
      "/assets/craft/media-consoles/media-console-decor-01.webp",
      "/assets/craft/dressers/dresser-decor-01.webp",
      "/assets/craft/study-tables/study-table-decor-01.webp",
      "/assets/craft/design-gallery/design-concept-portfolio-05.webp",
    ],
  },
  {
    id: "wall-panels",
    title: "Wall Panels",
    items: [
      "Upholstery",
      "POP",
      "Hardwood section clad panels",
      "POP in HDMR",
    ],
    images: [
      "/assets/craft/wall-panels/wall-panel-decorinn-01.webp",
      "/assets/craft/wall-panels/wall-panel-decorinn-02.webp",
      "/assets/craft/handcrafted-work/handcrafted-decor-01.webp",
      "/assets/craft/handcrafted-work/handcrafted-decor-02.webp",
    ],
  },
];

/** Finishes list published on page 18 of the official "Decor Inn Gallery 3" PDF. */
export const finishes = [
  "Stain finish",
  "Classical polish finishes in PO, melanine",
  "PU marble finish",
  "Sponge finish",
  "Full / half / none grain finish",
  "Water finish",
  "Laminate finish",
  "Distressed in colour",
  "Distressed in stain",
  "PU finish",
  "Visible / invisible veins finish",
  "Chalk finish (white or any colour)",
  "Deco / in colours",
  "Natural sealants finish",
  "Lacquer finish",
  "Buffed finishes",
  "Mirror finish",
  "Metallic finish",
  "Metallic with grains",
];

/** Styles published on page 5 of the official "Decor Inn Gallery 3" PDF. */
export const styles = [
  "Contemporary",
  "Neo Classical",
  "Classical",
  "Fusion",
  "Eclectic",
  "Rustic",
  "Vintage",
  "Moroccan",
];

/** Manufacturing facts published in the company's own portfolio PDFs. */
export const manufacturing = {
  unitSize: "22,500 sq ft manufacturing unit",
  projectVolume: "100+ projects in the last two years alone",
  capacity: "Production capacity of 8–10 full-sized bedrooms in 30 days",
  finish: "Machine manufacturing and expertly handcrafted finishes",
  location: "Panchkula, Haryana",
  process: ["Planning", "Execution", "Finish"],
} as const;
