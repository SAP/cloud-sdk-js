/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { forceArray } from '../generator-utils';
import { EdmxEntitySet, EdmxMetadata, EdmxEntityType } from './parser-types-v4';
import {
  parseEntityTypes,
  parseBaseMetadata,
  parseFunctionImports,
  parseComplexTypes
} from './edmx-parser-common';
import { stripNamespace } from './parser-util';

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

export function parseEdmxV4(
  root
): Omit<EdmxMetadata, keyof ReturnType<typeof parseBaseMetadata>> {
  return {
    entityTypes: joinEntityTypesWithBaseTypes(parseEntityTypes(root)),
    entitySets: parseEntitySets(root),
    enumTypes: forceArray(root.EnumType),
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
