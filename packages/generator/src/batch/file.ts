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
      readRequestType(service),
      writeRequestType(service)
    ]
  };
}
