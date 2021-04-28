import { resolve } from 'path';
import nock = require('nock');
import { VdmServiceMetadata } from '../vdm-types';
import { parseService } from '../service-generator';
import { createOptions } from '../../test/test-util/create-generator-options';
import { GlobalNameFormatter } from '../global-name-formatter';
import { oDataServiceSpecs } from '../../../../test-resources/odata-service-specs';
import {
  getInstallationSnippet,
  getRepositoryLink,
  getPregeneratedLibrary,
  getTimeStamp,
  isPublishedNpmPackage
} from '../common/pregenerated-lib';
import { getVersionForClient } from '../common/sdk-metadata';
import { getServiceDescription } from './pregenerated-lib';

describe('pregenerated-lib', () => {
  const service: VdmServiceMetadata = getTestService();
  //todo move
  it('returns installation snipped', () => {
    expect(getInstallationSnippet(service.npmPackageName).instructions).toBe(
      'npm i @sap/cloud-sdk-vdm-test-service:latest'
    );
  });
  //todo move
  it('returns repository link', () => {
    expect(getRepositoryLink(service.npmPackageName)).toBe(
      'https://www.npmjs.com/package/@sap/cloud-sdk-vdm-test-service'
    );
  });
  //todo move
  it('returns version from generator options or generator version', async () => {
    expect(await getVersionForClient('123')).toBe('123');
    expect(await getVersionForClient()).toMatch(/\d+\.\d+\.\d+/);
  });

  it('returns description of the service', () => {
    expect(getServiceDescription(service, createOptions())).toMatchSnapshot();
  });
  //todo move
  it('returns a timestamp in unix format', () => {
    expect(getTimeStamp()).toMatch(/\/Date\(\d{13,13}\)\//);
  });
  // todo move
  it('checks if there is a client published', async () => {
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);
    expect(await isPublishedNpmPackage('@sap/cloud-sdk-core')).toBe(true);
    expect(await isPublishedNpmPackage('@sap/non-existing-service')).toBe(
      false
    );
  }, 30000);
  // todo move
  it('returns pregenerated lib information for existing service', async () => {
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);
    const result = await getPregeneratedLibrary(
      'description',
      getTestService().npmPackageName,
      createOptions().versionInPackageJson
    );
    // for an existing service like the business partner it should not be undefined the parts are tested independently
    expect(result).toBeDefined();
  });
  // todo move
  it('returns undefined for noon existing service', async () => {
    nock('http://registry.npmjs.org/').head(/.*/).reply(404);
    const result = await getPregeneratedLibrary(
      'description',
      getTestService().npmPackageName,
      createOptions().versionInPackageJson
    );
    // for an existing service like the business partner it should not be undefined the parts are tested independently
    expect(result).toBeUndefined();
  });
});

export function getTestService(npmPackageName?: string): VdmServiceMetadata {
  return parseService(
    {
      edmxPath: resolve(
        oDataServiceSpecs,
        'v2',
        'API_TEST_SRV/API_TEST_SRV.edmx'
      )
    },
    createOptions(),
    {},
    new GlobalNameFormatter({
      API_TEST_SRV: {
        directoryName: 'test-service',
        servicePath: '/sap/opu/odata/sap/API_TEST_SERVICE_SRV;v=0002',
        npmPackageName: npmPackageName || '@sap/cloud-sdk-vdm-test-service'
      }
    })
  );
}
