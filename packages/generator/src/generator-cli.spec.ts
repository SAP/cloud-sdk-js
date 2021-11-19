import * as path from 'path';
import { execa } from 'execa';
import * as fs from 'fs-extra';
import { oDataServiceSpecs } from '../../../test-resources/odata-service-specs';

describe('generator-cli', () => {
  const pathToGenerator = path.resolve(__dirname, 'generator-cli.ts');
  const inputDir = path.resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV');
  const outputDir = path.resolve(__dirname, '../test/generator-test-output');

  beforeEach(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
  });

  afterEach(() => {
    fs.removeSync(outputDir);
  });

  // TODO move these tests to the nightly tests
  it('should fail if mandatory parameters are not there', async () => {
    try {
      await execa('npx', ['ts-node', pathToGenerator]);
    } catch (err) {
      expect(err.stderr).toContain(
        'Missing required arguments: inputDir, outputDir'
      );
    }
  }, 60000);

  it('should generate VDM if all arguments are there', async () => {
    await execa('npx', [
      'ts-node',
      pathToGenerator,
      '-i',
      inputDir,
      '-o',
      outputDir
    ]);
    const services = fs.readdirSync(outputDir);
    expect(services.length).toBeGreaterThan(0);
    const entities = fs.readdirSync(path.resolve(outputDir, services[0]));
    expect(entities).toContain('TestEntity.ts');
    expect(entities).toContain('package.json');
  }, 60000);

  it('should generate VDM if there is a valid config file', async () => {
    await execa('npx', [
      'ts-node',
      pathToGenerator,
      '-c',
      path.resolve(__dirname, '../test/generator.config.json')
    ]);
    const services = fs.readdirSync(outputDir);
    expect(services.length).toBeGreaterThan(0);
    const entities = fs.readdirSync(path.resolve(outputDir, services[0]));
    expect(entities).toContain('TestEntity.ts');
    expect(entities).toContain('package.json');
  }, 60000);
});
