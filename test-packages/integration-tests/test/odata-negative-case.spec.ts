import { resolve, join } from 'path';
import { existsSync, promises } from 'fs';
import execa from 'execa';
import {
  testOutputRootDir,
  testResourcesDir
} from '../../../test-resources/generator';

// TODO use fs-mock
describe('odata negative tests', () => {
  const pathToGenerator = resolve(
    '../../node_modules/@sap-cloud-sdk/generator/dist/generator-cli.js'
  );
  const testDir = join(testOutputRootDir, 'odata-negative');

  beforeAll(async () => {
    if (!existsSync(testOutputRootDir)) {
      await promises.mkdir(testOutputRootDir);
    }
    if (existsSync(testDir)) {
      await promises.rmdir(testDir, { recursive: true });
      await promises.mkdir(testDir);
    }
  });

  it('should fail on faulty edmx', async () => {
    await expect(
      execa(
        'node',
        [
          pathToGenerator,
          '-i',
          resolve(testResourcesDir, 'faulty-edmx'),
          '-o',
          join(testDir, 'faulty-edmx')
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
          resolve(
            testResourcesDir,
            '../../odata-service-specs/v2/API_TEST_SRV'
          ),
          '-o',
          join(testDir, 'faulty-typescript'),
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
  }, 150000);
});
