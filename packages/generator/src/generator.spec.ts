import { join, resolve } from 'path';
import { promises } from 'fs';
import { transports } from 'winston';
import { SourceFile } from 'ts-morph';
import mock from 'mock-fs';
import prettier from 'prettier';
import { createLogger } from '@sap-cloud-sdk/util';
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

const { readFile } = promises;

const pathTestResources = resolve(__dirname, '../../../test-resources');
const pathTestService = resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV');
const pathToGeneratorCommon = resolve(__dirname, '../../generator-common');
const pathRootNodeModules = resolve(__dirname, '../../../node_modules');

describe('generator', () => {
  const prettierSpy = jest.spyOn(prettier, 'format');

  describe('common', () => {
    let project;
    beforeAll(async () => {
      mock({
        common: {},
        someDir: {},
        '/prettier/config': JSON.stringify({ printWidth: 66 }),
        [pathTestResources]: mock.load(pathTestResources),
        [pathToGeneratorCommon]: mock.load(pathToGeneratorCommon),
        [pathRootNodeModules]: mock.load(pathRootNodeModules)
      });

      const options = createOptions({
        inputDir: pathTestService,
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

    afterAll(() => mock.restore());

    it('fails if skip validation is not enabled', async () => {
      const options = createOptions({
        inputDir: pathTestService,
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
          /A naming conflict appears for service TestServic/
        );
      }
    });

    it('reads custom prettier configuration', () => {
      expect(prettierSpy).toHaveBeenCalledWith(expect.any(String), {
        parser: expect.any(String),
        printWidth: 66
      });
    });

    it('recommends to install odata packages', async () => {
      expect(getInstallODataErrorMessage(project!)).toMatchInlineSnapshot(
        '"Did you forget to install "@sap-cloud-sdk/odata-v2"?"'
      );
    });

    it('copies the additional files matching the glob.', async () => {
      const sourceFiles = await promises.readdir(
        join('common', 'test-service')
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
      // nock('http://registry.npmjs.org/').head(/.*/).reply(404);

      const sourceFiles = await promises.readdir(
        join(pathTestService, 'sdk-metadata')
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
      expect(files.length).toBe(35);
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
      const functionImports = getOperationFunctionDeclarations(
        files,
        'function'
      );
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

    it('generates function-imports.ts file', () => {
      const functionImports = getOperationFunctionDeclarations(
        files,
        'function'
      );
      expect(functionImports.length).toBe(11);
      const functionImportNames = functionImports.map(fi => fi.getName());
      expect(functionImportNames).toEqual(
        expect.arrayContaining(['testFunctionImportWithDifferentName'])
      );
      expect(functionImportNames).toEqual(
        expect.not.arrayContaining(['testFunctionImportNoReturnType'])
      );
    });

    it('generates action-imports.ts file', () => {
      const actionImports = getOperationFunctionDeclarations(files, 'action');
      expect(actionImports.length).toBe(7);
      const actionImportNames = actionImports.map(action => action.getName());
      expect(actionImportNames).toEqual(
        expect.arrayContaining(['testActionImportNoParameterNoReturnType'])
      );
      expect(actionImportNames).toEqual(
        expect.arrayContaining([
          'testActionImportMultipleParameterComplexReturnType'
        ])
      );
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
        existingConfig:
          '{ "API_TEST_SRV": {"directoryName": "test-service" } }',
        anotherConfig:
          '{ "inputDir/spec2.json": {"directoryName": "customName" } }'
      });
    });

    afterEach(() => {
      mock.restore();
    });

    it('writes options per service with custom name', async () => {
      const options = createOptions({
        inputDir: pathTestService,
        outputDir: 'out',
        optionsPerService: 'test-service-options.json',
        skipValidation: true,
        overwrite: true
      });
      await generate(options);

      const actual = readFile('test-service-options.json', 'utf8');
      await expect(actual).resolves.toMatch(
        JSON.stringify(
          {
            API_TEST_SRV: {
              directoryName: 'test-service',
              basePath: '/sap/opu/odata/sap/API_TEST_SRV',
              npmPackageName: 'test-service'
            }
          },
          null,
          2
        )
      );
    });

    it('writes options per service to the given dir', async () => {
      const options = createOptions({
        inputDir: pathTestService,
        outputDir: 'out',
        optionsPerService: 'temp',
        skipValidation: true,
        overwrite: true
      });
      await generate(options);

      const actual = readFile('temp/options-per-service.json', 'utf8');
      await expect(actual).resolves.toMatch(
        JSON.stringify(
          {
            API_TEST_SRV: {
              directoryName: 'test-service',
              basePath: '/sap/opu/odata/sap/API_TEST_SRV',
              npmPackageName: 'test-service'
            }
          },
          null,
          2
        )
      );
    });

    it('writes options per service to the given dir containing an existing options file ', async () => {
      const options = createOptions({
        inputDir: pathTestService,
        outputDir: 'out',
        optionsPerService: 'temp/options.json',
        skipValidation: true,
        overwrite: true
      });
      await generate(options);

      const actual = readFile('temp/options.json', 'utf8');
      await expect(actual).resolves.toMatch(
        JSON.stringify(
          {
            API_TEST_SRV: {
              directoryName: 'test-service',
              basePath: '/sap/opu/odata/sap/API_TEST_SRV',
              npmPackageName: 'test-service'
            }
          },
          null,
          2
        )
      );
    });

    xit('merges options per service', async () => {
      const options = createOptions({
        inputDir: pathTestService,
        outputDir: 'out',
        optionsPerService: 'anotherConfig',
        skipValidation: true,
        overwrite: true
      });
      await generateProject(createParsedOptions(options));
      await generate(options);

      const actual = readFile('anotherConfig', 'utf8');
      await expect(actual).resolves.toMatch(
        JSON.stringify(
          {
            'inputDir/spec2.json': {
              directoryName: 'customName'
            },
            API_TEST_SRV: {
              directoryName: 'test-service',
              basePath: '/sap/opu/odata/sap/API_TEST_SRV',
              npmPackageName: 'test-service'
            }
          },
          null,
          2
        )
      );
    });

    xit('overwrites writes options per service', async () => {
      const options = createOptions({
        inputDir: pathTestService,
        outputDir: 'out',
        optionsPerService: 'existingConfig',
        skipValidation: true,
        overwrite: true
      });
      await generate(options);

      const actual = readFile('existingConfig', 'utf8');
      await expect(actual).resolves.toMatch(
        JSON.stringify(
          {
            API_TEST_SRV: {
              directoryName: 'test-service',
              basePath: '/sap/opu/odata/sap/API_TEST_SRV',
              npmPackageName: 'test-service'
            }
          },
          null,
          2
        )
      );
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
        inputDir: pathTestService,
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
        inputDir: pathTestService,
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
