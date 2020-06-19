/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  FunctionDeclarationStructure,
  NamespaceDeclarationStructure,
  StructureKind
} from 'ts-morph';
import { unique } from '@sap-cloud-sdk/util';
import { VdmComplexType, VdmProperty } from '../vdm-types';

export function complexTypeNamespace(
  complexType: VdmComplexType
): NamespaceDeclarationStructure {
  return {
    kind: StructureKind.Namespace,
    name: complexType.typeName,
    isExported: true,
    statements: [factoryFunction(complexType)]
  };
}

function factoryFunction(
  complexType: VdmComplexType
): FunctionDeclarationStructure {
  return {
    kind: StructureKind.Function,
    name: 'build',
    returnType: complexType.typeName,
    parameters: [{ name: 'json', type: getJsonType(complexType) }],
    statements:
      'return createComplexType(json, ' + getConverter(complexType) + ');',
    isExported: true
  };
}

function getJsonType(complexType: VdmComplexType): string {
  const unionOfAllTypes = [
    'FieldType',
    ...unique(
      complexType.properties
        .filter(prop => prop.isComplex)
        .map(prop => prop.jsType)
    ).sort()
  ].join(' | ');

  return `{ [keys: string]: ${unionOfAllTypes} }`;
}

function getConverter(complexType: VdmComplexType): string {
  return (
    complexType.properties.reduce((converter, currentProperty) => {
      if (converter !== '{\n') {
        converter += ',\n';
      }
      converter += `${currentProperty.originalName}: (${
        currentProperty.instancePropertyName
      }: ${currentProperty.jsType}) => ({ ${
        currentProperty.instancePropertyName
      }: ${getConverterFunction(currentProperty)} })`;
      return converter;
    }, '{\n') + '\n}'
  );
}

function getConverterFunction(property: VdmProperty): string {
  return property.isComplex
    ? `${property.jsType}.build(${property.instancePropertyName})`
    : `edmToTs(${property.instancePropertyName}, '${property.edmType}')`;
}
