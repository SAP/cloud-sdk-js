import { unixEOL } from '@sap-cloud-sdk/util';

/**
 * Generate the package.json for an openapi client so it can be released as an npm module.
 * @param packageName - The name of the npm package.
 * @param description - The description of the  npm package.
 * @param sdkVersion - The version of the SAP Cloud SDK used.
 * @param packageVersion - The version of the npm package.
 * @returns The package.json contents.
 */
export function packageJson(
  packageName: string,
  description: string,
  sdkVersion: string,
  packageVersion: string
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
        publishConfig: {
          access: 'public'
        },
        files: ['**/*.js', '**/*.js.map', '**/*.d.ts', '**/d.ts.map'],
        repository: {
          type: 'git',
          url: ''
        },
        scripts: {
          compile: 'npx tsc',
          doc: 'npx typedoc'
        },
        dependencies: {
          '../../../../core': `^${sdkVersion}`
        },
        peerDependencies: {
          '../../../../core': `^${sdkVersion}`
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

export const genericDescription = (packageName: string): string =>
  `SAP Cloud SDK for JavaScript: Generated client for OpenAPI service ${packageName
    .split('-')
    .join(' ')}`;
