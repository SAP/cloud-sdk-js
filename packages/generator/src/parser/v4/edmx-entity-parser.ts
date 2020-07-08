import { forceArray } from '../../generator-utils';
import { EdmxEntitySetBase, JoinedEntityMetadata } from '../common/edmx-entity-parser';
import { EdmxEntityType, parseEntityTypesBase } from '../common/edmx-entity-parser';
import { joinTypesWithBaseTypes } from './edmx-parser-util';
import { ParsedServiceMetadata } from '../parsed-service-metadata';
import { VdmComplexType, VdmEntity, VdmNavigationProperty } from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { createEntityClassNames, joinEntityMetadata, transformEntity } from '../common/edmx-to-vdm';
import { isCollection, parseTypeName, stripNamespace } from '../parser-util';
import { EdmxNamed } from '../common';

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

export interface EdmxEnumType extends EdmxNamed {
  Member: EdmxEnumMember[];
}


export interface EdmxEnumMember {
  Name: string;
  Value: string;
}

// TODO: Filters enum properties as long as those are not supported
function filterEnumProperties(
  entityTypes: EdmxEntityType<EdmxNavigationProperty>[],
  enumTypes: EdmxEnumType[]
): EdmxEntityType<EdmxNavigationProperty>[] {
  const enumTypeNames = enumTypes.map(enumType => enumType.Name);
  return entityTypes.map(entityType => ({
    ...entityType,
    Property: entityType.Property.filter(
      prop => !enumTypeNames.includes(stripNamespace(parseTypeName(prop.Type)))
    )
  }));
}

function joinEntityTypes(
  entityType: EdmxEntityType<EdmxNavigationProperty>,
  baseType: EdmxEntityType<EdmxNavigationProperty>
): EdmxEntityType<EdmxNavigationProperty> {
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

export function transformEntitiesV4(
  serviceMetadata: ParsedServiceMetadata,
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmEntity[] {
  const entitiesMetadata = joinEntityMetadata(serviceMetadata);
  const classNames = createEntityClassNames(entitiesMetadata, formatter);

  return entitiesMetadata.map(entityMetadata => ({
    ...transformEntity(entityMetadata, classNames, complexTypes, formatter),
    navigationProperties: navigationProperties(
      entityMetadata,
      classNames,
      formatter
    )
  }));
}

function navigationProperties(
  entityMetadata: JoinedEntityMetadata<EdmxNavigationProperty>,
  classNames: { [originalName: string]: string },
  formatter: ServiceNameFormatter
): VdmNavigationProperty[] {
  const entityType = entityMetadata.entityType as EdmxEntityType;
  const entitySet = entityMetadata.entitySet as EdmxEntitySet;

  return entitySet.NavigationPropertyBinding.filter(
    navBinding => !isDerivedNavBindingPath(navBinding.Path)
  ).map(navBinding => {
    const navProp = entityType.NavigationProperty.find(
      n => n.Name === navBinding.Path
    );

    if (!navProp) {
      throw new Error(
        `Could not find navigation property ${navBinding.Path} in entity type ${entityType.Name}.`
      );
    }

    const isCollectionType = isCollection(navProp.Type);

    return {
      ...navigationPropertyBase(
        navProp.Name,
        entityMetadata.entitySet.Name,
        formatter
      ),
      from: entityMetadata.entityType.Name,
      to: navBinding.Target,
      toEntityClassName: classNames[navBinding.Target],
      multiplicity: isCollectionType ? '1 - *' : '1 - 1',
      isMultiLink: isCollectionType,
      isCollection: isCollectionType
    };
  });
}

// TODO: This should be removed once derived types are considered.
function isDerivedNavBindingPath(path: string): boolean {
  return path.includes('/');
}

