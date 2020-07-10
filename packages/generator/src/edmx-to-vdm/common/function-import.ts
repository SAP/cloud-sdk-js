/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { toTypeNameFormat } from '@sap-cloud-sdk/core';
import { createLogger } from '@sap-cloud-sdk/util';
import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  VdmComplexType,
  VdmEntity,
  VdmFunctionImport,
  VdmFunctionImportReturnTypeCategory,
  VdmFunctionImportReturnTypeNotParsed,
  VdmFunctionWithoutReturnType
} from '../vdm-types';
import { edmToTsType, isNullableParameter } from '../../generator-utils';
import { SwaggerPath } from '../../edmx-parser/swagger/swagger-types';
import {
  functionImportDescription,
  parameterDescription
} from '../description-util';
import { EdmxNamed, EdmxParameter } from '../../edmx-parser/common/edmx-types';
import {
  filterUnknownEdmTypes,
  isCollection,
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
      return returnType;
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
      returnType: propertyJsType(edmxType)!,
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
