import { getSDKVersion } from './generator';

describe('generator', () => {
  it('getSDKVersion returns a valid stable version', () => {
    expect(getSDKVersion().split('.').length).toBe(3);
  });
});
