import { unixEOL } from '@sap-cloud-sdk/util';

export function packageJson(
  npmPackageName: string,
  dependencies: string[],
  versionInPackageJson: string | undefined,
  generatorVersion: string
): string {
  return (
    JSON.stringify(
      {
        name: npmPackageName,
        version: versionInPackageJson || generatorVersion,
        description:
          'SAP Cloud SDK for JavaScript: Complete Virtual Data Model (VDM)',
        homepage: 'https://sap.github.io/cloud-sdk/docs/js/getting-started',
        repository: {
          type: 'git',
          url: ''
        },
        dependencies: dependencies.reduce((deps, service) => {
          deps[service] = `^${versionInPackageJson || generatorVersion}`;
          return deps;
        }, {}),
        peerDependencies: {
          '../../../../core': `^${generatorVersion}`
        }
      },
      null,
      2
    ) + unixEOL
  );
}
