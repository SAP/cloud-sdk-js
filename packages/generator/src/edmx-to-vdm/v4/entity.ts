import {
  createEntityClassNames,
  joinEntityMetadata,
  navigationPropertyBase,
  transformEntityBase
} from '../common';
import {
  VdmComplexType,
  VdmEntity,
  VdmEnumType,
  VdmNavigationProperty
} from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  EdmxEntitySet,
  EdmxEntityType,
  parseEntitySets,
  parseEntityType
} from '../../edmx-parser/v4';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { isCollectionType } from '../edmx-to-vdm-util';
/* eslint-disable valid-jsdoc */

/**
 * @internal
 */
export function joinEntityTypes<T extends EdmxEntityType>(
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
export function generateEntitiesV4(
  serviceMetadata: ServiceMetadata,
  complexTypes: Omit<VdmComplexType, 'factoryName'>[],
  enumTypes: VdmEnumType[],
  formatter: ServiceNameFormatter
): VdmEntity[] {
  const entitySets = parseEntitySets(serviceMetadata.edmx.root);
  const entityTypes = parseEntityType(serviceMetadata.edmx.root);

  const entitiesMetadata = joinEntityMetadata(
    entitySets,
    entityTypes,
    serviceMetadata.swagger
  );
  const classNames = createEntityClassNames(entitiesMetadata, formatter);

  return entitiesMetadata.map(entityMetadata => ({
    ...transformEntityBase(
      entityMetadata,
      classNames,
      complexTypes,
      enumTypes,
      formatter
    ),
    navigationProperties: navigationProperties(
      entityMetadata.entityType,
      entityMetadata.entitySet,
      classNames,
      formatter
    )
  }));
}

function navigationProperties(
  entityType: EdmxEntityType,
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

    const isCollection = isCollectionType(navProp.Type);

    return {
      ...navigationPropertyBase(navProp.Name, entitySet.Name, formatter),
      from: entityType.Name,
      to: navBinding.Target,
      toEntityClassName: classNames[navBinding.Target],
      multiplicity: isCollection ? '1 - *' : '1 - 1',
      isMultiLink: isCollection,
      isCollection
    };
  });
}

// TODO: This should be removed once derived types are considered.
function isDerivedNavBindingPath(path: string): boolean {
  return path.includes('/');
}
