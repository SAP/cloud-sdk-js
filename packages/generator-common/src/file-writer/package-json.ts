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
  sdkVersion: string;
  /**
   * @internal
   */
  description: string;
}

/* eslint-disable valid-jsdoc */
/**
 * @internal
 */
export function packageJsonBase(
  options: PackageJsonOptions
): Record<string, any> {
  return {
    name: options.npmPackageName,
    version: '1.0.0',
    description: options.description,
    homepage: 'https://sap.github.io/cloud-sdk/docs/js/getting-started',
    main: './index.js',
    types: './index.d.ts',
    license: 'UNLICENSED',
    publishConfig: {
      access: 'public'
    },
    repository: {
      type: 'git',
      url: ''
    }
  };
}
