import { pascalCase } from '@sap-cloud-sdk/util';
import { functionImportDescription } from '../description-util';
import { getOperationParameters } from './operation-parameter';
import type { EdmxParameter, EdmxFunctionImportV2 } from '../../edmx-parser';
import type { ServiceNameFormatter } from '../../service-name-formatter';
import type { SwaggerPath } from '../../swagger-parser';
import type { VdmOperationBase } from '../../vdm-types';
import type { EdmxJoinedOperation } from '../v4';

/**
 * @internal
 * This transforms an EDMX operation (function or action) to its representation for the VDM.
 */
export function transformOperationBase(
  edmxOperation: EdmxFunctionImportV2 | EdmxJoinedOperation,
  edmxParameters: EdmxParameter[],
  type: 'function' | 'action',
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter,
  edmxBindingEntitySetName?: string
): VdmOperationBase {
  const operationName = edmxBindingEntitySetName
    ? formatter.originalToBoundOperationName(
        edmxBindingEntitySetName,
        edmxOperation.Name
      )
    : formatter.originalToOperationName(edmxOperation.Name);
  const operation = {
    originalName: edmxOperation.Name,
    name: operationName,
    parametersTypeName: pascalCase(`${operationName}Parameters`)
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
    type,
    isBound: !!edmxBindingEntitySetName
  };
}
