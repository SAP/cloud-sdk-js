export function packageJson(
  npmPackageName: string,
  versionInPackageJson: string | undefined,
  generatorVersion: string,
  description: string,
  sdkAfterVersionScript: boolean
): string {
  return (
    JSON.stringify(
      {
        name: npmPackageName,
        version: versionInPackageJson || generatorVersion,
        description,
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
          type: 'git',
          url: ''
        },
        scripts: {
          compile: 'yarn tsc',
          doc: 'yar  typedoc',
          ...(sdkAfterVersionScript
            ? { version: 'node ../../../after-version-update.js' }
            : {})
        },
        dependencies: {
          '@sap-cloud-sdk/core': `^${generatorVersion}`
        },
        peerDependencies: {
          '@sap-cloud-sdk/core': `^${generatorVersion}`
        },
        devDependencies: {
          typedoc: '^0.17.0',
          typescript: '~3.8.3'
        }
      },
      null,
      2
    ) + '\n'
  );
}
