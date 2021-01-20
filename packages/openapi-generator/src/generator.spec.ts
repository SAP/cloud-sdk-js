import { getSdkVersion, getInputFilePaths } from './generator';

describe('generator', () => {
  it('getSdkVersion returns a valid stable version', async () => {
    expect((await getSdkVersion()).split('.').length).toBe(3);
  });

  it('getInputPaths returns an array of all file paths, including subdirectories', async () => {
    expect((await getInputFilePaths('this')).length).toBe(1);
  });
});
