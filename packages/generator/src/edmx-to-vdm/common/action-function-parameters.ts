/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { VdmParameter } from '../../vdm-types';
import { filterUnknownEdmTypes, parseType } from '../edmx-to-vdm-util';
import { edmToTsType, isNullableParameter } from '../../generator-utils';
import { parameterDescription } from '../description-util';
import { EdmxNamed, EdmxParameter } from '../../edmx-parser/common';
import { SwaggerPath } from '../../swagger-parser/swagger-types';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { EdmxFunctionImport as EdmxFunctionImportV2 } from '../../edmx-parser/v2';
import {
  EdmxActionImport,
  EdmxFunctionImport as EdmxFunctionImportV4
} from '../../edmx-parser/v4';

export function getActionImportParameters(
  edmxActionImport: EdmxActionImport,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter
): VdmParameter[] {
  return getParameter(
    edmxActionImport,
    edmxParameters,
    swaggerDefinition,
    formatter
  );
}

export function getFunctionImportParameters(
  edmxFunctionImport: EdmxFunctionImportV2 | EdmxFunctionImportV4,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter
): VdmParameter[] {
  return getParameter(
    edmxFunctionImport,
    edmxParameters,
    swaggerDefinition,
    formatter
  );
}

function getParameter<T extends EdmxNamed>(
  edmxActionFunctionImport: T,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter
): VdmParameter[] {
  return edmxParameters.filter(filterUnknownEdmTypes).map(p => {
    const swaggerParameter = swaggerDefinition
      ? swaggerDefinition.parameters.find(param => param.name === p.Name)
      : undefined;
    return {
      originalName: p.Name,
      parameterName: formatter.originalToParameterName(
        edmxActionFunctionImport.Name,
        p.Name
      ),
      edmType: parseType(p.Type),
      jsType: edmToTsType(p.Type)!,
      nullable: isNullableParameter(p),
      description: parameterDescription(p, swaggerParameter)
    };
  });
}
