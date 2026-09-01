import { promises } from 'fs';
import { resolve } from 'path';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
const { readFile, lstat } = promises;
/**
 * @internal
 */
export const defaultTsConfig = (
  generateEsm?: boolean
): Record<string, any> => ({
  compilerOptions: {
    target: 'es2021',
    module: generateEsm ? 'nodenext' : 'node16',
    lib: ['esnext'],
    declaration: true,
    declarationMap: false,
    sourceMap: true,
    diagnostics: true,
    moduleResolution: generateEsm ? 'nodenext' : 'node16',
    esModuleInterop: true,
    inlineSources: false,
    strict: true
  },
  include: ['**/*.ts'],
  exclude: ['dist/**/*', 'test/**/*', '**/*.spec.ts', 'node_modules/**/*']
});
/**
 * @internal
 */
export function formatTsConfig(generateEsm?: boolean): string {
  return JSON.stringify(defaultTsConfig(generateEsm), null, 2) + '\n';
}

/**
 * @internal
 */
export async function readCustomTsConfig(configPath: string): Promise<string> {
  try {
    if ((await lstat(configPath)).isDirectory()) {
      configPath = resolve(configPath, 'tsconfig.json');
    }
    return await readFile(configPath, 'utf8');
  } catch (err) {
    throw new ErrorWithCause(
      `Could not read tsconfig.json at ${configPath}.`,
      err as Error
    );
  }
}

/**
 * Build a tsconfig.json file as string.
 * If transpile is true or tsconfig is provided, return the appropriate config.
 * @param transpile - Whether to transpile.
 * @param tsconfig - Path to custom tsconfig file.
 * @param generateEsm - Whether to generate ES modules instead of CommonJS.
 * @returns The serialized tsconfig.json contents.
 * @internal
 */
export async function tsconfigJson(
  transpile?: boolean,
  tsconfig?: string,
  generateEsm?: boolean
): Promise<string | undefined> {
  if (transpile || tsconfig) {
    return tsconfig
      ? readCustomTsConfig(tsconfig)
      : formatTsConfig(generateEsm);
  }
}
