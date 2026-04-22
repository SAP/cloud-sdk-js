import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { vol } from 'memfs';
import { jest, describe, afterEach, it } from '@jest/globals';
import { mockFsWithMemfs } from '@sap-cloud-sdk/test-util-build-internal';
import { getNextVersion } from './util.js';

mockFsWithMemfs(jest);

const changesetConfig = readFileSync(
  resolve('..', '.changeset', 'config.json'),
  'utf8'
);

describe('getNextVersion', () => {
  afterEach(() => {
    vol.reset();
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
    vol.fromNestedJSON(
      {
        ...sharedMock,
        '.changeset': {
          'config.json': changesetConfig,
          'alex.md': '---\n' + "'@sap-cloud-sdk/connectivity': patch\n" + '---'
        }
      },
      process.cwd()
    );

    expect(await getNextVersion()).toEqual({
      version: '1.2.4',
      bumpType: 'patch'
    });
  });

  it('should make a minor update', async () => {
    vol.fromNestedJSON(
      {
        ...sharedMock,
        '.changeset': {
          'config.json': changesetConfig,
          'alex.md': '---\n' + "'@sap-cloud-sdk/connectivity': patch\n" + '---',
          'bob.md': '---\n' + "'@sap-cloud-sdk/connectivity': minor\n" + '---'
        }
      },
      process.cwd()
    );

    expect(await getNextVersion()).toEqual({
      version: '1.3.0',
      bumpType: 'minor'
    });
  });

  it('should make a major update', async () => {
    vol.fromNestedJSON(
      {
        ...sharedMock,
        '.changeset': {
          'config.json': changesetConfig,
          'alex.md': '---\n' + "'@sap-cloud-sdk/connectivity': major\n" + '---',
          'bob.md': '---\n' + "'@sap-cloud-sdk/connectivity': minor\n" + '---'
        }
      },
      process.cwd()
    );

    expect(await getNextVersion()).toEqual({
      version: '2.0.0',
      bumpType: 'major'
    });
  });

  it('should throw an error, when no changesets exist', async () => {
    vol.fromNestedJSON(
      {
        ...sharedMock,
        '.changeset': { 'config.json': changesetConfig }
      },
      process.cwd()
    );

    await expect(getNextVersion()).rejects.toThrow(
      'Invalid new version -- the current version: 1.2.3 and the release type: none."'
    );
  });
});
