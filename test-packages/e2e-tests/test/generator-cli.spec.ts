import * as path from 'path';
import execa from 'execa';
import * as fs from 'fs-extra';
import mock from 'mock-fs';
import { generate } from '../../../packages/generator/src/generator';
import { createOptions } from '../../../packages/generator/test/test-util/create-generator-options';
import { oDataServiceSpecs } from '../../../test-resources/odata-service-specs';

/**
 * use mock.load
 * run command function withoud execals
 * no need to test whole cli, just test functions respectively
 * 
 */
describe('generator-cli', () => {
  const pathToGenerator = path.resolve(
    __dirname,
    '../../../packages/generator/src/generator-cli.ts'
  );
  const inputDir = path.resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV');
  const outputDir = path.resolve(__dirname, 'generator-test-output');

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
      await execa('npx', ['ts-node', pathToGenerator]);
    } catch (err) {
      console.log(err.stderr)
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
      path.resolve(__dirname, 'generator.config.json')
    ]);
    const services = fs.readdirSync(outputDir);
    expect(services.length).toBeGreaterThan(0);
    const entities = fs.readdirSync(path.resolve(outputDir, services[0]));
    expect(entities).toContain('TestEntity.ts');
    expect(entities).toContain('package.json');
  }, 60000);

  it('should set version when versionInPackageJson option is used', async () => {
    const process = await execa('npx', [
      'ts-node',
      pathToGenerator,
      '-c',
      path.resolve(__dirname, 'generator.config.json'),
      '--versionInPackageJson=42.23'
    ]);

    const actualPackageJson = JSON.parse(
      fs.readFileSync(`${outputDir}/test-service/package.json`).toString()
    );
    expect(actualPackageJson.version).toEqual('42.23');

    expect(process.stdout).toMatch(
      /The option 'versionInPackageJson' is deprecated since v2.6.0./
    );
  }, 60000);

  it('should just replace generate function itself not throughout cli()', () => {

    mock({
      root: {
        inputDir: {},
        outputDir: {}
      }
    });
    
    generate(createOptions({
      inputDir: inputDir,
      outputDir: outputDir
    }))
  });
});
