import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";

import { contact, social } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import PageHero from "@/components/layout/PageHero";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/motion/Reveal";
import { verifiedTestimonials } from "@/data/testimonials";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Start a conversation with ANJ Designs",
  description:
    "Talk to ANJ Designs by Decor Inn about your interior design, bespoke furniture or turnkey project. Studio: Ghitorni, New Delhi. Production: Panchkula, Haryana.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's create something meaningful."
        intro="Tell us about your space, your ideas, and what you would like to create."
        image="/assets/craft/dining/dining-portfolio-02.webp"
        imageAlt="An interior by ANJ Designs by Decor Inn"
        imageWidth={960}
        imageHeight={1280}
        stat={{ value: "48h", label: "Typical response time" }}      />

      {/* Details + form */}
      <section className="relative bg-ivory-soft py-[clamp(3.5rem,7vw,7rem)]">
        <div className="shell">
          <div className="grid-12 gap-y-12">
            {/* Details */}
            <div className="col-span-12 lg:col-span-4">
              <Reveal>
                <h2 className="font-display text-display-sm font-light text-ink">
                  Reach the studio
                </h2>

                <div className="mt-8 space-y-8">
                  <div>
                    <p className="text-[0.64rem] uppercase tracking-[0.2em] text-sage">
                      Our address
                    </p>
                    <address className="mt-2.5 not-italic text-sm leading-relaxed text-ink-muted">
                      {contact.address.line1}
                      <br />
                      {contact.address.line2}
                      <br />
                      {contact.address.city} – {contact.address.postcode}
                      <br />
                      {contact.address.country}
                    </address>
                    <p className="mt-2 text-xs text-sage">
                      {contact.address.note}
                    </p>
                    <a
                      href={contact.mapHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group mt-3 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-forest transition-colors duration-500 hover:text-forest-secondary"
                    >
                      <MapPin className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                      View on map
                      <ArrowUpRight
                        className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  </div>

                  <div>
                    <p className="text-[0.64rem] uppercase tracking-[0.2em] text-sage">
                      Our mailbox
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {Object.values(contact.emails).map((email) => (
                        <li key={email}>
                          <a
                            href={`mailto:${email}`}
                            className="link-underline text-sm text-ink-muted transition-colors hover:text-ink"
                          >
                            {email}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2.5 text-xs leading-relaxed text-sage">
                      The current site lists all four addresses. Confirm which
                      should be public before launch.
                    </p>
                  </div>

                  <div>
                    <p className="text-[0.64rem] uppercase tracking-[0.2em] text-sage">
                      Contact numbers
                    </p>
                    <ul className="mt-2.5 space-y-1.5">
                      {contact.phones.map((phone) => (
                        <li key={phone.href}>
                          <a
                            href={phone.href}
                            className="link-underline inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
                          >
                            <Phone className="h-3.5 w-3.5 text-sage" strokeWidth={1.5} aria-hidden="true" />
                            {phone.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-[0.64rem] uppercase tracking-[0.2em] text-sage">
                      Also find us
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {social.map((item) => (
                        <li key={item.label}>
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="inline-flex items-center gap-1.5 border border-forest/15 px-3.5 py-2 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors duration-500 hover:border-forest hover:text-forest"
                          >
                            {item.label}
                            <ArrowUpRight className="h-3 w-3" strokeWidth={1.5} aria-hidden="true" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Form */}
            <div className="col-span-12 lg:col-span-7 lg:col-start-6">
              <Reveal delay={100}>
                <ContactForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Other locations */}
      <section className="relative bg-ivory py-[clamp(3rem,6vw,6rem)]">
        <div className="shell">
          <Reveal>
            <div className="grid gap-px border border-line bg-line sm:grid-cols-2">
              {contact.additionalLocations.map((location) => (
                <div key={location.label} className="bg-ivory p-8 lg:p-10">
                  <p className="text-[0.64rem] uppercase tracking-[0.2em] text-sage">
                    {location.label}
                  </p>
                  <p className="mt-3 font-display text-2xl leading-snug text-ink">
                    {location.value}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative bg-ivory-soft py-[clamp(3.5rem,7vw,7rem)]">
        <div className="shell">
          <Reveal>
            <h2 className="border-b border-line pb-4 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink">
              What do people say about ANJ?
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {verifiedTestimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={index * 90}>
                <figure>
                  <blockquote className="text-[0.95rem] leading-relaxed text-ink-muted">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-5 border-t border-line pt-4">
                    <p className="font-display text-lg text-ink">
                      {testimonial.name}
                    </p>
                    {testimonial.location && (
                      <p className="mt-0.5 text-[0.66rem] uppercase tracking-[0.16em] text-sage">
                        {testimonial.location}
                      </p>
                    )}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-12">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 border-b border-forest/25 pb-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-forest transition-colors duration-500 hover:border-forest"
            >
              Browse the portfolio
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
