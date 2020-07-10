/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ServiceNameFormatter } from '../../../service-name-formatter';
import {
  VdmNavigationProperty,
  VdmComplexType,
  VdmEntity,
  VdmFunctionImport
} from '../../../vdm-types';
import { JoinedEntityMetadata, ParsedServiceMetadata } from '../common';
import {
  joinEntityMetadata,
  createEntityClassNames,
  transformEntity,
  navigationPropertyBase,
  swaggerDefinitionForFunctionImport,
  parseReturnType,
  transformFunctionImportBase
} from '../common/edmx-to-vdm';
import { stripNamespace } from '../../../edmx-to-vdm/edmx-to-vdm-util';
import {
  EdmxAssociationSet,
  EdmxAssociation,
  EdmxEntityType,
  EdmxMetadata,
  EdmxFunctionImport
} from './parser-types';

/* eslint-disable valid-jsdoc */

/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
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
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
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
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
export function transformFunctionImportsV2(
  serviceMetadata: ParsedServiceMetadata,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmFunctionImport[] {
  const edmxFunctionImports = serviceMetadata.edmx
    .functionImports as EdmxFunctionImport[];

  return edmxFunctionImports.map(f => {
    const httpMethod = f['m:HttpMethod'].toLowerCase();
    const swaggerDefinition = swaggerDefinitionForFunctionImport(
      serviceMetadata,
      f.Name,
      httpMethod
    );

    return {
      ...transformFunctionImportBase(
        f,
        f.Parameter,
        swaggerDefinition,
        formatter
      ),
      httpMethod,
      returnType: parseReturnType(f.ReturnType, entities, complexTypes),
      returnTypeEdmx: f.ReturnType
    };
  });
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
/**
 * @deprecated Since version 1.25.0 due to major generator refactoring.
 */
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
