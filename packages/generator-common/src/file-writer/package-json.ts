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
  /**
   * @internal
   */
  moduleType?: 'commonjs' | 'esm';
}

/* eslint-disable valid-jsdoc */
/**
 * @internal
 */
export function packageJsonBase(
  options: PackageJsonOptions
): Record<string, any> {
  const basePackageJson: Record<string, any> = {
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

  if (options.moduleType === 'esm') {
    basePackageJson.type = 'module';
    basePackageJson.main = './index.mjs';
    basePackageJson.exports = {
      '.': {
        import: './index.mjs',
        require: './index.js'
      }
    };
  }

  return basePackageJson;
}
