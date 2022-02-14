import { packageJson } from './package-json';
import {GeneratorOptions} from "../generator-options";
import {VdmServiceMetadata} from "../vdm-types";
describe('package-json', () => {
  const semverRegex = /\^\d+\.\d+\.\d+/;
  const packageJsonStatic = {
    homepage: 'https://sap.github.io/cloud-sdk/docs/js/getting-started',
    main: './index.js',
    types: './index.d.ts',
    publishConfig: {
      access: 'public'
    },
    files: [
      '**/*.js',
      '**/*.js.map',
      '**/*.d.ts',
      '**/d.ts.map',
      '**/*-csn.json'
    ],
    repository: {
      'type': 'git',
      'url': ''
    },
    devDependencies: {
      'typescript': '~4.5'
    }
  };

  it('creates v2 package content', async () => {
    const jsonString
        = await
      packageJson({npmPackageName:'my-v2-package',oDataVersion:"v2"}as VdmServiceMetadata,{versionInPackageJson: 'X.Y.Z-v2'} as GeneratorOptions

      );

    /*

     */

    expect(JSON.parse(jsonString)).toEqual({
      name: 'my-v2-package',
      version: 'X.Y.Z-v2',
      description: 'my v2 package description',
      ...packageJsonStatic,
      scripts: {
        'compile': 'npx tsc'
      },
      dependencies: {
        '@sap-cloud-sdk/odata-common': expect.stringMatching(semverRegex),
        '@sap-cloud-sdk/odata-v2': expect.stringMatching(semverRegex)
      },
      peerDependencies: {
        '@sap-cloud-sdk/odata-common': expect.stringMatching(semverRegex),
        '@sap-cloud-sdk/odata-v2': expect.stringMatching(semverRegex)
      }
    });
  });

  it('adds the license information',async ()=> {
    const jsonString = await
        packageJson({}as VdmServiceMetadata,{}as GeneratorOptions
            // 'my-v4-package',
            // 'X.Y.Z-v4',
            // 'my v4 package description',
            // true,
            // 'v4',
            // 'my licence value'
        );
    expect(JSON.parse(jsonString).license).toEqual('my licence value');
  });

  it('creates v4 package content with after version script', async () => {
    const jsonString = await
      packageJson(
          {}as VdmServiceMetadata,{}as GeneratorOptions
        // 'my-v4-package',
        // 'X.Y.Z-v4',
        // 'my v4 package description',
        // true,
        // 'v4'
      );
    expect(JSON.parse(jsonString)).toEqual({
      name: 'my-v4-package',
      version: 'X.Y.Z-v4',
      description: 'my v4 package description',
      scripts: {
        'compile': 'npx tsc',
        'version': 'node ../../../after-version-update.js'
      },
      ...packageJsonStatic,
      dependencies: {
        '@sap-cloud-sdk/odata-common': expect.stringMatching(semverRegex),
        '@sap-cloud-sdk/odata-v4': expect.stringMatching(semverRegex)
      },
      peerDependencies: {
        '@sap-cloud-sdk/odata-common': expect.stringMatching(semverRegex),
        '@sap-cloud-sdk/odata-v4': expect.stringMatching(semverRegex)
      }
    });
  });
});
