import { StructureKind } from 'ts-morph';
import { breakfastEntity } from '../../test/test-util/data-model';
import { importDeclarations } from './imports';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = importDeclarations(breakfastEntity, 'v2');
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: [
          'Time',
          'RequestBuilder',
          'GetAllRequestBuilderV2',
          'GetByKeyRequestBuilderV2',
          'CreateRequestBuilderV2',
          'UpdateRequestBuilderV2'
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        namedImports: ['Breakfast'],
        moduleSpecifier: './Breakfast'
      }
    ]);
  });
});
