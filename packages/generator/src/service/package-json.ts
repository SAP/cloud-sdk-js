import { unixEOL } from '@sap-cloud-sdk/util';
import { packageJsonBase } from '@sap-cloud-sdk/generator-common/internal';
import type { ODataVersion } from '@sap-cloud-sdk/util';

/**
 * @internal
 */
export interface PackageJsonOptions {
  /**
   * @internal
   */
  npmPackageName: string;
  /**
   * @internal
   */
  description: string;
  /**
   * @internal
   */
  oDataVersion: ODataVersion;
  /**
   * @internal
   */
  sdkVersion: string;
  /**
   * @internal
   */
  moduleType: 'commonjs' | 'esm';
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
          compile: 'npx tsc'
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
