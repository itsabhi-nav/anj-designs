import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Reveal from "@/components/motion/Reveal";

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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-8 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-champagne/25 to-transparent lg:block"
      />

      <div className="shell relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-champagne">
              Let&apos;s Collaborate
            </p>
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
              <Link
                href="/contact"
                className="btn group bg-champagne text-forest-deep transition-colors duration-500 hover:bg-ivory-soft"
              >
                Start a Conversation
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="/projects"
                className="btn border border-ivory/30 text-ivory-soft transition-colors duration-500 hover:border-ivory-soft hover:bg-ivory-soft hover:text-forest-deep"
              >
                Explore Our Work
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
