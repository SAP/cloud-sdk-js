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
          'GetAllRequestBuilder',
          'GetByKeyRequestBuilder',
          'CreateRequestBuilder',
          'UpdateRequestBuilder'
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
