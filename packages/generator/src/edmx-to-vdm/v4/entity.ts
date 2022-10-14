import {
  createEntityClassNames,
  joinEntityMetadata,
  navigationPropertyBase,
  transformEntityBase
} from '../common/entity';
import {
  VdmComplexType,
  VdmEntity,
  VdmEnumType,
  VdmNavigationProperty
} from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  parseEntitySetsV4,
  parseEntityType
} from '../../edmx-parser/v4/edmx-parser';
import {
  EdmxEntitySet,
  EdmxEntityTypeV4
} from '../../edmx-parser/v4/edm-types';
import { ServiceMetadata } from '../../edmx-parser/edmx-file-reader';
import { isCollectionType } from '../edmx-to-vdm-util';

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

  const boundFunctions = serviceMetadata.edmx.root.Function;
  const boundActions = serviceMetadata.edmx.root.Action;

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
      boundFunctions,
      boundActions,
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
