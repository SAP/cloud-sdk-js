import { PathLike } from 'fs';
import { resolve, dirname, join } from 'path';
import {
  Options,
  ParsedOptions
} from '@sap-cloud-sdk/generator-common/internal';

/**
 * Options to configure the client generation when using the generator programmatically.
 */
export interface GeneratorOptions {
  /**
   * This directory will be recursively searched for `.edmx`/`.xml` files.
   */
  inputDir: PathLike;
  /**
   * Directory to save the generated code in.
   */
  outputDir: PathLike;
  /**
   * Configuration file to ensure consistent names between multiple generation runs with updated / changed metadata files.
   * Will be generated if not existent.
   * Default set to `inputDir/service-mapping.json`.
   */
  serviceMapping?: PathLike;
  /**
   * Specify the path to the prettier config. If not given a default config will be used for the generated sources.
   */
  prettierConfig?: PathLike;
  /**
   * If set to true, swagger definitions (JSON) are used for generation.
   */
  useSwagger?: boolean;
  /**
   * Generate default `README.md` files in the client directories.
   */
  readme?: boolean;
  /**
   * Include files matching the given glob into the root of each generated client directory.
   */
  include?: string;
  /**
   * Exit when encountering a file that already exists.
   * When set to true, it will be overwritten instead.
   * Note, that compared to the `clearOutputDir` option, this will not delete outdated files.
   */
  overwrite?: boolean;
  /**
   * Delete EVERYTHING in the specified output directory before generating code.
   */
  clearOutputDir?: boolean;
  /**
   * Generate a `package.json` file, specifying dependencies and scripts for compiling.
   */
  packageJson?: boolean;
  /**
   * When enabled, generates transpiled `.js`, `.js.map`, and `.d.ts` files.
   * By default, only `.ts` files are generated.
   */
  transpile?: boolean;
  /**
   * Replace the default `tsconfig.json` by passing a path to a custom configuration.
   * By default, a `tsconfig.json` is only generated when transpilation is enabled (`transpile`).
   * If a directory is passed, a `tsconfig.json` file is read from this directory.
   */
  tsconfig?: string;
  /**
   * Hidden option only for internal usage - generate metadata for API hub integration.
   */
  generateSdkMetadata?: boolean;
  /**
   * Number of node processes used for transpilation of JavaScript files.
   */
  transpilationProcesses?: number;
  /**
   * By default, only errors, warnings and important info logs will be displayed.
   * If set to true, all logs will be displayed.
   */
  verbose?: boolean;
  /**
   * Generation will stop if objects need renaming due to non-unique conditions or conflicts to JavaScript keywords.
   * If you enable this option, conflicts are resolved by appending postfixes like '_1".
   */
  skipValidation?: boolean;
}

/**
 * Resolves arguments that represent paths to an absolute path as a `string`. Only works for required options.
 * @param arg - Path argument as passed by the user.
 * @param options - Options as passed by the user.
 * @returns Absolute path as a `string`.
 */
function resolveRequiredPath(
  arg: PathLike,
  options: GeneratorOptions & { config?: string }
): string {
  return options.config
    ? resolve(dirname(options.config), arg.toString())
    : resolve(arg.toString());
}

/**
 * Same as `resolveRequiredPath`, but for non-required options.
 * @param arg - Path argument as passed by the user, or `undefined` if nothing was passed.
 * @param options - Options as passed by the user.
 * @returns Absolute path as a `string` or `undefined`.
 */
function resolvePath(
  arg: PathLike | undefined,
  options: GeneratorOptions & { config?: string }
): string | undefined {
  return arg ? resolveRequiredPath(arg, options) : undefined;
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
  inputDir: {
    alias: 'i',
    describe:
      'This directory will be recursively searched for EDMX and XML files.',
    coerce: resolveRequiredPath,
    type: 'string',
    demandOption: true,
    requiresArg: true
  },
  outputDir: {
    alias: 'o',
    describe: 'Directory to save the generated code in.',
    coerce: resolveRequiredPath,
    type: 'string',
    demandOption: true,
    requiresArg: true
  },
  serviceMapping: {
    alias: 's',
    describe:
      'Configuration file to ensure consistent names between multiple generation runs with updated / changed metadata files. Will be generated if not existent. By default it will be saved to/read from the input directory as "service-mapping.json".',
    type: 'string',
    coerce: (
      arg: string | undefined,
      options: GeneratorOptions & { config?: string }
    ) =>
      resolveRequiredPath(
        arg ? arg : join(options.inputDir.toString(), 'service-mapping.json'),
        options
      )
  },
  prettierConfig: {
    alias: 'p',
    describe:
      'Configuration file to the prettier config relative to the generator config file',
    type: 'string',
    coerce: resolvePath,
    requiresArg: true
  },
  useSwagger: {
    describe:
      'Augment parsed information with information from swagger-parser definition files. Files are expected to have the same name as the EDMX file, but with .json as suffix.',
    type: 'boolean',
    default: false,
    hidden: true
  },
  readme: {
    describe:
      "When set to true, the generator will write a README.md file into the root folder of every package. The information in the readme are mostly derived from accompanying Swagger or OpenAPI files. Therefore it is recommended to use the 'readme' option in combination with 'useSwagger'.",
    type: 'boolean',
    default: false,
    hidden: true
  },
  include: {
    describe:
      'Glob describing additional files to be added to the each generated service directory - relative to the inputDir.',
    type: 'string',
    coerce: resolvePath,
    requiresArg: true
  },
  overwrite: {
    describe:
      'By default, the generator will exit when encountering a file that already exists. When set to true, it will be overwritten instead. Please note that compared to the --clearOutputDir option, this will not delete outdated files.',
    type: 'boolean',
    default: false
  },
  clearOutputDir: {
    describe:
      'When set to true, the generator will delete EVERYTHING in the specified output directory before generating code.',
    type: 'boolean',
    default: false
  },
  packageJson: {
    describe:
      'When enabled, a `package.json` that specifies dependencies and scripts for transpilation is generated.',
    type: 'boolean',
    default: false
  },
  transpile: {
    describe:
      'Transpile the generated TypeScript code. When enabled a default `tsconfig.json` will be generated and used. It emits `.js`, `.js.map`, and `.d.ts` files. To configure transpilation set `--tsconfig`.',
    type: 'boolean',
    default: false
  },
  tsconfig: {
    describe:
      'Replace the default `tsconfig.json` by passing a path to a custom config. By default, a `tsconfig.json` is only generated, when transpilation is enabled (`--transpile`). If a directory is passed, a `tsconfig.json` file is read from this directory.',
    type: 'string',
    coerce: resolvePath
  },
  transpilationProcesses: {
    describe: 'Number of processes used for generation of javascript files.',
    alias: 'np',
    type: 'number',
    default: 16,
    hidden: true,
    replacedBy: 'processesJsGeneration'
  },
  generateSdkMetadata: {
    describe: 'When set to true, SDK metadata for the API hub is generated.',
    type: 'boolean',
    default: false,
    hidden: true
  },
  verbose: {
    describe:
      'By default, only errors, warnings and important info logs will be displayed. If set to true, all logs will be displayed.',
    type: 'boolean',
    default: false
  },
  skipValidation: {
    describe:
      "Generation will stop if objects need renaming due to non-unique conditions or conflicts to JavaScript keywords. If you enable this option, conflicts are resolved by appending postfixes like '_1'",
    type: 'boolean',
    default: false
  }
} as const satisfies Options<GeneratorOptions>;
