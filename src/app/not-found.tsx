import Link from "next/link";
import type { Metadata } from "next";

import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Page not found — ANJ Designs",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[86svh] items-center overflow-hidden bg-forest">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140' viewBox='0 0 140 140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary/25 blur-3xl"
      />

      <div className="shell relative py-32 text-center">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-champagne">
          404
        </p>
        <h1 className="mt-6 font-display text-display-lg font-light text-ivory-soft">
          This space has not been{" "}
          <span className="display-italic text-champagne">designed yet.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-lg text-body-lg text-ivory/65">
          The page you were looking for does not exist — or it has moved. Let&apos;s
          get you back to something worth seeing.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn bg-ivory-soft text-forest-deep transition-colors duration-500 hover:bg-champagne"
          >
            Back to home
          </Link>
          <Link
            href="/projects"
            className="btn border border-ivory/30 text-ivory-soft transition-colors duration-500 hover:border-ivory-soft hover:bg-ivory-soft hover:text-forest-deep"
          >
            Explore the portfolio
          </Link>
        </div>

        <div className="mx-auto mt-16 max-w-2xl border-t border-ivory/12 pt-8">
          <p className="text-[0.64rem] uppercase tracking-[0.2em] text-ivory/55">
            Or jump straight to a project
          </p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {projects.slice(0, 6).map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="link-underline text-sm text-ivory/65 transition-colors hover:text-ivory-soft"
                >
                  {project.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
