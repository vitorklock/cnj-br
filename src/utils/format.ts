import { Processo } from "@/entities";

export interface FormatOptions {
    formatted?: boolean
}

export function format(
    components: Processo.Components,
    options: FormatOptions = {},
): string {
    const { sequentialNumber, checkDigits, year, segment, court, originUnit } = components;

    if (options.formatted === false) {
        return `${sequentialNumber}${checkDigits}${year}${segment}${court}${originUnit}`;
    }

    return `${sequentialNumber}-${checkDigits}.${year}.${segment}.${court}.${originUnit}`;
}

export function toRaw(components: Processo.Components): string {
    return format(components, { formatted: false });
}