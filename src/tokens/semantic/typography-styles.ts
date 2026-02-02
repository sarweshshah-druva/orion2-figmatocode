/**
 * Semantic typography styles
 * Composed from primitive font family, size, weight, line height, letter spacing.
 * Figma uses slashes (e.g. headings/small); we use dots for JS keys.
 */

import {
  fontFamily,
  fontWeight,
  fontSize,
  lineHeight,
  letterSpacing,
} from "../primitives/typography";

export type TextStyle = {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: string;
};

export const typographyStyles: Record<string, TextStyle> = {
  // Title
  "title.display": {
    fontFamily: fontFamily.text,
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.tight,
  },

  // Headings
  "headings.xx-large": {
    fontFamily: fontFamily.text,
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: 1.5,
    letterSpacing: letterSpacing.normal,
  },
  "headings.x-large": {
    fontFamily: fontFamily.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  "headings.large": {
    fontFamily: fontFamily.text,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  "headings.medium": {
    fontFamily: fontFamily.text,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
  },
  "headings.small": {
    fontFamily: fontFamily.text,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tighter,
    letterSpacing: letterSpacing.normal,
  },

  // Body
  "body.large": {
    fontFamily: fontFamily.text,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.normal,
    letterSpacing: letterSpacing.normal,
  },
  "body.medium": {
    fontFamily: fontFamily.text,
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  "body.medium-strong": {
    fontFamily: fontFamily.text,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  "body.small": {
    fontFamily: fontFamily.text,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
  },
  "body.small-strong": {
    fontFamily: fontFamily.text,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
  },

  // Captions
  "captions.x-small": {
    fontFamily: fontFamily.text,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.tighter,
    letterSpacing: letterSpacing.normal,
  },
  "captions.xx-small": {
    fontFamily: fontFamily.text,
    fontSize: fontSize["2xs"],
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.none,
    letterSpacing: letterSpacing.normal,
  },

  // Metrics (Barlow)
  "metrics.xx-large": {
    fontFamily: fontFamily.metric,
    fontSize: fontSize["3xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.loose,
    letterSpacing: letterSpacing.normal,
  },
  "metrics.x-large": {
    fontFamily: fontFamily.metric,
    fontSize: fontSize["2xl"],
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.relaxed,
    letterSpacing: letterSpacing.normal,
  },
  "metrics.large": {
    fontFamily: fontFamily.metric,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
  },
  "metrics.medium": {
    fontFamily: fontFamily.metric,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.snug,
    letterSpacing: letterSpacing.normal,
  },
  "metrics.small": {
    fontFamily: fontFamily.metric,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
    lineHeight: lineHeight.tight,
    letterSpacing: letterSpacing.normal,
  },
};
