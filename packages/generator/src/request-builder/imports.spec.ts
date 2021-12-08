import { StructureKind } from 'ts-morph';
import { breakfastEntity } from '../../test/test-util/data-model';
import { requestBuilderImportDeclarations } from './imports';

describe('imports', () => {
  it('importDeclarations', () => {
    const actual = requestBuilderImportDeclarations(breakfastEntity, 'v2');
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/odata-common/internal',
        namedImports: ['DeserializedType', 'Time']
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/odata-v2',
        namedImports: [
          'DefaultDeSerializers',
          'DeSerializers',
          'GetAllRequestBuilder',
          'GetByKeyRequestBuilder',
          'CreateRequestBuilder',
          'UpdateRequestBuilder'
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/odata-v2/internal',
        namedImports: [
          'RequestBuilder'
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
