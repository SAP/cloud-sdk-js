/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  parseComplexTypesBase,
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
  EdmxFunctionImport
} from './edm-types';

export function joinComplexTypes(
  complexType: EdmxComplexType,
  baseType: EdmxComplexType
): EdmxComplexType {
  return {
    ...complexType,
    Property: [...complexType.Property, ...baseType.Property]
  };
}

export function parseComplexTypes(root): EdmxComplexType[] {
  return joinTypesWithBaseTypes(parseComplexTypesBase(root), joinComplexTypes);
}

export function parseEnumTypes(root): EdmxEnumType[] {
  return forceArray(root.EnumType);
}

export function parseEntityType(root): EdmxEntityType[] {
  const entityTypes = parseEntityTypesBase(root);
  return joinTypesWithBaseTypes(entityTypes, joinEntityTypes);
}

export function parseEntitySets(root): EdmxEntitySet[] {
  return forceArray(root.EntityContainer.EntitySet).map(entitySet => ({
    ...entitySet,
    NavigationPropertyBinding: forceArray(entitySet.NavigationPropertyBinding)
  }));
}

export function parseFunctionImports(root): EdmxFunctionImport[] {
  return forceArray(root.EntityContainer.FunctionImport);
}

export function parseActionImport(root): EdmxActionImport[] {
  return forceArray(root.EntityContainer.ActionImport);
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
