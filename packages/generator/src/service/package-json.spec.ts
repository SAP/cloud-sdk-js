import { packageJson } from './package-json';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { PackageJsonOptions } from './package-json';
describe('package-json', () => {
  const packageJsonStatic = {
    homepage: 'https://sap.github.io/cloud-sdk/docs/js/getting-started',
    license: 'UNLICENSED',
    main: './index.js',
    types: './index.d.ts',
    version: '1.0.0',
    publishConfig: {
      access: 'public'
    },
    scripts: {
      compile: 'npx tsc'
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
    devDependencies: {
      typescript: '~4.5'
    }
  };

  function packageJsonOptions(oDataVersion: ODataVersion): PackageJsonOptions {
    return {
      npmPackageName: `my-${oDataVersion}-package`,
      description: `my ${oDataVersion} package description`,
      oDataVersion,
      sdkVersion: '1.2.3',
      moduleType: 'commonjs'
    };
  }

  it('creates v2 package content', async () => {
    const jsonString = await packageJson(packageJsonOptions('v2'));

    expect(JSON.parse(jsonString)).toEqual({
      name: 'my-v2-package',
      description: 'my v2 package description',
      ...packageJsonStatic,
      dependencies: {
        '@sap-cloud-sdk/odata-common': '^1.2.3',
        '@sap-cloud-sdk/odata-v2': '^1.2.3'
      }
    });
  });

  it('adds the default license information', async () => {
    const jsonString = await packageJson({
      ...packageJsonOptions('v2')
    });
    expect(JSON.parse(jsonString).license).toEqual('UNLICENSED');
  });

  it('creates v4 package content with after version script', async () => {
    const jsonString = await packageJson(packageJsonOptions('v4'));

    expect(JSON.parse(jsonString)).toEqual({
      name: 'my-v4-package',
      description: 'my v4 package description',
      ...packageJsonStatic,
      dependencies: {
        '@sap-cloud-sdk/odata-common': '^1.2.3',
        '@sap-cloud-sdk/odata-v4': '^1.2.3'
      }
    });
  });
});
