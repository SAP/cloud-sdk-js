import { promises } from 'fs';
import { resolve } from 'path';
import Parser from '@oclif/parser';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { ParsingToken } from '@oclif/parser/lib/parse';
import OpenApiGenerator from '../cli';
import { generatorFlags } from './flags';
const { readFile, lstat } = promises;

/**
 * Options that can be used to configure the generation when using the generator programmatically.
 * The options match the CLI options.
 */
export interface GeneratorOptions {
  input: string;
  outputDir: string;
  transpile?: boolean;
  include?: string;
  clearOutputDir?: boolean;
  skipValidation?: boolean;
  tsConfig?: string;
  packageJson?: boolean;
  optionsPerService?: string;
  packageVersion?: string;
  readme?: boolean;
  metadata?: boolean;
  verbose?: boolean;
  overwrite?: boolean;
  config?: string;
}

/**
 * Parsed options with default values.
 */
export type ParsedGeneratorOptions = typeof OpenApiGenerator extends Parser.Input<
  infer F
>
  ? F
  : never;

/**
 * Parse the given generator options for programmatic use.
 * This function is only used when invoking the generator programmatically.
 * It parses the options that were passed to [[generate]] and sets default values where necessary.
 * The parsing is done through the `parse` function and `default` value on the `OpenApiGenerator` command's flags.
 * @param options Options that match the CLI options.
 * @returns Parsed options with default values.
 */
export function parseGeneratorOptions(
  options: GeneratorOptions
): ParsedGeneratorOptions {
  return Object.entries(generatorFlags).reduce(
    (parsedOptions, [name, flag]) => {
      const value = options[name];
      if (typeof value !== 'undefined') {
        parsedOptions[name] = flag.parse(value as never, undefined);
      } else if (typeof flag.default !== undefined) {
        parsedOptions[name] = flag.default;
      }
      return parsedOptions;
    },
    {} as ParsedGeneratorOptions
  );
}

/**
 * Parses a given path to a config file or directory and returns its content
 * @param configPath path to a config file or a directory containing a config.json
 * @returns Options to configure generation
 */
export async function parseOptionsFromConfig(
  configPath: string
): Promise<GeneratorOptions> {
  try {
    if ((await lstat(configPath)).isDirectory()) {
      configPath = resolve(configPath, 'config.json');
    }
    return JSON.parse(await readFile(configPath, 'utf8'));
  } catch (err) {
    throw new ErrorWithCause(
      `Could not read configuration file at ${configPath}.`,
      err
    );
  }
}

/**
 * Removes values that are not in the raw input
 * @param options parsed generator options
 * @param rawInput the raw input
 * @returns generator options that were used in the raw input
 */
export function removeDefaultValues(
  options: ParsedGeneratorOptions,
  rawInput: ParsingToken[]
): GeneratorOptions {
  return Object.entries(parseRawInput(rawInput)).reduce(
    (reducedOptions, [name]) => {
      const value = options[name];
      if (value !== undefined) {
        reducedOptions[name] = value;
      }
      return reducedOptions;
    },
    {} as GeneratorOptions
  );
}

/**
 * Creates generator options out of raw input values
 * @param input raw input values
 * @returns generator options
 */
export function parseRawInput(input: ParsingToken[]): GeneratorOptions {
  return input.reduce(
    (rawInput, item) => ({
      ...rawInput,
      [item['flag']]: item['input']
    }),
    {} as GeneratorOptions
  );
}
