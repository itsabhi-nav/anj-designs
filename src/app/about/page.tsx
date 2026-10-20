import type { Metadata } from "next";

import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";
import Media from "@/components/ui/Media";
import Reveal from "@/components/motion/Reveal";
import SplitLines from "@/components/motion/SplitLines";
import { SheetGrid, SheetMarker } from "@/components/ui/Sheet";
import Button from "@/components/ui/Button";
import PageHero from "@/components/layout/PageHero";
import Values from "@/components/home/Values";
import ClosingCta from "@/components/home/ClosingCta";

export const metadata: Metadata = pageMetadata({
  title: "About Us — Design with depth, create with purpose",
  description:
    "The story of ANJ Designs by Decor Inn: a founder-led design studio in New Delhi creating interiors and bespoke furniture with empathy, vision, honesty and consciousness.",
  path: "/about",
});

/** Company history, kept deliberately neutral where the sources disagree. */
const TIMELINE = [
  {
    year: "2006",
    title: "Into the business of design",
    copy: "Annie Nagpal Jain begins working in luxurious interior design and bespoke furniture.",
  },
  {
    year: "2010",
    title: "Decor Inn is founded",
    copy: "Decor Inn gallery is started in Chandigarh, producing luxury furniture for homes and offices.",
  },
  {
    year: "2016 – 2017",
    title: "The venture becomes ANJ Designs",
    copy: "Decor Inn is established as Annie Nagpal Jain's own venture, with a dedicated manufacturing setup and highly skilled handwork artisans. The original site records 2016; the company portfolio records 2017.",
    note: true,
  },
  {
    year: "Today",
    title: "A studio for interiors, furniture and turnkey work",
    copy: "ANJ Designs by Decor Inn delivers interior and architectural design, bespoke furniture and complete turnkey projects from New Delhi, with production in Panchkula, Haryana.",
  },
];

