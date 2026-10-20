import Image from "next/image";

import { variantSrcSet } from "@/lib/image-loader";
import { cn } from "@/lib/utils";

export interface MediaProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Always set explicitly so the browser can pick the right candidate. */
  sizes: string;
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  position?: string;
  unoptimized?: boolean;
  /**
   * Art-directed 3:4 crop used on small screens. The crop is taken from the
   * same original photograph, so the mobile hero matches the portrait frame
   * exactly — no heavy upscale, and one file instead of two.
   */
  portraitSrc?: string;
  portraitWidth?: number;
  portraitHeight?: number;
}

/**
 * The single image component used across the site.
 *
 * Delivery is handled by the custom loader in `src/lib/image-loader.ts`:
 * responsive variants are generated at build time and served as static,
 * immutable files, so no image processing happens on the request path. If a
 * Cloudinary account is configured the loader delivers through the Cloudinary
 * CDN instead — never both at once.
 */
export default function Media({
  src,
  alt,
  width,
  height,
  sizes,
  priority = false,
  className,
  imageClassName,
  position,
  unoptimized,
  portraitSrc,
  portraitWidth,
  portraitHeight,
}: MediaProps) {
  const hasPortrait = Boolean(portraitSrc);
  const portrait = portraitSrc as string;

  return (
    <>
      {/*
        When an art-directed crop is used, Next's own preload would point at
        the landscape candidate — the wrong file on a phone. These two
        media-scoped preloads match the two <picture> candidates exactly, so
        the browser downloads one file and never the other.
      */}
      {priority && hasPortrait && (
        <>
          <link
            rel="preload"
            as="image"
            href={src}
            imageSrcSet={variantSrcSet(src)}
            imageSizes={sizes}
            media="(min-width: 768px)"
          />
          <link
            rel="preload"
            as="image"
            href={portrait}
            imageSrcSet={variantSrcSet(portrait)}
            imageSizes={sizes}
            media="(max-width: 767px)"
          />
        </>
      )}

      <picture className="contents">
        {hasPortrait && (
          <source
            media="(max-width: 767px)"
            srcSet={variantSrcSet(portrait)}
            sizes={sizes}
            width={portraitWidth}
            height={portraitHeight}
          />
        )}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          priority={priority && !hasPortrait}
          loading={hasPortrait && priority ? "eager" : undefined}
          fetchPriority={priority ? "high" : "low"}
          unoptimized={unoptimized}
          style={position ? { objectPosition: position } : undefined}
          className={cn(imageClassName, className)}
        />
      </picture>
    </>
  );
}
