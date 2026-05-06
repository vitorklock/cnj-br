import { describe, it, expect } from 'vitest'
import { Processo } from '@/entities'
import { calculateCheckDigits, hasValidCheckDigits } from '@/utils'

const BASE: Omit<Processo.Components, 'checkDigits'> = {
    sequentialNumber: '0000001',
    year: '2024',
    segment: '8',
    court: '26',
    originUnit: '0001',
}

describe('calculateCheckDigits', () => {
    it('should compute the ISO 7064 mod 97-10 check digits for a known vector', () => {
        // Hand-computed: base "00000012024826000100" → mod = 53 → DD = 98 - 53 = 45
        expect(calculateCheckDigits(BASE)).toBe('45')
    })

    it('should always return a 2-character zero-padded string', () => {
        const variants: Omit<Processo.Components, 'checkDigits'>[] = [
            { ...BASE, sequentialNumber: '9999999' },
            { ...BASE, year: '1998' },
            { ...BASE, segment: '1', court: '00', originUnit: '0000' },
        ]
        for (const c of variants) {
            const dd = calculateCheckDigits(c)
            expect(dd).toMatch(/^\d{2}$/)
        }
    })
})

describe('hasValidCheckDigits', () => {
    it('should return true for components whose checkDigits we just computed', () => {
        const checkDigits = calculateCheckDigits(BASE)
        expect(hasValidCheckDigits({ ...BASE, checkDigits })).toBe(true)
    })

    it('should return false when the checksum is tampered with', () => {
        const checkDigits = calculateCheckDigits(BASE)
        const tampered = String((Number(checkDigits) + 1) % 100).padStart(2, '0')
        expect(hasValidCheckDigits({ ...BASE, checkDigits: tampered })).toBe(false)
    })

    it('should be self-consistent for any synthetic components', () => {
        const variants: Omit<Processo.Components, 'checkDigits'>[] = [
            BASE,
            { sequentialNumber: '1234567', year: '2010', segment: '4', court: '01', originUnit: '5000' },
            { sequentialNumber: '9876543', year: '1999', segment: '5', court: '15', originUnit: '0042' },
            { sequentialNumber: '0000000', year: '2008', segment: '2', court: '00', originUnit: '0000' },
        ]
        for (const c of variants) {
            const checkDigits = calculateCheckDigits(c)
            expect(hasValidCheckDigits({ ...c, checkDigits })).toBe(true)
        }
    })
})
