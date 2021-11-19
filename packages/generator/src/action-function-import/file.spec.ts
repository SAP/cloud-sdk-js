import { StructureKind } from 'ts-morph';
import { foodService } from '../../test/test-util/data-model';
import { functionImportSourceFile } from './file';

describe('file', () => {
  it('functionImportSourceFile', () => {
    const actual = functionImportSourceFile(foodService);

    const imports = (actual.statements as any).filter(
      element => element.kind === StructureKind.ImportDeclaration
    );

    expect(imports.map(i => i.moduleSpecifier)).toIncludeSameMembers([
      '@sap-cloud-sdk/odata-v2',
      '@sap-cloud-sdk/odata-common/internal'
    ]);

    const variables = (actual.statements as any).filter(
      element => element.kind === StructureKind.VariableStatement
    );

    expect(variables.length).toBe(1);
  });
});
