/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { forceArray } from '../generator-utils';
import {
  EdmxEntitySet,
  EdmxMetadata,
  EdmxEntityType,
  EdmxEnumType
} from './parser-types-v4';
import {
  parseEntityTypes,
  parseBaseMetadata,
  parseFunctionImports,
  parseComplexTypes
} from './edmx-parser-common';
import { stripNamespace, parseTypeName } from './parser-util';

function joinEntityTypesWithBaseTypes(entityTypes: EdmxEntityType[]) {
  return entityTypes.map(entityType =>
    entityType.BaseType
      ? addBaseTypeToEntityType(entityType, entityTypes)
      : entityType
  );
}

function addBaseTypeToEntityType(
  entityType: EdmxEntityType,
  entityTypes: EdmxEntityType[]
) {
  const baseType = entityTypes.find(
    e => e.Name === stripNamespace(entityType.BaseType!)
  );

  if (!baseType) {
    throw new Error(
      `EntityType ${entityType.BaseType} not found, but defined as BaseType of EntityType ${entityType.Name}.`
    );
  }

  if (baseType.BaseType) {
    return joinEntityTypes(
      entityType,
      addBaseTypeToEntityType(baseType, entityTypes)
    );
  }

  return joinEntityTypes(entityType, baseType);
}

function joinEntityTypes(
  entityType: EdmxEntityType,
  baseType: EdmxEntityType
): EdmxEntityType {
  // TODO: only join properties of the respective type
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
    entityTypes: joinEntityTypesWithBaseTypes(
      filterEnumProperties(parseEntityTypes(root), enumTypes)
    ),
    entitySets: parseEntitySets(root),
    enumTypes,
    functionImports: parseFunctionImports(root),
    complexTypes: parseComplexTypes(root)
  };
}

export function parseEntitySets(root): EdmxEntitySet[] {
  return forceArray(root.EntityContainer.EntitySet).map(entitySet => ({
    ...entitySet,
    NavigationPropertyBinding: forceArray(entitySet.NavigationPropertyBinding)
  }));
}
