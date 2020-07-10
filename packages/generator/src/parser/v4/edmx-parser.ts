/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  parseComplexTypesBase,
  parseEntityTypesBase
} from '../common/edmx-parser';
import { forceArray } from '../../generator-utils';
import {
  EdmxComplexType,
  EdmxEntitySet,
  EdmxEntityType,
  EdmxEnumType,
  EdmxFunction,
  EdmxFunctionImport,
  EdmxNavigationProperty
} from './edmx-types';
import { joinTypesWithBaseTypes } from '../../service-vdm/v4/function-import-vdm';
import { joinComplexTypes } from '../../service-vdm/v4/complex-type-vdm';
import { joinEntityTypes } from '../../service-vdm/v4/entity-vdm';
import { parseTypeName, stripNamespace } from '../../service-vdm/vdm-util';

export function parseComplexTypes(root): EdmxComplexType[] {
  return joinTypesWithBaseTypes(parseComplexTypesBase(root), joinComplexTypes);
}

export function parseEnumTypes(root): EdmxEnumType[] {
  return forceArray(root.EnumType);
}

export function parseEntityType(root): EdmxEntityType[] {
  const entityTypes = parseEntityTypesBase(root, {} as EdmxNavigationProperty);
  return joinTypesWithBaseTypes(
    filterEnumProperties(entityTypes, parseEnumTypes(root)),
    joinEntityTypes
  );
} // TODO: Filters enum properties as long as those are not supported
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

export function parseEntitySets(root): EdmxEntitySet[] {
  return forceArray(root.EntityContainer.EntitySet).map(entitySet => ({
    ...entitySet,
    NavigationPropertyBinding: forceArray(entitySet.NavigationPropertyBinding)
  }));
}

export function parseFunctionImports(root): EdmxFunctionImport[] {
  return forceArray(root.EntityContainer.FunctionImport);
}

export function parseFunctions(root): EdmxFunction[] {
  return forceArray(root.Function).map(f => {
    f.Parameter = forceArray(f.Parameter);
    return f;
  });
}
