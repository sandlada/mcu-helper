export const MaterialContrastLevel = {
    Reduced: -1.0,
    Default: 0,
    Medium : 0.5,
    High   : 1.0,
} as const satisfies Record<string, number>

export type MaterialContrastLevel = typeof MaterialContrastLevel[keyof typeof MaterialContrastLevel]
export type TMaterialContrastLevel = MaterialContrastLevel
