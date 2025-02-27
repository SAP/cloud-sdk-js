import {
  complexTypeImportDeclarations,
  odataImportDeclarationTsMorph,
  enumTypeImportDeclarations
} from '../imports';
import type { ImportDeclarationStructure } from 'ts-morph';
import type { ODataVersion } from '@sap-cloud-sdk/util';
import type { VdmComplexType } from '../vdm-types';

/**
 * @internal
 */
export function importDeclarations(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  return [
    ...complexTypeImportDeclarations(complexType.properties),
    ...enumTypeImportDeclarations(complexType.properties),
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
