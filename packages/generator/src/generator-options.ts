import { PathLike } from 'fs';
import { resolve, dirname } from 'path';
import { readFileSync } from 'fs-extra';
import { Options } from 'yargs';
import { createLogger } from '@sap-cloud-sdk/util';

const logger = createLogger('generator-options');

/**
 * Options that can be used to configure the generation when using the generator programmatically.
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
   * TODO-JSDOC.
   */
  useSwagger: boolean;
  /**
   * TODO-JSDOC.
   */
  writeReadme: boolean;
  /**
   * Include files matching the given glob into the root of each generated client directory.
   */
  include?: string;
  /**
   * Exit when encountering a file that already exists.
   * When set to true, it will be overwritten instead.
   * Please note that compared to the `clearOutputDir` option, this will not delete outdated files.
   */
  forceOverwrite: boolean;
  /**
   * Delete EVERYTHING in the specified output directory before generating code.
   */
  clearOutputDir: boolean;
  /**
   * Generate a `.npmrc` file specifying a registry for `@sap` scoped dependencies.
   * @deprecated
   */
  generateNpmrc: boolean;
  /**
   * Generate a `package.json` file, specifying dependencies and scripts for compiling and generating documentation.
   */
  generatePackageJson: boolean;
  /**
   * By default, when generating `package.json` file, the generator will set a version by using the generator version.
   * It can also be set to a specific version.
   */
  versionInPackageJson?: string;
  /**
   * TODO-JSDOC.
   */
  licenseInPackageJson?: string;
  /**
   * Generates transpiled `.js`, `.js.map`, `.d.ts` and `.d.ts.map` files. When set to `false`, the generator will only generate `.ts` files.
   */
  generateJs: boolean;
  /**
   * TODO-JSDOC.
   */
  generateSdkMetadata?: boolean;
  /**
   * Number of node processes used for transpilation of JavaScript files.
   */
  processesJsGeneration?: number;
  /**
   * TODO-JSDOC.
   */
  sdkAfterVersionScript: boolean;
  /**
   * TODO-JSDOC.
   */
  s4hanaCloud: boolean;
  /**
   * Generate A CSN file for each service definition in the output directory.
   */
  generateCSN: boolean;
  /**
   * TODO-JSDOC.
   */
  packageVersion?: string;
}
/**
 * @internal
 */
export const defaultValueProcessesJsGeneration = 16;

type KeysToOptions = {
  [optionName in keyof GeneratorOptions]: Options;
};

function coercePathArg(arg?: string): string | undefined {
  return arg ? resolve(arg) : arg;
}

/**
 * @internal
 */
export const generatorOptionsCli: KeysToOptions = {
  inputDir: {
    alias: 'i',
    describe:
      'This directory will be recursively searched for `.edmx`/`.xml` files.',
    normalize: true,
    coerce: coercePathArg,
    type: 'string',
    demandOption: true,
    requiresArg: true
  },
  outputDir: {
    alias: 'o',
    describe: 'Directory to save the generated code in.',
    normalize: true,
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
  useSwagger: {
    describe:
      'Augment parsed information with information from swagger-parser definition files. Files are expected to have the same name as the EDMX file, but with .json as suffix.',
    type: 'boolean',
    default: false,
    hidden: true
  },
  writeReadme: {
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
  forceOverwrite: {
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
  generateNpmrc: {
    describe:
      'Deprecated. If set to true the generator will generate an .npmrc file specifying a registry for @sap scoped dependencies. This is not necessary anymore and will be skipped by default.',
    type: 'boolean',
    default: false
  },
  generatePackageJson: {
    describe:
      'By default, the generator will generate a package.json file, specifying dependencies and scripts for compiling and generating documentation. When set to false, the generator will skip the generation of the package.json.',
    type: 'boolean',
    default: true
  },
  versionInPackageJson: {
    describe:
      'By default, when generating package.json file, the generator will set a version by using the generator version. It can also be set to a specific version.',
    type: 'string',
    deprecated:
      "Since v2.6.0. Use the 'include' option to add your own package.json file instead.",
    coerce: (input: string): string => {
      logger.warn(
        "The option 'versionInPackageJson' is deprecated since v2.6.0. Use the 'include' option to add your own package.json file instead."
      );
      return input;
    }
  },
  licenseInPackageJson: {
    describe:
      "License to be used on the generated package.json. Only considered is 'generatePackageJson' is enabled.",
    type: 'string',
    requiresArg: false
  },
  generateJs: {
    describe:
      'By default, the generator will also generate transpiled .js, .js.map, .d.ts and .d.ts.map files. When set to false, the generator will only generate .ts files.',
    type: 'boolean',
    default: true
  },
  processesJsGeneration: {
    describe: 'Number of processes used for generation of javascript files.',
    alias: 'np',
    type: 'number',
    default: defaultValueProcessesJsGeneration
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
    default: false
  }
};

/**
 * @internal
 */
export function createOptionsFromConfig(configPath: string): GeneratorOptions {
  const file = readFileSync(configPath, 'utf-8');
  const pathLikeKeys = ['inputDir', 'outputDir', 'serviceMapping'];
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
