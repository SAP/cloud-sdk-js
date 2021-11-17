import { codeBlock } from '@sap-cloud-sdk/util';
import { InstructionWithText } from '@sap-cloud-sdk/generator-common/internal';
import { OpenApiOperation } from '../openapi-types';
import { getOperationParamCode } from './code-sample-util';

const instructionsText =
  'To consume the service via the pregenerated typed client library run the code snippet below. For more details about OpenAPI client libraries chose "OpenAPI Consumption Manual" from the "Helpful Links" menu.';
export function genericCodeSample(): InstructionWithText {
  const operation = { operationId: 'myFunction' } as OpenApiOperation;
  return apiSpecificCodeSample('MyApi', operation, 'my-npm-package');
}

export function apiSpecificCodeSample(
  apiName: string,
  operation: OpenApiOperation,
  packageName: string
): InstructionWithText {
  return {
    text: instructionsText,
    instructions: codeBlock`
import { ${apiName} } from '${packageName}';

const responseData = await ${apiName}.${
      operation.operationId
    }(${getOperationParamCode(
      operation
    )}).execute({ destinationName:'myDestinationName' });
`
  };
}
