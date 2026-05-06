import { Processo, Segment } from "./entities";
import { InvalidProcessoError } from "./errors";
import { format, FormatOptions, getSegmentInfo, hasValidCheckDigits, parse } from "./utils";

export class Cnj {
    readonly components: Processo.Components;

    constructor(input: Processo.Input) {
        const parsed = parse(input);

        if (!parsed || !hasValidCheckDigits(parsed)) {
            throw new InvalidProcessoError(input);
        }

        this.components = parsed;
    }

    static isValid(input: Processo.Input): boolean {
        const parsed = parse(input);
        return parsed !== null && hasValidCheckDigits(parsed);
    }

    static safeParse(input: Processo.Input): Cnj | null {
        try { return new Cnj(input); }
        catch { return null; }
    }

    get raw(): string {
        return format(this.components, { formatted: false });
    }

    get segmentInfo(): Segment.Info {
        return getSegmentInfo(this.components.segment)!;
    }

    format(options?: FormatOptions): string {
        return format(this.components, options);
    }

    toString(): string {
        return this.format();
    }

    toJSON(): Processo.Components {
        return this.components;
    }
}