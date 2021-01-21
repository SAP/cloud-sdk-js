import { resolve } from 'path';
import { existsSync, promises } from 'fs';
import { getSdkVersion, generate } from './generator';

const { rmdir } = promises;

xdescribe('generator', () => {
  const input = resolve(
    __dirname,
    '../../../test-resources/openapi-service-specs/'
  );
  const outputDir = resolve(__dirname, '../generation-test');
  const testServicePath = resolve(outputDir, 'test-service');

  beforeAll(
    () =>
      generate({
        input,
        outputDir,
        generateJs: true,
        clearOutputDir: true,
        generatePackageJson: true
      }),
    120000
  );

  afterAll(() => rmdir(outputDir, { recursive: true }), 60000);

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
