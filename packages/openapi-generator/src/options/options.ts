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
export type GeneratorOptions = CommonGeneratorOptions & OpenAPIGeneratorOptions;

/**
 * Options to configure OpenAPI client generation when using the generator programmatically.
 */
export interface OpenAPIGeneratorOptions {
  /**
   * Prefix all schema names with a value.
   * @experimental
   */
  schemaPrefix?: string;
  /**
   * Whether to generate ECMAScript modules instead of CommonJS modules.
   */
  generateESM?: boolean;
}

/**
 * @internal
 * Represents the parsed generator options.
 */
export type ParsedGeneratorOptions = ParsedOptions<typeof cliOptions>;

/**
 * @internal
 */
export const cliOptions = {
  ...getCommonCliOptions('OpenApi'),
  generateESM: {
    describe:
      'When enabled, all generated files follow the ECMAScript module syntax.',
    type: 'boolean',
    default: false
  },
  schemaPrefix: {
    describe:
      'When enabled, all generated files follow the ECMAScript module syntax.',
    type: 'string',
    default: undefined
  }
} as const satisfies Options<GeneratorOptions>;
