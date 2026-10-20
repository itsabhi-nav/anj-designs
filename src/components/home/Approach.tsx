import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Reveal from "@/components/motion/Reveal";
import { SheetGrid, SheetMarker } from "@/components/ui/Sheet";

/**
 * “Our Expertise” and “ANJ Work Approach” — the two four-part bands from the
 * original home page, carried over verbatim.
 */

const EXPERTISE = [
  {
    title: "Customer Focus",
    copy: "Customers choose us for the simplicity of communication and an understanding of what's necessary to receive in the end.",
  },
  {
    title: "Professionalism",
    copy: "At ANJ Designs by decorinn, professionalism isn't just a standard. It's the foundation of everything we do. As a leading interior design firm, we are committed to delivering excellence in every project, ensuring our client experience, unparalleled service and exceptional results.",
  },
  {
    title: "Multi Experience",
    copy: "We provide a wide range of services, we work in different styles, we project commercial and residential properties.",
  },
  {
    title: "Author's Supervision",
    copy: "At ANJ Designs, our authorial supervision brings unparalleled expertise and a fresh perspective to every project. Our supervisory experts, with their extensive knowledge of design theory and trends, ensure that our designs are both innovative and grounded in solid principles.",
  },
];

const SUPERVISION = [
  "Innovative Design",
  "Quality Assurance",
  "Team Mentorship",
  "Client Engagement",
];

const APPROACH = [
  {
    title: "Creative Expertise",
    copy: "Our team fuses design principles with strategic thinking to craft solutions that are not just beautiful—but effective.",
  },
  {
    title: "Holistic Approach",
    copy: "From initial concept to final rollout, we handle every stage: research, design, implementation, and beyond.",
  },
  {
    title: "Client-Centric Process",
    copy: "We believe in collaboration. You'll be an integral part of the journey—from brainstorming to lionized launch.",
  },
  {
    title: "Detail-Driven Excellence",
    copy: "We sweat the small stuff and celebrate the big wins, ensuring every pixel and plank reflects your brand's aspirations.",
  },
];

export default function Approach() {
  return (
    <section
      className="relative overflow-hidden bg-ivory py-[clamp(4.5rem,10vw,10rem)]"
      aria-labelledby="approach-title"
    >
      <SheetGrid />
      <div className="shell relative">
        <Reveal>
          <div className="grid-12 gap-y-6">
            <div className="col-span-12 lg:col-span-5">
              <SheetMarker
                number="07"
                label="ANJ work approach"
                note="Four commitments"
                className="mb-10"
              />
              <h2
                id="approach-title"
                className="font-display text-display-md font-light text-ink"
              >
                How the work{" "}
                <span className="display-italic text-forest-secondary">
                  actually gets done
                </span>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:pt-16">
              <p className="text-body-lg text-ink-muted">
                Four commitments that run through every project — from the first
                brief to the final handover.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map((item, index) => (
            <Reveal key={item.title} delay={index * 80} as="div" className="sweep bg-ivory-soft">
              <div className="h-full p-8 lg:p-9">
                <p className="meta text-champagne-dark">0{index + 1}</p>
                <h3 className="mt-4 font-display text-2xl font-light text-ink">
                  {item.title}
                </h3>
                <p className="mt-3.5 text-sm leading-relaxed text-ink-muted">
                  {item.copy}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Expertise band */}
        <div className="mt-24 grid grid-cols-1 gap-10 border-t border-line pt-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="meta text-sage">Our expertise</p>
              <h3 className="mt-5 font-display text-display-sm font-light text-ink">
                Why clients come back
              </h3>
              <div className="mt-8">
                <p className="meta text-sage">Author&apos;s supervision</p>
                <ul className="mt-4 space-y-2.5">
                  {SUPERVISION.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2.5 text-sm text-ink-muted"
                    >
                      <span
                        aria-hidden="true"
                        className="h-1 w-1 rounded-full bg-champagne"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <dl className="grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {EXPERTISE.map((item, index) => (
                <Reveal key={item.title} delay={index * 70} as="div">
                  <dt className="font-display text-2xl font-light text-forest">
                    {item.title}
                  </dt>
                  <dd className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {item.copy}
                  </dd>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>

        <Reveal delay={120} className="mt-16">
          <Link
            href="/services"
            className="group inline-flex items-center gap-3 border-b border-forest/25 pb-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-forest transition-colors duration-500 hover:border-forest"
          >
            See how we work
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
