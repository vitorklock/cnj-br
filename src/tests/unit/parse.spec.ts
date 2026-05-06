import { describe, it, expect } from 'vitest'
import { Processo } from '@/entities'
import { parse, parseDigits, parseFormatted } from '@/utils'

const VALID_COMPONENTS: Processo.Components = {
    sequentialNumber: '0000001',
    checkDigits: '45',
    year: '2024',
    segment: '8',
    court: '26',
    originUnit: '0001',
}
const VALID_FORMATTED = '0000001-45.2024.8.26.0001'
const VALID_DIGITS = '00000014520248260001'

describe('parseFormatted', () => {
    it('should parse a well-formed CNJ string into components', () => {
        expect(parseFormatted(VALID_FORMATTED)).toEqual(VALID_COMPONENTS)
    })

    it('should trim surrounding whitespace before matching', () => {
        expect(parseFormatted(`  ${VALID_FORMATTED}  `)).toEqual(VALID_COMPONENTS)
    })

    it('should return null when the segment digit is not in VALID_SEGMENTS', () => {
        expect(parseFormatted('0000001-45.2024.0.26.0001')).toBeNull()
    })

    it('should return null on garbage input', () => {
        expect(parseFormatted('not a cnj')).toBeNull()
        expect(parseFormatted('')).toBeNull()
    })

    it('should return null when given digits-only (no separators)', () => {
        expect(parseFormatted(VALID_DIGITS)).toBeNull()
    })
})

describe('parseDigits', () => {
    it('should parse a 20-digit string into components', () => {
        expect(parseDigits(VALID_DIGITS)).toEqual(VALID_COMPONENTS)
    })

    it('should strip non-digits before validating length', () => {
        expect(parseDigits(VALID_FORMATTED)).toEqual(VALID_COMPONENTS)
    })

    it('should return null for fewer than 20 digits', () => {
        expect(parseDigits('123')).toBeNull()
    })

    it('should return null for more than 20 digits', () => {
        expect(parseDigits(VALID_DIGITS + '0')).toBeNull()
    })

    it('should return null when the segment digit is not in VALID_SEGMENTS', () => {
        const invalidSegment = '00000014520240260001'
        expect(parseDigits(invalidSegment)).toBeNull()
    })
})

describe('parse', () => {
    it('should accept formatted CNJ strings', () => {
        expect(parse(VALID_FORMATTED)).toEqual(VALID_COMPONENTS)
    })

    it('should accept 20-digit strings', () => {
        expect(parse(VALID_DIGITS)).toEqual(VALID_COMPONENTS)
    })

    it('should return null for garbage', () => {
        expect(parse('hello world')).toBeNull()
    })
})
