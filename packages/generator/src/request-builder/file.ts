import { SourceFileStructure, StructureKind } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import { VdmEntity } from '../vdm-types';
import { requestBuilderClass } from './class';
import { requestBuilderImportDeclarations } from './imports';

// eslint-disable-next-line valid-jsdoc
/**
 * @internal
 */
export function requestBuilderSourceFile(
  entity: VdmEntity,
  oDataVersion: ODataVersion
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...requestBuilderImportDeclarations(entity, oDataVersion),
      requestBuilderClass(entity)
    ]
  };
}
