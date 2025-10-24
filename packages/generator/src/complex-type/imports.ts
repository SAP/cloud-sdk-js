import {
  complexTypeImportDeclarations,
  odataImportDeclarationTsMorph,
  enumTypeImportDeclarations
} from '../imports';
import type { ImportDeclarationStructure } from 'ts-morph';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { VdmComplexType } from '../vdm-types';
import type { CreateFileOptions } from '@sap-cloud-sdk/generator-common/internal';

/**
 * @internal
 */
export function importDeclarations(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion,
  options?: CreateFileOptions
): ImportDeclarationStructure[] {
  return [
    ...complexTypeImportDeclarations(complexType.properties, options),
    ...enumTypeImportDeclarations(complexType.properties, options),
    odataImportDeclarationTsMorph(
      [
        'DefaultDeSerializers',
        'DeSerializers',
        'Entity',
        'ComplexTypeField',
        'ConstructorOrField',
        'DeserializedType',
        'EdmTypeField',
        'FieldBuilder',
        'FieldOptions',
        'OrderableEdmTypeField',
        'PropertyMetadata',
        ...(oDataVersion === 'v4' ? ['CollectionField', 'EnumField'] : [])
      ].sort(),
      oDataVersion
    )
  ];
}
