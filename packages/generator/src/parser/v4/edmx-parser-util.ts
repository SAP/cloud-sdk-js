/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { stripNamespace } from '../util/parser-util';
import { EdmxNamed } from '../common/edmx-types';

interface EdmxDerivedType extends EdmxNamed {
  BaseType?: string;
}

export function joinTypesWithBaseTypes<T extends EdmxDerivedType>(
  types: T[],
  joinTypes: (type: T, baseType: T) => T
): T[] {
  return types.map(type => joinTypeWithBaseType(type, types, joinTypes));
}

/**
 * Recursively adds the base type data to the current type
 * @param type An EDMX type that can have a base type (e. g. EntityType or ComplexType)
 * @param types All parsed EDMX types
 * @param joinTypes Function to ultimatively join types
 * @returns The enriched type (type + basetype)
 */
function joinTypeWithBaseType<T extends EdmxDerivedType>(
  type: T,
  types: T[],
  joinTypes: (type: T, baseType: T) => T
): T {
  if (type.BaseType) {
    const baseType = types.find(e => e.Name === stripNamespace(type.BaseType!));

    if (!baseType) {
      throw new Error(
        `Type ${type.BaseType} not found, but defined as BaseType of Type ${type.Name}.`
      );
    }

    return joinTypes(type, joinTypeWithBaseType(baseType, types, joinTypes));
  }
  return type;
}
