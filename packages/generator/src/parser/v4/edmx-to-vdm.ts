/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  VdmNavigationProperty,
  VdmComplexType,
  VdmEntity,
  VdmFunctionImport
} from '../../vdm-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { isCollection, stripNamespace } from '../parser-util';
import { JoinedEntityMetadata, ParsedServiceMetadata } from '../common';
import {
  joinEntityMetadata,
  createEntityClassNames,
  transformEntity,
  navigationPropertyBase,
  parseReturnType,
  swaggerDefinitionForFunctionImport,
  transformFunctionImportBase
} from '../common/edmx-to-vdm';
import { EdmxEntityType, EdmxEntitySet, EdmxMetadata } from './parser-types';

// TODO: This should be removed once derived types are considered.
function isDerivedNavBindingPath(path: string): boolean {
  return path.includes('/');
}

function navigationProperties(
  entityMetadata: JoinedEntityMetadata,
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


}
