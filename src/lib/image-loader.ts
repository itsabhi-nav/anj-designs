import type { ImageLoaderProps } from "next/image";

import { cloudinaryEnabled, cloudinaryUrl } from "@/lib/media";
import { variantWidths } from "@/data/image-variants";

/**
 * The public URL of a pre-generated variant.
 * Shared with the components that need to emit a matching preload link.
 */
export function variantUrl(src: string, width: number): string {
  const widths = variantWidths[src];
  if (!widths || widths.length === 0) return src;

  let chosen = 0;
  for (const candidate of widths) {
    if (candidate <= width && candidate > chosen) chosen = candidate;
  }
  if (!chosen) chosen = widths[0];

  const slug = src.replace(/^\/assets\//, "").replace(/\.[a-z0-9]+$/i, "");
  return `/assets/variants/${slug}-${chosen}.webp`;
}

/**
 * The full srcset for an asset, for use on a `<link rel="preload">` so the
 * browser can pick the right candidate instead of starting one request that
 * is later aborted.
 */
export function variantSrcSet(src: string): string {
  const widths = variantWidths[src];
  if (!widths || widths.length === 0) return "";
  const slug = src.replace(/^\/assets\//, "").replace(/\.[a-z0-9]+$/i, "");
  return widths
    .map((width) => `/assets/variants/${slug}-${width}.webp ${width}w`)
    .join(", ");
}

/**
 * Custom image loader.
 *
 * The site does not resize images on the request path. Every responsive
 * variant was generated at build time into `/public/assets/variants` (see
 * `scripts/generate-image-variants.mjs`), so this loader simply maps the
 * requested width onto the closest pre-generated file. The result is a static,
 * immutable, CDN-cacheable URL with no server-side image processing.
 *
 * If a Cloudinary account is configured, delivery switches to the Cloudinary
 * CDN instead — the two paths are never used at the same time.
 */
export default function anjImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  if (cloudinaryEnabled && src.startsWith("/assets/")) {
    return cloudinaryUrl(src, { width, quality });
  }

  if (!src.startsWith("/assets/")) return src;
  return variantUrl(src, width);
}
