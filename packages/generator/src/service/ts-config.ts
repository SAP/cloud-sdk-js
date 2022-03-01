import { unixEOL } from '@sap-cloud-sdk/util';

/**
 * @internal
 */
export function tsConfig(): string {
  return (
    JSON.stringify(
      {
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
        exclude: ['dist/**/*', 'test/**/*', '**/*.spec.ts', 'node_modules/**/*']
      },
      null,
      2
    ) + unixEOL
  );
}
