import { Variant } from '@material/material-color-utilities'

export const MaterialVariant = {
    Monochrome: Variant.MONOCHROME,
    Neutral   : Variant.NEUTRAL,
    TonalSpot : Variant.TONAL_SPOT,
    Vibrant   : Variant.VIBRANT,
    Expressive: Variant.EXPRESSIVE,
    Fidelity  : Variant.FIDELITY,
    Content   : Variant.CONTENT,
    Rainbow   : Variant.RAINBOW,
    FruitSalad: Variant.FRUIT_SALAD,
} as const satisfies Record<string, Variant>

export type MaterialVariant = typeof MaterialVariant[keyof typeof MaterialVariant]
export type TMaterialVariant = MaterialVariant
