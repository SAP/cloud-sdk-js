import { resolve } from 'path';
import execa from 'execa';
import {
  testDir,
  testOutputRootDir,
  testResourcesDir
} from '../../../test-resources/generator';

describe('openapi negative tests', () => {
  // TODO Put test back in once the spec validation is put back in.
  xit('should fail on generation for faulty spec file', async () => {
    const output = resolve(
      testOutputRootDir,
      'openapi-negative',
      'faulty-specification'
    );
    await expect(
      execa(
        'npx',
        [
          'generate-openapi-client',
          '-i',
          resolve(testResourcesDir, 'test-resources', 'faulty-openapi'),
          '-o',
          output,
          '--clearOutputDir'
        ],
        { cwd: __dirname }
      )
      // In the spec file the http method is broken
    ).rejects.toThrowError('set failed method');
  }, 120000);

  it('should fail on transpilation on faulty tsconfig', async () => {
    const output = resolve(
      testOutputRootDir,
      'openapi-negative',
      'transpilation-failed'
    );
    await expect(
      execa(
        'npx',
        [
          'generate-openapi-client',
          '-i',
          resolve(testDir, '../openapi-service-specs'),
          '-o',
          output,
          '--tsConfig',
          resolve(testResourcesDir, 'faulty-openapi-tsconfig', 'tsconfig.json')
        ],
        { cwd: __dirname }
      )
      // In the faulty tsconfig.json file the dom lib has been removed which leads to this compile error
    ).rejects.toThrowError("Cannot find name 'URL'");
  }, 120000);
});
