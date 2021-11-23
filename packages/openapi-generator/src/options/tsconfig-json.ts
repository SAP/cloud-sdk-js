import { promises } from 'fs';
import { resolve } from 'path';
import { ErrorWithCause, formatJson } from '@sap-cloud-sdk/util';
import { ParsedGeneratorOptions } from './generator-options';
const { readFile, lstat } = promises;
/**
 * @internal
 */
export const defaultTsConfig = {
  compilerOptions: {
    target: 'es2019',
    module: 'commonjs',
    lib: ['esnext'],
    declaration: true,
    declarationMap: true,
    sourceMap: true,
    diagnostics: true,
    moduleResolution: 'node',
    esModuleInterop: true,
    inlineSources: false,
    strict: true
  },
  include: ['**/*.ts'],
  exclude: ['dist/**/*', 'node_modules/**/*']
};

/**
 * Build a tsconfig.json file as string.
 * If the given options include a tsConfig setting, this config is read and returned.
 * @param options - Options passed to the generator.
 * @returns The serialized tsconfig.json contents.
 * @internal
 */
export async function tsconfigJson({
  transpile,
  tsConfig
}: ParsedGeneratorOptions): Promise<string | undefined> {
  if (transpile || tsConfig) {
    return tsConfig
      ? readCustomTsConfig(tsConfig)
      : formatJson(defaultTsConfig);
  }
}

async function readCustomTsConfig(configPath: string): Promise<string> {
  try {
    if ((await lstat(configPath)).isDirectory()) {
      configPath = resolve(configPath, 'tsconfig.json');
    }
    return await readFile(configPath, 'utf8');
  } catch (err) {
    throw new ErrorWithCause(
      `Could not read tsconfig.json at ${configPath}.`,
      err
    );
  }
}
