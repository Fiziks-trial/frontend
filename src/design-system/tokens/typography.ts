// Typography Tokens
// Font families, sizes, weights, and line heights

export const typography = {
  fontFamily: {
    display: "var(--font-family-display)",
    sans: "var(--font-family-sans)",
    mono: "var(--font-family-mono)",
  },
  fontSize: {
    xs: "var(--font-size-xs)",
    sm: "var(--font-size-sm)",
    base: "var(--font-size-base)",
    lg: "var(--font-size-lg)",
    xl: "var(--font-size-xl)",
    "2xl": "var(--font-size-2xl)",
    "3xl": "var(--font-size-3xl)",
    "4xl": "var(--font-size-4xl)",
    "5xl": "var(--font-size-5xl)",
    "6xl": "var(--font-size-6xl)",
    "7xl": "var(--font-size-7xl)",
    "8xl": "var(--font-size-8xl)",
    "9xl": "var(--font-size-9xl)",
  },
  fontWeight: {
    normal: "var(--font-weight-normal)",
    medium: "var(--font-weight-medium)",
    semibold: "var(--font-weight-semibold)",
    bold: "var(--font-weight-bold)",
    extrabold: "var(--font-weight-extrabold)",
  },
  lineHeight: {
    none: "1",
    tight: "var(--line-height-tight)",
    snug: "var(--line-height-snug)",
    normal: "var(--line-height-normal)",
    relaxed: "var(--line-height-relaxed)",
  },
  letterSpacing: {
    tighter: "var(--letter-spacing-tighter)",
    tight: "var(--letter-spacing-tight)",
    normal: "var(--letter-spacing-normal)",
    wide: "var(--letter-spacing-wide)",
    wider: "var(--letter-spacing-wider)",
    widest: "var(--letter-spacing-widest)",
  },
} as const;
