
export const SEGMENTS = {
    '1': { code: 'STF', name: 'Supremo Tribunal Federal' },
    '2': { code: 'CNJ', name: 'Conselho Nacional de Justiça' },
    '3': { code: 'STJ', name: 'Superior Tribunal de Justiça' },
    '4': { code: 'JF', name: 'Justiça Federal' },
    '5': { code: 'JT', name: 'Justiça do Trabalho' },
    '6': { code: 'JE', name: 'Justiça Eleitoral' },
    '7': { code: 'JMU', name: 'Justiça Militar da União' },
    '8': { code: 'TJ', name: 'Justiça Estadual' },
    '9': { code: 'JME', name: 'Justiça Militar Estadual' },
} as const satisfies Record<string, Segment.Info>;

export namespace Segment {

    export type Codes = keyof typeof SEGMENTS

    export interface Info {
        code: string
        name: string
    }
}

export const VALID_SEGMENTS = new Set(Object.keys(SEGMENTS));



