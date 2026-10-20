import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { site } from "@/data/site";
import Media from "@/components/ui/Media";
import Magnetic from "@/components/motion/Magnetic";

/**
 * Opening hero.
 *
 * The choreography is pure CSS (keyframes) so the first screen paints
 * immediately — no animation library sits on the critical path and the
 * photograph is the priority request.
 *
 * Art direction: a full-bleed interior photograph under a deep forest-green
 * treatment, with the headline set as an oversized editorial serif, the
 * studio's own strapline kept as a vertical caption, and the address
 * rendered as technical metadata in the language of a drawing sheet.
 */
export default function Hero() {
  return (
    <section
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-forest"
      aria-labelledby="hero-title"
    >
      {/*
        The hero is a full-bleed photograph from the studio's own work, at
        full resolution. An art-directed 3:4 crop of the SAME original is
        used on phones, so a tall viewport never has to upscale a landscape
        frame.
      */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Media
          src="/assets/craft/dining-range/dining-decorinn-01.webp"
          alt="A formal dining room with a marble fireplace and crystal pendants, designed by ANJ Designs by Decor Inn"
          width={1600}
          height={1177}
          sizes="100vw"
          priority
          portraitSrc="/assets/hero-crops/salon.webp"
          portraitWidth={883}
          portraitHeight={1177}
          className="h-full w-full object-cover object-center"
        />
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
      <div aria-hidden="true" className="grain-layer -z-10" />

      {/* Technical scrim so the metadata stays legible over the photograph */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[38%] bg-[linear-gradient(270deg,rgba(9,24,18,.82)_0%,rgba(9,24,18,.35)_45%,transparent_100%)] lg:block"
      />

      <div className="shell relative w-full pb-10 pt-32 md:pb-14 md:pt-40">
        <div className="grid-12 items-end gap-y-10">
          {/* Label + headline */}
          <div className="col-span-12 lg:col-span-8">
            <p
              className="hero-fade over-photo flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.3em] text-champagne"
              style={{ animationDelay: "260ms" }}
            >
              <span aria-hidden="true" className="h-px w-10 bg-champagne/70" />
              {site.fullName}
            </p>

            <h1
              id="hero-title"
              className="mt-7 font-display text-display-2xl font-light text-ivory-soft"
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
              className="hero-rise over-photo mt-8 max-w-xl text-body-lg text-ivory/80"
              style={{ animationDelay: "640ms" }}
            >
              Thoughtfully designed interiors, bespoke furniture and considered
              craftsmanship, shaped around the way you live and work.
            </p>

            <div
              className="hero-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              style={{ animationDelay: "760ms" }}
            >
              <Magnetic strength={0.22}>
                <Link
                  href="/projects"
                  data-cursor="view"
                  data-cursor-label="Work"
                  className="btn group bg-ivory-soft text-forest-deep transition-colors duration-500 hover:bg-champagne"
                >
                  Explore Our Work
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
              </Magnetic>

              <Magnetic strength={0.22}>
                <Link
                  href="/contact"
                  className="btn border border-ivory/35 text-ivory-soft transition-colors duration-500 hover:border-ivory-soft hover:bg-ivory-soft hover:text-forest-deep"
                >
                  Let&apos;s Collaborate
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Technical sidebar */}
          <div className="col-span-12 hidden lg:col-span-4 lg:block">
            <p
              className="hero-fade over-photo ml-auto max-w-[15rem] border-l border-champagne/40 pl-5 text-right font-display text-lg italic leading-snug text-ivory/85"
              style={{ animationDelay: "900ms" }}
            >
              Interior Designing, Décor, Furniture Designing and Manufacturing
            </p>

            <dl
              className="hero-fade ml-auto mt-8 max-w-[15rem] space-y-3 border-t border-ivory/15 pt-5"
              style={{ animationDelay: "1000ms" }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <dt className="meta text-ivory/45">Studio</dt>
                <dd className="meta text-ivory/80">Ghitorni, Delhi</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="meta text-ivory/45">Works</dt>
                <dd className="meta text-ivory/80">Panchkula, HR</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="meta text-ivory/45">Practice</dt>
                <dd className="meta text-ivory/80">Est. 2010</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Spec strip */}
        <div
          className="hero-fade mt-12 border-t border-ivory/15 pt-5"
          style={{ animationDelay: "1100ms" }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <dl className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {[
                { label: "Portfolio", value: "13 projects" },
                { label: "Disciplines", value: "04" },
                { label: "Production", value: "22,500 sq ft" },
                { label: "Finishes", value: "50+" },
              ].map((item) => (
                <div key={item.label} className="flex items-baseline gap-2">
                  <dt className="meta text-ivory/35">{item.label}</dt>
                  <dd className="meta text-ivory/70">{item.value}</dd>
                </div>
              ))}
            </dl>

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
      </div>

      {/* Corner crop marks */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-5 hidden md:block">
        <span className="frame-ticks absolute inset-0" />
      </span>
    </section>
  );
}
