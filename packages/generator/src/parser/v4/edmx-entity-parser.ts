import { forceArray } from '../../generator-utils';
import { EdmxEntitySetBase } from '../common/edmx-entity-parser';
import { EdmxEntityType, parseEntityTypesBase } from '../common/edmx-entity-parser';
import { joinTypesWithBaseTypes } from './edmx-parser-util';

interface EdmxNavigationProperty {
  Name: string;
  Type: string;
}

export interface EdmxEntitySet extends EdmxEntitySetBase {
  NavigationPropertyBinding: EdmxNavigationPropertyBinding[];
}
export interface EdmxNavigationPropertyBinding {
  Path: string;
  Target: string;
}

export function parseEntitySets(root): EdmxEntitySet[] {
  return forceArray(root.EntityContainer.EntitySet).map(entitySet => ({
    ...entitySet,
    NavigationPropertyBinding: forceArray(entitySet.NavigationPropertyBinding)
  }));
}


function parseEntityType(root):EdmxEntityType<EdmxNavigationProperty>[]{
  const entityTypes = parseEntityTypesBase(root,{} as EdmxNavigationProperty)
  const enumTypes = forceArray(root.EnumType);
  return joinTypesWithBaseTypes(
    filterEnumProperties(entityTypes, enumTypes),
    joinEntityTypes)
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
