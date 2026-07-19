import type { TonalPalette } from '@material/material-color-utilities'
import { describe, expect, it, vi } from 'vitest'
import { MaterialPalette } from './material-palette.service'

function createMockPalette(): TonalPalette {
    return { tone: vi.fn((t: number) => t * 10) } as unknown as TonalPalette
}

describe('MaterialPalette', () => {
    it('creates entries for each requested tone', () => {
        const palette = createMockPalette()
        const result = MaterialPalette.Create({ palette, tones: [10, 20, 30] })
        expect(result).toEqual([
            { tone: 10, color: 100 },
            { tone: 20, color: 200 },
            { tone: 30, color: 300 },
        ])
    })

    it('defaults to all 101 tones (0–100) when tones omitted', () => {
        const palette = createMockPalette()
        const result = MaterialPalette.Create({ palette })
        expect(result).toHaveLength(101)
        expect(result[0]).toEqual({ tone: 0, color: 0 })
        expect(result[100]).toEqual({ tone: 100, color: 1000 })
    })

    it('deduplicates and sorts input tones', () => {
        const palette = createMockPalette()
        const result = MaterialPalette.Create({ palette, tones: [50, 10, 50, 10, 0] })
        expect(result.map(e => e.tone)).toEqual([0, 10, 50])
    })

    it('throws for out-of-range tone (> 100)', () => {
        const palette = createMockPalette()
        expect(() => MaterialPalette.Create({ palette, tones: [101] })).toThrow()
    })

    it('throws for out-of-range tone (< 0)', () => {
        const palette = createMockPalette()
        expect(() => MaterialPalette.Create({ palette, tones: [-1] })).toThrow()
    })

    it('throws for non-integer tone', () => {
        const palette = createMockPalette()
        expect(() => MaterialPalette.Create({ palette, tones: [1.5] })).toThrow()
    })
})
