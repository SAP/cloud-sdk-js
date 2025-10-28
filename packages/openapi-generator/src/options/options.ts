import { getCommonCliOptions } from '@sap-cloud-sdk/generator-common/internal';
import type { CommonGeneratorOptions } from '@sap-cloud-sdk/generator-common';
import type { ParsedOptions, Options } from '@sap-cloud-sdk/generator-common/internal';

/**
 * Options to configure OData client generation when using the generator programmatically.
 */
export type GeneratorOptions = CommonGeneratorOptions & OpenAPIGeneratorOptions;

/**
 * Options to configure OpenAPI client generation when using the generator programmatically.
 */
export interface OpenAPIGeneratorOptions {
  /**
   * Whether to generate ECMAScript modules instead of CommonJS modules.
   */
  generateESM?: boolean;
  /**
   * Prefix all schema names with a value.
   * @experimental
   */
  schemaPrefix?: string;
  /**
   * Resolve external references.
   */
  resolveExternal?: boolean;
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
      'Prefix all schema names with a value. This is useful to avoid naming conflicts when multiple services are generated.',
    type: 'string',
    default: '',
    hidden: true
  },
  resolveExternal: {
    describe:
      'By default, external $ref pointers will be resolved. If set to false, external $ref pointers will be ignored.',
    type: 'boolean',
    default: true,
    hidden: true
  }
} as const satisfies Options<GeneratorOptions>;
