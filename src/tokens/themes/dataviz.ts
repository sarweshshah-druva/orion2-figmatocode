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
  "dataviz.categorical.1": "rgb(39, 135, 188)",
  "dataviz.categorical.2": "rgb(196, 173, 91)",
  "dataviz.categorical.3": "rgb(97, 97, 220)",
  "dataviz.categorical.4": "rgb(64, 161, 138)",
  "dataviz.categorical.5": "rgb(209, 84, 142)",
  "dataviz.categorical.6": "rgb(133, 145, 48)",
  "dataviz.categorical.7": "rgb(236, 135, 119)",
  "dataviz.categorical.8": "rgb(116, 142, 150)",
  "dataviz.categorical.9": "rgb(141, 110, 99)",
  "dataviz.categorical.10": "rgb(65, 147, 135)",
  "dataviz.categorical.11": "rgb(194, 123, 56)",
  "dataviz.categorical.12": "rgb(94, 154, 228)",
  "dataviz.categorical.13": "rgb(173, 94, 209)",
  "dataviz.categorical.14": "rgb(158, 158, 158)",
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
  "dataviz.sequential.blue.1": "rgb(180, 231, 252)",
  "dataviz.sequential.blue.2": "rgb(153, 212, 243)",
  "dataviz.sequential.blue.3": "rgb(127, 193, 233)",
  "dataviz.sequential.blue.4": "rgb(102, 174, 223)",
  "dataviz.sequential.blue.5": "rgb(79, 155, 214)",
  "dataviz.sequential.blue.6": "rgb(54, 135, 203)",
  ...categoricalDark,
  "dataviz.status.1": "rgb(157, 40, 51)",
  "dataviz.status.2": "rgb(36, 143, 60)",
  "dataviz.status.3": "rgb(182, 138, 8)",
  "dataviz.status.4": "rgb(30, 98, 155)",
  "dataviz.status.5": "rgba(255, 255, 255, 0.5)",
} as const;
