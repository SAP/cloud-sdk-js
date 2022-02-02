import { join, resolve } from 'path';
import { promises } from 'fs';
import nock = require('nock');
import { FunctionDeclaration, SourceFile } from 'ts-morph';
import mock from 'mock-fs';
import { createOptions } from '../test/test-util/create-generator-options';
import {
  checkStaticProperties,
  getFunctionImportDeclarations,
  getGeneratedFiles
} from '../test/test-util/generator';
import { oDataServiceSpecs } from '../../../test-resources/odata-service-specs';
import {
  generate,
  generateProject,
  getInstallODataErrorMessage
} from './generator';
import { GeneratorOptions } from './generator-options';
import * as csnGeneration from './service/csn';

const pathTestResources = resolve(__dirname, '../../../test-resources');
const pathTestService = resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV');
const outPutPath = 'mockOutput';

describe('generator', () => {
  describe('common mock-fs', () => {
    beforeEach(() => {
      mock({
        [outPutPath]: {},
        [pathTestResources]: mock.load(pathTestResources)
      });
    });

    afterEach(() => {
      mock.restore();
    });
    it('copies the additional files matching the glob.', async () => {
      await generate(
        createOptions({
          inputDir: pathTestService,
          outputDir: outPutPath,
          forceOverwrite: true,
          additionalFiles: '../../../*.md'
        })
      );

      const sourceFiles = await promises.readdir(
        join(outPutPath, 'test-service')
      );

      expect(
        sourceFiles.find(file => file === 'some-test-markdown.md')
      ).toBeDefined();
      expect(sourceFiles.find(file => file === 'CHANGELOG.md')).toBeDefined();
    });
  });

  describe('common ts-morph', () => {
    it('generates the api hub metadata and writes to the input folder', async () => {
      nock('http://registry.npmjs.org/').head(/.*/).reply(404);
      const project = await generateProject(
        createOptions({
          inputDir: pathTestService,
          forceOverwrite: true,
          generateSdkMetadata: true
        })
      );
      const sourceFiles = project!.project!.getSourceFiles();
      const clientFile = sourceFiles.find(
        file => file.getBaseName() === 'API_TEST_SRV_CLIENT_JS.json'
      );
      const headerFile = sourceFiles.find(
        file => file.getBaseName() === 'API_TEST_SRV_HEADER.json'
      );

      [clientFile, headerFile].forEach(file => {
        expect(file).toBeDefined();
        expect(file!.getDirectoryPath()).toMatch(
          /test-resources\/odata-service-specs\/v2\/API_TEST_SRV\/sdk-metadata/
        );
      });
    }, 10000);
  });
  describe('edmx-to-csn', () => {
    const testGeneratorOptions: GeneratorOptions = createOptions({
      inputDir: resolve(
        oDataServiceSpecs,
        'v2',
        'API_TEST_SRV',
        'API_TEST_SRV.edmx'
      ),
      outputDir: 'foo',
      generateCSN: true
    });

    it('should invoke csn', async () => {
      jest.spyOn(csnGeneration, 'csn');
      await generateProject(testGeneratorOptions);
      expect(csnGeneration.csn).toHaveBeenCalled();
    });
  });

  describe('v2', () => {
    let files: SourceFile[];
    beforeAll(async () => {
      files = await getGeneratedFiles('v2');
    });

    it('generates expected number of files', () => {
      expect(files.length).toBe(36);
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
      const functionImports = getFunctionImportDeclarations(files);
      expect(functionImports.length).toBe(15);
    });
  });

  describe('v4', () => {
    let files: SourceFile[];
    beforeAll(async () => {
      files = await getGeneratedFiles('v4');
    });

    it('generates expected number of files', () => {
      expect(files.length).toBe(41);
    });

    it('generates TestEntity.ts file', () => {
      const testEntityFile = files.find(
        file => file.getBaseName() === 'TestEntity.ts'
      );

      expect(testEntityFile).toBeDefined();
      expect(testEntityFile!.getClasses().length).toBe(1);
      expect(testEntityFile!.getInterfaces().length).toBe(1);
      const imports = testEntityFile!
        .getImportStringLiterals()
        .map(stringLiteral => stringLiteral.getLiteralValue());
      expect(imports).toEqual([
        '@sap-cloud-sdk/odata-v4',
        './TestComplexType',
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
      const functionImports = getFunctionImportDeclarations(files);
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
      const actionImports = getActionImportDeclarations(files);
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

  it('recommends to install odata packages', async () => {
    const project = await generateProject(
      createOptions({
        inputDir: pathTestService,
        outputDir: outPutPath,
        forceOverwrite: true,
        generateJs: true,
        additionalFiles: '../../../*.md'
      })
    );

    expect(getInstallODataErrorMessage(project!)).toMatchInlineSnapshot(
      `"Did you forget to install \\"@sap-cloud-sdk/odata-v2\\"?"`
    );
  });
});

function getActionImportDeclarations(
  files: SourceFile[]
): FunctionDeclaration[] {
  const actionImportFile = files.find(
    file => file.getBaseName() === 'action-imports.ts'
  );

  return actionImportFile!.getFunctions();
}
