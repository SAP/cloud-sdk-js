/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { SourceFile, FunctionDeclaration } from 'ts-morph';
import {
  checkStaticProperties,
  getFunctionImportDeclarations,
  getGeneratedFiles
} from '../../test-util/generator';

describe('generator', () => {
  let files: SourceFile[];
  describe('v4', () => {
    beforeAll(async () => {
      files = await getGeneratedFiles('v4');
    });

    it('generates expected number of files', () => {
      expect(files.length).toBe(33);
    });

    it('generates TestEntity.ts file', () => {
      const testEntityFile = files.find(
        file => file.getBaseName() === 'TestEntity.ts'
      );

      expect(testEntityFile).toBeDefined();
      expect(testEntityFile!.getClasses().length).toBe(1);
      expect(testEntityFile!.getInterfaces().length).toBe(2);
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
        '@sap-cloud-sdk/core',
        './TestEntityMultiLink',
        './TestEntitySingleLink'
      ]);

      const entityClass = testEntityFile!.getClass('TestEntity');
      expect(entityClass!.getProperties().length).toBe(31);

      checkStaticProperties(entityClass!);

      const entityNamespace = testEntityFile!.getNamespace('TestEntity');
      expect(entityNamespace!.getVariableDeclarations().length).toBe(32);
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

    it('generates action-imports.ts file', () => {
      const actionImports = getActionImportDeclarations(files);
      expect(actionImports.length).toBe(3);
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
