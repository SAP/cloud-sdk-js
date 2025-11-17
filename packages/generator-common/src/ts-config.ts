import { promises } from 'fs';
import { resolve } from 'path';
import { unixEOL, ErrorWithCause } from '@sap-cloud-sdk/util';
const { readFile, lstat } = promises;
/**
 * @internal
 */
export function defaultTsConfig(
  generateESM: boolean = false
): Record<string, any> {
  return {
    compilerOptions: {
      target: 'es2021',
      module: generateESM ? 'esnext' : 'commonjs',
      lib: ['esnext'],
      declaration: true,
      declarationMap: false,
      sourceMap: true,
      diagnostics: true,
      moduleResolution: generateESM ? 'bundler' : 'node',
      esModuleInterop: true,
      inlineSources: false,
      strict: true
    },
    include: ['**/*.ts'],
    exclude: ['dist/**/*', 'test/**/*', '**/*.spec.ts', 'node_modules/**/*']
  };
}
/**
 * @internal
 */
export function formatTsConfig(generateESM: boolean = false): string {
  return JSON.stringify(defaultTsConfig(generateESM), null, 2) + unixEOL;
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
      err
    );
  }
}

/**
 * Build a tsconfig.json file as string.
 * If transpile is true or tsconfig is provided, return the appropriate config.
 * @param transpile - Whether to transpile.
 * @param tsconfig - Path to custom tsconfig file.
 * @param generateESM - Whether to generate ES modules instead of CommonJS.
 * @returns The serialized tsconfig.json contents.
 * @internal
 */
export async function tsconfigJson(
  transpile: boolean = false,
  tsconfig?: string,
  generateESM: boolean = false
): Promise<string | undefined> {
  if (transpile || tsconfig) {
    return tsconfig
      ? readCustomTsConfig(tsconfig)
      : formatTsConfig(generateESM);
  }
}
