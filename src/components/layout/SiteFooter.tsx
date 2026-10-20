import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { contact, navigation, site, social } from "@/data/site";
import { services } from "@/data/services";
import StudioClock from "@/components/ui/StudioClock";
import { SheetGrid } from "@/components/ui/Sheet";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest text-ivory-soft">
      <SheetGrid tone="dark" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-secondary/25 blur-3xl"
      />
      <div aria-hidden="true" className="grain-layer" />

      <div className="shell relative py-20 md:py-28">
        <div className="grid-12 gap-y-14">
          {/* Brand */}
          <div className="col-span-6 md:col-span-4 lg:col-span-4">
            <Link
              href="/"
              className="relative block w-[11.5rem]"
              aria-label="ANJ Designs by Decor Inn — home"
            >
              <Image
                src="/assets/brand/anj-logo-white.png"
                alt="ANJ Designs by Decor Inn"
                width={686}
                height={147}
                sizes="184px"
                className="h-auto w-full"
              />
            </Link>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-ivory/60">
              {site.fullName} — interior design, architectural design, bespoke
              furniture design and manufacturing, and turnkey interior projects.
            </p>
            <p className="mt-5 font-display text-xl italic text-ivory/85">
              {site.belief}
            </p>
            <p className="mt-7 flex items-baseline gap-3 border-t border-ivory/12 pt-5">
              <span className="meta text-ivory/40">Studio time</span>
              <StudioClock className="meta text-champagne" />
            </p>
          </div>

          {/* Navigation */}
          <nav className="col-span-6 md:col-span-4 lg:col-span-2" aria-label="Footer">
            <h2 className="meta text-champagne">Navigate</h2>
            <ul className="mt-6 space-y-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline inline-block py-1 text-[0.9375rem] text-ivory/75 transition-colors hover:text-ivory-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav
            className="col-span-6 md:col-span-4 lg:col-span-2"
            aria-label="Services"
          >
            <h2 className="meta text-champagne">Expertise</h2>
            <ul className="mt-6 space-y-1">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={`/services#${service.id}`}
                    className="link-underline inline-block py-1 text-[0.9375rem] text-ivory/75 transition-colors hover:text-ivory-soft"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="col-span-6 md:col-span-6 lg:col-span-4">
            <h2 className="meta text-champagne">Contact</h2>
            <ul className="mt-6 space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${contact.emails.primary}`}
                  className="group flex items-start gap-3 text-ivory/75 transition-colors hover:text-ivory-soft"
                >
                  <Mail
                    className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                    strokeWidth={1.5}
                  />
                  {contact.emails.primary}
                </a>
              </li>
              {contact.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="group flex items-start gap-3 text-ivory/75 transition-colors hover:text-ivory-soft"
                  >
                    <Phone
                      className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                      strokeWidth={1.5}
                    />
                    {phone.label}
                  </a>
                </li>
              ))}
              <li className="flex items-start gap-3 text-ivory/75">
                <MapPin
                  className="mt-0.5 h-4 w-4 shrink-0 text-champagne"
                  strokeWidth={1.5}
                />
                <span>
                  {contact.address.line1}
                  <br />
                  {contact.address.line2}
                  <br />
                  {contact.address.city} – {contact.address.postcode}
                </span>
              </li>
            </ul>

            <ul className="mt-8 flex flex-wrap gap-3">
              {social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1.5 border border-ivory/20 px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.16em] text-ivory/70 transition-colors duration-500 hover:border-champagne hover:text-champagne"
                  >
                    {item.label}
                    <ArrowUpRight
                      className="h-3 w-3 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={1.5}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing statement */}
        <div className="mt-20 grid gap-10 border-t border-ivory/12 pt-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="font-display text-[clamp(1.9rem,4.6vw,4rem)] leading-[1.04] text-ivory/90">
              &ldquo;Where{" "}
              <span className="display-italic text-champagne">designs</span> become
              reality.&rdquo;
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="#top"
              className="group inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ivory/60 transition-colors duration-500 hover:text-champagne"
            >
              <ArrowUp
                className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              Back to top
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-ivory/12 pt-8 text-xs text-ivory/50 md:flex-row md:items-start md:justify-between">
          <p>
            © {year} {site.fullName}. All rights reserved.
          </p>
          <dl className="grid gap-4 sm:grid-cols-2 sm:gap-x-10">
            {contact.additionalLocations.map((location) => (
              <div key={location.label}>
                <dt className="meta text-ivory/35">{location.label}</dt>
                <dd className="mt-1.5 leading-relaxed">{location.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </footer>
  );
}
