/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { createLogger } from '@sap-cloud-sdk/util';
import { EdmxMetadata } from '../edmx-parser/edmx-file-reader';
import { EdmxProperty } from '../edmx-parser/common';
import { edmToTsType } from '../generator-utils';

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

export const collectionRegExp = /Collection\((?<collectionType>.*)\)/;

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

export function isComplexType(type: string): boolean {
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

export const propertyJsType = (type: string): string | undefined =>
  type.startsWith('Edm.') ? edmToTsType(type) : undefined;

export function parseType(type: string): string {
  return type.startsWith('Edm')
    ? type
    : type.split('.')[type.split('.').length - 1];
}

export function filterUnknownEdmTypes(p: EdmxProperty): boolean {
  const type = parseTypeName(p.Type);
  const skip = type.startsWith('Edm.') && !edmToTsType(type);
  if (skip) {
    logger.warn(
      `Edm Type ${type} not supported by the SAP Cloud SDK. Skipping generation of property ${p.Name}.`
    );
  }
  return !skip;
}
