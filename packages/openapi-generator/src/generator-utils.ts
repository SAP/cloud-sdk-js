import { promises } from 'fs';
import { resolve } from 'path';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { GeneratorOptions } from './options';
const { readFile, lstat } = promises;

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
      `Could not read tsconfig.json at ${configPath}.`,
      err
    );
  }
}
