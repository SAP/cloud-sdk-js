import { PathLike } from 'fs';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs-extra';

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
 * @internal
 */
export const defaultValueProcessesJsGeneration = 16;

function coercePathArg(arg?: string): string | undefined {
  return arg ? resolve(arg) : arg;
}

/**
 * Union type of the deprecated option names.
 * @typeParam T - Options configuration.
 */
type DeprecatedOptionNamesWithReplacements<T> = {
  [K in keyof T]: T[K] extends { deprecated: string; replacedBy: string }
    ? K
    : never;
}[keyof T];

/**
 * @internal
 * Helper to represent parsed options based on a public generator options type and a CLI options configuration.
 * @typeParam GeneratorOptionsOptionsT - Public generator options.
 * @typeParam CliOptionsT - Configuration of CLI options.
 */
export type ParsedOptions<GeneratorOptionsOptionsT, CliOptionsT> = Omit<
  Required<GeneratorOptionsOptionsT>,
  DeprecatedOptionNamesWithReplacements<CliOptionsT>
>;

/**
 * @internal
 * Represents the parsed generator options.
 */
export type ParsedGeneratorOptions = ParsedOptions<
  GeneratorOptions,
  typeof generatorOptionsCli
>;

/**
 * @internal
 */
export const generatorOptionsCli = {
  inputDir: {
    alias: 'i',
    describe:
      'This directory will be recursively searched for `.edmx`/`.xml` files.',
    coerce: coercePathArg,
    type: 'string',
    demandOption: true,
    requiresArg: true
  },
  outputDir: {
    alias: 'o',
    describe: 'Directory to save the generated code in.',
    coerce: coercePathArg,
    type: 'string',
    demandOption: true,
    requiresArg: true
  },
  serviceMapping: {
    alias: 's',
    describe:
      'Configuration file to ensure consistent names between multiple generation runs with updated / changed metadata files. Will be generated if not existent. By default it will be saved to/read from the input directory as "service-mapping.json".',
    type: 'string',
    coerce: coercePathArg,
    normalize: true
  },
  prettierConfig: {
    alias: 'p',
    describe:
      'Configuration file to the prettier config relative to the generator config file',
    type: 'string',
    coerce: coercePathArg,
    normalize: true
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
      'When set to true, the generator will write a README.md file into the root folder of every package. This option does not make that much sense without also set useSwagger to "true".',
    type: 'boolean',
    default: false,
    hidden: true
  },
  include: {
    describe:
      'Glob describing additional files to be added to the each generated service directory - relative to the inputDir.',
    type: 'string',
    coerce: coercePathArg,
    normalize: true
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
    string: true,
    describe:
      'Replace the default `tsconfig.json` by passing a path to a custom config. By default, a `tsconfig.json` is only generated, when transpilation is enabled (`--transpile`). If a directory is passed, a `tsconfig.json` file is read from this directory.',
    coerce: coercePathArg
  },
  transpilationProcesses: {
    describe: 'Number of processes used for generation of javascript files.',
    alias: 'np',
    type: 'number',
    default: defaultValueProcessesJsGeneration,
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
} as const;

/**
 * @internal
 */
export function createOptionsFromConfig(configPath: string): GeneratorOptions {
  const file = readFileSync(configPath, 'utf-8');
  const pathLikeKeys = [
    'inputDir',
    'outputDir',
    'serviceMapping',
    'prettierConfig'
  ];
  return pathLikeKeys.reduce(
    (json, pathLikeKey) =>
      typeof json[pathLikeKey] === 'undefined'
        ? json
        : {
            ...json,
            [pathLikeKey]: resolve(dirname(configPath), json[pathLikeKey])
          },
    JSON.parse(file)
  );
}
