import { ImportDeclarationStructure } from 'ts-morph';
import { caps, ODataVersion } from '@sap-cloud-sdk/util';
import {
  complexTypeImportDeclarations,
  coreImportDeclaration,
  corePropertyTypeImportNames,
  enumTypeImportDeclarations,
  externalImportDeclarations
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
    coreImportDeclaration(
      [
        ...corePropertyTypeImportNames(complexType.properties),
        'ComplexTypeField',
        'ConstructorOrField',
        `deserializeComplexType${versionInCaps}`,
        `Entity${versionInCaps}`,
        'fieldBuilder',
        'FieldBuilder',
        'FieldType',
        'FieldOptions',
        'PropertyMetadata'
      ].sort()
    )
  ];
}
