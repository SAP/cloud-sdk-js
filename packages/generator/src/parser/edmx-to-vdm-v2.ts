/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ServiceNameFormatter } from '../service-name-formatter';
import { VdmNavigationProperty, VdmComplexType, VdmEntity } from '../vdm-types';
import {
  EdmxAssociationSet,
  EdmxAssociation,
  EdmxEntityType,
  EdmxMetadata
} from './parser-types-v2';
import { stripNamespace } from './parser-util';
import {
  JoinedEntityMetadata,
  ParsedServiceMetadata
} from './parser-types-common';
import {
  joinEntityMetadata,
  createEntityClassNames,
  transformEntity,
  navigationPropertyBase
} from './edmx-to-vdm-common';

export function joinAssociationMetadata(
  associationSets: EdmxAssociationSet[],
  associations: EdmxAssociation[]
): JoinedAssociationMetadata[] {
  return associationSets.map(assocSet => {
    const matchingAssoc = associations.find(
      a => a.Name === stripNamespace(assocSet.Association)
    );

    if (!matchingAssoc) {
      throw Error(
        `Unable to match the association set: ${assocSet.Association} with associations: ${associations}.`
      );
    }

    const ends = assocSet.End.map(
      assocSetEnd =>
        ({
          ...assocSetEnd,
          ...matchingAssoc.End.find(end => end.Role === assocSetEnd.Role)
        } as End)
    );

    return {
      Name: matchingAssoc.Name,
      'sap:creatable': assocSet['sap:creatable'],
      'sap:updatable': assocSet['sap:updatable'],
      'sap:deletable': assocSet['sap:deletable'],
      'sap:content-version': assocSet['sap:content-version'],
      Ends: ends
    };
  });
}

export function transformEntitiesV2(
  serviceMetadata: ParsedServiceMetadata,
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmEntity[] {
  const edmxMetadata = serviceMetadata.edmx as EdmxMetadata;
  const entitiesMetadata = joinEntityMetadata(serviceMetadata);
  const classNames = createEntityClassNames(entitiesMetadata, formatter);

  const associations = joinAssociationMetadata(
    edmxMetadata.associationSets,
    edmxMetadata.associations
  );

  return entitiesMetadata.map(entityMetadata => ({
    ...transformEntity(entityMetadata, classNames, complexTypes, formatter),
    navigationProperties: navigationProperties(
      entityMetadata,
      associations,
      classNames,
      formatter
    )
  }));
}

function navigationProperties(
  entity: JoinedEntityMetadata,
  associations: JoinedAssociationMetadata[],
  classNames: { [originalName: string]: string },
  formatter: ServiceNameFormatter
): VdmNavigationProperty[] {
  const entityType = entity.entityType as EdmxEntityType;

  return entityType.NavigationProperty.map(navProp => {
    const relationship = navProp.Relationship.split('.').pop();
    const association = associations
      .filter(ass => ass.Name === relationship)
      .pop();
    if (!association) {
      throw Error(
        `Unable to find the association with the name: ${relationship}`
      );
    }
    const from = association.Ends.find(end => end.Role === navProp.FromRole);
    const to = association.Ends.find(end => end.Role === navProp.ToRole);

    if (!from) {
      throw Error(
        `Unable to get the role property of the association ends: ${association.Ends} with the name: ${navProp.FromRole}`
      );
    }
    if (!to) {
      throw Error(
        `Unable to get the role property of the association ends: ${association.Ends} with the name: ${navProp.ToRole}`
      );
    }

    return {
      ...navigationPropertyBase(navProp.Name, entity.entitySet.Name, formatter),
      from: entity.entityType.Name,
      to: to.EntitySet,
      toEntityClassName: classNames[to.EntitySet],
      multiplicity: from.Multiplicity + ' - ' + to.Multiplicity,
      isMultiLink: to.Multiplicity.endsWith('*'),
      isCollection: to.Multiplicity.endsWith('*')
    };
  });
}

export interface JoinedAssociationMetadata {
  Name: string;
  'sap:creatable': string;
  'sap:updatable': string;
  'sap:deletable': string;
  'sap:content-version': string;
  Ends: End[];
}

interface End {
  EntitySet: string;
  Type: string;
  Multiplicity: string;
  Role: string;
}
