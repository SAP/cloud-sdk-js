import voca from 'voca';
import {
  getMergedPropertyWithNamespace,
  getPropertyFromEntityContainer,
  parseComplexTypesBase,
  parseEntitySetsBase,
  parseEntityTypesBase
} from '../common/edmx-parser';
import { forceArray } from '../../generator-utils';
import { stripNamespace } from '../../edmx-to-vdm/edmx-to-vdm-util';
import {
  EdmxComplexType,
  EdmxDerivedType,
  EdmxEntitySet,
  EdmxEntityTypeV4,
  EdmxEnumType,
  EdmxOperation,
  EdmxNavigationPropertyBinding,
  EdmxOperationImport
} from './edm-types';

/**
 * @internal
 */
export function joinEntityTypes<T extends EdmxEntityTypeV4>(
  entityType: T,
  baseType: T
): T {
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
/**
 * @internal
 */
export function joinComplexTypes<T extends EdmxComplexType>(
  complexType: T,
  baseType: T
): T {
  return {
    ...complexType,
    Property: [...complexType.Property, ...baseType.Property]
  };
}
/**
 * @internal
 */
export function joinTypesWithBaseTypes<T extends EdmxDerivedType>(
  types: T[],
  joinTypes: (type: T, baseType: T) => T
): T[] {
  return types.map(type => joinTypeWithBaseType(type, types, joinTypes));
}

/**
 * Recursively adds the base type data to the current type.
 * @param type - An EDMX type that can have a base type (e.g. EntityType or ComplexType).
 * @param types - All parsed EDMX types.
 * @param joinTypes - Function to ultimately join types.
 * @returns The enriched type (type + base type).
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
/**
 * @internal
 */
export function parseComplexTypesV4(root: any): EdmxComplexType[] {
  return joinTypesWithBaseTypes(parseComplexTypesBase(root), joinComplexTypes);
}
/**
 * @internal
 */
export function parseEnumTypes(root: any): EdmxEnumType[] {
  return getMergedPropertyWithNamespace(root, 'EnumType').map(edmxEnumType => ({
    Name: edmxEnumType.Name,
    UnderlyingType: edmxEnumType.UnderlyingType,
    Member: forceArray(edmxEnumType.Member),
    Namespace: edmxEnumType.Namespace
  }));
}
/**
 * @internal
 */
export function parseEntityType(root: any): EdmxEntityTypeV4[] {
  const entityTypes = parseEntityTypesBase(root);
  return joinTypesWithBaseTypes(entityTypes, joinEntityTypes);
}
/**
 * @internal
 */
export function parseEntitySetsV4(root: any): EdmxEntitySet[] {
  return parseEntitySetsBase(root).map(entitySet => ({
    ...entitySet,
    NavigationPropertyBinding: parseNavigationPropertyBinding(entitySet)
  }));
}

function parseNavigationPropertyBinding(
  entitySet
): EdmxNavigationPropertyBinding[] {
  return forceArray(entitySet.NavigationPropertyBinding);
}
/**
 * @internal
 */
export function parseOperationImports(
  root: any,
  operationType: 'function' | 'action'
): EdmxOperationImport[] {
  const operationImports = getPropertyFromEntityContainer(
    root,
    `${voca.capitalize(operationType)}Import`
  );

  return operationImports.map(operationImport => ({
    ...operationImport,
    operationName: operationImport[voca.capitalize(operationType)],
    operationType
  }));
}

/**
 * @internal
 */
export function parseOperations(
  root: any,
  operationType: 'function' | 'action'
): EdmxOperation[] {
  return getMergedPropertyWithNamespace(
    root,
    voca.capitalize(operationType)
  ).map(operation => ({
    ...operation,
    Parameter: forceArray(operation.Parameter),
    IsBound: operation.IsBound || 'false'
  }));
}
