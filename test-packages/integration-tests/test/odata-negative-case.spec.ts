import { resolve, join } from 'path';
import { existsSync, promises } from 'fs';
import {
  testOutputRootDir,
  testResourcesDir
} from '../../../test-resources/generator';

const tinyexec = import('tinyexec');

async function execGenerator(args: string[], cwd: string): Promise<void> {
  const { x } = await tinyexec;
  const result = await x('node', args, { nodeOptions: { cwd } });
  if (result.exitCode) {
    throw new Error(result.stderr || result.stdout);
  }
}

// TODO use fs-mock
describe('odata negative tests', () => {
  const pathToGenerator =
    require.resolve('@sap-cloud-sdk/generator/dist/cli.js');
  const testDir = join(testOutputRootDir, 'odata-negative');

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

  it('should fail on faulty edmx', async () => {
    await expect(
      execGenerator(
        [
          pathToGenerator,
          '-i',
          resolve(testResourcesDir, 'faulty-edmx'),
          '-o',
          join(testDir, 'faulty-edmx')
        ],
        __dirname
      )
    ).rejects.toThrow(
      'No types found for API_TEST_SRV.A_TestComplexTypeMISTAKE'
    );
  }, 150000);

  it('should fail on faulty typescript files.', async () => {
    await expect(
      execGenerator(
        [
          pathToGenerator,
          '-i',
          resolve(
            testResourcesDir,
            '../../odata-service-specs/v2/API_TEST_SRV'
          ),
          '-o',
          join(testDir, 'faulty-typescript'),
          '--include',
          resolve(
            testResourcesDir,
            'faulty-typescript',
            'faulty-typescript.ts'
          ),
          '--clearOutputDir',
          '--transpile',
          '--skipValidation'
        ],
        __dirname
      )
    ).rejects.toThrow("Cannot assign to 'foo' because it is a constant.");
  }, 150000);
});
