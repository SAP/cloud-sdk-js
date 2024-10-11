import { StructureKind } from 'ts-morph';
import { fieldTypeClass } from './field-type-class';
import { importDeclarations } from './imports';
import { complexTypeInterface } from './interface';
import { complexTypeNamespace } from './namespace';
import type { VdmComplexType } from '../vdm-types';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { SourceFileStructure } from 'ts-morph';

/**
 * @internal
 */
export function complexTypeSourceFile(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importDeclarations(complexType, oDataVersion),
      complexTypeInterface(complexType),
      fieldTypeClass(complexType),
      complexTypeNamespace(complexType)
    ]
  };
}
