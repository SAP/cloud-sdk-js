import mock from 'mock-fs';
import { getSdkVersion, getInputFilePaths } from './generator';

describe('generator', () => {
  it('getSdkVersion returns a valid stable version', async () => {
    expect((await getSdkVersion()).split('.').length).toBe(3);
  });

  it('getInputPaths returns an array of all file paths, including subdirectories', async () => {
    mock({
      '/path/to/test/dir': {
        'test-service.txt': 'file content here',
        'empty-dir': {},
        'sub-dir': {
          'test-service.txt': 'another fake service',
          'sub-directory-service.txt': 'just to add some more'
        }
      }
    });

    expect((await getInputFilePaths('/path/to/test/dir')).sort()).toEqual(
      [
        '/path/to/test/dir/test-service.txt',
        '/path/to/test/dir/sub-dir/test-service.txt',
        '/path/to/test/dir/sub-dir/sub-directory-service.txt'
      ].sort()
    );
  });
});
