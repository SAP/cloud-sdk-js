/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import execa = require('execa');
import * as path from 'path';
import * as fs from 'fs-extra';

describe('generator-cli', () => {
  const pathToGenerator = path.resolve(process.cwd(), 'src/generator-cli.ts');
  const inputDir = path.resolve(
    process.cwd(),
    '../../test-resources/service-specs/v2/API_TEST_SRV/API_TEST_SRV.edmx'
  );
  const outputDir = path.resolve(process.cwd(), 'test/generator-test-output');

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
});
