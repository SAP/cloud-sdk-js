import { SourceFileStructure, StructureKind } from 'ts-morph';
import { VdmEntity, VdmServiceMetadata } from '../vdm-types';
import { entityClass } from './class';
import { entityImportDeclarations, otherEntityImports } from './imports';
import { entityTypeInterface } from './interface';
import { entityNamespace } from './namespace';
/* eslint-disable valid-jsdoc */

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
      ...entityImportDeclarations(entity, service.oDataVersion),
      entityClass(entity, service),
      ...otherEntityImports(entity, service),
      entityTypeInterface(entity, service),
      entityNamespace(entity, service)
    ]
  };
}
