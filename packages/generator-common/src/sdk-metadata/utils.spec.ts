import { getSdkVersion } from './util';

describe('utils', () => {
  it('getSdkVersion returns a valid stable version', async () => {
    expect((await getSdkVersion()).split('.').length).toBe(3);
  });
});
