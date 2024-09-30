import { parseEntitySetsV4, parseEntityType } from '../../edmx-parser';
import {
  createEntityClassNames,
  joinEntityMetadata,
  navigationPropertyBase,
  transformEntityBase
} from '../common';
import { isCollectionType } from '../edmx-to-vdm-util';
import { generateBoundOperations } from './operation';
import type {
  VdmComplexType,
  VdmEntity,
  VdmPartialEntity,
  VdmEnumType,
  VdmNavigationProperty
} from '../../vdm-types';
import type { ServiceNameFormatter } from '../../service-name-formatter';
import type {
  ServiceMetadata,
  EdmxEntitySet,
  EdmxEntityTypeV4
} from '../../edmx-parser';

/**
 * @internal
 */
export function generateEntitiesV4(
  serviceMetadata: ServiceMetadata,
  complexTypes: VdmComplexType[],
  enumTypes: VdmEnumType[],
  formatter: ServiceNameFormatter
): VdmEntity[] {
  const entitySets = parseEntitySetsV4(serviceMetadata.edmx.root);
  const entityTypes = parseEntityType(serviceMetadata.edmx.root);

  const entitiesMetadata = joinEntityMetadata(
    entitySets,
    entityTypes,
    serviceMetadata.swagger
  );
  const classNames = createEntityClassNames(entitiesMetadata, formatter);

  const entities: VdmPartialEntity[] = entitiesMetadata.map(
    ({ entityType, entitySet }) => ({
      entityTypeName: entityType.Name,
      className: classNames[entitySet.Name],
      entityTypeNamespace: entityType.Namespace
    })
  );

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
    ),
    operations: generateBoundOperations(
      serviceMetadata,
      entityMetadata.entityType.Namespace,
      entities,
      complexTypes,
      formatter,
      entityMetadata.entitySet.Name,
      classNames[entityMetadata.entitySet.Name]
    )
  }));
}

function navigationProperties(
  entityType: EdmxEntityTypeV4,
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
      isCollection
    };
  });
}

// TODO: This should be removed once derived types are considered.
function isDerivedNavBindingPath(path: string): boolean {
  return path.includes('/');
}
