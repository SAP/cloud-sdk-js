import { SourceFileStructure, StructureKind } from 'ts-morph';
import { VdmServiceMetadata } from '../vdm-types';
import { batchFunction, changesetFunction } from './function';
import { importBatchDeclarations } from './imports';
import { readRequestType, writeRequestType } from './type';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function batchSourceFile(
  service: VdmServiceMetadata
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importBatchDeclarations(service),
      batchFunction(service),
      changesetFunction(service),
      `export const default${service.className}Path = '${service.servicePath}';`,
      `const map = ${mappingInitializer(service)};`,
      readRequestType(service),
      writeRequestType(service)
    ]
  };
}

function mappingInitializer(service: VdmServiceMetadata): string {
  const mapBody = service.entities
    .map(e => `'${e.entitySetName}' : ${e.className}`)
    .join(', ');
  return `{${mapBody}}`;
}
