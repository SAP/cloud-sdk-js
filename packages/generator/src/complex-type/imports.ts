/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ImportDeclarationStructure } from 'ts-morph';
import { ODataVersion } from '@sap-cloud-sdk/util';
import {
  complexTypeImportDeclarations,
  coreImportDeclaration,
  corePropertyFieldTypeImportNames,
  corePropertyTypeImportNames,
  enumTypeImportDeclarations,
  externalImportDeclarations
} from '../imports';
import { VdmComplexType } from '../vdm-types';

export function importDeclarations(
  complexType: VdmComplexType,
  oDataVersion: ODataVersion
): ImportDeclarationStructure[] {
  return [
    ...externalImportDeclarations(complexType.properties),
    ...complexTypeImportDeclarations(complexType.properties),
    ...enumTypeImportDeclarations(complexType.properties),
    coreImportDeclaration(
      [
        ...corePropertyTypeImportNames(complexType.properties),
        ...corePropertyFieldTypeImportNames(complexType.properties),
        'ComplexTypeField',
        'ConstructorOrField',
        'deserializeComplexType',
        'Entity',
        'FieldType',
        'PropertyMetadata'
      ].sort(),
      oDataVersion
    )
  ];
}
