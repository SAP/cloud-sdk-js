import { StructureKind, TypeAliasDeclarationStructure } from 'ts-morph';
import { VdmServiceMetadata } from '../vdm-types';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
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
/**
 * @internal
 */
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
  return service.entities
    .map(
      e =>
        `CreateRequestBuilder<${e.className}> | UpdateRequestBuilder<${e.className}> | DeleteRequestBuilder<${e.className}>`
    )
    .join(' | ');
}

function getReadRequestType(service: VdmServiceMetadata): string {
  return Array.prototype
    .concat(
      service.entities.map(e => `GetAllRequestBuilder<${e.className}>`),
      service.entities.map(e => `GetByKeyRequestBuilder<${e.className}>`)
    )
    .join('|');
}
