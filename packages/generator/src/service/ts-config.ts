/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export function tsConfig(): string {
  return (
    JSON.stringify(
      {
        compilerOptions: {
          target: 'es5',
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
    ) + '\n'
  );
}
