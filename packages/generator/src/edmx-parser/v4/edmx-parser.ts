import {
  getPropertyFromEntityContainer,
  parseComplexTypesBase,
  parseEntitySetsBase,
  parseEntityTypesBase
} from '../common/edmx-parser';
import { forceArray } from '../../generator-utils';
import { joinEntityTypes } from '../../edmx-to-vdm/v4';
import { joinTypesWithBaseTypes } from '../legacy/v4';
import {
  EdmxAction,
  EdmxActionImport,
  EdmxComplexType,
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

export function parseComplexTypes(root): EdmxComplexType[] {
  return joinTypesWithBaseTypes(parseComplexTypesBase(root), joinComplexTypes);
}

export function parseEnumTypes(root): EdmxEnumType[] {
  const types: EdmxEnumType[] = forceArray(root.EnumType);
  return types.map(edmxEnumType => ({
    Name: edmxEnumType.Name,
    Member: forceArray(edmxEnumType.Member),
    Namespace: edmxEnumType.Namespace
  }));
}

export function parseEntityType(root): EdmxEntityType[] {
  const entityTypes = parseEntityTypesBase(root);
  return joinTypesWithBaseTypes(entityTypes, joinEntityTypes);
}

export function parseEntitySets(root): EdmxEntitySet[] {
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

export function parseFunctionImports(root): EdmxFunctionImport[] {
  return getPropertyFromEntityContainer(root, 'FunctionImport');
}

export function parseActionImport(root): EdmxActionImport[] {
  return getPropertyFromEntityContainer(root, 'ActionImport');
}

function parseActionsFunctions(root, actionFunctionKey: 'Action' | 'Function') {
  return forceArray(root[actionFunctionKey]).map(actionOrFunction => ({
    ...actionOrFunction,
    Parameter: forceArray(actionOrFunction.Parameter),
    IsBound: false
  }));
}

export function parseFunctions(root): EdmxFunction[] {
  return parseActionsFunctions(root, 'Function');
}

export function parseActions(root): EdmxAction[] {
  return parseActionsFunctions(root, 'Action');
}
