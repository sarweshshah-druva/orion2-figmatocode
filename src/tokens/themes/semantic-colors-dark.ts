/**
 * Semantic color tokens (❖) – Dark theme
 * References primitive colors. Used by components; do not use primitives directly.
 */

import { grey, white, blue, green, red, amber } from "../primitives/colors";

export const semanticColorsDark = {
  // Background – surface
  "bg.surface.default": grey[990],
  "bg.surface.default-hover": grey[950],
  "bg.surface.subtle": grey[950],
  "bg.surface.subtle-hover": grey[900],
  "bg.surface.section": grey[900],
  "bg.surface.card": grey[950],
  "bg.surface.card-hover": grey[900],
  "bg.surface.overlay": grey[850],
  "bg.surface.overlay-dark": grey[990],
  "bg.surface.sidebar": grey[950],
  "bg.surface.header": grey[990],

  // Background – input
  "bg.input.default": grey[900],
  "bg.input.disabled": grey[950],
  "bg.input.inset": grey[990],

  // Background – list-item
  "bg.list-item.default": "transparent",
  "bg.list-item.default-hover": grey[900],
  "bg.list-item.selected": blue[950],
  "bg.list-item.selected-hover": blue[900],

  // Background – element
  "bg.element.default": grey[800],
  "bg.element.default-hover": grey[700],
  "bg.element.subtle": grey[900],
  "bg.element.subtle-hover": grey[850],

  // Background – action
  "bg.action.primary": blue[400],
  "bg.action.primary-hover": blue[300],
  "bg.action.secondary": grey[800],
  "bg.action.secondary-hover": grey[700],
  "bg.action.tertiary": "transparent",
  "bg.action.tertiary-hover": grey[900],

  // Background – status
  "bg.status.success-subtle": green[950],
  "bg.status.success-solid": green[400],
  "bg.status.success-solid-hover": green[300],
  "bg.status.warning-subtle": amber[950],
  "bg.status.danger-subtle": red[950],
  "bg.status.danger-solid": red[400],
  "bg.status.danger-solid-hover": red[300],
  "bg.status.info-subtle": blue[950],

  // Background – colored
  "bg.colored.accent": blue[950],

  // Border – neutral
  "border.neutral.input": grey[700],
  "border.neutral.input-bold": grey[600],
  "border.neutral.subtle": grey[800],
  "border.neutral.auxillary": grey[700],
  "border.neutral.disabled": grey[900],
  "border.neutral.overlay": grey[800],

  // Border – colored
  "border.colored.brand": blue[400],
  "border.colored.focused": blue[400],
  "border.colored.selected": blue[400],
  "border.colored.success-subtle": green[800],
  "border.colored.warning-subtle": amber[800],
  "border.colored.danger-subtle": red[800],
  "border.colored.info-subtle": blue[800],
  "border.colored.error": red[400],
  "border.colored.accent": blue[300],

  // Text – neutral
  "text.neutral.primary": grey[0],
  "text.neutral.secondary": grey[300],
  "text.neutral.tertiary": grey[400],
  "text.neutral.ghost": grey[500],
  "text.neutral.disabled": grey[600],
  "text.neutral.inverse": grey[990],
  "text.neutral.inverse-secondary": grey[700],

  // Text – link
  "text.link.default": blue[300],
  "text.link.visited": blue[200],
  "text.link.subtle": grey[300],

  // Text – colored
  "text.colored.brand": blue[300],
  "text.colored.success-bold": green[300],
  "text.colored.warning-bold": amber[300],
  "text.colored.danger-bold": red[300],
  "text.colored.info-bold": blue[300],
  "text.colored.error": red[400],
  "text.colored.accent": blue[300],

  // Icon – neutral
  "icon.neutral.primary": grey[0],
  "icon.neutral.secondary": grey[300],
  "icon.neutral.tertiary": grey[400],
  "icon.neutral.inverse": grey[990],
  "icon.neutral.disabled": grey[600],

  // Icon – colored
  "icon.colored.link": blue[300],
  "icon.colored.brand": blue[300],
  "icon.colored.success": green[300],
  "icon.colored.success-solid": green[400],
  "icon.colored.warning": amber[300],
  "icon.colored.warning-solid": amber[400],
  "icon.colored.danger": red[300],
  "icon.colored.danger-solid": red[400],
  "icon.colored.info": blue[300],
  "icon.colored.info-solid": blue[400],
  "icon.colored.error": red[400],
  "icon.colored.accent": blue[300],
} as const;
