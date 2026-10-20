import type { Metadata } from "next";
import { site } from "@/data/site";

const OG_IMAGE = site.ogImage.path;

export function pageMetadata({
  title,
  description,
  path = "/",
  images,
  noIndex = false,
}: {
  title: string;
  description: string;
  path?: string;
  images?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = `${site.url}${path === "/" ? "" : path}`;
  const ogImages = (images?.length ? images : [OG_IMAGE]).map((image) => ({
    url: image.startsWith("http") ? image : `${site.url}${image}`,
    width: site.ogImage.width,
    height: site.ogImage.height,
    alt: site.ogImage.alt,
  }));

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: site.locale,
      url,
      siteName: site.fullName,
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((image) => image.url),
    },
    robots: noIndex ? { index: false, follow: false } : undefined,
  };
}

export function organisationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.fullName,
    alternateName: site.name,
    description: site.description,
    url: site.url,
    image: `${site.url}${OG_IMAGE}`,
    telephone: ["+919231100003", "+919958961111"],
    logo: `${site.url}/assets/brand/anj-favicon.png`,
    email: contact_emails(),
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot No. 400–401, 2nd Floor, 100 Foot Road, Ghitorni",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110030",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.facebook.com/anjdesigns.in",
      "https://www.instagram.com/anjdesigns.in",
      "https://www.youtube.com/@ANJDesigns-s4r",
    ],
  };
}

function contact_emails(): string[] {
  return [
    "decorinndesigns@gmail.com",
    "annie@anjdesigns.in",
    "kabir@anjdesigns.in",
    "info@anjdesigns.in",
  ];
}
