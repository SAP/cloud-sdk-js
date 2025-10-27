import { getCommonCliOptions } from '@sap-cloud-sdk/generator-common/internal';
import type {
  Options,
  ParsedOptions,
  CommonGeneratorOptions
} from '@sap-cloud-sdk/generator-common/internal';

/**
 * Options to configure OData client generation when using the generator programmatically.
 */
export interface GeneratorOptions extends CommonGeneratorOptions {
  /**
   * If set to true, swagger definitions (JSON) are used for generation.
   */
  useSwagger?: boolean;
  /**
   * Number of node processes used for transpilation of JavaScript files.
   */
  transpilationProcesses?: number;
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
  useSwagger: {
    describe:
      'Augment parsed information with information from swagger-parser definition files. Files are expected to have the same name as the EDMX file, but with .json as suffix.',
    type: 'boolean',
    default: false,
    hidden: true
  },
  transpilationProcesses: {
    describe: 'Number of processes used for generation of javascript files.',
    alias: 'np',
    type: 'number',
    default: 16,
    hidden: true,
    replacedBy: 'processesJsGeneration'
  },
  generateESM: {
    describe:
      'When enabled, all generated files follow the ECMAScript module syntax.',
    type: 'boolean',
    default: false
  },
  ...getCommonCliOptions('OData')
} as const satisfies Options<GeneratorOptions>;
