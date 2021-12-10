import { getSdkVersion } from './util';

describe('utils', () => {
  it('getSdkVersion returns a valid stable version', async () => {
    const version = await getSdkVersion();
    if (!version.includes('beta')) {
      expect(version.split('.').length).toBe(3);
    } else {
      expect(version.split('.').length).toBe(4);
    }
  });
});
