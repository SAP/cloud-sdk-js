import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { vol } from 'memfs';
import { jest, describe, afterEach, it } from '@jest/globals';
import { getNextVersion } from './util.js';

jest.unstable_mockModule('fs', () => import('memfs').then(m => m.fs));
jest.unstable_mockModule('fs/promises', () =>
  import('memfs').then(m => m.fs.promises)
);
jest.unstable_mockModule('node:fs', () => import('memfs').then(m => m.fs));
jest.unstable_mockModule('node:fs/promises', () =>
  import('memfs').then(m => m.fs.promises)
);

const changesetConfig = readFileSync(
  resolve('..', '.changeset', 'config.json'),
  'utf8'
);

describe('getNextVersion', () => {
  afterEach(() => {
    vol.reset();
  });
  const sharedFiles = {
    'package.json':
      '{ "name": "sap-cloud-sdk", "version": "1.2.3", "workspaces": ["packages/connectivity"] }',
    'packages/connectivity/package.json':
      '{ "name": "@sap-cloud-sdk/connectivity" }'
  };

  it('should make a patch update', async () => {
    vol.fromJSON(
      {
        ...sharedFiles,
        '.changeset/config.json': changesetConfig,
        '.changeset/alex.md':
          '---\n' + "'@sap-cloud-sdk/connectivity': patch\n" + '---'
      },
      process.cwd()
    );

    expect(await getNextVersion()).toEqual({
      version: '1.2.4',
      bumpType: 'patch'
    });
  });

  it('should make a minor update', async () => {
    vol.fromJSON(
      {
        ...sharedFiles,
        '.changeset/config.json': changesetConfig,
        '.changeset/alex.md':
          '---\n' + "'@sap-cloud-sdk/connectivity': patch\n" + '---',
        '.changeset/bob.md':
          '---\n' + "'@sap-cloud-sdk/connectivity': minor\n" + '---'
      },
      process.cwd()
    );

    expect(await getNextVersion()).toEqual({
      version: '1.3.0',
      bumpType: 'minor'
    });
  });

  it('should make a major update', async () => {
    vol.fromJSON(
      {
        ...sharedFiles,
        '.changeset/config.json': changesetConfig,
        '.changeset/alex.md':
          '---\n' + "'@sap-cloud-sdk/connectivity': major\n" + '---',
        '.changeset/bob.md':
          '---\n' + "'@sap-cloud-sdk/connectivity': minor\n" + '---'
      },
      process.cwd()
    );

    expect(await getNextVersion()).toEqual({
      version: '2.0.0',
      bumpType: 'major'
    });
  });

  it('should throw an error, when no changesets exist', async () => {
    vol.fromJSON(
      {
        ...sharedFiles,
        '.changeset/config.json': changesetConfig
      },
      process.cwd()
    );

    await expect(getNextVersion()).rejects.toThrow(
      'Invalid new version -- the current version: 1.2.3 and the release type: none."'
    );
  });
});
