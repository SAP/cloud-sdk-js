/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { ImportDeclarationStructure } from 'ts-morph';
import {
  complexTypeImportDeclarations,
  coreImportDeclaration,
  corePropertyFieldTypeImportNames,
  corePropertyTypeImportNames,
  externalImportDeclarations
} from '../imports';
import { VdmComplexType, VdmProperty } from '../vdm-types';
import { hasEdmTypeProperty } from './util';

export function importDeclarations(complexType: VdmComplexType): ImportDeclarationStructure[] {
  return [
    ...externalImportDeclarations(complexType.properties),
    ...complexTypeImportDeclarations(complexType.properties),
    coreImportDeclaration(
      [
        ...corePropertyTypeImportNames(complexType.properties),
        ...corePropertyFieldTypeImportNames(complexType.properties),
        ...edmTypeImportNames(complexType.properties),
        'ComplexTypeField',
        'createComplexType',
        'Entity'
      ].sort()
    )
  ];
}

function edmTypeImportNames(properties: VdmProperty[]): string[] {
  return hasEdmTypeProperty(properties) ? ['edmToTs', 'FieldType'] : [];
}
