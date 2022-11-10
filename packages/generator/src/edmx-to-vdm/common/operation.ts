import { pascalCase } from '@sap-cloud-sdk/util';
import type { EdmxParameter } from '../../edmx-parser/common';
import type { EdmxFunctionImportV2 } from '../../edmx-parser/v2';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { SwaggerPath } from '../../swagger-parser';
import type { VdmOperationBase } from '../../vdm-types';
import { functionImportDescription } from '../description-util';
import type { EdmxJoinedOperation } from '../v4';
import { getOperationParameters } from './operation-parameter';

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
