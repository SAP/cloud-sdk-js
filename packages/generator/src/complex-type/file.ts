import { SourceFileStructure, StructureKind } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import { VdmComplexType } from '../vdm-types';
import { fieldTypeClass } from './field-type-class';
import { importDeclarations } from './imports';
import { complexTypeInterface } from './interface';
import { complexTypeNamespace } from './namespace';

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
