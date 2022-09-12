import { StructureKind } from 'ts-morph';
import { foodService } from '../../test/test-util/data-model';
import { importBatchDeclarations } from './imports';

describe('batch type imports', () => {
  it('importDeclarations for a batch type', () => {
    const actual = importBatchDeclarations(foodService);
    expect(actual).toEqual([
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/odata-v2',
        namedImports: [
          'CreateRequestBuilder',
          'DeleteRequestBuilder',
          'DeSerializers',
          'GetAllRequestBuilder',
          'GetByKeyRequestBuilder',
          'ODataBatchRequestBuilder',
          'UpdateRequestBuilder',
          'FunctionImportRequestBuilder',
          'ActionImportRequestBuilder',
          'BatchChangeSet'
        ]
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: '@sap-cloud-sdk/util',
        namedImports: ['transformVariadicArgumentToArray']
      },
      {
        kind: StructureKind.ImportDeclaration,
        moduleSpecifier: './index',
        namedImports: [
          'Breakfast',
          'Brunch',
          'funcGetReturn',
          'funcPostReturn',
          'actionImportReturn'
        ]
      }
    ]);
  });
});
