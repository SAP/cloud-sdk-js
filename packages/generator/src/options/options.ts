import {
  Options,
  ParsedOptions,
  resolveRequiredPath,
  CommonGeneratorOptions,
  getCommonCliOptions
} from '@sap-cloud-sdk/generator-common/internal';

/**
 * Options to configure the client generation when using the generator programmatically.
 */
export interface GeneratorOptions extends CommonGeneratorOptions {
  /**
   * This directory will be recursively searched for `.edmx`/`.xml` files.
   */
  input: string;
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
const odataReadmeText =
  "\"When set to true, the generator will write a README.md file into the root folder of every package. The information in the readme are mostly derived from accompanying Swagger or OpenAPI files. Therefore it is recommended to use the 'readme' option in combination with 'useSwagger'.\",";

/**
 * @internal
 */
export const cliOptions = {
  input: {
    alias: 'i',
    describe:
      'This directory will be recursively searched for EDMX and XML files.',
    coerce: resolveRequiredPath,
    type: 'string',
    demandOption: true,
    requiresArg: true
  },
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
  ...getCommonCliOptions(odataReadmeText)
} as const satisfies Options<GeneratorOptions>;
