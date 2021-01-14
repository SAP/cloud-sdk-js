import { getSDKVersion } from './generator';

describe('generator', () => {
  it('getSDKVersion returns a valid stable version', async () => {
    expect((await getSDKVersion()).split('.').length).toBe(3);
  });
});
