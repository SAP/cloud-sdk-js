/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.

 */
import { readJSON } from '@sap-cloud-sdk/util';
import { GeneratorOptions } from '../options';

const defaultConfig = {
  compilerOptions: {
    target: 'es5',
    module: 'commonjs',
    lib: ['esnext', 'dom'],
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
 * If the given options include a tsConfig setting, this config will be serialized.
 * @param options Options passed to the generator.
 * @returns The serialized tsconfig.json contents.
 */
export function tsconfigJson(options: GeneratorOptions): string {
  const tsConfig = options.tsConfig
    ? readJSON(options.tsConfig)
    : defaultConfig;

  return JSON.stringify(tsConfig, null, 2) + '\n';
}
