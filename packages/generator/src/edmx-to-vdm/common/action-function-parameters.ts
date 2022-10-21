import { EdmxNamed, EdmxParameter } from '../../edmx-parser/common/edmx-types';
import { EdmxFunctionImportV2 } from '../../edmx-parser/v2/edm-types';
import {
  EdmxActionImport,
  EdmxFunctionImportV4
} from '../../edmx-parser/v4/edm-types';
import { isNullableProperty } from '../../generator-utils';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { SwaggerPath } from '../../swagger-parser';
import { VdmParameter } from '../../vdm-types';
import { parameterDescription } from '../description-util';
import { getTypeMappingActionFunction } from '../edmx-to-vdm-util';

/**
 * @internal
 */
export function getActionImportParameters(
  edmxActionImport: EdmxActionImport,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter,
  bindingEntity?: string
): VdmParameter[] {
  return getParameter(
    edmxActionImport,
    edmxParameters,
    swaggerDefinition,
    formatter,
    bindingEntity
  );
}
/**
 * @internal
 */
export function getFunctionImportParameters(
  edmxFunctionImport: EdmxFunctionImportV2 | EdmxFunctionImportV4,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter,
  bindingEntity?: string
): VdmParameter[] {
  return getParameter(
    edmxFunctionImport,
    edmxParameters,
    swaggerDefinition,
    formatter,
    bindingEntity
  );
}

function getParameter<T extends EdmxNamed>(
  edmxActionFunctionImport: T,
  edmxParameters: EdmxParameter[],
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter,
  bindingEntity?: string
): VdmParameter[] {
  const parameters = bindingEntity ? edmxParameters.slice(1) : edmxParameters;
  return parameters.map(p => {
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
