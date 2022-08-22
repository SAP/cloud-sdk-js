import * as path from 'path';
import execa from 'execa';
import * as fs from 'fs-extra';
import mock from 'mock-fs';
import { generate } from '../../../packages/generator/src/generator';
import { createOptionsFromConfig } from '../../../packages/generator/src/generator-options';
import { createOptions } from '../../../packages/generator/test/test-util/create-generator-options';
import { oDataServiceSpecs } from '../../../test-resources/odata-service-specs';

describe('generator-cli', () => {
  const pathToGenerator = path.resolve(
    __dirname,
    '../../../packages/generator/src/generator-cli.ts'
  );

  const inputDir = path.resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV');
  const outputDir = path.resolve(__dirname, 'generator-test-output');
  const rootNodeModules = path.resolve(__dirname, '../../../node_modules');
  const pathToConfig = path.resolve(__dirname, 'generator.config.json');
  const generatorCommon = path.resolve(
    __dirname,
    '../../../packages/generator-common'
  );

  beforeEach(() => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
  });

  afterEach(() => {
    fs.removeSync(outputDir);
    mock.restore();
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
      [inputDir]: mock.load(inputDir),
      [outputDir]: mock.load(outputDir),
      [generatorCommon]: mock.load(generatorCommon),
      [rootNodeModules]: mock.load(rootNodeModules)
    });
    await generate(
      createOptions({
        inputDir,
        outputDir,
        generateJs: true,
        generatePackageJson: true
      })
    );
    const services = fs.readdirSync(outputDir);
    expect(services.length).toBeGreaterThan(0);
    const entities = fs.readdirSync(path.resolve(outputDir, services[0]));
    expect(entities).toContain('TestEntity.ts');
    expect(entities).toContain('TestEntity.js');
    expect(entities).toContain('package.json');
  });
  it('should create options from a config file', () => {
    mock({ [pathToConfig]: mock.load(pathToConfig) });
    expect(createOptionsFromConfig(pathToConfig)).toEqual({
      inputDir,
      outputDir
    });
  });
  it('should generate VDM if there is a valid config file', async () => {
    const { inputDir: inputDirFromConfig, outputDir: outputDirFromConfig } =
      createOptionsFromConfig(pathToConfig) as {
        inputDir: string;
        outputDir: string;
      };
    mock({
      [inputDirFromConfig]: mock.load(inputDirFromConfig),
      [outputDirFromConfig]: mock.load(outputDirFromConfig),
      [generatorCommon]: mock.load(generatorCommon),
      [pathToConfig]: mock.load(pathToConfig),
      [rootNodeModules]: mock.load(rootNodeModules)
    });
    await generate(
      createOptions({
        inputDir: inputDirFromConfig,
        outputDir: outputDirFromConfig,
        generateJs: true,
        generatePackageJson: true
      })
    );
    const services = fs.readdirSync(outputDirFromConfig);
    expect(services.length).toBeGreaterThan(0);
    const entities = fs.readdirSync(
      path.resolve(outputDirFromConfig, services[0])
    );
    expect(entities).toContain('TestEntity.ts');
    expect(entities).toContain('TestEntity.js');
    expect(entities).toContain('package.json');
  });
  it('should set version when versionInPackageJson option is used', async () => {
    const { inputDir: inputDirFromConfig, outputDir: outputDirFromConfig } =
      createOptionsFromConfig(pathToConfig) as {
        inputDir: string;
        outputDir: string;
      };
    mock({
      [inputDirFromConfig]: mock.load(inputDirFromConfig),
      [outputDirFromConfig]: mock.load(outputDirFromConfig),
      [generatorCommon]: mock.load(generatorCommon),
      [pathToConfig]: mock.load(pathToConfig),
      [rootNodeModules]: mock.load(rootNodeModules)
    });
    await generate(
      createOptions({
        inputDir: inputDirFromConfig,
        outputDir: outputDirFromConfig,
        generateJs: true,
        generatePackageJson: true,
        versionInPackageJson: '42.23'
      })
    );
    const services = fs.readdirSync(outputDirFromConfig);
    const actualPackageJson = JSON.parse(
      fs
        .readFileSync(
          path.resolve(
            outputDirFromConfig.toString(),
            services[0],
            'package.json'
          )
        )
        .toString()
    );
    expect(actualPackageJson.version).toEqual('42.23');
  });
  it('should throw a warning message for a deprecated option even when the generation is failed', async () => {
    //Use a broken service to stop the service generation process early - we are only interested in the log statement
    try {
      await execa('npx', [
        'ts-node',
        pathToGenerator,
        '-i',
        path.resolve(
          __dirname,
          '../../../test-resources/generator/resources/faulty-edmx'
        ),
        '-o',
        outputDir,
        '--versionInPackageJson=42.23'
      ]);
    } catch (err) {
      expect(err.stdout).toMatch(
        /\(generator-options\): The option 'versionInPackageJson' is deprecated since v2.6.0./
      );
    }
  }, 60000);
});
