import { forceArray } from '../../../generator-utils';
import { parseEntityTypes, parseComplexTypes } from '../common/edmx-parser';
import { EdmxMetadataBase } from '../common';
import {
  parseTypeName,
  stripNamespace
} from '../../../edmx-to-vdm/edmx-to-vdm-util';
import {
  EdmxEntitySet,
  EdmxMetadata,
  EdmxEntityType,
  EdmxEnumType,
  EdmxDerivedType,
  EdmxComplexType,
  EdmxFunction
} from './parser-types';

/* eslint-disable valid-jsdoc */

export function joinTypesWithBaseTypes<T extends EdmxDerivedType>(
  types: T[],
  joinTypes: (type: T, baseType: T) => T
): T[] {
  return types.map(type => joinTypeWithBaseType(type, types, joinTypes));
}

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
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
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function parseEdmxV4(
  root: any
): Omit<EdmxMetadata, keyof EdmxMetadataBase> {
  const enumTypes = forceArray(root.EnumType);
  return {
    entityTypes: joinTypesWithBaseTypes(
      filterEnumProperties(parseEntityTypes(root), enumTypes),
      joinEntityTypes
    ),
    entitySets: parseEntitySets(root),
    enumTypes,
    functions: parseFunctions(root),
    functionImports: forceArray(root.EntityContainer.FunctionImport),
    complexTypes: joinTypesWithBaseTypes(
      parseComplexTypes(root),
      joinComplexTypes
    )
  };
}

function parseFunctions(root): EdmxFunction[] {
  return forceArray(root.Function).map(f => {
    f.Parameter = forceArray(f.Parameter);
    return f;
  });
}

function parseEntitySets(root): EdmxEntitySet[] {
  return forceArray(root.EntityContainer.EntitySet).map(entitySet => ({
    ...entitySet,
    NavigationPropertyBinding: forceArray(entitySet.NavigationPropertyBinding)
  }));
}
