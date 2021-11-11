import { ImportDeclarationStructure } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import {
  complexTypeImportDeclarations,
  odataImportDeclaration,
  corePropertyFieldTypeImportNames,
  corePropertyTypeImportNames,
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
    ...externalImportDeclarations(complexType.properties),
    ...complexTypeImportDeclarations(complexType.properties),
    ...enumTypeImportDeclarations(complexType.properties),
    odataImportDeclaration(['deserializeComplexType', 'Entity'], oDataVersion),
    odataCommonImportDeclaration(
      [
        ...corePropertyTypeImportNames(complexType.properties),
        ...corePropertyFieldTypeImportNames(complexType.properties),
        'ComplexTypeField',
        'ConstructorOrField',

        'FieldBuilder',
        'FieldType',
        'FieldOptions',
        'PropertyMetadata'
      ].sort()
    )
  ];
}
