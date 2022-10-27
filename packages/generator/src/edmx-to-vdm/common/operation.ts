import { pascalCase } from '@sap-cloud-sdk/util';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmOperationBase } from '../../vdm-types';
import { SwaggerPath } from '../../swagger-parser';
import { functionImportDescription } from '../description-util';
import { EdmxParameter } from '../../edmx-parser/common';
import { EdmxFunctionImportV2 } from '../../edmx-parser/v2';
import { EdmxActionImport, EdmxFunctionImportV4 } from '../../edmx-parser/v4';
import { getOperationParameters } from './operation-parameter';

/**
 * @internal
 */
export function transformOperationBase(
  edmxOperation: EdmxFunctionImportV2 | EdmxFunctionImportV4 | EdmxActionImport,
  edmxParameters: EdmxParameter[],
  type: 'function' | 'action',
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter
): VdmOperationBase {
  const name = formatter.originalToFunctionImportName(edmxOperation.Name);
  const operation = {
    originalName: edmxOperation.Name,
    name,
    parametersTypeName: pascalCase(`${name}Parameters`)
  };

  const parameters = getOperationParameters(
    edmxOperation,
    edmxParameters,
    swaggerDefinition,
    formatter
  );

  return {
    ...operation,
    parameters,
    description: functionImportDescription(
      swaggerDefinition,
      operation.originalName
    ),
    type
  };
}
