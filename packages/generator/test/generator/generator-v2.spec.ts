/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { SourceFile } from 'ts-morph';
import {
  checkStaticProperties,
  getFunctionImportDeclarations,
  getGeneratedFiles
} from '../test-util/generator';

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
      expect(entityClass!.getProperties().length).toBe(25);

      checkStaticProperties(entityClass!);

      const entityNamespace = testEntityFile!.getNamespace('TestEntity');
      expect(entityNamespace!.getVariableDeclarations().length).toBe(26);
    });

    it('generates function-imports.ts file', () => {
      const functionImports = getFunctionImportDeclarations(files);
      expect(functionImports.length).toBe(13);
    });
  });
});
