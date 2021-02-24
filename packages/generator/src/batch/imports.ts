import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { caps } from '@sap-cloud-sdk/util';
import { coreImportDeclaration } from '../imports';
import { VdmServiceMetadata } from '../vdm-types';

export function importBatchDeclarations(
  service: VdmServiceMetadata
): ImportDeclarationStructure[] {
  const versionInCaps = caps(service.oDataVersion);
  return [
    coreImportDeclaration([
      `CreateRequestBuilder${versionInCaps}`,
      `DeleteRequestBuilder${versionInCaps}`,
      `GetAllRequestBuilder${versionInCaps}`,
      `GetByKeyRequestBuilder${versionInCaps}`,
      `ODataBatchChangeSet${versionInCaps}`,
      `ODataBatchRequestBuilder${versionInCaps}`,
      `UpdateRequestBuilder${versionInCaps}`
    ]),
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
