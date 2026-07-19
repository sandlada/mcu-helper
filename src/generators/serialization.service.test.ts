import { Hct, Variant } from '@material/material-color-utilities'
import { describe, expect, it } from 'vitest'
import { MaterialColor } from './material-color.service'
import { Serialization } from './serialization.service'

// Small deterministic theme with 2 tokens for focused format testing
const theme = MaterialColor.Create({
    sourceColor: Hct.fromInt(0xff6750a4),
    variant: Variant.NEUTRAL,
    contrast: 0,
    palettes: {},
    whiteList: ['primary', 'surface-tint'] as any,
})

describe('Serialization', () => {
    describe('CSS', () => {
        it('wraps output in :root { } block', () => {
            const css = Serialization.ToCSS({ lightObject: theme.lightObject, darkObject: theme.darkObject })
            const trimmed = css.trim()
            expect(trimmed.startsWith(':root {')).toBe(true)
            expect(trimmed.endsWith('}')).toBe(true)
        })

        it('uses light-dark() for every theme token', () => {
            const css = Serialization.ToCSS({ lightObject: theme.lightObject, darkObject: theme.darkObject })
            const lines = css.split('\n').filter(l => l.includes('--md-sys-color-'))
            expect(lines.length).toBeGreaterThan(0)
            for (const line of lines) {
                expect(line).toMatch(/light-dark\(#[0-9a-fA-F]{6},\s*#[0-9a-fA-F]{6}\)/)
            }
        })

        it('palette tokens use bare key: value; (no light-dark wrapper)', () => {
            const css = Serialization.ToCSS({
                lightObject: theme.lightObject,
                darkObject: theme.darkObject,
                palettes: theme.palettes,
                paletteTones: [0],
            })
            expect(css).toContain('--md-sys-ref-')
            // Palette tokens should NOT use light-dark()
            expect(css).not.toMatch(/--md-sys-ref-.*light-dark\(/)
        })
    })

    describe('varPrefix', () => {
        it('changes default theme prefix to {prefix}- pattern in CSS (no infix)', () => {
            const css = Serialization.ToCSS({
                lightObject: theme.lightObject,
                darkObject: theme.darkObject,
                varPrefix: 'my-app',
            })
            expect(css).toContain('--my-app-')
            expect(css).not.toContain('--md-sys-color-')
            expect(css).not.toContain('--my-app-color-')
        })

        it('changes default palette prefix to {prefix}- pattern in CSS (no infix)', () => {
            const css = Serialization.ToCSS({
                lightObject: theme.lightObject,
                darkObject: theme.darkObject,
                palettes: theme.palettes,
                paletteTones: [0],
                varPrefix: 'my-app',
            })
            expect(css).toContain('--my-app-primary-0')
            expect(css).toContain('--my-app-secondary-0')
            expect(css).not.toContain('--my-app-palette-')
        })

        it('custom palette mode uses bare {prefix}-{tone} (no family infix)', () => {
            const css = Serialization.ToCSS({
                lightObject: theme.lightObject,
                darkObject: theme.darkObject,
                palettes: theme.palettes,
                paletteTones: [0],
                varPrefix: 'custom',
                isCustomPalette: true,
                customPaletteName: '',
            })
            expect(css).toContain('--custom-0')
        })
    })

    describe('error handling', () => {
        it('throws on mismatched light/dark keys', () => {
            expect(() => Serialization.ToCSS({
                lightObject: { a: 0xff000000 },
                darkObject: { b: 0xffffffff },
            })).toThrow(/same normalized keys|mismatch/i)
        })

        it('throws on invalid ARGB color values', () => {
            expect(() => Serialization.ToCSS({
                lightObject: { token: Number.POSITIVE_INFINITY },
                darkObject: { token: 0xff000000 },
            })).toThrow(/integer|ARGB/i)
        })
    })

    describe('empty theme', () => {
        it('produces valid CSS output for empty theme', () => {
            const empty = { lightObject: {}, darkObject: {} }
            expect(() => Serialization.ToCSS(empty)).not.toThrow()
        })

        it('CSS empty theme is valid :root with no properties', () => {
            const css = Serialization.ToCSS({ lightObject: {}, darkObject: {} })
            expect(css.trim()).toBe(':root {\n}')
        })
    })
})
