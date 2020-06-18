/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { toTypeNameFormat } from '@sap-cloud-sdk/core';
import {
  VdmNavigationProperty,
  VdmComplexType,
  VdmEntity,
  VdmFunctionImport
} from '../vdm-types';
import { ServiceNameFormatter } from '../service-name-formatter';
import { edmToTsType, isNullableParameter } from '../generator-utils';
import { EdmxEntityType, EdmxEntitySet, EdmxMetadata } from './parser-types-v4';
import { isCollection, parseTypeName, stripNamespace } from './parser-util';
import {
  JoinedEntityMetadata,
  ParsedServiceMetadata
} from './parser-types-common';
import {
  joinEntityMetadata,
  createEntityClassNames,
  transformEntity,
  navigationPropertyBase,
  parseReturnType,
  swaggerDefinitionForFunctionImport,
  parameterDescription,
  functionImportDescription
} from './edmx-to-vdm-common';

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

export function transformFunctionImportsV4(
  serviceMetadata: ParsedServiceMetadata,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[],
  formatter: ServiceNameFormatter
): VdmFunctionImport[] {
  const edmxMetadata = serviceMetadata.edmx as EdmxMetadata;
  const edmxFunctionImports = edmxMetadata.functionImports;

  const edmxFunctions = edmxMetadata.functions;

  return edmxFunctionImports.map(fnImport => {
    const functionName = formatter.originalToFunctionImportName(fnImport.Name);
    const edmxFunction = edmxFunctions.find(
      fn => stripNamespace(fnImport.Function) === fn.Name
    );
    if (!edmxFunction) {
      throw Error(
        `Unable to find a function with name: ${fnImport.Function}, but specified in function import ${fnImport.Name}`
      );
    }
    const functionImport = {
      httpMethod: 'get',
      originalName: fnImport.Name,
      functionName,
      returnType: parseReturnType(
        edmxFunction.ReturnType,
        entities,
        complexTypes
      ),
      parametersTypeName: toTypeNameFormat(`${functionName}Parameters`)
    };

    const swaggerDefinition = swaggerDefinitionForFunctionImport(
      serviceMetadata,
      functionImport.originalName,
      functionImport.httpMethod
    );

    const parameters = edmxFunction.Parameter.map(p => {
      const swaggerParameter = swaggerDefinition
        ? swaggerDefinition.parameters.find(param => param.name === p.Name)
        : undefined;
      return {
        originalName: p.Name,
        parameterName: formatter.originalToParameterName(fnImport.Name, p.Name),
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
