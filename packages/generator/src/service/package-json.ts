/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

export function packgeJson(npmPackageName: string, version: string, description: string, sdkAfterVersionScript: boolean): string {
  return (
    JSON.stringify(
      {
        name: npmPackageName,
        version,
        description,
        homepage: 'https://www.sap.com/cloud-sdk',
        main: './index.js',
        types: './index.d.ts',
        publishConfig: {
          access: 'public'
        },
        files: ['**/*.js', '**/*.js.map', '**/*.d.ts', '**/d.ts.map', '**/*-csn.json'],
        repository: {
          type: 'git',
          url: ''
        },
        scripts: {
          compile: 'npx tsc',
          doc: 'npx typedoc',
          ...(sdkAfterVersionScript ? { version: 'node ../../../after-version-update.js' } : {})
        },
        dependencies: {
          '@sap-cloud-sdk/core': `^${version}`
        },
        peerDependencies: {
          '@sap-cloud-sdk/core': `^${version}`
        },
        devDependencies: {
          '@types/node': '^11.13.5',
          typedoc: '^0.15.0',
          typescript: '3.7.4'
        }
      },
      null,
      2
    ) + '\n'
  );
}
