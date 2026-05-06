import { describe, it, expect } from 'vitest'
import { Processo } from '@/entities'
import { format, parse, toRaw } from '@/utils'

const COMPONENTS: Processo.Components = {
    sequentialNumber: '0000001',
    checkDigits: '45',
    year: '2024',
    segment: '8',
    court: '26',
    originUnit: '0001',
}

describe('format', () => {
    it('should produce the canonical NNNNNNN-DD.AAAA.J.TR.OOOO shape by default', () => {
        expect(format(COMPONENTS)).toBe('0000001-45.2024.8.26.0001')
    })

    it('should produce a 20-digit string when formatted is false', () => {
        expect(format(COMPONENTS, { formatted: false })).toBe('00000014520248260001')
    })

    it('should default to formatted output when options is omitted', () => {
        expect(format(COMPONENTS)).toBe(format(COMPONENTS, {}))
    })
})

describe('toRaw', () => {
    it('should equal format(c, { formatted: false })', () => {
        expect(toRaw(COMPONENTS)).toBe(format(COMPONENTS, { formatted: false }))
    })

    it('should always return exactly 20 digits', () => {
        expect(toRaw(COMPONENTS)).toMatch(/^\d{20}$/)
    })
})

describe('format / parse round-trip', () => {
    it('should be a fixed point: parse(format(c)) === c', () => {
        expect(parse(format(COMPONENTS))).toEqual(COMPONENTS)
    })

    it('should be a fixed point through digits-only too', () => {
        expect(parse(toRaw(COMPONENTS))).toEqual(COMPONENTS)
    })
})
