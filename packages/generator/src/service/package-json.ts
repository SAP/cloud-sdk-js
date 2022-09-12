import { ODataVersion, unixEOL } from '@sap-cloud-sdk/util';
import {
  packageJsonBase,
  PackageJsonOptions as PackageJsonOptionsBase
} from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export interface PackageJsonOptions extends PackageJsonOptionsBase {
  /**
   * @internal
   */
  sdkAfterVersionScript: boolean;
  /**
   * @internal
   */
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
        ...packageJsonBase(options),
        files: [
          '**/*.js',
          '**/*.js.map',
          '**/*.d.ts',
          '**/d.ts.map',
          '**/*-csn.json'
        ],
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
        devDependencies: {
          typescript: '~4.5'
        }
      },
      null,
      2
    ) + unixEOL
  );
}
