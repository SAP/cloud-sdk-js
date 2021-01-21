import { resolve } from 'path';
import { existsSync, promises } from 'fs';
import { readJSON } from '@sap-cloud-sdk/util';
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
    const jsApiFile = resolve(testServicePath, 'api.js');
    expect(existsSync(jsApiFile)).toBe(true);
  });

  it('should create a package.json', () => {
    const packageJson = resolve(testServicePath, 'package.json');
    expect(existsSync(packageJson)).toBe(true);
  });

  it('should create a package.json with the provided version', async () => {
    const packageJson = await readJSON(
      resolve(testServicePath, 'package.json')
    );
    expect(packageJson.version).toBe('1.2.3');
  });

  it('should create a tsconfig.json', () => {
    const tsconfig = resolve(testServicePath, 'tsconfig.json');
    expect(existsSync(tsconfig)).toBe(true);
  });
});
