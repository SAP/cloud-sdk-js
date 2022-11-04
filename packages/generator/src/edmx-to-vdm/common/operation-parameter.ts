import type { VdmParameter } from '../../vdm-types';
import { isNullableProperty } from '../../generator-utils';
import { parameterDescription } from '../description-util';
import type { EdmxParameter } from '../../edmx-parser/common/edmx-types';
import { SwaggerPath } from '../../swagger-parser';
import { ServiceNameFormatter } from '../../service-name-formatter';
import type { EdmxFunctionImportV2 } from '../../edmx-parser/v2/edm-types';
import { getTypeMappingActionFunction } from '../edmx-to-vdm-util';
import type { EdmxJoinedOperation } from '../v4';

/**
 * @internal
 */
export function getOperationParameters(
  edmxOperationImport: EdmxFunctionImportV2 | EdmxJoinedOperation,
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
        edmxOperationImport.Name,
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
