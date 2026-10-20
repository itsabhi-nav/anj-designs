import Image from "next/image";

import { variantUrl } from "@/lib/image-loader";
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
   * SAME original photograph, so the mobile hero matches the portrait frame
   * exactly — no heavy upscale, and roughly a third of the bytes.
   */
  portraitSrc?: string;
  portraitWidth?: number;
  portraitHeight?: number;
  /** Viewport width (px) below which the portrait crop is used. */
  portraitBreakpoint?: number;
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
  portraitBreakpoint = 768,
}: MediaProps) {
  if (portraitSrc) {
    // The two preloads below match the two <picture> candidates exactly, so
    // the browser never downloads a file it is not going to use.
    return (
      <>
        <link
          rel="preload"
          as="image"
          href={portraitSrc}
          media={`(max-width: ${portraitBreakpoint - 1}px)`}
        />
        <link
          rel="preload"
          as="image"
          href={variantUrl(src, 1600)}
          media={`(min-width: ${portraitBreakpoint}px)`}
        />
        <picture className="contents">
          <source
            media={`(max-width: ${portraitBreakpoint - 1}px)`}
            srcSet={portraitSrc}
            width={portraitWidth}
            height={portraitHeight}
          />
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes={sizes}
            priority={false}
            fetchPriority="low"
            unoptimized={unoptimized}
            style={position ? { objectPosition: position } : undefined}
            className={cn(imageClassName, className)}
          />
        </picture>
      </>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      priority={priority}
      // Anything that is not the LCP candidate is fetched at low priority so
      // it never competes with the hero.
      fetchPriority={priority ? "high" : "low"}
      unoptimized={unoptimized}
      style={position ? { objectPosition: position } : undefined}
      className={cn(imageClassName, className)}
    />
  );
}
