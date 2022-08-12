import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { unique } from '@sap-cloud-sdk/util';
import { odataImportDeclaration } from '../imports';
import { VdmReturnTypeCategory, VdmServiceMetadata } from '../vdm-types';

/**
 * @internal
 */
export function importBatchDeclarations(
  service: VdmServiceMetadata
): ImportDeclarationStructure[] {
  return [
    odataImportDeclaration(
      [
        'CreateRequestBuilder',
        'DeleteRequestBuilder',
        'DeSerializers',
        'GetAllRequestBuilder',
        'GetByKeyRequestBuilder',
        'ODataBatchRequestBuilder',
        'UpdateRequestBuilder',
        ...(service.functionImports.length > 0
          ? ['FunctionImportRequestBuilder']
          : []),
        'BatchChangeSet'
      ],
      service.oDataVersion
    ),
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@sap-cloud-sdk/util',
      namedImports: ['transformVariadicArgumentToArray']
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './index',
      namedImports: getNamedImports(service)
    }
  ];
}

function getNamedImports(service: VdmServiceMetadata): string[] {
  const complexTypes = service.functionImports
    .filter(
      f =>
        f.returnType.returnTypeCategory === VdmReturnTypeCategory.COMPLEX_TYPE
    )
    .map(f => f.returnType.returnType);
  return unique([
    ...service.entities.map(e => e.className),
    ...service.functionImports.map(f => f.parametersTypeName),
    ...complexTypes
  ]);
}
