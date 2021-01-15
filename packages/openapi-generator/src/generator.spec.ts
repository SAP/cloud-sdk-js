import { resolve } from 'path';
import { existsSync } from 'fs';
import { deleteDirectory } from '@sap-cloud-sdk/util';
import { generate, getSdkVersion } from './generator';

describe('generator', () => {
  const input = resolve(
    __dirname,
    '../../../test-resources/openapi-service-specs/'
  );
  const outputDir = resolve(__dirname, '../generation-test');

  beforeAll( () => generate({
      input,
      outputDir,
      generateJs: true,
      clearOutputDir: true,
      generatePackageJson: true
    }).then(()=>console.log('Finished generation')).catch(err=>console.log('Error generation'+err.message))
  , 120000);

  afterAll(() =>  deleteDirectory(outputDir),120000);

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
});
