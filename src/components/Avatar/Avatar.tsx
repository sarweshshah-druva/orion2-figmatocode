import type { AvatarProps } from "./Avatar.types";
import "./Avatar.css";

/**
 * Avatar – circular image or initials with size and color variant.
 * Structure: container with optional img or initials span.
 * Orion v2.0 (Figma node 67-2956). Uses design tokens only.
 */
export function Avatar({
  initials,
  src,
  size = "medium",
  variant = 1,
  alt,
  className = "",
  testId,
}: AvatarProps) {
  const rootClass = [
    "orion-avatar",
    `orion-avatar--${size}`,
    `orion-avatar--variant-${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const hasImage = src != null && src !== "";
  const imgAlt = alt ?? "";
  const needsSpanLabel = !hasImage || !imgAlt;
  const ariaLabel = needsSpanLabel
    ? (alt ?? (initials ? `${initials} avatar` : "Avatar"))
    : undefined;

  return (
    <span
      className={rootClass}
      role={ariaLabel != null ? "img" : undefined}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      {hasImage ? (
        <img
          src={src}
          alt={imgAlt}
          className="orion-avatar__image"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <span className="orion-avatar__initials" aria-hidden>
          {initials}
        </span>
      )}
    </span>
  );
}
