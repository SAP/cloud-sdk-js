import { StructureKind } from 'ts-morph';
import { parametersInterface } from '../operations';
import { entityClass } from './class';
import { entityImportDeclarations, otherEntityImports } from './imports';
import { entityTypeInterface } from './interface';
import type { VdmEntity, VdmServiceMetadata } from '../vdm-types';
import type { SourceFileStructure } from 'ts-morph';

/**
 * @internal
 */
export function entitySourceFile(
  entity: VdmEntity,
  service: VdmServiceMetadata
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...entityImportDeclarations(entity, service, service.oDataVersion),
      ...otherEntityImports(entity, service),
      entityClass(entity, service),
      entityTypeInterface(entity, service),
      ...entity.operations.map(operation => parametersInterface(operation))
    ]
  };
}
