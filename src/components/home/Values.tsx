import Media from "@/components/ui/Media";
import Reveal from "@/components/motion/Reveal";
import { SheetGrid, SheetMarker } from "@/components/ui/Sheet";

/**
 * Design philosophy.
 *
 * The four words are the original site's own strapline on the About page:
 * EMPATHETIC · VISIONARY · HONEST · CONSCIOUS. Each word is expanded with the
 * matching paragraph from that page, so the philosophy is explained rather
 * than merely labelled.
 */

const VALUES = [
  {
    word: "Empathetic",
    heading: "Our Value",
    copy: "Respect is at the core of how we work. We honour diverse perspectives, appreciate every contribution, and value the trust placed in us by both our clients and our team.",
  },
  {
    word: "Visionary",
    heading: "Our Safety",
    copy: "Safety comes first in everything we do. We are committed to protecting ourselves, our teams, and our clients by maintaining safe practices and creating secure environments at every stage of our work.",
  },
  {
    word: "Honest",
    heading: "Our Commitment",
    copy: "We take a proactive approach to every project, ensuring our clients receive the right design solutions for their needs. With dedication and focus, we stay committed from the first idea to the final detail.",
  },
  {
    word: "Conscious",
    heading: "Our Excellence",
    copy: "Excellence defines the way we work. We never compromise on quality, constantly seeking the best solutions and ensuring every client enjoys a seamless, flawless experience from start to finish.",
  },
];

export default function Values() {
  return (
    <section
      className="relative overflow-hidden bg-forest py-[clamp(4.5rem,10vw,10rem)]"
      aria-labelledby="values-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
        }}
      />
      <SheetGrid tone="dark" />

      <div className="shell relative">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <Reveal>
              <SheetMarker
                number="05"
                label="Design philosophy"
                note="Four commitments"
                tone="dark"
                className="mb-10"
              />
              <h2
                id="values-title"
                className="font-display text-display-md font-light text-ivory-soft"
              >
                How we{" "}
                <span className="display-italic text-champagne">think</span>
              </h2>
              <p className="mt-6 max-w-sm text-body-md text-ivory/60">
                Empathetic, visionary, honest, conscious — the four commitments
                that shape every drawing, every finish and every handover.
              </p>
            </Reveal>

            <Reveal delay={140} className="mt-10 hidden lg:block">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Media
                  src="/assets/craft/workshop/workshop-decorinn-01.webp"
                  alt="A craftsman shaping a furniture component in the Decor Inn production unit"
                  width={1600}
                  height={951}
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="h-full w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="frame-ticks absolute inset-4 opacity-60"
                />
              </div>
            </Reveal>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <ol className="divide-y divide-ivory/12 border-y border-ivory/12">
              {VALUES.map((value, index) => (
                <li key={value.word}>
                  <Reveal delay={index * 70}>
                    <div className="group grid grid-cols-1 gap-4 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10">
                      <p className="meta text-champagne sm:col-span-1">
                        0{index + 1}
                      </p>
                      <h3 className="font-display text-3xl font-light uppercase tracking-[0.02em] text-ivory-soft transition-colors duration-500 group-hover:text-champagne sm:col-span-4 sm:text-4xl">
                        {value.word}
                      </h3>
                      <div className="sm:col-span-7">
                        <p className="meta text-ivory/45">{value.heading}</p>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ivory/65">
                          {value.copy}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
