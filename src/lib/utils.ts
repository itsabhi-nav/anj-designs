export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Formats a phone number for an href attribute. */
export function telHref(display: string): string {
  return `tel:${display.replace(/[^+\d]/g, "")}`;
}

/**
 * Replaces hyphens with a non-breaking hyphen (U+2011) so an oversized display
 * heading never breaks across a compound name such as "DLF Phase-1 Gurugram".
 * The rendered result is identical; only the character differs.
 */
export function nonBreakingHyphens(value: string): string {
  return value.replace(/-/g, "‑");
}
