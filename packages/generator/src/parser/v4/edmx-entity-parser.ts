/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { forceArray } from '../../generator-utils';
import {
  createEntityClassNames,
  joinEntityMetadata,
  navigationPropertyBase,
  parseEntityTypesBase,
  transformEntityBase
} from '../common/entity-parser';
import {
  VdmComplexType,
  VdmEntity,
  VdmNavigationProperty
} from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { isCollection, parseTypeName, stripNamespace } from '../util/parser-util';
import { ServiceMetadata } from '../util/edmx-types';
import { joinTypesWithBaseTypes } from './edmx-parser-util';
import {
  EdmxEntitySet,
  EdmxEnumType,
  EdmxNavigationProperty
} from './edmx-types';
import { EdmxEntityType } from '../common/edmx-types';

export function parseEntitySets(root): EdmxEntitySet[] {
  return forceArray(root.EntityContainer.EntitySet).map(entitySet => ({
    ...entitySet,
    NavigationPropertyBinding: forceArray(entitySet.NavigationPropertyBinding)
  }));
}

function parseEntityType(root): EdmxEntityType<EdmxNavigationProperty>[] {
  const entityTypes = parseEntityTypesBase(root, {} as EdmxNavigationProperty);
  const enumTypes = forceArray(root.EnumType);
  return joinTypesWithBaseTypes(
    filterEnumProperties(entityTypes, enumTypes),
    joinEntityTypes
  );
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

export function joinEntityTypes(
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
  serviceMetadata: ServiceMetadata,
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmEntity[] {
  const entitySets = parseEntitySets(serviceMetadata.edmx.root);
  const entityTypes = parseEntityType(serviceMetadata.edmx.root);

  const entitiesMetadata = joinEntityMetadata(
    entitySets,
    entityTypes,
    serviceMetadata.edmx.namespace,
    serviceMetadata.swagger
  );
  const classNames = createEntityClassNames(entitiesMetadata, formatter);

  return entitiesMetadata.map(entityMetadata => ({
    ...transformEntityBase(entityMetadata, classNames, complexTypes, formatter),
    navigationProperties: navigationProperties(
      entityMetadata.entityType,
      entityMetadata.entitySet,
      classNames,
      formatter
    )
  }));
}

function navigationProperties(
  entityType: EdmxEntityType<EdmxNavigationProperty>,
  entitySet: EdmxEntitySet,
  classNames: { [originalName: string]: string },
  formatter: ServiceNameFormatter
): VdmNavigationProperty[] {
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
      ...navigationPropertyBase(navProp.Name, entitySet.Name, formatter),
      from: entityType.Name,
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
