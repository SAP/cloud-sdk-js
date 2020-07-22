/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { toTypeNameFormat } from '@sap-cloud-sdk/core';
import { createLogger } from '@sap-cloud-sdk/util';
import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  VdmComplexType,
  VdmEntity,
  VdmFunctionImport,
  VdmFunctionImportReturnType,
  VdmFunctionImportReturnTypeCategory
} from '../../vdm-types';
import { edmToTsType, isNullableParameter } from '../../generator-utils';
import { SwaggerPath } from '../../swagger-parser/swagger-types';
import {
  functionImportDescription,
  parameterDescription
} from '../description-util';
import { EdmxNamed, EdmxParameter } from '../../edmx-parser/common';
import {
  filterUnknownEdmTypes,
  isCollectionType,
  parseType,
  parseTypeName,
  propertyJsType
} from '../edmx-to-vdm-util';

const logger = createLogger({
  package: 'generator',
  messageContext: 'function-import'
});

export function transformFunctionImportBase<T extends EdmxNamed>(
  edmxFunctionImport: T,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter
): Omit<VdmFunctionImport, 'httpMethod' | 'returnTypeEdmx' | 'returnType'> {
  const functionName = formatter.originalToFunctionImportName(
    edmxFunctionImport.Name
  );
  const functionImport = {
    originalName: edmxFunctionImport.Name,
    functionName,
    parametersTypeName: toTypeNameFormat(`${functionName}Parameters`)
  };

  const parameters = edmxParameters.filter(filterUnknownEdmTypes).map(p => {
    const swaggerParameter = swaggerDefinition
      ? swaggerDefinition.parameters.find(param => param.name === p.Name)
      : undefined;
    return {
      originalName: p.Name,
      parameterName: formatter.originalToParameterName(
        edmxFunctionImport.Name,
        p.Name
      ),
      edmType: parseType(p.Type),
      jsType: edmToTsType(p.Type)!,
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
}

export function parseReturnTypes(
  returnType: string,
  entities: VdmEntity[],
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): VdmFunctionImportReturnType {
  if (!returnType) {
    return getVoidReturnType();
  }

  const isCollectionReturnType = isCollectionType(returnType);
  const edmType = findEdmType(returnType);
  if (edmType) {
    return getEdmReturnType(isCollectionReturnType, edmType);
  }

  const entity = findEntityType(returnType, entities);
  if (entity) {
    return getEntityReturnType(isCollectionReturnType, entity);
  }

  const complexType = findComplexType(returnType, complexTypes);
  if (complexType) {
    return getComplexReturnType(isCollectionReturnType, complexType);
  }

  throw Error(`Unable to find a return type for name ${returnType}.`);
}

function findEdmType(returnType: string): string | undefined {
  returnType = parseTypeName(returnType);
  if (returnType.startsWith('Edm.')) {
    return returnType;
  }
}

function findEntityType(
  returnType: string,
  entites: VdmEntity[]
): VdmEntity | undefined {
  returnType = parseTypeName(returnType);
  const parsedReturnType = returnType.split('.').slice(-1)[0];
  return entites.find(e => e.entityTypeName === parsedReturnType);
}

function findComplexType(
  returnType: string,
  complexTypes: Omit<VdmComplexType, 'factoryName'>[]
): Omit<VdmComplexType, 'factoryName'> | undefined {
  returnType = parseTypeName(returnType);
  const parsedReturnType = returnType.split('.').slice(-1)[0];
  return complexTypes.find(c => c.originalName === parsedReturnType);
}

function getVoidReturnType(): VdmFunctionImportReturnType {
  return {
    returnTypeCategory: VdmFunctionImportReturnTypeCategory.VOID,
    returnType: 'undefined',
    builderFunction: '(val) => undefined',
    isMulti: false,
    isCollection: false
  };
}

function getEdmReturnType(
  isCollectionReturnType: boolean,
  edmType: string
): VdmFunctionImportReturnType {
  return {
    returnTypeCategory: VdmFunctionImportReturnTypeCategory.EDM_TYPE,
    returnType: propertyJsType(edmType)!,
    builderFunction: `(val) => edmToTs(val, '${edmType}')`,
    isMulti: isCollectionReturnType,
    isCollection: isCollectionReturnType
  };
}

function getEntityReturnType(
  isCollectionReturnType: boolean,
  entity: VdmEntity
): VdmFunctionImportReturnType {
  return {
    returnTypeCategory: VdmFunctionImportReturnTypeCategory.ENTITY,
    returnType: entity.className,
    builderFunction: entity.className,
    isMulti: isCollectionReturnType,
    isCollection: isCollectionReturnType
  };
}

function getComplexReturnType(
  isCollectionReturnType: boolean,
  complexType: Omit<VdmComplexType, 'factoryName'>
): VdmFunctionImportReturnType {
  return {
    returnTypeCategory: VdmFunctionImportReturnTypeCategory.COMPLEX_TYPE,
    returnType: complexType.typeName,
    builderFunction: `(data) => deserializeComplexType(data, ${complexType.typeName})`,
    isMulti: isCollectionReturnType,
    isCollection: isCollectionReturnType
  };
}
