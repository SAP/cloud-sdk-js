/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { toTypeNameFormat } from '@sap-cloud-sdk/core';
import { ServiceNameFormatter } from '../service-name-formatter';
import {
  VdmNavigationProperty,
  VdmComplexType,
  VdmEntity,
  VdmFunctionImport
} from '../vdm-types';
import { edmToTsType, isNullableParameter } from '../generator-utils';
import {
  EdmxAssociationSet,
  EdmxAssociation,
  EdmxEntityType,
  EdmxMetadata,
  EdmxFunctionImport
} from './parser-types-v2';
import { stripNamespace, parseTypeName } from './parser-util';
import {
  JoinedEntityMetadata,
  ParsedServiceMetadata
} from './parser-types-common';
import {
  joinEntityMetadata,
  createEntityClassNames,
  transformEntity,
  navigationPropertyBase,
  swaggerDefinitionForFunctionImport,
  parameterDescription,
  parseReturnType,
  functionImportDescription
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

export function transformFunctionImportsV2(
  serviceMetadata: ParsedServiceMetadata,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmFunctionImport[] {
  const edmxFunctionImports = serviceMetadata.edmx
    .functionImports as EdmxFunctionImport[];

  return edmxFunctionImports.map(f => {
    const functionName = formatter.originalToFunctionImportName(f.Name);
    const functionImport = {
      httpMethod: f['m:HttpMethod'].toLowerCase(),
      originalName: f.Name,
      functionName,
      returnType: parseReturnType(f.ReturnType, entities, complexTypes),
      parametersTypeName: toTypeNameFormat(`${functionName}Parameters`)
    };

    const swaggerDefinition = swaggerDefinitionForFunctionImport(
      serviceMetadata,
      functionImport.originalName,
      functionImport.httpMethod
    );

    const parameters = f.Parameter.map(p => {
      const swaggerParameter = swaggerDefinition
        ? swaggerDefinition.parameters.find(param => param.name === p.Name)
        : undefined;
      return {
        originalName: p.Name,
        parameterName: formatter.originalToParameterName(f.Name, p.Name),
        edmType: parseTypeName(p.Type),
        jsType: edmToTsType(p.Type),
        nullable: isNullableParameter(p),
        description: parameterDescription(p, swaggerParameter)
      };
    });

    return {
      ...functionImport,
      parameters,
      description: functionImportDescription(
        swaggerDefinition,
        functionImport.originalName
      )
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
