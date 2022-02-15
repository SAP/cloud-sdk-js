import { ODataVersion, unixEOL } from '@sap-cloud-sdk/util';
import { PackageJsonOptions as PackageJsonOptionsBase } from '@sap-cloud-sdk/generator-common/internal';

export interface PackageJsonOptions extends PackageJsonOptionsBase {
  sdkAfterVersionScript: boolean;
  oDataVersion: ODataVersion;
}

/**
 * Generate the package.json for an odata client so it can be released as an npm module.
 * @param options - Options to generate the package.json
 * @returns The package.json contents.
 * @internal
 */
export async function packageJson(
  options: PackageJsonOptions
): Promise<string> {
  const oDataModule =
    options.oDataVersion === 'v2'
      ? '@sap-cloud-sdk/odata-v2'
      : '@sap-cloud-sdk/odata-v4';
  return (
    JSON.stringify(
      {
        name: options.npmPackageName,
        version: options.version,
        description: options.description,
        homepage: 'https://sap.github.io/cloud-sdk/docs/js/getting-started',
        main: './index.js',
        types: './index.d.ts',
        ...(options.license ? { license: options.license } : {}),
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
          ...(options.sdkAfterVersionScript
            ? { version: 'node ../../../after-version-update.js' }
            : {})
        },
        dependencies: {
          '@sap-cloud-sdk/odata-common': `^${options.sdkVersion}`,
          [oDataModule]: `^${options.sdkVersion}`
        },
        peerDependencies: {
          '@sap-cloud-sdk/odata-common': `^${options.sdkVersion}`,
          [oDataModule]: `^${options.sdkVersion}`
        },
        devDependencies: {
          typescript: '~4.5'
        }
      },
      null,
      2
    ) + unixEOL
  );
}
