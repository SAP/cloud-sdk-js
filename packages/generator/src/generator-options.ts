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
   * @deprecated Since v2.12.0. Use `readme` instead.
   * Generate default `README.md` files in the client directories.
   */
  writeReadme?: boolean;
  /**
   * Generate default `README.md` files in the client directories.
   */
  readme?: boolean;
  /**
   * Include files matching the given glob into the root of each generated client directory.
   */
  include?: string;
  /**
   * @deprecated Since v2.12.0. Use `overwrite` instead.
   * Exit when encountering a file that already exists.
   * When set to true, it will be overwritten instead.
   * Please note that compared to the `clearOutputDir` option, this will not delete outdated files.
   */
  forceOverwrite?: boolean;
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
   * @deprecated
   * Generate a `.npmrc` file specifying a registry for `@sap` scoped dependencies.
   */
  generateNpmrc?: boolean;
  /**
   * @deprecated Since v2.12.0. Use `packageJson` instead.
   * Generate a `package.json` file, specifying dependencies and scripts for compiling and generating documentation.
   */
  generatePackageJson?: boolean;
  /**
   * Generate a `package.json` file, specifying dependencies and scripts for compiling and generating documentation.
   */
  packageJson?: boolean;
  /**
   * @deprecated Since v2.12.0.
   * By default, when generating `package.json` file, the generator will set a version by using the generator version.
   * It can also be set to a specific version.
   */
  versionInPackageJson?: string;
  /**
   * @deprecated Since v2.12.0.
   * License name to be used on the generated package.json. Only considered if 'packageJson' is enabled.
   */
  licenseInPackageJson?: string;
  /**
   * Generates transpiled `.js`, `.js.map`, `.d.ts` and `.d.ts.map` files. When set to `false`, the generator will only generate `.ts` files.
   */
  generateJs?: boolean;
  /**
   * Hidden option only for internal usage - generate metadata for API hub integration.
   */
  generateSdkMetadata?: boolean;
  /**
   * @deprecated Since v2.12.0.
   * Number of node processes used for transpilation of JavaScript files.
   */
  processesJsGeneration?: number;
  /**
   * Number of node processes used for transpilation of JavaScript files.
   */
  transpilationProcesses?: number;
  /**
   * @deprecated Since v2.12.0.
   * When set to true, the `package.json` of generated services will have the after-version script to internally keep the versions in sync.
   */
  sdkAfterVersionScript?: boolean;
  /**
   * @deprecated Since v2.12.0.
   * Internal option used to adjust the description for S/4HANA cloud systems. Will not be used in the future.
   */
  s4hanaCloud?: boolean;
  /**
   * @deprecated Since v2.12.0.
   * Generate A CSN file for each service definition in the output directory.
   */
  generateCSN?: boolean;
  // TODO: remove packageVersion in version 3.0
  /**
   * @deprecated Since v2.12.0.
   * Internal option used to adjust the version in the generated `package.json`. Will not be used in the future.
   */
  packageVersion?: string;
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
  writeReadme: {
    describe:
      'When set to true, the generator will write a README.md file into the root folder of every package. This option does not make that much sense without also set useSwagger to "true".',
    type: 'boolean',
    default: false,
    hidden: true,
    deprecated: "Since v2.12.0. Use 'readme' instead.",
    replacedBy: 'readme'
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
  forceOverwrite: {
    describe:
      'By default, the generator will exit when encountering a file that already exists. When set to true, it will be overwritten instead. Please note that compared to the --clearOutputDir option, this will not delete outdated files.',
    type: 'boolean',
    default: false,
    deprecated: "Since v2.12.0. Use 'overwrite' instead.",
    replacedBy: 'overwrite'
  },
  clearOutputDir: {
    describe:
      'When set to true, the generator will delete EVERYTHING in the specified output directory before generating code.',
    type: 'boolean',
    default: false
  },
  generateNpmrc: {
    describe: 'Has no effect.',
    deprecated: 'Since v2.8.0. This option does not have any effect anymore.',
    type: 'boolean',
    default: false
  },
  packageJson: {
    describe:
      'By default, the generator will generate a package.json file, specifying dependencies and scripts for compiling and generating documentation. When set to false, the generator will skip the generation of the package.json.',
    type: 'boolean',
    default: true
  },
  generatePackageJson: {
    describe:
      'By default, the generator will generate a package.json file, specifying dependencies and scripts for compiling and generating documentation. When set to false, the generator will skip the generation of the package.json.',
    type: 'boolean',
    default: true,
    deprecated: "Since v2.12.0. Use 'packageJson' instead.",
    replacedBy: 'packageJson'
  },
  versionInPackageJson: {
    describe:
      'By default, when generating package.json file, the generator will set a version by using the generator version. It can also be set to a specific version.',
    type: 'string',
    deprecated:
      "Since v2.6.0. Use the 'include' option to add your own package.json file instead.",
    replacedBy: 'packageVersion'
  },
  licenseInPackageJson: {
    describe:
      "License to be used on the generated package.json. Only considered if 'generatePackageJson' is enabled.",
    type: 'string',
    requiresArg: false,
    deprecated:
      "Since v2.12.0. Use the 'include' option to add your own package.json file instead."
  },
  generateJs: {
    describe:
      'By default, the generator will also generate transpiled .js, .js.map, .d.ts and .d.ts.map files. When set to false, the generator will only generate .ts files.',
    type: 'boolean',
    default: true
  },
  transpilationProcesses: {
    describe: 'Number of processes used for generation of javascript files.',
    alias: 'np',
    type: 'number',
    default: defaultValueProcessesJsGeneration,
    hidden: true,
    replacedBy: 'processesJsGeneration'
  },
  processesJsGeneration: {
    describe: 'Number of processes used for generation of javascript files.',
    alias: 'np',
    type: 'number',
    default: defaultValueProcessesJsGeneration,
    deprecated:
      "Since v2.12.0. Use 'transpilationProcesses' option to set number of processes for generation instead."
  },
  sdkAfterVersionScript: {
    describe:
      'When set to true, the package.json of generated services will have the after-version script to internally keep the versions in sync.',
    type: 'boolean',
    default: false,
    hidden: true
  },
  generateSdkMetadata: {
    describe: 'When set to true, SDK metadata for the API hub is generated.',
    type: 'boolean',
    default: false,
    hidden: true
  },
  packageVersion: {
    describe: 'Version of the generated package.',
    type: 'string',
    default: '1.0.0',
    hidden: true
  },
  s4hanaCloud: {
    describe:
      'When set to true, the description of the generated packages will be specific to S/4HANA Cloud.',
    type: 'boolean',
    default: false,
    hidden: true
  },
  generateCSN: {
    describe:
      'When set to true a CSN file will be generated for each service definition in the output directory.',
    type: 'boolean',
    default: false,
    deprecated: 'Since v2.12.0. This functionality will be discontinued.'
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
