import { describe, it, expect } from 'vitest'
import { SEGMENTS, VALID_SEGMENTS } from '@/entities'
import { getSegmentInfo } from '@/utils'

describe('getSegmentInfo', () => {
    it('should return the info for a valid segment digit string', () => {
        expect(getSegmentInfo('8')).toEqual({ code: 'TJ', name: 'Justiça Estadual' })
    })

    it('should coerce a numeric input to its string form', () => {
        expect(getSegmentInfo(8)).toEqual(getSegmentInfo('8'))
    })

    it('should return null for an unknown digit', () => {
        expect(getSegmentInfo('0')).toBeNull()
        expect(getSegmentInfo(0)).toBeNull()
    })

    it('should return null for non-digit garbage', () => {
        expect(getSegmentInfo('abc')).toBeNull()
        expect(getSegmentInfo('10')).toBeNull()
    })

    it('should resolve all 9 documented segments', () => {
        for (const digit of Object.keys(SEGMENTS)) {
            const info = getSegmentInfo(digit)
            expect(info).not.toBeNull()
            expect(info!.code).toBeTruthy()
            expect(info!.name).toBeTruthy()
        }
    })
})

describe('VALID_SEGMENTS', () => {
    it('should contain exactly the keys of SEGMENTS', () => {
        expect([...VALID_SEGMENTS].sort()).toEqual(Object.keys(SEGMENTS).sort())
    })

    it('should have 9 entries (one per CNJ justice branch)', () => {
        expect(VALID_SEGMENTS.size).toBe(9)
    })
})
