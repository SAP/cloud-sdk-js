import { promises } from 'fs';
import { resolve } from 'path';
import yargs from 'yargs';
import { ErrorWithCause, createLogger } from '@sap-cloud-sdk/util';
import { generatorOptions } from './flags';

const { readFile, lstat } = promises;
const logger = createLogger('openapi-generator');

/**
 * Options that can be used to configure the generation when using the generator programmatically.
 * The options match the CLI options.
 */
export interface GeneratorOptions {
  input: string;
  outputDir: string;
  transpile: boolean;
  include?: string[];
  overwrite: boolean;
  clearOutputDir: boolean;
  skipValidation: boolean;
  tsConfig?: string;
  packageJson: boolean;
  verbose: boolean;
  optionsPerService?: string;
  packageVersion?: string;
  readme: boolean;
  metadata: boolean;
  config?: string;
}

/**
 * Parse the given generator options for programmatic use.
 * This function is only used when invoking the generator programmatically.
 * It parses the options that were passed to [[generate]] and sets default values where necessary.
 * The parsing is done through the `parse` function and `default` value on the `OpenApiGenerator` command's flags.
 * @param options - Options that match the CLI options.
 * @returns Parsed options with default values.
 */
export function parseGeneratorOptions(
  options: GeneratorOptions
): GeneratorOptions {
  return Object.entries(generatorOptions).reduce(
    (parsedOptions, [name, flag]: [string, yargs.Options]) => {
      const value = options[name];
      if (typeof value !== 'undefined') {
        parsedOptions[name] = value;
      } else if (typeof flag.default !== 'undefined') {
        parsedOptions[name] = flag.default;
      }
      return parsedOptions;
    },
    {} as GeneratorOptions
  );
}

/**
 * Parses a given path to a config file or directory and returns its content
 * @param configPath - path to a config file or a directory containing a config.json
 * @returns Options to configure generation
 */
export async function parseOptionsFromConfig(
  configPath: string
): Promise<GeneratorOptions> {
  try {
    if ((await lstat(configPath)).isDirectory()) {
      configPath = resolve(configPath, 'config.json');
    }
    const generatorOpts = JSON.parse(await readFile(configPath, 'utf8'));
    Object.keys(generatorOpts).forEach(key => {
      if (!Object.keys(generatorOptions).includes(key)) {
        logger.warn(
          `"${key}" is not part of the configuration and will be ignored.`
        );
      }
    });
    return generatorOpts;
  } catch (err) {
    throw new ErrorWithCause(
      `Could not read configuration file at ${configPath}.`,
      err
    );
  }
}

/**
 * Returns only values that were specified
 * @param options - parsed generator options
 * @param rawInputFlags - the raw input keys
 * @returns generator options that were used in the raw input
 */
export function getSpecifiedFlags(
  options: GeneratorOptions,
  rawInputFlags: string[]
): GeneratorOptions {
  return rawInputFlags.reduce((reducedOptions, name) => {
    const value = options[name];
    if (value !== undefined) {
      reducedOptions[name] = value;
    }
    return reducedOptions;
  }, {} as GeneratorOptions);
}
