import { SourceFileStructure, StructureKind } from 'ts-morph';
import { VdmEntity, VdmServiceMetadata } from '../vdm-types';
import { entityClass } from './class';
import { importDeclarations, otherEntityImports } from './imports';
import { entityTypeInterface } from './interface';
import { entityNamespace, fieldBuilderInitializer } from './namespace';

export function entitySourceFile(
  entity: VdmEntity,
  service: VdmServiceMetadata
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importDeclarations(entity, service.oDataVersion),
      entityClass(entity, service),
      ...otherEntityImports(entity, service),
      entityTypeInterface(entity, service),
      fieldBuilderInitializer(entity),
      entityNamespace(entity, service)
    ]
  };
}
