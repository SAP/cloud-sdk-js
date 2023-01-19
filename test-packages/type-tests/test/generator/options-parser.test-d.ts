import { cliOptions, parseOptions } from '@sap-cloud-sdk/generator/internal';
import { expectError, expectType } from 'tsd';

const options = {
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
    coerce: (val: string | undefined) => (val ? (1 as number) : undefined)
  }
} as const;

const parsedOptions = parseOptions(options, {
  replacing: 'x',
  deprecated: 'y'
});

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

const realParsedOptions = parseOptions(cliOptions, {});

/**
 * `inputDir` is required.
 */
expectType<string>(realParsedOptions.inputDir);

/**
 * `serviceMapping` is required because it has a default.
 */
expectType<string>(realParsedOptions.serviceMapping);

/**
 * `prettierConfig` is optional because it has no default value.
 */
expectType<string | undefined>(realParsedOptions.prettierConfig);
