import Media from "@/components/ui/Media";
import BackgroundVideo from "@/components/ui/BackgroundVideo";

/**
 * Inner-page hero.
 *
 * A consistent, full-bleed photographic opener with the page title composed
 * over it. Used by About, Services, Projects and Contact so the interior
 * pages feel like one publication.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
  film,
  stat,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  /** The background film for this page, if it has one. */
  film?: {
    poster: string;
    desktopSrc: string;
    mobileSrc: string;
  };
  stat?: { value: string; label: string };
}) {
  return (
    <section
      className="relative isolate flex min-h-[78svh] items-end overflow-hidden bg-forest"
      aria-labelledby="page-title"
    >
      {film ? (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <BackgroundVideo
            poster={film.poster}
            posterAlt={imageAlt}
            desktopSrc={film.desktopSrc}
            mobileSrc={film.mobileSrc}
            sizes="100vw"
          />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="hero-scale absolute inset-0">
            <Media
              src={image}
              alt={imageAlt}
              width={imageWidth}
              height={imageHeight}
              sizes="100vw"
              priority
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
      )}

      <div
        aria-hidden="true"
        className="hero-veil absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(11,28,22,.8)_0%,rgba(11,28,22,.42)_40%,rgba(11,28,22,.92)_100%)]"
      />

      <div className="shell pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="grid-12 items-end gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <p
              className="hero-fade flex items-center gap-3 text-[0.66rem] font-medium uppercase tracking-[0.3em] text-champagne"
              style={{ animationDelay: "200ms" }}
            >
              <span aria-hidden="true" className="h-px w-10 bg-champagne/70" />
              {eyebrow}
            </p>

            <h1
              id="page-title"
              className="mt-7 font-display text-display-lg font-light leading-[0.96] text-ivory-soft"
            >
              <span className="block overflow-hidden">
                <span className="hero-line block" style={{ animationDelay: "300ms" }}>
                  {title}
                </span>
              </span>
            </h1>

            {intro && (
              <p
                className="hero-rise mt-7 max-w-xl text-body-lg text-ivory/70"
                style={{ animationDelay: "520ms" }}
              >
                {intro}
              </p>
            )}
          </div>

          {stat && (
            <div className="col-span-12 lg:col-span-3 lg:col-start-10">
              <div
                className="hero-fade border-l border-champagne/40 pl-6"
                style={{ animationDelay: "700ms" }}
              >
                <p className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-light leading-none text-ivory-soft">
                  {stat.value}
                </p>
                <p className="mt-2 text-[0.66rem] uppercase tracking-[0.2em] text-ivory/55">
                  {stat.label}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
