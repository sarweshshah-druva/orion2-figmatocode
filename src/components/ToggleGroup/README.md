# Toggle Group

Orion v2.0 components: **ToggleGroup** (Figma 20-612), **ToggleGroupItem** (Figma 2247-21795).

## Prop names ↔ Figma

Prop names match Figma component properties (camelCase). Code stays idiomatic by using the same names in implementation and supporting React conventions where useful.

| Figma (concept) | Code prop      | Notes                                                             |
| --------------- | -------------- | ----------------------------------------------------------------- |
| **Variant**     | `variant`      | `"single"` \| `"multiple"` (selection mode)                       |
| **Value**       | `value`        | Controlled selection (string or string[])                         |
| **Default**     | `defaultValue` | Uncontrolled initial selection                                    |
| **Disabled**    | `disabled`     | Disable group or item                                             |
| **Size**        | `size`         | Item only: `"small"` \| `"medium"` \| `"large"`                   |
| **Icon**        | `icon`         | Item only: optional leading icon (e.g. Lucide)                    |
| **Label**       | `label`        | Item only: visible text. Also accept `children` for idiomatic JSX |

`onValueChange` is the selection change callback (React convention; Figma does not name callbacks). `className` and `testId` are implementation helpers.
