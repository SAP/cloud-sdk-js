import { StructureKind } from 'ts-morph';
import { importDeclarations } from '../../src/request-builder';
import { breakfastEntity } from '../test-util/data-model';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = importDeclarations(breakfastEntity);
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/core',
        namedImports: ['Time', 'RequestBuilder', 'GetAllRequestBuilder', 'GetByKeyRequestBuilder', 'CreateRequestBuilder', 'UpdateRequestBuilder']
      },
      { kind: StructureKind.ImportDeclaration, namedImports: ['Breakfast'], moduleSpecifier: './Breakfast' }
    ]);
  });
});
