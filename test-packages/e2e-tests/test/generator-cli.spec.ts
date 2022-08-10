import * as path from 'path';
import execa from 'execa';
import * as fs from 'fs-extra';
import mock from 'mock-fs';
import { readFileSync } from 'fs-extra';
import { generate } from '../../../packages/generator/src/generator';
import { createOptions } from '../../../packages/generator/test/test-util/create-generator-options';
import { oDataServiceSpecs } from '../../../test-resources/odata-service-specs';
// import { parseCmdArgs } from "../../../packages/generator/src/generator-cli";
import { createOptionsFromConfig } from '../../../packages/generator/src/generator-cli';

describe('generator-cli', () => {
  const pathToGenerator = path.resolve(
    __dirname,
    '../../../packages/generator/src/generator-cli.ts'
  );
  // to be removed
  const inputDir = path.resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV');
  const outputDir = path.resolve(__dirname, 'generator-test-output');

  const pathTestResources = path.resolve(__dirname, '../../../test-resources');
  const pathTestService = path.resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV');
  const outPutPath = 'mockOutput';
  const rootNodeModules = path.resolve(__dirname, '../../../node_modules');
  const generatorCommon = path.resolve(
    __dirname,
    '../../../packages/generator-common'
  );

  beforeEach(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    jest.resetModules();
    delete require.cache[require.resolve('yargs')];
  });

  afterEach(() => {
    fs.removeSync(outputDir);
    mock.restore();
    jest.resetAllMocks();
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
    mock({
      [outPutPath]: {},
      [pathTestResources]: mock.load(pathTestResources),
      [rootNodeModules]: mock.load(rootNodeModules),
      [generatorCommon]: mock.load(generatorCommon)
    });

    await generate(
      createOptions({
        inputDir: pathTestService,
        outputDir: outPutPath,
        generateJs: true,
        generatePackageJson: true
      })
    );
    const services = fs.readdirSync(outPutPath);
    expect(services.length).toBeGreaterThan(0);
    const entities = fs.readdirSync(path.resolve(outPutPath, services[0]));
    expect(entities).toContain('TestEntity.ts');
    expect(entities).toContain('TestEntity.js');
    expect(entities).toContain('package.json');
  });
  it('should create options from a config file', () => {
    const pathToConfig = path.resolve(__dirname, 'generator.config.json');
    mock({ [pathToConfig]: mock.load(pathToConfig) });

    // createOptionsFromConfig() calls whole cli functionality then returns error even the only the function is exported and imported.
    // and this line affects all other tests results. when this file has createOptionsFromConfig(), all tests returns same result(error).
    expect(createOptionsFromConfig(pathToConfig)).toEqual({
      inputDir:
        '/Users/I346417/projects/sap-cloud-sdk-js/282-improve-generator-cli-test/test-resources/odata-service-specs/v2/API_TEST_SRV',
      outputDir:
        '/Users/I346417/projects/sap-cloud-sdk-js/282-improve-generator-cli-test/test-packages/e2e-tests/test/generator-test-output'
    });
  });
  // this test containing the same codes createOptionsFromConfig() defined locally works fine when createOptionsFromConfig() is commented out
  it('should create options from a config locally', () => {
    const pathToConfig = path.resolve(__dirname, 'generator.config.json');
    mock({ [pathToConfig]: mock.load(pathToConfig) });

    expect(createOptionsFromConfigLocal(pathToConfig)).toEqual({
      inputDir:
        '/Users/I346417/projects/sap-cloud-sdk-js/282-improve-generator-cli-test/test-resources/odata-service-specs/v2/API_TEST_SRV',
      outputDir:
        '/Users/I346417/projects/sap-cloud-sdk-js/282-improve-generator-cli-test/test-packages/e2e-tests/test/generator-test-output'
    });

    function createOptionsFromConfigLocal(configPath: string) {
      const file = readFileSync(configPath, 'utf-8');
      const pathLikeKeys = ['inputDir', 'outputDir', 'serviceMapping'];
      return pathLikeKeys.reduce(
        (json, pathLikeKey) =>
          typeof json[pathLikeKey] === 'undefined'
            ? json
            : {
                ...json,
                [pathLikeKey]: path.resolve(
                  path.dirname(configPath),
                  json[pathLikeKey]
                )
              },
        JSON.parse(file)
      );
    }
  });
});
