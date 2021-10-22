import { ImportDeclarationStructure } from 'ts-morph';
import { caps, ODataVersion } from '@sap-cloud-sdk/util';
import {
    complexTypeImportDeclarations,
    odataImportDeclaration,
    corePropertyFieldTypeImportNames,
    corePropertyTypeImportNames,
    enumTypeImportDeclarations,
    externalImportDeclarations, odataCommonImportDeclaration
} from '../imports';
import { VdmComplexType } from '../vdm-types';

export function importDeclarations(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  const versionInCaps = caps(oDataVersion);
  return [
    ...externalImportDeclarations(complexType.properties),
    ...complexTypeImportDeclarations(complexType.properties),
    ...enumTypeImportDeclarations(complexType.properties),
      odataImportDeclaration([ 'deserializeComplexType',
          'Entity'],oDataVersion),
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
