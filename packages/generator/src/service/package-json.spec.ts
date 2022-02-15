import { ODataVersion } from '@sap-cloud-sdk/util';
import { packageJson, PackageJsonOptions } from './package-json';
describe('package-json', () => {
  const packageJsonStatic = {
    homepage: 'https://sap.github.io/cloud-sdk/docs/js/getting-started',
    main: './index.js',
    types: './index.d.ts',
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
      version: `X.Y.Z-${oDataVersion}`,
      description: `my ${oDataVersion} package description`,
      sdkAfterVersionScript: false,
      oDataVersion,
      sdkVersion: '1.2.3'
    };
  }

  it('creates v2 package content', async () => {
    const jsonString = await packageJson(packageJsonOptions('v2'));

    expect(JSON.parse(jsonString)).toEqual({
      name: 'my-v2-package',
      version: 'X.Y.Z-v2',
      description: 'my v2 package description',
      ...packageJsonStatic,
      dependencies: {
        '@sap-cloud-sdk/odata-common': '^1.2.3',
        '@sap-cloud-sdk/odata-v2': '^1.2.3'
      },
      peerDependencies: {
        '@sap-cloud-sdk/odata-common': '^1.2.3',
        '@sap-cloud-sdk/odata-v2': '^1.2.3'
      }
    });
  });

  it('includes after version script', async () => {
    const jsonString = await packageJson({
      ...packageJsonOptions('v2'),
      sdkAfterVersionScript: true
    });

    expect(JSON.parse(jsonString).scripts.version).toEqual(
      'node ../../../after-version-update.js'
    );
  });

  it('adds the license information', async () => {
    const jsonString = await packageJson({
      ...packageJsonOptions('v2'),
      license: 'my license value'
    });
    expect(JSON.parse(jsonString).license).toEqual('my license value');
  });

  it('creates v4 package content with after version script', async () => {
    const jsonString = await packageJson(packageJsonOptions('v4'));

    expect(JSON.parse(jsonString)).toEqual({
      name: 'my-v4-package',
      version: 'X.Y.Z-v4',
      description: 'my v4 package description',
      ...packageJsonStatic,
      dependencies: {
        '@sap-cloud-sdk/odata-common': '^1.2.3',
        '@sap-cloud-sdk/odata-v4': '^1.2.3'
      },
      peerDependencies: {
        '@sap-cloud-sdk/odata-common': '^1.2.3',
        '@sap-cloud-sdk/odata-v4': '^1.2.3'
      }
    });
  });
});
