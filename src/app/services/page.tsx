import type { Metadata } from "next";

import { pageMetadata } from "@/lib/seo";
import { services, craftRanges, manufacturing, styles, finishes } from "@/data/services";
import { verifiedTestimonials } from "@/data/testimonials";
import Media from "@/components/ui/Media";
import Reveal from "@/components/motion/Reveal";
import PageHero from "@/components/layout/PageHero";
import Button from "@/components/ui/Button";
import ClosingCta from "@/components/home/ClosingCta";
import CraftRangeList from "@/components/home/CraftRangeList";

export const metadata: Metadata = pageMetadata({
  title: "Services — Interior design, bespoke furniture & turnkey delivery",
  description:
    "ANJ Designs by Decor Inn offers interior design, bespoke furniture design and manufacturing, turnkey interior design and architectural design — from New Delhi.",
  path: "/services",
});

export default function ServicesPage() {
  const [interior, furniture, turnkey, architectural] = services;

  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Spaces that reflect how you actually live."
        intro="At ANJ Design, we create spaces that reflect your lifestyle and personality. From cozy homes to dynamic workspaces, our team designs interiors that are stylish, practical, and easy to live in."
        image="/assets/craft/dining-range/dining-decorinn-01.webp"
        imageAlt="A dining interior designed by ANJ Designs by Decor Inn"
        imageWidth={1600}
        imageHeight={1177}
        portraitSrc="/assets/hero-crops/dining.webp"
        portraitWidth={883}
        portraitHeight={1177}
        stat={{ value: "50+", label: "Polishes and finishes" }}
      />

      {/* Intro band */}
      <section className="relative bg-ivory-soft py-[clamp(3.5rem,7vw,7rem)]">
        <div className="shell">
          <Reveal>
            <p className="mx-auto max-w-3xl text-center font-display text-display-sm font-light leading-snug text-ink">
              Whether you&apos;re looking for a complete makeover or smart
              modular upgrades, we focus on turning your ideas into beautiful,
              functional spaces that feel{" "}
              <span className="display-italic text-forest-secondary">
                just right.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 01 Interior design — oversized split ─────────────────────── */}
      <section
        id={interior.id}
        className="scroll-mt-24 bg-ivory py-[clamp(4rem,9vw,9rem)]"
        aria-labelledby={`${interior.id}-title`}
      >
        <div className="shell">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-7">
              <div className="relative aspect-[16/11] overflow-hidden bg-ivory-deep">
                <Media
                  src={interior.image.src}
                  alt={interior.image.alt}
                  width={interior.image.width}
                  height={interior.image.height}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={110} className="lg:col-span-5">
              <ServiceCopy service={interior} />
            </Reveal>
          </div>

          <Reveal delay={140} className="mt-8 lg:ml-[calc(58.333%+3rem)]">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-2">
              {[interior.secondaryImage].filter(Boolean).map((img) => (
                <div
                  key={img!.src}
                  className="relative aspect-[16/10] overflow-hidden bg-ivory-deep"
                >
                  <Media
                    src={img!.src}
                    alt={img!.alt}
                    width={img!.width}
                    height={img!.height}
                    sizes="(max-width: 1024px) 50vw, 29vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
              <div className="relative aspect-[16/10] overflow-hidden bg-ivory-deep">
                <Media
                  src="/assets/services/anjinterior-1.webp"
                  alt="An annotated interior plan and material schedule by ANJ Designs"
                  width={659}
                  height={377}
                  sizes="(max-width: 1024px) 50vw, 29vw"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 02 Bespoke furniture — portrait + overlapping panel ──────── */}
      <section
        id={furniture.id}
        className="scroll-mt-24 overflow-hidden bg-forest py-[clamp(4rem,9vw,9rem)]"
        aria-labelledby={`${furniture.id}-title`}
      >
        <div className="shell">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5 lg:order-2">
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden">
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
                <div className="absolute -bottom-8 left-0 w-[80%] bg-champagne p-7 lg:-left-12 lg:w-[70%]">
                  <p className="text-[0.62rem] uppercase tracking-[0.24em] text-forest/70">
                    {manufacturing.unitSize}
                  </p>
                  <p className="mt-2 font-display text-xl leading-snug text-forest-deep">
                    {manufacturing.capacity}
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={110} className="lg:col-span-6 lg:order-1 lg:pt-14">
              <div className="[&_*]:!text-ivory-soft [&_p.text-ink-muted]:!text-ivory/65 [&_li.text-ink-muted]:!text-ivory/70 [&_span.border-forest\/15]:!border-ivory/25">
                <ServiceCopy service={furniture} tone="dark" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 Turnkey — wide image with contrast panel ───────────────── */}
      <section
        id={turnkey.id}
        className="scroll-mt-24 bg-ivory-soft py-[clamp(4rem,9vw,9rem)]"
        aria-labelledby={`${turnkey.id}-title`}
      >
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden bg-forest">
              <div className="relative aspect-[16/9] overflow-hidden lg:aspect-[21/9]">
                <Media
                  src="/assets/craft/formal-living/formal-living-decorinn-01.webp"
                  alt="A completed living room delivered as a turnkey interior project"
                  width={1469}
                  height={1064}
                  sizes="100vw"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,28,22,.94)_0%,rgba(11,28,22,.6)_48%,rgba(11,28,22,.25)_100%)]"
                />
              </div>
              <div className="relative -mt-44 px-6 pb-12 sm:px-10 lg:absolute lg:inset-y-0 lg:left-0 lg:flex lg:max-w-xl lg:flex-col lg:justify-center lg:px-14">
                <ServiceCopy service={turnkey} tone="dark" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 Architectural design — grid ────────────────────────────── */}
      <section
        id={architectural.id}
        className="scroll-mt-24 bg-ivory py-[clamp(4rem,9vw,9rem)]"
        aria-labelledby={`${architectural.id}-title`}
      >
        <div className="shell">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <ServiceCopy service={architectural} />
            </Reveal>

            <Reveal delay={110} className="lg:col-span-6 lg:col-start-7">
              <div className="relative aspect-[4/3] overflow-hidden bg-ivory-deep">
                <Media
                  src={architectural.image.src}
                  alt={architectural.image.alt}
                  width={architectural.image.width}
                  height={architectural.image.height}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="mt-4 border-l-2 border-champagne pl-4">
                <p className="text-[0.78rem] leading-relaxed text-ink-muted">
                  The original site states that ANJ Designs provides “a full
                  range of interior design, architectural design” but does not
                  define the architectural scope. Confirm the exact offering
                  before publishing further detail.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Furniture ranges ──────────────────────────────────────────── */}
      <section className="relative bg-ivory-soft py-[clamp(4rem,9vw,9rem)]">
        <div className="shell">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <Reveal>
                <p className="eyebrow">Bespoke furniture</p>
                <h2 className="mt-5 font-display text-display-sm font-light text-ink">
                  Ranges &amp; finishes
                </h2>
                <p className="mt-5 max-w-sm text-body-md text-ink-muted">
                  Every range below is designed and manufactured in Panchkula,
                  Haryana — with machine production where the piece calls for it
                  and handwork where the material does.
                </p>

                <p className="mt-8 text-[0.66rem] uppercase tracking-[0.22em] text-sage">
                  Styles
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {styles.map((style) => (
                    <li
                      key={style}
                      className="border border-forest/15 px-3 py-1.5 text-[0.72rem] text-ink-muted"
                    >
                      {style}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 text-[0.66rem] uppercase tracking-[0.22em] text-sage">
                  A selection of finishes
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {finishes.slice(0, 12).map((finish) => (
                    <li
                      key={finish}
                      className="border border-forest/12 bg-ivory px-3 py-1.5 text-[0.7rem] text-ink-muted"
                    >
                      {finish}
                    </li>
                  ))}
                  <li className="border border-forest/12 bg-ivory px-3 py-1.5 text-[0.7rem] text-sage">
                    + {finishes.length - 12} more
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
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-forest py-[clamp(4rem,9vw,9rem)]">
        <div className="shell">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow eyebrow-light">~ Testimonials ~</p>
              <h2 className="mt-5 font-display text-display-md font-light text-ivory-soft">
                What do people say{" "}
                <span className="display-italic text-champagne">about ANJ?</span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden border border-ivory/12 bg-ivory/12 md:grid-cols-3">
            {verifiedTestimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 90} className="bg-forest">
                <figure className="flex h-full flex-col p-8 lg:p-10">
                  <blockquote className="flex-1 text-[0.95rem] leading-relaxed text-ivory/75">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-8 border-t border-ivory/15 pt-6">
                    <p className="font-display text-xl text-ivory-soft">
                      {testimonial.name}
                    </p>
                    {testimonial.location && (
                      <p className="mt-1 text-[0.7rem] uppercase tracking-[0.16em] text-champagne">
                        {testimonial.location}
                      </p>
                    )}
                    {testimonial.role && (
                      <p className="mt-1.5 text-[0.76rem] leading-relaxed text-ivory/60">
                        {testimonial.role}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta />

      <div className="bg-ivory-soft py-16">
        <div className="shell flex flex-wrap items-center justify-center gap-5">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-sage">
            Ready to begin?
          </p>
          <Button href="/contact" arrow="up-right">
            Start a conversation
          </Button>
        </div>
      </div>
    </>
  );
}

/** Shared service copy block so every service reads consistently. */
function ServiceCopy({
  service,
  tone = "light",
}: {
  service: (typeof services)[number];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div>
      <p
        className={`text-[0.68rem] uppercase tracking-[0.24em] ${
          dark ? "text-champagne" : "text-sage"
        }`}
      >
        {service.index} — {service.strapline}
      </p>
      <h2
        id={`${service.id}-title`}
        className={`mt-4 font-display text-display-sm font-light ${
          dark ? "text-ivory-soft" : "text-ink"
        }`}
      >
        {service.title}
      </h2>
      <p
        className={`mt-5 text-body-md ${
          dark ? "text-ivory/70" : "text-ink-muted"
        }`}
      >
        {service.body}
      </p>
      <ul
        className={`mt-7 grid grid-cols-1 gap-x-8 gap-y-2.5 border-t pt-6 sm:grid-cols-2 ${
          dark ? "border-ivory/15" : "border-line"
        }`}
      >
        {service.capabilities.map((item) => (
          <li
            key={item}
            className={`flex items-start gap-2.5 text-sm ${
              dark ? "text-ivory/70" : "text-ink-muted"
            }`}
          >
            <span
              aria-hidden="true"
              className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-champagne"
            />
            {item}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button
          href={service.cta.href}
          variant={dark ? "ghost-light" : "outline"}
          arrow="up-right"
        >
          {service.cta.label}
        </Button>
      </div>
    </div>
  );
}
