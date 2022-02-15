import { unixEOL } from '@sap-cloud-sdk/util';
import { PackageJsonOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * Generate the package.json for an openapi client so it can be released as an npm module.
 * @param options - Options to generate the package.json
 * @returns The package.json contents.
 * @internal
 */
export function packageJson(options: PackageJsonOptions): string {
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
        files: ['**/*.js', '**/*.js.map', '**/*.d.ts', '**/d.ts.map'],
        repository: {
          type: 'git',
          url: ''
        },
        scripts: {
          compile: 'npx tsc'
        },
        dependencies: {
          '@sap-cloud-sdk/openapi': `^${options.sdkVersion}`
        },
        peerDependencies: {
          '@sap-cloud-sdk/openapi': `^${options.sdkVersion}`
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
