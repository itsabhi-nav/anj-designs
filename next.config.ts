import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  /**
   * There is an unrelated lockfile above this directory, so Next.js would
   * otherwise infer the wrong workspace root.
   */
  outputFileTracingRoot: path.join(__dirname),

  images: {
    /**
     * One primary optimisation strategy: responsive variants are generated at
     * build time and served as static, immutable files (see
     * scripts/generate-image-variants.mjs). Nothing is resized on the
     * request path.
     *
     * If a Cloudinary account is configured, the loader in
     * src/lib/image-loader.ts switches delivery to the Cloudinary CDN — the
     * two paths are mutually exclusive, images are never transformed twice.
     */
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    // The smallest bucket matches the smallest generated variant, so every
    // URL in a srcset is an honest description of the file it points at.
    deviceSizes: [320, 420, 480, 640, 768, 1024, 1280, 1600, 1920, 2560],
    imageSizes: [320, 420, 480, 640],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },

  /**
   * Preserve existing search visibility: the original WordPress URLs are
   * permanently redirected onto their new equivalents.
   */
  async redirects() {
    return [
      { source: "/anjproject", destination: "/projects", permanent: true },
      { source: "/anjproject/", destination: "/projects", permanent: true },
      { source: "/about-us", destination: "/about", permanent: true },
      { source: "/about-us/", destination: "/about", permanent: true },
      { source: "/about-us-old", destination: "/about", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/contact-us/", destination: "/contact", permanent: true },
      { source: "/lead-from", destination: "/contact", permanent: true },
      // The old portfolio demo pages were theme placeholders, not real
      // projects — they are redirected to the real portfolio index.
      { source: "/portfolio/:slug", destination: "/projects", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.(woff2|woff|ttf|otf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
