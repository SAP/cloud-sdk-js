/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ODataVersion } from '@sap-cloud-sdk/util';
import { SourceFile, ClassDeclaration, FunctionDeclaration } from 'ts-morph';
import { generateProject } from '../src';
import { createOptions } from './test-util/create-generator-options';

describe('generator', () => {
  let files: SourceFile[];

  describe('v2', () => {
    beforeAll(async () => {
      files = await getGeneratedFiles('v2');
    });

    it('generates expected number of files', () => {
      expect(files.length).toBe(28);
    });

    it('generates TestEntity.ts file', () => {
      const testEntityFile = files.find(
        file => file.getBaseName() === 'TestEntity.ts'
      );

      expect(testEntityFile).toBeDefined();
      expect(testEntityFile!.getClasses().length).toBe(1);
      expect(testEntityFile!.getInterfaces().length).toBe(2);
      expect(testEntityFile!.getNamespaces().length).toBe(1);

      const entityClass = testEntityFile!.getClass('TestEntity');
      expect(entityClass!.getProperties().length).toBe(24);

      checkStaticProperties(entityClass!);

      const entityNamespace = testEntityFile!.getNamespace('TestEntity');
      expect(entityNamespace!.getVariableDeclarations().length).toBe(25);
    });

    it('generates function-imports.ts file', () => {
      const functionImports = getFunctionImportDeclarations(files);
      expect(functionImports.length).toBe(12);
    });
  });

  describe('v4', () => {
    beforeAll(async () => {
      files = await getGeneratedFiles('v4');
    });

    it('generates expected number of files', () => {
      expect(files.length).toBe(29);
    });

    it('generates TestEntity.ts file', () => {
      const testEntityFile = files.find(
        file => file.getBaseName() === 'TestEntity.ts'
      );

      expect(testEntityFile).toBeDefined();
      expect(testEntityFile!.getClasses().length).toBe(1);
      expect(testEntityFile!.getInterfaces().length).toBe(2);
      expect(testEntityFile!.getNamespaces().length).toBe(1);

      const entityClass = testEntityFile!.getClass('TestEntity');
      expect(entityClass!.getProperties().length).toBe(26);

      checkStaticProperties(entityClass!);

      const entityNamespace = testEntityFile!.getNamespace('TestEntity');
      expect(entityNamespace!.getVariableDeclarations().length).toBe(27);
    });

    it('generates function-imports.ts file', () => {
      const functionImports = getFunctionImportDeclarations(files);
      expect(functionImports.length).toBe(8);
      const functionImportNames = functionImports.map(fi => fi.getName());
      expect(functionImportNames).toEqual(
        expect.arrayContaining(['testFunctionImportWithDifferentName'])
      );
      expect(functionImportNames).toEqual(
        expect.not.arrayContaining(['testFunctionImportNoReturnType'])
      );
    });
  });
});

function checkStaticProperties(entityClass: ClassDeclaration): void {
  const properties = entityClass.getProperties();
  const staticProperties = [
    properties.find(p => p.getName() === '_entityName')!,
    properties.find(p => p.getName() === '_serviceName')!,
    properties.find(p => p.getName() === '_defaultServicePath')!
  ];

  expect(staticProperties.map(p => p.isStatic())).toEqual([true, true, true]);

  expect(staticProperties.map(p => p.getInitializer()!.getText())).toEqual([
    "'A_TestEntity'",
    "'API_TEST_SRV'",
    "'/sap/opu/odata/sap/API_TEST_SRV'"
  ]);
}

async function getGeneratedFiles(
  oDataVersion: ODataVersion
): Promise<SourceFile[]> {
  const project = await generateProject(
    createOptions({
      inputDir: `../../test-resources/service-specs/${oDataVersion}/API_TEST_SRV`,
      useSwagger: false
    })
  );
  return project!.getSourceFiles();
}

function getFunctionImportDeclarations(
  files: SourceFile[]
): FunctionDeclaration[] {
  const functionImportsFile = files.find(
    file => file.getBaseName() === 'function-imports.ts'
  );

  return functionImportsFile!.getFunctions();
}
