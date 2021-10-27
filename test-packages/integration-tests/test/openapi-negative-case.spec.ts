import { resolve, join } from 'path';
import { existsSync, promises } from 'fs';
import execa from 'execa';
import {
  testOutputRootDir,
  testResourcesDir
} from '../../../test-resources/generator';

// TODO use fs-mock here
describe('openapi negative tests', () => {
  const pathToGenerator = resolve(
    '../../node_modules/@sap-cloud-sdk/openapi-generator/dist/cli.js'
  );

  const testDir = join(testOutputRootDir, 'openapi-negative');
  beforeAll(async () => {
    if (!existsSync(testOutputRootDir)) {
      await promises.mkdir(testOutputRootDir);
    }
    await promises.rmdir(testDir, { recursive: true });
    await promises.mkdir(testDir);
  });

  it('should fail on generation for faulty spec file', async () => {
    const output = join(testDir, 'faulty-specification');
    await promises.mkdir(output);

    await expect(
      execa(
        'node',
        [
          pathToGenerator,
          '--input',
          resolve(testResourcesDir, 'faulty-openapi'),
          '--outputDir',
          output,
          '--clearOutputDir'
        ],
        { cwd: __dirname }
      )
      // In the spec file the http method is not set
    ).rejects.toThrowError(
      'Could not parse APIs. The document does not contain any operations.'
    );
  }, 120000);

  it('should fail on transpilation on faulty tsconfig - this also checks that --tsConfig switches on transpile', async () => {
    const output = join(testDir, 'transpilation-failed-1');
    await promises.mkdir(output);
    await expect(
      execa(
        'node',
        [
          pathToGenerator,
          '--input',
          resolve(
            testOutputRootDir,
            '../../openapi-service-specs/test-service.json'
          ),
          '-o',
          output,
          '--skipValidation',
          '--clearOutputDir',
          '--tsConfig',
          resolve(testResourcesDir, 'faulty-openapi-tsconfig', 'tsconfig.json')
        ],
        { cwd: __dirname }
      )
      // In the faulty tsconfig.json a non existing lib is included
    ).rejects.toThrowError(
      "typescript/lib/lib.non-exisiting-lib.d.ts' not found"
    );
  }, 120000);

  it('should fail on transpilation on faulty ts source file- this also checks that --include is done before transpile', async () => {
    const output = join(testDir, 'transpilation-failed-2');
    await promises.mkdir(output);
    await expect(
      execa(
        'node',
        [
          pathToGenerator,
          '-i',
          resolve(
            testResourcesDir,
            '../../openapi-service-specs/test-service.json'
          ),
          '-o',
          output,
          '--skipValidation',
          '--clearOutputDir',
          '--transpile',
          '--include',
          resolve(testResourcesDir, 'faulty-typescript', 'faulty-typescript.ts')
        ],
        { cwd: __dirname }
      )
      // In the faulty tsconfig.json a non existing lib is included
    ).rejects.toThrowError("Cannot assign to 'foo' because it is a constant.");
  }, 120000);
});
