import { join, resolve } from 'path';
import { promises } from 'fs';
import { transports } from 'winston';
import mock from 'mock-fs';
import prettier from 'prettier';
import { createLogger } from '@sap-cloud-sdk/util';
import { getInputFilePaths } from '@sap-cloud-sdk/generator-common/dist/options-parser';
import { getRelPathWithPosixSeparator } from '@sap-cloud-sdk/generator-common/internal';
import {
  createOptions,
  createParsedOptions
} from '../test/test-util/create-generator-options';
import {
  checkStaticProperties,
  getOperationFunctionDeclarations,
  getGeneratedFiles
} from '../test/test-util/generator';
import { oDataServiceSpecs } from '../../../test-resources/odata-service-specs';
import {
  generate,
  generateProject,
  getInstallODataErrorMessage
} from './generator';
import type { SourceFile } from 'ts-morph';

const { readFile } = promises;

const pathTestResources = resolve(__dirname, '../../../test-resources');
const pathTestService = resolve(
  oDataServiceSpecs,
  'v2',
  'API_TEST_SRV',
  'API_TEST_SRV.edmx'
);
const pathToGeneratorCommon = resolve(__dirname, '../../generator-common');
const pathRootNodeModules = resolve(__dirname, '../../../node_modules');

jest.setTimeout(60000); // Set timeout to 60 seconds as runners appear to be slow

