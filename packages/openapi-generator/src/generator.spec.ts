import mock from 'mock-fs';
import { getSdkVersion, getInputFilePaths } from './generator';

describe('generator', () => {
  it('getSdkVersion returns a valid stable version', async () => {
    expect((await getSdkVersion()).split('.').length).toBe(3);
  });

  it('getInputPaths returns an array of all file paths, including subdirectories', async () => {
    mock({
      'path/to/fake/dir': {
        'fake-service.txt': 'file content here',
        'empty-dir': {},
        'recursive-dir': {
          'fake-service.txt': 'another fake service',
          'recursive-service.txt': 'just to add some more'
        }
      }
    });

    expect((await getInputFilePaths('path/to/fake/dir')).length).toBe(3);
  });
});
