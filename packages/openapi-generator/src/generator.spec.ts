import { resolve } from 'path';
import { existsSync, promises } from 'fs';
import { generate, getSdkVersion } from './generator';

describe('generator', () => {
  const input = resolve(
    __dirname,
    '../../../test-resources/openapi-service-specs/'
  );
  const outputDir = resolve(__dirname, '../generation-test');
  const outputDir2 = resolve(__dirname, '../generation-test-2');

  beforeAll(
    () =>
      generate({
        input,
        outputDir,
        generateJs: true,
        clearOutputDir: true,
        generatePackageJson: true
      }),
    60000
  );

  afterAll(
    () =>
      promises
        .rmdir(outputDir, { recursive: true })
        .then(() => promises.rmdir(outputDir2, { recursive: true })),
    60000
  );

  it('getSDKVersion returns a valid stable version', async () => {
    expect((await getSdkVersion()).split('.').length).toBe(3);
  });

  it('should transpile the generated sourcs', () => {
    const jsApiFile = resolve(
      outputDir,
      'swagger-yaml-service',
      'dist',
      'api.js'
    );
    expect(existsSync(jsApiFile)).toBe(true);
  });

  it('should create package.json', () => {
    const packageJson = resolve(
      outputDir,
      'swagger-yaml-service',
      'package.json'
    );
    expect(existsSync(packageJson)).toBe(true);
  });

  it('should create tsconfig.json', () => {
    const tsconfig = resolve(
      outputDir,
      'swagger-yaml-service',
      'tsconfig.json'
    );
    expect(existsSync(tsconfig)).toBe(true);
  });

  it('fails on compilation due to a bad tsconfig.', async () => {
    // try {
    //   await expect(generate({
    //     input,
    //     outputDir: outputDir2,
    //     generateJs: true,
    //     clearOutputDir: true,
    //     generatePackageJson: true,
    //     tsConfig: resolve(input, 'failing-tsconfig.json')
    //   }))
    // }catch (err) {
    //   console.error(err)
    // }
  }, 60000);
});
