/**
 * Media delivery.
 *
 * The site uses ONE image strategy at a time:
 *
 *  1. Default — responsive variants are generated at build time
 *     (`scripts/generate-image-variants.mjs`) and served as static, immutable
 *     files through the custom loader in `src/lib/image-loader.ts`. Nothing is
 *     resized on the request path.
 *
 *  2. Optional — if `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is set, every asset is
 *     delivered through the Cloudinary CDN using the `anjdesigns/` public-id
 *     prefix and automatic format/quality selection.
 *
 * Images are never transformed twice: the loader switches between the two
 * paths, it never combines them.
 */

export const cloudinaryCloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";
export const cloudinaryEnabled = cloudinaryCloud.length > 0;

export interface MediaSource {
  /** Local path under /public, e.g. "/assets/projects/apartment/01.webp" */
  src: string;
  width: number;
  height: number;
  alt: string;
  position?: string;
  /** Rendered at higher weight for the LCP element. */
  priority?: boolean;
  /** Responsive `sizes` attribute — always set explicitly. */
  sizes?: string;
  className?: string;
  quality?: number;
}

/**
 * Maps a local asset path onto its Cloudinary public id.
 * "/assets/projects/apartment/01.webp" -> "anjdesigns/projects/apartment/01"
 */
export function toCloudinaryPublicId(src: string): string {
  const cleaned = src.replace(/^\/+/, "").replace(/^assets\//, "");
  return `anjdesigns/${cleaned.replace(/\.[a-z0-9]+$/i, "")}`;
}

/** Builds a transformed Cloudinary delivery URL. */
export function cloudinaryUrl(
  src: string,
  { width, quality }: { width?: number; quality?: number } = {}
): string {
  const publicId = toCloudinaryPublicId(src);
  const transforms: string[] = ["f_auto", `q_${quality ?? "auto"}`];
  if (width) transforms.push(`w_${width}`);
  return `https://res.cloudinary.com/${cloudinaryCloud}/image/upload/${transforms.join(",")}/${publicId}`;
}
