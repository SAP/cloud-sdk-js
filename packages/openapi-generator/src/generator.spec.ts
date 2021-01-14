import { resolve } from 'path';
import { existsSync } from 'fs';
import { deleteDirectory } from '@sap-cloud-sdk/util';
import { generate, getSDKVersion } from './generator';

describe('generator', () => {
  const inputDir = resolve(
    __dirname,
    '../../../test-resources/openapi-service-specs/'
  );
  const outputDir = resolve(__dirname, '../generation-test');

  beforeAll(async () => {
    await generate({
      inputDir,
      outputDir,
      generateJs: true,
      clearOutputDir: true,
      generatePackageJson: true
    });
  }, 60000);

  afterAll(async () => {
    await deleteDirectory(outputDir);
  });

  it('getSDKVersion returns a valid stable version', () => {
    expect(getSDKVersion().split('.').length).toBe(3);
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
});
