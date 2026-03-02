/**
 * Semantic color tokens (❖) – Dark theme
 * References primitive colors. Used by components; do not use primitives directly.
 */

import {
  grey,
  white,
  black,
  blue,
  green,
  red,
  amber,
  orange,
} from "../primitives/colors";

export const semanticColorsDark = {
  // Background – surface
  "bg.surface.default": grey[950],
  "bg.surface.default-hover": grey[900],
  "bg.surface.subtle": grey[900],
  "bg.surface.subtle-hover": grey[800],
  "bg.surface.section": white[100],
  "bg.surface.card": grey[950],
  "bg.surface.card-hover": grey[900],
  "bg.surface.overlay": grey[950],
  "bg.surface.overlay-dark": grey[990],
  "bg.surface.sidebar": grey[900],
  "bg.surface.header": blue[990],

  // Background – input
  "bg.input.default": black[300],
  "bg.input.disabled": grey[950],
  "bg.input.inset": grey[990],

  // Background – list-item
  "bg.list-item.default": grey[950],
  "bg.list-item.default-hover": grey[900],
  "bg.list-item.selected": blue[950],
  "bg.list-item.selected-hover": blue[900],

  // Background – element
  "bg.element.default": grey[800],
  "bg.element.default-hover": grey[700],
  "bg.element.subtle": grey[800],
  "bg.element.subtle-hover": grey[900],

  // Background – action
  "bg.action.primary": blue[700],
  "bg.action.primary-hover": blue[600],
  "bg.action.secondary": white[100],
  "bg.action.secondary-hover": white[200],
  "bg.action.tertiary": "transparent",
  "bg.action.tertiary-hover": grey[900],

  // Background – status
  "bg.status.success-subtle": green[900],
  "bg.status.success-solid": green[700],
  "bg.status.success-solid-hover": green[600],
  "bg.status.warning-subtle": amber[900],
  "bg.status.danger-subtle": red[900],
  "bg.status.danger-solid": red[700],
  "bg.status.danger-solid-hover": red[600],
  "bg.status.info-subtle": blue[900],

  // Background – colored
  "bg.colored.accent": blue[700],

  // Border – neutral
  "border.neutral.input": grey[700],
  "border.neutral.input-bold": grey[600],
  "border.neutral.subtle": white[100],
  "border.neutral.auxillary": grey[700],
  "border.neutral.disabled": white[100],
  "border.neutral.overlay": grey[800],

  // Border – colored
  "border.colored.brand": orange[500],
  "border.colored.focused": blue[400],
  "border.colored.selected": blue[400],
  "border.colored.success-subtle": green[800],
  "border.colored.warning-subtle": amber[800],
  "border.colored.danger-subtle": red[800],
  "border.colored.info-subtle": blue[800],
  "border.colored.error": red[400],
  "border.colored.accent": white[200],

  // Text – neutral
  "text.neutral.primary": white.full,
  "text.neutral.secondary": grey[200],
  "text.neutral.tertiary": grey[500],
  "text.neutral.ghost": grey[600],
  "text.neutral.disabled": grey[600],
  "text.neutral.inverse": white.full,
  "text.neutral.inverse-secondary": white[700],

  // Text – link
  "text.link.default": blue[300],
  "text.link.visited": blue[200],
  "text.link.subtle": grey[300],

  // Text – colored
  "text.colored.brand": orange[500],
  "text.colored.success-bold": green[300],
  "text.colored.warning-bold": amber[300],
  "text.colored.danger-bold": red[50],
  "text.colored.info-bold": blue[300],
  "text.colored.error": red[400],
  "text.colored.accent": grey[100],

  // Icon – neutral
  "icon.neutral.primary": grey[100],
  "icon.neutral.secondary": grey[300],
  "icon.neutral.tertiary": grey[500],
  "icon.neutral.inverse": grey[100],
  "icon.neutral.disabled": white[200],

  // Icon – colored
  "icon.colored.link": blue[300],
  "icon.colored.brand": orange[500],
  "icon.colored.success": green[600],
  "icon.colored.success-solid": green[400],
  "icon.colored.warning": amber[700],
  "icon.colored.warning-solid": amber[400],
  "icon.colored.danger": red[500],
  "icon.colored.danger-solid": red[400],
  "icon.colored.info": blue[300],
  "icon.colored.info-solid": blue[400],
  "icon.colored.error": red[400],
  "icon.colored.accent": grey[100],
} as const;
