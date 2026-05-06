import { describe, it, expect } from 'vitest'
import { Cnj } from '@/cnj'
import { Processo } from '@/entities'
import { InvalidProcessoError } from '@/errors'

const VALID_FORMATTED = '0000001-45.2024.8.26.0001'
const VALID_DIGITS = '00000014520248260001'
const VALID_COMPONENTS: Processo.Components = {
    sequentialNumber: '0000001',
    checkDigits: '45',
    year: '2024',
    segment: '8',
    court: '26',
    originUnit: '0001',
}
const TAMPERED_FORMATTED = '0000001-00.2024.8.26.0001'

describe('Cnj constructor', () => {
    it('should accept a formatted CNJ string', () => {
        const cnj = new Cnj(VALID_FORMATTED)
        expect(cnj.components).toEqual(VALID_COMPONENTS)
    })

    it('should accept a 20-digit string', () => {
        const cnj = new Cnj(VALID_DIGITS)
        expect(cnj.components).toEqual(VALID_COMPONENTS)
    })

    it('should throw InvalidProcessoError on garbage input', () => {
        expect(() => new Cnj('not a cnj')).toThrow(InvalidProcessoError)
    })

    it('should throw InvalidProcessoError when the checksum is wrong', () => {
        expect(() => new Cnj(TAMPERED_FORMATTED)).toThrow(InvalidProcessoError)
    })
})

describe('Cnj.isValid', () => {
    it('should return true for a valid formatted CNJ', () => {
        expect(Cnj.isValid(VALID_FORMATTED)).toBe(true)
    })

    it('should return true for a valid 20-digit string', () => {
        expect(Cnj.isValid(VALID_DIGITS)).toBe(true)
    })

    it('should return false when the checksum is tampered with', () => {
        expect(Cnj.isValid(TAMPERED_FORMATTED)).toBe(false)
    })

    it('should return false on garbage input', () => {
        expect(Cnj.isValid('hello')).toBe(false)
    })
})

describe('Cnj.safeParse', () => {
    it('should return a Cnj instance for valid input', () => {
        const cnj = Cnj.safeParse(VALID_FORMATTED)
        expect(cnj).toBeInstanceOf(Cnj)
        expect(cnj!.components).toEqual(VALID_COMPONENTS)
    })

    it('should return null for invalid input instead of throwing', () => {
        expect(Cnj.safeParse('garbage')).toBeNull()
        expect(Cnj.safeParse(TAMPERED_FORMATTED)).toBeNull()
    })
})

describe('Cnj instance accessors', () => {
    it('raw should return the 20-digit form', () => {
        expect(new Cnj(VALID_FORMATTED).raw).toBe(VALID_DIGITS)
    })

    it('format() should return the canonical formatted string', () => {
        expect(new Cnj(VALID_DIGITS).format()).toBe(VALID_FORMATTED)
    })

    it('format({ formatted: false }) should return the 20-digit form', () => {
        expect(new Cnj(VALID_FORMATTED).format({ formatted: false })).toBe(VALID_DIGITS)
    })

    it('segmentInfo should look up the segment from SEGMENTS', () => {
        expect(new Cnj(VALID_FORMATTED).segmentInfo).toEqual({ code: 'TJ', name: 'Justiça Estadual' })
    })

    it('toString() should equal format()', () => {
        const cnj = new Cnj(VALID_FORMATTED)
        expect(cnj.toString()).toBe(cnj.format())
    })

    it('toJSON() should expose the components and survive JSON.stringify', () => {
        const cnj = new Cnj(VALID_FORMATTED)
        expect(cnj.toJSON()).toEqual(VALID_COMPONENTS)
        expect(JSON.parse(JSON.stringify(cnj))).toEqual(VALID_COMPONENTS)
    })
})
