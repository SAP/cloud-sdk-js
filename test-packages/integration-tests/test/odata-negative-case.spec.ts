import { resolve } from 'path';
import execa from 'execa';
import {
  testDir,
  testOutputRootDir,
  testResourcesDir
} from '../../../test-resources/generator';

describe('odata negative tests', () => {
  const pathToGenerator = resolve(
    '../../node_modules/@sap-cloud-sdk/generator/dist/generator-cli.js'
  );

  it('should fail on faulty edmx', async () => {
    await expect(
      execa(
        'node',
        [
          pathToGenerator,
          '-i',
          resolve(testResourcesDir, 'faulty-edmx'),
          '-o',
          resolve(testOutputRootDir, 'odata-negative', 'faulty-edmx')
        ],
        { cwd: __dirname }
      )
    ).rejects.toThrowError(
      'No types found for API_TEST_SRV.A_TestComplexTypeMISTAKE'
    );
  }, 150000);

  it('should fail on faulty typescript files.', async () => {
    await expect(
      execa(
        'node',
        [
          pathToGenerator,
          '-i',
          resolve(testDir, '../odata-service-specs/v2/API_TEST_SRV'),
          '-o',
          resolve(testOutputRootDir, 'odata-negative', 'faulty-typescript'),
          '--additionalFiles',
          resolve(
            testResourcesDir,
            'faulty-typescript',
            'faulty-typescript.ts'
          ),
          '--clearOutputDir'
        ],
        { cwd: __dirname }
      )
    ).rejects.toThrowError("Cannot assign to 'foo' because it is a constant.");
  }, 15000);
});
