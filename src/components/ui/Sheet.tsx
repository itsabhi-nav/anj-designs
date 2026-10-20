import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Drawing-set furniture.
 *
 * The site reads like a set of architectural sheets: every major section is
 * numbered, carries technical metadata, and sits on a hairline column grid.
 * These primitives provide that language without adding visual noise.
 */

/** The hairline column grid that sits behind a section. */
export function SheetGrid({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "sheet-grid absolute inset-0",
        tone === "dark" && "sheet-grid-light"
      )}
    />
  );
}

/** The sheet marker: a number, a rule and an optional technical note. */
export function SheetMarker({
  number,
  label,
  note,
  tone = "light",
  className,
}: {
  number: string;
  label: string;
  note?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline gap-4", className)}>
      <span
        className={cn(
          "meta",
          tone === "dark" ? "text-champagne" : "text-champagne-dark"
        )}
      >
        {number}
      </span>
      <span
        className={cn(
          "meta",
          tone === "dark" ? "meta-light" : "meta-dark"
        )}
      >
        {label}
      </span>
      {note && (
        <>
          <span
            aria-hidden="true"
            className={cn(
              "h-px flex-1",
              tone === "dark" ? "bg-ivory/15" : "bg-forest/12"
            )}
          />
          <span
            className={cn(
              "meta",
              tone === "dark" ? "text-ivory/55" : "text-ink/40"
            )}
          >
            {note}
          </span>
        </>
      )}
    </div>
  );
}

/**
 * The section header used across the site: a sheet marker, a large display
 * title and an optional lede. Replaces the ad-hoc heading blocks so every
 * section shares the same rhythm.
 */
export function SheetHeading({
  number,
  label,
  title,
  lede,
  tone = "light",
  align = "left",
  className,
}: {
  number: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative",
        align === "center" && "mx-auto max-w-3xl text-center",
        className
      )}
    >
      <SheetMarker
        number={number}
        label={label}
        tone={tone}
        className={cn(
          "mb-8",
          align === "center" && "justify-center"
        )}
      />
      <h2
        className={cn(
          "font-display text-display-md font-light",
          tone === "dark" ? "text-ivory-soft" : "text-ink"
        )}
      >
        {title}
      </h2>
      {lede && (
        <p
          className={cn(
            "mt-6 max-w-xl text-body-md",
            tone === "dark" ? "text-ivory/60" : "text-ink-muted",
            align === "center" && "mx-auto"
          )}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/** A horizontal rule that draws itself when the section arrives. */
export function Rule({ tone = "light" }: { tone?: "light" | "dark" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "h-px w-full",
        tone === "dark" ? "bg-ivory/12" : "bg-forest/12"
      )}
    />
  );
}
