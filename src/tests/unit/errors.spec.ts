import { describe, it, expect } from 'vitest'
import { InvalidProcessoError } from '@/errors'

describe('InvalidProcessoError', () => {
    it('should be an instance of Error', () => {
        expect(new InvalidProcessoError('foo')).toBeInstanceOf(Error)
    })

    it('should expose the class name on the name property', () => {
        expect(new InvalidProcessoError('foo').name).toBe('InvalidProcessoError')
    })

    it('should include the offending value in the message', () => {
        expect(new InvalidProcessoError('not-a-cnj').message).toContain('not-a-cnj')
    })

    it('should coerce non-string values when formatting the message', () => {
        expect(new InvalidProcessoError(42).message).toContain('42')
        expect(new InvalidProcessoError(null).message).toContain('null')
    })
})
