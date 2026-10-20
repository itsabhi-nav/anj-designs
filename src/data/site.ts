/**
 * Global site configuration.
 *
 * Every value here is taken from the original ANJ Designs website
 * (https://anjdesigns.in/) or the company's own official portfolio PDFs.
 * See docs/ORIGINAL-SITE-EXTRACTION.md for the provenance of each fact and for
 * the list of items still awaiting business confirmation.
 */

export const site = {
  name: "ANJ Designs",
  fullName: "ANJ Designs by Decor Inn",
  legalName: "Decor Inn",
  tagline: "Where Designs Become Reality",
  belief: "Built on Belief ~ Powered by Purpose",
  positioning: "Driven by Vision. Rooted in Purpose.",
  scopeLine: "We provides a full range of interior design, architectural design.",
  description:
    "ANJ Designs by Decor Inn — interior design, architectural design, bespoke furniture design and manufacturing, and turnkey interior projects from New Delhi.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://anjdesigns.in",
  locale: "en_IN",
  founded: "2010",
  city: "New Delhi",
  country: "India",
} as const;

export const contact = {
  emails: {
    primary: "decorinndesigns@gmail.com",
    annie: "annie@anjdesigns.in",
    kabir: "kabir@anjdesigns.in",
    info: "info@anjdesigns.in",
  },
  phones: [
    { label: "+91 92311 00003", href: "tel:+919231100003" },
    { label: "+91 99589 61111", href: "tel:+919958961111" },
  ],
  address: {
    line1: "Plot No. 400–401, 2nd Floor",
    line2: "100 Foot Road, Ghitorni",
    city: "New Delhi",
    region: "Delhi",
    postcode: "110030",
    country: "India",
    // The original site renders this address as "Kalu Ram Market 100 foot Road".
    note: "Situated at Kalu Ram Market, 100 Foot Road",
  },
  /** Additional addresses published in the company's official portfolio PDFs. */
  additionalLocations: [
    {
      label: "Corporate Office",
      value: "D-3/12, 1st Floor, Vasant Vihar, Opp. Sriram School, New Delhi",
    },
    {
      label: "Production Unit",
      value: "Plot No. 311, Industrial Area, Phase 2, Panchkula, Chandigarh",
    },
  ],
  mapQuery: "Plot No 400-401, 100 Foot Road, Ghitorni, New Delhi 110030",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=Plot%20No%20400-401%2C%20100%20Foot%20Road%2C%20Ghitorni%2C%20New%20Delhi%20110030",
} as const;

export const social = [
  { label: "Facebook", href: "https://www.facebook.com/anjdesigns.in" },
  { label: "Instagram", href: "https://www.instagram.com/anjdesigns.in" },
  { label: "YouTube", href: "https://www.youtube.com/@ANJDesigns-s4r" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/anj-designs-by-decor-inn" },
] as const;

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Expertise", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Original-URL → new-URL redirects are configured in `next.config.ts`
 * (see the `redirects()` block) so they are applied by the framework itself.
 */
export const legacyUrls = [
  { source: "/anjproject", destination: "/projects" },
  { source: "/about-us", destination: "/about" },
  { source: "/contact-us", destination: "/contact" },
  { source: "/lead-from", destination: "/contact" },
  { source: "/portfolio/:slug", destination: "/projects" },
] as const;
