import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

import { site } from "@/data/site";
import { organisationJsonLd } from "@/lib/seo";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import ScrollProgress from "@/components/motion/ScrollProgress";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
  preload: true,
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-sans",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline} | Interior Design, Bespoke Furniture & Turnkey Projects`,
    template: `%s | ${site.name} by Decor Inn`,
  },
  description: site.description,
  applicationName: site.fullName,
  authors: [{ name: site.fullName }],
  creator: site.fullName,
  publisher: site.fullName,
  keywords: [
    "ANJ Designs",
    "Decor Inn",
    "interior design Delhi",
    "interior designer Gurugram",
    "bespoke furniture",
    "furniture manufacturing Panchkula",
    "turnkey interior design",
    "architectural design",
    "custom wardrobes",
    "wall panels",
  ],
  alternates: { canonical: site.url },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.fullName,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/assets/brand/anj-header-master.jpg",
        width: 1530,
        height: 180,
        alt: site.fullName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/assets/brand/anj-header-master.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [{ url: "/assets/brand/anj-favicon.png", type: "image/png" }],
    apple: [{ url: "/assets/brand/anj-favicon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#102820",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-ivory-soft">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd()) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:text-ivory-soft"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <ScrollProgress />
      </body>
    </html>
  );
}
