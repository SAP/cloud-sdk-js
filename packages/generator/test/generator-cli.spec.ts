import execa = require('execa');

import * as fs from 'fs-extra';
import * as path from 'path';

describe('generator-cli', () => {
  const pathToGenerator = path.resolve(process.cwd(), 'src/generator-cli.ts');
  const inputDir = path.resolve(process.cwd(), '../../test-resources/service-specs/API_TEST_SRV/API_TEST_SRV.edmx');
  const outputDir = path.resolve(process.cwd(), 'test/generator-test-output');
  const pathToGeneratorPackageJson = path.resolve(process.cwd(), 'package.json');

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
      expect(err.stderr).toContain('Missing required arguments: inputDir, outputDir');
    }
  }, 60000);

  it('should generate VDM if all arguments are there', async () => {
    await execa('npx', ['ts-node', pathToGenerator, '-i', inputDir, '-o', outputDir]);
    const services = fs.readdirSync(outputDir);
    expect(services.length).toBeGreaterThan(0);
    const entities = fs.readdirSync(path.resolve(outputDir, services[0]));
    expect(entities).toContain('TestEntity.ts');
    expect(entities).toContain('package.json');
  }, 60000);

  it('should generate package.json with version specified in as the parameter', async () => {
    const versionInPackageJson = '2.0.0';
    await execa('npx', ['ts-node', pathToGenerator, '-i', inputDir, '-o', outputDir, '--versionInPackageJson', versionInPackageJson]);
    const services = fs.readdirSync(outputDir);
    expect(services.length).toBeGreaterThan(0);
    const servicePackageJson = JSON.parse(fs.readFileSync(path.resolve(outputDir, services[0], 'package.json')));
    expect(servicePackageJson.version).toEqual(versionInPackageJson);

    const generatorPackageJson = JSON.parse(fs.readFileSync(pathToGeneratorPackageJson));
    expect(servicePackageJson.dependencies['@sap-cloud-sdk/core']).toEqual(`^${generatorPackageJson.version}`);
  }, 60000);
});
