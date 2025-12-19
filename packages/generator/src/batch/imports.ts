import { StructureKind } from 'ts-morph';
import { unique } from '@sap-cloud-sdk/util';
import { odataImportDeclarationTsMorph } from '../imports';
import type { ImportDeclarationStructure } from 'ts-morph';
import type { VdmServiceMetadata } from '../vdm-types';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export function importBatchDeclarations(
  service: VdmServiceMetadata,
  options?: CreateFileOptions
): ImportDeclarationStructure[] {
  return [
    odataImportDeclarationTsMorph(
      [
        'CreateRequestBuilder',
        'DeleteRequestBuilder',
        'DeSerializers',
        'GetAllRequestBuilder',
        'GetByKeyRequestBuilder',
        'ODataBatchRequestBuilder',
        'UpdateRequestBuilder',
        ...(service.operations.length ? ['OperationRequestBuilder'] : []),
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
      moduleSpecifier: options?.generateESM ? './index.js' : './index',
      namedImports: getNamedImports(service)
    }
  ];
}

function getNamedImports(service: VdmServiceMetadata): string[] {
  const complexReturnTypesOfActionImports = service.operations
    .filter(
      ({ returnType }) => returnType.returnTypeCategory === 'complex-type'
    )
    .map(withComplex => withComplex.returnType.returnType);

  return unique([
    ...service.entities.map(e => e.className),
    ...service.operations.map(f => f.parametersTypeName),
    ...complexReturnTypesOfActionImports
  ]);
}
