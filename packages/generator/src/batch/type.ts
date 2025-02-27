import { StructureKind } from 'ts-morph';
import { operationReturnType } from '../operations';
import type { TypeAliasDeclarationStructure } from 'ts-morph';
import type { VdmServiceMetadata } from '../vdm-types';

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
  const createUpdateDeleteBuilderTypes = service.entities.map(
    e =>
      `CreateRequestBuilder<${e.className}<DeSerializersT>, DeSerializersT> | UpdateRequestBuilder<${e.className}<DeSerializersT>, DeSerializersT> | DeleteRequestBuilder<${e.className}<DeSerializersT>, DeSerializersT>`
  );
  const operationsReturnTypes = service.operations
    .filter(fn => fn.httpMethod.toLowerCase() !== 'get')
    .map(fn => operationReturnType(fn));
  return [...createUpdateDeleteBuilderTypes, ...operationsReturnTypes].join(
    ' | '
  );
}

function getReadRequestType(service: VdmServiceMetadata): string {
  const getAllBuilderTypes = service.entities.map(
    e => `GetAllRequestBuilder<${e.className}<DeSerializersT>, DeSerializersT>`
  );

  const getByKeyBuilderTypes = service.entities.map(
    e =>
      `GetByKeyRequestBuilder<${e.className}<DeSerializersT>, DeSerializersT>`
  );
  const functionImportsReturnTypes = service.operations
    .filter(fn => fn.httpMethod.toLowerCase() === 'get')
    .map(fn => operationReturnType(fn));

  return [
    ...getAllBuilderTypes,
    ...getByKeyBuilderTypes,
    ...functionImportsReturnTypes
  ].join(' | ');
}
