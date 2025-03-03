import * as path from 'path';
import { resolve } from 'path';
import execa from 'execa';
import * as fs from 'fs-extra';
import mock from 'mock-fs';
import { generate } from '@sap-cloud-sdk/generator/internal';
import { createOptions } from '@sap-cloud-sdk/generator/test/test-util/create-generator-options';
import { oDataServiceSpecs } from '../../../test-resources/odata-service-specs';

const pathToGenerator = path.resolve(
  __dirname,
  '../../../packages/generator/src/cli.ts'
);

describe('OData generator CLI', () => {
  const inputDir = path.resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV');
  const rootNodeModules = path.resolve(__dirname, '../../../node_modules');
  const pathToConfig = path.resolve(__dirname, 'generator.config.json');
  const generatorCommon = path.resolve(
    __dirname,
    '../../../packages/generator-common'
  );
  const outputDirVersionPackageJson = resolve(
    __dirname,
    '../generation-e2e-test-version-in-package-json'
  );
  const outputDirGenerateAll = resolve(__dirname, '../generation-e2e-test');

  beforeEach(() => {
    mock({
      [inputDir]: mock.load(inputDir),
      [generatorCommon]: mock.load(generatorCommon),
      [pathToConfig]: mock.load(pathToConfig),
      [rootNodeModules]: mock.load(rootNodeModules),
      [outputDirGenerateAll]: {},
      [outputDirVersionPackageJson]: {}
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should fail if mandatory parameters are not there', async () => {
    await expect(() =>
      execa.command(`npx ts-node ${pathToGenerator}`)
    ).rejects.toThrowError(/Missing required arguments: input, outputDir/);
  }, 60000);

  it('should read config', async () => {
    await expect(
      execa.command(`npx ts-node ${pathToGenerator} -c ${pathToConfig}`)
    ).resolves.not.toThrow();
  }, 60000);

  it('should generate client if all arguments are there', async () => {
    await generate(
      createOptions({
        input: inputDir,
        outputDir: outputDirGenerateAll,
        transpile: true,
        packageJson: true
      })
    );
    const services = fs.readdirSync(outputDirGenerateAll);
    expect(services.length).toBeGreaterThan(0);
    const entities = fs.readdirSync(
      path.resolve(outputDirGenerateAll, services[0])
    );
    expect(entities).toContain('TestEntity.ts');
    expect(entities).toContain('TestEntity.js');
    expect(entities).toContain('package.json');
  }, 60000);
});
