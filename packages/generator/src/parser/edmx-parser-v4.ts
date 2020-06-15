/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { forceArray } from '../generator-utils';
import {
  EdmxEntitySet,
  EdmxMetadata,
  EdmxEntityType,
  EdmxEnumType,
  EdmxDerivedType,
  EdmxComplexType
} from './parser-types-v4';
import {
  parseEntityTypes,
  parseBaseMetadata,
  parseFunctionImports,
  parseComplexTypes
} from './edmx-parser-common';
import { stripNamespace, parseTypeName } from './parser-util';

function joinTypesWithBaseTypes<T extends EdmxDerivedType>(
  types: T[],
  joinTypes: (type: T, baseType: T) => T
) {
  return types.map(type =>
    type.BaseType ? addBaseTypeToType(type, types, joinTypes) : type
  );
}

function addBaseTypeToType<T extends EdmxDerivedType>(
  type: T,
  types: T[],
  joinTypes: (type: T, baseType: T) => T
) {
  const baseType = types.find(e => e.Name === stripNamespace(type.BaseType!));

  if (!baseType) {
    throw new Error(
      `Type ${type.BaseType} not found, but defined as BaseType of Type ${type.Name}.`
    );
  }

  if (baseType.BaseType) {
    return joinTypes(type, addBaseTypeToType(baseType, types, joinTypes));
  }

  return joinTypes(type, baseType);
}

function joinEntityTypes(
  entityType: EdmxEntityType,
  baseType: EdmxEntityType
): EdmxEntityType {
  // TODO: only join properties / nav properties of the respective type
  return {
    ...entityType,
    Key: {
      PropertyRef: [...entityType.Key.PropertyRef, ...baseType.Key.PropertyRef]
    },
    Property: [...entityType.Property, ...baseType.Property],
    NavigationProperty: [
      ...entityType.NavigationProperty,
      ...baseType.NavigationProperty
    ]
  };
}

function joinComplexTypes(
  complexType: EdmxComplexType,
  baseType: EdmxComplexType
): EdmxComplexType {
  return {
    ...complexType,
    Property: [...complexType.Property, ...baseType.Property]
  };
}

// TODO: Filters enum properties as long as those are not supported
function filterEnumProperties(
  entityTypes: EdmxEntityType[],
  enumTypes: EdmxEnumType[]
): EdmxEntityType[] {
  const enumTypeNames = enumTypes.map(enumType => enumType.Name);
  return entityTypes.map(entityType => ({
    ...entityType,
    Property: entityType.Property.filter(
      prop => !enumTypeNames.includes(stripNamespace(parseTypeName(prop.Type)))
    )
  }));
}

export function parseEdmxV4(
  root
): Omit<EdmxMetadata, keyof ReturnType<typeof parseBaseMetadata>> {
  const enumTypes = forceArray(root.EnumType);
  return {
    entityTypes: joinTypesWithBaseTypes(
      filterEnumProperties(parseEntityTypes(root), enumTypes),
      joinEntityTypes
    ),
    entitySets: parseEntitySets(root),
    enumTypes,
    functionImports: parseFunctionImports(root),
    complexTypes: joinTypesWithBaseTypes(
      parseComplexTypes(root),
      joinComplexTypes
    )
  };
}

export function parseEntitySets(root): EdmxEntitySet[] {
  return forceArray(root.EntityContainer.EntitySet).map(entitySet => ({
    ...entitySet,
    NavigationPropertyBinding: forceArray(entitySet.NavigationPropertyBinding)
  }));
}
