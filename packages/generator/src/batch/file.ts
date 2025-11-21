import { StructureKind } from 'ts-morph';
import { batchFunction, changesetFunction } from './function';
import { importBatchDeclarations } from './imports';
import { readRequestType, writeRequestType } from './type';
import type { VdmServiceMetadata } from '../vdm-types';
import type { SourceFileStructure } from 'ts-morph';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export function batchSourceFile(
  service: VdmServiceMetadata,
  options?: CreateFileOptions
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importBatchDeclarations(service, options),
      batchFunction(service),
      changesetFunction(service),
      `export const default${service.className}Path = '${service.serviceOptions.basePath}';`,
      readRequestType(service),
      writeRequestType(service)
    ]
  } as SourceFileStructure;
}
