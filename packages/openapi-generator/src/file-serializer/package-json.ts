import { unixEOL } from '@sap-cloud-sdk/util';
import {
  PackageJsonOptions,
  packageJsonBase
} from '@sap-cloud-sdk/generator-common/internal';

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
        ...packageJsonBase(options),
        files: ['**/*.js', '**/*.js.map', '**/*.d.ts', '**/d.ts.map'],

        scripts: {
          compile: 'npx tsc'
        },
        dependencies: {
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
