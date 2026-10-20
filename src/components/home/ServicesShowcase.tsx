import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Media from "@/components/ui/Media";
import Reveal from "@/components/motion/Reveal";
import { SheetGrid, SheetMarker } from "@/components/ui/Sheet";
import { services } from "@/data/services";

/**
 * Services showcase — three deliberately different compositions so the page
 * never reads as a repeated card grid:
 *
 *  1. Interior Design   → oversized image / text split
 *  2. Furniture Design  → portrait image with an overlapping editorial panel
 *  3. Turnkey           → wide architectural image with a solid contrast panel
 */
export default function ServicesShowcase() {
  const [interior, furniture, turnkey] = services;

  return (
    <section
      className="relative bg-ivory py-[clamp(4.5rem,10vw,10rem)]"
      aria-labelledby="services-title"
    >
      <SheetGrid />
      <div className="shell relative">
        <Reveal>
          <div className="max-w-3xl">
            <SheetMarker
              number="04"
              label="Our services"
              note="In depth"
              className="mb-10"
            />
            <h2
              id="services-title"
              className="font-display text-display-md font-light text-ink"
            >
              Three disciplines,{" "}
              <span className="display-italic text-forest-secondary">
                one standard
              </span>
            </h2>
          </div>
        </Reveal>

        {/* ── 1 · Interior design — oversized split ───────────────────── */}
        <div className="mt-16 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <Link
              href={`/services#${interior.id}`}
              className="group relative block overflow-hidden"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-ivory-deep">
                <Media
                  src={interior.image.src}
                  alt={interior.image.alt}
                  width={interior.image.width}
                  height={interior.image.height}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-editorial group-hover:scale-[1.05]"
                />
              </div>
            </Link>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-5">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sage">
                {interior.index} — {interior.strapline}
              </p>
              <h3 className="mt-4 font-display text-display-sm font-light text-ink">
                {interior.title}
              </h3>
              <p className="mt-5 text-body-md text-ink-muted">{interior.body}</p>
              <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-2.5 border-t border-line pt-6 sm:grid-cols-2">
                {interior.capabilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-ink-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-champagne"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services#${interior.id}`}
                className="mt-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-forest transition-colors duration-500 hover:text-forest-secondary"
              >
                {interior.cta.label}
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── 2 · Furniture — portrait with overlapping panel ─────────── */}
        <div className="mt-24 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5 lg:order-2">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
                <Media
                  src={furniture.image.src}
                  alt={furniture.image.alt}
                  width={furniture.image.width}
                  height={furniture.image.height}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  position={furniture.image.position}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 left-0 w-[78%] bg-forest p-7 text-ivory-soft sm:p-9 lg:-left-10 lg:w-[68%]">
                <p className="text-[0.62rem] uppercase tracking-[0.24em] text-champagne">
                  Made in Panchkula
                </p>
                <p className="mt-3 font-display text-2xl leading-snug">
                  Beds, wardrobes, study and dining tables, media units and wall
                  panels — crafted to the room.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-6 lg:order-1 lg:pt-16">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sage">
                {furniture.index} — {furniture.strapline}
              </p>
              <h3 className="mt-4 font-display text-display-sm font-light text-ink">
                {furniture.title}
              </h3>
              <p className="mt-5 max-w-xl text-body-md text-ink-muted">
                {furniture.body}
              </p>
              <ul className="mt-7 grid grid-cols-1 gap-x-8 gap-y-2.5 border-t border-line pt-6 sm:grid-cols-2">
                {furniture.capabilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-ink-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-champagne"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href={`/services#${furniture.id}`}
                className="btn btn-outline btn-sm mt-8"
              >
                {furniture.cta.label}
                <ArrowUpRight
                  className="h-3.5 w-3.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* ── 3 · Turnkey — wide image with contrast panel ─────────────── */}
        <Reveal className="mt-28">
          <div className="relative overflow-hidden bg-forest">
            <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[21/9]">
              <Media
                src="/assets/craft/bedroom-range/bedroom-decorinn-02.webp"
                alt="Completed bedroom interior delivered as a turnkey project"
                width={1024}
                height={1536}
                sizes="100vw"
                position="50% 35%"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,28,22,.92)_0%,rgba(11,28,22,.55)_45%,rgba(11,28,22,.2)_100%)]"
              />
            </div>

            <div className="relative -mt-40 px-6 pb-12 sm:px-10 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:max-w-xl lg:flex-col lg:justify-center lg:px-14 lg:pb-0 lg:pt-0">
              <p className="text-[0.68rem] uppercase tracking-[0.24em] text-champagne">
                {turnkey.index} — {turnkey.strapline}
              </p>
              <h3 className="mt-4 font-display text-display-sm font-light text-ivory-soft">
                {turnkey.title}
              </h3>
              <p className="mt-5 text-body-md text-ivory/70">{turnkey.body}</p>
              <Link
                href={`/services#${turnkey.id}`}
                className="btn btn-ghost-light btn-sm mt-8 self-start"
              >
                {turnkey.cta.label}
                <ArrowUpRight
                  className="h-3.5 w-3.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
