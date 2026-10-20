export interface ServiceDetail {
  id: string;
  index: string;
  title: string;
  /** Verbatim strapline from the original site where one exists. */
  strapline: string;
  body: string;
  /** Capability bullets — only claims supported by the original content. */
  capabilities: string[];
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    position?: string;
  };
  /** Secondary image for the two-image compositions. */
  secondaryImage?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  cta: { label: string; href: string };
  /** Layout variant so the page never repeats a card grid. */
  layout: "split" | "stagger" | "panel" | "grid";
}

export interface CraftRange {
  id: string;
  title: string;
  /** Item list published in the company's portfolio PDFs. */
  items: string[];
  images: string[];
}
