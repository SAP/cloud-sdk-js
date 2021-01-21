/**
 * @experimental This API is experimental and might change in newer versions. Use with caution.

 */
import { readJSON } from '@sap-cloud-sdk/util';
import { GeneratorOptions } from '../options';

export function tsconfigJson(options: GeneratorOptions): string {
  let tsConfig = {
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
  if (options.tsConfig) {
    tsConfig = readJSON(options.tsConfig) as any;
  }
  return JSON.stringify(tsConfig, null, 2) + '\n';
}
