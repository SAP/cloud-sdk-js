import { EdmxMetadataBase } from '../edmx-parser';
import {
  EdmxNamed,

  EdmxParameter,
  EdmxProperty, SwaggerDescribed,
  SwaggerPath,
  SwaggerPathParameter
} from './parser-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import {
  VdmComplexType,
  VdmEntity,
  VdmFunctionImport, VdmFunctionImportReturnTypeNotParsed,
  VdmFunctionImportReturnType,
  VdmFunctionImportReturnTypeCategory, VdmFunctionWithoutReturnType
} from '../../vdm-types';
import { edmToTsType, endWithDot, ensureString, isNullableParameter } from '../../generator-utils';
import { toTitleFormat, toTypeNameFormat } from '@sap-cloud-sdk/core';
import { parseTypeName } from '../parser-util';
import { createLogger } from '@sap-cloud-sdk/util';
import { filterUnknownEdmTypes, longDescription, parseType } from './some-util-find-good-name';


const logger = createLogger({
  package: 'generator',
  messageContext: 'edmx-function-import-parser'
});

export function getFunctionImportNames1(edmxData:EdmxMetadataBase):string[]{
  throw new Error('Not yet implemented')
}


export function transformFunctionImportBase<T extends EdmxNamed>(
  edmxFunctionImport: T,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter
): Omit<VdmFunctionWithoutReturnType,'httpMethod'>[] {
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


export function addReturnTypes(
  functionImports :VdmFunctionImportReturnTypeNotParsed[],
  entities: VdmEntity[],
  complexTypes: VdmComplexType[]
): VdmFunctionImport[] {
  functionImports.map(f=>{
    if (!f.returnType) {
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
  })



}





