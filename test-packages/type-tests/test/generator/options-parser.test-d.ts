import { parseOptions } from '@sap-cloud-sdk/generator/internal';
import { expectError, expectType } from 'tsd';

const cliOptions = {
  deprecated: {
    describe: 'replaced',
    type: 'string',
    deprecated: true,
    replacedBy: 'replacing'
  },
  replacing: {
    describe: 'replacing',
    type: 'string',
    demandOption: true
  },
  optional: {
    describe: 'optional',
    type: 'string'
  },
  coerced: {
    describe: 'coerced',
    type: 'string',
    demandOption: true,
    coerce: () => 1
  },
  coercedOptional: {
    describe: 'coercedOptional',
    type: 'string',
    coerce: (val?: string) => (val ? (1 as number) : undefined)
  }
} as const;

// type s = ParsedOptions<
//   {
//     deprecatedOption?: any;
//     replacingOption: any;
//   },
//   typeof cliOptions
// >;
// type x = s['deprecatedOption'];
// type y = s['replacingOption'];

const parsedOptions = parseOptions(cliOptions, {
  replacing: 'x',
  deprecated: 'y'
});

// parsedOptions.

/**
 * Parses required option type.
 */
expectType<string>(parsedOptions.replacing);

/**
 * Parses optional option type.
 */
expectType<string | undefined>(parsedOptions.optional);

/**
 * Removes replaced deprecated options.
 */
expectError(parsedOptions.deprecated);

/**
 * Uses coerced type.
 */
expectType<number>(parsedOptions.coerced);

/**
 * Uses coerced optional type.
 */
expectType<number | undefined>(parsedOptions.coercedOptional);
