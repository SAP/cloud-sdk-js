/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger, MapType } from '@sap-cloud-sdk/util';
import { last } from 'rambda';
import { EdmxMetadata } from '../edmx-parser/edmx-file-reader';
import { EdmxProperty } from '../edmx-parser/common';
import {
  edmToFieldType,
  edmToTsType,
  getFallbackEdmTypeIfNeeded
} from '../generator-utils';
import { VdmComplexType, VdmMappedEdmType } from '../vdm-types';
import { complexTypeForName } from './common';

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-to-vdm-util'
});

export function stripNamespace(name: string): string {
  const nameParts = name.split('.');
  return nameParts[nameParts.length - 1];
}

export function isCollectionType(typeName: string): boolean {
  return collectionRegExp.test(typeName);
}

export function isEdmType(typeName: string): boolean {
  return typeName.startsWith('Edm');
}

export function complexTypeName(type: string): string | undefined {
  return last(type.split('.'));
}

export const collectionRegExp = /Collection\((?<collectionType>.*)\)/;

/**
 * @deprecated since version 1.27.0. Use [[isEdmType]] and [[complexTypeName]] if you want to extract type names of non Edm types.
 * @param typeName Name of the edm type for example "Edm.String" or "Namespace.ComplexType"
 * @returns the typename input for Edm types e.g. "Edm.String" or the type without the namesapce.
 */
export function parseType(typeName: string): string {
  return typeName.startsWith('Edm')
    ? typeName
    : typeName.split('.')[typeName.split('.').length - 1];
}

export function parseTypeName(typeName: string): string {
  return isCollectionType(typeName)
    ? parseCollectionTypeName(typeName)
    : typeName;
}

function parseCollectionTypeName(typeName: string): string {
  const name = typeName.match(collectionRegExp)?.groups?.collectionType;
  if (!name) {
    throw new Error(`Cannot parse type name ${typeName}.`);
  }
  return name;
}

export function isV2Metadata(metadata: EdmxMetadata): boolean {
  return metadata.oDataVersion === 'v2';
}

export function isComplexType(typeName: string): boolean {
  let type = typeName;
  if (isCollectionType(typeName)) {
    type = parseCollectionTypeName(typeName);
  }
  const typeParts = type.split('.');
  return typeParts[0] !== 'Edm' && typeParts[1] !== undefined;
}

export function checkCollectionKind(property: EdmxProperty) {
  if (property.hasOwnProperty('CollectionKind')) {
    logger.warn(
      `"CollectionKind" attribute found in the "${property.Name}" property. Currently, handling collection of properties is not supported by the generator.`
    );
  }
}

export function complexTypeFieldType(typeName: string) {
  return typeName + 'Field';
}

export function getTypeMappingActionFunction(
  typeName: string
): VdmMappedEdmType {
  if (isEdmType(typeName)) {
    const edmFallback = getFallbackEdmTypeIfNeeded(typeName);
    return {
      edmType: edmFallback,
      jsType: edmToTsType(edmFallback),
      fieldType: edmToFieldType(edmFallback)
    };
  }
  throw new Error(
    `Tries to get a action/function parameter with type ${typeName} which is not a Edm type.`
  );
}

export function typesForCollection(
  typeName: string,
  complexTypes?: Omit<VdmComplexType, 'factoryName'>[],
  formattedTypes?: MapType<any>
): VdmMappedEdmType {
  const typeInsideCollection = parseCollectionTypeName(typeName);
  if (isEdmType(typeInsideCollection)) {
    const typeEdm = getFallbackEdmTypeIfNeeded(typeInsideCollection);
    return {
      edmType: typeEdm,
      jsType: edmToTsType(typeEdm),
      fieldType: 'CollectionField'
    };
  }
  if (isComplexType(typeInsideCollection)) {
    const typeComplex =
      complexTypeName(typeInsideCollection) || typeInsideCollection;
    return {
      edmType: typeInsideCollection,
      jsType: complexTypes
        ? complexTypeForName(typeInsideCollection, complexTypes)
        : formattedTypes![typeComplex],
      fieldType: 'CollectionField'
    };
  }
  throw new Error(
    'Types in inside a collection must be either have complex or edm types'
  );
}

export const propertyJsType = (type: string): string | undefined =>
  type.startsWith('Edm.') ? edmToTsType(type) : undefined;
