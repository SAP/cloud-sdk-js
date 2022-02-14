import { ODataVersion, unixEOL } from '@sap-cloud-sdk/util';
import {getSdkVersion, getVersionForClient} from '@sap-cloud-sdk/generator-common/internal';
import {VdmServiceMetadata} from "../vdm-types";
import {Project} from "ts-morph";
import {GeneratorOptions} from "../generator-options";
import {getServiceDescription} from "../sdk-metadata";

// eslint-disable-next-line valid-jsdoc
/**
 * @internal
 */
export async function packageJson(
    service: VdmServiceMetadata,
    options: GeneratorOptions
): Promise<string> {
  const oDataModule =
    service.oDataVersion === 'v2'
      ? '@sap-cloud-sdk/odata-v2'
      : '@sap-cloud-sdk/odata-v4';
  return (
    JSON.stringify(
      {
        name: service.npmPackageName,
        version:  await getVersionForClient(options.versionInPackageJson),
        description: getServiceDescription(service, options),
        homepage: 'https://sap.github.io/cloud-sdk/docs/js/getting-started',
        main: './index.js',
        types: './index.d.ts',
        ...(options.licenseInPackageJson ? { license: options.licenseInPackageJson }:{}),
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
          compile: 'npx tsc',
          ...(options.sdkAfterVersionScript
            ? { version: 'node ../../../after-version-update.js' }
            : {})
        },
        dependencies: {
          '@sap-cloud-sdk/odata-common': `^${await getSdkVersion()}`,
          [oDataModule]: `^${await getSdkVersion()}`
        },
        peerDependencies: {
          '@sap-cloud-sdk/odata-common': `^${await getSdkVersion()}`,
          [oDataModule]: `^${await getSdkVersion()}`
        },
        devDependencies: {
          typescript: '~4.5'
        }
      },
      null,
      2
    ) + unixEOL
  );
}
