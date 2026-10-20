import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Media from "@/components/ui/Media";
import Reveal from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/ScrollChoreography";

/**
 * Founder profile.
 *
 * The biography is carried over verbatim from the original site, with the
 * founding-date inconsistency handled in the copy and documented in
 * docs/ORIGINAL-SITE-EXTRACTION.md rather than silently resolved.
 */
export default function Founder() {
  return (
    <section
      className="relative overflow-hidden bg-ivory-soft py-[clamp(4.5rem,10vw,10rem)]"
      aria-labelledby="founder-title"
    >
      <div className="shell">
        <div className="grid-12 items-center gap-y-12">
          {/* Portrait */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4">
            <Reveal>
              <figure className="relative">
                <Parallax className="relative aspect-[3/4] overflow-hidden bg-ivory-deep" speed={8}>
                  <Media
                    src="/assets/founder/annie-nagpal-jain.webp"
                    alt="Annie Nagpal Jain, founder of ANJ Designs by Decor Inn"
                    width={405}
                    height={540}
                    sizes="(max-width: 768px) 100vw, 34vw"
                    className="h-full w-full scale-[1.04] object-cover"
                  />
                </Parallax>
                <figcaption
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-5 -right-5 h-24 w-24 border-b border-r border-champagne/70"
                />
              </figure>
            </Reveal>
          </div>

          {/* Biography */}
          <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
            <Reveal delay={90}>
              <p className="eyebrow">~ The founder ~</p>
              <h2
                id="founder-title"
                className="mt-5 font-display text-display-md font-light text-ink"
              >
                Annie Nagpal Jain
              </h2>
              <p className="mt-3 text-[0.68rem] uppercase tracking-[0.24em] text-sage">
                Founder of ANJ Designs by Decor Inn
              </p>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-8 space-y-5 text-body-md text-ink-muted">
                <p>
                  Annie has been in the business of luxurious interior design and
                  luxurious bespoke furniture of all kinds in all and finishes
                  since 2006.
                </p>
                <p>
                  She is a qualified interior designer with a specialisation in
                  furniture design and masters in enhancing complete design
                  aesthetics from the institute of NIFD, Chandigarh, and is a
                  certified vaastu expert from Bhawan Vidyalaya, Chandigarh.
                </p>
                <p>
                  She has spent 20+ years in the field of design and has worked
                  with various design firms in the initial stages of her
                  profession, leading numerous projects ranging from houses,
                  restaurants, cafes, schools, banks, hotels, and offices.
                </p>
                <p>
                  In 2016 she established her own venture{" "}
                  <span className="text-ink">Decor Inn</span> now ventured into{" "}
                  <span className="text-ink">ANJ Designs by Decor Inn</span>,
                  specialising in interior design and furniture manufacturing with
                  a production unit equipped with all types of machinery and
                  highly skilled handwork artisans.
                </p>
                <p>
                  She believes in living her life with zest and colour, aspires
                  to meet new people, and enjoys socialising. Her dream is to be
                  able to produce better designs each day and make ANJ Designs
                  by Decor Inn the most reliable, reputed, trustworthy, and
                  valued interior design company in the design industry of today.
                </p>
              </div>
            </Reveal>

            <Reveal delay={210}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link href="/about" className="btn btn-outline btn-sm">
                  Read the full story
                  <ArrowUpRight
                    className="h-3.5 w-3.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/contact"
                  className="link-underline text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-forest"
                >
                  Work with Annie
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
