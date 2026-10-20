import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { site } from "@/data/site";
import Media from "@/components/ui/Media";

/**
 * Opening hero.
 *
 * The choreography is pure CSS (keyframes) so the first screen paints
 * immediately — no animation library sits on the critical path and the
 * photograph is the priority request.
 *
 * Art direction: a full-bleed interior photograph under a deep forest-green
 * treatment, with the headline set as an oversized editorial serif and the
 * original site strapline kept as a restrained vertical caption.
 */
export default function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest"
      aria-labelledby="hero-title"
    >
      {/* Photograph */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-scale absolute inset-0">
          <Media
            src="/assets/craft/informal-living/informal-living-decorinn-01.webp"
            alt="A completed living room interior designed and executed by ANJ Designs by Decor Inn"
            width={1600}
            height={1176}
            sizes="100vw"
            priority
            portraitSrc="/assets/hero-crops/home-living.webp"
            portraitWidth={882}
            portraitHeight={1176}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>

      {/* Forest-green treatment */}
      <div
        aria-hidden="true"
        className="hero-veil absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(9,24,18,.66)_0%,rgba(14,36,28,.18)_28%,rgba(11,28,22,.68)_72%,rgba(9,24,18,.96)_100%)]"
      />
      <div
        aria-hidden="true"
        className="hero-veil absolute inset-0 -z-10 bg-[radial-gradient(105%_80%_at_8%_58%,rgba(13,33,25,.82)_0%,rgba(13,33,25,.28)_45%,transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="hero-veil absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_78%_18%,rgba(192,168,120,.28)_0%,transparent_68%)]"
      />

      <div className="shell relative w-full pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="grid-12 items-end gap-y-10">
          {/* Label + headline */}
          <div className="col-span-12 lg:col-span-8">
            <p
              className="hero-fade flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-champagne"
              style={{ animationDelay: "260ms" }}
            >
              <span aria-hidden="true" className="h-px w-10 bg-champagne/70" />
              {site.fullName}
            </p>

            <h1
              id="hero-title"
              className="mt-7 font-display text-display-xl font-light text-ivory-soft"
            >
              <span className="block overflow-hidden">
                <span
                  className="hero-line block"
                  style={{ animationDelay: "340ms" }}
                >
                  Spaces that
                </span>
              </span>
              <span className="block overflow-hidden">
                <span
                  className="hero-line block display-italic text-champagne"
                  style={{ animationDelay: "440ms" }}
                >
                  move you.
                </span>
              </span>
            </h1>

            <p
              className="hero-rise mt-8 max-w-xl text-body-lg text-ivory/75"
              style={{ animationDelay: "640ms" }}
            >
              Thoughtfully designed interiors, bespoke furniture and considered
              craftsmanship, shaped around the way you live and work.
            </p>

            <div
              className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: "760ms" }}
            >
              <Link
                href="/projects"
                className="btn group bg-ivory-soft text-forest-deep transition-colors duration-500 hover:bg-champagne"
              >
                Explore Our Work
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/contact"
                className="btn border border-ivory/35 text-ivory-soft transition-colors duration-500 hover:border-ivory-soft hover:bg-ivory-soft hover:text-forest-deep"
              >
                Let&apos;s Collaborate
              </Link>
            </div>
          </div>

          {/* Original strapline, kept from the source site */}
          <div className="col-span-12 hidden lg:col-span-4 lg:block">
            <p
              className="hero-fade ml-auto max-w-[15rem] border-l border-champagne/40 pl-5 text-right font-display text-lg italic leading-snug text-ivory/70"
              style={{ animationDelay: "900ms" }}
            >
              Interior Designing, Décor, Furniture Designing and Manufacturing
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="hero-fade mt-14 flex items-end justify-between gap-6 border-t border-ivory/15 pt-6"
          style={{ animationDelay: "1040ms" }}
        >
          <p className="max-w-[16rem] text-[0.6rem] uppercase leading-relaxed tracking-[0.22em] text-ivory/65 sm:max-w-none sm:text-[0.65rem] sm:tracking-[0.28em]">
            {site.belief}
          </p>
          <a
            href="#brand-statement"
            className="group flex shrink-0 items-center gap-3 text-[0.62rem] uppercase tracking-[0.24em] text-ivory/60 transition-colors hover:text-champagne"
          >
            Scroll
            <span className="relative block h-10 w-px overflow-hidden bg-ivory/25">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1/2 bg-champagne animate-scroll-hint"
              />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
