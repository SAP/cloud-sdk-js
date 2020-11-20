import { flat } from '@sap-cloud-sdk/util';
import {
  parseComplexTypesBase,
  parseEntityTypesBase
} from '../common/edmx-parser';
import { forceArray } from '../../generator-utils';
import { joinEntityTypes } from '../../edmx-to-vdm/v4';
import { joinTypesWithBaseTypes } from '../legacy/v4';
import {
  EdmxMetadataSchemaMerged,
  EdmxMetadataSchemaV4Merged
} from '../edmx-file-reader';
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

export function parseEntityType(
  root: EdmxMetadataSchemaMerged
): EdmxEntityType[] {
  const entityTypes = parseEntityTypesBase(root);
  return joinTypesWithBaseTypes(entityTypes, joinEntityTypes);
}

export function parseEntitySets(
  root: EdmxMetadataSchemaV4Merged
): EdmxEntitySet[] {
  return flat(root.EntityContainer.map(ec => ec.EntitySet)).map(entitySet => ({
    ...entitySet,
    NavigationPropertyBinding: forceArray(entitySet.NavigationPropertyBinding)
  }));
}

export function parseFunctionImports(root): EdmxFunctionImport[] {
  return flat(root.EntityContainer.map(ec => ec.FunctionImport));
}

export function parseActionImport(root): EdmxActionImport[] {
  return flat(root.EntityContainer.map(ec => ec.ActionImport));
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
