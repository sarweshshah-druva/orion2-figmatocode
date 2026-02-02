/**
 * Primitive spacing tokens: spacers and border radii
 * Token names match Figma (spacer-1 … spacer-20, radius-none … radius-full).
 */

export const spacers = {
  "spacer-none": "0",
  "spacer-1": "2px",
  "spacer-2": "4px",
  "spacer-3": "6px",
  "spacer-4": "8px",
  "spacer-5": "12px",
  "spacer-6": "16px",
  "spacer-7": "20px",
  "spacer-8": "24px",
  "spacer-9": "28px",
  "spacer-10": "32px",
  "spacer-11": "36px",
  "spacer-12": "40px",
  "spacer-13": "48px",
  "spacer-14": "56px",
  "spacer-15": "64px",
  "spacer-16": "72px",
  "spacer-17": "96px",
  "spacer-18": "128px",
  "spacer-19": "192px",
  "spacer-20": "256px",
} as const;

export const radii = {
  "radius-none": "0",
  "radius-2xs": "1px",
  "radius-xs": "2px",
  "radius-sm": "4px",
  "radius-md": "8px",
  "radius-lg": "12px",
  "radius-xl": "16px",
  "radius-2xl": "20px",
  "radius-3xl": "24px",
  "radius-full": "9999px",
} as const;
