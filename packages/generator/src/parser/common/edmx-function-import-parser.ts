import { EdmxMetadataBase } from '../edmx-parser';
import {
  EdmxNamed,

  EdmxParameter,
  EdmxProperty, SwaggerDescribed,
  SwaggerPath,
  SwaggerPathParameter
} from './parser-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmFunctionImport } from '../../vdm-types';
import { edmToTsType, endWithDot, ensureString, isNullableParameter } from '../../generator-utils';
import { toTitleFormat, toTypeNameFormat } from '@sap-cloud-sdk/core';
import { parseTypeName } from '../parser-util';
import { createLogger } from '@sap-cloud-sdk/util';
import { longDescription, parseType } from './some-util-find-good-name';


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
): Omit<VdmFunctionImport, 'returnType' | 'httpMethod'> {
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

function filterUnknownEdmTypes(p: EdmxProperty): boolean {
  const type = parseTypeName(p.Type);
  const skip = type.startsWith('Edm.') && !edmToTsType(type);
  if (skip) {
    logger.warn(
      `Edm Type ${type} not supported by the SAP Cloud SDK. Skipping generation of property ${p.Name}.`
    );
  }
  return !skip;
}



