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
    name: `Read${service.className}RequestBuilder<DeSerializersT extends DeSerializers>`,
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
    name: `Write${service.className}RequestBuilder<DeSerializersT extends DeSerializers>`,
    isExported: true,
    type: getWriteRequestType(service)
  };
}

function getWriteRequestType(service: VdmServiceMetadata): string {
  return service.entities
    .map(
      e =>
        `CreateRequestBuilder<${e.className}<DeSerializersT>, DeSerializersT> | UpdateRequestBuilder<${e.className}<DeSerializersT>, DeSerializersT> | DeleteRequestBuilder<${e.className}<DeSerializersT>, DeSerializersT>`
    )
    .join(' | ');
}

function getReadRequestType(service: VdmServiceMetadata): string {
  return Array.prototype
    .concat(
      service.entities.map(
        e =>
          `GetAllRequestBuilder<${e.className}<DeSerializersT>, DeSerializersT>`
      ),
      service.entities.map(
        e =>
          `GetByKeyRequestBuilder<${e.className}<DeSerializersT>, DeSerializersT>`
      )
    )
    .join('|');
}
