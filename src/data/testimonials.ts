export interface Testimonial {
  quote: string;
  name: string;
  location?: string;
  role?: string;
  /**
   * `verified` — published by the company with a full name, location and
   * professional attribution (taken from the official portfolio PDFs).
   * `unverified` — published on the current website with a name only.
   */
  verified: boolean;
  source: "portfolio-pdf" | "website";
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "The furniture that Decor Inn made for my house is ideal. Their furniture is aesthetically pleasing, long-lasting, and of high quality. Their in-depth knowledge, superior skill, and impeccable service is definitely a game changer. I look forward to working with them more.",
    name: "Mohit Kakkar",
    location: "DLF Phase 1, Gurgaon",
    role: "CEO, Vikas Forgings, Faridabad",
    verified: true,
    source: "portfolio-pdf",
  },
  {
    quote:
      "A big thank you to the Decor Inn team for making the process of converting our house into our ideal home so enjoyable and effortless. They accommodate your wants and support you while you go through the renovation process for your house. Great company with a committed and enthusiastic team. I heartily endorse Decor Inn at all.",
    name: "Dr. Namrata Sethi",
    location: "Sector 35, Chandigarh",
    role: "Nutritionist & Dietician, The House of Diets; Prof., Home Science, Govt College, Chandigarh",
    verified: true,
    source: "portfolio-pdf",
  },
  {
    quote:
      "We needed a capable yet affordable furniture manufacturer while shifting homes for the first time in two decades. Decor Inn produced furniture of the most exquisite quality within the stipulated time frame and budget. Through their services we could keep up with our shifting schedule and are happy to have placed our total confidence in them.",
    name: "Col (Retd) H N Handa",
    location: "Laburnum, Sushant Lok 1, Gurgaon",
    verified: true,
    source: "portfolio-pdf",
  },
  {
    quote:
      "ANJ Designer Interior completely transformed our living space! Their creativity and attention to detail are unmatched.",
    name: "Radhika Sharma",
    verified: false,
    source: "website",
  },
  {
    quote:
      "From concept to execution, the team was professional, responsive, and truly understood our vision.",
    name: "Rajeev Madaam",
    verified: false,
    source: "website",
  },
  {
    quote:
      "Stylish, functional, and perfectly on budget — ANJ exceeded all our expectations.",
    name: "Pooja Sharma",
    verified: false,
    source: "website",
  },
];

export const verifiedTestimonials = testimonials.filter((t) => t.verified);
