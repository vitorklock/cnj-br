# cnj-br

[![npm](https://img.shields.io/npm/v/cnj-br)](https://www.npmjs.com/package/cnj-br)
[![build](https://github.com/vitorklock/cnj-br/actions/workflows/ci.yml/badge.svg)](https://github.com/vitorklock/cnj-br/actions/workflows/ci.yml)
[![maintainability](https://api.codeclimate.com/v1/badges/qltcp_OllQMmqAFZma76hB/maintainability)](https://codeclimate.com/github/vitorklock/cnj-br/maintainability)
[![issues](https://img.shields.io/github/issues/vitorklock/cnj-br)](https://github.com/vitorklock/cnj-br/issues)
[![license](https://img.shields.io/github/license/vitorklock/cnj-br)](./LICENSE)

Parse, validate, format, and inspect Brazilian CNJ processo numbers.

## Install

```bash
pnpm add cnj-br
# or
npm i cnj-br
# or
yarn add cnj-br
```

## Usage

The `Cnj` class is an ergonomic entry point. Pass it a formatted or digit-only processo number; it parses and validates in the constructor.

```ts
import { Cnj } from 'cnj-br'

const cnj = new Cnj('0000001-45.2024.8.26.0001')
// or: new Cnj('00000014520248260001')

cnj.format()                      // '0000001-45.2024.8.26.0001'
cnj.raw                           // '00000014520248260001'
cnj.segmentInfo                   // { code: 'TJ', name: 'Justiça Estadual' }
cnj.components                    // { sequentialNumber, checkDigits, year, segment, court, originUnit }

JSON.stringify(cnj)               // serializes the components
```

For form validation, use the static helpers - they don't throw.

```ts
Cnj.isValid('0000001-45.2024.8.26.0001')  // true
Cnj.isValid('garbage')                     // false

const cnj = Cnj.safeParse(userInput)       // Cnj | null
if (cnj) {
    // use cnj.format(), cnj.segmentInfo, etc.
}
```

## Functional API

If you only need a single operation and don't want to instantiate a class, use the standalone functions.

```ts
import {
    parse,
    format,
    calculateCheckDigits,
    hasValidCheckDigits,
    getSegmentInfo,
} from 'cnj-br'

parse('0000001-45.2024.8.26.0001')         // Processo.Components | null
format(components)                          // formatted string
format(components, { formatted: false })    // 20-digit string

calculateCheckDigits({                      // returns '45'
    sequentialNumber: '0000001',
    year: '2024',
    segment: '8',
    court: '26',
    originUnit: '0001',
})
hasValidCheckDigits(components)             // boolean

getSegmentInfo('8')   // { code: 'TJ', name: 'Justiça Estadual' }
getSegmentInfo(8)     // same - number or string both work
getSegmentInfo('99')  // null
```

## Error handling

There are three ways to handle invalid input - pick the one that fits your call site.

```ts
import { Cnj, InvalidProcessoError } from 'cnj-br'

// 1. Constructor throws
try {
    const cnj = new Cnj(input)
} catch (err) {
    if (err instanceof InvalidProcessoError) {
        // ...
    }
}

// 2. isValid returns a boolean
if (Cnj.isValid(input)) { /* ... */ }

// 3. safeParse returns Cnj | null
const cnj = Cnj.safeParse(input)
if (cnj) { /* ... */ }
```

## Components

`parse()` and `cnj.components` return the processo broken into its six parts:

```ts
namespace Processo {
    interface Components {
        sequentialNumber: string  // NNNNNNN — 7 digits, sequential within (year, court)
        checkDigits: string       // DD      — 2 digits, ISO 7064 mod 97-10
        year: string              // AAAA    — 4 digits, year the case was filed
        segment: string           // J       — 1 digit, justice segment (1-9)
        court: string             // TR      — 2 digits, court within the segment
        originUnit: string        // OOOO    — 4 digits, originating unit
    }
}
```

Segment digits map to their relative entity: `1` STF, `2` CNJ, `3` STJ, `4` Justiça Federal, `5` Justiça do Trabalho, `6` Justiça Eleitoral, `7` Justiça Militar da União, `8` Justiça Estadual, `9` Justiça Militar Estadual.

## About the format

The CNJ processo number follows the pattern `NNNNNNN-DD.AAAA.J.TR.OOOO` defined by [Resolução nº 65/2008 do CNJ](https://atos.cnj.jus.br/atos/detalhar/119). The two check digits are computed with ISO 7064 mod 97-10 over the other 18 digits, which is what `hasValidCheckDigits` verifies.

## Contributing

Contributions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](./LICENSE)
