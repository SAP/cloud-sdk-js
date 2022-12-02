import { join, resolve } from 'path';
import { promises } from 'fs';
import { SourceFile } from 'ts-morph';
import mock from 'mock-fs';
import prettier from 'prettier';
import { createOptions } from '../test/test-util/create-generator-options';
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
import * as csnGeneration from './service/csn';

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
        '/prettier/config': JSON.stringify({ printWidth: 66 }),
        [pathTestResources]: mock.load(pathTestResources),
        [pathToGeneratorCommon]: mock.load(pathToGeneratorCommon),
        [pathRootNodeModules]: mock.load(pathRootNodeModules)
      });

      const options = createOptions({
        inputDir: pathTestService,
        outputDir: 'common',
        overwrite: true,
        prettierConfig: '/prettier/config',
        generateSdkMetadata: true,
        include: join(pathTestResources, '*.md')
      });
      // TODO the first call will go away once ts-morph is removed
      project = await generateProject(options);
      await generate(options);
    });

    afterAll(() => mock.restore());

    it('reads custom prettier configuration', () => {
      expect(prettierSpy).toHaveBeenCalledWith(expect.any(String), {
        parser: expect.any(String),
        printWidth: 66
      });
    });

    it('recommends to install odata packages', async () => {
      expect(getInstallODataErrorMessage(project!)).toMatchInlineSnapshot(
        '"Did you forget to install \\"@sap-cloud-sdk/odata-v2\\"?"'
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

  describe('edmx-to-csn', () => {
    const testGeneratorOptions = createOptions({
      inputDir: resolve(
        oDataServiceSpecs,
        'v2',
        'API_TEST_SRV',
        'API_TEST_SRV.edmx'
      ),
      outputDir: 'csn-test',
      generateCSN: true
    });

    it('should invoke csn', async () => {
      mock({
        'csn-test': {},
        [pathTestResources]: mock.load(pathTestResources)
      });

      jest.spyOn(csnGeneration, 'csn');
      await generateProject(testGeneratorOptions);
      expect(csnGeneration.csn).toHaveBeenCalled();
      mock.restore();
    });
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
});
