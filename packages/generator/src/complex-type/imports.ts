import { ImportDeclarationStructure } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import {
  complexTypeImportDeclarations,
  odataImportDeclaration,
  propertyFieldTypeImportNames,
  propertyTypeImportNames,
  enumTypeImportDeclarations,
  externalImportDeclarations,
  odataCommonImportDeclaration
} from '../imports';
import { VdmComplexType } from '../vdm-types';
/* eslint-disable valid-jsdoc */

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
    odataImportDeclaration(['DefaultDeSerializers', 'DeSerializers', 'Entity'], oDataVersion),
    odataCommonImportDeclaration(
      [
        'ComplexTypeField',
        'ConstructorOrField',
        'DeserializedType',
        'FieldBuilder',
        'FieldOptions',
        'PropertyMetadata'
      ].sort()
    )
  ];
}
