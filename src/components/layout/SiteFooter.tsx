import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

import { contact, navigation, site, social } from "@/data/site";
import { services } from "@/data/services";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-forest text-ivory-soft">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-champagne/50 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-secondary/25 blur-3xl"
      />

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
          </div>

          {/* Navigation */}
          <nav className="col-span-6 md:col-span-4 lg:col-span-2" aria-label="Footer">
            <h2 className="eyebrow eyebrow-light">Navigate</h2>
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
            <h2 className="eyebrow eyebrow-light">Expertise</h2>
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
            <h2 className="eyebrow eyebrow-light">Contact</h2>
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
        <div className="mt-20 border-t border-ivory/12 pt-10">
          <p className="max-w-3xl font-display text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.08] text-ivory/90">
            &ldquo;Where{" "}
            <span className="display-italic text-champagne">designs</span> become
            reality.&rdquo;
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ivory/12 pt-8 text-xs text-ivory/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.fullName}. All rights reserved.
          </p>
          <p className="max-w-xl leading-relaxed">
            {contact.additionalLocations[0].label}: {contact.additionalLocations[0].value}
            <br />
            {contact.additionalLocations[1].label}: {contact.additionalLocations[1].value}
          </p>
        </div>
      </div>
    </footer>
  );
}
