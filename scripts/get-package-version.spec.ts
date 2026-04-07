jest.mock('fs', () => require('memfs').fs);
jest.mock('fs/promises', () => require('memfs').fs.promises);
jest.mock('node:fs', () => require('memfs').fs);
jest.mock('node:fs/promises', () => require('memfs').fs.promises);

import { resolve } from 'path';
import { vol } from 'memfs';
import { getPackageVersion } from './get-package-version';

describe('get package version', () => {
  afterEach(() => {
    vol.reset();
  });

  it('returns the version of the package json in the same directory', async () => {
    vol.fromJSON({ 'package.json': `{ "version": "1.2.3" }` }, process.cwd());
    expect(await getPackageVersion()).toEqual('1.2.3');
  });

  it('returns the version of a designated package json', async () => {
    vol.fromJSON(
      { 'dir/package.json': `{ "version": "4.5.6" }` },
      process.cwd()
    );
    expect(await getPackageVersion(resolve('dir', 'package.json'))).toEqual(
      '4.5.6'
    );
  });
});
