// eslint-disable-next-line import/no-internal-modules
import {
  ParsedOptions,
  Options,
  getCommonCliOptions,
  CommonGeneratorOptions
} from '@sap-cloud-sdk/generator-common/internal';

/**
 * Options to configure OData client generation when using the generator programmatically.
 */
export type GeneratorOptions = CommonGeneratorOptions;

/**
 * @internal
 * Represents the parsed generator options.
 */
export type ParsedGeneratorOptions = ParsedOptions<typeof cliOptions>;

/**
 * @internal
 */
export const cliOptions = {
  ...getCommonCliOptions('OpenApi')
} as const satisfies Options<GeneratorOptions>;
