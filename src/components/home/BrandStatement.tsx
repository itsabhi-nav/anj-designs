import Media from "@/components/ui/Media";
import Reveal from "@/components/motion/Reveal";
import { SheetGrid, SheetMarker } from "@/components/ui/Sheet";
import { site } from "@/data/site";

/**
 * Brand statement.
 *
 * The original site's belief line ("Built on Belief ~ Powered by Purpose") and
 * its about copy are carried over verbatim, composed as an editorial spread
 * with a detail crop from the company's own portfolio.
 */
export default function BrandStatement() {
  return (
    <section
      id="brand-statement"
      className="relative overflow-hidden bg-ivory py-[clamp(4.5rem,10vw,10rem)]"
      aria-labelledby="brand-title"
    >
      <SheetGrid />
      <div className="shell relative">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <SheetMarker
                number="01"
                label="The studio"
                note="Est. 2010"
                className="mb-10"
              />
            </Reveal>

            <Reveal delay={80}>
              <h2
                id="brand-title"
                className="font-display text-display-lg font-light leading-[0.94] text-ink"
              >
                <span className="block">Built on Belief</span>
                <span className="block text-ink/35">~ Powered by</span>
                <span className="block display-italic text-forest-secondary">
                  Purpose.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-9 max-w-xl text-body-lg text-ink-muted">
                At Anj Designs, we believe Design is more than Aesthetics. It&apos;s
                about solving problems, evoking emotions, and creating meaningful
                experiences. Led by passionate creatives, our studio specialises
                in developing memorable brand identities, immersive interiors, and
                strategic design systems that resonate.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-5 max-w-xl text-body-md text-ink-muted">
                We thrive on storytelling—blending creativity with clarity to help
                brands, businesses, and individuals express their essence across
                every touchpoint.
              </p>
            </Reveal>

            <Reveal delay={280}>
              <dl className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-line pt-7">
                {[
                  { value: site.founded, label: "Studio founded" },
                  { value: "20+", label: "Years in design" },
                  { value: "22,500", label: "Sq ft production unit" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="block font-display text-3xl text-forest">
                        {stat.value}
                      </span>
                      <span className="mt-1 block meta text-sage">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Editorial image column */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal delay={120} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden bg-ivory-deep">
                <Media
                  src="/assets/craft/entrance-foyers/entrance-foyer-decorinn-02.webp"
                  alt="A hand-carved wall panel and bed headboard crafted by Decor Inn"
                  width={1126}
                  height={895}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  position="50% 42%"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={200} className="relative z-10 -mt-16 ml-auto mr-4 max-w-[16rem] bg-forest p-7 sm:-mt-20">
              <p className="text-[0.65rem] uppercase tracking-[0.24em] text-champagne">
                Our belief
              </p>
              <p className="mt-3 font-display text-xl italic leading-snug text-ivory-soft">
                “Design is more than Aesthetics. It&apos;s about solving problems
                and evoking emotions.”
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
