import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { odataImportDeclaration } from '../imports';
import { VdmServiceMetadata } from '../vdm-types';

// eslint-disable-next-line valid-jsdoc
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
        'GetAllRequestBuilder',
        'GetByKeyRequestBuilder',
        'ODataBatchChangeSet',
        'ODataBatchRequestBuilder',
        'UpdateRequestBuilder'
      ],
      service.oDataVersion
    ),
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: '@sap-cloud-sdk/util',
      namedImports: ['variadicArgumentToArray']
    },
    {
      kind: StructureKind.ImportDeclaration,
      moduleSpecifier: './index',
      namedImports: getNamedImports(service)
    }
  ];
}

function getNamedImports(service: VdmServiceMetadata): string[] {
  return service.entities.map(e => e.className);
}
