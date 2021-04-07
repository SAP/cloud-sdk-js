import { unixEOL } from '@sap-cloud-sdk/util'
import { getGeneratorVersion } from '../sdk-metadata/pregenerated-lib';

export function packageJson(
  npmPackageName: string,
  version: string,
  description: string,
  sdkAfterVersionScript: boolean
): string {
  return (
    JSON.stringify(
      {
        name: npmPackageName,
        version,
        description,
        homepage: 'https://sap.github.io/cloud-sdk/docs/js/getting-started',
        main: './index.js',
        types: './index.d.ts',
        publishConfig: {
          access: 'public'
        },
        files: [
          '**/*.js',
          '**/*.js.map',
          '**/*.d.ts',
          '**/d.ts.map',
          '**/*-csn.json'
        ],
        repository: {
          type: 'git',
          url: ''
        },
        scripts: {
          compile: 'npx tsc',
          doc: 'npx typedoc',
          ...(sdkAfterVersionScript
            ? { version: 'node ../../../after-version-update.js' }
            : {})
        },
        dependencies: {
          '@sap-cloud-sdk/core': `^${getGeneratorVersion()}`
        },
        peerDependencies: {
          '@sap-cloud-sdk/core': `^${getGeneratorVersion()}`
        },
        devDependencies: {
          typedoc: '^0.17.0',
          typescript: '~3.8.3'
        }
      },
      null,
      2
    ) + unixEOL
  );
}
