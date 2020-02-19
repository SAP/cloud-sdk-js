/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

export function packageJson(npmPackageName: string, dependencies: string[], version: string): string {
  return (
    JSON.stringify(
      {
        name: npmPackageName,
        version,
        description: 'SAP Cloud SDK for JavaScript: Complete Virtual Data Model (VDM)',
        homepage: 'https://www.sap.com/cloud-sdk',
        repository: {
          type: 'git',
          url: ''
        },
        scripts: {
          version: 'node ../../../after-version-update.js'
        },
        dependencies: dependencies.reduce((deps, service) => {
          deps[service] = `^${version}`;
          return deps;
        }, {}),
        peerDependencies: {
          '@sap-cloud-sdk/core': `^${version}`
        }
      },
      null,
      2
    ) + '\n'
  );
}
