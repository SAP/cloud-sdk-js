import { resolve } from 'node:path';
import mock from 'mock-fs';
import { getNextVersion } from './util.js';

describe('getNextVersion', () => {
  afterEach(() => {
    mock.restore();
  });
  const sharedMock = {
    'package.json':
      '{ "name": "sap-cloud-sdk", "version": "1.2.3", "workspaces": ["packages/connectivity"] }',
    packages: {
      connectivity: {
        'package.json': '{ "name": "@sap-cloud-sdk/connectivity" }'
      }
    }
  };

  it('should make a patch update', async () => {
    mock({
      ...sharedMock,
      '.changeset': {
        'config.json': mock.load(resolve('..', '.changeset', 'config.json')),
        'alex.md': '---\n' + "'@sap-cloud-sdk/connectivity': patch\n" + '---'
      }
    });

    expect(await getNextVersion()).toEqual({
      version: '1.2.4',
      bumpType: 'patch'
    });
  });

  it('should make a minor update', async () => {
    mock({
      ...sharedMock,
      '.changeset': {
        'config.json': mock.load(resolve('..', '.changeset', 'config.json')),
        'alex.md': '---\n' + "'@sap-cloud-sdk/connectivity': patch\n" + '---',
        'bob.md': '---\n' + "'@sap-cloud-sdk/connectivity': minor\n" + '---'
      }
    });

    expect(await getNextVersion()).toEqual({
      version: '1.3.0',
      bumpType: 'minor'
    });
  });

  it('should make a major update', async () => {
    mock({
      ...sharedMock,
      '.changeset': {
        'config.json': mock.load(resolve('..', '.changeset', 'config.json')),
        'alex.md': '---\n' + "'@sap-cloud-sdk/connectivity': major\n" + '---',
        'bob.md': '---\n' + "'@sap-cloud-sdk/connectivity': minor\n" + '---'
      }
    });

    expect(await getNextVersion()).toEqual({
      version: '2.0.0',
      bumpType: 'major'
    });
  });

  it('should throw an error, when no changesets exist', async () => {
    mock({
      ...sharedMock,
      '.changeset': {
        'config.json': mock.load(resolve('..', '.changeset', 'config.json'))
      }
    });

    await expect(getNextVersion()).rejects.toThrow(
      'Invalid new version -- the current version: 1.2.3 and the release type: none."'
    );
  });
});
