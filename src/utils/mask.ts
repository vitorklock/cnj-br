export function mask(value: string): string {
    const digits = String(value).replace(/\D/g, '').slice(0, 20)

    let result = digits.slice(0, 7)
    if (digits.length > 7)  result += '-' + digits.slice(7, 9)
    if (digits.length > 9)  result += '.' + digits.slice(9, 13)
    if (digits.length > 13) result += '.' + digits.slice(13, 14)
    if (digits.length > 14) result += '.' + digits.slice(14, 16)
    if (digits.length > 16) result += '.' + digits.slice(16, 20)

    return result
}
