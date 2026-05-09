import { describe, it, expect } from 'vitest'
import { mask } from '@/utils/mask'

describe('mask', () => {
    it('should return an empty string for empty input', () => {
        expect(mask('')).toBe('')
    })

    it('should return the digits as-is below 8 characters', () => {
        expect(mask('1')).toBe('1')
        expect(mask('1234567')).toBe('1234567')
    })

    it('should insert the - separator at digit 8', () => {
        expect(mask('12345678')).toBe('1234567-8')
        expect(mask('123456789')).toBe('1234567-89')
    })

    it('should insert the year separator at digit 10', () => {
        expect(mask('1234567890')).toBe('1234567-89.0')
        expect(mask('1234567890123')).toBe('1234567-89.0123')
    })

    it('should insert the segment separator at digit 14', () => {
        expect(mask('12345678901234')).toBe('1234567-89.0123.4')
    })

    it('should insert the court separator at digit 15', () => {
        expect(mask('123456789012345')).toBe('1234567-89.0123.4.5')
        expect(mask('1234567890123456')).toBe('1234567-89.0123.4.56')
    })

    it('should insert the origin-unit separator at digit 17', () => {
        expect(mask('12345678901234567')).toBe('1234567-89.0123.4.56.7')
        expect(mask('12345678901234567890')).toBe('1234567-89.0123.4.56.7890')
    })

    it('should strip non-digit characters before formatting', () => {
        expect(mask('abc1234567def89')).toBe('1234567-89')
    })

    it('should truncate input beyond 20 digits', () => {
        expect(mask('123456789012345678901234567890')).toBe('1234567-89.0123.4.56.7890')
    })

    it('should be idempotent on already-formatted input', () => {
        const formatted = '0000001-45.2024.8.26.0001'
        expect(mask(formatted)).toBe(formatted)
    })

    it('should coerce numeric runtime input via String() without throwing', () => {
        expect(mask(123456789 as unknown as string)).toBe('1234567-89')
    })
})
