import * as path from 'path';
import execa = require('execa');
import * as fs from 'fs-extra';

describe('generator-cli', () => {
  const pathToGenerator = path.resolve(__dirname, 'generator-cli.ts');
  const inputDir =
    '../../test-resources/odata-service-specs/v2/API_TEST_SRV/API_TEST_SRV.edmx';
  const outputDir = path.resolve(__dirname, '../test/generator-test-output');

  beforeEach(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
  });

  afterEach(() => {
    fs.removeSync(outputDir);
  });

  it('should fail if mandatory parameters are not there', async () => {
    try {
      await execa('yarn', ['root:ts-node', pathToGenerator]);
    } catch (err) {
      expect(err.stderr).toContain(
        'Missing required arguments: inputDir, outputDir'
      );
    }
  }, 60000);

  it('should generate VDM if all arguments are there', async () => {
    await execa('yarn', [
      'root:ts-node',
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
    await execa('yarn', [
      'root:ts-node',
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
