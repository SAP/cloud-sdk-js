import { StructureKind } from 'ts-morph';
import { parametersInterface } from '../operations';
import { entityClass } from './class';
import { entityImportDeclarations, otherEntityImports } from './imports';
import { entityTypeInterface } from './interface';
import type { VdmEntity, VdmServiceMetadata } from '../vdm-types';
import type { SourceFileStructure } from 'ts-morph';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export function entitySourceFile(
  entity: VdmEntity,
  service: VdmServiceMetadata,
  options?: CreateFileOptions
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...entityImportDeclarations(entity, service, service.oDataVersion, options),
      ...otherEntityImports(entity, service, options),
      entityClass(entity, service),
      entityTypeInterface(entity, service),
      ...entity.operations.map(operation => parametersInterface(operation))
    ]
  };
}
