/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { stripNamespace } from '../parser-util';
import {  EdmxNamed } from '../common';

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





//
// export function parseEdmxV4(root): Omit<EdmxMetadata, keyof EdmxMetadataBase> {
//   const enumTypes = forceArray(root.EnumType);
//   return {
//     entityTypes: joinTypesWithBaseTypes(
//       filterEnumProperties(parseEntityTypes(root), enumTypes),
//       joinEntityTypes
//     ),
//     entitySets: parseEntitySets(root),
//     enumTypes,
//     functions: parseFunctions(root),
//     functionImports: forceArray(root.EntityContainer.FunctionImport),
//     complexTypes: joinTypesWithBaseTypes(
//       parseComplexTypes(root),
//       joinComplexTypes
//     )
//   };
// }


//
// function parseEntitySets(root): EdmxEntitySet[] {
//   return forceArray(root.EntityContainer.EntitySet).map(entitySet => ({
//     ...entitySet,
//     NavigationPropertyBinding: forceArray(entitySet.NavigationPropertyBinding)
//   }));
// }
