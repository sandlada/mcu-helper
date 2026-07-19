import { describe, expect, it } from 'vitest'
import { StringUtil } from './string-util'

describe('StringUtil', () => {
    describe('ToKebabCase', () => {
        it('converts PascalCase to kebab-case', () => {
            expect(StringUtil.ToKebabCase('primaryContainer')).toBe('primary-container')
        })

        it('converts SCREAMING_SNAKE_CASE to kebab-case', () => {
            expect(StringUtil.ToKebabCase('PRIMARY_CONTAINER')).toBe('primary-container')
        })

        it('converts mixed separators to kebab-case', () => {
            expect(StringUtil.ToKebabCase('primary.container value')).toBe('primary-container-value')
        })

        it('preserves already kebab-case strings', () => {
            expect(StringUtil.ToKebabCase('primary-container-value')).toBe('primary-container-value')
        })

        it('collapses consecutive hyphens', () => {
            expect(StringUtil.ToKebabCase('primary--container')).toBe('primary-container')
        })

        it('trims leading and trailing hyphens', () => {
            expect(StringUtil.ToKebabCase('-primary-container-')).toBe('primary-container')
        })

        it('handles empty string', () => {
            expect(StringUtil.ToKebabCase('')).toBe('')
        })
    })

    describe('ToSnakeCase', () => {
        it('converts PascalCase to snake_case', () => {
            expect(StringUtil.ToSnakeCase('primaryContainer')).toBe('primary_container')
        })

        it('converts kebab-case to snake_case', () => {
            expect(StringUtil.ToSnakeCase('primary-container')).toBe('primary_container')
        })

        it('handles empty string', () => {
            expect(StringUtil.ToSnakeCase('')).toBe('')
        })
    })

    describe('ToPascalCase', () => {
        it('converts kebab-case to PascalCase', () => {
            expect(StringUtil.ToPascalCase('primary-container')).toBe('PrimaryContainer')
        })

        it('converts snake_case to PascalCase', () => {
            expect(StringUtil.ToPascalCase('primary_container')).toBe('PrimaryContainer')
        })

        it('handles empty string', () => {
            expect(StringUtil.ToPascalCase('')).toBe('')
        })
    })
})