const PRINCIPLES = [
  {
    title: "A client-centric approach",
    copy: "We believe in collaboration. You'll be an integral part of the journey — from the first conversation to the final installation.",
  },
  {
    title: "Design thinking",
    copy: "Our team fuses design principles with strategic thinking to craft solutions that are not just beautiful, but effective.",
  },
  {
    title: "Furniture expertise",
    copy: "Bespoke furniture, wall panels and decorative elements are designed and made in-house, so the joinery belongs to the space it sits in.",
  },
  {
    title: "Production capability",
    copy: "An in-house production facility in Panchkula, Haryana with machine manufacturing and expertly handcrafted finishes.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About ANJ Designs"
        title="Design with depth. Create with purpose."
        intro="A founder-led studio in New Delhi, making interiors and bespoke furniture for people who intend to live in them for a long time."
        image="/assets/craft/workshop/workshop-decorinn-01.webp"
        imageAlt="A Decor Inn craftsman shaping a furniture component in the production unit"
        imageWidth={1600}
        imageHeight={951}
        portraitSrc="/assets/hero-crops/workshop.webp"
        portraitWidth={713}
        portraitHeight={951}
        stat={{ value: "22,500", label: "Sq ft production unit, Panchkula" }}
      />

      {/* Company story */}
      <section className="relative bg-ivory-soft py-[clamp(4.5rem,10vw,10rem)]">
        <SheetGrid />
        <div className="shell relative">
          <div className="grid-12 gap-y-12">
            <div className="col-span-12 lg:col-span-5">
              <Reveal>
                <SheetMarker
                  number="01"
                  label="The studio"
                  note="Est. 2010"
                  className="mb-10"
                />
                <h2 className="font-display text-display-md font-light text-ink">
                  <SplitLines text="From a simple idea to a creative studio" />
                </h2>
              </Reveal>

              <Reveal delay={120} className="mt-8 space-y-5 text-body-md text-ink-muted">
                <p>
                  Back in 2010, Annie Nagpal Jain turned a simple idea into a
                  design journey — creating interiors that go beyond beauty to
                  truly enhance the way people live. From those beginnings, Decor
                  Inn has grown into a creative studio known for bold concepts,
                  meticulous detailing, and a love for craftsmanship.
                </p>
                <p>
                  Our Panchkula workshop is where imagination meets skill,
                  producing one-of-a-kind furniture, signature wall panels, and
                  bespoke décor accents. Every piece is crafted to spark
                  inspiration, blending artistry with quality that stands the
                  test of time.
                </p>
                <p>
                  Today the studio works across residential and commercial
                  properties, houses, restaurants, cafés, schools, banks, hotels
                  and offices — in India and abroad.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-10">
                  <Button href="/projects" variant="outline" arrow="up-right">
                    See the work
                  </Button>
                </div>
              </Reveal>
            </div>

            {/* Timeline */}
            <div className="col-span-12 lg:col-span-6 lg:col-start-7">
              <Reveal delay={100}>
                <ol className="border-t border-line">
                  {TIMELINE.map((item) => (
                    <li
                      key={item.year}
                      className="grid grid-cols-1 gap-2 border-b border-line py-7 sm:grid-cols-12 sm:gap-6"
                    >
                      <p className="font-display text-xl text-forest sm:col-span-3">
                        {item.year}
                      </p>
                      <div className="sm:col-span-9">
                        <h3 className="text-[0.95rem] font-semibold tracking-wide text-ink">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                          {item.copy}
                        </p>
                        {item.note && (
                          <p className="mt-3 border-l-2 border-champagne pl-3 text-[0.78rem] leading-relaxed text-sage">
                            Date to be confirmed — the original site states 2016
                            and the company portfolio states 2017. Both are
                            recorded here rather than resolved silently.
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & mission */}
      <section className="relative overflow-hidden bg-forest py-[clamp(4.5rem,10vw,9rem)]">
        <SheetGrid tone="dark" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-1/4 h-[32rem] w-[32rem] rounded-full bg-secondary/25 blur-3xl"
        />
        <div aria-hidden="true" className="grain-layer" />
        <div className="shell relative">
          <Reveal>
            <SheetMarker
              number="02"
              label="Vision & mission"
              note="Published by the studio"
              tone="dark"
              className="mb-14"
            />
          </Reveal>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <article className="border-t border-ivory/20 pt-8">
                <p className="meta text-champagne">Our vision</p>
                <p className="mt-5 font-display text-2xl leading-snug text-ivory-soft sm:text-3xl">
                  “Our vision is to lead the interior design and fit-out industry
                  as the trusted partner of choice. We aim to shape inspiring
                  and sustainable spaces, deliver every project with
                  uncompromising quality, and build lasting relationships founded
                  on trust, collaboration, and excellence.”
                </p>
              </article>
            </Reveal>

            <Reveal delay={120}>
              <article className="border-t border-ivory/20 pt-8">
                <p className="meta text-champagne">Our mission</p>
                <p className="mt-5 font-display text-2xl leading-snug text-ivory-soft sm:text-3xl">
                  “Our purpose is to design spaces that feel personal, timeless,
                  and uplifting. Every project is driven by a balance of innovation
                  and functionality, with creativity, sustainability, and client
                  care at the heart of our process. By listening closely and
                  tailoring every detail, we create environments that celebrate
                  individuality and bring our clients&apos; dreams to life.”
                </p>
              </article>
            </Reveal>
          </div>

          <Reveal delay={180} className="mt-14">
            <div className="relative aspect-[16/6] min-h-[16rem] overflow-hidden">
              <Media
                src="/assets/about/group-47814.png"
                alt="Architectural interior corridor designed by ANJ Designs"
                width={1466}
                height={673}
                sizes="100vw"
                className="h-full w-full object-cover opacity-70"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="relative bg-ivory py-[clamp(4.5rem,10vw,10rem)]">
        <div className="shell">
          <div className="grid-12 items-center gap-y-12">
            <div className="col-span-12 md:col-span-5 lg:col-span-4">
              <Reveal>
                <figure className="relative aspect-[3/4] overflow-hidden bg-ivory-deep">
                  <Media
                    src="/assets/founder/annie-nagpal-jain.webp"
                    alt="Annie Nagpal Jain, founder of ANJ Designs by Decor Inn"
                    width={405}
                    height={540}
                    sizes="(max-width: 768px) 100vw, 34vw"
                    className="h-full w-full object-cover"
                  />
                </figure>
              </Reveal>
            </div>

            <div className="col-span-12 md:col-span-7 lg:col-span-7 lg:col-start-6">
              <Reveal delay={90}>
                <SheetMarker
                  number="03"
                  label="The founder"
                  note="Annie Nagpal Jain"
                  className="mb-10"
                />
                <h2 className="font-display text-display-md font-light text-ink">
                  Annie Nagpal Jain
                </h2>
                <p className="mt-3 meta text-sage">
                  Founder of ANJ Designs by Decor Inn
                </p>
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-8 space-y-5 text-body-md text-ink-muted">
                  <p>
                    It is a great pleasure to introduce Annie Jain, who is in the
                    business of luxurious bespoke residential furniture of all
                    kinds and in all diverse materials and finishes under the
                    brand Décor Inn. She is a qualified interior designer with a
                    specialisation in furniture design, and masters in enhancing
                    complete design aesthetics in interiors from NIFD, Chandigarh.
                    She is a certified vaastu expert from Bhawan Vidyalaya,
                    Chandigarh.
                  </p>
                  <p>
                    She has spent 19+ years in the field of design and has worked
                    with various design firms in the initial stages of her
                    profession, leading numerous projects ranging from houses,
                    restaurants, cafés, schools, hotels and offices.
                  </p>
                  <p>
                    Born in Chandigarh, she did her schooling at the Convent of
                    Jesus and Mary, Waverly, Mussoorie, and completed her higher
                    studies in Chandigarh. She has been married since 2007 and
                    lives in Gurgaon, with her husband Kabir Jain and their two
                    daughters, Azeera and Anaaz.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <dl className="mt-10 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
                  <div>
                    <dt className="text-[0.64rem] uppercase tracking-[0.2em] text-sage">
                      Creative head
                    </dt>
                    <dd className="mt-1.5 font-display text-xl text-ink">
                      Annie Nagpal Jain
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.64rem] uppercase tracking-[0.2em] text-sage">
                      Senior interior designer
                    </dt>
                    <dd className="mt-1.5 font-display text-xl text-ink">
                      Rukaiya Bano
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.64rem] uppercase tracking-[0.2em] text-sage">
                      Interior designer
                    </dt>
                    <dd className="mt-1.5 font-display text-xl text-ink">
                      Sana
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.64rem] uppercase tracking-[0.2em] text-sage">
                      Production unit
                    </dt>
                    <dd className="mt-1.5 font-display text-xl text-ink">
                      Panchkula, Haryana
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Values />

      {/* Approach & craftsmanship */}
      <section className="relative bg-ivory-soft py-[clamp(4.5rem,10vw,10rem)]">
        <SheetGrid />
        <div className="shell relative">
          <Reveal>
            <div className="max-w-3xl">
              <SheetMarker
                number="05"
                label="Approach & craftsmanship"
                note="Four principles"
                className="mb-10"
              />
              <h2 className="font-display text-display-md font-light text-ink">
                How a project is{" "}
                <span className="display-italic text-forest-secondary">
                  actually run
                </span>
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
            {PRINCIPLES.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 70} className="bg-ivory-soft">
                <div className="h-full p-8 lg:p-10">
                  <p className="text-[0.62rem] uppercase tracking-[0.24em] text-champagne">
                    0{index + 1}
                  </p>
                  <h3 className="mt-4 font-display text-2xl font-light text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-3.5 text-sm leading-relaxed text-ink-muted">
                    {principle.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-16">
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-5">
                <p className="font-display text-display-sm font-light text-ink">
                  “We sweat the small stuff and celebrate the big wins.”
                </p>
                <p className="mt-5 max-w-md text-body-md text-ink-muted">
                  Detail-driven excellence is not a slogan here — it is the
                  reason a wardrobe is built to a millimetre, a wall panel is
                  finished by hand, and a handover happens with everything
                  exactly where it belongs.
                </p>
                <div className="mt-8">
                  <Button href="/contact" arrow="up-right">
                    Discuss a project
                  </Button>
                </div>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <div className="relative aspect-[4/3] overflow-hidden bg-ivory-deep">
                  <Media
                    src="/assets/craft/handcrafted-work/handcrafted-decor-01.webp"
                    alt="Handcrafted furniture detail made in the Decor Inn workshop"
                    width={776}
                    height={552}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingCta />

      <p className="sr-only">{site.fullName}</p>
    </>
  );
}
