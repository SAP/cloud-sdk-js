import {
  getMergedPropertyWithNamespace,
  getPropertyFromEntityContainer,
  parseComplexTypesBase,
  parseEntitySetsBase,
  parseEntityTypesBase
} from '../common/edmx-parser';
import { forceArray } from '../../generator-utils';
import { joinEntityTypes } from '../../edmx-to-vdm/v4';
import { stripNamespace } from '../../edmx-to-vdm/edmx-to-vdm-util';
import {
  EdmxAction,
  EdmxActionImport,
  EdmxComplexType, EdmxDerivedType,
  EdmxEntitySet,
  EdmxEntityType,
  EdmxEnumType,
  EdmxFunction,
  EdmxFunctionImport,
  EdmxNavigationPropertyBinding
} from './edm-types';

export function joinComplexTypes<T extends EdmxComplexType>(
  complexType: T,
  baseType: T
): T {
  return {
    ...complexType,
    Property: [...complexType.Property, ...baseType.Property]
  };
}

export function joinTypesWithBaseTypes<T extends EdmxDerivedType>(
    types: T[],
    joinTypes: (type: T, baseType: T) => T
): T[] {
  return types.map(type => joinTypeWithBaseType(type, types, joinTypes));
}

/**
 * Recursively adds the base type data to the current type
 * @param type - An EDMX type that can have a base type (e. g. EntityType or ComplexType)
 * @param types - All parsed EDMX types
 * @param joinTypes - Function to ultimately join types
 * @returns The enriched type (type + base type)
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

export function parseComplexTypes(root: any): EdmxComplexType[] {
  return joinTypesWithBaseTypes(parseComplexTypesBase(root), joinComplexTypes);
}

export function parseEnumTypes(root: any): EdmxEnumType[] {
  return getMergedPropertyWithNamespace(root, 'EnumType').map(edmxEnumType => ({
    Name: edmxEnumType.Name,
    UnderlyingType: edmxEnumType.UnderlyingType,
    Member: forceArray(edmxEnumType.Member),
    Namespace: edmxEnumType.Namespace
  }));
}

export function parseEntityType(root: any): EdmxEntityType[] {
  const entityTypes = parseEntityTypesBase(root);
  return joinTypesWithBaseTypes(entityTypes, joinEntityTypes);
}

export function parseEntitySets(root: any): EdmxEntitySet[] {
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

export function parseFunctionImports(root: any): EdmxFunctionImport[] {
  return getPropertyFromEntityContainer(root, 'FunctionImport');
}

export function parseActionImport(root: any): EdmxActionImport[] {
  return getPropertyFromEntityContainer(root, 'ActionImport');
}

function parseActionsFunctions(
  root,
  actionFunctionKey: 'Action' | 'Function'
): EdmxFunction[] | EdmxAction[] {
  return getMergedPropertyWithNamespace(root, actionFunctionKey).map(
    actionOrFunction => ({
      ...actionOrFunction,
      Parameter: forceArray(actionOrFunction.Parameter),
      IsBound: false
    })
  );
}

export function parseFunctions(root: any): EdmxFunction[] {
  return parseActionsFunctions(root, 'Function');
}

export function parseActions(root: any): EdmxAction[] {
  return parseActionsFunctions(root, 'Action');
}