describe('generator', () => {
  const prettierSpy = jest.spyOn(prettier, 'format');

  describe('common', () => {
    let project;
    beforeEach(async () => {
      mock({
        common: {},
        someDir: {},
        '/prettier/config': JSON.stringify({ printWidth: 66 }),
        [pathTestResources]: mock.load(pathTestResources),
        [pathToGeneratorCommon]: mock.load(pathToGeneratorCommon),
        [pathRootNodeModules]: mock.load(pathRootNodeModules)
      });

      const options = createOptions({
        input: pathTestService,
        outputDir: 'common',
        optionsPerService: 'someDir/test-service-options.json',
        overwrite: true,
        prettierConfig: '/prettier/config',
        metadata: true,
        include: join(pathTestResources, '*.md')
      });
      // TODO the first call will go away once ts-morph is removed
      project = await generateProject(createParsedOptions(options));
      await generate(options);
    });

    afterEach(() => mock.restore());

    it('fails if skip validation is not enabled', async () => {
      const options = createOptions({
        input: pathTestService,
        outputDir: 'failing',
        overwrite: true,
        skipValidation: false
      });
      try {
        // TODO the first call will go away once ts-morph is removed
        project = await generateProject(createParsedOptions(options));
        await generate(options);
        throw new Error('Should not go here.');
      } catch (e) {
        expect(e.message).toMatch(
          /A naming conflict appears for service ApiTestSrv/
        );
      }
    });

    it('writes a options-per-service if it fails', async () => {
      const options = createOptions({
        input: pathTestService,
        outputDir: 'failing',
        overwrite: true,
        skipValidation: false
      });
      try {
        // TODO the first call will go away once ts-morph is removed
        project = await generateProject(createParsedOptions(options));
        await generate(options);
        throw new Error('Should not go here.');
      } catch {
        const optionsPerService = await readFile(
          'someDir/test-service-options.json',
          { encoding: 'utf-8' }
        );
        expect(JSON.parse(optionsPerService)).toEqual({
          '../../test-resources/odata-service-specs/v2/API_TEST_SRV/API_TEST_SRV.edmx':
            {
              basePath: '/sap/opu/odata/sap/API_TEST_SRV',
              directoryName: 'API_TEST_SRV',
              packageName: 'api_test_srv'
            }
        });
      }
    });

    it('reads custom prettier configuration', () => {
      expect(prettierSpy).toHaveBeenCalledWith(expect.any(String), {
        parser: expect.any(String),
        printWidth: 66
      });
    });

    it('recommends to install OData packages', async () => {
      expect(getInstallODataErrorMessage(project!)).toMatchInlineSnapshot(
        '"Did you forget to install "@sap-cloud-sdk/odata-v2"?"'
      );
    });

    it('copies the additional files matching the glob.', async () => {
      const sourceFiles = await promises.readdir(
        join('common', 'API_TEST_SRV')
      );

      expect(
        sourceFiles.find(file => file === 'some-test-markdown.md')
      ).toBeDefined();
    });

    it('generates the options per service and writes to the given folder', async () => {
      const clientFile = await promises.readFile(
        'someDir/test-service-options.json'
      );
      expect(clientFile).toBeDefined();
    }, 10000);

    it('generates the api hub metadata and writes to the input folder', async () => {
      const sourceFiles = await promises.readdir(
        join(pathTestService, '../sdk-metadata')
      );
      const clientFile = sourceFiles.find(
        file => file === 'API_TEST_SRV_CLIENT_JS.json'
      );

      expect(clientFile).toBeDefined();
    }, 10000);
  });

  describe('v2', () => {
    let files: SourceFile[];
    beforeAll(async () => {
      mock({
        'v2-test': {},
        [pathTestResources]: mock.load(pathTestResources)
      });
      files = await getGeneratedFiles('v2', 'v2-test');
    });

    afterAll(async () => {
      mock.restore();
    });

    it('generates expected number of files', () => {
      expect(files.length).toBe(34);
    });

    it('generates TestEntity.ts file', () => {
      const testEntityFile = files.find(
        file => file.getBaseName() === 'TestEntity.ts'
      );

      expect(testEntityFile).toBeDefined();
      expect(testEntityFile!.getClasses().length).toBe(1);
      expect(testEntityFile!.getInterfaces().length).toBe(1);

      const entityClass = testEntityFile!.getClass('TestEntity');
      expect(entityClass!.getProperties().length).toBe(25);

      checkStaticProperties(entityClass!);
    });

    it('generates function-imports.ts file', () => {
      const functionImports = getOperationFunctionDeclarations(files);
      expect(functionImports.length).toBe(15);
    });
  });

  describe('v4', () => {
    let files: SourceFile[];
    beforeAll(async () => {
      mock({
        'v4-test': {},
        [pathTestResources]: mock.load(pathTestResources)
      });
      files = await getGeneratedFiles('v4', 'v4-test');
    });

    afterAll(() => {
      mock.restore();
    });

    it('generates expected number of files', () => {
      expect(files.length).toBe(40);
    });

    it('generates TestEntity.ts file', () => {
      const testEntityFile = files.find(
        file => file.getBaseName() === 'TestEntity.ts'
      );

      expect(testEntityFile).toBeDefined();
      expect(testEntityFile!.getClasses().length).toBe(1);
      expect(testEntityFile!.getInterfaces().length).toBe(4);
      const imports = testEntityFile!
        .getImportStringLiterals()
        .map(stringLiteral => stringLiteral.getLiteralValue());
      expect(imports).toEqual([
        '@sap-cloud-sdk/odata-v4',
        './TestComplexType',
        './TestEntityApi',
        './TestEnumType',
        './TestEnumTypeInt64',
        './TestEnumTypeWithOneMember',
        './TestEntityMultiLink',
        './TestEntitySingleLink'
      ]);

      const entityClass = testEntityFile!.getClass('TestEntity');
      expect(entityClass!.getProperties().length).toBe(33);

      checkStaticProperties(entityClass!);
    });

    it('generates operations.ts file', () => {
      const operations = getOperationFunctionDeclarations(files);
      expect(operations.length).toBe(18);
      const operationNames = operations.map(fi => fi.getName());
      expect(operationNames).toEqual(
        expect.arrayContaining(['testFunctionImportWithDifferentName'])
      );
      expect(operationNames).toEqual(
        expect.not.arrayContaining(['testFunctionImportNoReturnType'])
      );
      expect(operationNames).toEqual(
        expect.arrayContaining(['testActionImportNoParameterNoReturnType'])
      );
      expect(operationNames).toEqual(
        expect.arrayContaining([
          'testActionImportMultipleParameterComplexReturnType'
        ])
      );
    });

    it('generates RequestBuilder for keyless entity without a delete(), update(), and getByKeys() method', () => {
      const requestBuilderClass = files
        .find(
          file => file.getBaseName() === 'TestEntityWithNoKeysRequestBuilder.ts'
        )
        ?.getClass('TestEntityWithNoKeysRequestBuilder');

      expect(requestBuilderClass).toBeDefined();

      ['delete', 'update', 'getByKeys'].forEach(methodName => {
        expect(requestBuilderClass?.getMethod(methodName)).not.toBeDefined();
      });
    });
  });

  describe('get input file paths', () => {
    beforeEach(() => {
      mock({
        root: {
          inputDir: {
            'test-service.txt': 'dummy text specification file',
            'test-service.edmx': 'dummy edmx specification file',
            'test-service.xml': 'dummy xml specification file',
            'test-service.XML': 'dummy XML specification file',
            'empty-dir': {},
            'sub-dir': {
              'test-service.edmx': 'dummy edmx specification file',
              'test-service.xml': 'dummy edmx specification file',
              'test-service.XML': 'dummy XML specification file',
              'test-service.EDMX': 'dummy xml specification file',
              'test-service.txt': 'dummy text specification file'
            }
          },
          outputDir: {}
        }
      });
    });

    afterEach(() => {
      mock.restore();
    });

    const input = 'root/inputDir';

    it('should return an array with one file path for an input file', () => {
      expect(
        getInputFilePaths('root/inputDir/test-service.edmx', 'OData')
      ).toEqual([resolve(input, 'test-service.edmx')]);
    });

    it('should return an array with all edmx and xml file paths within the input directory and all subdirectories', () => {
      expect(getInputFilePaths(input, 'OData')).toEqual([
        resolve(input, 'sub-dir/test-service.EDMX'),
        resolve(input, 'sub-dir/test-service.XML'),
        resolve(input, 'sub-dir/test-service.edmx'),
        resolve(input, 'sub-dir/test-service.xml'),
        resolve(input, 'test-service.XML'),
        resolve(input, 'test-service.edmx'),
        resolve(input, 'test-service.xml')
      ]);
    });

    it('should return an array with all `.xml` files within the input directory and all subdirectories', () => {
      expect(getInputFilePaths('root/inputDir/**/*.xml', 'OData')).toEqual([
        resolve(input, 'sub-dir/test-service.xml'),
        resolve(input, 'test-service.xml')
      ]);
    });

    it('should return an array with all edmx and xml file paths within the input directory', () => {
      expect(getInputFilePaths('root/inputDir/*', 'OData')).toEqual([
        resolve(input, 'test-service.XML'),
        resolve(input, 'test-service.edmx'),
        resolve(input, 'test-service.xml')
      ]);
    });

    it('should return an array with all `.xml` and `.edmx` files within the input directory', () => {
      expect(getInputFilePaths('root/inputDir/*.{xml,edmx}', 'OData')).toEqual([
        resolve(input, 'test-service.edmx'),
        resolve(input, 'test-service.xml')
      ]);
    });
  });

  describe('optionsPerService', () => {
    beforeEach(async () => {
      mock({
        common: {},
        temp: {
          'options.json': JSON.stringify('')
        },
        [pathTestResources]: mock.load(pathTestResources),
        [pathToGeneratorCommon]: mock.load(pathToGeneratorCommon),
        [pathRootNodeModules]: mock.load(pathRootNodeModules),
        existingConfig: JSON.stringify({
          [getRelPathWithPosixSeparator(pathTestService)]: {
            directoryName: 'custom-value'
          }
        }),
        anotherConfig:
          '{ "inputDir/spec2.json": {"directoryName": "customName" } }'
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('writes options per service with custom name', async () => {
      const options = createOptions({
        input: pathTestService,
        outputDir: 'out',
        optionsPerService: 'test-service-options.json',
        skipValidation: true,
        overwrite: true
      });
      await generate(options);

      const actual = JSON.parse(
        await readFile('test-service-options.json', 'utf8')
      );
      await expect(actual).toEqual({
        [getRelPathWithPosixSeparator(pathTestService)]: {
          packageName: 'api_test_srv',
          basePath: '/sap/opu/odata/sap/API_TEST_SRV',
          directoryName: 'API_TEST_SRV'
        }
      });
    });

    it('writes options per service to the given dir', async () => {
      const options = createOptions({
        input: pathTestService,
        outputDir: 'out',
        optionsPerService: 'temp',
        skipValidation: true,
        overwrite: true
      });
      await generate(options);

      const actual = JSON.parse(
        await readFile('temp/options-per-service.json', 'utf8')
      );
      await expect(actual).toEqual({
        [getRelPathWithPosixSeparator(pathTestService)]: {
          directoryName: 'API_TEST_SRV',
          basePath: '/sap/opu/odata/sap/API_TEST_SRV',
          packageName: 'api_test_srv'
        }
      });
    });

    it('writes options per service to the given dir containing an existing options file ', async () => {
      const options = createOptions({
        input: pathTestService,
        outputDir: 'out',
        optionsPerService: 'temp/options.json',
        skipValidation: true,
        overwrite: true
      });
      await generate(options);

      const actual = JSON.parse(await readFile('temp/options.json', 'utf8'));
      await expect(actual).toEqual({
        [getRelPathWithPosixSeparator(pathTestService)]: {
          directoryName: 'API_TEST_SRV',
          basePath: '/sap/opu/odata/sap/API_TEST_SRV',
          packageName: 'api_test_srv'
        }
      });
    });

    it('adds default service options to existing file', async () => {
      const options = createOptions({
        input: pathTestService,
        outputDir: 'out',
        optionsPerService: 'anotherConfig',
        skipValidation: true,
        overwrite: true
      });
      await generateProject(createParsedOptions(options));
      await generate(options);

      const actual = JSON.parse(await readFile('anotherConfig', 'utf8'));
      await expect(actual).toEqual({
        'inputDir/spec2.json': {
          directoryName: 'customName'
        },
        [getRelPathWithPosixSeparator(pathTestService)]: {
          directoryName: 'API_TEST_SRV',
          basePath: '/sap/opu/odata/sap/API_TEST_SRV',
          packageName: 'api_test_srv'
        }
      });
    });

    it('merges options per service with existing values', async () => {
      const options = createOptions({
        input: pathTestService,
        outputDir: 'out',
        optionsPerService: 'existingConfig',
        skipValidation: true,
        overwrite: true
      });
      await generate(options);

      const actual = JSON.parse(await readFile('existingConfig', 'utf8'));
      await expect(actual).toEqual({
        [getRelPathWithPosixSeparator(pathTestService)]: {
          directoryName: 'custom-value',
          basePath: '/sap/opu/odata/sap/API_TEST_SRV',
          packageName: 'custom-value'
        }
      });
    });
  });

  describe('logger', () => {
    beforeAll(() => {
      mock({
        common: {},
        '/prettier/config': JSON.stringify({ printWidth: 66 }),
        [pathTestResources]: mock.load(pathTestResources),
        [pathToGeneratorCommon]: mock.load(pathToGeneratorCommon),
        [pathRootNodeModules]: mock.load(pathRootNodeModules)
      });
    });

    afterAll(() => mock.restore());

    it('should not display verbose logs by default', async () => {
      const consoleSpy = jest.spyOn(process.stdout, 'write');
      const logger = createLogger({
        package: 'generator',
        messageContext: 'generator'
      });
      const options = createOptions({
        input: pathTestService,
        outputDir: 'logger',
        overwrite: true,
        prettierConfig: '/prettier/config',
        metadata: true,
        skipValidation: true,
        include: join(pathTestResources, '*.md')
      });
      await generateProject(createParsedOptions(options));
      await generate(options);
      expect(logger.level).toBe('info');
      expect(consoleSpy).not.toBeCalled();
    });

    it('should display verbose logs when verbose option is set to true', async () => {
      const fileTransport = new transports.File({
        filename: 'test.log'
      });

      const logger = createLogger({
        package: 'generator',
        messageContext: 'generator'
      });
      logger.add(fileTransport);
      const options = createOptions({
        input: pathTestService,
        outputDir: 'logger',
        overwrite: true,
        skipValidation: true,
        prettierConfig: '/prettier/config',
        metadata: true,
        include: join(pathTestResources, '*.md'),
        verbose: true
      });

      await generateProject(createParsedOptions(options));
      await generate(options);
      expect(logger.level).toBe('verbose');
      const log = await readFile('test.log', { encoding: 'utf-8' });
      expect(log).toMatch(/Generating entities .../);
    });
  });
});
