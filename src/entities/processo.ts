
export namespace Processo {

    export interface Components {
        sequentialNumber: string   // NNNNNNN  (7)
        checkDigits: string        // DD       (2)
        year: string               // AAAA     (4)
        segment: string            // J        (1)
        court: string              // TR       (2)
        originUnit: string         // OOOO     (4)
    }

    export type Input = string | number

}