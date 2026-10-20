import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: "#102820",
          deep: "#0B1C16",
          emerald: "#204C3C",
          secondary: "#315C49",
        },
        sage: {
          /**
           * Darkened from #849B80 to pass WCAG AA (4.5:1) against the ivory
           * and soft-white surfaces it labels. The original value is kept as
           * `sage.light` for decorative use on dark backgrounds.
           */
          DEFAULT: "#5A705C",
          light: "#849B80",
          soft: "#A7B2AA",
          pale: "#C3CFC2",
        },
        ivory: {
          DEFAULT: "#F1F0E8",
          soft: "#FAFAF6",
          deep: "#E4E3D7",
        },
        champagne: {
          DEFAULT: "#C0A878",
          light: "#DCC79B",
          dark: "#9A8154",
        },
        ink: {
          DEFAULT: "#202720",
          muted: "#4A554D",
        },
        line: "rgba(16, 40, 32, 0.14)",
        "line-dark": "rgba(241, 240, 232, 0.16)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Manrope", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(3.25rem, 12vw, 11rem)", { lineHeight: "0.86", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.75rem, 8.2vw, 7.25rem)", { lineHeight: "0.9", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(2.15rem, 5.4vw, 4.5rem)", { lineHeight: "0.98", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.75rem, 3.6vw, 3rem)", { lineHeight: "1.04", letterSpacing: "-0.015em" }],
        "display-xs": ["clamp(1.35rem, 2.3vw, 1.9rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        eyebrow: ["0.6875rem", { lineHeight: "1.2", letterSpacing: "0.24em" }],
        "eyebrow-lg": ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.2em" }],
        "body-lg": ["clamp(1.0625rem, 1.25vw, 1.25rem)", { lineHeight: "1.65" }],
        "body-md": ["1rem", { lineHeight: "1.7" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.7" }],
      },
      spacing: {
        gutter: "clamp(1.25rem, 5vw, 6rem)",
        "section-y": "clamp(4.5rem, 10vw, 11rem)",
        "section-y-sm": "clamp(3.25rem, 6.5vw, 7rem)",
      },
      maxWidth: {
        shell: "96rem",
        prose: "42rem",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
        "editorial-in": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
      transitionDuration: {
        "600": "600ms",
        "900": "900ms",
        "1200": "1200ms",
      },
      keyframes: {
        "marquee-x": {
          from: { transform: "translate3d(0,0,0)" },
          to: { transform: "translate3d(-50%,0,0)" },
        },
        "scroll-hint": {
          "0%": { transform: "scaleY(0)", transformOrigin: "top" },
          "45%": { transform: "scaleY(1)", transformOrigin: "top" },
          "55%": { transform: "scaleY(1)", transformOrigin: "bottom" },
          "100%": { transform: "scaleY(0)", transformOrigin: "bottom" },
        },
      },
      animation: {
        marquee: "marquee-x 38s linear infinite",
        "scroll-hint": "scroll-hint 2.6s cubic-bezier(0.76,0,0.24,1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
