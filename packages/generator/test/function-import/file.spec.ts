/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { StructureKind } from 'ts-morph';
import { functionImportSourceFile } from '../../src/action-function-import/function-import';
import { foodService } from '../test-util/data-model';

describe('file', () => {
  it('functionImportSourceFile', () => {
    const actual = functionImportSourceFile(foodService);

    const imports = (actual.statements as any).filter(
      element => element.kind === StructureKind.ImportDeclaration
    );

    expect(imports.length).toBe(1);

    const variables = (actual.statements as any).filter(
      element => element.kind === StructureKind.VariableStatement
    );

    expect(variables.length).toBe(1);
  });
});
