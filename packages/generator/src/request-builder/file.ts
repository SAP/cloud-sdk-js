import { SourceFileStructure, StructureKind } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import { VdmEntity } from '../vdm-types';
import { requestBuilderClass } from './class';
import { importDeclarations } from './imports';

export function requestBuilderSourceFile(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importDeclarations(entity, oDataVersion),
      requestBuilderClass(entity)
    ]
  };
}
