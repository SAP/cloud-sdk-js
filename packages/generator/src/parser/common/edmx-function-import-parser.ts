/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { toTitleFormat, toTypeNameFormat } from '@sap-cloud-sdk/core';
import { createLogger } from '@sap-cloud-sdk/util';
import { EdmxMetadataBase } from '../edmx-parser';
import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  VdmComplexType,
  VdmEntity,
  VdmFunctionImport,
  VdmFunctionImportReturnTypeNotParsed,
  VdmFunctionImportReturnType,
  VdmFunctionImportReturnTypeCategory,
  VdmFunctionWithoutReturnType
} from '../../vdm-types';
import {
  edmToTsType,
  endWithDot,
  isNullableParameter
} from '../../generator-utils';
import { isCollection, parseTypeName } from '../parser-util';
import {
  filterUnknownEdmTypes,
  longDescription,
  parseType,
  propertyJsType
} from './some-util-find-good-name';
import { EdmxNamed, EdmxParameter } from './edmx-types';
import { SwaggerPath, SwaggerPathParameter } from './swagger-types';

const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-function-import-parser'
});

export function getFunctionImportNames1(edmxData: EdmxMetadataBase): string[] {
  throw new Error('Not yet implemented');
}

export function transformFunctionImportBase<T extends EdmxNamed>(
  edmxFunctionImport: T,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter
): Omit<VdmFunctionWithoutReturnType, 'httpMethod'> {
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

function parameterDescription(
  parameter: EdmxParameter,
  swaggerParameter?: SwaggerPathParameter
): string {
  const short = endWithDot(toTitleFormat(parameter.Name));
  const long = longDescription(parameter, swaggerParameter);
  return endWithDot((long || short).trim());
}

function functionImportDescription(
  swaggerDefinition: SwaggerPath | undefined,
  originalName: string
): string {
  if (swaggerDefinition && swaggerDefinition.summary) {
    return endWithDot(swaggerDefinition.summary);
  }
  return endWithDot(toTitleFormat(originalName));
}

export function parseReturnTypes(
  functionImports: VdmFunctionImportReturnTypeNotParsed[],
  entities: VdmEntity[],
  complexTypes: VdmComplexType[]
): VdmFunctionImport[] {
  return functionImports.map(f => {
    const returnType = f.returnTypeEdmx;
    if (!returnType) {
      return withVoid(f);
    }

    const isCollectionReturnType = isCollection(returnType);
    const edmxType = findEdmType(returnType);
    if (edmxType) {
      return withEdmx(f, isCollectionReturnType, edmxType);
    }

    const entity = findEntityType(returnType, entities);
    if (entity) {
      return withEntity(f, isCollectionReturnType, entity);
    }
    const complexType = findComplexType(returnType, complexTypes);
    if (complexType) {
      return withComplexType(f, isCollectionReturnType, complexType);
    }

    throw Error(`Unable to find a return type for name ${returnType}.`);
  });

  function findEdmType(returnType: string): string | undefined {
    returnType = parseTypeName(returnType);
    if (returnType.startsWith('Edm.')) {
      return propertyJsType(returnType);
    }
    return undefined;
  }

  function findEntityType(
    returnType: string,
    entites: VdmEntity[]
  ): VdmEntity | undefined {
    returnType = parseTypeName(returnType);
    const parsedReturnType = returnType.split('.').slice(-1)[0];
    return entities.find(e => e.entityTypeName === parsedReturnType);
  }

  function findComplexType(
    returnType: string,
    entites: VdmComplexType[]
  ): VdmComplexType | undefined {
    returnType = parseTypeName(returnType);
    const parsedReturnType = returnType.split('.').slice(-1)[0];
    return complexTypes.find(c => c.originalName === parsedReturnType);
  }
  function withVoid(
    f: VdmFunctionImportReturnTypeNotParsed
  ): VdmFunctionImport {
    const vdmReturnType = {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.VOID,
      returnType: 'undefined',
      builderFunction: '(val) => undefined',
      isMulti: false,
      isCollection: false
    };
    return { ...f, returnType: vdmReturnType };
  }

  function withEdmx(
    f: VdmFunctionImportReturnTypeNotParsed,
    isCollectionReturnType: boolean,
    edmxType: string
  ): VdmFunctionImport {
    const vdmReturnType = {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.EDM_TYPE,
      returnType: edmxType,
      builderFunction: `(val) => edmToTs(val, '${edmxType}')`,
      isMulti: isCollectionReturnType,
      isCollection: isCollectionReturnType
    };
    return { ...f, returnType: vdmReturnType };
  }
  function withEntity(
    f: VdmFunctionImportReturnTypeNotParsed,
    isCollectionReturnType: boolean,
    entity: VdmEntity
  ): VdmFunctionImport {
    const vdmReturnType = {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.ENTITY,
      returnType: entity.className,
      builderFunction: entity.className,
      isMulti: isCollectionReturnType,
      isCollection: isCollectionReturnType
    };
    return { ...f, returnType: vdmReturnType };
  }
  function withComplexType(
    f: VdmFunctionImportReturnTypeNotParsed,
    isCollectionReturnType: boolean,
    complexType: VdmComplexType
  ): VdmFunctionImport {
    const vdmReturnType = {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.COMPLEX_TYPE,
      returnType: complexType.typeName,
      builderFunction: `${complexType.typeName}.build`,
      isMulti: isCollectionReturnType,
      isCollection: isCollectionReturnType
    };
    return { ...f, returnType: vdmReturnType };
  }
}

export function parseReturnType(
  returnType: string,
  entities: VdmEntity[],
  complexTypes: VdmComplexType[]
): VdmFunctionImportReturnType {
  if (!returnType) {
    return {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.VOID,
      returnType: 'undefined',
      builderFunction: '(val) => undefined',
      isMulti: false,
      isCollection: false
    };
  }
  const isCollectionReturnType = isCollection(returnType);
  returnType = parseTypeName(returnType);
  if (returnType.startsWith('Edm.')) {
    return {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.EDM_TYPE,
      returnType: propertyJsType(returnType)!,
      builderFunction: `(val) => edmToTs(val, '${returnType}')`,
      isMulti: isCollectionReturnType,
      isCollection: isCollectionReturnType
    };
  }
  const parsedReturnType = returnType.split('.').slice(-1)[0];
  const entity = entities.find(e => e.entityTypeName === parsedReturnType);
  if (entity) {
    return {
      returnTypeCategory: VdmFunctionImportReturnTypeCategory.ENTITY,
      returnType: entity.className,
      builderFunction: entity.className,
      isMulti: isCollectionReturnType,
      isCollection: isCollectionReturnType
    };
  }
  const complexType = complexTypes.find(
    c => c.originalName === parsedReturnType
  );
  if (!complexType) {
    throw Error(`Unable to find complex type with name ${parsedReturnType}.`);
  }
  return {
    returnTypeCategory: VdmFunctionImportReturnTypeCategory.COMPLEX_TYPE,
    returnType: complexType.typeName,
    builderFunction: `${complexType.typeName}.build`,
    isMulti: isCollectionReturnType,
    isCollection: isCollectionReturnType
  };
}
