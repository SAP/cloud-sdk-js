// eslint-disable-next-line import/no-internal-modules
import {
  ParsedOptions,
  Options,
  resolveRequiredPath,
  getCommonCliOptions,
  CommonGeneratorOptions
} from '@sap-cloud-sdk/generator-common/internal';

/**
 * Options to configure the client generation when using the generator programmatically.
 */
export interface GeneratorOptions extends CommonGeneratorOptions {
  /**
   * Specify the path to the directory or file containing the OpenAPI service definition(s) to generate clients for.
   * Accepts Swagger and OpenAPI definitions as YAML and JSON files.
   * Throws an error if the path does not exist.
   */
  input: string;
}

/**
 * @internal
 * Represents the parsed generator options.
 */
export type ParsedGeneratorOptions = ParsedOptions<typeof cliOptions>;

const openApiReadmeText =
  'Generate default `README.md` files in the client directories.';
/**
 * @internal
 */
export const cliOptions = {
  input: {
    alias: 'i',
    describe:
      'Specify the path to the directory or file containing the OpenAPI service definition(s) to generate clients for. Accepts Swagger and OpenAPI definitions as YAML and JSON files. Throws an error if the path does not exist.',
    coerce: resolveRequiredPath,
    type: 'string',
    demandOption: true,
    requiresArg: true
  },
  ...getCommonCliOptions(openApiReadmeText)
} as const satisfies Options<GeneratorOptions>;
