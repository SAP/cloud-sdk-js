import { resolve } from 'path';
import execa from 'execa';
import {
  testDir,
  testOutputRootDir,
  testResourcesDir
} from '../../../test-resources/generator';

describe('odata negative tests', () => {
  it('should fail on faulty edmx', async () => {
    await expect(
      execa(
        'npx',
        [
          'sap-cloud-sdk',
          'generate-odata-client',
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
  }, 10000);

  it('should fail on faulty typescript files.', async () => {
    await expect(
      execa(
        'npx',
        [
          'sap-cloud-sdk',
          'generate-odata-client',
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
