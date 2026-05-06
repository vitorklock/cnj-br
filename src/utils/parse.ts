import { Processo, VALID_SEGMENTS } from "@/entities";
import { REGEX_DIGITS, REGEX_FORMATTED } from "@/consts";

export function parseFormatted(input: Processo.Input): Processo.Components | null {
    const match = String(input).trim().match(REGEX_FORMATTED);
    if (!match) return null;

    const [, sequentialNumber, checkDigits, year, segment, court, originUnit] = match;
    if (!VALID_SEGMENTS.has(segment)) return null;

    return { sequentialNumber, checkDigits, year, segment, court, originUnit };
}

export function parseDigits(input: Processo.Input): Processo.Components | null {
    const digits = String(input).replace(/\D/g, '');
    if (!REGEX_DIGITS.test(digits)) return null;

    const sequentialNumber = digits.slice(0, 7);
    const checkDigits = digits.slice(7, 9);
    const year = digits.slice(9, 13);
    const segment = digits.slice(13, 14);
    const court = digits.slice(14, 16);
    const originUnit = digits.slice(16, 20);

    if (!VALID_SEGMENTS.has(segment)) return null;

    return { sequentialNumber, checkDigits, year, segment, court, originUnit };
}

export function parse(input: Processo.Input): Processo.Components | null {
    return parseFormatted(input) ?? parseDigits(input);
}