/**
 * Semantic color tokens (❖) – Light theme
 * References primitive colors. Used by components; do not use primitives directly.
 */

import {
  grey,
  white,
  blue,
  green,
  red,
  amber,
  black,
} from "../primitives/colors";

export const semanticColorsLight = {
  // Background – surface
  "bg.surface.default": grey[0],
  "bg.surface.default-hover": grey[50],
  "bg.surface.subtle": grey[50],
  "bg.surface.subtle-hover": grey[100],
  "bg.surface.section": grey[100],
  "bg.surface.card": white.full,
  "bg.surface.card-hover": grey[50],
  "bg.surface.overlay": black[500],
  "bg.surface.overlay-dark": black[800],
  "bg.surface.sidebar": grey[50],
  "bg.surface.header": white.full,

  // Background – input
  "bg.input.default": white.full,
  "bg.input.disabled": grey[50],
  "bg.input.inset": grey[300],

  // Background – list-item
  "bg.list-item.default": "transparent",
  "bg.list-item.default-hover": grey[50],
  "bg.list-item.selected": blue[50],
  "bg.list-item.selected-hover": blue[100],

  // Background – element
  "bg.element.default": grey[50],
  "bg.element.default-hover": grey[200],
  "bg.element.subtle": grey[50],
  "bg.element.subtle-hover": grey[100],

  // Background – action
  "bg.action.primary": blue[500],
  "bg.action.primary-hover": blue[600],
  "bg.action.secondary": white.full,
  "bg.action.secondary-hover": grey[200],
  "bg.action.tertiary": "transparent",
  "bg.action.tertiary-hover": grey[50],

  // Background – status
  "bg.status.success-subtle": green[50],
  "bg.status.success-solid": green[500],
  "bg.status.success-solid-hover": green[600],
  "bg.status.warning-subtle": amber[50],
  "bg.status.danger-subtle": red[50],
  "bg.status.danger-solid": red[500],
  "bg.status.danger-solid-hover": red[600],
  "bg.status.info-subtle": "rgb(211, 227, 240)",

  // Background – colored
  "bg.colored.accent": blue[50],

  // Border – neutral
  "border.neutral.input": grey[200],
  "border.neutral.input-bold": grey[300],
  "border.neutral.subtle": black[50],
  "border.neutral.auxillary": grey[100],
  "border.neutral.disabled": black[100],
  "border.neutral.overlay": grey[200],

  // Border – colored
  "border.colored.brand": blue[500],
  "border.colored.focused": blue[400],
  "border.colored.selected": blue[500],
  "border.colored.success-subtle": green[200],
  "border.colored.warning-subtle": amber[200],
  "border.colored.danger-subtle": red[200],
  "border.colored.info-subtle": blue[200],
  "border.colored.error": red[500],
  "border.colored.accent": blue[400],

  // Text – neutral
  "text.neutral.primary": grey[900],
  "text.neutral.secondary": grey[600],
  "text.neutral.tertiary": grey[500],
  "text.neutral.ghost": grey[400],
  "text.neutral.disabled": black[200],
  "text.neutral.inverse": white.full,
  "text.neutral.inverse-secondary": white[700],

  // Text – link
  "text.link.default": blue[500],
  "text.link.visited": blue[700],
  "text.link.subtle": grey[600],

  // Text – colored
  "text.colored.brand": blue[500],
  "text.colored.success-bold": green[700],
  "text.colored.warning-bold": amber[700],
  "text.colored.danger-bold": red[700],
  "text.colored.info-bold": blue[700],
  "text.colored.error": red[500],
  "text.colored.accent": blue[500],

  // Icon – neutral
  "icon.neutral.primary": grey[900],
  "icon.neutral.secondary": grey[600],
  "icon.neutral.tertiary": grey[500],
  "icon.neutral.inverse": white.full,
  "icon.neutral.disabled": black[200],

  // Icon – colored
  "icon.colored.link": blue[500],
  "icon.colored.brand": blue[500],
  "icon.colored.success": green[600],
  "icon.colored.success-solid": green[500],
  "icon.colored.warning": amber[600],
  "icon.colored.warning-solid": amber[500],
  "icon.colored.danger": red[600],
  "icon.colored.danger-solid": red[500],
  "icon.colored.info": blue[600],
  "icon.colored.info-solid": blue[500],
  "icon.colored.error": red[500],
  "icon.colored.accent": blue[500],
} as const;
