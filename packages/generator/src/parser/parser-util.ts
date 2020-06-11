/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

export function stripNamespace(name: string): string {
  const nameParts = name.split('.');
  return nameParts[nameParts.length - 1];
}

const collectionRegExp = /Collection\((?<collectionType>.*)\)/;

export function isCollection(typeName: string): boolean {
  return collectionRegExp.test(typeName);
}

export function parseTypeName(typeName: string): string {
  return isCollection(typeName) ? parseCollectionTypeName(typeName) : typeName;
}

export function parseCollectionTypeName(typeName: string): string {
  const name = typeName.match(collectionRegExp)?.groups?.collectionType;
  if (!name) {
    throw new Error(`Cannot parse type name ${typeName}.`);
  }
  return name;
}
