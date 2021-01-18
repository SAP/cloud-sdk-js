import { resolve } from 'path';
import { existsSync, promises } from 'fs';
import { getSdkVersion } from './generator';

const { rmdir } = promises;

describe('generator', () => {
  const testServicePath = resolve(
    __dirname,
    '../../../test-packages/test-services/openapi/test-service'
  );

  it('getSDKVersion returns a valid stable version', async () => {
    expect((await getSdkVersion()).split('.').length).toBe(3);
  });

  it('should transpile the generated sources', () => {
    const jsApiFile = resolve(testServicePath, 'dist', 'api.js');
    expect(existsSync(jsApiFile)).toBe(true);
  });

  it('should create package.json', () => {
    const packageJson = resolve(testServicePath, 'package.json');
    expect(existsSync(packageJson)).toBe(true);
  });

  it('should create tsconfig.json', () => {
    const tsconfig = resolve(testServicePath, 'tsconfig.json');
    expect(existsSync(tsconfig)).toBe(true);
  });
});
