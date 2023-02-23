import { SourceFileStructure, StructureKind } from 'ts-morph';
import { VdmServiceMetadata } from '../vdm-types';
import { batchFunction, changesetFunction } from './function';
import { importBatchDeclarations } from './imports';
import { readRequestType, writeRequestType } from './type';

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
      `export const default${service.className}Path = '${service.serviceOptions.basePath}';`,
      readRequestType(service),
      writeRequestType(service)
    ]
  } as SourceFileStructure;
}
