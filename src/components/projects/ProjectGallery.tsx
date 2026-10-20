"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import dynamic from "next/dynamic";

import type { ProjectImage } from "@/types/project";
import { cn } from "@/lib/utils";

/**
 * Project gallery.
 *
 * A responsive, art-directed grid. Clicking (or pressing Enter on) an image
 * opens the lightbox, which is code-split so its weight never lands in the
 * initial bundle.
 */
const Lightbox = dynamic(() => import("./Lightbox"), {
  ssr: false,
  loading: () => null,
});

export default function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setLightboxIndex(index), []);
  const close = useCallback(() => setLightboxIndex(null), []);

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
        {images.map((image, index) => (
          <li
            key={image.src}
            className={cn(
              "group",
              index === 0
                ? "sm:col-span-2 lg:col-span-12"
                : index % 3 === 0
                  ? "lg:col-span-7"
                  : "lg:col-span-5"
            )}
          >
            <button
              type="button"
              onClick={() => open(index)}
              aria-label={`Open image ${index + 1} of ${images.length} in full screen`}
              className="relative block w-full overflow-hidden bg-ivory-deep focus-visible:outline-none"
            >
              <span
                className={cn(
                  "block",
                  index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes={
                    index === 0
                      ? "100vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
                  }
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.05]"
                />
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-500 group-hover:border-ivory/40"
              />
            </button>
          </li>
        ))}
      </ul>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onClose={close}
          onIndexChange={setLightboxIndex}
        />
      )}
    </>
  );
}
