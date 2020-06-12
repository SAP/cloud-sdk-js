/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { VdmNavigationProperty, VdmComplexType, VdmEntity } from '../vdm-types';
import { ServiceNameFormatter } from '../service-name-formatter';
import { EdmxEntityType, EdmxEntitySet } from './parser-types-v4';
import { isCollection } from './parser-util';
import { JoinedEntityMetadata } from './parser-types-common';
import {
  joinEntityMetadata,
  createEntityClassNames,
  transformEntity,
  navigationPropertyBase
} from './edmx-to-vdm-common';
import { ParsedServiceMetadata } from './parsed-service-metadata';

function navigationProperties(
  entityMetadata: JoinedEntityMetadata,
  classNames: { [originalName: string]: string },
  formatter: ServiceNameFormatter
): VdmNavigationProperty[] {
  const entityType = entityMetadata.entityType as EdmxEntityType;
  const entitySet = entityMetadata.entitySet as EdmxEntitySet;

  return entitySet.NavigationPropertyBinding.map(navBinding => {
    const navProp = entityType.NavigationProperty.find(
      n => n.Name === navBinding.Path
    );

    if (!navProp) {
      throw new Error(
        `Could not find navigation property ${navBinding.Path} in entity type ${entityType.Name}.`
      );
    }

    const isMulti = isCollection(navProp.Type);

    // const toType = isCollection
    //   ? navProp.Type.match(collectionRegExp)?.groups?.toType
    //   : navProp.Type;

    // if (!toType) {
    //   throw new Error(`Navigation property ${navProp.Name} has unknown type.`);
    // }

    // const toEntityType = stripNamespace(toType);
    // // serviceMedatadata.edmx.entitySets.

    return {
      ...navigationPropertyBase(
        navProp.Name,
        entityMetadata.entitySet.Name,
        formatter
      ),
      from: entityMetadata.entityType.Name,
      to: navBinding.Target,
      toEntityClassName: classNames[navBinding.Target],
      multiplicity: isMulti ? '1 - *' : '1 - 1',
      isMultiLink: isMulti
    };
  });
}

export function transformEntitiesV4(
  serviceMetadata: ParsedServiceMetadata<'v4'>,
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmEntity[] {
  // TODO: move higher, this is needed in more places than here
  // serviceMetadata.edmx.entityTypes = joinEntityTypesWithBaseTypes(
  //   serviceMetadata.edmx.entityTypes
  // );
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
