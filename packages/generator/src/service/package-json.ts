import { ODataVersion, unixEOL } from '@sap-cloud-sdk/util';
import { getSdkVersion } from '@sap-cloud-sdk/generator-common/internal';

export async function packageJson(
  npmPackageName: string,
  version: string,
  description: string,
  sdkAfterVersionScript: boolean,
  oDataVersion: ODataVersion
): Promise<string> {
  const oDataModule =
    oDataVersion === 'v2'
      ? '@sap-cloud-sdk/odata-v2'
      : '@sap-cloud-sdk/odata-v4';
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
          '@sap-cloud-sdk/odata-common': `^${await getSdkVersion()}`,
          [oDataModule]: `^${await getSdkVersion()}`
        },
        peerDependencies: {
          '@sap-cloud-sdk/odata-common': `^${await getSdkVersion()}`,
          [oDataModule]: `^${await getSdkVersion()}`
        },
        devDependencies: {
          typedoc: '^0.20.36',
          typescript: '~4.1.2'
        }
      },
      null,
      2
    ) + unixEOL
  );
}
