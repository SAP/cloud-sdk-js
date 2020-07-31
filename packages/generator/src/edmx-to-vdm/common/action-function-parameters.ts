/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { VdmParameter } from '../../vdm-types';
import { filterUnknownEdmTypes, parseType } from '../edmx-to-vdm-util';
import { edmToTsType, isNullableParameter } from '../../generator-utils';
import { parameterDescription } from '../description-util';
import { EdmxNamed, EdmxParameter } from '../../edmx-parser/common';
import { SwaggerPath } from '../../swagger-parser/swagger-types';
import { ServiceNameFormatter } from '../../service-name-formatter';

export function getParameter<T extends EdmxNamed>(
  edmxFunctionImport: T,
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
        edmxFunctionImport.Name,
        p.Name
      ),
      edmType: parseType(p.Type),
      jsType: edmToTsType(p.Type)!,
      nullable: isNullableParameter(p),
      description: parameterDescription(p, swaggerParameter)
    };
  });
}
