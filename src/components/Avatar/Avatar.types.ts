/**
 * Avatar – Orion v2.0 (Figma node 67-2956).
 * Prop names match Figma component properties (camelCase): size, variant, initials, src.
 * Sizes: small, medium, large. Variants: 1–4 (semantic status: info, success, warning, danger).
 * Circular; shows image when src is set, otherwise initials. Uses design tokens only.
 */
export type AvatarSize = "small" | "medium" | "large";
export type AvatarVariant = 1 | 2 | 3 | 4;

export interface AvatarProps {
  /** Initials shown when no image (e.g. "SS"). Uppercase recommended. */
  initials: string;
  /** Optional image URL; when set, image is shown instead of initials. */
  src?: string;
  /** Size (Figma 67-2956): small, medium, large. */
  size?: AvatarSize;
  /** Color variant (Figma 67-2956): 1–4 (info, success, warning, danger). */
  variant?: AvatarVariant;
  /** Alt text for image; use name for accessibility when initials represent a person. */
  alt?: string;
  /** Optional additional class name for the root element. */
  className?: string;
  /** Optional data attribute for testing. */
  testId?: string;
}
