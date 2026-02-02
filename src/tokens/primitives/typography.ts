/**
 * Primitive typography tokens
 * Font families, weights, sizes, line heights, letter spacing.
 * Semantic text styles (title, headings, body, captions, metrics) compose these.
 */

export const fontFamily = {
  text: '"IBM Plex Sans", system-ui, sans-serif',
  metric: '"Barlow", system-ui, sans-serif',
} as const;

export const fontWeight = {
  thin: 100,
  "extra-light": 200,
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  "extra-bold": 800,
  black: 900,
} as const;

export const fontSize = {
  "2xs": "10px",
  xs: "11px",
  sm: "12px",
  md: "14px",
  lg: "16px",
  xl: "18px",
  "2xl": "20px",
  "3xl": "24px",
  "4xl": "28px",
  "5xl": "32px",
  "6xl": "40px",
} as const;

export const lineHeight = {
  none: 1,
  tighter: 1.1,
  tight: 1.25,
  snug: 1.35,
  normal: 1.5,
  relaxed: 1.75,
  loose: 2,
} as const;

export const letterSpacing = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
} as const;
