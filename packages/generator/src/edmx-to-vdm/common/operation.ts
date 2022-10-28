import { pascalCase } from '@sap-cloud-sdk/util';
import { EdmxParameter } from '../../edmx-parser/common';
import { EdmxFunctionImportV2 } from '../../edmx-parser/v2';
import { ServiceNameFormatter } from '../../service-name-formatter';
import { VdmOperationBase } from '../../vdm-types';
import { SwaggerPath } from '../../swagger-parser';
import { functionImportDescription } from '../description-util';
import { EdmxOperationImport } from '../../edmx-parser/v4';
import { getOperationParameters } from './operation-parameter';

/**
 * @internal
 * This transforms an EDMX operation (function or action) to its representation for the VDM.
 */
export function transformOperationBase(
  edmxOperation: EdmxFunctionImportV2 | EdmxOperationImport,
  edmxParameters: EdmxParameter[],
  type: 'function' | 'action',
  swaggerDefinition: SwaggerPath | undefined,
  formatter: ServiceNameFormatter,
  bindingEntitySetName?: string
): VdmOperationBase {
  const name = bindingEntitySetName
    ? formatter.originalToBoundOperationName(
        bindingEntitySetName,
        edmxOperation.Name
      )
    : formatter.originalToOperationName(edmxOperation.Name);
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
