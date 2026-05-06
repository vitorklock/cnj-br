import { Processo } from "@/entities";

/**
 * Computes the 2 check digits using ISO 7064 mod 97-10
 * (per CNJ Resolution 65/2008).
 */
export function calculateCheckDigits(
    components: Omit<Processo.Components, 'checkDigits'>,
): string {
    const { sequentialNumber, year, segment, court, originUnit } = components;
    const base = sequentialNumber + year + segment + court + originUnit + '00';

    let mod = 0;
    for (const ch of base) mod = (mod * 10 + Number(ch)) % 97;

    return String(98 - mod).padStart(2, '0');
}

export function hasValidCheckDigits(components: Processo.Components): boolean {
    return calculateCheckDigits(components) === components.checkDigits;
}