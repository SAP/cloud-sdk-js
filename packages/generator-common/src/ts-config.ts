import { promises } from 'fs';
import { resolve } from 'path';
import { unixEOL, ErrorWithCause } from '@sap-cloud-sdk/util';
const { readFile, lstat } = promises;

/**
 * @internal
 */
export const defaultTsConfig = {
  compilerOptions: {
    target: 'es2021',
    module: 'commonjs',
    lib: ['esnext'],
    declaration: true,
    declarationMap: false,
    sourceMap: true,
    diagnostics: true,
    moduleResolution: 'node',
    esModuleInterop: true,
    inlineSources: false,
    strict: true
  },
  include: ['**/*.ts'],
  exclude: ['dist/**/*', 'test/**/*', '**/*.spec.ts', 'node_modules/**/*']
};
/**
 * @internal
 */
export function formatTsConfig(): string {
  return JSON.stringify(defaultTsConfig, null, 2) + unixEOL;
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
