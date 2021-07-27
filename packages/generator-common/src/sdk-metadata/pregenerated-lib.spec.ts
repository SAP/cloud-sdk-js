import nock = require('nock');
import {
  getInstallationSnippet,
  getLatestVersionOfNpmPackage,
  getPregeneratedLibrary,
  getRepositoryLink,
  getTimeStamp,
  isPublishedNpmPackage
} from './pregenerated-lib';
import { getVersionForClient } from './sdk-metadata';

describe('pregenerated-lib', () => {
  const npmPackageName = '@sap/cloud-sdk-vdm-test-service';
  it('returns installation snipped', () => {
    expect(getInstallationSnippet(npmPackageName).instructions).toBe(
      'npm i @sap/cloud-sdk-vdm-test-service:latest'
    );
  });

  it('returns repository link', () => {
    expect(getRepositoryLink(npmPackageName)).toBe(
      'https://www.npmjs.com/package/@sap/cloud-sdk-vdm-test-service'
    );
  });

  it('returns version from generator options or generator version', async () => {
    expect(await getVersionForClient('123')).toBe('123');
    expect(await getVersionForClient()).toMatch(/\d+\.\d+\.\d+/);
  });

  it('returns a timestamp in unix format', () => {
    expect(getTimeStamp()).toMatch(/\/Date\(\d{13,13}\)\//);
  });

  it('checks if there is a client published', async () => {
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);
    expect(await isPublishedNpmPackage('@sap/cloud-sdk-core')).toBe(true);
    expect(await isPublishedNpmPackage('@sap/non-existing-service')).toBe(
      false
    );
  }, 30000);

  it('gives version for exisitng client', async () => {
    nock('http://registry.npmjs.org/')
      .get(/@sap-cloud-sdk\/core\/latest/)
      .reply(200, { version: '1.2.3' });
    expect(await getLatestVersionOfNpmPackage('@sap-cloud-sdk/core')).toBe(
      '1.2.3'
    );
  });

  it('returns pregenerated lib information for existing service', async () => {
    nock('http://registry.npmjs.org/').head(/.*/).reply(200);
    nock('http://registry.npmjs.org/')
      .get(new RegExp(`/${npmPackageName}/latest`))
      .reply(200, { version: '1.2.3' });
    const result = await getPregeneratedLibrary('description', npmPackageName);
    // for an existing service like the business partner it should not be undefined the parts are tested independently
    expect(result).toBeDefined();
  });

  it('returns undefined for noon existing service', async () => {
    nock('http://registry.npmjs.org/').head(/.*/).reply(404);
    const result = await getPregeneratedLibrary('description', npmPackageName);
    // for an existing service like the business partner it should not be undefined the parts are tested independently
    expect(result).toBeUndefined();
  });
});
