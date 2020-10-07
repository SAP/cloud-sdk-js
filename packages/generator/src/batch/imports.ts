import { ImportDeclarationStructure, StructureKind } from 'ts-morph';
import { caps } from '@sap-cloud-sdk/util';
import { coreImportDeclaration } from '../imports';
import { VdmServiceMetadata } from '../vdm-types';

export function importBatchDeclarations(
  service: VdmServiceMetadata
): ImportDeclarationStructure[] {
  const versionInCaps = caps(service.oDataVersion);
  return [
    coreImportDeclaration(
      [
        `CreateRequestBuilder${versionInCaps}`,
        `DeleteRequestBuilder${versionInCaps}`,
        `GetAllRequestBuilder${versionInCaps}`,
        `GetByKeyRequestBuilder${versionInCaps}`,
        'BatchChangeSet',
        'BatchRequestBuilder',
        `UpdateRequestBuilder${versionInCaps}`
      ],
      service.oDataVersion
    ),
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
