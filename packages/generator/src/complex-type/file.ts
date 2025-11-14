import { StructureKind } from 'ts-morph';
import { fieldTypeClass } from './field-type-class';
import { importDeclarations } from './imports';
import { complexTypeInterface } from './interface';
import { complexTypeNamespace } from './namespace';
import type { VdmComplexType } from '../vdm-types';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { SourceFileStructure } from 'ts-morph';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export function complexTypeSourceFile(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion,
  options?: CreateFileOptions
): SourceFileStructure {
  return {
    kind: StructureKind.SourceFile,
    statements: [
      ...importDeclarations(complexType, oDataVersion, options),
      complexTypeInterface(complexType),
      fieldTypeClass(complexType),
      complexTypeNamespace(complexType)
    ]
  };
}
