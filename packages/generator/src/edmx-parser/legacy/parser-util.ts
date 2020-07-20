/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

/* eslint-disable valid-jsdoc */

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function stripNamespace(name: string): string {
  const nameParts = name.split('.');
  return nameParts[nameParts.length - 1];
}

const collectionRegExp = /Collection\((?<collectionType>.*)\)/;
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function isCollection(typeName: string): boolean {
  return collectionRegExp.test(typeName);
}
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function parseTypeName(typeName: string): string {
  return isCollection(typeName) ? parseCollectionTypeName(typeName) : typeName;
}

function parseCollectionTypeName(typeName: string): string {
  const name = typeName.match(collectionRegExp)?.groups?.collectionType;
  if (!name) {
    throw new Error(`Cannot parse type name ${typeName}.`);
  }
  return name;
}
