import { cn } from "@/lib/utils";

/**
 * The belief band.
 *
 * A full-bleed typographic interlude that runs the studio's own belief line
 * across the page in oversized display type. Two rows move in opposite
 * directions, and every second repetition is rendered as an outline so the
 * band has depth without needing a single extra colour.
 */
export default function BeliefBand({
  line,
  tone = "dark",
  className,
}: {
  line: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const dark = tone === "dark";

  const Row = ({
    text,
    reverse,
    outline,
  }: {
    text: string;
    reverse?: boolean;
    outline?: boolean;
  }) => (
    <div
      className={cn(
        "marquee-track",
        reverse ? "animate-marquee-reverse" : "animate-marquee"
      )}
    >
      {[0, 1].map((copy) => (
        <div key={copy} className="flex shrink-0 items-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <span
              key={index}
              className={cn(
                "whitespace-nowrap px-[0.2em] font-display text-[clamp(2.5rem,7.4vw,7.25rem)] font-light leading-[0.95] tracking-[-0.03em]",
                outline
                  ? "text-transparent"
                  : dark
                    ? "text-ivory/85"
                    : "text-forest/85"
              )}
              style={
                outline
                  ? {
                      WebkitTextStroke: "1.5px rgba(192,168,120,.95)",
                    }
                  : undefined
              }
            >
              {text}
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <section
      aria-label={line}
      className={cn(
        "relative overflow-hidden border-y py-10 md:py-14",
        dark
          ? "border-ivory/12 bg-forest-deep"
          : "border-forest/12 bg-ivory-deep/60",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="marquee-mask pointer-events-none flex flex-col gap-y-1"
      >
        <Row text={line} />
        <Row text={line} reverse outline />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: dark
            ? "radial-gradient(60% 130% at 50% 50%, transparent 0%, rgba(11,28,22,.6) 100%)"
            : "radial-gradient(60% 130% at 50% 50%, transparent 0%, rgba(228,227,215,.65) 100%)",
        }}
      />
    </section>
  );
}
