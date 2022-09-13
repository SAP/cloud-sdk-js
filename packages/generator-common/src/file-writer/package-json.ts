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
  version: string;
  /**
   * @internal
   */
  sdkVersion: string;
  /**
   * @internal
   */
  description: string;
  /**
   * @internal
   */
  license?: string;
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
    version: options.version,
    description: options.description,
    homepage: 'https://sap.github.io/cloud-sdk/docs/js/getting-started',
    main: './index.js',
    types: './index.d.ts',
    ...(options.license ? { license: options.license } : {}),
    publishConfig: {
      access: 'public'
    },
    repository: {
      type: 'git',
      url: ''
    }
  };
}
