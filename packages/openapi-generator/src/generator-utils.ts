import { promises } from 'fs';
import { resolve } from 'path';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { GeneratorOptions, ParsedGeneratorOptions } from './options';
import { generatorFlags } from './options/flags';
const { readFile, lstat } = promises;

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
      `Could not read config.json at ${configPath}.`,
      err
    );
  }
}

/**
 * Removes default values from a given set of parsed generator options
 * @param options parsed generator options
 * @returns generator options with removed default values
 */
export function removeDefaultValues(
  options: ParsedGeneratorOptions
): GeneratorOptions {
  return Object.entries(generatorFlags).reduce(
    (reducedOptions, [name, flag]) => {
      const value = options[name];
      if (value !== flag.default) {
        reducedOptions[name] = value;
      }
      return reducedOptions;
    },
    {} as GeneratorOptions
  );
}
