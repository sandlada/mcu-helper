# @sandlada/mcu-helper

![NPM Downloads](https://img.shields.io/npm/d18m/@sandlada/mcu-helper?label=NPM%20Downloads&labelColor=%2300531f&color=%23a3f5aa)
![npm version](https://img.shields.io/npm/v/@sandlada/mcu-helper?label=NPM%20Version&labelColor=%2300531f&color=%23a3f5aa)
![GitHub License](https://img.shields.io/github/license/sandlada/mcu-helper?label=License&labelColor=%2300531f&color=%23a3f5aa)

Generate **Material Design 3** (Material You) color tokens, tonal palettes, and CSS custom properties from a source color. Built on top of [`@material/material-color-utilities`](https://github.com/material-foundation/material-color-utilities).

---

## Installation

```bash
npm install @sandlada/mcu-helper
```

```bash
yarn add @sandlada/mcu-helper
```

```bash
pnpm add @sandlada/mcu-helper
```

> `@material/material-color-utilities` is a **peer dependency** — make sure it's installed in your project.

---

## Quick Start

```ts
import { Hct } from "@material/material-color-utilities"
import { MaterialColor, Serialization } from "@sandlada/mcu-helper"

// 1. Pick a source color (in HCT color space)
const sourceColor = Hct.fromInt(0xff6750a4) // Seed color

// 2. Generate light & dark theme colors
const theme = MaterialColor.Create({ sourceColor })

// 3. Serialize to CSS custom properties
const css = Serialization.ToCSS({
  lightObject: theme.lightObject,
  darkObject: theme.darkObject,
})

console.log(css)
```

Output:

```css
:root {
    --md-sys-color-background: light-dark(#f8fdff, #101416);
    --md-sys-color-error: light-dark(#ba1a1a, #ffb4ab);
    --md-sys-color-error-container: light-dark(#ffdad6, #93000a);
    --md-sys-color-inverse-on-surface: light-dark(#f0f1f1, #111415);
    /* ... more tokens */
    --md-sys-color-primary: light-dark(#6750a4, #d0bcff);
    --md-sys-color-surface-container-lowest: light-dark(#ffffff, #080b0c);
    --md-sys-color-on-surface: light-dark(#191c1d, #e0e3e3);
}
```

---

## API

### `MaterialColor.Create()`

Generate a full set of Material Design 3 color tokens for light and dark schemes.

```ts
import { Hct, TonalPalette } from "@material/material-color-utilities"
import { MaterialColor } from "@sandlada/mcu-helper"

const theme = MaterialColor.Create({
  sourceColor: Hct.fromInt(0xff6750a4),
  contrast: 0,            // (optional) MaterialContrastLevel, default: 0
  variant: "tonal_spot",  // (optional) MaterialVariant, default: TONAL_SPOT
  platform: "phone",      // (optional) Platform, default: "phone"
  specVersion: "2025",    // (optional) "2021" | "2025", default: "2025"
  palettes: {},           // (optional) override specific tonal palettes
  whiteList: [],          // (optional) only include these tokens
  blackList: [],          // (optional) exclude these tokens
})
```

**Returns** `Theme`:

| Property      | Description                                                                        |
| ------------- | ---------------------------------------------------------------------------------- |
| `light`       | Light scheme colors with HCT, name, and kebab-case                                 |
| `dark`        | Dark scheme colors with HCT, name, and kebab-case                                  |
| `lightObject` | Light scheme colors as `{ "token-name": ARGB }`                                    |
| `darkObject`  | Dark scheme colors as `{ "token-name": ARGB }`                                     |
| `palettes`    | Six tonal palettes (primary, secondary, tertiary, error, neutral, neutral-variant) |

#### Whitelist / Blacklist

Filter which tokens to include:

```ts
const theme = MaterialColor.Create({
  sourceColor: Hct.fromInt(0xff6750a4),
  whiteList: ["primary", "on-primary", "primary-container"],
  // — or —
  blackList: ["surface-container-low", "surface-container-high"],
})
```

> `whiteList` and `blackList` are **mutually exclusive** — passing both throws an error.

---

### `MaterialColor` — Type Exports

The library also exports the type union of all available color token names:

```ts
import type { MaterialColorKebabCaseName } from "@sandlada/mcu-helper"

// e.g. "primary" | "on-primary" | "primary-container" | ... (60+ tokens)
```

---

### `MaterialPalette.Create()`

Generate tone–color pairs from a tonal palette.

```ts
import { Hct } from "@material/material-color-utilities"
import { MaterialColor, MaterialPalette } from "@sandlada/mcu-helper"

const theme = MaterialColor.Create({ sourceColor: Hct.fromInt(0xff6750a4) })

// All 101 tones (0–100)
const allTones = MaterialPalette.Create({
  palette: theme.palettes.primaryPalette,
})

// Specific tones
const specificTones = MaterialPalette.Create({
  palette: theme.palettes.secondaryPalette,
  tones: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
})
```

**Returns**: `{ tone: number, color: number }[]`

---

### `Serialization.ToCSS()`

Serialize theme colors and tonal palettes into CSS custom properties.

```ts
import { Serialization } from "@sandlada/mcu-helper"

const css = Serialization.ToCSS({
  lightObject: theme.lightObject,
  darkObject: theme.darkObject,
  includeTheme: true,             // (optional) include theme tokens, default: true
  palettes: theme.palettes,       // (optional) include tonal palette tokens
  paletteWhiteList: [{ family: "primary", tone: 40 }],  // (optional) filter palette entries
  paletteBlackList: [],           // (optional) exclude palette entries
  paletteTones: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100], // (optional) palette tones
  varPrefix: "md-sys-color",     // (optional) custom CSS variable prefix, default: "md-sys-color"
  customPaletteName: "my-brand", // (optional) emit palette with a custom name
  isCustomPalette: false,        // (optional) use custom palette prefix format
})
```

Theme tokens use `light-dark()` so they work in both light and dark mode automatically.

#### Palette CSS output

```ts
const css = Serialization.ToCSS({
  lightObject: theme.lightObject,
  darkObject: theme.darkObject,
  palettes: theme.palettes,
  paletteTones: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
})
```

Produces:

```css
:root {
    --md-sys-color-background: light-dark(#f8fdff, #101416);
    /* ... theme tokens ... */
    --md-sys-ref-primary-0: #000000;
    --md-sys-ref-primary-10: #21005e;
    --md-sys-ref-primary-20: #381e72;
    --md-sys-ref-primary-30: #4f378b;
    --md-sys-ref-primary-40: #6750a4;
    --md-sys-ref-primary-50: #7f67be;
    /* ... more palette tones ... */
}
```

#### Custom prefix example

```ts
const css = Serialization.ToCSS({
  lightObject: theme.lightObject,
  darkObject: theme.darkObject,
  varPrefix: "my-custom",
})
// → --my-custom-background: light-dark(...)
```

#### Custom palette example

```ts
const css = Serialization.ToCSS({
  lightObject: theme.lightObject,
  darkObject: theme.darkObject,
  palettes: theme.palettes,
  customPaletteName: "brand-primary",
  isCustomPalette: true,
})
// → --brand-primary-40: #6750a4;
```

---

### `MaterialVariant`

The available Material Design variant options:

```ts
import { MaterialVariant } from "@sandlada/mcu-helper"

// MaterialVariant.Monochrome
// MaterialVariant.Neutral
// MaterialVariant.TonalSpot   (default)
// MaterialVariant.Vibrant
// MaterialVariant.Expressive
// MaterialVariant.Fidelity
// MaterialVariant.Content
// MaterialVariant.Rainbow
// MaterialVariant.FruitSalad
```

---

### `MaterialContrastLevel`

```ts
import { MaterialContrastLevel } from "@sandlada/mcu-helper"

// MaterialContrastLevel.Reduced  → -1.0
// MaterialContrastLevel.Default  →  0   (default)
// MaterialContrastLevel.Medium   →  0.5
// MaterialContrastLevel.High     →  1.0
```

---

### `MaterialColors`

A utility class that wraps `MaterialDynamicColors` from `@material/material-color-utilities`:

```ts
import { MaterialColors } from "@sandlada/mcu-helper"

const allColorDefs = MaterialColors.ToRecord()
// → { primary: DynamicColor, onPrimary: DynamicColor, ... }
```

---

### `StringUtil`

String case conversion utilities:

```ts
import { StringUtil } from "@sandlada/mcu-helper"

StringUtil.ToKebabCase("primaryContainer")   // → "primary-container"
StringUtil.ToSnakeCase("primaryContainer")    // → "primary_container"
StringUtil.ToPascalCase("primary-container")  // → "PrimaryContainer"
```

---

## Recipes

### Generate and save CSS to a file

```ts
import { Hct } from "@material/material-color-utilities"
import { MaterialColor, Serialization } from "@sandlada/mcu-helper"
import { writeFileSync } from "node:fs"

const sourceColor = Hct.fromInt(0xff6750a4)
const theme = MaterialColor.Create({ sourceColor })

const css = Serialization.ToCSS({
  lightObject: theme.lightObject,
  darkObject: theme.darkObject,
  palettes: theme.palettes,
  paletteTones: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
})

writeFileSync("tokens.css", css, "utf-8")
```

### Include only specific tokens

```ts
const theme = MaterialColor.Create({
  sourceColor: Hct.fromInt(0xff6750a4),
  whiteList: [
    "primary",
    "on-primary",
    "primary-container",
    "on-primary-container",
    "secondary",
    "on-secondary",
    "surface",
    "on-surface",
    "background",
    "on-background",
    "error",
    "on-error",
  ],
})
```

### Use a custom variant with high contrast

```ts
const theme = MaterialColor.Create({
  sourceColor: Hct.fromInt(0xff006b3e),
  variant: MaterialVariant.Vibrant,
  contrast: MaterialContrastLevel.High,
})
```

---

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Watch mode
npm run test:watch

# Build
npm run compile
```

---

## License

[MIT](./LICENSE)
