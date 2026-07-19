import { type DynamicColor, MaterialDynamicColors } from "@material/material-color-utilities"

export type MaterialColors = {
    primaryPaletteKeyColor       : DynamicColor
    secondaryPaletteKeyColor     : DynamicColor
    tertiaryPaletteKeyColor      : DynamicColor
    neutralPaletteKeyColor       : DynamicColor
    neutralVariantPaletteKeyColor: DynamicColor
    background                   : DynamicColor
    onBackground                 : DynamicColor
    surface                      : DynamicColor
    surfaceDim                   : DynamicColor
    surfaceBright                : DynamicColor
    surfaceContainerLowest       : DynamicColor
    surfaceContainerLow          : DynamicColor
    surfaceContainer             : DynamicColor
    surfaceContainerHigh         : DynamicColor
    surfaceContainerHighest      : DynamicColor
    onSurface                    : DynamicColor
    surfaceVariant               : DynamicColor
    onSurfaceVariant             : DynamicColor
    inverseSurface               : DynamicColor
    inverseOnSurface             : DynamicColor
    outline                      : DynamicColor
    outlineVariant               : DynamicColor
    shadow                       : DynamicColor
    scrim                        : DynamicColor
    surfaceTint                  : DynamicColor
    primary                      : DynamicColor
    onPrimary                    : DynamicColor
    primaryContainer             : DynamicColor
    onPrimaryContainer           : DynamicColor
    inversePrimary               : DynamicColor
    secondary                    : DynamicColor
    onSecondary                  : DynamicColor
    secondaryContainer           : DynamicColor
    onSecondaryContainer         : DynamicColor
    tertiary                     : DynamicColor
    onTertiary                   : DynamicColor
    tertiaryContainer            : DynamicColor
    onTertiaryContainer          : DynamicColor
    error                        : DynamicColor
    onError                      : DynamicColor
    errorContainer               : DynamicColor
    onErrorContainer             : DynamicColor
    primaryFixed                 : DynamicColor
    primaryFixedDim              : DynamicColor
    onPrimaryFixed               : DynamicColor
    onPrimaryFixedVariant        : DynamicColor
    secondaryFixed               : DynamicColor
    secondaryFixedDim            : DynamicColor
    onSecondaryFixed             : DynamicColor
    onSecondaryFixedVariant      : DynamicColor
    tertiaryFixed                : DynamicColor
    tertiaryFixedDim             : DynamicColor
    onTertiaryFixed              : DynamicColor
    onTertiaryFixedVariant       : DynamicColor
}

export type TMaterialColors = MaterialColors;

export const MaterialColors = class {
    private constructor() { }

    static ToRecord(): Record<keyof MaterialColors, DynamicColor> {
        return {
            primaryPaletteKeyColor: MaterialDynamicColors.primaryPaletteKeyColor,
            secondaryPaletteKeyColor: MaterialDynamicColors.secondaryPaletteKeyColor,
            tertiaryPaletteKeyColor: MaterialDynamicColors.tertiaryPaletteKeyColor,
            neutralPaletteKeyColor: MaterialDynamicColors.neutralPaletteKeyColor,
            neutralVariantPaletteKeyColor: MaterialDynamicColors.neutralVariantPaletteKeyColor,
            background: MaterialDynamicColors.background,
            onBackground: MaterialDynamicColors.onBackground,
            surface: MaterialDynamicColors.surface,
            surfaceDim: MaterialDynamicColors.surfaceDim,
            surfaceBright: MaterialDynamicColors.surfaceBright,
            surfaceContainerLowest: MaterialDynamicColors.surfaceContainerLowest,
            surfaceContainerLow: MaterialDynamicColors.surfaceContainerLow,
            surfaceContainer: MaterialDynamicColors.surfaceContainer,
            surfaceContainerHigh: MaterialDynamicColors.surfaceContainerHigh,
            surfaceContainerHighest: MaterialDynamicColors.surfaceContainerHighest,
            onSurface: MaterialDynamicColors.onSurface,
            surfaceVariant: MaterialDynamicColors.surfaceVariant,
            onSurfaceVariant: MaterialDynamicColors.onSurfaceVariant,
            inverseSurface: MaterialDynamicColors.inverseSurface,
            inverseOnSurface: MaterialDynamicColors.inverseOnSurface,
            outline: MaterialDynamicColors.outline,
            outlineVariant: MaterialDynamicColors.outlineVariant,
            shadow: MaterialDynamicColors.shadow,
            scrim: MaterialDynamicColors.scrim,
            surfaceTint: MaterialDynamicColors.surfaceTint,
            primary: MaterialDynamicColors.primary,
            onPrimary: MaterialDynamicColors.onPrimary,
            primaryContainer: MaterialDynamicColors.primaryContainer,
            onPrimaryContainer: MaterialDynamicColors.onPrimaryContainer,
            inversePrimary: MaterialDynamicColors.inversePrimary,
            secondary: MaterialDynamicColors.secondary,
            onSecondary: MaterialDynamicColors.onSecondary,
            secondaryContainer: MaterialDynamicColors.secondaryContainer,
            onSecondaryContainer: MaterialDynamicColors.onSecondaryContainer,
            tertiary: MaterialDynamicColors.tertiary,
            onTertiary: MaterialDynamicColors.onTertiary,
            tertiaryContainer: MaterialDynamicColors.tertiaryContainer,
            onTertiaryContainer: MaterialDynamicColors.onTertiaryContainer,
            error: MaterialDynamicColors.error,
            onError: MaterialDynamicColors.onError,
            errorContainer: MaterialDynamicColors.errorContainer,
            onErrorContainer: MaterialDynamicColors.onErrorContainer,
            primaryFixed: MaterialDynamicColors.primaryFixed,
            primaryFixedDim: MaterialDynamicColors.primaryFixedDim,
            onPrimaryFixed: MaterialDynamicColors.onPrimaryFixed,
            onPrimaryFixedVariant: MaterialDynamicColors.onPrimaryFixedVariant,
            secondaryFixed: MaterialDynamicColors.secondaryFixed,
            secondaryFixedDim: MaterialDynamicColors.secondaryFixedDim,
            onSecondaryFixed: MaterialDynamicColors.onSecondaryFixed,
            onSecondaryFixedVariant: MaterialDynamicColors.onSecondaryFixedVariant,
            tertiaryFixed: MaterialDynamicColors.tertiaryFixed,
            tertiaryFixedDim: MaterialDynamicColors.tertiaryFixedDim,
            onTertiaryFixed: MaterialDynamicColors.onTertiaryFixed,
            onTertiaryFixedVariant: MaterialDynamicColors.onTertiaryFixedVariant,
        }
    }

    static ToArray(): DynamicColor[] {
        return Object.values(MaterialColors.ToRecord())
    }
}
