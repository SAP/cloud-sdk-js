import { unixEOL } from '@sap-cloud-sdk/util';
import {GeneratorOptions} from "../options";

/**
 * Generate the package.json for an openapi client so it can be released as an npm module.
 * @param packageName - The name of the npm package.
 * @param description - The description of the  npm package.
 * @param sdkVersion - The version of the SAP Cloud SDK used.
 * @param packageVersion - The version of the npm package.
 * @param license - The version of the npm package.
 * @returns The package.json contents.
 * @internal
 */
export function packageJson(
    options: Pick<GeneratorOptions,'packageVersion'|'licenseInPackageJson'>
  // packageName: string,
  // description: string,
  // sdkVersion: string,
  // packageVersion: string,
  // license?: string
): string {
  return (
    JSON.stringify(
      {
        name: packageName,
        version: packageVersion,
        description,
        homepage: 'https://sap.github.io/cloud-sdk/docs/js/getting-started',
        main: './index.js',
        types: './index.d.ts',
      ...(license ? { license }:{}),
        publishConfig: {
          access: 'public'
        },
        files: ['**/*.js', '**/*.js.map', '**/*.d.ts', '**/d.ts.map'],
        repository: {
          type: 'git',
          url: ''
        },
        scripts: {
          compile: 'npx tsc'
        },
        dependencies: {
          '@sap-cloud-sdk/openapi': `^${sdkVersion}`
        },
        peerDependencies: {
          '@sap-cloud-sdk/openapi': `^${sdkVersion}`
        },
        devDependencies: {
          typescript: '~4.1.2'
        }
      },
      null,
      2
    ) + unixEOL
  );
}
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export const genericDescription = (packageName: string): string =>
  `SAP Cloud SDK for JavaScript: Generated client for OpenAPI service ${packageName
    .split('-')
    .join(' ')}`;
