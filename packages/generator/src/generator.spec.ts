import { resolve } from 'path';
import { FunctionDeclaration, SourceFile } from 'ts-morph';
import { createOptions } from '../test/test-util/create-generator-options';
import {
  checkStaticProperties,
  getFunctionImportDeclarations,
  getGeneratedFiles
} from '../test/test-util/generator';
import { oDataServiceSpecs } from '../../../test-resources/odata-service-specs';
import { generateProject } from './generator';
import { GeneratorOptions } from './generator-options';
import * as csnGeneration from './service/csn';

describe('generator', () => {
  describe('common', () => {
    it('copies the additional files matching the glob.', async () => {
      const project = await generateProject(
        createOptions({
          inputDir: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV'),
          forceOverwrite: true,
          additionalFiles: '../../test-resources/*.md'
        })
      );

      const sourceFiles = project!.getSourceFiles();
      expect(
        sourceFiles.find(file => file.getBaseName() === 'some-test-markdown.md')
      ).toBeDefined();
      expect(
        sourceFiles.find(file => file.getBaseName() === 'CHANGELOG.md')
      ).toBeDefined();
    });

    it('generates the api hub metadata and writes to the input folder', async () => {
      const project = await generateProject(
        createOptions({
          inputDir: resolve(oDataServiceSpecs, 'v2', 'API_TEST_SRV'),
          forceOverwrite: true,
          generateSdkMetadata: true
        })
      );
      const sourceFiles = project!.getSourceFiles();
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
    });
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
      expect(testEntityFile!.getNamespaces().length).toBe(1);

      const entityClass = testEntityFile!.getClass('TestEntity');
      expect(entityClass!.getProperties().length).toBe(24);

      checkStaticProperties(entityClass!);

      const entityNamespace = testEntityFile!.getNamespace('TestEntity');
      expect(entityNamespace!.getVariableDeclarations().length).toBe(26);
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
      expect(files.length).toBe(38);
    });

    it('generates TestEntity.ts file', () => {
      const testEntityFile = files.find(
        file => file.getBaseName() === 'TestEntity.ts'
      );

      expect(testEntityFile).toBeDefined();
      expect(testEntityFile!.getClasses().length).toBe(1);
      expect(testEntityFile!.getInterfaces().length).toBe(1);
      expect(testEntityFile!.getNamespaces().length).toBe(1);
      const imports = testEntityFile!
        .getImportStringLiterals()
        .map(stringLiteral => stringLiteral.getLiteralValue());
      expect(imports).toEqual([
        './TestEntityRequestBuilder',
        'moment',
        'bignumber.js',
        './TestComplexType',
        './TestEnumType',
        './TestEnumTypeWithOneMember',
        '@sap-cloud-sdk/core',
        './TestEntityMultiLink',
        './TestEntitySingleLink'
      ]);

      const entityClass = testEntityFile!.getClass('TestEntity');
      expect(entityClass!.getProperties().length).toBe(31);

      checkStaticProperties(entityClass!);

      const entityNamespace = testEntityFile!.getNamespace('TestEntity');
      expect(entityNamespace!.getVariableDeclarations().length).toBe(33);
    });

    it('generates function-imports.ts file', () => {
      const functionImports = getFunctionImportDeclarations(files);
      expect(functionImports.length).toBe(10);
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
      expect(actionImports.length).toBe(6);
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

function getActionImportDeclarations(
  files: SourceFile[]
): FunctionDeclaration[] {
  const actionImportFile = files.find(
    file => file.getBaseName() === 'action-imports.ts'
  );

  return actionImportFile!.getFunctions();
}
