
export class InvalidProcessoError extends Error {
    constructor(value: unknown) {
        super(`Invalid processo: ${String(value)}`);
        this.name = 'InvalidProcessoError';
    }
}