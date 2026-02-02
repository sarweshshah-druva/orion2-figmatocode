/**
 * Data visualization color tokens
 * Sequential (blue scale): reference primitives.
 * Categorical (1–14): resolved rgb values only; no references (per design-tokens-summary).
 * Status (1–5): reference primitives.
 */

import { blue, green, red, amber, grey } from "../primitives/colors";

/** Categorical palette – light theme: resolved rgb only, no primitive references. */
const categoricalLight = {
  "dataviz.categorical.1": "rgb(33, 113, 181)",
  "dataviz.categorical.2": "rgb(232, 106, 16)",
  "dataviz.categorical.3": "rgb(40, 167, 69)",
  "dataviz.categorical.4": "rgb(163, 113, 247)",
  "dataviz.categorical.5": "rgb(212, 160, 5)",
  "dataviz.categorical.6": "rgb(84, 174, 255)",
  "dataviz.categorical.7": "rgb(191, 135, 0)",
  "dataviz.categorical.8": "rgb(110, 118, 129)",
  "dataviz.categorical.9": "rgb(20, 67, 105)",
  "dataviz.categorical.10": "rgb(207, 34, 46)",
  "dataviz.categorical.11": "rgb(35, 140, 58)",
  "dataviz.categorical.12": "rgb(130, 80, 223)",
  "dataviz.categorical.13": "rgb(212, 160, 5)",
  "dataviz.categorical.14": "rgb(87, 96, 106)",
} as const;

/** Categorical palette – dark theme: resolved rgb only, lighter/brighter for dark backgrounds. */
const categoricalDark = {
  "dataviz.categorical.1": "rgb(84, 174, 255)",
  "dataviz.categorical.2": "rgb(255, 153, 64)",
  "dataviz.categorical.3": "rgb(86, 211, 100)",
  "dataviz.categorical.4": "rgb(163, 113, 247)",
  "dataviz.categorical.5": "rgb(227, 179, 65)",
  "dataviz.categorical.6": "rgb(121, 192, 255)",
  "dataviz.categorical.7": "rgb(212, 167, 44)",
  "dataviz.categorical.8": "rgb(140, 149, 159)",
  "dataviz.categorical.9": "rgb(56, 139, 253)",
  "dataviz.categorical.10": "rgb(255, 123, 114)",
  "dataviz.categorical.11": "rgb(63, 185, 80)",
  "dataviz.categorical.12": "rgb(163, 113, 247)",
  "dataviz.categorical.13": "rgb(227, 179, 65)",
  "dataviz.categorical.14": "rgb(140, 149, 159)",
} as const;

export const datavizLight = {
  "dataviz.sequential.blue.1": blue[100],
  "dataviz.sequential.blue.2": blue[200],
  "dataviz.sequential.blue.3": blue[400],
  "dataviz.sequential.blue.4": blue[500],
  "dataviz.sequential.blue.5": blue[600],
  "dataviz.sequential.blue.6": blue[700],
  ...categoricalLight,
  "dataviz.status.1": red[500],
  "dataviz.status.2": green[500],
  "dataviz.status.3": amber[500],
  "dataviz.status.4": blue[500],
  "dataviz.status.5": grey[500],
} as const;

export const datavizDark = {
  "dataviz.sequential.blue.1": blue[900],
  "dataviz.sequential.blue.2": blue[800],
  "dataviz.sequential.blue.3": blue[600],
  "dataviz.sequential.blue.4": blue[400],
  "dataviz.sequential.blue.5": blue[300],
  "dataviz.sequential.blue.6": blue[200],
  ...categoricalDark,
  "dataviz.status.1": red[400],
  "dataviz.status.2": green[400],
  "dataviz.status.3": amber[400],
  "dataviz.status.4": blue[400],
  "dataviz.status.5": grey[400],
} as const;
