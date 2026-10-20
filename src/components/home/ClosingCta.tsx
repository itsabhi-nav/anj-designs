import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { SheetGrid } from "@/components/ui/Sheet";

/**
 * Closing call to action.
 *
 * A full-width forest-green band that leads directly to the real contact
 * experience.
 */
export default function ClosingCta() {
  return (
    <section
      className="relative isolate overflow-hidden bg-forest py-[clamp(5rem,12vw,12rem)]"
      aria-labelledby="cta-title"
    >
      <SheetGrid tone="dark" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-champagne/25 to-transparent lg:block"
      />
      <div aria-hidden="true" className="grain-layer" />

      <div className="shell relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="meta text-champagne">Let&apos;s Collaborate</p>
          </Reveal>

          <Reveal delay={90}>
            <h2
              id="cta-title"
              className="mt-7 font-display text-display-lg font-light leading-[0.98] text-ivory-soft"
            >
              Your space deserves a{" "}
              <span className="display-italic text-champagne">
                thoughtful beginning.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={160}>
            <p className="mx-auto mt-7 max-w-xl text-body-lg text-ivory/65">
              Tell us what you&apos;re imagining. Let&apos;s explore how thoughtful
              design and craftsmanship can bring it to life.
            </p>
          </Reveal>

          <Reveal delay={230}>
            <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Magnetic strength={0.24}>
                <Link
                  href="/contact"
                  data-cursor="view"
                  data-cursor-label="Begin"
                  className="btn group bg-champagne text-forest-deep transition-colors duration-500 hover:bg-ivory-soft"
                >
                  Start a Conversation
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </Link>
              </Magnetic>

              <Magnetic strength={0.24}>
                <Link
                  href="/projects"
                  className="btn border border-ivory/30 text-ivory-soft transition-colors duration-500 hover:border-ivory-soft hover:bg-ivory-soft hover:text-forest-deep"
                >
                  Explore Our Work
                </Link>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 border-t border-ivory/12 pt-8 sm:grid-cols-3">
              {[
                { label: "Call", value: "+91 99589 61111", href: "tel:+919958961111" },
                { label: "Write", value: "decorinndesigns@gmail.com", href: "mailto:decorinndesigns@gmail.com" },
                { label: "Visit", value: "Ghitorni, New Delhi", href: null },
              ].map((item) => (
                <div key={item.label}>
                  <dt className="meta text-ivory/40">{item.label}</dt>
                  <dd className="mt-2">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="link-underline text-sm text-ivory/80 transition-colors hover:text-champagne"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-sm text-ivory/80">{item.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
