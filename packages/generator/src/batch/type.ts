import { StructureKind, TypeAliasDeclarationStructure } from 'ts-morph';
import { caps } from '@sap-cloud-sdk/util';
import { VdmServiceMetadata } from '../vdm-types';

export function readRequestType(
  service: VdmServiceMetadata
): TypeAliasDeclarationStructure {
  return {
    kind: StructureKind.TypeAlias,
    name: `Read${service.className}RequestBuilder`,
    isExported: true,
    type: getReadRequestType(service)
  };
}

export function writeRequestType(
  service: VdmServiceMetadata
): TypeAliasDeclarationStructure {
  return {
    kind: StructureKind.TypeAlias,
    name: `Write${service.className}RequestBuilder`,
    isExported: true,
    type: getWriteRequestType(service)
  };
}

function getWriteRequestType(service: VdmServiceMetadata): string {
  const versionInCaps = caps(service.oDataVersion);
  return service.entities
    .map(
      e =>
        `CreateRequestBuilder${versionInCaps}<${e.className}> | UpdateRequestBuilder${versionInCaps}<${e.className}> | DeleteRequestBuilder${versionInCaps}<${e.className}>`
    )
    .join(' | ');
}

function getReadRequestType(service: VdmServiceMetadata): string {
  const versionInCaps = caps(service.oDataVersion);
  return Array.prototype
    .concat(
      service.entities.map(
        e => `GetAllRequestBuilder${versionInCaps}<${e.className}>`
      ),
      service.entities.map(
        e => `GetByKeyRequestBuilder${versionInCaps}<${e.className}>`
      )
    )
    .join('|');
}
