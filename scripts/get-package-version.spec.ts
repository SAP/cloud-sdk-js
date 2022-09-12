import mock from 'mock-fs';
import { resolve } from 'path';
import { getPackageVersion } from './get-package-version';

describe('get package version', () => {
  afterEach(() => {
    mock.restore();
  });

  it('returns the version of the package json in the same directory', () => {
    mock({
      'package.json': `{ "version": "1.2.3" }`
    });
    expect(getPackageVersion()).toBe('1.2.3');
  });

  it('returns the version of a designated package json', () => {
    mock({
      dir: {
        'package.json': `{ "version": "4.5.6" }`
      }
    });
    expect(getPackageVersion(resolve('dir', 'package.json'))).toBe('4.5.6');
  });
});
