export type ProjectCategory =
  | "Residential"
  | "Commercial"
  | "Room Interiors"
  | "International";

export interface ProjectImage {
  /** Path under /public */
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Art-directed focal point for object-position. */
  position?: string;
}

export interface Project {
  slug: string;
  /** Verbatim project name from the original site. */
  title: string;
  /** Verbatim location, where the site states one. Optional — never faked. */
  location?: string;
  category: ProjectCategory;
  /** Short editorial descriptor — never a factual claim about the project. */
  note: string;
  hero: ProjectImage;
  gallery: ProjectImage[];
  /** Display order on the index + next/previous navigation. */
  order: number;
  featured: boolean;
}
