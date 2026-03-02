/**
 * Data visualization color tokens
 * Categorical (1–14): resolved rgb values, same for light and dark.
 * Sequential (14 palettes × 5 steps): resolved rgb values per palette.
 * Status (green, red, amber, blue, grey): reference primitives.
 */

import { blue, green, red, amber, grey } from "../primitives/colors";

const categorical = {
  "dataviz.categorical.1": "rgb(97, 109, 220)",
  "dataviz.categorical.2": "rgb(60, 166, 212)",
  "dataviz.categorical.3": "rgb(128, 189, 250)",
  "dataviz.categorical.4": "rgb(160, 235, 205)",
  "dataviz.categorical.5": "rgb(65, 147, 135)",
  "dataviz.categorical.6": "rgb(96, 125, 139)",
  "dataviz.categorical.7": "rgb(158, 158, 158)",
  "dataviz.categorical.8": "rgb(255, 223, 126)",
  "dataviz.categorical.9": "rgb(191, 189, 69)",
  "dataviz.categorical.10": "rgb(251, 169, 38)",
  "dataviz.categorical.11": "rgb(236, 135, 119)",
  "dataviz.categorical.12": "rgb(255, 112, 155)",
  "dataviz.categorical.13": "rgb(183, 128, 250)",
  "dataviz.categorical.14": "rgb(141, 110, 99)",
} as const;

const sequential = {
  "dataviz.sequential.indigo.1": "rgb(195, 200, 242)",
  "dataviz.sequential.indigo.2": "rgb(148, 156, 231)",
  "dataviz.sequential.indigo.3": "rgb(97, 109, 220)",
  "dataviz.sequential.indigo.4": "rgb(78, 87, 176)",
  "dataviz.sequential.indigo.5": "rgb(58, 65, 132)",

  "dataviz.sequential.aether.1": "rgb(185, 223, 240)",
  "dataviz.sequential.aether.2": "rgb(138, 202, 229)",
  "dataviz.sequential.aether.3": "rgb(60, 166, 212)",
  "dataviz.sequential.aether.4": "rgb(48, 133, 170)",
  "dataviz.sequential.aether.5": "rgb(36, 100, 127)",

  "dataviz.sequential.maya.1": "rgb(207, 230, 253)",
  "dataviz.sequential.maya.2": "rgb(163, 207, 251)",
  "dataviz.sequential.maya.3": "rgb(128, 189, 250)",
  "dataviz.sequential.maya.4": "rgb(109, 161, 213)",
  "dataviz.sequential.maya.5": "rgb(77, 113, 150)",

  "dataviz.sequential.celadon.1": "rgb(217, 247, 235)",
  "dataviz.sequential.celadon.2": "rgb(183, 240, 217)",
  "dataviz.sequential.celadon.3": "rgb(160, 235, 205)",
  "dataviz.sequential.celadon.4": "rgb(136, 200, 174)",
  "dataviz.sequential.celadon.5": "rgb(96, 141, 123)",

  "dataviz.sequential.teal.1": "rgb(175, 210, 205)",
  "dataviz.sequential.teal.2": "rgb(118, 178, 169)",
  "dataviz.sequential.teal.3": "rgb(65, 147, 135)",
  "dataviz.sequential.teal.4": "rgb(55, 125, 115)",
  "dataviz.sequential.teal.5": "rgb(39, 88, 81)",

  "dataviz.sequential.slate.1": "rgb(207, 216, 220)",
  "dataviz.sequential.slate.2": "rgb(147, 167, 176)",
  "dataviz.sequential.slate.3": "rgb(96, 125, 139)",
  "dataviz.sequential.slate.4": "rgb(82, 106, 118)",
  "dataviz.sequential.slate.5": "rgb(62, 81, 90)",

  "dataviz.sequential.ash.1": "rgb(207, 207, 207)",
  "dataviz.sequential.ash.2": "rgb(177, 177, 177)",
  "dataviz.sequential.ash.3": "rgb(158, 158, 158)",
  "dataviz.sequential.ash.4": "rgb(134, 134, 134)",
  "dataviz.sequential.ash.5": "rgb(103, 103, 103)",

  "dataviz.sequential.jasmine.1": "rgb(255, 245, 216)",
  "dataviz.sequential.jasmine.2": "rgb(255, 233, 165)",
  "dataviz.sequential.jasmine.3": "rgb(255, 223, 126)",
  "dataviz.sequential.jasmine.4": "rgb(217, 190, 107)",
  "dataviz.sequential.jasmine.5": "rgb(153, 134, 76)",

  "dataviz.sequential.citron.1": "rgb(229, 229, 181)",
  "dataviz.sequential.citron.2": "rgb(212, 210, 128)",
  "dataviz.sequential.citron.3": "rgb(191, 189, 69)",
  "dataviz.sequential.citron.4": "rgb(162, 161, 59)",
  "dataviz.sequential.citron.5": "rgb(115, 113, 41)",

  "dataviz.sequential.marigold.1": "rgb(253, 221, 168)",
  "dataviz.sequential.marigold.2": "rgb(252, 194, 100)",
  "dataviz.sequential.marigold.3": "rgb(251, 169, 38)",
  "dataviz.sequential.marigold.4": "rgb(213, 144, 32)",
  "dataviz.sequential.marigold.5": "rgb(151, 101, 23)",

  "dataviz.sequential.salmon.1": "rgb(246, 204, 197)",
  "dataviz.sequential.salmon.2": "rgb(242, 170, 158)",
  "dataviz.sequential.salmon.3": "rgb(236, 135, 119)",
  "dataviz.sequential.salmon.4": "rgb(201, 115, 101)",
  "dataviz.sequential.salmon.5": "rgb(142, 81, 71)",

  "dataviz.sequential.tulip.1": "rgb(255, 190, 210)",
  "dataviz.sequential.tulip.2": "rgb(255, 147, 179)",
  "dataviz.sequential.tulip.3": "rgb(255, 112, 155)",
  "dataviz.sequential.tulip.4": "rgb(217, 95, 132)",
  "dataviz.sequential.tulip.5": "rgb(166, 73, 101)",

  "dataviz.sequential.lilac.1": "rgb(224, 201, 253)",
  "dataviz.sequential.lilac.2": "rgb(206, 168, 252)",
  "dataviz.sequential.lilac.3": "rgb(183, 128, 250)",
  "dataviz.sequential.lilac.4": "rgb(156, 109, 213)",
  "dataviz.sequential.lilac.5": "rgb(119, 83, 162)",

  "dataviz.sequential.saddle.1": "rgb(209, 197, 193)",
  "dataviz.sequential.saddle.2": "rgb(173, 151, 143)",
  "dataviz.sequential.saddle.3": "rgb(141, 110, 99)",
  "dataviz.sequential.saddle.4": "rgb(120, 94, 84)",
  "dataviz.sequential.saddle.5": "rgb(92, 71, 64)",
} as const;

export const datavizLight = {
  ...sequential,
  ...categorical,
  "dataviz.status.green": green[300],
  "dataviz.status.red": red[400],
  "dataviz.status.amber": amber[500],
  "dataviz.status.blue": blue[400],
  "dataviz.status.grey": grey[500],
} as const;

export const datavizDark = {
  ...sequential,
  ...categorical,
  "dataviz.status.green": green[300],
  "dataviz.status.red": red[400],
  "dataviz.status.amber": amber[500],
  "dataviz.status.blue": blue[400],
  "dataviz.status.grey": grey[500],
} as const;
