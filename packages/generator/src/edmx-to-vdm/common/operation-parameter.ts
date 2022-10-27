import { VdmParameter } from '../../vdm-types';
import { isNullableProperty } from '../../generator-utils';
import { parameterDescription } from '../description-util';
import { EdmxParameter } from '../../edmx-parser/common/edmx-types';
import { SwaggerPath } from '../../swagger-parser';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { EdmxFunctionImportV2 as EdmxFunctionImportV2 } from '../../edmx-parser/v2/edm-types';
import {
  EdmxActionImport,
  EdmxFunctionImportV4 as EdmxFunctionImportV4
} from '../../edmx-parser/v4/edm-types';
import { getTypeMappingActionFunction } from '../edmx-to-vdm-util';

/**
 * @internal
 */
export function getOperationParameters(
  edmxActionFunctionImport:
    | EdmxFunctionImportV2
    | EdmxFunctionImportV4
    | EdmxActionImport,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter
): VdmParameter[] {
  return edmxParameters.map(p => {
    const swaggerParameter = swaggerDefinition
      ? swaggerDefinition.parameters.find(param => param.name === p.Name)
      : undefined;
    const typeMapping = getTypeMappingActionFunction(p.Type);
    return {
      originalName: p.Name,
      parameterName: formatter.originalToParameterName(
        edmxActionFunctionImport.Name,
        p.Name
      ),
      edmType: typeMapping.edmType,
      jsType: typeMapping.jsType,
      fieldType: typeMapping.fieldType,
      nullable: isNullableProperty(p),
      description: parameterDescription(p, swaggerParameter)
    };
  });
}
