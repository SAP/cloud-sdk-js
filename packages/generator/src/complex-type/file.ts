import { SourceFileStructure, StructureKind } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import { VdmComplexType } from '../vdm-types';
import { builderFunction } from './builder-function';
import { fieldTypeClass } from './field-type-class';
import { importDeclarations } from './imports';
import { complexTypeInterface } from './interface';
import { complexTypeNamespace } from './namespace';

// eslint-disable-next-line valid-jsdoc
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
      builderFunction(complexType),
      fieldTypeClass(complexType),
      complexTypeNamespace(complexType)
    ]
  };
}
