import { resolve, join } from 'path';
import { existsSync, promises } from 'fs';
import {
  testOutputRootDir,
  testResourcesDir
} from '../../../test-resources/generator';
import { execOpenApiGenerator } from './test-util';

// TODO use fs-mock here
describe('openapi negative tests', () => {
  const testDir = join(testOutputRootDir, 'openapi-negative');
  beforeAll(async () => {
    if (!existsSync(testOutputRootDir)) {
      await promises.mkdir(testOutputRootDir);
    }
    if (existsSync(testDir)) {
      await promises.rm(testDir, { recursive: true });
    }
    await promises.mkdir(testDir);
  });

  afterAll(async () => {
    await promises.rm(testDir, { recursive: true });
  });

  it('should fail on generation for faulty spec file', async () => {
    const output = join(testDir, 'faulty-specification');
    await promises.mkdir(output);

    await expect(
      execOpenApiGenerator([
        '--input',
        resolve(testResourcesDir, 'faulty-openapi'),
        '--outputDir',
        output,
        '--clearOutputDir'
      ])
      // In the spec file the http method is not set
    ).rejects.toThrow(
      'Could not parse APIs. The document does not contain any operations.'
    );
  }, 120000);

  it('should fail on transpilation on faulty tsconfig - this also checks that --tsconfig switches on transpile', async () => {
    const output = join(testDir, 'transpilation-failed-1');
    await promises.mkdir(output);
    await expect(
      execOpenApiGenerator([
        '--input',
        resolve(
          testOutputRootDir,
          '../../openapi-service-specs/specifications/test-service.json'
        ),
        '-o',
        output,
        '--skipValidation',
        '--clearOutputDir',
        '--tsconfig',
        resolve(testResourcesDir, 'faulty-openapi-tsconfig', 'tsconfig.json')
      ])
      // In the faulty tsconfig.json a non existing lib is included
    ).rejects.toThrow("Argument for '--lib' option must be:");
  }, 120000);

  it('should fail on transpilation on faulty ts source file- this also checks that --include is done before transpile', async () => {
    const output = join(testDir, 'transpilation-failed-2');
    await promises.mkdir(output);
    await expect(
      execOpenApiGenerator([
        '-i',
        resolve(
          testResourcesDir,
          '../../openapi-service-specs/specifications/test-service.json'
        ),
        '-o',
        output,
        '--skipValidation',
        '--clearOutputDir',
        '--transpile',
        '--include',
        resolve(testResourcesDir, 'faulty-typescript', 'faulty-typescript.ts')
      ])
      // In the faulty tsconfig.json a non existing lib is included
    ).rejects.toThrow("Cannot assign to 'foo' because it is a constant.");
  }, 120000);
});
