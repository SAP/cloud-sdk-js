import { getSdkVersion } from './generator';

describe('generator', () => {
  it('getSdkVersion returns a valid stable version', async () => {
    expect((await getSdkVersion()).split('.').length).toBe(3);
  });
});
