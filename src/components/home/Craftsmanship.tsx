import { craftRanges, finishes, manufacturing, styles } from "@/data/services";
import Media from "@/components/ui/Media";
import Reveal from "@/components/motion/Reveal";
import { PinnedStory } from "@/components/motion/ScrollChoreography";
import { SheetGrid, SheetMarker } from "@/components/ui/Sheet";
import CraftRangeList from "./CraftRangeList";

/**
 * Craftsmanship and manufacturing.
 *
 * Uses the company's own portfolio photography — finished furniture pieces and
 * genuine production imagery from the Panchkula workshop. No production scene
 * is invented: everything shown comes from the official portfolio PDFs.
 */
export default function Craftsmanship() {
  return (
    <section
      className="relative overflow-hidden bg-ivory py-[clamp(4.5rem,10vw,10rem)]"
      aria-labelledby="craft-title"
    >
      <SheetGrid />
      <div className="shell relative">
        <Reveal>
          <div className="grid-12 gap-y-8">
            <div className="col-span-12 lg:col-span-6">
              <SheetMarker
                number="06"
                label="Craftsmanship"
                note="Panchkula, Haryana"
                className="mb-10"
              />
              <h2
                id="craft-title"
                className="font-display text-display-md font-light text-ink"
              >
                Designed here.{" "}
                <span className="display-italic text-forest-secondary">
                  Made in Panchkula.
                </span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:pt-16">
              <p className="max-w-xl text-body-lg text-ink-muted">
                {manufacturing.finish}. Every piece is produced in our own
                {` ${manufacturing.location}`} facility — from the first cut to
                the final polish — and finished by hand where the material asks
                for it.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Manufacturing facts */}
        <Reveal delay={100} className="mt-14">
          <dl className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-3">
            {[
              { value: "22,500", unit: "sq ft", label: "Manufacturing unit" },
              { value: "100+", unit: "", label: "Projects in the last two years" },
              { value: "8–10", unit: "", label: "Full bedrooms produced in 30 days" },
            ].map((stat) => (
              <div key={stat.label} className="sweep bg-ivory-soft p-8 lg:p-10">
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-display text-[clamp(2.5rem,5vw,3.75rem)] font-light leading-none text-forest">
                    {stat.value}
                    {stat.unit && (
                      <span className="ml-2 text-[0.4em] tracking-[0.08em] text-sage">
                        {stat.unit}
                      </span>
                    )}
                  </span>
                  <span className="mt-3 block meta text-sage">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Image + process */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <PinnedStory
            className="lg:col-span-7"
            label="Bespoke dining furniture by Decor Inn"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-ivory-deep">
              <Media
                src="/assets/craft/dining/dining-portfolio-01.webp"
                alt="A bespoke dining table and chairs made by Decor Inn"
                width={1286}
                height={965}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="h-full w-full object-cover"
              />
            </div>
          </PinnedStory>

          <Reveal delay={120} className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sage">
                  The process
                </p>
                <ol className="mt-6 space-y-5">
                  {manufacturing.process.map((step, index) => (
                    <li key={step} className="flex items-baseline gap-5">
                      <span className="font-display text-sm text-champagne">
                        0{index + 1}
                      </span>
                      <span className="font-display text-3xl font-light text-ink">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-ink-muted">
                  From planning the design according to space, to actually
                  designing it to your customised needs — looking into every
                  height that matches your comfort levels.
                </p>
              </div>

              <div className="border-t border-line pt-6">
                <p className="text-[0.66rem] uppercase tracking-[0.22em] text-sage">
                  Styles we work in
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {styles.map((style) => (
                    <li
                      key={style}
                      className="border border-forest/15 px-3.5 py-1.5 text-[0.72rem] text-ink-muted"
                    >
                      {style}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Range explorer */}
        <div className="mt-20 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="meta text-sage">Furniture ranges</p>
              <h3 className="mt-5 font-display text-display-sm font-light text-ink">
                What we make
              </h3>
              <p className="mt-5 max-w-sm text-body-md text-ink-muted">
                Over 50 polishes and finishes, suggested to clients at the
                planning stage — stain, classical polish, PU, marble, laminate,
                water, lacquer, mirror, metallic and more.
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {finishes.slice(0, 10).map((finish) => (
                  <li
                    key={finish}
                    className="border border-forest/12 bg-ivory-soft px-3 py-1.5 text-[0.7rem] text-ink-muted"
                  >
                    {finish}
                  </li>
                ))}
                <li className="border border-forest/12 bg-ivory-soft px-3 py-1.5 text-[0.7rem] text-sage">
                  + {finishes.length - 10} more
                </li>
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={100}>
              <CraftRangeList ranges={craftRanges} />
            </Reveal>
          </div>
        </div>

        {/* The workshop */}
        <Reveal delay={120} className="mt-20">
          <div className="relative overflow-hidden bg-forest">
            <div className="relative aspect-[16/9] overflow-hidden">
              <Media
                src="/assets/craft/workshop/workshop-decorinn-01.webp"
                alt="A Decor Inn craftsman shaping a furniture component in the Panchkula production unit"
                width={1600}
                height={951}
                sizes="100vw"
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(11,28,22,.85)_0%,rgba(11,28,22,.35)_52%,rgba(11,28,22,.08)_100%)]" />
            <div className="pointer-events-none absolute inset-y-0 left-0 flex max-w-md flex-col justify-center p-8 sm:p-12">
              <p className="meta text-champagne">In the workshop</p>
              <p className="mt-3 font-display text-2xl leading-snug text-ivory-soft sm:text-3xl">
                Machine manufacturing, expertly handcrafted finishes.
              </p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
                Every piece is cut, joined and finished by hand at our own
                production unit in Panchkula, Haryana.
              </p>
            </div>
            <span
              aria-hidden="true"
              className="frame-ticks absolute inset-5 opacity-60"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
